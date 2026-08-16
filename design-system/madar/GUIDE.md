# Madar (مدار) — agent guide

Bilingual (RTL+LTR), multi-theme component library, now merged into NOVA UI and running on NOVA tokens. Design source of truth: `design-system/madar/design.md` (§1 tokens → §19 physics). The live reference is the Madar surface inside the app (`#madar`).

## Commands
- `npm run dev` / `npm run build` (tsc + vite) / `npm run typecheck`

## Architecture after the merge
- `design-system/nova-design-os/tokens/tokens.css` — the base NOVA token set plus the `light` and `dark` packs.
- `design-system/nova-design-os/tokens/theme-packs.css` — the Madar color families (mint/coral/sky/iris/night) expressed in the **NOVA namespace**. This is the only place Madar colors live now.
- `src/madar/bridge.css` — maps Madar's token names (`--bg`, `--surface`, `--accent`, `--shadow-2`…) onto `--nova-*`, and carries Madar's geometry and motion scales, the three glass levels, and every keyframe. It declares **no colors of its own**.
- `src/madar/interactions.css` — hover/press/focus utility classes (`i-lift`, `i-press-97`, `i-input`…) and RTL helpers (`i-chevron-dir`, `--underline-origin`). Element-level rules are scoped to `.madar-surface` so they never leak into the NOVA shell.
- `src/madar/components/` — the reusable library (21st.dev set + full Kinetics catalog). Barrel: `src/madar/components/index.ts`. Docs + source→export map: `src/madar/components/README.md`.
- `src/madar/showcase/` — the living demo sections. Sections must consume `src/madar/components`, never re-implement them.
- `src/madar/sections.ts` — the registry that exposes each showcase section to the NOVA shell: bilingual title, description, tags, family, and a lazy import.
- `src/madar/theme/themes.ts` — the seven registered packs and three glass levels that drive the switcher.
- `src/madar/theme/ThemeContext.tsx` — a **read-only** view of the shell's theme state. It owns nothing; the app sets `data-theme`, `data-glass`, and `dir` on the document element.
- `src/components/MadarLibrary.tsx` — the NOVA-side surface: family rail, section picker, and the stage sections render into.

## Rules
1. Layouts must survive `dir="rtl"` with zero special-casing: logical properties only (`insetInlineStart`, `marginInlineEnd`), flex/grid + gap. Draw-from-edge effects use `var(--underline-origin)`.
2. Motion: animate only transform/opacity/filter/box-shadow. Curves come from `SPRING`/`GLIDE`/`DRAW`/`DROP_IN` exports, durations from design.md §6. Entrances run once; only status indicators loop.
3. New theme pack = one `[data-theme]` block declaring the **NOVA** color tokens in `theme-packs.css` + one entry in `src/madar/theme/themes.ts`. Never add a color to `bridge.css`.
4. New Madar section = a file in `src/madar/showcase/sections/` + one entry in `src/madar/sections.ts`. The entry is what makes it searchable from the command palette.
5. Madar components keep referencing Madar token names. That is intentional: the bridge resolves them, so there is still exactly one source of truth for color and no component mixes two token systems.
6. Any new pack must clear WCAG AA on the pairs listed in `AUDIT.md`; measure before shipping it.

## Taste skills
`design-taste-frontend` (anti-slop) governs any **product surface** built from this library: landing pages, portfolios, marketing pages. Before building one, state the one-line Design Read (§0.B), set the three dials (§1), and run the §14 Pre-Flight Check. Hard bans that always apply to product copy: em-dash in user-visible text, fake-perfect numbers, generic names, decorative status dots, section-number eyebrows, scroll cues.

**Showcase exemption:** `src/madar/showcase/` mirrors the `Showcase.dc.html` design prototype pixel-faithfully; the prototype is archived at `archive/madar/project/Showcase.dc.html`. Its numbered eyebrows (`17 · INTERACTION BANK`), em-dash demo labels, and V1.0 badge are the prototype's own documentation vocabulary; do not "fix" them against the taste skill. Library component **defaults** (strings that ship into real products) must stay clean; they are verified em-dash-free.
