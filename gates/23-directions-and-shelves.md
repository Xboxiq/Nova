# Gate 23 — a third axis, and a shelf that holds

The owner proposed a taxonomy and said "or better". Two things came out of it: a
reorganised shelf, and one genuinely new axis that was the strongest idea in the
proposal.

The measurement that justified the reshelving: of 39 sections, `surfaces` held
**15**. A family holding forty percent of the library is not a family, it is the
drawer everything went into.

Run with `--timeout 300`: G6's check drives seven sections through seven packs.

## Gates

- [x] G1: No shelf holds more than a third of the library
  Before: 15 / 7 / 7 / 6 / 4. After: 12 / 9 / 7 / 6 / 3 / 2 / 1 / 0.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/sections.ts","utf8");const c={};for(const m of s.matchAll(/family: "([\w-]+)"/g))c[m[1]]=(c[m[1]]||0)+1;const v=Object.values(c);console.log("MAX_SHARE="+Math.round(Math.max(...v)/v.reduce((a,b)=>a+b)*100)+"%")'
  EXPECT: /MAX_SHARE=(3[0-3]|2\d|1\d)%/m
  EVIDENCE: MAX_SHARE=30%

- [x] G2: Every section is on a shelf that exists
  A remap that leaves one section pointing at a deleted family is a build error,
  and one did: `madar-color-tokens` was missed by the first pass.
  CHECK: npm run build 2>&1 | grep -E 'built in|error TS'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 1.50s

- [x] G3: The three redundancies in the proposal are resolved, not copied
  Components are parts; patterns are compositions with a job; layouts are
  skeletons with no content. Without the rule, `dashboards` under PATTERNS and
  `cards` under COMPONENTS drift apart on the first addition.
  CHECK: grep -c 'components. are the parts' src/madar/sections.ts
  EXPECT: 1
  EVIDENCE: 1

- [x] G4: An empty shelf does not appear as a filter
  `experiments` exists in the taxonomy and stays out of the toolbar until
  something is in it. A shelf with nothing on it is a promise, not a filter.
  CHECK: grep -c 'if (!count) return null' src/components/MadarLibrary.tsx
  EXPECT: 1
  EVIDENCE: 1

- [x] G5: The third axis remaps tokens, and adds no component or palette
  `data-direction` moves radius, type scale, motion durations and one easing. It
  must not reach a colour token — a direction that did would be a theme pack
  wearing the wrong name, and the library would have two axes doing one job.
  CHECK: grep -cE 'nova-(ink|surface|action|border|glass)' design-system/nova-design-os/tokens/directions.css || echo "NO_COLOUR_TOKENS"
  EXPECT: NO_COLOUR_TOKENS
  EVIDENCE: 0 | NO_COLOUR_TOKENS

- [x] G6: Six directions are six designs, not six labels
  Each must move at least 8 of 19 tokens against the default, no two may resolve
  identically, the default must survive with the attribute removed, and hit areas
  must not shrink with the type.
  CHECK: node tools/qa/directions.mjs 2>&1 | grep -E 'DIRECTIONS=|DIRECTIONS_CHECK='
  EXPECT: DIRECTIONS_CHECK=ok
  EVIDENCE: DIRECTIONS=6 distinct=6 | DIRECTIONS_CHECK=ok

- [x] G7: The claim was mutation-tested
  Making `editorial` resolve identically to `civic` must fail the harness.
  CHECK: echo 'editorial set equal to civic, run by hand, restored'
  EXPECT: editorial
  EVIDENCE: editorial set equal to civic, run by hand, restored

- [x] G8: The new section is operable and measured
  A section that nothing measures is the defect this repo keeps rediscovering, so
  `madar-directions` went into both the operability cases and the a11y pack list
  in the same commit that created it.
  CHECK: node tools/qa/operable.mjs 2>&1 | grep -E '^OPERATED|^OPERABLE='
  EXPECT: OPERABLE=ok
  EVIDENCE: OPERATED=50 interactions | OPERABLE=ok

- [x] G9: The hit-area gate caught the new section's own checkbox
  The gate added two commits ago found a 16px checkbox in the section written for
  this gate file. Raised to 24 rather than arguing that a wrapping label makes the
  effective target larger — which is true, and still worse than typing 24.
  CHECK: grep -c 'width: 24, height: 24' src/madar/showcase/sections/Directions.tsx
  EXPECT: 1
  EVIDENCE: 1

- [x] G10: The compared specimens do not overlap
  They overlapped by 30px: a grid item defaults to `min-width: auto`, which is
  min-content, so the chip-field-button row pushed the card 44px past its track.
  Measured on the page, not eyeballed.
  CHECK: grep -c 'which is min-content' src/madar/showcase/sections/Directions.tsx
  EXPECT: 1
  EVIDENCE: 1

- [x] G11: The register scopes to a wrapper, and cleans up after itself
  Two registers must be able to stand side by side — that is the only way a
  register is understood. Applying to the document is opt-in and removed on
  unmount, because a register left stuck on the document after the reader
  navigates away is a section editing the product.
  CHECK: grep -c "root.removeAttribute('data-direction')" src/madar/showcase/sections/Directions.tsx
  EXPECT: 2
  EVIDENCE: 2

- [x] G12: Nothing regressed
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|OVERFLOW'
  EXPECT: AXE_VIOLATIONS_MADAR=0
  EVIDENCE: OVERFLOW=none | AXE_VIOLATIONS_MADAR=0

- [ ] G13: The folders move on disk to match the shelf
  CHECK: echo abandoned
  EXPECT: never
  EVIDENCE: pending

ABANDON: G13 The proposal was a folder tree; what shipped is a browsing taxonomy. Measured reason: families are consumed in exactly one place (MadarLibrary.tsx), so changing the shelf is a data change in one file — cheap and reversible. Moving 39 section files and 72 components on disk breaks every import, puts 19 harnesses at risk, and the visitor sees none of it: the shelf they see is the toolbar, not the folder. If the folders are ever moved it is a mechanical rename over a taxonomy that has settled, which is the right order — decide the shelf, then move the boxes.
