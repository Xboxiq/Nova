# Gates: appliance area — which appliance drinks the electricity, and why

The roadmap's second round: «أيّ جهاز يشرب الكهرباء؟». `LoadComb` answers the share
per category; what it cannot say is why. The water heater is the strongest thing
in the house and the refrigerator the weakest, and neither is the biggest drinker
— energy is power TIMES time, and a kWh number hides which factor made it.

Family: `ApplianceArea` in `src/madar/components/energy.tsx`, hosted in Energy
after the night floor. Each appliance is a rectangle on one pair of axes: hours
across the day's twenty-four, watts up; its AREA is its energy, and the grid is cut
so every cell is one kilowatt-hour (500 W × 2 h) — counted, not estimated (§15),
against drawn axes (§14). The hours are the control: one slider per appliance, the
arrows following the writing direction (§33), so "an hour less of cooling" is a box
that visibly shrinks by a countable number of cells.

Defaults: AC 1800 W × 9 h = 16.2; water heater 3000 W × 1.5 h = 4.5; refrigerator
150 W × 24 h = 3.6 kWh/day. Verdict: the AC at 4.5× the refrigerator.

## Gates

- [x] G1: Production build succeeds on the final artefact
  CHECK: npm run build > log 2>&1; echo BUILD_EXIT=$?
  EXPECT: BUILD_EXIT=0
  EVIDENCE: BUILD_EXIT=0, twice (draft; the watts label moved clear of the heater's box)

- [x] G2: Each box is its arithmetic — width hours/24, height watts/3000 — and the grid is 12 × 6
  CHECK: node tools/qa/energy-qa.mjs — rects of [data-area] against [data-axes]; count of grid lines
  EXPECT: 37.5%×60%, 6.25%×100%, 100%×5%; 11 column lines and 5 row lines
  EVIDENCE: boxes 37.4×59.6, 6.2×99.4, 99.7×5.0 (the 1.5px outlines account for the fractions); grid 12×6

- [x] G3: The labels are the products, and the verdict names the largest against the smallest
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: 16.2, 4.5, 3.6; "التكييف — 4.5× الثلاجة"
  EVIDENCE: kwh=16.2,4.5,3.6; "الأكبرُ شربًا: التكييف — 4.5× الثلاجة". The first read said 16.2.. — the probe stripped every non-digit and kept the dots of ك.و.س; it now takes the first number

- [x] G4: An hour less of cooling is two back-steps, and the box, the label and the value agree
  CHECK: node tools/qa/energy-qa.mjs — focus the AC slider, ArrowRight ×2 (back, in Arabic)
  EXPECT: width 8/24 = 33.3%, label 14.4, aria-valuenow 8
  EVIDENCE: hour-less → 33.2% 14.4 aria-valuenow=8; the verdict re-derives to 4.0× in the screenshots taken at that state

- [x] G5: Every slider is reachable and the section stays at zero under the pointer gate
  CHECK: node tools/qa/pointer-reachable.mjs
  EXPECT: madar-energy unreachable=0
  EVIDENCE: madar-energy unreachable=0; POINTER_REACHABLE=ok (0) — the tracks carry the pointer cursor and are the focusable sliders themselves, as the runway's axis is

- [x] G6: Seven packs, two widths, axe and APCA
  CHECK: node tools/qa/madar-qa.mjs (madar-energy in PACK_SECTIONS)
  EXPECT: AXE_VIOLATIONS_MADAR=0 CONTRAST_FAILURES=0 OVERFLOW=none
  EVIDENCE: AXE_VIOLATIONS_MADAR=0 CONTRAST_FAILURES=0 APCA_BELOW_BODY=16 (ceiling 16) OVERFLOW=none, exit 0

- [x] G7: The other harnesses agree
  CHECK: npm run qa:source; node tools/qa/spec-row-qa.mjs
  EXPECT: all ok
  EVIDENCE: twelve source gates ok; SPEC_ROW_RENDER=ok

- [x] G8: Screenshots in both directions and a dark pack, at "an hour less"
  CHECK: node aa.mjs
  EXPECT: gates/screenshots/qa-appliance-area-{light-rtl,night-rtl,coral-ltr}.png
  EVIDENCE: captured with the AC slider focused at 8 h; looked at. The origin sits at the inline start in each direction, the heater is the tall narrow box, the refrigerator the low strip across the whole day, and the AC's box shows the missing cells. First capture had the "3,000 واط" label inside the heater's box; it now sits above the axes at the origin side, as the cell legend sits above at the far side

## Divergences and what is not claimed
- Three appliances with fixed watts; the hours are the only live input. Watts are a nameplate, hours are a habit — the habit is what a household can change.
- Overlapping boxes share the origin, so the smallest lies inside the largest; the outlines and the 14% fills keep each edge readable at three, not at ten.
- Hours snap to half an hour. A slider that snaps is a slider whose every position is a countable state.
- The cost in money is not shown; the tariff ladder is where price lives, and a second price here would be the "two sources for one fact" defect.
