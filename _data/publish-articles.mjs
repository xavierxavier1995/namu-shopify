/**
 * Publica artigos do blog-articles-seed.json na loja Shopify.
 *
 * Uso:
 *   node _data/publish-articles.mjs
 *
 * Requer variável de ambiente:
 *   SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE = "namu-matcha.myshopify.com";
const API_VERSION = "2024-01";
const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!TOKEN) {
  console.error("Erro: defina SHOPIFY_ACCESS_TOKEN no ambiente.");
  console.error("  PowerShell:  $env:SHOPIFY_ACCESS_TOKEN = 'shpat_xxx'");
  console.error("  Bash:        export SHOPIFY_ACCESS_TOKEN=shpat_xxx");
  process.exit(1);
}

const BASE = `https://${STORE}/admin/api/${API_VERSION}`;
const headers = {
  "X-Shopify-Access-Token": TOKEN,
  "Content-Type": "application/json",
};

async function api(method, path, body) {
  const url = `${BASE}${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function getOrCreateBlog(handle, title) {
  const { blogs } = await api("GET", "/blogs.json");
  const existing = blogs.find((b) => b.handle === handle);
  if (existing) {
    console.log(`  Blog "${title}" já existe (id: ${existing.id})`);
    return existing.id;
  }
  const { blog } = await api("POST", "/blogs.json", { blog: { title } });
  console.log(`  Blog "${title}" criado (id: ${blog.id})`);
  return blog.id;
}

async function createArticle(blogId, article) {
  const payload = {
    article: {
      title: article.title,
      handle: article.handle,
      body_html: article.body_html,
      tags: article.tags.join(", "),
      published: true,
      metafields_global_title_tag: article.seo_title || "",
      metafields_global_description_tag: article.seo_description || "",
    },
  };

  try {
    const { article: created } = await api(
      "POST",
      `/blogs/${blogId}/articles.json`,
      payload
    );
    console.log(`    ✓ "${created.title}" (id: ${created.id})`);
  } catch (err) {
    if (err.message.includes("422")) {
      console.log(`    → "${article.title}" já existe, pulando.`);
    } else {
      console.error(`    ✗ "${article.title}": ${err.message}`);
    }
  }
}

async function main() {
  const seed = JSON.parse(
    readFileSync(resolve(__dirname, "blog-articles-seed.json"), "utf-8")
  );

  console.log("\n═══ Publicando artigos Namu ═══\n");

  // Blog: Namu Journal (news)
  const journalData = seed.blog_journal;
  console.log(`[1/2] Blog: ${journalData.title}`);
  const journalId = await getOrCreateBlog(journalData.handle, journalData.title);
  for (const art of journalData.articles) {
    await createArticle(journalId, art);
  }

  // Blog: Receitas
  const receitasData = seed.blog_receitas;
  console.log(`\n[2/2] Blog: ${receitasData.title}`);
  const receitasId = await getOrCreateBlog(receitasData.handle, receitasData.title);
  for (const art of receitasData.articles) {
    await createArticle(receitasId, art);
  }

  console.log("\n═══ Concluído! ═══\n");
}

main().catch((err) => {
  console.error("Erro fatal:", err.message);
  process.exit(1);
});
