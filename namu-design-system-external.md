# Namu Matcha — Design System for External Tools
**Version 1.0 | Para uso em: Gemini, Claude.ai, v0, Lovable, Canva, Figma**

> Use este documento para criar páginas HTML, mockups e componentes visuais que depois serão replicados no Shopify. Não inclui sintaxe Shopify/Liquid — apenas HTML, CSS e especificações visuais.

---

## 1. Identidade da Marca

**Marca:** Namu Matcha  
**Produto:** Matcha premium e blends funcionais (e-commerce B2C + B2B)  
**Mercado:** Brasil (idioma: português BR)  
**Posicionamento:** Saúde + Estética japonesa + Premiumidade acessível  
**Personalidade:** Sofisticada, calma, autêntica, funcional, levemente zen  
**NÃO é:** kitsch japonês, dashboard tecnológico, minimalismo clínico, estilo café-da-manhã genérico

### Essência visual em 3 palavras
> **Sereno. Premium. Vivo.**

---

## 2. Paleta de Cores

```css
:root {
  /* Primárias */
  --color-primary:       #2B5E2E;  /* Verde floresta — botões, títulos, CTA */
  --color-primary-light: #4A8C4E;  /* Verde médio — hover, badges */
  --color-accent:        #8FBA2E;  /* Verde limão — destaques, tags de promoção */

  /* Neutros */
  --color-text:          #1A1A1A;  /* Texto principal */
  --color-text-muted:    #666666;  /* Subtítulos, labels */
  --color-text-inverse:  #FFFFFF;  /* Texto sobre fundos escuros */

  /* Fundos */
  --color-bg:            #FFFFFF;  /* Fundo padrão */
  --color-bg-warm:       #F8F5F0;  /* Off-white quente — seções alternadas */
  --color-bg-dark:       #1C2B1E;  /* Verde muito escuro — footer, seções premium */
  --color-bg-matcha:     #E8F0D8;  /* Verde pálido — badges, cards sutis */

  /* Bordas */
  --color-border:        #E5E0D8;  /* Borda sutil warm */
  --color-border-dark:   #2B5E2E;  /* Borda verde para destaques */
}
```

### Regras de uso de cor
- Fundo branco (`#FFFFFF`) é o padrão. Seções alternadas usam `#F8F5F0`
- Verde escuro (`#2B5E2E`) em botões primários, títulos de destaque, links ativos
- Accent amarelo-verde (`#8FBA2E`) apenas em badges, tags, e destaques pontuais — nunca em texto corrido
- Footer sempre em `#1C2B1E` com texto branco
- Nunca usar vermelho, laranja ou cores quentes — quebram o mood zen

---

## 3. Tipografia

### Fontes (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', -apple-system, sans-serif;
}
```

### Escala tipográfica

| Uso | Fonte | Tamanho Mobile | Tamanho Desktop | Peso |
|-----|-------|---------------|-----------------|------|
| Hero headline | Playfair Display | 32px | 56px | 500 |
| Section title (h2) | Playfair Display | 24px | 40px | 500 |
| Card title (h3) | Playfair Display | 18px | 24px | 400 |
| Body text | Inter | 15px | 16px | 400 |
| Label / tag | Inter | 11px | 12px | 600 |
| Button | Inter | 14px | 14px | 600 |
| Price | Inter | 18px | 20px | 600 |
| Preço riscado | Inter | 14px | 14px | 400 (line-through) |

### Regras tipográficas críticas
- **Nunca usar `font-weight: 700` (bold)** — máximo é `600` (semibold)
- `letter-spacing: 0.08em` em labels uppercase e tags
- `line-height: 1.2` para títulos, `1.6` para corpo de texto
- Títulos de seção sempre centralizados em mobile; podem ser à esquerda em desktop
- Subtítulos de seção em Inter 14px, cor `#666666`, uppercase com letra-spacing

---

## 4. Espaçamento

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
}
```

### Padrão de seções
- Padding vertical de seção: `80px` desktop / `48px` mobile
- Gap entre cards: `24px` desktop / `16px` mobile
- Padding interno de card: `24px`

---

## 5. Grid e Layout

### Breakpoints
```css
/* Mobile first */
/* sm: 480px | md: 768px | lg: 1024px | xl: 1280px */
```

### Grid de produtos
- Mobile: **2 colunas**
- Desktop (≥768px): **4 colunas**
- Gap: `16px` mobile / `24px` desktop

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px; /* mobile */
}
@media (min-width: 768px) {
  .container { padding: 0 32px; }
}
@media (min-width: 1280px) {
  .container { padding: 0 48px; }
}
```

---

## 6. Border Radius

```css
:root {
  --radius-sm:   4px;   /* tags, badges */
  --radius-md:   8px;   /* cards, inputs */
  --radius-lg:   16px;  /* modais, drawers */
  --radius-full: 9999px; /* botões pill, avatares */
}
```

---

## 7. Sombras e Elevação

```css
:root {
  --shadow-xs: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
}
```

Cards em repouso: `--shadow-sm`. Cards em hover: `--shadow-md`.

---

## 7.5. Iconografia

> **CRÍTICO: ZERO emojis. Ícones sempre minimalistas, traço fino, elegância premium.**

### Filosofia
- **Estilo:** Stroke-based (traço), nunca filled
- **Peso:** 1.5px a 2px
- **Tamanho:** 24px (nav), 32px (seções), 48px (destaque)
- **Cor:** `#1A1A1A` ou `#8FBA2E` em destaque
- **Fonte recomendada:** Feather Icons ou Phosphor Light

### Quando usar ícones
| Elemento | Exemplo | ✅ Fazer | ❌ NÃO fazer |
|----------|---------|-----------|------------|
| Header nav | Busca, Perfil, Carrinho | <svg>...search...</svg> | 🔍 🛒 👤 |
| Benefícios | Certificação, Origem, Qualidade | SVG outline | Emoji 🌿 ⭐ |
| Seção footer | Social links | SVG stroke fino | Emoji 📱 |
| CTA buttons | Seta de ação | → (SVG) | → (emoji) |

### Ícones obrigatórios
- Search (magnifying glass)
- User (person circle)
- Shopping bag (carrinho)
- Menu (hambúrguer)
- X / Close (fechar)
- Heart (favorito)
- Share (compartilhar)
- Filter (filtros)
- Truck / Delivery
- Shield / Lock (segurança)
- Award / Certification

### Exemplo em HTML
```html
<!-- Busca no header -->
<button aria-label="Buscar">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
</button>
```

---

## 8. Botões

### Botão Primário
```html
<button class="btn btn-primary">Comprar Agora</button>
```
```css
.btn-primary {
  background: #2B5E2E;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.04em;
  padding: 14px 32px;
  border-radius: 9999px;   /* pill */
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover {
  background: #4A8C4E;
  transform: translateY(-1px);
}
```

### Botão Secundário (outline)
```css
.btn-secondary {
  background: transparent;
  color: #2B5E2E;
  border: 1.5px solid #2B5E2E;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 13px 32px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: #2B5E2E;
  color: #FFFFFF;
}
```

### Botão Ghost (para fundos escuros)
```css
.btn-ghost {
  background: transparent;
  color: #FFFFFF;
  border: 1.5px solid rgba(255,255,255,0.6);
  padding: 13px 32px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 14px;
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: #FFFFFF;
}
```

---

## 9. Cards de Produto

```html
<div class="product-card">
  <div class="product-card__image-wrap">
    <img src="[url]" alt="[nome do produto]" class="product-card__image">
    <span class="product-card__badge">Mais Vendido</span>
  </div>
  <div class="product-card__info">
    <span class="product-card__category">Matcha Puro</span>
    <h3 class="product-card__title">Matcha Ceremonial Premium</h3>
    <div class="product-card__price">
      <span class="price-current">R$ 89,90</span>
      <span class="price-compare">R$ 119,90</span>
    </div>
    <button class="btn btn-primary btn-full">Adicionar ao Carrinho</button>
  </div>
</div>
```

```css
.product-card {
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.product-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  transform: translateY(-2px);
}
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #F8F5F0;
}
.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-card__image {
  transform: scale(1.04);
}
.product-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #8FBA2E;
  color: #1A1A1A;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
}
.product-card__info {
  padding: 16px;
}
.product-card__category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666666;
  display: block;
  margin-bottom: 4px;
}
.product-card__title {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 400;
  color: #1A1A1A;
  margin: 0 0 12px;
  line-height: 1.3;
}
.price-current {
  font-size: 18px;
  font-weight: 600;
  color: #2B5E2E;
}
.price-compare {
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  text-decoration: line-through;
  margin-left: 8px;
}
.btn-full { width: 100%; margin-top: 12px; }
```

---

## 10. Componentes de Seção

### Cabeçalho de Seção (padrão)
```html
<div class="section-header">
  <span class="section-eyebrow">Nossa Linha</span>
  <h2 class="section-title">Favoritos da Estação</h2>
  <p class="section-subtitle">Matchas selecionados para o seu ritual diário</p>
</div>
```
```css
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4A8C4E;
  margin-bottom: 8px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 12px;
}
.section-subtitle {
  font-size: 16px;
  color: #666666;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}
```

---

## 11. Hero Section

### Estrutura visual
- Fundo: imagem de produto em contexto (superfície de pedra, cerâmica, folha de bambu)
- Overlay: gradiente sutil do lado esquerdo `rgba(27,45,30,0.55) → transparent`
- Texto: branco, alinhado à esquerda (desktop) / centralizado (mobile)
- CTA: 2 botões — primário (comprar) + ghost (saiba mais)
- Altura: `100vh` em desktop, `70vh` em mobile

```html
<section class="hero">
  <div class="hero__bg">
    <img src="[hero-image]" alt="Matcha premium Namu">
  </div>
  <div class="hero__overlay"></div>
  <div class="container">
    <div class="hero__content">
      <span class="hero__eyebrow">Ritual japonês. Resultado real.</span>
      <h1 class="hero__title">O matcha que<br>transforma o seu dia</h1>
      <p class="hero__subtitle">Ceremonial grade. Produzido no Japão. Entregue até você.</p>
      <div class="hero__actions">
        <button class="btn btn-primary">Comprar Agora</button>
        <button class="btn btn-ghost">Ver Produtos</button>
      </div>
    </div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
}
.hero__bg {
  position: absolute; inset: 0;
  overflow: hidden;
}
.hero__bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(27,45,30,0.60) 0%, rgba(27,45,30,0.10) 70%, transparent 100%);
}
.hero__content {
  position: relative;
  max-width: 560px;
  color: #FFFFFF;
}
.hero__eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8FBA2E;
  margin-bottom: 16px;
}
.hero__title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 500;
  line-height: 1.15;
  margin: 0 0 20px;
}
.hero__subtitle {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  opacity: 0.85;
  margin: 0 0 32px;
}
.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
@media (max-width: 767px) {
  .hero { height: 70vh; }
  .hero__overlay {
    background: rgba(27,45,30,0.50);
  }
  .hero__content { text-align: center; max-width: 100%; }
  .hero__actions { justify-content: center; }
}
```

---

## 12. Marquee / Faixa de Diferenciais

```html
<div class="marquee-strip">
  <div class="marquee-track">
    <span>🍵 Matcha Ceremonial Grade</span>
    <span>✦</span>
    <span>🚚 Frete Grátis acima de R$199</span>
    <span>✦</span>
    <span>🌿 100% Origem Japão</span>
    <span>✦</span>
    <span>⭐ +4.800 avaliações</span>
    <span>✦</span>
    <!-- repetir para loop infinito -->
  </div>
</div>
```
```css
.marquee-strip {
  background: #2B5E2E;
  color: #FFFFFF;
  padding: 12px 0;
  overflow: hidden;
}
.marquee-track {
  display: flex;
  gap: 40px;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 13. Cards de Categoria

```html
<div class="categories-grid">
  <a class="category-card" href="#">
    <div class="category-card__image-wrap">
      <img src="[img]" alt="Matchas Puros">
    </div>
    <div class="category-card__label">Matchas Puros</div>
  </a>
  <!-- repetir para Blends, Utensílios, Kits -->
</div>
```
```css
.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px) {
  .categories-grid { grid-template-columns: repeat(4, 1fr); }
}
.category-card {
  display: block;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  aspect-ratio: 3/4;
}
.category-card__image-wrap {
  width: 100%; height: 100%;
}
.category-card__image-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.category-card:hover img {
  transform: scale(1.05);
}
.category-card__label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(27,45,30,0.85));
  color: #FFFFFF;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 400;
  padding: 24px 16px 16px;
}
```

---

## 14. Seção de Benefícios

```html
<section class="benefits-strip" style="background: #F8F5F0;">
  <div class="container">
    <div class="benefits-grid">
      <div class="benefit-item">
        <div class="benefit-icon">🍃</div>
        <h4 class="benefit-title">Origem Certificada</h4>
        <p class="benefit-desc">Direto das plantações de Uji, Japão</p>
      </div>
      <!-- repetir itens -->
    </div>
  </div>
</section>
```
```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
@media (min-width: 768px) {
  .benefits-grid { grid-template-columns: repeat(4, 1fr); }
}
.benefit-item { text-align: center; }
.benefit-icon { font-size: 32px; margin-bottom: 12px; }
.benefit-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0 0 6px;
}
.benefit-desc {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
}
```

---

## 15. Newsletter

```html
<section class="newsletter" style="background: #2B5E2E;">
  <div class="container">
    <div class="newsletter__inner">
      <h2 class="newsletter__title">Faça parte do ritual Namu</h2>
      <p class="newsletter__sub">Receitas exclusivas, lançamentos e 10% OFF na primeira compra</p>
      <form class="newsletter__form">
        <input type="email" placeholder="seu@email.com" class="newsletter__input">
        <button type="submit" class="btn btn-accent">Quero meu desconto</button>
      </form>
    </div>
  </div>
</section>
```
```css
.newsletter { padding: 80px 0; }
.newsletter__inner { text-align: center; max-width: 540px; margin: 0 auto; }
.newsletter__title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 500;
  color: #FFFFFF;
  margin: 0 0 12px;
}
.newsletter__sub {
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  margin: 0 0 32px;
}
.newsletter__form {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.newsletter__input {
  flex: 1;
  min-width: 240px;
  padding: 14px 20px;
  border-radius: 9999px;
  border: none;
  font-size: 14px;
  background: rgba(255,255,255,0.95);
  color: #1A1A1A;
}
.btn-accent {
  background: #8FBA2E;
  color: #1A1A1A;
  font-weight: 600;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-accent:hover { background: #7da828; }
```

---

## 16. Header / Navegação

```html
<header class="site-header">
  <div class="container">
    <nav class="nav">
      <div class="nav__logo">
        <img src="[logo-verde]" alt="Namu Matcha" height="36">
      </div>
      <ul class="nav__links">
        <li><a href="#">Matchas</a></li>
        <li><a href="#">Blends</a></li>
        <li><a href="#">Utensílios</a></li>
        <li><a href="#">Receitas</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
      <div class="nav__actions">
        <button aria-label="Buscar">🔍</button>
        <button aria-label="Conta">👤</button>
        <button aria-label="Carrinho" class="cart-btn">
          🛒 <span class="cart-count">0</span>
        </button>
      </div>
    </nav>
  </div>
</header>
```
```css
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #E5E0D8;
  height: 72px;
  display: flex;
  align-items: center;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.nav__links {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0; padding: 0;
}
.nav__links a {
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  text-decoration: none;
  transition: color 0.2s;
}
.nav__links a:hover { color: #2B5E2E; }
```

---

## 17. Footer

```html
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="[logo-branco]" alt="Namu Matcha" height="32">
        <p>Matcha premium do Japão para o seu cotidiano.</p>
        <div class="footer__social">
          <!-- ícones Instagram, TikTok -->
        </div>
      </div>
      <div class="footer__col">
        <h5>Produtos</h5>
        <ul>
          <li><a href="#">Matchas Puros</a></li>
          <li><a href="#">Blends</a></li>
          <li><a href="#">Kits</a></li>
          <li><a href="#">Utensílios</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h5>Informações</h5>
        <ul>
          <li><a href="#">Sobre a Namu</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Receitas</a></li>
          <li><a href="#">B2B / Food Service</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h5>Ajuda</h5>
        <ul>
          <li><a href="#">Fale Conosco</a></li>
          <li><a href="#">Trocas e Devoluções</a></li>
          <li><a href="#">Rastrear Pedido</a></li>
          <li><a href="#">Perguntas Frequentes</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2025 Namu Matcha. Todos os direitos reservados.</p>
      <p><a href="#">Política de Privacidade</a> · <a href="#">Termos de Uso</a></p>
    </div>
  </div>
</footer>
```
```css
.footer {
  background: #1C2B1E;
  color: rgba(255,255,255,0.75);
  padding: 64px 0 32px;
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
@media (max-width: 767px) {
  .footer__grid { grid-template-columns: 1fr 1fr; }
}
.footer__brand p {
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
}
.footer__col h5 {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0 0 16px;
}
.footer__col ul { list-style: none; padding: 0; margin: 0; }
.footer__col li { margin-bottom: 10px; }
.footer__col a {
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}
.footer__col a:hover { color: #FFFFFF; }
.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255,255,255,0.45);
}
.footer__bottom a { color: inherit; }
```

---

## 18. Animações e Motion

```css
/* Fade up — entrada de seções */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up {
  animation: fadeUp 0.5s ease forwards;
}

/* Preferências de redução de movimento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Princípios de motion
- Duração padrão: `250ms` para micro-interações, `400-500ms` para entradas de seção
- Easing: `ease` ou `cubic-bezier(0.4, 0, 0.2, 1)` (Material smooth)
- Hover em cards: `translateY(-2px)` + shadow upgrade
- Hover em imagens: `scale(1.04)` (nunca mais que 1.06)
- Nunca animar `width` ou `height` — usar `transform` e `opacity`

---

## 19. Fotografia e Imagens

### Estilo visual mandatório
- **Fundo:** branco porcelana (`#FAFAFA`) ou pedra clara neutra
- **Iluminação:** natural ou soft studio — sem sombras duras
- **Composição:** produto centralizado, muito espaço ao redor (respiração)
- **Contexto:** tigela cerâmica japonesa, chasen (batedor de bambu), pó de matcha em superfície
- **NÃO usar:** fundo verde saturado, efeitos HDR, filtros dramáticos, fotos de pessoas bebendo em primeiro plano

### Aspect ratios por uso
| Contexto | Ratio |
|----------|-------|
| Card de produto | `1:1` (quadrado) |
| Hero section | `16:9` (landscape) ou `4:3` |
| Card de categoria | `3:4` (portrait) |
| Card de receita | `16:9` |
| Card de blog | `4:3` |
| Banner editorial | `21:9` (ultrawide) |

### Placeholders para protótipos
Use: `https://picsum.photos/seed/matcha/[largura]/[altura]` ou imagens de matcha/chá do Unsplash.

---

## 20. Template HTML Completo (Base)

Use este como ponto de partida para qualquer ferramenta externa:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Namu Matcha</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --color-primary: #2B5E2E;
      --color-primary-light: #4A8C4E;
      --color-accent: #8FBA2E;
      --color-text: #1A1A1A;
      --color-text-muted: #666666;
      --color-bg: #FFFFFF;
      --color-bg-warm: #F8F5F0;
      --color-bg-dark: #1C2B1E;
      --color-border: #E5E0D8;
      --font-heading: 'Playfair Display', Georgia, serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-full: 9999px;
      --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
    }
    body {
      font-family: var(--font-body);
      font-size: 16px;
      color: var(--color-text);
      background: var(--color-bg);
      line-height: 1.6;
    }
    img { max-width: 100%; display: block; }
    a { text-decoration: none; }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 16px;
    }
    @media (min-width: 768px) { .container { padding: 0 32px; } }
    @media (min-width: 1280px) { .container { padding: 0 48px; } }
    section { padding: 48px 0; }
    @media (min-width: 768px) { section { padding: 80px 0; } }
  </style>
</head>
<body>
  <!-- HEADER -->
  <!-- HERO -->
  <!-- MARQUEE -->
  <!-- FEATURED PRODUCTS -->
  <!-- CATEGORIES -->
  <!-- BENEFITS -->
  <!-- NEWSLETTER -->
  <!-- FOOTER -->
</body>
</html>
```

---

## 21. Checklist para Ferramentas Externas

Ao gerar uma página com este design system, verifique:

- [ ] Fonte `Playfair Display` em todos os títulos h1/h2/h3
- [ ] `font-weight` máximo = `600` (nunca 700 ou bold)
- [ ] Verde primário `#2B5E2E` em botões e links ativos
- [ ] Fundos alternam entre `#FFFFFF` e `#F8F5F0`
- [ ] Botões sempre pill (`border-radius: 9999px`)
- [ ] Hover em cards: translateY(-2px) + shadow upgrade
- [ ] Grid 2col mobile → 4col desktop em produtos
- [ ] Footer em `#1C2B1E`
- [ ] Nenhuma cor vermelha, laranja ou quente
- [ ] Espaçamento generoso — não comprimir elementos
- [ ] Texto em português BR

---

*Este documento é suficiente para gerar qualquer página HTML da Namu Matcha. Para uso no Shopify, complementar com `namu-prd-master.md` (lógica de negócio) e `namu-design-system.md` (tokens e regras Liquid).*
