# Namu Matcha — Shopify Theme Development

## Project Overview
Shopify theme for **Namu Matcha** (namu-matcha.myshopify.com), a Brazilian matcha ecommerce.
Base theme: **Dawn** (Shopify official). All customizations target the Namu brand.
Inspiration: jadeleafmatcha.com

## ⚠️ CRITICAL WORKFLOW RULES (read before EVERY task)

### Iron Law #0 — NUNCA usar worktrees. Editar diretamente nos arquivos do projeto.
- **PROIBIDO** usar `EnterWorktree` ou editar em `.claude/worktrees/`
- O usuário usa Git Desktop — worktrees criam uma cópia isolada que o Git Desktop não enxerga
- Sempre editar diretamente em `C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify\`
- Se por algum motivo um worktree já estiver ativo, copiar as alterações de volta ANTES de reportar "pronto"

### Iron Law #1 — Never push for every small change
- **DEFAULT:** assume `shopify theme dev` is running locally — edits reload automatically.
- **ONLY push** when (a) the user explicitly asks "envia pro Shopify" / "faz upload", or (b) finishing a session.
- A single `theme push` takes 30-60s and burns context tokens. Batch all changes, then push ONCE.

### Iron Law #2 — Always use the development theme ID
- **Theme ID:** `149681143886` (Development - 64a428-Gabriel)
- **Live theme (Horizon `149660729422`) is OFF-LIMITS** unless user explicitly says "envia pra produção"
- Push command always:
  ```bash
  shopify theme push --theme 149681143886 --store namu-matcha.myshopify.com
  ```
- Preview URL: `https://namu-matcha.myshopify.com?preview_theme_id=149681143886`

### Iron Law #3 — Before claiming "the change didn't work"
Run this checklist IN ORDER:
1. Did the user hard-refresh? (`Ctrl+Shift+R`) — solves 80% of cases
2. Are they viewing the dev theme URL? (must contain `preview_theme_id=149681143886`)
3. Pull `templates/index.json` from remote into `_check/` and grep for the change — confirms server state
4. ONLY then assume there's a real bug

### Iron Law #4 — Commit before risky changes
- Before deleting sections, refactoring schemas, or touching `layout/theme.liquid`: **commit current state to Git first**
- Use Git Desktop (user has it installed) — branch name pattern: `feature/<change-name>`
- Rollback recipe: `git checkout <commit>` → `shopify theme push --theme 149681143886 ...`

### Iron Law #5 — Liquid is NOT React
- **No state, no hooks, no useEffect, no client context.** Don't suggest these.
- Interactivity = vanilla JS in `<script>` tags inside the section file
- "Props" = section settings (defined in `{% schema %}`)
- "Children" = blocks (`{% for block in section.blocks %}`)
- "Components" = snippets (`{% render 'name' %}`)
- Editor will set values; merchant edits via Theme Editor — design schemas with this in mind

### Iron Law #6 — Verify before reporting "done"
- After changes, output: `path/to/file.liquid:line` of what changed
- Don't say "tudo pronto" until you've either (a) seen the dev server reflect it, or (b) pulled from remote post-push and confirmed
- "Cache" is the #1 cause of false failures — always suggest hard refresh first

### Iron Law #7 — Localhost-first feedback loop
- After **every visual/interactive change**, end the response with: **"Quer ver no localhost antes de continuar?"** (or equivalent in pt-BR)
- The user has `http://127.0.0.1:9292` running with hot reload — they can see results in seconds
- Don't batch 5 unrelated changes without a checkpoint — small steps, validate, continue
- Exception: trivial typo fixes / inline copy edits — just announce them concisely

### Iron Law #8 — Cache-busting first response on visual bugs
- When user reports "não atualizou" / "tá igual" / "não mudou": **respond with this 3-step checklist BEFORE any debugging**:
  1. DevTools aberto (F12) → aba **Network** → checkbox **"Disable cache"** marcado
  2. `Ctrl+Shift+R` (hard refresh) na página
  3. Confirmar que a URL é `http://127.0.0.1:9292` (não a loja Shopify direta)
- Only after these 3 steps fail, start investigating the actual code
- 90% of "not updating" reports are stale cache — diagnosing code first wastes context

### Iron Law #9 — Reuse before create
- Before creating ANY new file (asset, section, snippet, CSS), run `Glob` to check for similar
- If a similar file exists, **edit it** rather than creating a new one
- Naming convention: all custom files use `namu-` prefix — if no `namu-*` match exists, then create
- Never create README/MD docs unless explicitly requested

### Iron Law #10 — MUST invoke Shopify skills for Shopify tasks
This project has **19 official Shopify skills** installed (`.agents/skills/shopify-*`). They are mandatory references — Claude must invoke the matching skill **before** writing code:

| Task signal | Skill to invoke |
|---|---|
| Liquid templating, sections, schemas, snippets | `shopify-liquid` + `liquid-theme-standards` |
| `shopify` CLI commands (dev, push, pull) | `shopify-use-shopify-cli` |
| GraphQL Admin API (products, orders, collections) | `shopify-admin` |
| Customer accounts, login, profile | `shopify-customer` |
| Metafields, metaobjects, custom data | `shopify-custom-data` |
| Checkout customizations (UI extensions) | `shopify-polaris-checkout-extensions` |
| Discount/payment/delivery rules | `shopify-functions` |
| Storefront API (headless reads) | `shopify-storefront-graphql` |
| App store submission, partner workflows | `shopify-app-store-review`, `shopify-partner` |
| General Shopify dev guidance | `shopify-dev` |
| Theme accessibility | `liquid-theme-a11y` |

**Rule:** if the user's request matches any row above, invoke the skill via the Skill tool BEFORE writing code or running commands. Never improvise from training data when a skill is available.

### Iron Law #11 — MUST invoke Claude Code skills for harness/config tasks
| Task signal | Skill to invoke |
|---|---|
| Edit `settings.json`, hooks, permissions, env vars | `update-config` |
| Keybindings (`~/.claude/keybindings.json`) | `keybindings-help` |
| Reduce permission prompts | `fewer-permission-prompts` |
| Build/improve other skills | `skill-creator`, `skill-improver` |
| Anthropic SDK / Claude API code | `claude-api` |
| Code review preparation | `simplify`, `code-reviewer` |

### Iron Law #12 — Envie o link do localhost ao iniciar qualquer sessão ou conversa
- **Sempre que abrir o projeto ou começar uma nova conversa no dia**, a primeira resposta deve incluir:
  ```
  🟢 Localhost: http://127.0.0.1:9292
  ```
- Se o servidor `shopify theme dev` não estiver rodando, avisar e sugerir o comando para iniciar:
  ```powershell
  cd "C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify"
  shopify theme dev --theme 149681143886 --store namu-matcha.myshopify.com --store-password namu
  ```
- Não espere o usuário perguntar — envie proativamente na abertura.

### Iron Law #12.1 — Sempre inclua o `cd` antes de qualquer comando terminal
- **Todo comando que o usuário precisar rodar no terminal** deve ser precedido do comando de navegação para a pasta correta:
  ```powershell
  cd "C:\Users\unk_g\OneDrive\Área de Trabalho\namu-shopify"
  ```
- Isso vale para: `shopify theme dev`, `shopify theme push`, `shopify theme pull`, `git`, `npm`, e qualquer outro comando do projeto
- Nunca forneça só o comando isolado — sempre o par `cd` + comando
- Exceção: se o usuário já confirmou que está na pasta certa naquela mesma conversa

### Iron Law #13 — Toque SOMENTE no que foi pedido. Nunca mais, nunca menos.

**Regra absoluta:** cada alteração deve acontecer exclusivamente no arquivo/seção indicado pelo usuário. Nenhum outro arquivo é tocado sem aprovação explícita.

#### O que é PROIBIDO sem permissão
- Editar, criar ou remover qualquer arquivo além do solicitado
- Adicionar, mover ou apagar blocos, settings ou partes de uma seção que não foram mencionados
- "Aproveitar" a edição para "melhorar" outro trecho que não foi pedido
- Criar novos snippets, assets ou seções como efeito colateral de uma mudança

#### O que fazer quando perceber que outra área precisa mudar
**PARE. Não edite. Pergunte primeiro**, informando obrigatoriamente:

1. **Onde:** qual arquivo/seção precisaria ser tocado além do pedido
2. **Por quê:** motivo técnico claro (ex: "a seção X referencia a variável Y que está em Z")
3. **Antes:** comportamento/aparência atual se a mudança NÃO for feita
4. **Depois:** resultado esperado SE a mudança for aprovada
5. **Impacto:** risco ou efeito colateral de fazer OU de não fazer

Só prossiga após o usuário responder **"pode fazer"** ou equivalente explícito.

#### Exemplos práticos
| Pedido do usuário | Correto | Errado |
|---|---|---|
| "Muda a cor do texto do marquee" | Edita só `namu-marquee.css` | Também "ajusta" `namu-tokens.css` |
| "Adiciona um bloco no hero slider" | Edita só `namu-hero-slider.liquid` | Também atualiza `templates/index.json` |
| "Corrige o padding do footer" | Edita só `namu-footer.css` | Também "padroniza" outros CSS |

#### Nunca alucine escopo
Se não tiver certeza de qual arquivo deve ser editado, **pergunte antes de abrir qualquer ferramenta de escrita**. Dúvida = pergunta, não tentativa.

### Iron Law #14 — Iconografia: Minimalista e Premium, ZERO emojis

**Filosofia:** Namu não usa emojis. Toda iconografia deve ser minimalista, traço fino, classe.

#### Regras obrigatórias
- ❌ **NUNCA usar emojis** (🔍, 🛒, 👤, 💚, 🌿, ⭐, etc.)
- ✅ **SEMPRE usar SVG com stroke fino** (1.5px–2px, não filled)
- ✅ Ícones de bibliotecas: **Feather Icons** ou **Phosphor Light** (minimalistas, elegantes)
- ✅ Cor padrão: `#2D2D2D` (var(--namu-cinza-sombra)) ou `#78C33F` (var(--namu-verde-puro)) em destaque
- ✅ Tamanhos: 24px (nav), 32px (seções), 48px (benefícios)

#### Ícones obrigatórios (nunca emoji)
| Contexto | Usar SVG | ❌ NÃO usar |
|----------|----------|------------|
| Busca | Search / Magnifier glass | 🔍 |
| Carrinho | Shopping bag | 🛒 |
| Perfil / Conta | User circle | 👤 |
| Menu mobile | Menu / Hambúrguer | ☰ |
| Fechar | X | ✕ |
| Favoritos | Heart outline | 🤍 ❤️ |
| Entrega | Truck / Delivery | 🚚 |
| Segurança | Shield / Lock | 🔐 |
| Certificado | Award / Check circle | ✓ |
| Social (Instagram, TikTok) | Brand SVG stroke | IG/TT |

#### Exemplo correto (SVG minimalista)
```html
<!-- Search icon — Feather style -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"></circle>
  <path d="m21 21-4.35-4.35"></path>
</svg>
```

#### Exemplo ERRADO (nunca fazer)
```html
❌ <span>🔍</span>
❌ <img src="emoji.png"> <!-- emoji rasterizado -->
❌ <svg stroke-width="4">...</svg> <!-- muito pesado -->
```

---

## Skills auto-update (weekly)

The `.claude/scripts/skills-autoupdate.ps1` script runs at every `SessionStart`:
- Checks `.claude/.skills-last-update` timestamp
- If > 7 days old (or missing), spawns `npx skills add Shopify/shopify-ai-toolkit` in background
- Logs to `.claude/.skills-update.log`
- Updates timestamp so next session waits another 7 days

**Manual update:** `npx skills add Shopify/shopify-ai-toolkit` (reinstalls all 19, latest versions).

---

## Development Workflow

### Active development (preferred — no push needed)
```bash
shopify theme dev --theme 149681143886 --store namu-matcha.myshopify.com --store-password namu
```
Open `http://127.0.0.1:9292` in Chrome — saves to `.liquid`, `.css`, `.js`, and `.json` reload automatically.

**DevTools setup (do once per Chrome profile):**
1. `F12` to open DevTools, dock to right side (`⋮` → Dock side → right)
2. Network tab → check **"Disable cache"** (only active while DevTools is open)
3. Keep DevTools open during all dev sessions to bypass cache reliably

### Push only when finishing a session or sharing
```bash
shopify theme push --theme 149681143886 --store namu-matcha.myshopify.com
```

### Pull (verify remote state or recover from accidental local delete)
```bash
shopify theme pull --theme 149681143886 --store namu-matcha.myshopify.com
```

### Rollback via Git Desktop
1. Open Git Desktop → revert commit OR checkout previous commit
2. Run `shopify theme push --theme 149681143886 ...` to sync remote

## Directory Structure
```
namu-shopify/
├── assets/          # CSS, JS, images, fonts
├── config/          # settings_schema.json, settings_data.json
├── layout/          # theme.liquid (global wrapper)
├── locales/         # pt-BR.json translations
├── sections/        # Reusable page sections (homepage blocks)
├── snippets/        # Small reusable Liquid components
└── templates/       # Page type templates (index.json = homepage)
```

## Homepage Architecture
Homepage is defined in `templates/index.json` — it references sections in order.
Each section in `sections/` is a self-contained Liquid file with schema.

### Homepage Sections (current order in templates/index.json)
1. `sections/namu-hero-slider.liquid` — full-width hero with 5 rotating slides
2. `sections/namu-marquee.liquid` — infinite-loop rotating differentials strip (JS-animated)
3. `sections/namu-featured-products.liquid` — "Favoritos da Estação" carousel (uses `mais-vendidos` collection)
4. `sections/namu-categories.liquid` — 4 category cards (Matchas Puros / Blends / Utensílios / Kits)
5. `sections/namu-b2b.liquid` — B2B / food service editorial banner
6. `sections/namu-recipes.liquid` — recipe cards grid
7. `sections/namu-newsletter.liquid` — email signup with logo
8. `sections/namu-blog.liquid` — editorial article grid
9. `sections/namu-benefits.liquid` — icon + text benefits row

**Header** (via `sections/header-group.json`): `announcement-bar` + `namu-header`
**Footer** (via `sections/footer-group.json`): `namu-footer`

### Cleanup state (after pre-cleanup snapshot ec3fea5)
The following Dawn defaults were **removed** — do NOT recreate them. If functionality is needed, build a `namu-*` version:
- Removed sections: `slideshow`, `image-banner`, `image-with-text`, `featured-collection`, `featured-product`, `featured-blog`, `collage`, `multicolumn`, `multirow`, `newsletter`, `email-signup-banner`, `rich-text`, `video`, `collapsible-content`, `collection-list`, `bulk-quick-order-list`, `quick-order-list`, `main-blog`, `main-article`, `main-page`, `contact-form`, `main-password-footer`, `main-password-header`, `page`
- Removed templates: `article.json`, `blog.json`, `page.contact.json`
- Removed assets: ~50 unused Dawn icons, 6 unused section CSS files, demo slides

**Sections that MUST stay** (Shopify loads them dynamically): `cart-drawer`, `cart-icon-bubble`, `cart-notification-*`, `predictive-search`, `apps`, `main-404`, `pickup-availability`, `related-products`, `custom-liquid`, plus all `main-*` for product/collection/cart/customers/search.

## Design Preferences

### Seções: Viewport-Locked Section (PREFERÊNCIA DO PROJETO)
O cliente prefere seções que **ocupam 100% da viewport**, independente de zoom ou resolução.

**O que é:** `height: 100vh` sem container limitante — a seção preenche exatamente a janela visível.

**Quando usar:** Sempre que o design tiver imagem de fundo, split 50/50, ou hero destacado.

**Padrão CSS:**
```css
.namu-minha-secao-viewport {
  height: 100vh;
  padding: 0;        /* sem padding — ocupa tudo */
  overflow: hidden;
}
.namu-minha-secao-viewport .inner {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* ou conforme o layout */
  height: 100%;
}
```

**Referência visual:** Jade Leaf Matcha (jadeleafmatcha.com) — seções de split que travam no viewport.

**Responsivo:** Em mobile (`max-width: 992px`), remover `height: 100vh` e empilhar verticalmente.

### Header — Comportamento Padrão (TODAS as páginas)
O header é **sempre igual** em todas as páginas:
- **Pill branca** flutuando com `box-shadow` suave
- **Espaço ao redor da pill** transparente — o conteúdo da página aparece por baixo
- **Funciona em hero escuro e claro** — a pill branca flutua sobre qualquer fundo

**NÃO alterar** o header por página. Se a hero for escura, a pill branca flutua sobre ela — esse é o design correto (referência: Jade Leaf Matcha).

#### Como fazer o hero ficar ATRÁS do header (REGRA OBRIGATÓRIA)
O `<main>` do Shopify ocupa espaço natural no fluxo. Para o hero ficar **embaixo do header** (pill flutuando sobre a imagem), use **`margin-top` negativo no ELEMENTO RAIZ DA SEÇÃO** (não num filho aninhado — não funciona).

#### Variáveis globais (em `assets/namu-tokens.css`)
**SEMPRE usar essas vars, NUNCA hardcode os valores:**
```css
--namu-header-height-desktop: 88px;
--namu-header-height-mobile:  72px;
--namu-announcement-height:   40px;
--namu-header-overlap:        -88px;   /* responsive: vira -72px em ≤989px */
--namu-viewport-minus-announcement: calc(100vh - 40px);
```

#### Como aplicar (template padrão)
```css
/* CERTO: margin-top no root da seção, usando var global */
.namu-minha-secao {
  margin-top: var(--namu-header-overlap);   /* responsive automático */
  position: relative;
  z-index: 1;                                /* header tem z:50, fica por cima */
}

/* Se a primeira sub-seção precisar ser 100vh visível
   (descontando announcement bar), use a var pronta: */
.namu-minha-secao .meu-hero-viewport {
  height: var(--namu-viewport-minus-announcement);
}
```

```css
/* ERRADO: margin-top num filho aninhado */
.namu-minha-secao .filho-interno {
  margin-top: var(--namu-header-overlap);   /* não vai sair do parent */
}
```

#### Onde já é aplicado
- `namu-hero-slider.css` → `.namu-hero--overlap` (homepage)
- `namu-b2b.css` → `.namu-b2b-page` (página B2B)

Replicar em qualquer nova página/template com hero em destaque.

---

## Liquid Conventions

### NEVER do this
- Do NOT use deprecated `img_url` filter — use `image_url` with `width:` parameter
- Do NOT hardcode Portuguese strings — use `locales/pt-BR.json` via `t:` key
- Do NOT write inline `<style>` blocks in section files — use `assets/namu-*.css`
- Do NOT use `{% assign %}` inside loops when it can be hoisted outside
- Do NOT skip `loading="lazy"` on images below the fold

### ALWAYS do this
- Use `{{ image | image_url: width: 800 | image_tag: loading: 'lazy', alt: image.alt }}`
- Schema blocks must have `"presets"` defined so sections can be added via Theme Editor
- Every new CSS file must be linked via `{{ 'namu-file.css' | asset_url | stylesheet_tag }}`
- Prefix all custom CSS classes with `namu-` to avoid Dawn conflicts
- Use CSS custom properties for brand tokens (defined in `assets/namu-tokens.css`)

### Image optimization
```liquid
{%- assign img_url = section.settings.image | image_url: width: 1200 -%}
<img
  src="{{ img_url }}"
  srcset="{{ section.settings.image | image_url: width: 600 }} 600w,
          {{ section.settings.image | image_url: width: 900 }} 900w,
          {{ section.settings.image | image_url: width: 1200 }} 1200w"
  sizes="(max-width: 767px) 100vw, 50vw"
  alt="{{ section.settings.image.alt | escape }}"
  loading="lazy"
  width="{{ section.settings.image.width }}"
  height="{{ section.settings.image.height }}"
>
```

### Section schema template
```liquid
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "namu-section-name",
  "settings": [],
  "blocks": [],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

## Brand Tokens (use in CSS via var())
```
--color-primary: #2B5E2E        /* verde escuro */
--color-primary-light: #4A8C4E  /* verde médio */
--color-accent: #8FBA2E         /* verde claro/amarelado */
--color-text: #1A1A1A
--color-text-muted: #666666
--color-bg: #FFFFFF
--color-bg-warm: #F8F5F0        /* fundo off-white quente */
--font-heading: 'Heading Font', serif
--font-body: 'Body Font', sans-serif
```

## Performance Rules
- Lighthouse target: 90+ mobile, 95+ desktop
- Hero images: WebP, max 200kb, explicit width/height
- No render-blocking JS — use `defer` or `type="module"`
- Critical CSS inline in `<head>`, rest via stylesheet_tag
- Lazy load all images except hero (first LCP image uses `loading="eager"`)

## Mobile-First Rules
- All CSS starts mobile, uses `@media (min-width: 768px)` for desktop
- Touch targets minimum 44x44px
- Carousels must be swipeable on mobile (use Splide.js or native scroll-snap)

## SEO
- Every section heading uses semantic HTML (h1 on hero, h2 on section titles)
- `alt` attributes required on all images
- Schema.org JSON-LD lives in `snippets/schema-org.liquid`
- Canonical URL handled by Dawn's layout — do not override

## What NOT to Change
- DO NOT modify `layout/theme.liquid` header scripts area without reviewing Dawn's script loading
- DO NOT remove Dawn's built-in a11y helpers in `snippets/accessibility.liquid`
- DO NOT change `config/settings_schema.json` structure without testing Theme Editor
- DO NOT commit `.env` or store credentials

## Store Info
- Store: namu-matcha.myshopify.com
- Language: pt-BR only
- Currency: BRL
