# Gates: the brand as an axis of its own

The owner's requirement, in their words: «ماريد يكون مقيَّد باتجاه لوني محدّد… قد يكون
صاحب متجر يناسبه لون بنفسجي غامق مع أبيض… اريد هذا الشيء يكون سلس في التغيير… عدد من
الألوان الحديثة والمميزة يتم تحديدها في الإعدادات… ماريد يكون عشوائية».

Two axes existed and neither could answer it. `data-theme` gives seven PACKS, and
each pack owns its surfaces **and** its accent, authored together — so choosing
violet meant choosing the iris pack's surfaces too, and a shop that wants violet
on **white** had no way to say so. `data-glass` only says how translucent the
material is.

So a third axis: **`data-brand`** owns the action family, a gradient, a mesh and a
tint; `data-theme` keeps owning the ground. They multiply instead of colliding —
`light` + `violet` is white surfaces with a violet action; `night` + `ember` is the
indigo night with polished orange. Nothing applies until `data-brand` is set, so
the seven packs behave exactly as before.

| where | what it holds |
|---|---|
| `design-system/nova-design-os/tokens/brands.css` | the eight brands as oklch ANCHORS, and the one rule that derives the whole action family, the gradient, the mesh and the tint from them; plus the edge axis `data-radius` |
| `src/brands.ts` | the registry the settings panel reads (id, both names, a swatch that previews the brand's own gradient) |
| `src/madar/components/brandwork.tsx` | what reads those tokens back: the gradient card, the set as lit spheres, glass tinted by the brand |
| `src/App.tsx` | the two settings rows, persistence, and the attributes on the document |

A brand is six lines: a hue, a chroma, a lightness for light packs and one for
dark, a second hue for the gradient, and the ink that sits on the accent. Fifteen
hex values per brand is how a palette drifts; anchors cannot disagree with
themselves.

## Gates

- [x] G1: TypeScript and the production build are clean
  CHECK: npx tsc --noEmit -p tsconfig.json; npm run build
  EXPECT: exit 0 both
  EVIDENCE: TSC_EXIT=0, BUILD_EXIT=0

- [x] G2: Every brand is legible on every pack — 224 pairs, measured in a browser
  CHECK: node tools/qa/brand-contrast.mjs
  EXPECT: action ≥ 3.0 on the ground, on-action ≥ 4.5 on the action, action-ink ≥ 4.5 on the ground, focus ≥ 3.0
  EVIDENCE: BRAND_PAIRS_MEASURED=224 (8 × 7 × 4); worst per pair 4.19 / 4.69 / 6.29 / 3.87; BRAND_CONTRAST=ok (0). The values are read from PAINTED pixels, not parsed: every derived token is an oklch around a calc(), which has no hex form until a browser paints it

- [x] G3: The ink's direction of travel flips with the ground
  CHECK: the same gate, before and after
  EXPECT: `--nova-action-ink` darker than the accent on light packs, lighter on dark ones
  EVIDENCE: the first draft subtracted lightness on both and the gate reported 3.08–4.32 on the dark packs across seven brands; with `--brand-ink-l` flipping in the dark rule the worst is 6.29

- [x] G4: An unregistered brand is a no-op, not a broken palette
  CHECK: the gate sets `data-brand="not-a-registered-brand"` and compares the painted accent with the pack's own
  EXPECT: identical
  EVIDENCE: UNKNOWN_BRAND_IS_NOOP=ok. Found by accident and fixed on purpose: the first run swept the RADIUS names in as brands, `[data-brand]` matched them, and every derived token collapsed to one unpainted colour. The derivation now selects the registered ids

- [x] G5: The card's ink clears the ground it is actually painted on
  CHECK: node tools/qa/brand-card.mjs — samples every text node of the card, composites its alpha over BOTH ends of the brand's mesh, 8 brands × 2 packs
  EXPECT: ≥ 4.5 (≥ 3 for large text)
  EVIDENCE: CARD_TEXTS_MEASURED=80; CARD_WORST=5.16 (floor 4.5) teal/light; BRAND_CARD=ok (0)

- [x] G6: Two defects the token gate could not see, and the probe that found them
  CHECK: the same gate, three runs
  EXPECT: named, fixed, re-measured
  EVIDENCE: (a) the mesh followed the pack's lightness, so ember's card turned pale peach on the night pack — the object stopped being the same object; the gradient, mesh and tint now pin `--brand-l` while only the action flips. (b) the family's translucent inks (0.66/0.72) are tuned to ITS dark meshes; on a brighter brand they read 2.55–3.78, so the card's anchors are capped with `min()` at 0.44/0.48 and its labels rose to 0.92. (c) the probe itself was wrong first: it composited translucent ink over WHITE, reporting a colour never on screen — fixed to composite over each end before any of this was believed

- [x] G7: The new section is enforced by the gates that read the registry
  CHECK: node tools/qa/pointer-reachable.mjs; node tools/qa/spec-row-qa.mjs; npm run qa:source
  EXPECT: brandwork at zero; composition green; twelve source gates green
  EVIDENCE: `madar-brandwork unreachable=0`; POINTER_REACHABLE=ok (0); SPEC_ROW_RENDER=ok; twelve source gates ok — after two real catches on this very code: an `aria-labelledby` on a bare div (generic refuses a name) and a `border-radius` transition on a chip whose radius never changes

- [x] G8: Screenshots, both packs and more than one brand
  CHECK: gates/screenshots/qa-brand-*.png
  EXPECT: the card as an object in violet/light, ember/night, teal/light; the glass over a brand mesh
  EVIDENCE: four files, looked at

## Divergences and what is not claimed

- The edge axis (`data-radius`) scales the UI ladder only — control, field, card, feature. The photographed family's own radii (`--r-widget: 52px`, `--r-sheet: 30px`) are its material, not a preference: a 52px widget at `sharp` would stop being that object. Nothing measures that decision; it is a judgement, written here.
- The eight brands are a STARTING set chosen for character, not the owner's own palette file — that file replaces the anchor blocks in `brands.css` and the rows in `src/brands.ts`, two files, no component touched.
- `--brand-tint` and `--brand-gradient-soft` are published and used by the glass pane; no other component reads them yet.
- The gradient card is built in the material vocabulary the owner already ruled in (five turning pools, one grain layer, one light from above). It is deliberately NOT a new visual direction: the reference folder that is to set that direction has not reached this session.
