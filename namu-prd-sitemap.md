# Namu Matcha — Arquitetura de Produto + Sitemap
> Versão 1.0 — Prompt 03 — Product Architecture + Sitemap
> Senior Ecommerce Product Architect + UX Systems Planner

---

## 1. VISÃO GERAL DA ARQUITETURA

```
namumatcha.com.br
│
├── / (Homepage)                          ✅ Em construção
├── /collections/                         ❌ A construir
├── /products/                            ❌ A construir
├── /blogs/                               ❌ A construir (migração WP)
├── /pages/                               ❌ A construir
├── /cart                                 ❌ A construir
├── /search                               ❌ A construir
└── /account                              ⬜ Dawn padrão (fase 2)
```

---

## 2. SITEMAP COMPLETO

### 🏠 Homepage
```
/ — Homepage
  Seções atuais:
  ├── Hero Slider (5 slides)
  ├── Marquee rotativo (diferenciais)
  ├── Produtos em Destaque (carousel scroll)
  ├── Categorias (4 cards)
  ├── B2B Banner
  ├── Receitas (4 cards)
  ├── Newsletter
  ├── Blog editorial (3 artigos)
  └── Benefícios (6 ícones)
```

### 🛍️ Collections (Coleções)
```
/collections/
├── /collections/mais-vendidos           "Mais Vendidos"
├── /collections/matcha-puro             "Matchas Puros"
│     ├── Matcha Cerimonial 30g
│     ├── Matcha Premium Grau Barista 30g
│     └── Matcha Culinário 30g
├── /collections/blends                  "Blends"
│     ├── Matcha Vanilla Zero 30g
│     ├── Matcha Vanilla 150g
│     └── Sweet Matcha 30g
├── /collections/acessorios              "Acessórios"
│     ├── Chasen
│     ├── Chashaku
│     ├── Chawan Barista
│     ├── Chawan Maíra Otsuka
│     ├── Naoshi
│     ├── Chasen Prop
│     └── Gatito (Maneki-Neko)
├── /collections/kits                    "Kits & Bundles" (fase futura)
│     └── [produtos bundle a cadastrar]
├── /collections/colaboracoes            "Colaborações"
│     └── Chocolate Branco com Matcha
└── /collections/all                     "Todos os Produtos"
```

### 📦 Product Detail Pages (PDP)
```
/products/[handle]
  Estrutura da página:
  ├── Breadcrumb
  ├── Galeria de imagens (studio limpo)
  ├── Nome + categoria badge
  ├── Preço
  ├── Seletor de variante (se houver)
  ├── Botão "Comprar" → mini-cart drawer
  ├── Descrição do produto
  ├── Seção "Como preparar" (inline)
  ├── Seção "Por que Hadong?" (storytelling)
  ├── Seção de reviews Judge.me
  └── Produtos relacionados (cross-sell, scroll horizontal)
```

### 📝 Blog / Journal
```
/blogs/namu-journal                      "Namu Journal"
  ├── Index (grid de artigos)
  │     ├── Filtros por categoria (pills)
  │     │     ├── Receitas
  │     │     ├── Guias
  │     │     ├── Saúde & Bem-estar
  │     │     └── Cultura Coreana
  │     └── Paginação
  └── /blogs/namu-journal/[handle]       Artigo individual
        ├── Hero da matéria
        ├── Corpo do artigo
        ├── Produtos relacionados à receita/tema
        └── Artigos relacionados
```

**Migração WordPress → Shopify:**
- 20 artigos existentes precisam ser migrados
- Manter slugs originais para preservar SEO (301 redirect se necessário)
- Categorias: Receitas / Guias / Saúde / Cultura Coreana

### 📄 Pages (Páginas Estáticas)
```
/pages/
├── /pages/sobre                         "Nossa História"
│     ├── Manifesto da marca
│     ├── Origem: Hadong, Coreia do Sul
│     ├── Green Tea Institute
│     ├── Fundador Álvaro Dominguez
│     └── Números da marca
│
├── /pages/como-preparar                 "Como Preparar"
│     ├── Ritual tradicional (chasen + chawan)
│     ├── Latte de matcha
│     ├── Receitas rápidas
│     └── CTA → acessórios
│
├── /pages/b2b                           "Para o seu Negócio"
│     ├── Hero editorial (cafeteria, restaurante)
│     ├── Números (1.000 cafeterias)
│     ├── Benefícios B2B
│     ├── Formulário simples
│     │     ├── Nome
│     │     ├── Email
│     │     ├── Telefone / WhatsApp
│     │     ├── Tipo de negócio
│     │     └── Mensagem (opcional)
│     └── WhatsApp CTA direto
│
└── /pages/contato                       "Contato"
      ├── Formulário simples
      └── Horário de atendimento + WhatsApp
```

### 🔍 Search
```
/search
  ├── Campo de busca
  ├── Resultados de produtos
  ├── Resultados de artigos
  └── Estado "sem resultados" com sugestões
```

### 🛒 Cart / Checkout
```
/cart (página de carrinho — fallback)
  + Mini-cart drawer (principal)

Drawer:
  ├── Lista de itens
  ├── Barra de progresso
  │     ├── "Falta R$X para frete grátis"
  │     └── "Falta R$X para brinde surpresa"
  ├── Subtotal
  ├── CTA "Finalizar Compra" → checkout Shopify nativo
  └── Upsell inline ("Complete seu kit")
```

---

## 3. HIERARQUIA DE NAVEGAÇÃO

### Menu Principal (max 5 itens)
```
[Logo Namu]
├── Matchas           → mega-menu
├── Acessórios        → mega-menu
├── Receitas          → /blogs/namu-journal (filtro: Receitas)
├── Nossa História    → /pages/sobre
└── B2B               → /pages/b2b

[Ícones direita]
├── 🔍 Busca          → overlay de busca
├── 👤 Conta          → /account
└── 🛒 Carrinho       → mini-cart drawer
```

### Mega-Menu: Matchas
```
┌─────────────────────────────────────────────┐
│  Matchas Puros      Blends        [CALLOUT]  │
│  ─ Cerimonial       ─ Vanilla     [imagem]   │
│  ─ Premium          ─ Vanilla 150g [título]  │
│  ─ Culinário        ─ Sweet Matcha           │
│                                              │
│  Ver todos os matchas →                      │
└─────────────────────────────────────────────┘
```

### Mega-Menu: Acessórios
```
┌─────────────────────────────────────────────┐
│  Utensílios         Edições Esp.  [CALLOUT]  │
│  ─ Chasen           ─ Chawan Maíra [imagem]  │
│  ─ Chashaku         ─ Gatito      [título]   │
│  ─ Chawan Barista                            │
│  ─ Naoshi                                    │
│                                              │
│  Ver todos os acessórios →                   │
└─────────────────────────────────────────────┘
```

### Footer (5 colunas)
```
[Logo + Tagline]    Produtos    Conteúdo    Empresa    Contato
                    ─ Matchas   ─ Receitas  ─ Sobre    ─ WhatsApp
                    ─ Blends    ─ Blog      ─ B2B      ─ Email
                    ─ Acessórios ─ Como     ─ Privaci. ─ Horário
                    ─ Kits        Preparar  ─ Termos
```

---

## 4. ESTRUTURA DE COLLECTIONS (Shopify)

| Handle | Nome | Tipo | Status |
|---|---|---|---|
| `mais-vendidos` | Mais Vendidos | Manual | ✅ Existe |
| `matcha-puro` | Matchas Puros | Tag: matcha-puro | ❌ Criar |
| `blends` | Blends | Tag: blend | ❌ Criar |
| `acessorios` | Acessórios | Tag: acessorio | ❌ Criar |
| `kits` | Kits & Bundles | Tag: kit | ❌ Criar (fase futura) |
| `colaboracoes` | Colaborações | Tag: colaboracao | ❌ Criar |
| `all` | Todos os Produtos | Automática | ✅ Shopify nativo |

---

## 5. ARQUITETURA DE CONTEÚDO

### Taxonomia do Blog
| Categoria | Quantidade atual | Exemplos |
|---|---|---|
| Receitas | ~8 artigos WP | Lemon Soda Matcha, Gnocchi de Matcha |
| Guias | ~6 artigos WP | O que é matcha, Guia definitivo |
| Saúde & Bem-estar | ~4 artigos WP | 7 benefícios do matcha |
| Cultura Coreana | ~2 artigos WP | Hadong, cerimônia do chá |

### Estrutura de Metafields sugerida (produtos)
| Namespace | Key | Tipo | Uso |
|---|---|---|---|
| `namu` | `preparo` | rich_text | Instruções de preparo |
| `namu` | `origem` | single_line_text | "Hadong, Coreia do Sul" |
| `namu` | `categoria_cor` | color | Badge de categoria |
| `namu` | `rendimento` | single_line_text | "Rende 15 doses" |
| `namu` | `nivel` | single_line_text | "Iniciante / Avançado" |

---

## 6. JORNADAS DE USUÁRIO

### Jornada 1 — Descoberta via Redes Sociais (B2C principal)
```
Instagram/TikTok Ad
  → Homepage
    → Seção "Mais Vendidos"
      → PDP (Matcha Vanilla 150g — produto âncora)
        → Mini-cart abre
          → Barra de progresso incentiva (+1 item)
            → Checkout
```

### Jornada 2 — Busca por saúde / alternativa ao café
```
Google "matcha orgânico brasil"
  → Collection /matcha-puro ou Blog
    → Artigo educativo
      → CTA produto inline
        → PDP
          → Checkout
```

### Jornada 3 — B2B (cafeteria, restaurante)
```
Indicação / LinkedIn
  → /pages/b2b
    → Formulário
      → WhatsApp Álvaro
        → Proposta comercial
```

### Jornada 4 — Presentear
```
"quero dar de presente"
  → Homepage ou busca
    → Barra de progresso: "Falta R$X para brinde surpresa"
      → Add produto extra
        → Checkout com brinde
```

### Jornada 5 — Fidelização (pós-compra)
```
Email transacional Shopify
  → Review Judge.me (7 dias após entrega)
    → Email segmentado com receita relacionada ao produto comprado
      → Retorno ao site
```

---

## 7. FLUXOS E ESTADOS

### Mini-Cart Drawer
```
Estado vazio:       "Seu carrinho está vazio" + CTA "Descobrir produtos"
Estado com itens:   lista + barra de progresso + subtotal + CTA
Estado de loading:  skeleton loader nos itens
Barra de progresso:
  0–R$149:          "Falta R$X para frete grátis"
  R$150+:           "🎉 Frete grátis garantido!"
  [threshold 2]:    "Falta R$X para brinde surpresa" (valor a definir)
```

### Busca
```
Vazio:              campo + sugestões de coleções
Digitando:          predictive search (Shopify nativo)
Com resultados:     grid produtos + artigos
Sem resultados:     "Não encontramos X" + sugestões
```

### PDP — Estados de variante
```
Produto sem variante:  direto "Comprar"
Produto com variante:  selecionar tamanho → habilita botão
Sem estoque:           "Avise-me quando chegar" (fase 2)
```

---

## 8. COMPONENTES NECESSÁRIOS

### Novos a construir (prioritários)
| Componente | Arquivo | Prioridade |
|---|---|---|
| Collection page | `templates/collection.json` + `sections/namu-collection.liquid` | 🔴 Alta |
| Product page (PDP) | `templates/product.json` + `sections/namu-product.liquid` | 🔴 Alta |
| Mini-cart drawer | `sections/namu-cart-drawer.liquid` + `assets/namu-cart-drawer.js` | 🔴 Alta |
| Barra de progresso carrinho | snippet `namu-cart-progress.liquid` | 🔴 Alta |
| Blog index | `templates/blog.json` + `sections/namu-blog-index.liquid` | 🟡 Média |
| Artigo blog | `templates/article.json` + `sections/namu-article.liquid` | 🟡 Média |
| Página Sobre | `templates/page.sobre.json` + `sections/namu-sobre.liquid` | 🟡 Média |
| Página Como Preparar | `templates/page.preparo.json` + `sections/namu-preparo.liquid` | 🟡 Média |
| Página B2B | `templates/page.b2b.json` + `sections/namu-b2b-page.liquid` | 🟡 Média |
| Scroll reveal JS | `assets/namu-reveal.js` | 🔴 Alta |
| Reviews Judge.me | integração via snippet | 🟡 Média |

### Já construídos ✅
- Homepage completa (9 seções)
- Header + mega-menu (parcial)
- Footer
- Announcement bar
- Marquee

### Guia de Iconografia (CRÍTICO)
> **REGRA ABSOLUTA: ZERO emojis em qualquer componente. Ícones sempre minimalistas, traço fino, elegância premium.**

**Ícones obrigatórios (SVG stroke-based, 1.5–2px, cores `#2D2D2D` ou `#78C33F`):**
- Search (magnifier glass) — nav
- Shopping bag — carrinho
- User circle — perfil/conta
- Menu hambúrguer — mobile nav
- X / Close — fechar modais
- Heart outline — favorito
- Share arrow — compartilhar
- Truck / Delivery — entrega
- Shield / Lock — segurança
- Award / Check circle — certificação
- Instagram, TikTok (brand stroke) — social

**Fonte recomendada:** Feather Icons ou Phosphor Light (ambas minimalistas)

**NÃO usar:** Emojis (🔍, 🛒, 👤, 💚, 🌿, ⭐, etc.), ícones coloridos, ícones cartoon, ícones muito pesados

---

## 9. INTEGRAÇÕES

| Ferramenta | Tipo | Status | Notas |
|---|---|---|---|
| Shopify Email | Email marketing | Nativo | Já disponível |
| Judge.me | Reviews | A instalar | Gratuito, visual custom |
| Google Tag Manager | Analytics | Fase 2 | Via `theme.liquid` |
| Meta Pixel | Ads | Via Shopify nativo | Fase 2 |
| Microsoft Clarity | Heatmap | Via GTM | Fase 2 |
| WhatsApp Business | Atendimento | Link direto | +55 11 93087-6268 |

---

## 10. OPORTUNIDADES DE CRO

| Oportunidade | Impacto | Complexidade |
|---|---|---|
| Barra de progresso no carrinho | Alto | Baixa |
| "Comprar" abre mini-cart (sem reload) | Alto | Média |
| Cross-sell no mini-cart ("Complete seu kit") | Alto | Média |
| Reviews visíveis na PDP | Alto | Baixa |
| Sticky CTA na PDP mobile | Alto | Baixa |
| Upsell de tamanho maior ("Leve o 150g e economize") | Médio | Média |
| Filtros por objetivo ("foco", "energia", "ritual") | Médio | Alta |
| Badge "Mais vendido" nos cards | Baixo | Baixíssima |

---

## 11. OPORTUNIDADES DE SEO

| Página | Oportunidade |
|---|---|
| `/collections/matcha-puro` | Rank "matcha orgânico brasil", "matcha cerimonial" |
| `/pages/como-preparar` | Rank "como preparar matcha", "receita matcha latte" |
| `/blogs/namu-journal` | Migrar 20 artigos WP — preservar URLs e meta |
| PDPs individuais | Schema.org Product markup + reviews |
| `/pages/sobre` | Local SEO + brand authority |
| Homepage | Brand + "matcha hadong", "matcha coreia do sul" |

---

## 12. DECISÕES PENDENTES

| Item | Status | Notas |
|---|---|---|
| Produto âncora B2C | ⚠️ Indefinido | Definir com equipe Namu |
| Embalagem presente (gifting) | ⚠️ Pendente confirmação | É só barra de progresso ou também gift wrap? |
| Threshold do brinde surpresa | ⚠️ A definir | Qual valor ativa o brinde? |
| Threshold do frete grátis | ⚠️ A definir | Qual valor atual? |
| Kits/Bundles | ⬜ Fase futura | Cadastrar quando definidos |
| "Avise-me quando chegar" | ⬜ Fase 2 | Fora do escopo atual |
| Programa de fidelidade | ⬜ Fora do escopo | Não por enquanto |
| Subscription | ⬜ Fora do escopo | Não por enquanto |
| Multi-idioma | ⬜ Fase 3 | Expansão Uruguay/Chile |

---

## 13. PRIORIDADE DE CONSTRUÇÃO

### Fase 1 — Fundação (agora)
1. Mini-cart drawer + barra de progresso
2. Scroll reveal global (`namu-reveal.js`)
3. PDP (página de produto)
4. Collection page

### Fase 2 — Conteúdo
5. Blog index + artigo
6. Páginas estáticas (Sobre, Como Preparar, B2B, Contato)
7. Judge.me (reviews)
8. Migração blog WordPress

### Fase 3 — Otimização
9. GTM + pixels
10. SEO técnico
11. Kits/bundles
12. Gifting / brinde surpresa
