# Namu Matcha — Master PRD
> Product Requirements Document — Versão 1.0
> Documento de fonte única para humanos, desenvolvedores, designers e IAs (Claude Code, Cursor, Lovable, v0).
> **Stack:** Shopify Liquid + Vanilla JS · **Tema base:** Dawn customizado · **Idioma:** pt-BR

---

## 1. VISION & BRAND

### Visão
Construir o ecommerce de matcha mais respeitado do Brasil — não pelo preço, mas pela origem, pela cultura e pela experiência. A Namu é a única marca brasileira com exclusividade do matcha de Hadong (Coreia do Sul), certificada pelo Green Tea Institute. O site deve ser uma extensão visual e ritualística dessa autoridade.

### Missão do produto digital
- Educar o público brasileiro sobre matcha de qualidade
- Converter visitantes em clientes B2C com experiência premium
- Capturar leads B2B (cafeterias, restaurantes)
- Migrar audiência do WordPress para um ecossistema Shopify unificado

### Marca
- **Fundador:** Álvaro Dominguez
- **Desde:** 02/04/2021
- **Sede:** Pinheiros/SP
- **Operação:** 2 fulltime + 12 part-time
- **Receita:** B2B R$230k/mês · B2C R$60-70k/mês
- **Audiência:** 25,3k Instagram · 1.000+ cafeterias B2B
- **Loja:** namu-matcha.myshopify.com
- **Site atual:** namumatcha.com.br (WordPress legado)

---

## 2. BRAND EXPERIENCE PRINCIPLES

1. **Educação antes de venda** — o usuário aprende sobre matcha antes de ser convidado a comprar
2. **Silêncio é premium** — whitespace generoso, ritmo respirando, sem poluição visual
3. **Origem é o herói** — Hadong, Green Tea Institute, rastreabilidade são protagonistas
4. **Verde é a cor do produto** — toda paleta serve para realçar o verde do matcha
5. **Ritual, não urgência** — copy contemplativo ("Descubra"), nunca agressivo ("COMPRE JÁ!")
6. **Acessórios falam japonês** — Chasen, Chashaku, Chawan — autenticidade cultural
7. **Mobile é o canvas primário** — design começa no mobile e expande
8. **Motion direcional, nunca decorativo** — cada animação tem intenção
9. **Performance é parte do premium** — Lighthouse ≥ 85 mobile, ≥ 92 desktop
10. **Acessibilidade é não-negociável** — WCAG AA mínimo

---

## 3. ECOMMERCE STRATEGY

### Modelo
- **B2C principal:** ticket médio R$80-150, matchas + acessórios
- **B2B secundário:** captura de lead via formulário → atendimento manual via WhatsApp
- **Sem subscription** (fora do escopo)
- **Sem programa de fidelidade** (fora do escopo)

### Funil de conversão
```
Awareness  → Instagram, Ads, Indicação, SEO
Discovery  → Homepage, Blog, Coleções
Education  → PDP, Páginas estáticas, Receitas
Purchase   → Mini-cart drawer + Checkout Shopify nativo
Retention  → Email Shopify + Reviews Judge.me
```

### Alavancas de CRO
| Alavanca | Implementação |
|---|---|
| Mini-cart lateral | Sem reload, abre ao clicar "Comprar" |
| Barra de progresso | "Falta R$X para frete grátis" + "Falta R$X para brinde surpresa" |
| Reviews na PDP | Judge.me com visual customizado |
| Cross-sell carrinho | "Complete seu kit" inline no drawer |
| Mais vendidos visível | Carrossel logo abaixo do hero |
| Sticky CTA mobile na PDP | "Comprar" fixo no rodapé do mobile |

---

## 4. TECHNICAL STACK

### Frontend
- **Templating:** Shopify Liquid (Dawn como base)
- **JavaScript:** Vanilla ES6+ (sem framework, sem jQuery)
- **CSS:** CSS custom properties + arquivos modulares por seção
- **Build:** Sem build step — arquivos servidos pelo Shopify CDN
- **Fontes:** Google Fonts (Libre Baskerville + Work Sans) com `display=swap`
- **Imagens:** Shopify CDN com `image_url` filter (WebP automático)

### Backend
- **Plataforma:** Shopify (sem headless, sem Hydrogen)
- **API:** Shopify Liquid + Ajax API (`/cart/add.js`, `/cart.js`, `/cart/change.js`)
- **Storefront API:** não usado nesta fase

### Apps Shopify
| App | Função | Custo |
|---|---|---|
| Judge.me | Reviews | Gratuito (plano free) |
| Shopify Email | Email marketing | Nativo |
| Shopify Analytics | Métricas | Nativo |
| Meta Pixel | Ads tracking | Nativo Shopify |
| GTM | Tag manager | Via `theme.liquid` (fase 2) |

### Ambiente
- **Theme dev:** ID `149681143886` (Development - 64a428-Gabriel)
- **Theme live:** ID `149660729422` (Horizon — OFF-LIMITS sem permissão)
- **Store password:** `namu`
- **Localhost:** `http://127.0.0.1:9292` via `shopify theme dev`
- **Versionamento:** Git (repositório local + GitHub)
- **CI/CD:** Push manual via Shopify CLI
- **Preview público:** `https://namu-matcha.myshopify.com/?preview_theme_id=149681143886`

---

## 5. SHOPIFY ARCHITECTURE

### Estrutura de diretórios
```
namu-shopify/
├── assets/                 # CSS, JS, imagens, fontes
│   ├── namu-tokens.css     # design tokens globais
│   ├── namu-*.css          # estilos por seção
│   ├── namu-*.js           # JS por funcionalidade
│   └── *.svg, *.jpg        # mídia
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   ├── theme.liquid        # wrapper global
│   └── password.liquid     # página de senha
├── locales/
│   └── pt-BR.json          # traduções
├── sections/
│   ├── namu-*.liquid       # seções customizadas
│   ├── header-group.json   # grupo do header
│   └── footer-group.json   # grupo do footer
├── snippets/
│   └── namu-*.liquid       # componentes reutilizáveis
└── templates/
    ├── index.json          # homepage
    ├── product.json        # PDP padrão
    ├── collection.json     # collection padrão
    └── page.*.json         # páginas estáticas
```

### Convenções de nomenclatura
- Seções customizadas: `namu-[nome].liquid`
- CSS: `namu-[nome].css`
- JS: `namu-[nome].js`
- Snippets: `namu-[nome].liquid`
- Classes CSS: prefixo `namu-` para evitar conflito com Dawn

### Iron Laws (do CLAUDE.md)
- Nunca push sem ordem explícita do usuário
- Sempre usar theme ID `149681143886` em dev
- Cache-busting first em qualquer report de bug visual
- Reuse before create (sempre Glob antes de criar arquivo novo)
- Toque SOMENTE no que foi pedido (Iron Law #13)

---

## 6. CMS STRUCTURE

### Áreas editáveis pelo Theme Editor (merchant)
| Área | Editável | Schema |
|---|---|---|
| Homepage seções | ✅ | Cada `namu-*.liquid` tem `{% schema %}` com settings |
| Hero slider | ✅ | Blocks com 5 slides |
| Marquee texto | ✅ | Blocks com até 12 itens |
| Categorias homepage | ✅ | 4 blocks fixos |
| Receitas homepage | ✅ | Blocks ilimitados |
| Blog homepage | ✅ | Blocks com 3 artigos |
| Newsletter | ✅ | Texto, tagline, CTA editáveis |
| Footer | ✅ | 5 colunas com links editáveis |
| Announcement bar | ✅ | Texto rotativo |
| Header | ✅ | Logo, menu, contatos |

### Metafields necessários (produto)
| Namespace | Key | Tipo | Uso |
|---|---|---|---|
| `namu` | `preparo` | rich_text | Instruções de preparo na PDP |
| `namu` | `origem` | single_line_text | "Hadong, Coreia do Sul" |
| `namu` | `categoria_cor` | color | Badge de categoria (4 cores) |
| `namu` | `rendimento` | single_line_text | "Rende 15 doses (2g/dose)" |
| `namu` | `nivel` | single_line_text | "Iniciante / Avançado" |
| `namu` | `intensidade` | number_integer | 1-5 (intensidade do sabor) |

### Frequência de atualização esperada
- Homepage: 1-2x por semana (banners, destaques)
- Blog: 2-4 artigos/mês
- Produtos: cadastro contínuo
- Páginas estáticas: trimestral

---

## 7. SITEMAP

> Detalhe completo em `namu-prd-sitemap.md`. Resumo:

```
/                                      Homepage ✅
├── /collections/
│   ├── mais-vendidos                  Mais Vendidos ✅
│   ├── matcha-puro                    Matchas Puros
│   ├── blends                         Blends
│   ├── acessorios                     Acessórios
│   ├── kits                           Kits & Bundles (fase futura)
│   ├── colaboracoes                   Colaborações
│   └── all                            Todos os Produtos
├── /products/[handle]                 PDP individual
├── /blogs/namu-journal                Blog
│   └── /[handle]                      Artigo
├── /pages/
│   ├── sobre                          Nossa História
│   ├── como-preparar                  Como Preparar
│   ├── b2b                            Para o seu Negócio
│   └── contato                        Contato
├── /cart                              Carrinho fallback
├── /search                            Busca
└── /account                           Conta (Dawn padrão fase 2)
```

---

## 8. NAVIGATION SYSTEM

### Header (sticky)
```
Desktop:
[Logo Namu]    Matchas  Acessórios  Receitas  Sobre  B2B    [🔍] [👤] [🛒]

Mobile:
[☰]  [Logo Namu]                                         [🔍] [🛒]
```

### Mega-Menu — Matchas
```
┌─ MATCHAS PUROS ─────  ┌─ BLENDS ──────────  ┌─ CALLOUT ────────┐
│ Cerimonial            │ Vanilla 30g          │ [Imagem]         │
│ Premium               │ Vanilla 150g         │ "Matcha Fresco"  │
│ Culinário             │ Sweet                │ → /collections/  │
│ → Ver todos           │ Vanilla Zero         │   matcha-puro    │
└─────────────────────  └─────────────────────  └──────────────────┘
```

### Mega-Menu — Acessórios
```
┌─ UTENSÍLIOS ────────  ┌─ EDIÇÕES ESP. ────  ┌─ CALLOUT ────────┐
│ Chasen                │ Chawan Maíra         │ [Imagem]         │
│ Chashaku              │ Gatito (Maneki-Neko) │ "Chasen 100 fios"│
│ Chawan Barista        │ Chocolate Branco     │ → produto        │
│ Naoshi                │ Chasen Prop          │                  │
│ → Ver todos           │                      │                  │
└─────────────────────  └─────────────────────  └──────────────────┘
```

### Mobile Menu (drawer lateral esquerdo)
```
Drawer 320px:
[X]
─────────────
🍵 Matchas      ▾
🛍️ Acessórios   ▾
📖 Receitas
✨ Nossa História
🤝 B2B
─────────────
Conta
WhatsApp
@namumatcha
```

### Comportamento
- Header sticky com fundo `--namu-verde-matcha` opaco
- Ao scroll, sombra sutil aparece (`--namu-shadow-sm`)
- Mega-menu abre no hover (desktop), com transição 0.2s ease + translateY(-8px → 0)
- Mobile: drawer slideIn da esquerda, overlay escuro (`rgba(0,0,0,0.4)`)
- Ícones touch-friendly: 44×44px mínimo

---

## 9. DESIGN SYSTEM SUMMARY

> Detalhe completo em `namu-design-system.md`. Resumo executivo:

### Cores (do Manual de Marca)
- Primária: `#045133` (Verde Matcha)
- Accent: `#78C33F` (Verde Puro)
- Categorias: `#BE5B28` Laranja · `#10A6BD` Azul Cerimonial · `#33348E` Azul Vanilla
- Apoio: `#F4F4F0` Branco Porcelana · `#2D2D2D` Cinza Sombra · `#666666` Cinza Médio

### Tipografia
- Títulos: Libre Baskerville 400 (regular ou italic)
- UI: Work Sans 300/400/500/600 (NUNCA 700)
- Eyebrow labels: Work Sans 600 uppercase + letter-spacing 0.1em

### Spacing
Sistema 4px base · seções 56px mobile / 80px desktop

### Radius
6/10/16/20/24/32/999px (pill)

### Sombras
6 níveis (xs, sm, md, lg, xl, green)

### Motion
- Transições: 0.18s / 0.25s / 0.4s
- Scroll reveal: fade + translateY(24px → 0)
- Hover cards: zoom 1.04 + sombra md + botão fade-in

### Iconografia
> **REGRA CRÍTICA: ZERO emojis. Ícones sempre minimalistas, traço fino, classe premium.**
- **Estilo:** SVG stroke-based (não filled)
- **Peso de traço:** 1.5px a 2px
- **Cores:** `#2D2D2D` (padrão) ou `#78C33F` (destaque)
- **Tamanho:** 24px (nav), 32px (seções), 48px (benefícios/destaque)
- **Fonte recomendada:** Feather Icons ou Phosphor Light
- **NÃO usar:** Emojis, ícones muito pesados (stroke > 2.5px), ícones coloridos/multi-cor

**Ícones obrigatórios (exemplos):**
| Elemento | Usar | ❌ Nunca |
|----------|------|---------|
| Busca | SVG magnifier | 🔍 |
| Carrinho | SVG shopping bag | 🛒 |
| Perfil | SVG user circle | 👤 |
| Entrega | SVG truck | 🚚 |
| Certificado | SVG award/check | ✓ ⭐ |

---

## 10. MOTION SYSTEM

### Princípios
- Motion **direcional** — sempre tem intenção (entrada, hover, click)
- Motion **respeita reduce-motion** — fallback obrigatório
- Motion **suporta a leitura** — nunca distrai do conteúdo

### Specs por elemento

#### Scroll reveal (entrada de seção)
```
Trigger:        IntersectionObserver (threshold 0.15)
Animação:       opacity 0→1 + translateY(24px → 0)
Duração:        0.6s
Easing:         cubic-bezier(0.22, 1, 0.36, 1)
Stagger:        80ms entre elementos sequenciais
```

#### Hover em card de produto
```
Imagem:         scale(1.0 → 1.04) em 0.4s
Sombra:         --namu-shadow-sm → --namu-shadow-md
Botão "Comprar":opacity 0 → 1 + translateY(8px → 0)
                aparece em 0.25s, delay 0.05s
```

#### Mega-menu
```
Abertura:       opacity 0 → 1 + translateY(-8px → 0)
Duração:        0.2s ease
Fechamento:     reverse 0.15s
```

#### Mini-cart drawer
```
Slide-in:       transform translateX(100% → 0)
Duração:        0.35s cubic-bezier(0.22, 1, 0.36, 1)
Overlay:        opacity 0 → 1, mesmo timing
Itens add:      flash background verde claro 0.6s
```

#### Botões
```
Hover:          background-color shift em 0.18s ease
Click:          scale(0.98) por 0.1s, depois reset
```

#### Marquee infinito (já implementado)
```
Velocidade:     80px/s
Mecanismo:      requestAnimationFrame + clones JS
Pause hover:    sim
```

#### Hero slider
```
Transição:      crossfade 0.8s ease
Autoplay:       6s por slide
Indicadores:    pills clicáveis no rodapé
```

---

## 11. HOMEPAGE SPECS

### Estrutura final (9 seções)

#### 1. Hero Slider — `namu-hero-slider.liquid` ✅
- 5 slides full-width
- Imagem desktop + mobile separadas
- Autoplay 6s + indicadores clicáveis
- Texto + CTA opcional por slide
- Overlap header (transparência inicial)

#### 2. Marquee Rotativo — `namu-marquee.liquid` ✅
- Loop infinito JS (80px/s)
- Até 12 blocks de texto
- Fundo verde matcha + texto branco
- Pause no hover

#### 3. Produtos em Destaque — `namu-featured-products.liquid` ⚠️ refatorar
- Eyebrow label "MAIS VENDIDOS"
- Título H2 Baskerville
- Carrossel scroll horizontal nativo (snap)
- Cards com hover (zoom + botão "Comprar")
- Mobile: scroll horizontal · Desktop: 4 colunas
- CTA final "Ver toda a coleção"

#### 4. Categorias — `namu-categories.liquid` ✅
- 4 cards (Matchas Puros / Blends / Utensílios / Kits)
- Imagem + overlay + título centralizado
- Hover: imagem zoom + overlay clareia

#### 5. B2B Banner — `namu-b2b.liquid` ✅
- Editorial: imagem + texto lado a lado
- 3 tags + título + subtítulo + CTA
- Link para `/pages/b2b`

#### 6. Receitas — `namu-recipes.liquid` ✅
- Eyebrow + título + 4 cards
- Cada card: categoria + título + imagem
- CTA "Ver todas" → blog filtrado

#### 7. Newsletter — `namu-newsletter.liquid` ✅
- Logo branco + tagline
- Título + subtítulo + form (1 campo email + botão)
- Fundo verde matcha + textura sutil de folhas (opacity 0.05)

#### 8. Blog Editorial — `namu-blog.liquid` ✅
- Eyebrow "MATCHA BLOG"
- 3 artigos featured
- Cards: tag + título + excerpt + CTA "Ler mais"

#### 9. Benefícios — `namu-benefits.liquid` ✅
- 6 ícones custom + texto curto
- Grid 2 col mobile / 3 col desktop / 6 col wide
- Fundo branco porcelana

### Ordem do `templates/index.json`
```
1. namu-hero-slider
2. namu-marquee
3. namu-featured-products
4. namu-categories
5. namu-b2b
6. namu-recipes
7. namu-newsletter
8. namu-blog
9. namu-benefits
```

---

## 12. PDP SPECS — Página de Produto

### Wireframe (desktop)
```
┌─────────────────────────────────────────────────────┐
│  Header sticky                                       │
├─────────────────────────────────────────────────────┤
│  Breadcrumb: Home / Matchas / Cerimonial            │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌─────────────────────────┐ │
│  │                  │  │ [BADGE categoria]        │ │
│  │   GALERIA        │  │ Nome do produto (H1)     │ │
│  │   (50% width)    │  │ Preço                    │ │
│  │   - imagem       │  │                          │ │
│  │     principal    │  │ [Variantes/tamanhos]     │ │
│  │   - thumbnails   │  │                          │ │
│  │     verticais    │  │ [— qtd +] [COMPRAR]      │ │
│  │     (5 max)      │  │                          │ │
│  │                  │  │ ─── divider ───          │ │
│  │                  │  │                          │ │
│  │                  │  │ Descrição curta          │ │
│  │                  │  │ • Origem                 │ │
│  │                  │  │ • Rendimento             │ │
│  │                  │  │ • Nível                  │ │
│  └──────────────────┘  └─────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│  SEÇÃO "COMO PREPARAR" (full width)                 │
│  3 passos com ícones + texto                        │
├─────────────────────────────────────────────────────┤
│  SEÇÃO "POR QUE HADONG?" (storytelling)             │
│  Imagem editorial + texto sobre origem              │
├─────────────────────────────────────────────────────┤
│  REVIEWS (Judge.me com visual custom)               │
│  Estrela média + qtd + lista de reviews             │
├─────────────────────────────────────────────────────┤
│  PRODUTOS RELACIONADOS (carrossel scroll horiz.)    │
└─────────────────────────────────────────────────────┘
```

### Wireframe (mobile)
```
[Header]
[Breadcrumb]
[Galeria full-width — swipe horizontal]
[Pills indicadores]
[Badge categoria]
[Nome H1]
[Preço]
[Variantes — pills horizontais]
[— qtd +]
[COMPRAR full-width — sticky no rodapé]
[Descrição]
[Como preparar]
[Por que Hadong?]
[Reviews]
[Produtos relacionados — scroll horiz.]
```

### Comportamentos
- Galeria: zoom no clique (lightbox simples)
- Variantes: pills, selecionável, atualiza preço/imagem dinamicamente
- Quantidade: input com botões — / + (min 1)
- "Comprar": adiciona ao carrinho via `/cart/add.js` AJAX → abre mini-cart drawer
- Sticky CTA mobile: aparece após scroll de 300px
- Reviews: lazy load (só carrega ao chegar perto)

---

## 13. COLLECTION PAGE SPECS

### Wireframe
```
┌─────────────────────────────────────────────────────┐
│  Header sticky                                       │
├─────────────────────────────────────────────────────┤
│  Breadcrumb: Home / Matchas Puros                   │
├─────────────────────────────────────────────────────┤
│  HERO DA COLEÇÃO (compacto, 200px)                  │
│  Eyebrow + Nome + Descrição curta                   │
├─────────────────────────────────────────────────────┤
│  FILTROS (pills horizontais)                        │
│  [Todos] [Cerimonial] [Premium] [Culinário]         │
│  [Ordenar: Mais vendidos ▾]                         │
├─────────────────────────────────────────────────────┤
│  GRID DE PRODUTOS                                   │
│  Mobile: 2 col · Tablet: 3 col · Desktop: 4 col     │
│                                                     │
│  [Card] [Card] [Card] [Card]                        │
│  [Card] [Card] [Card] [Card]                        │
│                                                     │
│  Paginação ou load more                             │
└─────────────────────────────────────────────────────┘
```

### Comportamentos
- Filtros: pills clicáveis, atualiza grid sem reload (URL params)
- Sort: dropdown nativo Shopify (default: mais vendidos)
- Card: hover zoom + sombra + botão "Comprar" aparece
- Click no card: navega para PDP
- Click no botão "Comprar" no card: adiciona direto + abre drawer
- Paginação: 24 produtos por página (mobile) / 48 (desktop)

---

## 14. CART & CHECKOUT UX

### Mini-Cart Drawer (componente principal)
```
Posição:     direita, fixed
Largura:     400px desktop / 100% mobile
Altura:      100vh
Overlay:     rgba(0,0,0,0.4) com backdrop-filter blur(2px)
Animação:    slide-in 0.35s
Radius:      24px no canto superior esquerdo
```

### Estrutura do drawer
```
[X fechar]                              [Ícone carrinho]
─────────────────────────────────────────────────────
SEU CARRINHO

[BARRA DE PROGRESSO]
████████████░░░░░░░░░ 60%
"Falta R$ 75 para frete grátis"

─────────────────────────────────────────────────────

[Imagem]  Nome do produto              [— 1 +]  R$ 65
          Variante                     [🗑]
─────────
[Imagem]  Nome do produto              [— 2 +]  R$ 130
          Variante                     [🗑]

─────────────────────────────────────────────────────

CROSS-SELL (1-2 produtos)
"Complete seu kit"
[mini-card com botão +]

─────────────────────────────────────────────────────

Subtotal                                R$ 195

[FINALIZAR COMPRA] (botão verde primary, full-width)

Frete e cupons calculados no checkout
```

### Estados do drawer
| Estado | Comportamento |
|---|---|
| Vazio | "Seu carrinho está vazio" + CTA "Descobrir produtos" |
| 1 item | Lista normal + barra de progresso |
| Threshold 1 atingido | "🎉 Frete grátis garantido!" |
| Threshold 2 atingido | "🎁 Brinde surpresa adicionado!" + ícone presente |
| Loading add | Skeleton no item recém-adicionado |
| Loading remove | Fade out 0.2s |

### Barra de progresso — lógica
```javascript
threshold_1 = 150  // frete grátis (R$)
threshold_2 = 250  // brinde surpresa (R$) — valores TBD

if (subtotal < threshold_1) {
  message = `Falta R$ ${threshold_1 - subtotal} para frete grátis`
  progress = (subtotal / threshold_1) * 100
} else if (subtotal < threshold_2) {
  message = `Falta R$ ${threshold_2 - subtotal} para brinde surpresa`
  progress = ((subtotal - threshold_1) / (threshold_2 - threshold_1)) * 100
} else {
  message = `🎁 Brinde surpresa garantido!`
  progress = 100
}
```

### Checkout
- Usar checkout Shopify nativo (não customizar nesta fase)
- Upsell/cross-sell no checkout: a definir (app vs código) — fase futura

---

## 15. SUBSCRIPTION UX

**Status:** ❌ FORA DO ESCOPO desta fase.
A Namu não terá assinatura/recorrência no lançamento. Decisão validada com fundador.
Fase futura: avaliar Shopify Subscriptions ou Recharge.

---

## 16. MOBILE UX

### Princípios
- Mobile-first: todo CSS começa mobile, escala via `@media (min-width: 750px)`
- Touch targets mínimos: 44×44px
- Carrosséis: scroll horizontal nativo + scroll-snap (sem libs)
- Gestos: swipe nativo do navegador
- Imagens: lazy load em tudo exceto LCP hero
- Fontes: nunca abaixo de 14px

### Adaptações específicas mobile
| Elemento | Mobile | Desktop |
|---|---|---|
| Menu | Drawer hambúrguer | Mega-menu hover |
| Botão "Comprar" no card | Sempre visível | Aparece no hover |
| CTA na PDP | Sticky no rodapé | Fixo na coluna direita |
| Galeria PDP | Swipe horizontal | Thumbnails verticais |
| Mini-cart | 100% width | 400px right drawer |
| Filtros coleção | Botão "Filtrar" → bottom sheet | Pills inline |
| Sort coleção | Dropdown nativo | Dropdown nativo |
| Footer | Acordeão por coluna | 5 colunas expandidas |

### Performance mobile
- Hero LCP < 2.5s
- TBT < 200ms
- Imagens otimizadas (WebP via Shopify CDN)
- CSS crítico inline no `<head>`
- JS deferred ou type="module"

---

## 17. PERFORMANCE REQUIREMENTS

### Metas Lighthouse
| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | ≥ 85 | ≥ 92 |
| Accessibility | ≥ 95 | ≥ 95 |
| Best Practices | ≥ 95 | ≥ 95 |
| SEO | ≥ 95 | ≥ 95 |

### Core Web Vitals
| Métrica | Alvo |
|---|---|
| LCP | < 2.5s |
| INP | < 100ms |
| CLS | < 0.1 |
| TBT | < 200ms |

### Otimizações obrigatórias
- Imagens: WebP automático via Shopify `image_url`
- srcset com 3 tamanhos mínimos (600w, 900w, 1200w)
- `loading="lazy"` em tudo exceto hero LCP
- `width` e `height` explícitos para evitar CLS
- CSS crítico inline (Dawn já faz isso)
- Fontes: `display=swap` + preconnect
- JS: deferred ou inline pequeno
- Sem libs externas (Swiper, Splide, jQuery)
- Carrosséis nativos com scroll-snap

### Budget de assets
- Hero image: max 150kb
- Imagens de produto: max 200kb
- CSS por seção: max 5kb
- JS por funcionalidade: max 8kb
- Total inicial (LCP route): max 500kb

---

## 18. SEO REQUIREMENTS

### Técnico
- Meta tags via `theme.liquid` + por template
- Open Graph: `og:image`, `og:title`, `og:description`
- Twitter Card: summary_large_image
- Canonical URLs (Shopify nativo)
- Schema.org JSON-LD:
  - Product (em PDP)
  - Article (em blog)
  - Organization (no `theme.liquid`)
  - BreadcrumbList (em todas as páginas internas)
- Sitemap: Shopify gera automaticamente em `/sitemap.xml`
- robots.txt: Shopify nativo

### On-page
| Página | Title pattern | Foco SEO |
|---|---|---|
| Homepage | "Namu Matcha — Matcha Premium de Hadong, Coreia do Sul" | brand + origem |
| Coleção | "[Nome da Coleção] — Namu Matcha" | categoria |
| PDP | "[Produto] — [Categoria] — Namu Matcha" | produto + intent |
| Blog | "[Título Artigo] — Namu Journal" | informacional |
| Sobre | "Nossa História — Namu Matcha" | brand |

### Migração WordPress → Shopify
- 20 artigos para migrar
- Manter slugs originais (configurar 301 redirects)
- Preservar meta description + título
- Re-otimizar imagens (Shopify CDN)
- Verificar broken links após migração

---

## 19. ACCESSIBILITY REQUIREMENTS

### Padrão alvo: WCAG 2.1 AA

### Checklist obrigatório
- [x] Contraste mínimo 4.5:1 texto normal
- [x] Contraste mínimo 3:1 texto grande / UI
- [x] `alt` em todas as imagens
- [x] `aria-label` em botões sem texto
- [x] Focus visible (outline 2px verde + offset 3px)
- [x] Navegação por teclado em todos os elementos interativos
- [x] `prefers-reduced-motion` respeitado
- [x] Heading hierarchy correta (h1 → h2 → h3)
- [x] Form labels associados a inputs
- [x] Skip link para conteúdo principal
- [x] Language declarado: `<html lang="pt-BR">`
- [x] Touch targets ≥ 44×44px

### Implementação
```css
:focus-visible {
  outline: 2px solid var(--namu-verde-matcha);
  outline-offset: 3px;
  border-radius: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 20. ANALYTICS & TRACKING

### Fase 1 (lançamento)
- **Shopify Analytics:** nativo, ativo
- **Google Analytics 4:** instalar via Shopify admin
- **Meta Pixel:** instalar via Shopify admin (canal Facebook & Instagram)

### Fase 2 (otimização)
- **GTM:** container customizado via `theme.liquid`
- **Microsoft Clarity:** heatmaps + recordings
- **TikTok Pixel:** se houver mídia paga TikTok
- **Hotjar:** opcional, alternativa ao Clarity

### Eventos críticos a trackar
| Evento | Trigger | Plataforma |
|---|---|---|
| `view_item` | Carregamento PDP | GA4 + Meta |
| `add_to_cart` | Click "Comprar" | GA4 + Meta |
| `view_cart` | Abertura mini-cart | GA4 |
| `begin_checkout` | Click "Finalizar" | GA4 + Meta |
| `purchase` | Order Confirmation | GA4 + Meta |
| `lead` | Submit form B2B | GA4 + Meta |
| `newsletter_signup` | Submit newsletter | GA4 |

---

## 21. INTEGRATIONS

| Integração | Tipo | Status | Implementação |
|---|---|---|---|
| Shopify Email | Email transacional + marketing | Nativo | Configuração admin |
| Judge.me | Reviews | A instalar | App + visual custom via CSS |
| WhatsApp Business | Atendimento | Link direto | `https://wa.me/55119...` |
| Meta Pixel | Ads tracking | Nativo Shopify | Canal Facebook |
| Google Analytics 4 | Analytics | Nativo Shopify | Admin → Analytics |
| GTM | Tag manager | Fase 2 | `theme.liquid` |
| WordPress | Blog migration | Manual | Export XML → Shopify import |
| Correios / transportadoras | Frete | Shopify nativo | Configurado em Settings |

---

## 22. COMPONENT INVENTORY

### ✅ Já construídos
- `namu-hero-slider` (homepage)
- `namu-marquee` (homepage)
- `namu-featured-products` (homepage)
- `namu-categories` (homepage)
- `namu-b2b` (homepage)
- `namu-recipes` (homepage)
- `namu-newsletter` (homepage)
- `namu-blog` (homepage)
- `namu-benefits` (homepage)
- `namu-header` + mega-menu parcial
- `namu-footer`
- `announcement-bar`

### 🔴 Construir (Fase 1 — crítico)
| Componente | Tipo | Arquivo |
|---|---|---|
| Mini-cart drawer | Section + JS | `sections/namu-cart-drawer.liquid` + `assets/namu-cart.js` |
| Cart progress bar | Snippet | `snippets/namu-cart-progress.liquid` |
| Product Detail Page | Template + Section | `templates/product.json` + `sections/namu-product.liquid` |
| Collection Page | Template + Section | `templates/collection.json` + `sections/namu-collection.liquid` |
| Product Card (snippet) | Snippet | `snippets/namu-product-card.liquid` |
| Scroll Reveal JS | Asset | `assets/namu-reveal.js` |
| Mega-menu completo | Section | refatorar `namu-header.liquid` |

### 🟡 Construir (Fase 2 — conteúdo)
| Componente | Tipo | Arquivo |
|---|---|---|
| Blog index | Template + Section | `templates/blog.json` + `sections/namu-blog-index.liquid` |
| Article page | Template + Section | `templates/article.json` + `sections/namu-article.liquid` |
| Página Sobre | Template + Section | `templates/page.sobre.json` + `sections/namu-sobre.liquid` |
| Página Como Preparar | Template + Section | `templates/page.preparo.json` + `sections/namu-preparo.liquid` |
| Página B2B | Template + Section | `templates/page.b2b.json` + `sections/namu-b2b-page.liquid` |
| Página Contato | Template + Section | `templates/page.contato.json` |
| Search results | Template | `templates/search.json` + `sections/namu-search-results.liquid` |
| 404 customizada | Template | `templates/404.json` |

---

## 23. STATES & EDGE CASES

### Carrinho
- Vazio → mensagem + CTA descobrir produtos
- 1 item → barra de progresso "falta X para frete grátis"
- Threshold 1 → "frete grátis garantido"
- Threshold 2 → "brinde adicionado"
- Loading → skeleton
- Erro de estoque → mensagem inline no item

### PDP
- Sem variante → botão direto
- Com variantes → seletor obrigatório
- Sem estoque → "Avise-me" (fase 2) ou desabilita botão
- Sem reviews ainda → "Seja o primeiro a avaliar"

### Coleção
- Sem produtos → mensagem editorial
- Com filtros → pills ativas + reset
- Loading → skeleton de 8 cards

### Busca
- Vazia → sugestões + coleções populares
- Sem resultados → "Não encontramos X" + sugestões
- Com resultados → produtos + artigos

### Form B2B
- Loading → spinner no botão
- Sucesso → mensagem + redirect para WhatsApp
- Erro → mensagem inline

### Network
- Offline → fallback message
- Lento → skeleton em todos os componentes async

---

## 24. FEATURE PRIORITY TABLE

| Feature | Prioridade | Esforço | Impacto | Fase |
|---|---|---|---|---|
| Mini-cart drawer | 🔴 Alta | M | Alto | 1 |
| Cart progress bar | 🔴 Alta | S | Alto | 1 |
| Product Detail Page | 🔴 Alta | L | Crítico | 1 |
| Collection Page | 🔴 Alta | M | Crítico | 1 |
| Scroll reveal global | 🔴 Alta | S | Médio | 1 |
| Mega-menu completo | 🔴 Alta | M | Alto | 1 |
| Página Sobre | 🟡 Média | M | Médio | 2 |
| Página B2B + form | 🟡 Média | M | Alto | 2 |
| Blog migration | 🟡 Média | L | Médio | 2 |
| Judge.me + visual | 🟡 Média | M | Alto | 2 |
| Página Como Preparar | 🟡 Média | M | Médio | 2 |
| GTM + pixels | 🟢 Baixa | S | Médio | 3 |
| SEO técnico (schemas) | 🟢 Baixa | M | Médio | 3 |
| Kits/Bundles | 🟢 Baixa | M | Baixo | 3 |
| Search avançada | 🟢 Baixa | L | Baixo | 3 |
| Subscription | ⬜ Out | — | — | — |
| Loyalty | ⬜ Out | — | — | — |
| Multi-idioma | ⬜ Out | — | — | Futuro |

---

## 25. ANIMATION SPECS

### Token global de easing
```css
--ease-out-expo:    cubic-bezier(0.22, 1, 0.36, 1);
--ease-out-back:    cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);
```

### Specs por interação

#### Page load (sequência inicial)
```
T+0ms     header fade-in
T+100ms   hero image fade-in + scale(0.98 → 1)
T+200ms   hero title fade-in + translateY(16px → 0)
T+300ms   hero CTA fade-in
T+400ms   pin slider indicators
```

#### Scroll reveal (cada seção)
```
Trigger:   IntersectionObserver, threshold 0.15
Headings:  opacity 0→1 + translateY(24px → 0) em 0.6s ease-out-expo
Body:      delay 0.1s, mesma animação
Cards:     stagger 80ms entre cards
```

#### Hover card produto
```
Trigger:   :hover
Imagem:    scale(1 → 1.04) em 0.4s ease-out-expo
Sombra:    --namu-shadow-sm → --namu-shadow-md em 0.25s
Botão:     opacity 0 → 1 + translateY(8px → 0) em 0.25s, delay 0.05s
```

#### Add to cart
```
Click:     scale(0.98) por 0.1s
Loading:   spinner branco no botão por 200-400ms
Sucesso:   checkmark verde por 600ms
Drawer:    slide-in da direita 0.35s ease-out-expo
Item novo: flash verde claro 0.6s
```

#### Mini-cart open
```
Overlay:   opacity 0 → 1 em 0.3s
Drawer:    translateX(100% → 0) em 0.35s ease-out-expo
Itens:     stagger 50ms fade-in
```

#### Mini-cart close
```
Overlay:   opacity 1 → 0 em 0.25s
Drawer:    translateX(0 → 100%) em 0.3s ease-in
```

#### Quantity change
```
Click:     scale(0.95) por 0.1s
Number:    flash com background verde 0.3s
Subtotal:  count-up animation 0.4s
```

#### Mega-menu open
```
Trigger:   :hover no link da nav
Menu:      opacity 0 → 1 + translateY(-8px → 0) em 0.2s ease
Itens:     stagger 30ms fade-in
```

---

## 26. ASSET REQUIREMENTS

### Imagens necessárias (mínimo viável)

#### Hero (5 slides)
- 5 imagens desktop: 1920×900, WebP, max 200kb cada
- 5 imagens mobile: 750×900, WebP, max 150kb cada
- Atualmente: usando placeholder fallback assets

#### Categorias homepage (4 imagens)
- 800×800, WebP, max 100kb cada

#### Produtos (14 SKUs)
- Mínimo 1 foto cada, ideal 3-5 fotos
- 1200×1200 quadrada, WebP, max 200kb
- Fundo: branco ou branco porcelana
- Studio limpo (princípio definido)

#### Categorias B2B + Receitas + Blog
- 800×600 ou 1200×800, WebP

#### Logos e marca
- Logo principal SVG (vertical e horizontal)
- Logo branco para fundos escuros (SVG)
- Favicon: 32×32 + 192×192 + 512×512 PNG
- Apple touch icon: 180×180 PNG

#### Padronagem
- SVG do padrão de folhas (manual de marca)
- Variações: verde matcha sobre transparente, branco sobre transparente

#### Ícones de benefícios (6)
- SVG outline 1.5px stroke
- 24×24 viewport
- Custom (não bibliotecas externas)

### Vídeos
- Não há necessidade nesta fase

### Fontes
- Google Fonts via CDN (Libre Baskerville + Work Sans)

---

## 27. SUCCESS CRITERIA

### Metas técnicas
- [x] Lighthouse Performance mobile ≥ 85
- [x] Lighthouse Performance desktop ≥ 92
- [x] LCP < 2.5s
- [x] CLS < 0.1
- [x] WCAG 2.1 AA
- [x] Zero console errors em produção

### Metas de produto
- Conversão B2C: > 2% (target inicial)
- Tempo médio na sessão: > 2min
- Taxa de adição ao carrinho: > 8%
- Bounce rate: < 50%
- Email signup conversion: > 3%

### Metas de qualidade
- Todos os componentes editáveis via Theme Editor
- Mobile responsivo em 100% das páginas
- Identidade visual 100% alinhada ao manual de marca
- Zero CSS hardcoded (tudo via tokens)

### Metas de negócio (3 meses pós-lançamento)
- Manter B2C R$60-70k/mês mínimo
- Aumentar 20% conversão vs site WordPress legado
- Capturar 50+ leads B2B/mês
- Migrar 100% audiência do WordPress

---

## 28. AI CODE GENERATION STRATEGY

### Como usar IAs (Claude Code, Cursor, v0, Lovable)

#### Workflow recomendado
```
1. Designer monta layout no Figma OU descrição em texto
2. Pede para v0/Lovable gerar HTML+CSS puro
3. Cola HTML aqui no Claude Code
4. Claude converte para Liquid + aplica tokens Namu + integra ao Shopify
5. Valida no localhost (http://127.0.0.1:9292)
6. Push para tema dev quando OK
```

#### Prompts modelo

**Para gerar nova seção:**
```
Crie uma seção Shopify Liquid chamada "namu-[nome]" baseada nesse HTML:
[colar HTML]

Use os tokens do namu-tokens.css (cores, fontes, spacing).
Schema editável no Theme Editor.
Mobile-first.
```

**Para refatorar componente:**
```
Refatore namu-[nome].liquid aplicando:
- Tokens do design system (--namu-*)
- Scroll reveal
- Acessibilidade WCAG AA
Preserve a estrutura visual.
```

#### Constraints para IAs
- ❌ Nunca usar React, Vue, Tailwind, jQuery
- ❌ Nunca usar font-weight 700 (max 600)
- ❌ Nunca usar cores fora do manual
- ❌ Nunca criar arquivos sem prefixo `namu-`
- ❌ Nunca tocar em arquivos não solicitados (Iron Law #13)
- ✅ Sempre validar no localhost antes de commitar
- ✅ Sempre invocar skills `shopify-*` quando trabalhar no Shopify

---

## 29. DEVELOPMENT ENVIRONMENT

### Setup local
```powershell
# Pasta do projeto
cd "C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify"

# Iniciar dev server (hot reload)
shopify theme dev --theme 149681143886 --store namu-matcha.myshopify.com --store-password namu

# Abrir no browser
http://127.0.0.1:9292
```

### Chrome DevTools setup
1. F12 para abrir DevTools
2. Network tab → marcar "Disable cache"
3. Manter DevTools aberto durante todo o dev

### Workflow de mudanças
```
1. Edita arquivo no editor
2. Salva → recarrega automaticamente no localhost
3. Valida visualmente
4. Se OK → continua
5. Se NOK → ajusta e revalida
6. NUNCA fazer push até final da sessão
```

### Push para remoto (quando necessário)
```powershell
shopify theme push --theme 149665775694 --store namu-matcha.myshopify.com
```

### Pull do remoto (recovery)
```powershell
shopify theme pull --theme 149681143886 --store namu-matcha.myshopify.com
```

### Versionamento Git
- Branch padrão: `main`
- Branches de feature: `feature/[nome]`
- Commits semânticos: `feat:`, `fix:`, `refactor:`, `docs:`
- Commit antes de mudanças arriscadas (Iron Law #4)

---

## 30. DEPLOYMENT STRATEGY

### Ambientes
| Ambiente | Theme ID | Acesso |
|---|---|---|
| **Development** | `149681143886` | Apenas desenvolvedor (preview link) |
| **Production (Live)** | `149660729422` | Cliente final — OFF-LIMITS sem permissão |

### Pipeline de deploy
```
1. Dev local (localhost:9292)
   ↓
2. Push para tema dev (149681143886)
   ↓
3. Validação visual + Lighthouse + acessibilidade
   ↓
4. QA em mobile real (iOS Safari + Android Chrome)
   ↓
5. Aprovação do cliente (Álvaro)
   ↓
6. Push para tema live (149660729422)
   ↓
7. Smoke test pós-deploy
```

### Critérios para promover dev → live
- [ ] Todas as páginas funcionais
- [ ] Lighthouse atinge metas
- [ ] Reviews/testes aprovados pelo cliente
- [ ] Backup do tema atual (Git tag + Shopify duplicate)
- [ ] Janela de baixo tráfego (madrugada idealmente)

### Rollback
```
1. Identificar problema
2. Git checkout do commit anterior
3. shopify theme push --theme 149660729422
4. Verificar restore
```

### Backups
- Git: commits regulares + tags por release (`v1.0.0`, `v1.1.0`)
- Shopify: duplicar tema antes de cada deploy major (manual via admin)
- Banco de produtos: backup via Shopify admin export

---

## ANEXOS

### Arquivos de referência neste projeto
- `CLAUDE.md` — regras de comportamento da IA neste projeto
- `namu-design-system.md` — Design System completo (Prompt 02)
- `namu-prd-sitemap.md` — Arquitetura + Sitemap (Prompt 03)
- `namu-prd-master.md` — Este documento (PRD master)
- `assets/namu-tokens.css` — tokens CSS implementados
- `assets/jadeleafmatcha_com.html` — referência estrutural

### Decisões em aberto (registrar evolução)
- [ ] Threshold de frete grátis (R$?)
- [ ] Threshold de brinde surpresa (R$?)
- [ ] Que brinde será dado?
- [ ] Produto âncora B2C definido
- [ ] Apps de upsell no checkout (decisão futura)

### Próximos passos imediatos
1. Construir mini-cart drawer + cart progress bar
2. Construir PDP completa
3. Construir Collection page
4. Implementar scroll reveal global
5. Refatorar mega-menu

---

**FIM DO PRD MASTER — Versão 1.0**
