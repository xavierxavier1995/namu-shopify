# Guia de Tamanhos — Banners Hero Slider (Namu Matcha)

---

## Anatomia da tela (o que o usuário vê)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌───────────────────────────────────────────┐     │
│   │  HEADER PILL (88px desktop / 72px mobile) │     │  ← Flutua SOBRE o banner
│   └───────────────────────────────────────────┘     │     (fundo branco, position absolute)
│                                                     │
│                                                     │
│              B A N N E R   H E R O                  │  ← Imagem ocupa 100vh
│           (100vh - 56px desktop)                    │
│           (100vh - 48px mobile)                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Faixa Rotativa / Marquee (~48px)                   │  ← Fica ABAIXO do banner, não sobrepõe
└─────────────────────────────────────────────────────┘
```

---

## Por que a imagem é cortada

O CSS usa `object-fit: cover` — a imagem é ampliada até preencher 100% do container, e o excesso é cortado (centralizado). Se a proporção da imagem não bate com a proporção do container, há crop lateral ou vertical.

---

## Dimensões recomendadas

| Versão | Tamanho (px) | Proporção | Peso máximo |
|--------|-------------|-----------|-------------|
| **Desktop** | 2560 x 1440 | 16:9 | 400kb (JPG/WebP) |
| **Mobile** | 1080 x 1920 | 9:16 | 250kb (JPG/WebP) |

---

## DESKTOP — Zonas de respiro, segurança e posicionamento de texto

```
2560 px (largura)
┌──────────────────────────────────────────────────────────────┐  0%
│                                                              │
│  ┌─ ZONA MORTA TOPO ─────────────────────────────────────┐  │
│  │  Header pill flutuante cobre aqui (88px + respiro)     │  │  0% a 8%
│  └────────────────────────────────────────────────────────┘  │
│                                                              │  8%
│                                                              │
│         ╔══════════════════════════════════════╗              │  22%
│         ║                                      ║              │
│         ║  ZONA IDEAL PARA TEXTO (DESKTOP)     ║              │
│         ║  Vertical: 22% a 65% da altura       ║              │  ← TEXTO AQUI
│         ║  Horizontal: 15% a 85% da largura    ║              │
│         ║                                      ║              │
│         ╚══════════════════════════════════════╝              │  65%
│                                                              │
│  ┌─ ZONA MORTA INFERIOR ─────────────────────────────────┐   │
│  │  Setas de navegação + respiro                          │   │  94% a 100%
│  └────────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘  100%
                                                    1440 px (altura)

├── 15% ──├──────────── 70% (zona segura) ────────────├── 15% ──┤
   384px                   1792px                        384px
```

### Posicionamento de texto — Desktop

| Eixo | Início | Fim | Em pixels (2560x1440) |
|------|--------|-----|----------------------|
| **Vertical** | 22% | 65% | 317px a 936px (do topo) |
| **Horizontal** | 15% | 85% | 384px a 2176px (da esquerda) |

### Por que esses percentuais

- **Começa em 22% vertical:** o header pill (88px = ~6% da altura) flutua sobre o banner. Somando respiro visual entre a pill e o texto, 22% é o ponto seguro onde o conteúdo fica totalmente livre do header
- **Termina em 65% vertical:** deixa o terço inferior livre para produto/imagem de apoio e evita conflito com setas de navegação
- **15% lateral:** protege contra crop em ultrawide (3440px) e mantém texto longe das bordas da tela

### Alinhamento recomendado (Desktop)

- Texto à esquerda: iniciar em **15% horizontal** (384px da borda esquerda)
- Texto centralizado: centrar entre **15% e 85%**
- Nunca alinhar à direita colado na borda — mínimo 15% de respiro

---

## MOBILE — Zonas de respiro, segurança e posicionamento de texto

```
1080 px (largura)
┌────────────────────────────────────┐  0%
│                                    │
│  ┌─ ZONA MORTA TOPO ───────────┐  │
│  │  Header pill flutuante       │  │  0% a 5%
│  │  (72px = ~4% + respiro)      │  │
│  └──────────────────────────────┘  │
│                                    │  5%
│                                    │
│     ╔════════════════════════╗      │  18%
│     ║                        ║      │
│     ║  ZONA IDEAL P/ TEXTO   ║      │
│     ║  Vertical: 18% a 55%   ║      │  ← TEXTO AQUI
│     ║  Horizontal: 8% a 92%  ║      │
│     ║                        ║      │
│     ╚════════════════════════╝      │  55%
│                                    │
│     ┌──────────────────────┐       │
│     │  Área para produto/  │       │  55% a 90%
│     │  imagem de apoio     │       │  ← Produto, ilustração
│     └──────────────────────┘       │
│                                    │
│  ┌─ ZONA MORTA INFERIOR ───────┐   │
│  │  Setas + área do polegar    │   │  94% a 100%
│  └──────────────────────────────┘  │
│                                    │
└────────────────────────────────────┘  100%
                          1920 px (altura)

├─ 8% ─├────────── 84% (zona segura) ──────────├─ 8% ─┤
  86px                  908px                     86px
```

### Posicionamento de texto — Mobile

| Eixo | Início | Fim | Em pixels (1080x1920) |
|------|--------|-----|----------------------|
| **Vertical** | 18% | 55% | 346px a 1056px (do topo) |
| **Horizontal** | 8% | 92% | 86px a 994px (da esquerda) |

### Por que esses percentuais

- **Começa em 18% vertical:** o header pill mobile (72px = ~4% da altura). Somando respiro visual generoso, 18% garante que o texto não compete visualmente com a pill
- **Termina em 55% vertical:** no mobile, quase metade inferior é reservada para imagem de produto ou elemento visual de apoio. Texto abaixo de 55% fica muito baixo e o usuário precisa "procurar"
- **8% lateral:** telas mobile são estreitas (390px reais). 8% = ~31px de respiro real, suficiente para não colar na borda mas sem desperdiçar espaço precioso

### Alinhamento recomendado (Mobile)

- Texto **sempre centralizado** (melhor legibilidade em tela estreita)
- Máximo 3 linhas de título
- Fonte mínima equivalente a 24px no device (para legibilidade sem zoom)

---

## Resumo visual — Onde colocar cada elemento

### Desktop (2560 x 1440)

```
┌──────────────────────────────────────┐
│  ░░░ HEADER PILL FLUTUA AQUI ░░░░░  │  0-8%
│                                      │
│                                      │
│     TÍTULO PRINCIPAL                 │  22-32%
│     Subtítulo ou descrição           │  32-42%
│     [ BOTÃO CTA ]                    │  45-55%
│                                      │
│                                      │
│              produto/visual           │  65-90%
│                                      │
│  ░░░░░░░░ SETAS ░░░░░░░░░░░░░░░░░░  │  94-100%
└──────────────────────────────────────┘
```

### Mobile (1080 x 1920)

```
┌──────────────────────┐
│ ░░░ HEADER PILL ░░░  │  0-5%
│                      │
│                      │
│   TÍTULO PRINCIPAL   │  18-28%
│   Subtítulo curto    │  28-38%
│   [ BOTÃO CTA ]     │  40-50%
│                      │
│                      │
│                      │
│    produto/visual    │  55-90%
│                      │
│                      │
│ ░░░░░░░░░░░░░░░░░░  │  94-100%
└──────────────────────┘
```

---

## Checklist para o designer

- [ ] Desktop: 2560 x 1440px — texto entre 22% e 65% vertical, 15% e 85% horizontal
- [ ] Mobile: 1080 x 1920px — texto entre 18% e 55% vertical, 8% e 92% horizontal
- [ ] Título principal nunca acima de 22% (desktop) ou 18% (mobile) — header pill cobre
- [ ] Título principal nunca abaixo de 65% (desktop) ou 55% (mobile) — perde hierarquia
- [ ] Respiro lateral mínimo: 15% cada lado (desktop), 8% cada lado (mobile)
- [ ] Formato: JPG ou WebP, qualidade 80-85%, máximo 400kb desktop / 250kb mobile
- [ ] Testar em viewport 1920x1080, 2560x1440, 3440x1440 (ultrawide) e 390x844 (iPhone 14)
- [ ] Fundo pode sangrar para zonas mortas — só texto/logo/CTA que não pode
- [ ] Mobile: texto sempre centralizado, máximo 3 linhas de título

---

## Relação com a faixa rotativa (marquee)

A faixa rotativa fica **abaixo** do hero, não sobrepõe. Ela tem altura fixa de ~48px e cor sólida (#045133). Não afeta o tamanho da imagem do banner. O hero termina, a faixa começa — são elementos separados no fluxo da página.
