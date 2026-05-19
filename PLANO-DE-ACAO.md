# PLANO DE AÇÃO — Namu Matcha Shopify Theme
## Auditoria Completa de Performance, SEO, Conversão e Código

---

## RESUMO EXECUTIVO

O tema está bem estruturado com 25 seções customizadas (`namu-*`), design tokens centralizados e CSS modular. Porém existem gaps críticos em SEO (falta JSON-LD de produto), performance (fontes render-blocking), conversão (sem sticky add-to-cart) e páginas não-brandadas (carrinho, busca, conta do cliente).

---

## 1. ALTA PRIORIDADE (Impacto direto em receita/SEO)

### 1.1 JSON-LD de Produto (SEO Crítico)
- **Arquivo:** `sections/namu-product.liquid`
- **Problema:** Não existe schema de produto (Product) com preço, disponibilidade, reviews e marca. Google não consegue exibir rich snippets nos resultados de busca.
- **Ação:** Adicionar bloco `<script type="application/ld+json">` com schema Product incluindo: name, image, description, brand, offers (price, priceCurrency, availability), aggregateRating.
- **Impacto:** CTR orgânico pode aumentar 20-30% com rich snippets.

### 1.2 Sticky Add-to-Cart Mobile
- **Arquivo:** Novo snippet `snippets/sticky-atc.liquid` + CSS em `assets/namu-product.css`
- **Problema:** Quando o usuário scrolla no mobile, perde o botão COMPRAR. Precisa voltar ao topo para comprar.
- **Ação:** Criar barra fixa no bottom do mobile (aparece ao scrollar past o botão original) com: nome do produto, preço e botão COMPRAR.
- **Impacto:** Aumento estimado de 8-15% na taxa de conversão mobile.

### 1.3 Fontes Render-Blocking (Performance)
- **Arquivo:** `layout/theme.liquid` (linha 20)
- **Problema:** Google Fonts carregado via `<link rel="stylesheet">` bloqueia o primeiro paint. O LCP é penalizado.
- **Ação:** Trocar para pattern `<link rel="preload" as="style" onload="this.rel='stylesheet'">` ou usar `<link rel="preconnect">` + `media="print" onload`.
- **Impacto:** Melhoria de 200-500ms no FCP/LCP.

### 1.4 Preload da Imagem Hero (LCP)
- **Arquivo:** `layout/theme.liquid`
- **Problema:** A imagem do primeiro slide do hero (LCP element) não tem `<link rel="preload">`. O browser só descobre a imagem quando parseia o HTML do body.
- **Ação:** Adicionar `<link rel="preload" as="image" href="..." fetchpriority="high">` no `<head>` para a primeira imagem do hero.
- **Impacto:** Melhoria de 300-800ms no LCP.

### 1.5 Página de Carrinho Não-Brandada
- **Arquivo:** `templates/cart.json` → usa seções Dawn padrão
- **Problema:** Carrinho usa componentes Dawn com texto em inglês ("Featured collection") e visual desalinhado do tema Namu.
- **Ação:** Criar `sections/namu-cart.liquid` com visual consistente, trust badges, upsell e textos em português.
- **Impacto:** Redução de abandono de carrinho, experiência coesa.

---

## 2. MÉDIA PRIORIDADE (UX e Conversão)

### 2.1 Indicador de Estoque
- **Arquivo:** `sections/namu-product.liquid`
- **Problema:** Não mostra quantidade em estoque. Urgência/escassez é um dos maiores drivers de conversão.
- **Ação:** Adicionar badge "Apenas X em estoque" quando `variant.inventory_quantity < 10` e `inventory_policy == 'deny'`.
- **Impacto:** Aumento de urgência → mais conversões.

### 2.2 Upsell no Cart Drawer
- **Arquivo:** `sections/cart-drawer.liquid` (Dawn) ou novo snippet
- **Problema:** Cart drawer não tem sugestão de produtos complementares.
- **Ação:** Adicionar seção "Adicione ao pedido" com 2-3 produtos complementares no drawer.
- **Impacto:** Aumento de ticket médio (AOV).

### 2.3 Footer Dinâmico (Linklist)
- **Arquivo:** `sections/namu-footer.liquid`
- **Problema:** Todos os links de navegação estão hardcoded no HTML. Se URLs mudarem, precisa editar código.
- **Ação:** Migrar para `linklists['footer']` do Shopify + adicionar schema com settings para menus.
- **Impacto:** Manutenibilidade, permite edição pelo admin sem código.

### 2.4 Settings Configuráveis
- **Arquivo:** `sections/namu-product.liquid` (schema)
- **Problema:** Valores hardcoded que deveriam ser settings:
  - Threshold do brinde: `19900` (R$199)
  - Número de parcelas: `6`
  - Texto do brinde
- **Ação:** Adicionar ao schema: `gift_threshold` (number), `installments_count` (number), `gift_text` (text).
- **Impacto:** Flexibilidade para marketing ajustar sem dev.

### 2.5 Página de Busca Brandada
- **Arquivo:** `templates/search.json` → usa `main-search` Dawn
- **Problema:** Página de busca com visual Dawn padrão, desalinhada do tema.
- **Ação:** Criar `sections/namu-search.liquid` com grid de produtos no estilo Namu.
- **Impacto:** Experiência consistente, melhor conversão via busca.

### 2.6 Páginas de Conta do Cliente
- **Arquivos:** `templates/customers/*.json` → todos usam seções Dawn
- **Problema:** Login, registro, conta e pedidos com visual Dawn padrão.
- **Ação:** Criar seções `namu-login.liquid`, `namu-register.liquid`, `namu-account.liquid`.
- **Impacto:** Experiência de marca consistente em todo o funil.

---

## 3. BAIXA PRIORIDADE (Qualidade de Código e Manutenção)

### 3.1 Fix og:image Protocol
- **Arquivo:** `snippets/meta-tags.liquid` (linha 23)
- **Problema:** `og:image` usa `http:` em vez de `https:`.
- **Ação:** Trocar `http:` por `https:` ou usar `| replace: 'http:', 'https:'`.
- **Impacto:** Compatibilidade com redes sociais que exigem HTTPS.

### 3.2 Snippet de Estrelas Reutilizável
- **Arquivo:** Novo `snippets/star-rating.liquid`
- **Problema:** SVG de estrelas repetido inline em `namu-featured-products.liquid` (5x por card) e `namu-product.liquid`.
- **Ação:** Criar snippet `{% render 'star-rating', count: 5, size: 14 %}`.
- **Impacto:** Redução de HTML duplicado, manutenção facilitada.

### 3.3 Auditoria do base.css (Dawn)
- **Arquivo:** `assets/base.css`
- **Problema:** CSS do Dawn ainda é carregado mas muitas classes não são usadas (seções Dawn removidas).
- **Ação:** Identificar e remover estilos não utilizados ou substituir por versão minificada apenas com o necessário.
- **Impacto:** Redução de ~30-50KB de CSS não utilizado.

### 3.4 BreadcrumbList JSON-LD
- **Arquivo:** `sections/namu-product.liquid`
- **Problema:** Breadcrumbs existem visualmente mas sem schema JSON-LD.
- **Ação:** Adicionar `<script type="application/ld+json">` com BreadcrumbList.
- **Impacto:** Rich snippets de navegação no Google.

### 3.5 Tradução de Strings Hardcoded
- **Arquivo:** `sections/namu-header.liquid`
- **Problema:** Strings como "Abrir menu", "Fechar menu" hardcoded em português.
- **Ação:** Migrar para `{{ 'accessibility.menu_open' | t }}` usando `locales/pt-BR.json`.
- **Impacto:** Preparação para internacionalização futura.

### 3.6 Organization Schema (Homepage)
- **Arquivo:** `layout/theme.liquid` ou `snippets/meta-tags.liquid`
- **Problema:** Não existe schema Organization/LocalBusiness.
- **Ação:** Adicionar JSON-LD com name, url, logo, sameAs (redes sociais), contactPoint.
- **Impacto:** Knowledge Panel do Google, credibilidade.

---

## 4. PÁGINAS QUE NÃO ESTÃO EM LIQUID (Precisam Conversão)

| Arquivo | Conteúdo | Ação Necessária |
|---------|----------|-----------------|
| `_content/politica-de-frete.html` | Política de frete | Verificar se conteúdo está atualizado vs. a page Liquid existente |
| `_content/politica-de-trocas.html` | Política de trocas | Verificar se conteúdo está atualizado vs. a page Liquid existente |
| `_content/termos-de-servico.html` | Termos de serviço | Verificar se conteúdo está atualizado vs. a page Liquid existente |
| `_content/politica-de-privacidade.html` | Política de privacidade | Verificar se conteúdo está atualizado vs. a page Liquid existente |
| `pagina-para-seu-negocio.html` | Página B2B | Já existe `page.b2b.json` — verificar se conteúdo migrou completo |
| `assets/jadeleafmatcha_com.html` | Referência (concorrente) | Arquivo de referência — pode ser removido do deploy |
| `_data/artigos-para-copiar.html` | Conteúdo de artigos | Migrar para posts no blog do Shopify admin |

**Nota:** Os templates JSON (`page.politica-de-frete.json`, etc.) já existem, então as páginas Liquid estão criadas. Os HTMLs em `_content/` parecem ser os fontes originais. Confirmar se o conteúdo foi migrado integralmente.

---

## 5. INVENTÁRIO COMPLETO DE TEMPLATES

### Templates Customizados (Brandados Namu) ✅
- `index.json` — Homepage (10 seções namu-*)
- `product.json` — Produto (namu-product + related-products)
- `collection.json` — Coleção (6 seções namu-collection-*)
- `404.json` — Página 404 (namu-404)
- `page.b2b.json` — Página B2B
- `page.sobre.json` — Sobre
- `article.json` — Artigo de blog
- `blog.receitas.json` — Blog de receitas

### Templates Dawn (Precisam ser brandados) ⚠️
- `cart.json` — Carrinho (main-cart-items + main-cart-footer)
- `search.json` — Busca (main-search)
- `customers/account.json` — Conta
- `customers/order.json` — Pedido
- `customers/login.json` — Login
- `customers/register.json` — Registro
- `customers/addresses.json` — Endereços
- `customers/activate_account.json` — Ativação
- `customers/reset_password.json` — Reset senha
- `password.json` — Página de senha da loja
- `list-collections.json` — Lista de coleções

---

## 6. CHECKLIST DE EXECUÇÃO

### Sprint 1 (Crítico — fazer agora)
- [ ] JSON-LD Product schema
- [ ] Fix font loading (preload/non-blocking)
- [ ] Preload hero image
- [ ] Sticky add-to-cart mobile

### Sprint 2 (Conversão — próxima semana)
- [ ] Brandar página de carrinho
- [ ] Indicador de estoque
- [ ] Upsell no cart drawer
- [ ] Footer dinâmico (linklist)
- [ ] Settings configuráveis (threshold brinde, parcelas)

### Sprint 3 (Experiência completa)
- [ ] Brandar página de busca
- [ ] Brandar páginas de conta (login, registro, account)
- [ ] Brandar list-collections
- [ ] Migrar artigos do HTML para blog Shopify

### Sprint 4 (Polimento)
- [ ] Fix og:image https
- [ ] Snippet star-rating
- [ ] Audit base.css
- [ ] BreadcrumbList JSON-LD
- [ ] Organization JSON-LD
- [ ] Tradução de strings (i18n)
- [ ] Remover arquivos de referência do deploy

---

## 7. MÉTRICAS ESPERADAS APÓS IMPLEMENTAÇÃO

| Métrica | Atual (estimado) | Meta |
|---------|-------------------|------|
| LCP (mobile) | ~3.5s | < 2.5s |
| FCP (mobile) | ~2.0s | < 1.5s |
| CLS | ~0.05 | < 0.1 ✅ |
| Taxa de conversão | baseline | +15-25% |
| Ticket médio (AOV) | baseline | +10-15% |
| CTR orgânico | baseline | +20-30% (rich snippets) |
| Bounce rate produto | baseline | -10-15% |

---

*Documento gerado em 18/05/2026*
*Projeto: Namu Matcha — Shopify Theme*
