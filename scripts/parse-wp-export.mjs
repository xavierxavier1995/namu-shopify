import { readFileSync } from 'fs';

const xml = readFileSync('C:\\Users\\unk_g\\Downloads\\namumatcha.WordPress.2026-05-15.xml', 'utf-8');

// Extract items
const items = [];
const itemRegex = /<item>([\s\S]*?)<\/item>/g;
let match;

while ((match = itemRegex.exec(xml)) !== null) {
  const block = match[1];

  const get = (tag) => {
    const m = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
    return m ? m[1].trim() : '';
  };
  const getSimple = (tag) => {
    const m = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
    return m ? m[1].trim() : '';
  };

  const title = get('title');
  const status = getSimple('wp:status');
  const postType = getSimple('wp:post_type');
  const postName = getSimple('wp:post_name');
  const content = get('content:encoded');
  const pubDate = getSimple('wp:post_date');

  // Get attachment URL if it's an attachment
  const attachUrl = block.match(/<wp:attachment_url><!?\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/);
  const url = attachUrl ? attachUrl[1] : '';

  // Get categories
  const cats = [];
  const catRegex = /category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]>/g;
  let catMatch;
  while ((catMatch = catRegex.exec(block)) !== null) {
    cats.push(catMatch[1]);
  }

  items.push({ title, status, postType, postName, pubDate, content: content.substring(0, 200), url, categories: cats });
}

// Summary
const posts = items.filter(i => i.postType === 'post');
const pages = items.filter(i => i.postType === 'page');
const attachments = items.filter(i => i.postType === 'attachment');
const published = posts.filter(i => i.status === 'publish');

console.log('=== RESUMO DO XML ===');
console.log(`Total items: ${items.length}`);
console.log(`Posts: ${posts.length} (${published.length} publicados)`);
console.log(`Pages: ${pages.length}`);
console.log(`Attachments (imagens): ${attachments.length}`);
console.log('');

console.log('=== POSTS PUBLICADOS ===');
published.forEach((p, i) => {
  console.log(`${i+1}. "${p.title}" [${p.postName}] — ${p.pubDate} — cats: ${p.categories.join(', ') || 'nenhuma'}`);
});

console.log('');
console.log('=== PÁGINAS ===');
pages.forEach((p, i) => {
  console.log(`${i+1}. "${p.title}" [${p.postName}] — status: ${p.status}`);
});

console.log('');
console.log('=== IMAGENS (primeiras 20) ===');
attachments.slice(0, 20).forEach((a, i) => {
  console.log(`${i+1}. ${a.title || '(sem título)'} → ${a.url}`);
});
if (attachments.length > 20) console.log(`... e mais ${attachments.length - 20} imagens`);
