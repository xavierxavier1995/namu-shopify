# Namu Matcha — Shopify Theme Development

## Project Overview
Shopify theme for **Namu Matcha** (namu-matcha.myshopify.com), a Brazilian matcha ecommerce.
Base theme: **Dawn** (Shopify official). All customizations target the Namu brand.
Inspiration: jadeleafmatcha.com

## ⚠️ CRITICAL WORKFLOW RULES (read before EVERY task)

### Iron Law #1 — Never push for every small change
- **DEFAULT:** assume `shopify theme dev` is running locally — edits reload automatically.
- **ONLY push** when (a) the user explicitly asks "envia pro Shopify" / "faz upload", or (b) finishing a session.
- A single `theme push` takes 30-60s and burns context tokens. Batch all changes, then push ONCE.

### Iron Law #2 — Always use the development theme ID
- **Theme ID:** `149665775694` (Development - 64a428-Gabriel)
- **Live theme (Horizon `149660729422`) is OFF-LIMITS** unless user explicitly says "envia pra produção"
- Push command always:
  ```bash
  shopify theme push --theme 149665775694 --store namu-matcha.myshopify.com
  ```
- Preview URL: `https://namu-matcha.myshopify.com?preview_theme_id=149665775694`

### Iron Law #3 — Before claiming "the change didn't work"
Run this checklist IN ORDER:
1. Did the user hard-refresh? (`Ctrl+Shift+R`) — solves 80% of cases
2. Are they viewing the dev theme URL? (must contain `preview_theme_id=149665775694`)
3. Pull `templates/index.json` from remote into `_check/` and grep for the change — confirms server state
4. ONLY then assume there's a real bug

### Iron Law #4 — Commit before risky changes
- Before deleting sections, refactoring schemas, or touching `layout/theme.liquid`: **commit current state to Git first**
- Use Git Desktop (user has it installed) — branch name pattern: `feature/<change-name>`
- Rollback recipe: `git checkout <commit>` → `shopify theme push --theme 149665775694 ...`

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

---

## Development Workflow

### Active development (preferred — no push needed)
```bash
shopify theme dev --theme 149665775694 --store namu-matcha.myshopify.com
```
Open the printed `https://*.trycloudflare.com` URL — saves to .liquid files reload automatically.

### Push only when finishing a session or sharing
```bash
shopify theme push --theme 149665775694 --store namu-matcha.myshopify.com
```

### Pull (verify remote state or recover from accidental local delete)
```bash
shopify theme pull --theme 149665775694 --store namu-matcha.myshopify.com
```

### Rollback via Git Desktop
1. Open Git Desktop → revert commit OR checkout previous commit
2. Run `shopify theme push --theme 149665775694 ...` to sync remote

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

### Homepage Sections (build order)
1. `sections/announcement-bar.liquid` — rotating promo text strip
2. `sections/header.liquid` — nav + logo (already in Dawn, customize)
3. `sections/hero-slider.liquid` — full-width hero with slider
4. `sections/marquee-strip.liquid` — animated rotating text band
5. `sections/featured-products.liquid` — best sellers carousel
6. `sections/categories-grid.liquid` — Matchas Puros / Blends / Utensílios / Kits
7. `sections/video-banner.liquid` — video background with text overlay
8. `sections/benefits-strip.liquid` — icon + text benefits row
9. `sections/blog-posts.liquid` — editorial blog grid
10. `sections/recipes-grid.liquid` — recipe cards carousel
11. `sections/food-service-banner.liquid` — B2B/food service CTA
12. `sections/footer.liquid` — links + newsletter + social (already in Dawn, customize)

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
