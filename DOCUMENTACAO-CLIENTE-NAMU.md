# Namu Matcha — Documentação Técnica

> **Versão:** 1.0 | **Última atualização:** Jun/2026 | **Domínio:** namu-matcha.myshopify.com

---

## Índice

1. [Sobre o Projeto](#1-sobre-o-projeto)
2. [Credenciais e Acesso](#2-credenciais-e-acesso)
3. [Estrutura de Arquivos](#3-estrutura-de-arquivos)
4. [Funcionalidades Implementadas](#4-funcionalidades-implementadas)
5. [Sistema de Blog](#5-sistema-de-blog)
6. [API GraphQL Admin](#6-api-graphql-admin)
7. [Guia de Banners](#7-guia-de-banners)
8. [Paleta de Cores](#8-paleta-de-cores)
9. [Deploy e Manutenção](#9-deploy-e-manutenção)
10. [Changelog](#10-changelog)

---

## 1. Sobre o Projeto

O projeto **Namu Matcha Store** é um tema Shopify customizado, baseado na plataforma Shopify com a API Liquid. O objetivo é uma loja virtual completa para a marca Namu, especializada em matcha importado da Coreia do Sul.

### Informações Gerais

| Item | Valor |
|------|-------|
| **Tipo de Projeto** | Custom Shopify Theme (Liquid) |
| **Domínio Público** | namu-matcha.myshopify.com |
| **Domínio Interno** | 7uvwdy-up.myshopify.com |
| **CNPJ** | 41.401.743/0001-50 |
| **Endereço** | Rua João Elias Saada 134 – Pinheiros/SP, CEP 05427-050 |
| **E-mail Atendimento** | alo@namumatcha.com.br |

### Stack Tecnológico

| Tecnologia | Descrição |
|------------|-----------|
| **Liquid** | Template language nativa do Shopify |
| **Shopify Admin API** | GraphQL API para gestão de artigos e conteúdo |
| **CSS Custom Properties** | Sistema de design com variáveis CSS |
| **JavaScript (ES6+)** | Web Components para header, drawer e interações |
| **Shopify CLI** | Ferramenta de desenvolvimento local e deploy |

---

## 2. Credenciais e Acesso

> ⚠️ **Segurança:** Estas credenciais são sensíveis. Armazene-as em local seguro e nunca as commite em repositórios públicos. O arquivo `.env` contém tokens de acesso à API Admin e nunca deve ser enviado ao cliente.

### Arquivo .env (desenvolvimento local)

```bash
# Shopify Admin API — Loja 7uvwdy-up.myshopify.com
SHOPIFY_STORE=7uvwdy-up.myshopify.com
SHOPIFY_ACCESS_TOKEN=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
SHOPIFY_API_VERSION=2025-04
```

### Acesso ao Admin da Loja

| Ambiente | URL de Acesso |
|----------|--------------|
| Admin Shopify | `https://admin.shopify.com/store/namumatcha` |
| Admin direto | `https://7uvwdy-up.myshopify.com/admin` |
| Theme Editor | `https://admin.shopify.com/store/namumatcha/themes` |
| Blog "noticias" | `https://7uvwdy-up.myshopify.com/admin/content/blogs/96208060494` |

### API GraphQL Admin

Todas as chamadas à API Admin usam o endpoint:

```
https://7uvwdy-up.myshopify.com/admin/api/2025-04/graphql.json
```

Autenticação via header `X-Shopify-Access-Token` com o token do arquivo `.env`.

### URLs Públicas dos Artigos

| Artigo | URL |
|--------|-----|
| O que é Matcha? | `/blogs/noticias/o-que-e-matcha` |
| Guia de Preparo | `/blogs/noticias/guia-preparo-matcha` |
| Benefícios do Matcha | `/blogs/noticias/beneficios-do-matcha` |
| Blog completo | `/blogs/noticias` |

---

## 3. Estrutura de Arquivos

O projeto segue a estrutura padrão de um Shopify Theme com seções customizadas (prefixo `namu-`).

### Diretórios Principais

| Diretório | Conteúdo |
|-----------|----------|
| `sections/` | Seções Shopify customizadas (namu-header, namu-footer, namu-hero-slider, etc.) |
| `snippets/` | Snippets reutilizáveis (namu-star-rating, css-defer, etc.) |
| `templates/` | Templates de página (index.json, article.json, collection.json, etc.) |
| `assets/` | CSS, JS, imagens e SVG do tema |
| `config/` | settings_data.json (tema), settings_schema.json (customizador) |
| `locales/` | Arquivos de tradução i18n (pt-BR, en, ja, etc.) |
| `layout/` | theme.liquid (template base) |
| `scripts/` | Arquivos auxiliares (image-map.json, migration-results.json, etc.) |
| `_data/` | Dados de seed e migração (blog-articles-seed.json, wordpress-posts.json) |

### Seções Customizadas (prefixo namu-)

#### Navegação
- `namu-header.liquid` — Header com pill flutuante, mega menu, drawer mobile
- `namu-footer.liquid` — Footer completo com newsletter e acordeões

#### Homepage
- `namu-hero-slider.liquid` — Slider de banners fullscreen
- `namu-marquee.liquid` — Barra de diferenciais com scroll infinito
- `namu-categories.liquid` — Grid de categorias
- `namu-video-background.liquid` — Vídeo fullscreen como background
- `namu-experience.liquid` — Seção "Por que a Namu?"
- `namu-blog.liquid` — Grid editorial de artigos
- `namu-recipes.liquid` — Cards de receitas por categoria
- `namu-b2b.liquid` — Seção B2B com imagem de fundo
- `namu-benefits.liquid` — Grid de benefícios com ícones
- `namu-faq.liquid` — FAQ com acordeões animados

#### Coleção / Produto
- `namu-collection-grid.liquid` — Grid de produtos
- `namu-collection-related.liquid` — Produtos relacionados
- `namu-collection-trust.liquid` — Selos de confiança
- `namu-collection-seo.liquid` — Meta tags e structured data
- `namu-collection-faq.liquid` — FAQ específico da coleção
- `namu-product.liquid` — Seção de produto customizada
- `namu-featured-products.liquid` — Produtos em destaque na homepage

#### Utilitários
- `namu-newsletter.liquid` — Formulário de newsletter
- `namu-404.liquid` — Página de erro customizada
- `namu-policy.liquid` — Páginas institucionais

---

## 4. Funcionalidades Implementadas

### Header — namu-header.liquid

Componente `<namu-header>` construído como Web Component nativo (sem frameworks). Responsável por:

- **Pill flutuante:** barra fixa no topo (88px desktop / 72px mobile) com logo, navegação e ícones. Z-index 50.
- **Sticky inteligente:** esconde ao rolar para baixo, reaparece ao rolar para cima. Threshold: 300px do topo.
- **Mega menu:** abre no hover (mouseenter/mouseleave com delay de 180ms para fechar). Foco acessível via teclado.
- **Drawer mobile:** painel lateral que abre no clique do hamburger. Suprime overflow do body. Fecha com ESC ou clique fora.
- **Scroll handling:** usa `requestAnimationFrame` e `passive: true` para performance.

### Configuração do Menu via Theme Editor

No Shopify Admin → Customizador do tema → Header Namu, cada bloco do tipo **"Item de menu"** permite:

| Setting | Descrição |
|---------|-----------|
| `Texto` | Rótulo do item (ex: "Loja", "Receitas") |
| `Link` | URL do item (interna ou externa) |
| `Ativar mega menu` | Expande sub-links ao passar o mouse |
| `Links da coluna` | Um por linha no formato `Texto|/url` |
| `Botão "Ver tudo"` | CTA no final da coluna do mega menu |
| `Destaque 1 e 2` | Imagem + título + link para cards visuais |

### Footer — namu-footer.liquid

Footer completo com 5 colunas de navegação (via link_list do Shopify) + seções extras:

- **Newsletter:** integra com `{% form 'customer' %}` do Liquid, cria tag "newsletter" no contato.
- **Blog:** links codificados diretamente para os 3 artigos do blog + link para o blog completo.
- **Redes sociais:** Instagram, Facebook, TikTok, YouTube com links externos.
- **Horário de atendimento:** Seg-Sex 08:00-17:00, Sáb 08:00-12:00.
- **Selos:** Compra Segura, SSL Encrypted, Shopify Secure.

### Hero Slider — namu-hero-slider.liquid

- 5 slides configurados via `templates/index.json` com fallback assets para desktop e mobile.
- Autoplay configurável (6 segundos por padrão).
- Overlap com o header (por trás da pill).
- Assets de fallback referenciam arquivos em `assets/` (ex: `NAMU_site_banner-principal_cupom_desktop.jpg`).

---

## 5. Sistema de Blog

O blog utiliza o blog nativo do Shopify chamado **"noticias"** (handle: `noticias`, ID: `96208060494`). Os artigos são criados e gerenciados via **GraphQL Admin API**.

> ℹ️ **Fluxo de Publicação:** Artigos são criados via API GraphQL (não pelo admin manualmente). Imagens são definidas via `articleUpdate` com URLs externas (Unsplash, CDN do cliente, etc.). O título H1 do artigo é usado como handle SEO.

### Artigos Criados

| Título | Handle | Tag | URL Pública |
|--------|--------|-----|------------|
| O que é Matcha? Quais os tipos e os seus benefícios | `o-que-e-matcha` | Guia | `/blogs/noticias/o-que-e-matcha` |
| Guia definitivo de como fazer o matcha perfeito | `guia-preparo-matcha` | Guia | `/blogs/noticias/guia-preparo-matcha` |
| 7 benefícios comprovados do Matcha para sua saúde | `beneficios-do-matcha` | Saúde | `/blogs/noticias/beneficios-do-matcha` |

### Linkagem na Homepage

A seção `namu_blog` em `templates/index.json` aponta para o blog `"noticias"`:

```json
"namu_blog": {
  "type": "namu-blog",
  "settings": {
    "blog": "noticias",
    "pill_label": "Blog Namu",
    "title": "Matcha do Zero ao Avançado",
    "posts_to_show": 3
  }
}
```

### Linkagem no Footer

Os links do blog foram adicionados diretamente em `sections/namu-footer.liquid` (linha 65-73), pois a API de menus não estava acessível para criar itens via GraphQL:

```html
<nav aria-label="Blog">
  <a href="/blogs/noticias/o-que-e-matcha">O que é Matcha?</a>
  <a href="/blogs/noticias/guia-preparo-matcha">Guia de Preparo</a>
  <a href="/blogs/noticias/beneficios-do-matcha">Benefícios do Matcha</a>
  <a href="/blogs/noticias">Ver todos os artigos</a>
</nav>
```

### Template de Artigo

O template `templates/article.json` define a estrutura da página de artigo. A imagem do artigo (banner) é exibida pela seção hero do template, usando `article.image`.

### Blog de Receitas

Existe também um blog separado `"receitas-matcha"` (handle: `receitas-matcha`), usado na seção `namu-recipes` da homepage com tags para filtrar: `bebidas-geladas`, `bebidas-quentes`, `comidinhas`.

---

## 6. API GraphQL Admin

### Como criar um artigo via API

Use o endpoint GraphQL Admin com o token de acesso. Exemplo em curl:

```bash
curl -X POST https://7uvwdy-up.myshopify.com/admin/api/2025-04/graphql.json \
  -H "X-Shopify-Access-Token: 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" \
  -H "Content-Type: application/json" \
  -d @payload.json
```

### Mutation: articleCreate

```graphql
mutation {
  articleCreate(input: {
    blogId: "gid://shopify/Blog/96208060494"
    title: "Título do Artigo"
    handle: "titulo-do-artigo"
    tags: ["Guia"]
    body_html: "<p>Conteúdo HTML do artigo...</p>"
    excerpt: "Resumo curto do artigo para cards e SEO"
    image: {
      src: "https://images.unsplash.com/photo-xxxx"
      alt_text: "Descrição da imagem"
    }
  }) {
    article {
      id
      url
      handle
    }
    userErrors { field message }
  }
}
```

### Mutation: articleUpdate (adicionar imagem)

> ⚠️ **Importante:** O campo `id` é um argumento separado da mutation, **não** dentro de `ArticleUpdateInput`. Esta é uma armadilha comum.

```graphql
mutation articleUpdate(
  $id: ID!
  $article: ArticleUpdateInput!
) {
  articleUpdate(id: $id, article: $article) {
    article { id handle image { url alt_text } }
    userErrors { field message }
  }
}

# Variáveis:
{
  "id": "gid://shopify/Article/88888888888",
  "article": {
    "image": {
      "src": "https://images.unsplash.com/photo-xxxx",
      "alt_text": "Descrição da imagem"
    }
  }
}
```

### Query: Listar artigos

```graphql
{
  blog(id: "gid://shopify/Blog/96208060494") {
    articles(first: 50) {
      edges {
        node {
          id
          title
          handle
          url
          tags
          excerpt
          image { url alt_text }
        }
      }
    }
  }
}
```

### Query: Obter blog ID

```graphql
{
  blogs(first: 20) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
```

---

## 7. Guia de Banners

O guia visual completo com todas as especificações de banner (zonas, safe areas, comportamento de crop, responsividade) está disponível no arquivo separado:

**`guia-banners-namu.html`** — Abrir no navegador para visualizar os diagramas interativos.

### Resumo das Medidas-Chave

| Item | Medida | Observação |
|------|--------|-----------|
| Header pill altura (desktop) | 88px | Z-index 50, position fixed |
| Header pill altura (mobile) | 72px | Mesma posição |
| Announcement bar | 56px | Pode ser hidden — reduz a dead zone |
| Banner altura | `calc(100vh - 56px)` | 100% da viewport menos announcement bar |
| Dead zone (topo) | 0–56px do topo | Coberta pela pill e announcement bar |
| Safe zone lateral | 15% de cada lado | Centro = 70% da largura |
| Zona de corte (borda) | ~15% de cada lado | Pode ser cortada pelo object-fit |
| object-fit | `cover` | Preenche o container — corta bordas |

### Boas Práticas para o Designer

- **Nunca place texto importante nos 15% laterais** — serão cortados em telas menores.
- **Deixe 56px livres no topo** — essa área fica sob a announcement bar e header pill.
- **Posicione textos no centro (70% central)** — fica visível em todas as telas.
- **Para mobile 9:16:** o topo é cortado para revelar o centro (mesma mecânica do cover).
- **Para ultrawide 21:9:** as laterais são cortadas — o centro fica intacto.
- **Resolução recomendada:** mínimo 1920×1080px para desktop. Proporção 16:9 é a mais segura.

### Checklist de Entrega de Banner

- [ ] Imagem em alta resolução (mín. 1920px de largura)
- [ ] Texto principal dentro da zona segura (70% central)
- [ ] Topo livre (mín. 56px sem elementos essenciais)
- [ ] Versão desktop e mobile (mesma imagem, diferentes crops ou versões dedicadas)
- [ ] Formato: JPG com compressão ~85% ou WebP

---

## 8. Paleta de Cores

O tema utiliza um sistema de **color schemes** configurável via `settings_data.json`. Cada scheme define cores para background, texto, botões, etc.

### Color Schemes Definidos

| Scheme | Background | Texto | Botão | Label do Botão |
|--------|-----------|-------|-------|---------------|
| **scheme-1** (Principal) | `#FFFFFF` | `#121212` | `#121212` | `#FFFFFF` |
| **scheme-2** (Claro) | `#F3F3F3` | `#121212` | `#121212` | `#F3F3F3` |
| **scheme-3** (Escuro) | `#242833` | `#FFFFFF` | `#FFFFFF` | `#000000` |
| **scheme-4** (Black) | `#121212` | `#FFFFFF` | `#FFFFFF` | `#121212` |
| **scheme-5** (Azul) | `#334FB4` | `#FFFFFF` | `#FFFFFF` | `#334FB4` |

### Cor Institucional Namu

| Cor | Hex | Uso |
|-----|-----|-----|
| 🟩 Verde Institucional | `#045133` | Cor principal da marca |
| 🟪 Roxo | `#33348E` | Categoria Blends |
| 🟦 Azul | `#10A6BD` | Categoria Utensílios |
| 🟧 Laranja | `#BE5B28` | Categoria Kits |
| ⬛ Preto | `#121212` | Texto e botões |

---

## 9. Deploy e Manutenção

### Desenvolvimento Local

```bash
# 1. Instalar Shopify CLI (se ainda não instalado)
npm install -g @shopify/cli @shopify/theme

# 2. Fazer login na loja
shopify auth login --store 7uvwdy-up.myshopify.com

# 3. Iniciar servidor local
shopify theme dev --store 7uvwdy-up.myshopify.com

# 4. Deploy para a loja (development)
shopify theme push --live
```

### Loop de Desenvolvimento

1. Edite os arquivos em `sections/`, `snippets/`, `assets/`.
2. O CLI detecta mudanças e atualiza o preview automaticamente.
3. Use o Theme Editor no navegador para ajustar settings e blocos.
4. Quando satisfeito, use `shopify theme push --live` para publicar.

### Publicar Artigo via API

Para publicar um novo artigo, use o script `scripts/create-article.mjs` ou faça manualmente:

```json
{
  "query": "mutation articleCreate($input: ArticleInput!) { articleCreate(input: $input) { article { id url handle } userErrors { field message } } }",
  "variables": {
    "input": {
      "blogId": "gid://shopify/Blog/96208060494",
      "title": "Título do artigo",
      "handle": "titulo-do-artigo",
      "tags": ["Guia"],
      "body_html": "<p>Conteúdo...</p>",
      "excerpt": "Resumo curto",
      "image": { "src": "https://...", "alt_text": "..." }
    }
  }
}
```

### Pontos de Atenção

- **Não commite o arquivo `.env`** em repositórios.
- **Não altere o `SHOPIFY_API_VERSION`** sem testar — mutations podem mudar de versão para versão.
- **Ao criar artigos:** o `handle` é usado na URL. Use apenas letras minúsculas, números e hífens.
- **Imagens de banner:** Shopify aceita URLs externas em `articleUpdate`. Hospede as imagens em CDN confiável.
- **Se o hero slider não aparece:** verifique se os `fallback_asset` existem em `assets/`.

---

## 10. Changelog

| Data | Tag | Descrição |
|------|-----|-----------|
| Jun/2026 | New | Criados 3 artigos no blog "noticias" via GraphQL Admin API (O que é Matcha, Guia de Preparo, Benefícios do Matcha). |
| Jun/2026 | API | Adicionadas imagens de banner aos 3 artigos via `articleUpdate` com URLs Unsplash externas. |
| Jun/2026 | New | Linkagem da homepage — seção `namu_blog` em `templates/index.json` configurada para consumir artigos reais do blog `noticias`. |
| Jun/2026 | New | Linkagem do footer — adicionada seção "Blog" em `namu-footer.liquid` com links para os 3 artigos e link para blog completo. |
| Jun/2026 | Doc | Criado guia de banners `guia-banners-namu.html` com especificações visuais completas para o designer (zonas, safe areas, crop, responsividade). |
| Jun/2026 | Doc | Criada esta documentação completa para handover ao cliente. |

---

*Namu Matcha Store — Documentação Técnica · Jun/2026*
*Domínio: namu-matcha.myshopify.com · CNPJ: 41.401.743/0001-50*
