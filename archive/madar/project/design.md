# MADAR — مدار
### A Complete, Adaptable Design System Reference
**Version 1.0 · July 2026 · Bilingual (Arabic RTL + English LTR) · Multi-theme · Motion-rich**

> **How to use this file:** This is the single source of truth for any platform built on Madar (marketplace, SaaS dashboard, e-commerce, school platform, admin panel…). Any AI agent or developer should be able to build a screen from this file alone. Every value is exact and copy-pasteable. When a project defines its own brand, override only §2 (Theme Packs) — everything else stays.
>
> **Spirit:** Apple's restraint and physics · Notion's calm utility · Vercel's precision. Never decoration for its own sake.

---

## 0. Design Philosophy — how we think

1. **Calm first.** Interfaces should lower the user's heart rate. Generous whitespace, tinted (never pure-white-on-white) canvases, one focal action per view.
2. **Ink actions, colored accents.** Primary actions are near-black "ink" pills (light mode) / near-white pills (dark mode). The accent color is for *meaning* — progress, selection, highlights, links — not for every button. This is the #1 defense against AI-slop.
3. **Depth is earned.** Shadows and glass communicate elevation and focus, never decoration. A resting card is almost flat; it lifts when it becomes interactive or focused.
4. **Motion is physics, not fireworks.** Everything moves like it has mass: fast-out, gentle-settle. Motion explains *where things came from and where they went*.
5. **Bilingual from birth.** Every layout must survive `dir="rtl"` with zero special-casing: use logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`) and flex/grid with `gap`.
6. **One thousand no's.** No filler stats, no decorative icons, no gradient walls, no emoji-as-icons. If a section feels empty, fix the composition, don't invent content.

### 0.1 Color psychology (why these palettes)
- **Mint / teal** → calm, health, clarity. Best for: productivity, wellness, education.
- **Coral / warm orange** → energy, appetite, friendliness. Best for: commerce, food, community.
- **Sky blue** → trust, competence, stability. Best for: fintech, B2B SaaS, government services.
- **Iris / soft violet** → imagination, premium, creativity. Best for: creator tools, AI products.
- **Indigo night (dark)** → focus, depth, sophistication — *navy, never pitch-black*. Dark mode backgrounds sit at L≈0.28 in oklch: dark enough to rest the eyes, light enough that shadows and layers still read.

---

## 1. Token Architecture

Three layers. Components reference **semantic** tokens only — never raw values.

```
primitive  →  semantic        →  component
oklch(...)    --color-accent     button background
```

CSS custom properties, scoped by theme attribute:

```css
[data-theme="mint"]  { --bg: …; --surface: …; --accent: …; }
[data-theme="night"] { … }
```

### 1.1 Semantic color tokens (the full contract)

| Token | Role |
|---|---|
| `--bg` | Page canvas (always subtly tinted, never `#fff`/`#000`) |
| `--bg-deep` | Recessed areas: sidebars, wells, code blocks |
| `--surface` | Cards, sheets, popovers |
| `--surface-2` | Nested surface on a surface (input on card) |
| `--text` | Primary text |
| `--text-2` | Secondary text (labels, captions) |
| `--text-3` | Tertiary (placeholders, disabled) |
| `--border` | Hairlines, dividers (1px) |
| `--border-strong` | Input borders, focused hairlines |
| `--accent` | Brand meaning: selection, progress, links, active states |
| `--accent-soft` | 10–14% tint of accent for chips/hover fills |
| `--on-accent` | Text on accent fills |
| `--ink` | Primary action fill (near-black in light, near-white in dark) |
| `--on-ink` | Text on ink |
| `--success` `--warning` `--danger` `--info` | Status (fixed across themes, see §2.6) |
| `--glass` | Translucent surface color for blur layers |
| `--shadow-color` | Base color for all shadows (tinted, never pure black) |

---

## 2. Theme Packs

Five ready themes. Light themes share structure and differ only in hue; dark is **Indigo Night**. All values are `oklch` — accents share the same lightness/chroma family so swapping themes never breaks contrast.

### 2.1 Mint Calm (light — default)
```css
[data-theme="mint"] {
  --bg: oklch(0.973 0.010 180);
  --bg-deep: oklch(0.948 0.014 180);
  --surface: oklch(0.998 0.002 180);
  --surface-2: oklch(0.962 0.010 180);
  --text: oklch(0.26 0.030 215);
  --text-2: oklch(0.47 0.022 215);
  --text-3: oklch(0.64 0.015 215);
  --border: oklch(0.905 0.012 190);
  --border-strong: oklch(0.82 0.018 190);
  --accent: oklch(0.72 0.130 172);
  --accent-soft: oklch(0.72 0.130 172 / 0.13);
  --on-accent: oklch(0.20 0.04 200);
  --ink: oklch(0.27 0.030 215);
  --on-ink: oklch(0.97 0.008 180);
  --glass: oklch(0.99 0.004 180 / 0.62);
  --shadow-color: oklch(0.45 0.05 200);
}
```

### 2.2 Coral Warm (light)
```css
[data-theme="coral"] {
  --bg: oklch(0.972 0.011 70);
  --bg-deep: oklch(0.947 0.015 70);
  --surface: oklch(0.998 0.002 70);
  --surface-2: oklch(0.961 0.011 70);
  --text: oklch(0.27 0.028 45);
  --text-2: oklch(0.48 0.022 45);
  --text-3: oklch(0.65 0.015 45);
  --border: oklch(0.905 0.014 65);
  --border-strong: oklch(0.82 0.020 65);
  --accent: oklch(0.70 0.150 38);
  --accent-soft: oklch(0.70 0.150 38 / 0.13);
  --on-accent: oklch(0.99 0.005 70);
  --ink: oklch(0.28 0.028 45);
  --on-ink: oklch(0.97 0.009 70);
  --glass: oklch(0.99 0.004 70 / 0.62);
  --shadow-color: oklch(0.45 0.05 50);
}
```

### 2.3 Sky Cool (light)
```css
[data-theme="sky"] {
  --bg: oklch(0.972 0.010 235);
  --bg-deep: oklch(0.947 0.014 235);
  --surface: oklch(0.998 0.002 235);
  --surface-2: oklch(0.961 0.010 235);
  --text: oklch(0.26 0.032 250);
  --text-2: oklch(0.47 0.024 250);
  --text-3: oklch(0.64 0.016 250);
  --border: oklch(0.902 0.014 235);
  --border-strong: oklch(0.82 0.020 235);
  --accent: oklch(0.66 0.150 245);
  --accent-soft: oklch(0.66 0.150 245 / 0.13);
  --on-accent: oklch(0.99 0.005 235);
  --ink: oklch(0.27 0.032 250);
  --on-ink: oklch(0.97 0.008 235);
  --glass: oklch(0.99 0.004 235 / 0.62);
  --shadow-color: oklch(0.42 0.05 250);
}
```

### 2.4 Iris Soft (light)
```css
[data-theme="iris"] {
  --bg: oklch(0.971 0.012 300);
  --bg-deep: oklch(0.946 0.016 300);
  --surface: oklch(0.998 0.002 300);
  --surface-2: oklch(0.960 0.012 300);
  --text: oklch(0.27 0.030 295);
  --text-2: oklch(0.48 0.024 295);
  --text-3: oklch(0.65 0.016 295);
  --border: oklch(0.903 0.015 300);
  --border-strong: oklch(0.82 0.022 300);
  --accent: oklch(0.62 0.150 293);
  --accent-soft: oklch(0.62 0.150 293 / 0.13);
  --on-accent: oklch(0.99 0.005 300);
  --ink: oklch(0.28 0.030 295);
  --on-ink: oklch(0.97 0.009 300);
  --glass: oklch(0.99 0.004 300 / 0.62);
  --shadow-color: oklch(0.42 0.06 295);
}
```

### 2.5 Indigo Night (dark — navy, not black)
```css
[data-theme="night"] {
  --bg: oklch(0.285 0.048 274);
  --bg-deep: oklch(0.245 0.045 274);
  --surface: oklch(0.335 0.048 274);
  --surface-2: oklch(0.385 0.045 274);
  --text: oklch(0.955 0.010 270);
  --text-2: oklch(0.780 0.022 270);
  --text-3: oklch(0.620 0.028 270);
  --border: oklch(0.415 0.045 274);
  --border-strong: oklch(0.50 0.045 274);
  --accent: oklch(0.82 0.125 172);            /* mint pops on indigo */
  --accent-soft: oklch(0.82 0.125 172 / 0.16);
  --on-accent: oklch(0.22 0.05 274);
  --ink: oklch(0.955 0.010 270);              /* ink inverts */
  --on-ink: oklch(0.25 0.045 274);
  --glass: oklch(0.34 0.05 274 / 0.55);
  --shadow-color: oklch(0.12 0.05 274);
}
```

### 2.6 Status colors (fixed, all themes)
```css
--success: oklch(0.68 0.145 158);
--warning: oklch(0.78 0.140 80);
--danger:  oklch(0.62 0.185 27);
--info:    oklch(0.68 0.130 245);
/* each has a -soft: same oklch at / 0.14 alpha */
```
In Night theme raise lightness by +0.08 for legibility on indigo.

### 2.7 Rules
- **Never** ship a page on `#ffffff` or `#000000`. The canvas is always tinted.
- Accent chroma ≤ 0.15 in light themes. Saturated walls of color are forbidden.
- Gradients: allowed ONLY as (a) a ≤8% two-hue tint on hero canvas, or (b) inside a single accent element (e.g. progress ring). Never on body text, never full-page purple washes.
- Contrast: text ≥ 4.5:1, large display text ≥ 3:1, always verify on `--surface` *and* `--bg`.

### 2.8 Light/Dark parity (non-negotiable)
- **Hierarchy parity:** whatever is loudest in light must be loudest in Night. If a CTA pops in Mint, it pops in Indigo Night too — never let a mode quietly flatten the hierarchy.
- **Brand fidelity across modes:** a project's brand hue stays recognizable in Night — raise lightness to stay legible, never desaturate it toward gray.
- **See both before shipping.** Never approve a screen reviewed in only one theme; toggle both in `Showcase.dc.html` first.
- Default to `prefers-color-scheme` (mint ↔ night) unless the brand explicitly insists on one mode.

---

## 3. Typography

### 3.1 Families
| Role | Latin | Arabic | Fallback |
|---|---|---|---|
| Display + UI | **Instrument Sans** | **IBM Plex Sans Arabic** | system-ui, -apple-system |
| Numeric / code | **JetBrains Mono** | (same) | ui-monospace |

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
```css
font-family: 'Instrument Sans','IBM Plex Sans Arabic',system-ui,sans-serif;
```
One stack everywhere — the browser picks the Arabic face for Arabic glyphs automatically. Do not use Inter, Roboto, Arial, or Cairo.

### 3.2 Scale (rem = 16px)
| Token | Size / line | Weight | Tracking | Use |
|---|---|---|---|---|
| `display` | 60 / 64 | 600 | -0.03em | Hero headline (56/60 in AR) |
| `h1` | 40 / 46 | 600 | -0.02em | Page title |
| `h2` | 30 / 38 | 600 | -0.015em | Section title |
| `h3` | 22 / 30 | 600 | -0.01em | Card title |
| `h4` | 17 / 24 | 600 | 0 | Widget title |
| `body-lg` | 18 / 28 | 400 | 0 | Hero subcopy |
| `body` | 15.5 / 24 | 400 | 0 | Default |
| `sm` | 13.5 / 20 | 500 | 0 | Labels, meta |
| `xs` | 12 / 16 | 500 | +0.01em | Badges, overlines |
| `overline` | 12 / 16 | 600 | +0.10em, uppercase | Eyebrow above headings (Latin only — never uppercase Arabic) |

- Arabic: same sizes, but line-height +10% (Arabic ascenders/descenders need air), and **negative tracking is forbidden** — set `letter-spacing: 0` when `dir=rtl`.
- Numerals in data tables/prices: `font-feature-settings: "tnum"` or JetBrains Mono.
- Max text measure: 65ch body, 22ch display.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

---

## 4. Space, Size, Shape

### 4.1 Spacing — 4px base
`4 8 12 16 20 24 32 40 48 64 80 120`
- Card padding: 20–24. Section vertical rhythm: 80–120 (landing), 32–40 (app).
- Always flex/grid + `gap`; never margin-chains between siblings.

### 4.2 Radius
| Token | px | Use |
|---|---|---|
| `r-xs` | 8 | Badges, small chips |
| `r-sm` | 12 | Inputs, buttons (rect), thumbnails |
| `r-md` | 16 | Cards, popovers |
| `r-lg` | 22 | Large cards, modals, sheets |
| `r-xl` | 30 | Hero shells, page frames, dock |
| `r-full` | 999 | Pills, avatars, segmented controls |
**Nesting rule:** inner-radius = outer-radius − padding (a 16px-padded 22px card holds 8-ish inner elements). Never a sharp element inside a round one.

### 4.3 Elevation (shadows — always tinted with `--shadow-color`, never pure black)
```css
--shadow-1: 0 1px 2px oklch(from var(--shadow-color) l c h / 0.06);                       /* resting card */
--shadow-2: 0 2px 6px oklch(from var(--shadow-color) l c h / 0.07), 0 8px 24px oklch(from var(--shadow-color) l c h / 0.07);   /* hover/raised */
--shadow-3: 0 4px 12px oklch(from var(--shadow-color) l c h / 0.10), 0 20px 48px oklch(from var(--shadow-color) l c h / 0.14); /* popover/dock */
--shadow-4: 0 8px 24px oklch(from var(--shadow-color) l c h / 0.14), 0 32px 80px oklch(from var(--shadow-color) l c h / 0.22); /* modal */
```
(If `oklch(from …)` relative syntax is unavailable, precompute the four rgba values per theme.)
Elevation ladder: canvas 0 → card 1 → hover 2 → floating (dock/popover) 3 → modal 4. Skipping levels is a bug.

### 4.4 Hairlines
1px `--border` everywhere; use `--border-strong` only on interactive boundaries (inputs). In Night theme prefer borders over shadows to separate layers.

---

## 5. Glass System (Liquid Glass — three intensity levels)

Pick ONE level per project and stay with it.

| Level | Recipe | Where |
|---|---|---|
| **G1 Whisper** (Vercel/Notion) | `background: var(--glass); backdrop-filter: blur(10px) saturate(140%);` + 1px `--border` | Sticky navbar only |
| **G2 Balanced** (default) | `blur(20px) saturate(160%)` + top inner highlight `inset 0 1px 0 oklch(1 0 0/0.25)` | Navbar, dock, popovers |
| **G3 Apple Liquid** | `blur(36px) saturate(180%)` + inner highlight + `--shadow-3` + specular top edge (1px white/35% inset) | Navbar, dock, sheets, modals, floating players |

Rules: glass needs *content behind it* to mean anything — never glass on flat canvas. Text on glass must still hit 4.5:1 (add `background: var(--glass)` opacity up, or a text-shadow 0 1px 2px at 8%). Provide a no-blur fallback: solid `--surface` at 92% opacity.

---

## 6. Motion System (level: rich)

### 6.1 Durations & easings
```css
--dur-1: 140ms;  /* micro: hover tint, icon nudge */
--dur-2: 220ms;  /* small: buttons, toggles, chips */
--dur-3: 340ms;  /* medium: cards, popovers, tabs underline */
--dur-4: 560ms;  /* large: modal, sheet, page sections */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);       /* default: fast out, gentle settle */
--ease-spring: cubic-bezier(0.34, 1.45, 0.64, 1); /* playful overshoot: dock, toggles, pins */
--ease-in: cubic-bezier(0.55, 0, 1, 0.45);        /* exits only */
```

### 6.2 The interaction contract (every interactive element)
- **Hover:** background tint (`--accent-soft` or surface-2) + `translateY(-1px)`; cards `-3px` + shadow 1→2. `--dur-2 --ease-out`.
- **Press:** `scale(0.97)` at `--dur-1`. Buttons feel pushable.
- **Focus-visible:** 2px ring `--accent` offset 2px (`box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`), never `outline: none` alone.
- **Disabled:** opacity 0.45, no motion.

### 6.3 Choreography catalog
| Pattern | Recipe |
|---|---|
| Modal in | overlay fade 0→1 `--dur-3`; panel `opacity 0→1, scale 0.96→1, translateY 12→0` `--dur-4 --ease-out` |
| Sheet in (bottom) | `translateY(100%)→0` `--dur-4 --ease-out`; grabber handle on top |
| Toast | slide from top `translateY(-16px)+fade` in `--dur-3 --ease-spring`, auto-dismiss 4s, exit `--ease-in` |
| Dock magnify | icon `scale 1→1.28` + `translateY(-6px)` `--dur-2 --ease-spring`; neighbors scale 1.1 |
| Tab underline | shared underline slides via `transform` `--dur-3 --ease-out` (never fade-swap) |
| List entrance | stagger children 40ms apart, each `opacity+translateY(10px)` `--dur-3` — max 8 items, once per mount |
| Skeleton | shimmer: 1.6s linear infinite gradient sweep at 6% white |
| Progress ring | animate `stroke-dashoffset` `--dur-4`; count numbers with tabular figures |
| Hover-tilt (feature cards) | ≤3° rotateX/rotateY toward cursor, perspective 800px — hero features only, never in lists |
| Page section reveal | IntersectionObserver: `opacity+translateY(24px)` `--dur-4`, threshold 0.2, once |

### 6.4 Rules
- Animate ONLY `transform`, `opacity`, `filter`, `box-shadow`. Never layout properties (width/height/top/left) except explicit accordions (use `grid-template-rows: 0fr→1fr`).
- Entrances stagger; exits are instant-ish (60% of entrance duration).
- Respect `prefers-reduced-motion: reduce` → durations 1ms, no translate, keep opacity fades.
- Nothing loops forever except skeletons and a hero's *single* ambient float (≤6px amplitude, ≥6s period).

---

## 7. Iconography

- **Style:** stroke icons, 1.5px stroke, round caps/joins, 24×24 grid (20×20 in dense UI). One style per project — never mix filled and stroke.
- **Source:** Lucide (or Phosphor). Never emoji as icons. Never hand-drawn complex SVG paths.
- **Icon-in-a-tile:** app-style launcher tiles = 44×44, `r-sm` 12, `--accent-soft` fill, icon at `--accent`. Used in service cards, dock, feature grids.
- Icon + label spacing: 8px. Icon-only buttons require `aria-label` + tooltip.
- **RTL:** mirror directional icons only (arrows, chevrons, send, undo). Never mirror: clock, search, checkmarks, media (play stays LTR), logos.

---

## 8. Components

Everything below references semantic tokens; all states from §6.2 apply.

### 8.1 Buttons
| Variant | Recipe | Use |
|---|---|---|
| **Primary (ink pill)** | fill `--ink`, text `--on-ink`, `r-full`, height 44 (40 compact), padding-inline 22, weight 600 | THE action of a view (≤1 per view) |
| **Accent** | fill `--accent`, text `--on-accent` | in-flow confirmations where ink is taken |
| **Secondary** | `--surface`, 1px `--border-strong`, text `--text` | everything else |
| **Ghost** | transparent → hover `--accent-soft` | toolbars, nav |
| **Soft** | `--accent-soft` fill, `--accent` text | chips-as-actions, filters |
| **Destructive** | `--danger` fill only in confirm dialogs; elsewhere ghost with `--danger` text | delete |
| **Gradient (rare)** | linear 135°, two hues ±20° around accent, ONLY on hero CTA, with hover sheen sweep | one per landing page |
Sizes: sm 32 / md 40 / lg 44 / xl 52 (hero). Icon-only: square of same height, `r-sm` or full.
Loading state: label fades to 0.5, 16px spinner replaces icon slot, width locked (no jump).

### 8.2 Inputs & forms
- Field: height 44, `r-sm` 12, `--surface-2` fill, 1px `--border-strong`; focus → border `--accent` + ring (§6.2); label above at `sm` 500 `--text-2`; helper/error 12px below.
- Error: border `--danger` + message with icon; never color-only.
- Search: pill `r-full`, leading search icon, `⌘K` kbd hint trailing.
- Select: custom popover listbox (surface, `--shadow-3`, `r-md`), check trailing selected item.
- Switch: 44×26 track `r-full` (`--border-strong` off / `--accent` on), 22px thumb + `--shadow-1`, `--ease-spring`.
- Checkbox 20×20 `r-xs`; radio 20 round; check draws in with 120ms stroke.
- Segmented control: `--surface-2` container `r-full` padding 4; active segment = `--surface` pill + `--shadow-1`, slides with `--ease-spring`. (This is the Apple-style view switcher — prefer it over tabs for 2–4 options.)
- Form layout: single column, max 560px; group with 24 gap; section dividers hairline + `h4`.

### 8.3 Cards (the family)
Base: `--surface`, `r-md`→`r-lg`, padding 20–24, `--shadow-1`, 1px `--border`. Hover (if clickable): lift −3px, shadow-2, border-strong.

| Card | Anatomy |
|---|---|
| **Service card** | icon tile 44 (§7) → title `h4` → 2-line description `--text-2` → footer row: price/meta + chevron (chevron nudges 4px on hover, mirrored in RTL) |
| **Feature card (landing)** | oversized icon tile 56, headline `h3`, copy, optional inline visual placeholder; hover-tilt allowed here |
| **Pinned note (hero visual)** | slightly rotated (−2°…+2°) surface card, `--shadow-2`, top-center "pin" dot accent; float ambient allowed |
| **Stat card (admin)** | overline label → 32px tabular number → delta chip (`--success-soft`/`--danger-soft`) + tiny sparkline; NEVER more than 4 in a row |
| **Pricing card** | plan overline, price display + `/mo` at `--text-3`, hairline, 4–6 check rows, full-width button; highlighted plan = `--ink` inverted card, "Popular" pill on border |
| **List/row card** | 64px row: avatar/tile, title+meta stack, trailing action; divider hairlines, not gaps |
| **Glass card** | glass recipe (§5) over imagery/gradient tint only |
| **Empty-state card** | dashed 1.5px `--border-strong` border, centered icon tile, one sentence, one secondary button. Never a sad-face illustration |

### 8.4 Navigation
**Top navbar (marketing):** floating glass bar, `r-full` or `r-lg`, max-width 1120 centered, 64 high, inset-top 16. Logo start / links center (ghost buttons) / auth end (secondary + primary sm). Active link = `--accent-soft` pill.
**App topbar:** 56 high, hairline bottom, breadcrumb start, search-pill center (⌘K), avatar+bell end.
**Sidebar (admin):** 264 wide, `--bg-deep`, groups with overline labels, item = 36 high `r-sm` ghost row (icon 20 + label), active = `--surface` fill + `--shadow-1` + 3px accent bar on the **inline-start** edge; collapse to 72px icon rail (tooltips appear).
**Dock (floating bottom):** glass G2/G3 pill, `r-xl`, 8px padding, icon tiles 44, magnify on hover (§6.3), active app = 4px accent dot underneath, `--shadow-3`, bottom inset 20. Use as mobile tab bar (no magnify, 5 items max) or as a desktop quick-launcher.
**Tabs (content):** underline style — labels `sm` 600, inactive `--text-2`, sliding 2px accent underline. For view-modes use segmented control instead.
**Breadcrumbs:** `sm` `--text-2`, chevron separators (mirrored RTL), last item `--text` 600.
**Pagination:** number pills 36, active = ink pill; prev/next icon-only secondary.

### 8.5 Overlays
**Modal:** max-w 480 (forms 560), `r-lg` 22, `--surface`, `--shadow-4`, padding 28; overlay `oklch(0.2 0.03 260 / 0.4)` + blur 8px; title `h3` + close icon-button top-end; footer row end-aligned: ghost cancel + primary. Motion §6.3. Focus trap, Esc closes, initial focus on primary.
**Sheet (mobile / quick tasks):** bottom, `r-lg` top corners only, grabber 36×4 `--border-strong` centered top; drag or scrim-tap to dismiss. Side-sheet (desktop details): 420 wide from inline-end.
**Popover:** `r-md`, `--shadow-3`, padding 8, min-w 220; menu item = 36 ghost row; destructive items `--danger` grouped last after hairline.
**Toast:** top-center pill/G2-glass, icon + one-line message + optional action, `--shadow-3`; max 1 visible; 4s.
**Command palette (⌘K):** modal-like at 15vh top, 560 wide; search row 52 + results list (icon, label, kbd shortcut end); selected row `--accent-soft`. THE power-user pattern — include in every app shell.
**Tooltip:** `--ink` fill, `--on-ink` 12px, `r-xs`, delay 400ms, fade+2px rise.

### 8.6 Data display (admin)
**Table:** header row `xs` overline `--text-2` on `--bg-deep`, sticky; rows 52, hairline dividers, hover `--surface-2`; numeric columns end-aligned tabular; row actions appear on hover (icon-buttons); selection checkbox column start; bulk-action bar slides up from bottom as ink pill bar when >0 selected.
**Badges/status:** pill `r-full` `xs` 600, `-soft` fill + strong text of status hue, leading 6px dot. Wording: Active/Pending/Failed — never colors alone.
**Avatar:** round, sizes 24/32/40/64; fallback = initials on `--accent-soft`; stack overlaps −8px with 2px `--bg` ring, "+4" chip.
**Progress:** bar 8px `r-full` track `--surface-2` fill `--accent`; ring for scores (stroke 6, animated §6.3).
**KPI header (dashboard):** 4 stat cards max in a row, then one wide chart card. Charts: single accent hue + its 40%/20% tints, hairline gridlines only, no 3D, no rainbow.
**Skeletons:** shape-true placeholders (`r-sm` blocks), shimmer §6.3 — never spinners for content areas.

### 8.7 Landing / marketing patterns
**Hero (the Madar signature):** page sits inside a `r-xl` 30 framed canvas (16px inset from viewport) on `--bg`; inside: floating glass navbar → centered stack: announcement pill ("New" ink mini-pill + one line, `r-full`, `--surface`, hairline) → display headline (≤2 lines, may embed ONE small inline visual chip) → `body-lg` subcopy ≤2 lines `--text-2` → single ink CTA (+ ghost secondary) → below: 3 pinned-note cards or product screenshot in `r-lg` frame with `--shadow-3`.
**Logo strip:** `--text-3` monochrome logos, "Trusted by" overline; marquee allowed at ≥40s/loop.
**Feature grid:** 3-col (2 on tablet, 1 mobile), feature cards §8.3; alternate one 2-col-span "bento" card per row for rhythm.
**Bento section:** mixed-span grid (2×2 base), each cell a feature card with a small live visual; max 5 cells.
**Testimonial:** single large quote card (no carousels of 9 clones): quote `h3` weight 500, avatar+name+role row; optional 2-up.
**CTA section:** ink-inverted `r-xl` card (dark canvas in light theme), display-sized line, one accent button.
**Footer:** `--bg-deep`, 4 link columns `sm`, hairline top, bottom row: logo, locale switcher, social icon-buttons.

### 8.8 App shell recipes
**Admin:** sidebar (§8.4) + topbar + content on `--bg` padding 32; page header = h1 + primary action end; content grid 12-col gap 24.
**Auth screens:** centered 400px card on `--bg` with subtle radial accent tint top; logo, h2, form, primary full-width, hairline "or", SSO secondary buttons.
**Settings:** left anchor-nav (ghost items) + single 640px column of hairline-divided groups; every group = h4 + description + control end-aligned.
**Detail page:** breadcrumb → header card (avatar/tile + h1 + status badge + actions end) → tabs → 2-col: main column + 320 side column of meta cards.

---

## 9. RTL & Bilingual Rules

1. `dir` on `<html>` (or root container); everything else uses logical properties: `padding-inline-start`, `margin-inline-end`, `border-start-start-radius`, `inset-inline-end`, `text-align: start`.
2. Flex/grid layouts flip automatically — never hardcode `left/right` for layout.
3. Mirror: chevrons, arrows, back/forward, progress direction, sidebar accent bar, slider fill. Don't mirror: §7 list.
4. Numbers: keep Western Arabic numerals (1234) in data contexts for both languages unless the project demands Eastern (١٢٣٤).
5. Arabic type: +10% line-height, no negative tracking, no uppercase transforms, weight 500 where Latin uses 600 if the face renders heavy.
6. Copy length: Arabic ≈ Latin ±20% — test buttons/badges with both; min button padding-inline 16 protects short strings.
7. Fonts load both subsets up front (§3.1) to avoid FOUT swaps mid-word.

---

## 10. Accessibility Checklist (ship-blocking)

- Contrast per §2.7; test every theme.
- Full keyboard path: Tab order = visual order, focus-visible ring everywhere, Esc closes overlays, arrow keys in menus/tabs/segmented.
- Hit targets ≥ 44×44 (touch), ≥ 24 with 8 gap (dense desktop).
- All meaning has text: status badges have words, icon-buttons have `aria-label`, form errors are text not color.
- `prefers-reduced-motion` honored (§6.4); `prefers-color-scheme` maps to mint/night by default.
- Headings are hierarchical (one h1); landmarks: nav/main/aside/footer.

---

## 11. Anti-Slop Constitution (hard bans)

1. ❌ Purple-to-blue gradient washes on backgrounds, headings, or every button. (Gradients: §2.7 only.)
2. ❌ Emoji as icons or bullets.
3. ❌ Cards with colored left-borders as the default "callout" pattern. (Use icon tile + `-soft` fill instead.)
4. ❌ Heavy black shadows; mixed corner radii; radius > 32 on small elements.
5. ❌ Inter/Roboto/Arial; three+ font families; letter-spaced uppercase Arabic.
6. ❌ Fake data slop: rows of meaningless stats, "10x faster ⚡", star-ratings walls, 12 identical testimonials.
7. ❌ Icon-per-word decoration (an icon next to every list item by reflex).
8. ❌ Spinners for page loads (skeletons only); infinite bouncing arrows; autoplay carousels.
9. ❌ Pure #fff/#000 canvases; text at 100% black; borders at #ccc regardless of theme.
10. ❌ Hand-drawn complex SVG illustrations. Use striped placeholder frames (`repeating-linear-gradient` 45°, 6px, `--border` at 40%) with a monospace label of what real asset goes there.
11. ❌ Same-size same-shadow card walls: introduce rhythm via bento spans, not more decoration.
12. ❌ Center-aligning body paragraphs longer than 2 lines.
13. ❌ Em-dashes (—) and en-dashes (–) as a stylistic device in UI copy — the single biggest LLM tell. Use a period, comma, colon, or line break; ranges use a hyphen (2018-2026). In Arabic use the native comma ، and full stop.
14. ❌ Section-number eyebrows: “01 / INDEX”, “002 · Features”, “06 · How it works”. Name the topic plainly or drop the label.
15. ❌ Eyebrow overload — an uppercase overline above every section. Max one per three sections (hero counts as one); usually the headline alone is enough.
16. ❌ Version/status stamps in a hero (“v0.6”, “BETA”, “INVITE-ONLY”) unless the screen itself is a launch announcement.
17. ❌ Decorative status dots before every nav item, row, or badge. A colored dot must mean real state (online, available, failed) — nothing else.
18. ❌ Locale/time/weather atmosphere strips (“Riyadh 14:23 · 24°C”) unless the product is genuinely place- or timezone-bound.
19. ❌ Scroll cues (“Scroll ↓”, “Scroll to explore”, animated mouse-wheel). If they haven’t scrolled they’re on the hero; they know how.
20. ❌ Poetic craftsman labels (“Field notes”, “On our desks”, “From the bench”). Use plain functional labels (“Latest”, “Now”, “Testimonials”).
21. ❌ Filler verbs: Elevate, Seamless, Unleash, Next-Gen, Revolutionize, Empower. Concrete verbs only. (Arabic: تجنّب الحشو مثل “ثوري”، “بسلاسة تامة”.)
22. ❌ Placeholder identities: “John Doe”, “Acme”, “Nexus”, lorem ipsum. Use realistic locale-appropriate names (Arabic + Latin) and believable brand names.
23. ❌ Fake-precise numbers (99.99%, 4.1×, 48k) invented for a spec-aesthetic. Use real data or mark it clearly as mock.
24. ❌ Duplicate CTA intent on one screen (“Get started” + “Sign up free” + “Try now”). One label per intent, used everywhere.
25. ❌ Logo walls with a category label under each mark (“Stripe — payments”). Logos only — the label adds nothing.
26. ❌ Primary CTA labels longer than 3 words, or any button label that wraps to two lines at desktop.

---

## 12. Decision Trees (fast answers)

- **Which button?** The one action you want taken → ink primary. Alongside it → secondary. In a toolbar → ghost. A filter/tag → soft. Hero of a landing page → gradient allowed, once.
- **Tabs or segmented?** Switching *views of the same data* → segmented. Switching *content sections* → underline tabs. >5 options → select/menu.
- **Modal, sheet, or page?** ≤2 fields or a confirm → modal. Mobile quick task / pickers → bottom sheet. Complex object detail → side-sheet (desktop) or page.
- **Dock or sidebar?** Marketing/consumer app shell, ≤6 destinations → dock. Admin/dense tooling → sidebar.
- **Glass level?** Consumer/brand-forward → G3. Balanced product → G2. Data-dense admin → G1.
- **Which theme?** Match domain psychology (§0.1); when unsure → Mint + Night pair.

---

## 13. Per-Project Adaptation Protocol (for AI agents)

When starting a new platform on Madar:
1. Choose/derive a theme pack (§2). If the brand has a color, place it at `oklch(L 0.13–0.15 H)` for light accent; regenerate `-soft`, `--on-accent`.
2. Pick glass level (§12) and state it once at the top of the project.
3. Copy the token block + §3 font link into the project root. Components must reference tokens only.
4. Build shells first (§8.7/§8.8 recipes), then fill with §8.3 cards.
5. Run §10 checklist and §11 bans before delivery. In RTL, re-run §9.
6. Never invent a new component if a §8 component + tokens can express it.

---

## 14. The Design Read & Adaptive Tuning Dials

**14.0 Read the room first.** Before choosing anything, infer intent from the brief's signals — most bland output comes from jumping to a default instead of reading the room:
- **Screen kind** — landing, dashboard/admin, auth, settings, detail, checkout, feed.
- **Audience** — a procurement panel, a design-literate consumer, a parent on a school portal, a merchant in a hurry. The audience picks the aesthetic, not your taste.
- **Vibe words** the user used — “calm”, “premium”, “Apple-like”, “playful”, “serious”, “dense”.
- **Existing brand** — logo, color, type already in play. On a redesign these are starting material, not optional input.
- **Quiet constraints** — accessibility-first, regulated, trust-first commerce, kids' products. These override aesthetic preference.

Then set the four dials, 1–10 each, **once per project** in a one-line comment at the top of the entry file. They translate the read into concrete choices across §2–§9 without inventing new rules — they select which existing rule applies.

| Dial | 1 | 10 | This system's baseline |
|---|---|---|---|
| **Variance** | Perfect grid, one repeated card shape | Bento spans, rotated pinned notes, asymmetric hero | 6 |
| **Motion** | Fades only, no springs, no ambient loops | Full §6 catalog — magnify, tilt, stagger, ambient float | 8 |
| **Density** | Airy, one focal action per screen | Admin-dense — compact 40px rows, 12-col grids, small type floor | Marketing 3 / Admin 7 |
| **Chroma** | Accent only on links + focus rings | Accent everywhere it can carry meaning — tiles, soft-fills, one gradient CTA | 5 |

**Suggested starting points by domain:**
- Consumer marketplace / storefront (e.g. سلة-style e-commerce) → Variance 7 · Motion 8 · Density 4 · Chroma 6.
- School / education platform → Variance 4 · Motion 5 · Density 5 · Chroma 4 (calm, low distraction).
- Subscriber services / multi-tenant SaaS admin → Variance 3 · Motion 5 · Density 7 · Chroma 3 (legibility over flourish).
- **Hard floor:** on any data-table-heavy screen, Motion ≤ 4 locally regardless of the project dial — skeleton + hover only, never stagger a 200-row table.

**Framing statement:** before building any screen, state one internal line — *"Reading this as: [page kind] for [audience], leaning [theme pack], at variance/motion/density/chroma = [n/n/n/n]."* Page kinds: landing/marketing, admin/dashboard, auth, settings, object-detail, redesign. This is a checkpoint, not user-facing copy — it keeps every following choice traceable to §8.7/§8.8 recipes instead of improvised.

**Redesign protocol:** when calibrating Madar onto an *existing* screen rather than greenfield, audit first — map its current colors/spacing into §1's semantic slots before changing anything visual. Preserve what the brand already owns (logo, product color); only overhaul structure and motion.

---

## 16. Signature Vocabulary (icon rituals + hero-grade cards)

Distilled from the reference libraries (Jahez pattern library, Liquid-Soft toolkit, Icons & Cards Lab). These are the *earned flourishes* — each page gets **at most one ritual family**, applied consistently. All obey §6 (transform/opacity only, spring or ease-out, reduced-motion safe).

### 16.1 Icon presentation rituals (hover states for icon tiles)
| Ritual | Recipe | Use for |
|---|---|---|
| **Orbit** | 6px accent dot on a circular track around the icon (dashed 1px `--border-strong` ring); idle rotation ≥4s, hover → 1s + core scales 1.1 | Sync, live processes, "working" states |
| **Viewfinder** | four 13×2px accent corner brackets; hover → corners translate inward 5px (spring) + icon scales 1.12 | Search, discovery, focus/selection |
| **Strata** | squircle plate (radius 38%, accent 16%→7% gradient, inner top highlight); hover → plate scales 0.94 while icon lifts −5px with accent drop-shadow | Feature grids, launchers — the premium default |
| **Beacon** | two staggered expanding rings (scale 0.35→2.1, fade out, 1.4s, offset 0.7s) around a round `--accent-soft` tile | Notifications, live/online things ONLY — never decorative |
| **Self-drawing** | icon strokes get `stroke-dasharray` = path length; hover → `stroke-dashoffset` animates to 0 (600–900ms ease-out), drawing the glyph | onboarding highlights, empty states, "how it works" steps |

### 16.2 Hero-grade card rituals
| Card | Recipe | Use for |
|---|---|---|
| **Dossier** | folder tab (76×22 `--surface-2`, top radius only) behind a sheet card; hover → sheet `translateY(-7px) rotate(-1deg)` + shadow 1→2 | Contracts, invoices, documents, records |
| **Fanned stack** | 3 stacked cards (±4° base rotation); hover → sides fan to ±9° and translate ±30px, center lifts −10px; z-order center-on-top | Collections, bundles, albums, groups |
| **Spatial glass** | card in `perspective:800px`; hover → `rotateX(6°) rotateY(−5°)`, icon `translateZ(56px)`, glass caption bar `translateZ(34px)`; accent shadow deepens under icon | ONE hero/feature card per page — never in lists |
| **Dynamic island** | dark pill (`oklch(0.17 0.02 274)`, radius 999) with status dot + label; tap → morphs to `r-lg` card (max-width 210→300, `grid-template-rows 0fr→1fr`, 480ms spring) revealing progress + meta | Live activities: order tracking, uploads, timers, playback |

### 16.3 Rules for rituals
1. One ritual family per page. Mixing Orbit tiles with Beacon tiles reads as noise.
2. Rituals are hover/tap *rewards*, never load-time fireworks — idle state must look complete without them.
3. Island is the only ritual allowed to persist on screen (it IS the status UI). Others return to rest.
4. In RTL the fan/tilt directions mirror automatically via logical transforms — verify Spatial's rotateY sign flips.
5. Data-dense admin screens (Density ≥7): rituals off, plain tiles only.

---

## 17. Pattern Compendium (merged from the source libraries)

The full pattern bank, merged from your prior libraries — **Jahez Pattern Library** (85+ patterns), **Liquid Soft Visual Language Kit** (18 primitives), **Icons & Cards Lab** (18 rituals, see §16), and the **v2 library** — normalized onto Madar tokens. Each entry: recipe + where it earns its place. Anything here must still pass §11 and §15.

### 17.0 The Soft Vocabulary (Liquid Soft dialect)
A warmer sub-dialect for consumer surfaces (delivery, commerce, social). Its core principle: **bright flat brand, not gradient mesh** — one saturated brand color as a flat/radial fill plus a colored halo shadow, never multi-hue mesh washes.
- **Tonal triple:** every icon color ships as 3 forms — `fill` (vertical 2-stop gradient), `shadow` (colored ambient `0 4px 10px hue/.35`), `tint` (pale chip background). Pick per state: fill = active/featured, tint = resting.
- **Squircle container:** THE icon container — `border-radius: 30%` of size (not circle, not sharp), sizes 22/28/36/48/64, inner glyph always 50%, always `inset 0 1px 0 white/.35` + `inset 0 -1px 0 black/.18`.
- When to use vs §7 flat tiles: Soft Vocabulary for consumer/emotional surfaces; flat `--accent-soft` tiles for admin/productivity. Never both on one screen.

### 17.1 Buttons
| Pattern | Recipe | Where |
|---|---|---|
| Pill system (5 grades) | ink / white / brand / soft / ghost — all `r-full` 44px; ink+white get subtle vertical gradients + `inset 0 1px 0` highlight | maps to §8.1 |
| Glass button | `rgba(255,255,255,.6)` + `blur(10px) saturate(1.5)` + white/.4 border (light); white/.12 fill (dark) — ONLY over color/photo | hero over imagery |
| Liquid glass (true refraction) | `feTurbulence + feDisplacementMap` SVG filter bends the backdrop; chromatic edge = two colored ring shadows (pink/.14, cyan/.10). `backdrop-filter: url()` support is patchy — ship the blur+chromatic-edge fallback | one premium moment per app |
| Liquid metal | chrome `conic-gradient` (#C8C8D0→#FFF→#8A8A95→#4D4D55→#FFF…) + ink border | premium/upgrade only, never default |
| Generate/AI button | rotating conic ring behind a dark pill (oversized pseudo-element, keyframed spin); inner button masks the center | long-running processing actions |
| Glowing input halo | blurred animated gradient element behind an input's border | "smart search" fields |

### 17.2 Icons, avatars, seals
| Pattern | Recipe | Where |
|---|---|---|
| 3D specular orb | 3 layers: radial fill (light→mid→deep at 28%/26%), inset white crescent top + dark crescent bottom, colored outer halo; tiny elliptical highlight dot | step numbers, plan pickers, status |
| Burst-star seal | 12-point star polygon (rOut 30 / rIn 24, computed) as SVG/clipPath, gradient fill, glyph on top | "verified", "premium" badges |
| Memoji avatar | pastel ring (52) around gradient face (38) + inset light/dark rims; ring+face picked by name-hash | people without photos |
| Avatar stack | −8/−9px overlap, 2px `--bg` ring, "+N" chip | §8.6 |
| Icon orbit ring | icons distributed by angle around a center; ring rotates, each icon counter-rotates to stay upright | integrations screens |
| Icon cluster network | SVG lines from fixed center to each node | "connects with" diagrams |
| Animated state icons | success draws its check stroke, error shakes ±4px, loading orbits | inline result feedback |
| Infinite icon marquee | duplicated list, `translateX(-50%)` loop ≥40s, edge fade masks, no JS | logo strips |

### 17.3 Cards & surfaces (beyond §8.3/§16)
| Pattern | Recipe | Where |
|---|---|---|
| Hero card (flat + halo) | flat radial brand fill (`120% 80% at 30% 20%`) + colored halo `0 30px 60px accent/.4` + inset top highlight | ONE per screen — the balance/total |
| Glow card | white card, colored gradient CTA strip as bottom cap, blurred halo bleeding below the card (overflow visible) | upgrade/conversion cards |
| Aurora card | near-black base + volumetric radial ellipse glow rising from bottom (blur 28px) + optional fractalNoise grain | "new feature", dark premium |
| Blueprint | engineering grid (repeating-linear 1px lines) fades in on hover over a technical card | specs, developer features |
| Aperture | iris/spotlight radial mask opens over the card on hover | reveal moments |
| Pass (perforated) | ticket card with punched circles (radial-gradient holes) + dashed divider | bookings, passes, coupons |
| Breaker | toggle switch inside the card energizes it (color floods on) | activation/enable states |
| Meter dial | SVG gauge sweeps + digits count up | scores, capacity |
| Slats | accordion strip of vertical slats for a dashboard row | dense dashboards |
| Editorial (App-Store) | full-bleed image card, overline + display title overlaid, expands to detail | "service of the day" features |
| Tilted 3D stack | stacked cards fan upward with `perspective + rotateX` on hover | wallets, document piles |
| Metric + sparkline | KPI card with hand-computed SVG polyline | §8.3 stat card |
| Split image/text | image column zooms slightly on hover, link nudges | articles, courses |
| File card + folder | 3-layer CSS folder (back/tab/front) + file cards with type chips | drive/docs UIs |
| Gradient card (mesh + noise) | animated mesh + fractalNoise grain + inner glow border | max ONE KPI per admin screen |

### 17.4 Heroes & backgrounds
| Pattern | Recipe | Where |
|---|---|---|
| Aurora mesh hero | layered radial-gradients drifting via `background-position` + 2 blurred floating orbs | landing hero, no video needed |
| Cursor spotlight | radial gradient recenters on `mousemove` over a faint dot grid | tech product pages |
| Glass split hero | vivid gradient backdrop + floating glass stat card near the bottom | launch/results pages |
| Gradient headline | static `background-clip: text` two-hue gradient — headline only, never body | hero display text |
| Text shimmer | animated gradient sweep clipped to text | ONE line max, announcements |
| Duotone photo | `mix-blend-mode: luminosity` layer + `screen` tint layer over any photo | unify photo colors with brand |

### 17.5 Bars & docks (beyond §8.4)
| Pattern | Recipe | Where |
|---|---|---|
| Floating compact nav | pill navbar shrinks padding/gap/font past a scroll threshold (one 320ms transition) | marketing sites |
| Progressive glass navbar | transparent over hero → frosts (blur+bg+shadow) after scroll point | dark-hero pages |
| Live status strip | thin dark strip, pulsing dot + message + dismiss | service status, maintenance |
| Command bar trigger | search-shaped button: icon + muted text + `⌘K` kbd, focus ring | opens §8.5 palette |
| macOS magnifying dock | icon size = f(distance from hovered index): 0/±1/±2 | §8.4 dock |
| Mobile glass dock + raised CTA | 4 glass tabs + circular center CTA breaking the top edge with a `--bg` ring | mobile apps with one primary action |
| Sliding pill side rail | vertical dark rail; colored pill slides (`top` transition) behind the active icon | editors, dense tools |
| Frosted sidebar over color | glass nav rail directly over a colored workspace backdrop | branded workspaces |
| Frosted tooltip | backdrop-blur tooltip + matching CSS triangle arrow | rich previews |

### 17.6 Forms & pickers (beyond §8.2)
| Pattern | Recipe | Where |
|---|---|---|
| Day picker | weekday squares toggle accent fill | schedules, recurring bookings |
| Time field | segmented hh/mm boxes, arrow-key stepping | appointments |
| Apple color picker | preview + hue slider + swatch grid (scale + colored ring on select) | theming, labels |
| Create menu | `+` rotates 45° and blooms a stack of labeled actions | FAB alternative |
| Toolbar | grouped toggle buttons, one segmented surface | editors |
| Expandable tabs | inactive = icon only; active expands `max-width` to reveal label — magnetic feel | mobile bottom navs |
| Tabs variants (3) | underline / pill / enclosed — pick ONE per app | §8.4 |
| Swipeable list | horizontal offset tracking reveals action layers under the row | mobile lists |

### 17.7 Data & feedback (beyond §8.6)
| Pattern | Recipe | Where |
|---|---|---|
| Flux loader | progress bar with sliding gradient (moves even when paused) + phase markers + labels | multi-stage processing (تجهيز → تغليف → تسليم) |
| Agent planning timeline | vertical expandable steps, each with success/active/error/pending state | onboarding progress, task pipelines |
| AI loaders (5) | dot-pulse, ring, bar-sweep… pick ONE app-wide | inline waits |
| Logs table | expandable rows reveal detail panels | admin audit logs |
| Confirm dialog | icon tile + one sentence + destructive/cancel pair | §8.5 modal |
| Welcome modal | side-by-side visual + content panel | first-run |
| Blur reveal deck | stacked promos; back cards blurred, sharpen as they advance | promo carousels |
| Curated gradient palettes | pre-approved 2-hue pairs (±20-28° around accent) — the ONLY legal gradient sources | any gradient use |

### 17.8 Layout systems
| Pattern | Recipe | Where |
|---|---|---|
| Bento grid | `grid-column: span N` varies per card | §8.7 |
| Masonry | pure CSS `column-count` (no JS) | galleries, inspiration boards |
| Team section | avatar grid + role rows in one card | about pages |

### 17.9 Compendium rules
1. Patterns are a menu, not a checklist — a screen uses 2–4, never 10.
2. Every glow/halo/aurora counts against the ONE-gradient budget (§2.7) unless it's the screen's single hero element.
3. Consumer surfaces may adopt the Soft Vocabulary (§17.0); admin surfaces stay on flat tokens. Never mix dialects on one screen.
4. Marquees, shimmers, flux gradients: max one perpetual-motion element per viewport (plus skeletons).
5. Everything RTL-flips per §9 — swipe actions, marquee direction, rail pills, dial sweeps.

---

## 18. Interaction & Flow Bank (from the 21st.dev import list)

Rebuilt on Madar tokens, not copied — each pattern re-expressed with §6 physics and §11 discipline. Live demos in Showcase §13–§14.

### 18.1 Stateful controls
| Pattern | Recipe | Rule |
|---|---|---|
| **Publish button** | 3-state machine idle → working (spinner + label swap) → success (fill morphs to `--success` + colored halo) → auto-return; width locked | any commit action: publish, pay, deploy |
| **Copy button** | icon-only on dark code chip; copy glyph morphs to green check for 1.8s | always paired with `JetBrains Mono` code chip |
| **Shatter button** | on press: button squashes 0.86 while 12 particles (mixed square/round, accent+ink) burst outward and fade (620ms, `--ease-out`) | destructive-but-fun actions (clear list, dismiss all); NEVER for real deletes — those get a confirm dialog |
| **Bouncy toggle** | switch with exaggerated overshoot curve `cubic-bezier(0.3,2.1,0.5,1)` 480ms | consumer surfaces only; admin keeps §8.2 switch |
| **Cinematic theme switch** | wide 92×44 track: day = sky→sand gradient + glowing sun knob; night = indigo gradient + moon knob (inner shadow crescent) + twinkling star dots | THE light/dark control on marketing pages; in-app settings use plain segmented |
| **Glow menu** | active nav pill radiates `0 0 18px accent/.55` | one glowing element per bar; counts as the accent moment |
| **Toggle chips (HeroUI)** | selectable pills: border-strong → accent fill on select | filters, multi-select tags |
| **Number field** | `− value +` group on `--surface-2`, hairline separators, tabular value | quantities, seats, limits |

### 18.2 Flow patterns
| Pattern | Recipe | Rule |
|---|---|---|
| **Registration stepper / multi-step form** | numbered 34px dots + filling connector bars; done = `--success` + drawn check, active = accent + 5px soft ring; per-step panel fades up 340ms; Back ghost / Continue ink | ≤5 steps, labels under dots, one column of fields |
| **Onboarding form** | stepper + selectable type cards (icon + label, accent border on pick) | first-run only |
| **Unsaved-changes guard** | dark floating pill slides up (480ms spring): warning dot + "Unsaved changes" + Reset (ghost-on-dark) + Save (white) | appears on first edit, anchored bottom-center; never a browser alert |
| **Estimated arrival** | ETA number + vehicle tile + 3-phase route bar with pulsing position dot; phases worded (Picked up / On the way / Delivered) | live orders; pairs with Dynamic Island §16.2 |
| **Event manager** | list/row cards + day picker (§17.6) + time field; status badges per §8.6 | bookings, classes, appointments |
| **Autocomplete** | focused input + `--shadow-3` popover; matched substring bolded in accent; ↵ hint on first item | search, city/tag pickers |
| **Fieldset (HeroUI)** | hairline-bordered group, `r-md`, legend as small chip on the border | grouping related settings in long forms |
| **Activity dropdown** | avatar + verb + timestamp rows in a `--shadow-3` popover, unread dot start | notification bells |

### 18.3 Expressive & brand moments
| Pattern | Recipe | Rule |
|---|---|---|
| **Dia text** | key words in a paragraph are gradient-clipped spans that ignite on hover | one paragraph per page, marketing only |
| **Location tag** | pill: pin icon + place name + pulsing live dot | live/geo features only (dot must mean something) |
| **Iridescent foil** | 7-stop pastel holographic gradient at 280% size + white radial sheen; hover slides `background-position` 900ms | collectibles, membership cards, gift cards — ONE per screen, counts as the gradient budget |
| **Logo trace loader** | brand mark path with `stroke-dasharray` trace loop (draw → hold → undraw, ~2.4s) | app boot / full-page waits; replaces spinners at brand level |
| **Gradient shimmer** | see §17.4 text shimmer | one line max |
| **Agent dock** | dark panel of agent rows: gradient identity tile + name + state (thinking = 3 staggered pulsing dots, done = green dot + word) | AI/automation products; thinking dots are a legal perpetual motion (they ARE the status) |
| **Skills showcase** | wrapping chip cloud, `--accent-soft` chips, count badge | profiles, portfolios |
| **Mini chart / animated sparkline** | polyline `stroke-dasharray` draws in 1.6s once on mount, end-dot solid | KPI cards; draw-in happens once, never loops |
| **Toolbar dock (ruixen)** | §17.5 sliding-pill rail, horizontal variant | editors |
| **Dynamic island (be-ui)** | §16.2 island — canonical version | live activities |

### 18.4 Bank rules
1. State machines over tooltips: a control that *changes shape* to report progress beats a toast explaining it.
2. Success color is earned: only after a real async completion (publish, save, copy). Never green-by-default.
3. Particle/shatter/foil effects: max ONE per app, on its signature action.
4. Every animated entrance here runs once; only status indicators (thinking dots, live position, pulse) may loop.
5. All demos live in Showcase §13 (Interaction Lab) and §14 (Flow & Forms) — recolor with any theme, both directions.

---

## 19. Kinetics Physics Vocabulary (fetched from kinetics.colorion.co — 99 spring interactions)

Real source material, not memory. Kinetics' core thesis matches §6: **motion built on spring physics, not guessed durations**. Its four tuned curves (adopted as canon, aliases for §6.1):

```css
--spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* overshoot — toggles, pops, counters */
--glide:   cubic-bezier(0.16, 1.00, 0.30, 1);  /* fast-out settle — expansions, reorder */
--draw:    cubic-bezier(0.65, 0.00, 0.35, 1);  /* symmetric — underlines, pill glides */
--drop-in: cubic-bezier(0.18, 1.25, 0.40, 1);  /* entrance overshoot — toasts, banners */
```

### 19.1 The transferable catalog (recipes with exact values)
| Pattern | Physics | Recipe |
|---|---|---|
| **Magnetic button** | `magnet(0.3)` | on mousemove translate button toward pointer by 30% of offset-from-center; 150ms ease-out while tracking, 500ms `--spring` return on leave |
| **Hold to confirm** | `hold(900ms)` | SVG ring `stroke-dashoffset` full→0 over 900ms linear on pointerdown; early release cancels (250ms snap back); completion flashes success. THE honest destructive control — pair with §18 shatter rule |
| **Slide to unlock** | `snap · 85% latch` | thumb follows pointer 1:1 (transition:none while dragging); release ≥85% → latch + success recolor, else `--spring` return; label fades with distance |
| **Elastic counter** | `spring(280,18)` | on change: `scale(1.25) translateY(-5px)` + accent flash, settle 400ms `--spring`; tabular-nums so digits don't shift |
| **PIN input** | `spring(360,22)` | 1-char boxes; on digit: accent border + `scale(1.14)` pop + auto-focus next; Backspace on empty → previous |
| **Keycap press** | `press(90ms)` | solid bottom `box-shadow 0 6px 0` as the key's side wall; `:active` translateY(5px) + shadow→1px; 90ms ease-out = crisp bottoming-out |
| **Push button** | `press(60ms)` | same principle, colored edge (`0 6px 0` darker shade of fill) |
| **Squish button** | asymmetric | down: `scale(0.88)` in 80ms ease-out; up: 500ms `--spring` — quick-down bouncy-up is what feels physical |
| **Underline draw** | `draw(400ms)` | 2px bar `scaleX(0→1)`, `transform-origin: start`, `--draw` curve (in RTL origin flips automatically with logical values) |
| **Scramble reveal** | `scramble(35ms)` | interval swaps unsettled chars for random glyphs from `!<>-_/[]{}=+*^?#`, locking left-to-right by `frame − i×1.4 > threshold`; monospace to prevent jitter |
| **Rubber-band slider** | `rubber(0.32)` | past the ends add only 32% of overshoot (`clamped + (raw−clamped)×0.32`); release springs home |
| **Drag to dismiss** | `friction` | translate + `rotate(x×0.05deg)` + opacity fade with distance; past 100px fling, else spring back |
| **Toast overshoot** | `--drop-in` | `translateY(140%) scale(0.9)` → rest over 550ms — slides *past* rest then settles (upgrade to §6.3 toast) |
| **Tab pill glide** | `glide(0.4s)` | measure target `offsetLeft/offsetWidth`, animate both `left` and `width` — pill stretches between different-width tabs |
| **Stagger entrance** | 90ms | IntersectionObserver + per-item delay `i × 90ms`, `translateY(14px)` + fade, `--glide` |
| **Speed-dial FAB** | stagger spring | actions fan to fixed offsets, `scale(0.4→1)`, delays 20/70/120ms; + rotates to × |
| **Icon morph swap** | blur morph | outgoing: `blur(6px) scale(0.7) rotate(-20deg)` fade; incoming settles in — 300ms crossfade |
| **Number scrubber** | 1px = 1 | pointerdown captures start; drag horizontally to change value; `ew-resize` cursor + accent scale while scrubbing |
| **Reorderable list** | midpoint swap | dragged item transition:none + shadow; neighbors `--glide` into place when crossed |
| **Odometer count-up** | ease-out cubic | rAF with `1−(1−p)³` over 1.4s on scroll-into-view, tabular-nums |
| **Typewriter** | 55/30ms | type 55ms/char, delete 30ms, hold 1.1s; caret blinks via `steps(1)` |
| **Heartbeat/EKG dot** | offset-path | glowing dot animates `offset-distance 0→100%` along the SVG path — live-signal indicator |
| **Segment loader** | 120ms stagger | bars `scaleX(0→1)` from start edge in sequence — determinate phases (pairs with §17.7 Flux) |
| **Undo snackbar** | drain 3s | slide up `--spring` + progress bar `scaleX(1→0)` linear = the visible undo window |

### 19.2 Sliding-gradient buttons (fetched from gradientbuttons.colorion.co)
The canonical recipe behind all ~200 of them:
```css
background-image: linear-gradient(to right, A 0%, B 51%, A 100%);  /* 3 stops, A repeats */
background-size: 200% auto;
transition: background-position 0.5s;
:hover { background-position: right center; }   /* the light travels across */
```
Madar adaptation: derive A/B from the accent (`A = oklch(from var(--accent) calc(l − 0.14) c calc(h − 20))`, `B = calc(l + 0.06) … calc(h + 20)`) so it obeys the theme; `r-full`; counts as the §2.7 gradient budget. Never use the site's raw palettes (purple/red walls) — hue distance stays ≤ ±20-28°.

### 19.3 Physics rules
1. Interruption-safe: springs re-target naturally — never chain `setTimeout` states a user can outrun; cancel timers on re-trigger.
2. Track 1:1, settle with spring: anything draggable has `transition: none` while tracking and a spring only on release.
3. Asymmetric always: press/exit fast (60–150ms), release/enter springy (400–550ms).
4. One physics dialect per control family — all toggles in an app share one curve.
5. Live demos: Showcase §16 Physics Lab (magnetic, hold, unlock, counter, PIN, keycap, scramble, underline, sliding gradient).

---

*Madar v1.0 — the orbit everything else revolves around. See `Showcase.dc.html` for every component of this file rendered live, in all five themes, both directions.*
