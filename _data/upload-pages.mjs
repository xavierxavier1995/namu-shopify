import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const STORE = process.env.SHOPIFY_STORE || '7uvwdy-up.myshopify.com';
const TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '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';
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-04';
const BASE_URL = `https://${STORE}/admin/api/${API_VERSION}`;

const PAGES_TO_UPDATE = [
  {
    handle: 'politica-de-frete',
    file: '_content/politica-de-frete.html',
    title: 'Política de Frete'
  },
  {
    handle: 'politica-de-trocas',
    file: '_content/politica-de-trocas.html',
    title: 'Política de Trocas e Devoluções'
  },
  {
    handle: 'termos-de-servico',
    file: '_content/termos-de-servico.html',
    title: 'Termos de Serviço'
  },
  {
    handle: 'politica-de-privacidade',
    file: '_content/politica-de-privacidade.html',
    title: 'Política de Privacidade'
  }
];

async function shopifyGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error(`GET ${endpoint} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function shopifyPut(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`PUT ${endpoint} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function shopifyPost(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${endpoint} → ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  console.log(`\n📄 Upload de Pages — ${STORE}\n`);
  console.log(`API: ${API_VERSION} | Token: ...${TOKEN.slice(-6)}\n`);

  // 1. Buscar todas as pages existentes
  console.log('Buscando pages existentes...');
  const { pages } = await shopifyGet('/pages.json?limit=50');
  console.log(`  Encontradas: ${pages.length} pages\n`);

  for (const pageConfig of PAGES_TO_UPDATE) {
    const htmlPath = join(ROOT, pageConfig.file);
    let bodyHtml;
    try {
      bodyHtml = readFileSync(htmlPath, 'utf-8');
    } catch (e) {
      console.log(`  ❌ ${pageConfig.handle}: arquivo ${pageConfig.file} não encontrado`);
      continue;
    }

    // Buscar page existente pelo handle
    const existing = pages.find(p => p.handle === pageConfig.handle);

    if (existing) {
      // Atualizar page existente
      console.log(`  Atualizando: "${existing.title}" (ID: ${existing.id})...`);
      await shopifyPut(`/pages/${existing.id}.json`, {
        page: { id: existing.id, body_html: bodyHtml }
      });
      console.log(`  ✅ ${pageConfig.handle} — conteúdo atualizado`);
    } else {
      // Criar nova page
      console.log(`  Criando: "${pageConfig.title}" (handle: ${pageConfig.handle})...`);
      const { page } = await shopifyPost('/pages.json', {
        page: {
          title: pageConfig.title,
          handle: pageConfig.handle,
          body_html: bodyHtml,
          published: true,
          template_suffix: pageConfig.handle
        }
      });
      console.log(`  ✅ ${pageConfig.handle} — criada (ID: ${page.id})`);
    }
  }

  console.log('\n✅ Todas as pages foram processadas!\n');
}

main().catch(err => {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
});
