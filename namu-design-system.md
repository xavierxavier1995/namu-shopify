# Namu Matcha — Design System Completo
> Versão 2.0 — gerado após Master Discovery + Prompt 02
> Fonte de verdade visual para Shopify (Liquid), IAs, v0, Framer e qualquer ferramenta de construção.
> **Cores, tipografia e identidade visual: seguem 100% o Manual de Marca Namu Matcha.**
> Jade Leaf = inspiração de estrutura e UX, não de identidade visual.

---

## 1. BRAND PERSONALITY

### Arquétipo
**O Sábio + O Explorador**
- Autoridade educativa sobre matcha e origem coreana
- Exploradora de rituais, wellness e estilo de vida premium
- Nunca: hype vazio, milagres, linguagem de suplemento

### Personalidade em 5 palavras
`Contemplativa` · `Autêntica` · `Ritual` · `Premium` · `Coreana`

### Tom de voz
- Contemplativo e ritualístico — como Nekohama e NikoNeko
- Educativo sem ser técnico demais
- Nunca imperativo agressivo ("COMPRE AGORA!")
- Prefere: "Descubra", "Experimente", "Prepare", "Conheça"
- Linguagem em pt-BR, informal-elegante (você, não tu)

### Posicionamento
> "A primeira e única marca brasileira com exclusividade do matcha de Hadong, Coreia do Sul — certificado pelo Green Tea Institute, patrimônio agrícola mundial."

### O que NÃO somos
- Não somos suplemento
- Não somos chá mate
- Não somos suco verde
- Não somos energia química
- Não estamos associados a cannabis

---

## 2. COLOR SYSTEM

> **Fonte: Manual de Marca Namu Matcha — imutável.**

### Cores Institucionais
```css
--namu-verde-matcha:    #045133;  /* Primária — fundos escuros, CTA, header */
--namu-verde-puro:      #78C33F;  /* Accent — badges, destaques, hover */
```

### Cores Secundárias (categorias)
```css
--namu-laranja-premium:   #BE5B28;  /* Categoria: Kits / Premium */
--namu-azul-cerimonial:   #10A6BD;  /* Categoria: Cerimonial / Utensílios */
--namu-azul-vanilla:      #33348E;  /* Categoria: Blends / Vanilla */
```

### Cores de Apoio
```css
--namu-branco-porcelana:  #F4F4F0;  /* Fundos quentes, seções alternadas */
--namu-cinza-sombra:      #2D2D2D;  /* Texto principal */
--namu-cinza-medio:       #666666;  /* Texto secundário, labels, captions */
--namu-branco:            #FFFFFF;  /* Fundos puros, cards de produto */
```

### Aliases Semânticos
```css
--namu-color-primary:     var(--namu-verde-matcha);
--namu-color-accent:      var(--namu-verde-puro);
--namu-color-text:        var(--namu-cinza-sombra);
--namu-color-text-muted:  var(--namu-cinza-medio);
--namu-color-bg:          var(--namu-branco);
--namu-color-bg-warm:     var(--namu-branco-porcelana);
--namu-color-bg-dark:     var(--namu-verde-matcha);
```

### Regras de uso de cor
- Fundo primário do header: `--namu-verde-matcha`
- Fundo de seções alternadas: `--namu-branco-porcelana`
- Fundo de cards de produto: `--namu-branco` (studio limpo)
- CTAs sobre fundo escuro: texto branco, fundo `--namu-verde-matcha`
- CTAs sobre fundo claro: borda `--namu-verde-matcha`, texto `--namu-verde-matcha`
- Nunca usar cores fora das especificadas no manual

### Uso da padronagem de marca
- O padrão de folhas (símbolo repetido) aparece como textura sutil (`opacity: 0.04–0.07`) em seções específicas:
  - Seção de newsletter
  - Seção de benefícios
  - Footer
- Cor do padrão: `--namu-verde-matcha` sobre fundo `--namu-branco-porcelana`

---

## 2.5. ICONOGRAFIA

> **Regra absoluta: ZERO emojis. Ícones sempre minimalistas, traço fino, classe premium.**

### Filosofia de ícones Namu
- **Estilo:** Stroke-based (traço), nunca filled (preenchido)
- **Peso de traço:** 1.5px a 2px
- **Tamanho padrão:** 24x24px (nav), 32x32px (seções), 48x48px (benefícios)
- **Arredondamento:** Slight (2px border-radius em cantos)
- **Cor:** Sempre `--namu-color-text` (`#2D2D2D`) ou `--namu-color-accent` (`#78C33F`) em destaque
- **Legibilidade:** Sempre preservada em tamanhos pequeninhos (16px mínimo para mouse-over)

### Ícones obrigatórios (recomendado usar Feather Icons ou Phosphor Light)

| Contexto | Ícone | Recomendação |
|----------|-------|--------------|
| Busca | Search / Magnifier glass | Feather / Phosphor |
| Perfil / Conta | User circle | Feather / Phosphor |
| Carrinho | Shopping bag (minimalista) | Feather / Phosphor |
| Menu mobile | Menu / Hamburger | Feather / Phosphor |
| Fechar modal | X ou Close | Feather / Phosphor |
| Favoritos | Heart (outline) | Feather / Phosphor |
| Compartilhar | Share / Arrow up-right | Feather / Phosphor |
| Filtro | Filter / Sliders | Feather / Phosphor |
| Ordenação | Sort | Feather / Phosphor |
| Entrega | Truck / Delivery | Feather / Phosphor |
| Segurança | Shield / Lock | Feather / Phosphor |
| Certificação | Award / Check circle | Feather / Phosphor |
| Social (Instagram, TikTok) | Brand icons | Simple Line Icons / Feather |

### O que NÃO usar
- ❌ Emojis de qualquer tipo (🔍, 👤, 🛒, 💚, etc.)
- ❌ Ícones coloridos ou multi-cor
- ❌ Ícones cartoon ou estilizados
- ❌ Ícones muito pesados ou thick (stroke > 2.5px)
- ❌ Ícones filled (preenchidos) — sempre outline/stroke

### Implementação em SVG (exemplo)
```html
<!-- Search icon — Feather style -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"></circle>
  <path d="m21 21-4.35-4.35"></path>
</svg>
```

```css
/* Implementação CSS */
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--namu-color-text);
  vertical-align: middle;
}
.icon--accent { color: var(--namu-color-accent); }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 48px; height: 48px; }
```

---

## 3. TYPOGRAPHY SYSTEM

> **Fonte: Manual de Marca Namu Matcha.**
> **Regra global: NUNCA usar font-weight 700 (bold). Sempre semibold (600) no máximo.**

### Famílias
```css
--namu-font-heading: 'Libre Baskerville', Georgia, serif;
--namu-font-body:    'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Import Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### Escala Tipográfica
| Token | Mobile | Desktop | Família | Peso | Uso |
|---|---|---|---|---|---|
| `--namu-text-display` | 2.5rem/40px | 4rem/64px | Baskerville | 400 | Hero principal |
| `--namu-text-h1` | 2rem/32px | 3rem/48px | Baskerville | 400 | Título de página |
| `--namu-text-h2` | 1.75rem/28px | 2.25rem/36px | Baskerville | 400 | Títulos de seção |
| `--namu-text-h3` | 1.25rem/20px | 1.5rem/24px | Work Sans | 600 | Subtítulos, cards |
| `--namu-text-body-lg` | 1.125rem/18px | 1.25rem/20px | Work Sans | 400 | Texto editorial |
| `--namu-text-body` | 1rem/16px | 1rem/16px | Work Sans | 400 | Corpo corrido |
| `--namu-text-sm` | 0.875rem/14px | 0.875rem/14px | Work Sans | 400 | Labels, meta |
| `--namu-text-xs` | 0.75rem/12px | 0.75rem/12px | Work Sans | 500 | Tags, badges |
| `--namu-text-label` | 0.6875rem/11px | 0.6875rem/11px | Work Sans | 600 | Eyebrow labels, pills |

### Regras tipográficas
- **Libre Baskerville:** somente em H1, H2 e Display — jamais em UI (botões, labels, nav)
- **Work Sans:** tudo mais — navegação, botões, preços, labels, corpo
- **Peso máximo:** 600 (semibold) — nunca 700
- **Letter-spacing:** labels e pills usam `0.08em` uppercase
- **Line-height:** headings `1.15`, corpo `1.65`, labels `1.2`
- **Itálico:** Baskerville italic para ênfase editorial sutil

### Eyebrow Labels (pill de seção)
```
Família:       Work Sans
Peso:          600
Tamanho:       0.6875rem (11px)
Case:          UPPERCASE
Letter-spacing: 0.1em
Cor:           --namu-verde-matcha
Fundo:         rgba(4,81,51,0.08)
Radius:        999px
Padding:       0.3rem 0.875rem
```

---

## 4. SPACING SYSTEM

```css
--namu-space-1:   0.25rem;   /*  4px */
--namu-space-2:   0.5rem;    /*  8px */
--namu-space-3:   0.75rem;   /* 12px */
--namu-space-4:   1rem;      /* 16px */
--namu-space-5:   1.25rem;   /* 20px */
--namu-space-6:   1.5rem;    /* 24px */
--namu-space-8:   2rem;      /* 32px */
--namu-space-10:  2.5rem;    /* 40px */
--namu-space-12:  3rem;      /* 48px */
--namu-space-14:  3.5rem;    /* 56px */
--namu-space-16:  4rem;      /* 64px */
--namu-space-20:  5rem;      /* 80px */
--namu-space-24:  6rem;      /* 96px */
--namu-space-32:  8rem;      /* 128px */

/* Seções */
--namu-section-gap-mobile:  3.5rem;   /* 56px entre seções no mobile */
--namu-section-gap-desktop: 5rem;     /* 80px entre seções no desktop */
--namu-section-padding-x:   1.25rem;  /* padding lateral mobile */
--namu-section-padding-x-md: 2rem;    /* padding lateral tablet+ */
```

---

## 5. GRID SYSTEM

### Container
```css
.namu-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--namu-section-padding-x);
}

@media (min-width: 750px) {
  .namu-container {
    padding: 0 var(--namu-section-padding-x-md);
  }
}
```

### Breakpoints
```css
/* Mobile-first sempre */
--bp-sm:  480px;
--bp-md:  750px;   /* tablet */
--bp-lg:  990px;   /* desktop */
--bp-xl:  1280px;  /* wide */
--bp-2xl: 1440px;  /* ultrawide */
```

### Grid de Produtos
| Contexto | Mobile | Tablet | Desktop |
|---|---|---|---|
| Collection page | 2 col | 3 col | 4 col |
| Featured (homepage) | scroll horizontal | 3 col | 4 col |
| Related products (PDP) | scroll horizontal | 3 col | 4 col |
| Kits/Bundles | 1 col | 2 col | 3 col |

---

## 6. BORDER RADIUS SYSTEM

```css
--namu-radius-xs:   6px;    /* inputs pequenos */
--namu-radius-sm:   10px;   /* tags, badges */
--namu-radius-md:   16px;   /* cards de produto */
--namu-radius-lg:   20px;   /* cards grandes */
--namu-radius-xl:   24px;   /* banners, hero */
--namu-radius-2xl:  32px;   /* modais, drawers */
--namu-radius-pill: 999px;  /* botões, pills */
```

---

## 7. ELEVATION SYSTEM (Sombras)

```css
--namu-shadow-xs:  0 1px 4px rgba(0,0,0,0.04);
--namu-shadow-sm:  0 2px 12px rgba(0,0,0,0.06);   /* card repouso */
--namu-shadow-md:  0 8px 28px rgba(0,0,0,0.10);   /* card hover */
--namu-shadow-lg:  0 20px 60px rgba(0,0,0,0.14);  /* modais, drawer */
--namu-shadow-xl:  0 32px 80px rgba(0,0,0,0.18);  /* overlay máximo */

/* Sombra verde (para CTAs e elementos de destaque) */
--namu-shadow-green: 0 8px 24px rgba(4,81,51,0.20);
```

---

## 8. MOTION SYSTEM

> Nível: Médio — elementos entram em cena com movimento direcional.
> **Respeita `prefers-reduced-motion` obrigatoriamente.**

### Tokens de transição
```css
--namu-transition-fast:   0.18s ease;
--namu-transition-base:   0.25s ease;
--namu-transition-slow:   0.4s cubic-bezier(0.22, 1, 0.36, 1);   /* ease-out-expo */
--namu-transition-spring: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */
```

### Scroll Reveal — padrão de entrada
```css
/* Estado inicial (antes de entrar na viewport) */
.namu-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Estado visível (quando IntersectionObserver dispara) */
.namu-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger para listas de cards */
.namu-reveal:nth-child(2) { transition-delay: 0.08s; }
.namu-reveal:nth-child(3) { transition-delay: 0.16s; }
.namu-reveal:nth-child(4) { transition-delay: 0.24s; }

@media (prefers-reduced-motion: reduce) {
  .namu-reveal { opacity: 1; transform: none; transition: none; }
}
```

### Hover em cards de produto
```css
/* Zoom suave na imagem + sombra cresce + botão aparece */
.namu-product-card { transition: var(--namu-transition-base); }
.namu-product-card:hover { box-shadow: var(--namu-shadow-md); }
.namu-product-card:hover .namu-product-card__image { transform: scale(1.04); }
.namu-product-card:hover .namu-product-card__cta { opacity: 1; transform: translateY(0); }
.namu-product-card__image { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.namu-product-card__cta {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
```

### Animações de página
| Elemento | Entrada | Delay |
|---|---|---|
| Headings de seção | fade + translateY(24px) | 0ms |
| Eyebrow label | fade + translateY(16px) | 0ms |
| Cards de produto | fade + translateY(24px) | stagger 80ms |
| Imagens editoriais | fade + scale(0.97→1) | 100ms |
| CTAs | fade | 200ms |

---

## 9. INTERACTION SYSTEM

### Botão Primário (fundo verde)
```css
fundo:           #045133
texto:           #FFFFFF
hover fundo:     #033d27
padding:         0.75rem 2rem
radius:          999px (pill)
font:            Work Sans 600
font-size:       0.9375rem (15px)
letter-spacing:  0.02em
transition:      background 0.18s ease, box-shadow 0.18s ease
hover shadow:    var(--namu-shadow-green)
label:           sempre em português, "Comprar", "Descobrir", "Ver receita"
```

### Botão Secundário (outline verde)
```css
fundo:           transparente
borda:           1.5px solid #045133
texto:           #045133
hover fundo:     #045133
hover texto:     #FFFFFF
padding:         0.75rem 2rem
radius:          999px
```

### Botão Ghost (sobre fundo escuro/verde)
```css
fundo:           transparente
borda:           1.5px solid rgba(255,255,255,0.6)
texto:           #FFFFFF
hover borda:     #FFFFFF
hover fundo:     rgba(255,255,255,0.1)
padding:         0.75rem 2rem
radius:          999px
```

### Botão "Comprar" no card (mini CTA)
```css
fundo:           #045133
texto:           #FFFFFF
padding:         0.5rem 1.25rem
radius:          999px
font-size:       0.8125rem (13px)
font-weight:     600
aparece no hover: sim (opacity 0→1 + translateY 8px→0)
```

### Links
```css
cor:             #045133
hover:           underline
transition:      color 0.18s ease
```

### Inputs / Forms
```css
borda:           1.5px solid rgba(45,45,45,0.2)
borda focus:     1.5px solid #045133
radius:          var(--namu-radius-xs) = 6px
padding:         0.75rem 1rem
font:            Work Sans 400
placeholder:     #666666
background:      #FFFFFF
```

---

## 10. COMPONENT LANGUAGE

### Card de Produto
```
Estrutura:
  [imagem quadrada 1:1]
  [tag de categoria — opcional]
  [nome do produto]
  [variante/tamanho — se houver]
  [preço]
  [botão "Comprar" — aparece no hover desktop, sempre visível no mobile]

Imagem:
  fundo: #FFFFFF (studio limpo)
  overflow: hidden
  radius: var(--namu-radius-md) = 16px no topo
  zoom no hover: scale(1.04)

Texto:
  nome: Work Sans 500, 0.9375rem
  variante: Work Sans 400, 0.8125rem, cor muted
  preço: Work Sans 600, 1rem, cor: #2D2D2D

Dimensões:
  mobile: 2 por linha
  desktop: 4 por linha
```

### Eyebrow Label (pill de seção)
```
"MAIS VENDIDOS" / "INSPIRAÇÃO" / "MATCHA BLOG"
Serve para identificar a seção acima do título principal
Sempre em caixa alta + Work Sans 600 + cor verde + fundo verde 8% opacity
```

### Carrossel Horizontal (Bestsellers)
```
Estrutura:
  [eyebrow label]
  [título H2 em Baskerville]
  [subtítulo Work Sans 400 — opcional]
  [track com scroll horizontal snap]
  [setas de navegação — desktop]
  [indicadores de paginação — mobile]

Comportamento:
  scroll-snap-type: x mandatory
  gap entre cards: 1.25rem
  overflow: scroll horizontal nativo
  drag-scroll no desktop (JS leve)
  sem barra de scroll visível
```

### Mini-Cart Drawer (lateral)
```
Posição: direita, slideIn da borda
Largura: 400px desktop / 100% mobile
Overlay: rgba(0,0,0,0.4) blur(2px)
Radius: 24px no lado esquerdo
Comportamento: abre ao clicar "Comprar" em qualquer card/PDP
Conteúdo: lista itens, subtotal, CTA "Finalizar Compra"
```

### Announcement Bar
```
Fundo: --namu-verde-matcha
Texto: branco, Work Sans 400, 0.8125rem
Altura: 38px
Rotação: mensagens alternadas (fade)
```

### Mega-Menu (inspiração Jade Leaf)
```
Trigger: hover no link de navegação
Conteúdo:
  - links de subcoleção (lista)
  - 1-2 callout cards com imagem + título
Imagem callout: ratio 3:2, radius 12px, objeto cover
Título callout: Work Sans 600, 0.9375rem
Animação abertura: fade + translateY(-8px→0), 0.2s ease
```

---

## 11. PHOTOGRAPHY DIRECTION

### Estilo principal
- **Studio limpo** — produto centralizado, fundo `#FFFFFF` ou `#F4F4F0`
- Luz natural difusa, sem sombras duras
- Foco no produto: cor verde do matcha em destaque
- Sem props excessivos — máximo 1-2 elementos coadjuvantes

### Fotografia editorial (seções de lifestyle)
- Pessoas em momentos contemplativos: preparando matcha, lendo, trabalhando
- Tons neutros e terrosos no ambiente, para o verde do matcha se destacar
- Sem filtros saturados — paleta natural e orgânica
- Representação: mulheres 25-40 anos, urbanas, estilo wellness

### Fotografia de origem (storytelling)
- Plantações de Hadong em verde intenso
- Colheita artesanal, mãos nos campos
- Elementos coreanos: cerâmica, natureza, montanhas
- Transmite: confiança, rastreabilidade, autenticidade

### Regras fotográficas
- **NÃO:** filtros saturados, fundos coloridos nas fotos de produto
- **NÃO:** fotos de baixa resolução ou pixeladas
- **NÃO:** fotos genéricas de banco de imagem que não remetam à marca
- **SEMPRE:** fotos com transparência possível para uso sobre fundos coloridos (PNG quando necessário)

---

## 12. ART DIRECTION

### Linguagem visual
- Equilíbrio entre premium e acessível
- Muito whitespace → respiração editorial
- Textura sutil do padrão de folhas em seções específicas
- Elementos gráficos coreanos/japoneses discretos (linhas finas, composições simétricas)

### Composição
- Assimetria controlada nos layouts editoriais
- Regra dos terços nas fotos de lifestyle
- Margem generosa: nunca texto colado na borda

### Uso da padronagem de marca
```css
/* Textura de folhas — aplicada como pseudo-elemento */
.namu-section--pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('namu-pattern.svg');
  background-size: 200px;
  opacity: 0.05;
  pointer-events: none;
}
/* Seções que usam: newsletter, benefits, footer */
```

### Hierarquia visual de uma seção típica
```
1. Eyebrow label (pill verde)
2. Título H2 (Baskerville, grande, respiração)
3. Subtítulo (Work Sans 400, cor muted)
4. Conteúdo principal (grid, carrossel, imagem)
5. CTA (botão pill verde)
```

---

## 13. ICONOGRAPHY

### Filosofia
- Ícones de linha (stroke), nunca preenchidos
- Stroke-width: 1.5px
- Estilo: geométrico, minimalista, sem arredondamentos excessivos
- Tamanhos: 16px, 20px, 24px

### Ícones de benefícios (custom SVG)
| ID | Representação |
|---|---|
| `energy` | Folha + raio (energia limpa) |
| `organic` | Círculo com folha (orgânico) |
| `harvest` | Mão colhendo folha (artesanal) |
| `antioxidant` | Molécula simplificada |
| `calm` | Onda suave (tranquilidade) |
| `cognitive` | Cérebro simplificado (foco) |

### Nomenclatura de acessórios
- **Somente nome em japonês** (sem tradução em português)
- Exemplo: "Chasen", "Chashaku", "Chawan", "Naoshi"
- Educação sobre o produto: feita na descrição, não no nome

---

## 14. MOBILE UX PHILOSOPHY

- Mobile-first em todo CSS (sem exceção)
- Touch targets mínimos: 44×44px
- Carrosséis: scroll horizontal nativo + scroll-snap (sem dependências JS)
- Botão "Comprar" sempre visível no mobile (não depende de hover)
- Menu: drawer lateral (hamburger) com overlay
- Sticky header com logo centralizado + ícones carrinho/busca
- Imagens: lazy loading em tudo exceto LCP hero
- Fontes: nunca abaixo de 14px no mobile

---

## 15. ECOMMERCE UX PHILOSOPHY

### CRO (Conversion Rate Optimization)
- Botão "Comprar" abre mini-cart lateral — nunca redireciona
- Preço sempre visível no card, sem precisar clicar
- Badge de categoria visível (Verde/Laranja/Azul conforme tipo de produto)
- Reviews/avaliações visíveis na PDP acima do fold (fase futura)
- Upsell no carrinho: "Complete seu kit" ou "Quem comprou isso também levou"
- Breadcrumb em todas as páginas internas

### PDP (Product Detail Page) — princípios
- Imagem ocupa 50% do viewport no desktop
- Nome + preço + CTA sempre above the fold
- Descrição: educativa, não técnica em excesso
- Seção "Como preparar" em cada produto
- Seção "Por que Hadong?" — storytelling de origem
- Produtos relacionados no final (cross-sell)

### Navegação
- Max 4 itens no menu principal
- Mega-menu com callout cards (inspiração Jade Leaf)
- Busca: icon no header, expande em overlay
- Filtro de coleção: pills horizontais (sem sidebar)

---

## 16. ACCESSIBILITY GUIDELINES

```css
/* Focus visible — teclado e leitores de tela */
:focus-visible {
  outline: 2px solid var(--namu-verde-matcha);
  outline-offset: 3px;
  border-radius: 3px;
}

/* Sem outline por clique */
:focus:not(:focus-visible) { outline: none; }

/* Contraste mínimo */
/* texto escuro (#2D2D2D) sobre branco: ratio 14.7:1 ✅ */
/* texto branco sobre verde (#045133): ratio 7.4:1 ✅ */

/* prefers-reduced-motion: obrigatório em todo JS de animação */
/* aria-label: obrigatório em botões sem texto visível */
/* alt: obrigatório em todas as imagens */
```

---

## 17. PERFORMANCE CONSTRAINTS

| Meta | Valor alvo |
|---|---|
| Lighthouse Performance (mobile) | ≥ 85 |
| Lighthouse Performance (desktop) | ≥ 92 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Total Blocking Time | < 200ms |

### Regras de performance
- Hero: imagem WebP, max 150kb, width/height explícitos, `loading="eager"`
- Demais imagens: `loading="lazy"` obrigatório
- CSS por seção: cada `namu-*.css` carregado via `stylesheet_tag` — sem CSS global monolítico
- JS: vanilla apenas, sem frameworks, sem jQuery
- Fontes: `display=swap` no Google Fonts, preconnect declarado
- Ícones SVG: inline (sem requisições extras)
- Carrosséis: scroll nativo CSS — sem Swiper, Splide ou libs externas
- Imagens srcset: sempre 3 tamanhos mínimos (600w, 900w, 1200w)

---

## 18. VISUAL CONSTRAINTS (O que nunca fazer)

| Proibido | Motivo |
|---|---|
| font-weight: 700 (bold) | Quebra sensação premium — usar 600 no máximo |
| Cores fora do manual | Dilui identidade de marca |
| Inline `<style>` nas sections | Dificulta manutenção |
| Scroll horizontal com scrollbar visível | Não-premium |
| Botões sem radius pill | Fora do padrão do sistema |
| Texto abaixo de 12px | Acessibilidade |
| Imagens sem alt | SEO + acessibilidade |
| Gradientes não definidos no sistema | Poluição visual |
| Sombras excessivas em todos os elementos | Pesado, não-premium |
| Animações sem `prefers-reduced-motion` | Acessibilidade |

---

## 19. BRAND EXPERIENCE RULES

1. **Cada seção conta uma parte da história** — de Hadong ao copo
2. **Educação antes de venda** — o usuário aprende antes de comprar
3. **Silêncio é premium** — whitespace não é desperdício
4. **Verde é a cor do produto** — deixe o verde do matcha ser o herói visual
5. **A origem é o diferencial** — Hadong, Coreia do Sul, Green Tea Institute
6. **Ritual, não urgência** — "Descubra" não "Compre agora"
7. **Acessórios têm nomes japoneses** — mantém autenticidade cultural
8. **Mobile é o primeiro canvas** — design começa pelo mobile

---

## 20. TOKENS — ARQUIVO CSS FINAL

> Este é o conteúdo completo do `assets/namu-tokens.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

:root {
  /* ── CORES INSTITUCIONAIS (Manual de Marca) ── */
  --namu-verde-matcha:      #045133;
  --namu-verde-puro:        #78C33F;

  /* ── CORES SECUNDÁRIAS ── */
  --namu-laranja-premium:   #BE5B28;
  --namu-azul-cerimonial:   #10A6BD;
  --namu-azul-vanilla:      #33348E;

  /* ── CORES DE APOIO ── */
  --namu-branco-porcelana:  #F4F4F0;
  --namu-cinza-sombra:      #2D2D2D;
  --namu-cinza-medio:       #666666;
  --namu-branco:            #FFFFFF;

  /* ── ALIASES SEMÂNTICOS ── */
  --namu-color-primary:     var(--namu-verde-matcha);
  --namu-color-accent:      var(--namu-verde-puro);
  --namu-color-text:        var(--namu-cinza-sombra);
  --namu-color-text-muted:  var(--namu-cinza-medio);
  --namu-color-bg:          var(--namu-branco);
  --namu-color-bg-warm:     var(--namu-branco-porcelana);
  --namu-color-bg-dark:     var(--namu-verde-matcha);

  /* ── TIPOGRAFIA ── */
  --namu-font-heading: 'Libre Baskerville', Georgia, serif;
  --namu-font-body:    'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  /* ── TRANSIÇÕES ── */
  --namu-transition-fast:   0.18s ease;
  --namu-transition-base:   0.25s ease;
  --namu-transition-slow:   0.4s cubic-bezier(0.22, 1, 0.36, 1);
  --namu-transition-spring: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── BORDER RADIUS ── */
  --namu-radius-xs:   6px;
  --namu-radius-sm:   10px;
  --namu-radius-md:   16px;
  --namu-radius-lg:   20px;
  --namu-radius-xl:   24px;
  --namu-radius-2xl:  32px;
  --namu-radius-pill: 999px;

  /* ── SOMBRAS ── */
  --namu-shadow-xs:    0 1px 4px rgba(0,0,0,0.04);
  --namu-shadow-sm:    0 2px 12px rgba(0,0,0,0.06);
  --namu-shadow-md:    0 8px 28px rgba(0,0,0,0.10);
  --namu-shadow-lg:    0 20px 60px rgba(0,0,0,0.14);
  --namu-shadow-xl:    0 32px 80px rgba(0,0,0,0.18);
  --namu-shadow-green: 0 8px 24px rgba(4,81,51,0.20);

  /* ── ESPAÇAMENTO ── */
  --namu-space-1:  0.25rem;
  --namu-space-2:  0.5rem;
  --namu-space-3:  0.75rem;
  --namu-space-4:  1rem;
  --namu-space-5:  1.25rem;
  --namu-space-6:  1.5rem;
  --namu-space-8:  2rem;
  --namu-space-10: 2.5rem;
  --namu-space-12: 3rem;
  --namu-space-14: 3.5rem;
  --namu-space-16: 4rem;
  --namu-space-20: 5rem;
  --namu-space-24: 6rem;
  --namu-space-32: 8rem;

  /* ── SEÇÕES ── */
  --namu-section-gap-mobile:   3.5rem;
  --namu-section-gap-desktop:  5rem;
  --namu-section-padding-x:    1.25rem;
  --namu-section-padding-x-md: 2rem;
}

/* ── SCROLL SUAVE ── */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

/* ── FOCUS VISIBLE (acessibilidade) ── */
:focus-visible {
  outline: 2px solid var(--namu-verde-matcha);
  outline-offset: 3px;
  border-radius: 3px;
}
:focus:not(:focus-visible) { outline: none; }

/* ── SELECTION ── */
::selection {
  background: rgba(4,81,51,0.12);
  color: var(--namu-cinza-sombra);
}

/* ── SCROLL REVEAL ── */
.namu-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.namu-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.namu-reveal:nth-child(2) { transition-delay: 0.08s; }
.namu-reveal:nth-child(3) { transition-delay: 0.16s; }
.namu-reveal:nth-child(4) { transition-delay: 0.24s; }

@media (prefers-reduced-motion: reduce) {
  .namu-reveal { opacity: 1; transform: none; transition: none; }
}
```
