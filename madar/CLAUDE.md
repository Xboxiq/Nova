# Madar (مدار) — agent guide

Bilingual (RTL+LTR), multi-theme design system. Source of truth: `../project/design.md` (§1 tokens → §19 physics). The live reference is this app's showcase.

## Commands
- `npm run dev` / `npm run build` (tsc + vite) / `npx tsc --noEmit -p tsconfig.app.json`

## Architecture
- `src/styles/tokens.css` — 5 theme packs (mint/coral/sky/iris/night), 3 glass levels, shadows, all keyframes. Semantic tokens only; components must never hardcode raw colors.
- `src/styles/interactions.css` — hover/press/focus utility classes (`i-lift`, `i-press-97`, `i-input`…) and RTL helpers (`i-chevron-dir`, `--underline-origin`).
- `src/components/` — the reusable library (21st.dev set + full Kinetics catalog). Barrel: `src/components/index.ts`. Docs + source→export map: `src/components/README.md`.
- `src/showcase/` — the living demo. Sections must consume `src/components`, never re-implement them.

## Rules
1. Layouts must survive `dir="rtl"` with zero special-casing: logical properties only (`insetInlineStart`, `marginInlineEnd`), flex/grid + gap. Draw-from-edge effects use `var(--underline-origin)`.
2. Motion: animate only transform/opacity/filter/box-shadow. Curves come from `SPRING`/`GLIDE`/`DRAW`/`DROP_IN` exports, durations from design.md §6. Entrances run once; only status indicators loop.
3. New theme = one `[data-theme]` block in tokens.css + one entry in `src/theme/themes.ts`.

## Taste skills (../.agents/skills/)
`design-taste-frontend` (anti-slop, installed from Leonxlnx/taste-skill) governs any **product surface** built from this library: landing pages, portfolios, marketing pages. Before building one, state the one-line Design Read (§0.B), set the three dials (§1), and run the §14 Pre-Flight Check. Hard bans that always apply to product copy: em-dash in user-visible text, fake-perfect numbers, generic names, decorative status dots, section-number eyebrows, scroll cues.

**Showcase exemption:** `src/showcase/` mirrors the `Showcase.dc.html` design prototype pixel-faithfully. Its numbered eyebrows (`17 · INTERACTION BANK`), em-dash demo labels, and V1.0 badge are the prototype's own documentation vocabulary; do not "fix" them against the taste skill. Library component **defaults** (strings that ship into real products) must stay clean; they are verified em-dash-free.
