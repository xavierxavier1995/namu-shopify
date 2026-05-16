/**
 * Script de migração WordPress → Shopify
 * - Parseia XML do WordPress
 * - Faz upload de imagens para Shopify Files
 * - Cria artigos no blog "Notícias" com SEO preservado
 */

import { readFileSync, writeFileSync } from 'fs';
import https from 'https';

// Config
const STORE = '7uvwdy-up.myshopify.com';
const TOKEN = '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';
const API_VERSION = '2025-04';
const BLOG_ID = 'gid://shopify/Blog/96208060494'; // Notícias
const XML_PATH = 'C:\\Users\\unk_g\\Downloads\\namumatcha.WordPress.2026-05-15.xml';

// --- Helpers ---

function shopifyGraphQL(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const options = {
      hostname: STORE,
      path: `/admin/api/${API_VERSION}/graphql.json`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': TOKEN,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`JSON parse error: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// --- XML Parser ---

function parseWPExport(xmlPath) {
  const xml = readFileSync(xmlPath, 'utf-8');
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
      return m ? m[1].trim() : '';
    };

    const postType = get('wp:post_type');
    if (postType !== 'post' && postType !== 'attachment') continue;

    const title = get('title');
    const status = get('wp:status');
    const postName = get('wp:post_name');
    const content = get('content:encoded');
    const pubDate = get('wp:post_date');
    const postId = get('wp:post_id');

    // Extract meta values
    const metas = {};
    const metaRegex = /<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>\s*<\/wp:postmeta>/g;
    let metaMatch;
    while ((metaMatch = metaRegex.exec(block)) !== null) {
      metas[metaMatch[1]] = metaMatch[2];
    }

    // Categories/tags
    const tags = [];
    const catRegex = /category domain="(category|post_tag)"[^>]*><!\[CDATA\[(.*?)\]\]>/g;
    let catMatch;
    while ((catMatch = catRegex.exec(block)) !== null) {
      if (catMatch[2] !== 'Uncategorized') tags.push(catMatch[2]);
    }

    // Attachment URL
    const attachMatch = block.match(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/);
    const attachmentUrl = attachMatch ? attachMatch[1] : '';

    items.push({
      postId, title, status, postType, postName, content, pubDate,
      metas, tags, attachmentUrl
    });
  }

  return items;
}

// --- Content Cleaner ---

function cleanContent(html) {
  if (!html) return '';

  let clean = html;

  // Remove Divi shortcodes
  clean = clean.replace(/\[et_pb_[^\]]*\]/g, '');
  clean = clean.replace(/\[\/et_pb_[^\]]*\]/g, '');

  // Remove WordPress block comments
  clean = clean.replace(/<!-- \/?wp:[^>]*-->/g, '');
  clean = clean.replace(/<!-- \/?divi:[^>]*-->/g, '');

  // Remove empty paragraphs
  clean = clean.replace(/<p>\s*<\/p>/g, '');
  clean = clean.replace(/<p>&nbsp;<\/p>/g, '');

  // Remove excessive whitespace/newlines
  clean = clean.replace(/\n{3,}/g, '\n\n');
  clean = clean.trim();

  // Remove inline styles from Divi
  clean = clean.replace(/ style="[^"]*"/g, '');

  // Remove empty divs
  clean = clean.replace(/<div[^>]*>\s*<\/div>/g, '');

  // Remove Divi classes
  clean = clean.replace(/ class="et_[^"]*"/g, '');
  clean = clean.replace(/ class=""/g, '');

  return clean;
}

// --- Image Upload ---

async function uploadImageToShopify(url, filename) {
  const mutation = `
    mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id alt createdAt fileStatus ... on MediaImage { image { url } } }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    files: [{
      alt: filename.replace(/[-_]/g, ' ').replace(/\.\w+$/, ''),
      contentType: 'IMAGE',
      originalSource: url
    }]
  };

  const result = await shopifyGraphQL(mutation, variables);

  if (result.data?.fileCreate?.userErrors?.length > 0) {
    console.error(`  ⚠ Upload error for ${filename}:`, result.data.fileCreate.userErrors);
    return null;
  }

  return result.data?.fileCreate?.files?.[0] || null;
}

async function waitForFileReady(fileId, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000);
    const query = `query { node(id: "${fileId}") { ... on MediaImage { fileStatus image { url } } } }`;
    const result = await shopifyGraphQL(query);
    const node = result.data?.node;
    if (node?.fileStatus === 'READY' && node?.image?.url) {
      return node.image.url;
    }
    if (node?.fileStatus === 'FAILED') return null;
  }
  return null;
}

// --- Article Creation ---

async function createArticle(article) {
  const mutation = `
    mutation articleCreate($article: ArticleCreateInput!) {
      articleCreate(article: $article) {
        article { id handle title }
        userErrors { field message }
      }
    }
  `;

  const input = {
    blogId: BLOG_ID,
    title: article.title,
    handle: article.slug,
    body: article.body,
    tags: article.tags,
    isPublished: article.published,
    publishDate: article.publishDate,
    author: { name: 'Namu Matcha' },
  };

  if (article.imageUrl) {
    input.image = { url: article.imageUrl, altText: article.title };
  }

  const result = await shopifyGraphQL(mutation, { article: input });

  // Apply SEO via separate mutation if article was created
  const createdId = result.data?.articleCreate?.article?.id;
  if (createdId && (article.seoTitle || article.seoDescription)) {
    await applySEO(createdId, article.seoTitle, article.seoDescription);
  }

  return result;
}

async function applySEO(articleId, seoTitle, seoDescription) {
  const mutation = `
    mutation articleUpdate($article: ArticleUpdateInput!, $id: ID!) {
      articleUpdate(article: $article, id: $id) {
        article { id seo { title description } }
        userErrors { field message }
      }
    }
  `;
  const variables = {
    id: articleId,
    article: {
      seo: {
        title: seoTitle || '',
        description: seoDescription || ''
      }
    }
  };
  return shopifyGraphQL(mutation, variables);
}

// --- Main ---

async function main() {
  console.log('=== Migração WordPress → Shopify ===\n');

  // 1. Parse XML
  console.log('1. Parseando XML...');
  const items = parseWPExport(XML_PATH);
  const posts = items.filter(i => i.postType === 'post' && (i.status === 'publish' || i.status === 'draft' || i.status === 'private') && i.title.trim() !== '');
  const attachments = items.filter(i => i.postType === 'attachment' && i.attachmentUrl);

  console.log(`   ${posts.length} posts encontrados`);
  console.log(`   ${attachments.length} imagens encontradas\n`);

  // 2. Load image map (already uploaded)
  console.log('2. Carregando mapa de imagens já migradas...');
  let imageMap = {};
  try {
    const mapData = readFileSync('C:\\Users\\unk_g\\OneDrive\\Área de Trabalho\\namu-shopify\\scripts\\image-map.json', 'utf-8');
    imageMap = JSON.parse(mapData);
    console.log(`   ${Object.keys(imageMap).length} imagens no mapa\n`);
  } catch (e) {
    console.log('   ⚠ image-map.json não encontrado, imagens não serão substituídas\n');
  }

  // 3. Create articles
  console.log('3. Criando artigos no blog Notícias...\n');

  const results = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`   [${i + 1}/${posts.length}] "${post.title}"`);

    // Clean content and replace image URLs
    let body = cleanContent(post.content);
    for (const [oldUrl, newUrl] of Object.entries(imageMap)) {
      body = body.replaceAll(oldUrl, newUrl);
      // Also replace resized versions (-300x200, -1024x768, etc.)
      const base = oldUrl.replace(/\.\w+$/, '');
      const ext = oldUrl.match(/\.\w+$/)?.[0] || '';
      const resizedRegex = new RegExp(base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-\\d+x\\d+' + ext.replace('.', '\\.'), 'g');
      body = body.replace(resizedRegex, newUrl);
    }

    // SEO data from Yoast
    const seoTitle = post.metas['_yoast_wpseo_title'] || '';
    const seoDescription = post.metas['_yoast_wpseo_metadesc'] || '';

    // Featured image
    const thumbnailId = post.metas['_thumbnail_id'];
    let imageUrl = null;
    if (thumbnailId) {
      const thumbAtt = attachments.find(a => a.postId === thumbnailId);
      if (thumbAtt && imageMap[thumbAtt.attachmentUrl]) {
        imageUrl = imageMap[thumbAtt.attachmentUrl];
      }
    }

    // Publish date in ISO format
    let publishDate = null;
    if (post.pubDate && post.pubDate !== '0000-00-00 00:00:00') {
      publishDate = post.pubDate.replace(' ', 'T') + '-03:00'; // BRT timezone
    }

    const article = {
      title: post.title,
      slug: post.postName,
      body,
      tags: post.tags,
      published: post.status === 'publish',
      publishDate,
      seoTitle: seoTitle.replace('%%title%%', post.title).replace('%%sep%%', '|').replace('%%sitename%%', 'Namu Matcha'),
      seoDescription,
      imageUrl
    };

    try {
      const result = await createArticle(article);
      if (result.data?.articleCreate?.userErrors?.length > 0) {
        console.log(`   ✗ Erro: ${JSON.stringify(result.data.articleCreate.userErrors)}`);
        results.push({ title: post.title, status: 'error', errors: result.data.articleCreate.userErrors });
      } else if (result.data?.articleCreate?.article) {
        console.log(`   ✓ Criado: ${result.data.articleCreate.article.handle}`);
        results.push({ title: post.title, status: 'ok', handle: result.data.articleCreate.article.handle });
      } else {
        console.log(`   ✗ Resposta inesperada:`, JSON.stringify(result).substring(0, 200));
        results.push({ title: post.title, status: 'unknown', raw: result });
      }
    } catch (e) {
      console.log(`   ✗ Erro: ${e.message}`);
      results.push({ title: post.title, status: 'error', message: e.message });
    }

    await sleep(500);
  }

  // 4. Summary
  console.log('\n=== RESULTADO FINAL ===');
  const ok = results.filter(r => r.status === 'ok').length;
  const errors = results.filter(r => r.status !== 'ok').length;
  console.log(`✓ ${ok} artigos criados com sucesso`);
  if (errors > 0) console.log(`✗ ${errors} artigos com erro`);

  writeFileSync(
    'C:\\Users\\unk_g\\OneDrive\\Área de Trabalho\\namu-shopify\\scripts\\migration-results.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\nResultados salvos em scripts/migration-results.json');
}

main().catch(console.error);
