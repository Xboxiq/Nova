# Gates: night floor — is something running while you sleep?

The roadmap's fourth round: «هل هناك ما يعمل ولا يجب؟». The floor is the least any
hour draws between one and five in the morning, and a house has a usual floor
the way it has a usual monthly total. One high night is a spike; three in a row
is an appliance that never turned off. A mean over fourteen nights hides the run,
and the run IS the finding — that is what a number cannot say.

Family: `NightFloor` in `src/madar/components/energy.tsx`, drawn with
`MiniBarChart`, which was EXTENDED rather than duplicated: it gains a hatched
usual `band` on the same scale (§14, §11) beside its existing target line, and
one keyboard tab stop whose arrows walk the bars and reveal each value — what the
mouse had on hover. Hosted in Energy after the prepaid runway.

Defaults: fourteen floors, eleven between 0.28 and 0.35 kWh/h, then 0.71, 0.74,
0.69. Band = min..max of the eleven. Run = trailing nights above the band = 3;
three make a verdict and the card leaks; one or two are named as such in warning
ink and do not.

## Gates

- [x] G1: Production build succeeds on the final artefact
  CHECK: npm run build > log 2>&1; echo BUILD_EXIT=$?
  EXPECT: BUILD_EXIT=0
  EVIDENCE: BUILD_EXIT=0 on each of the four builds this family took (draft; three visual fixes; role for the named stop; ink tokens)

- [x] G2: The band holds every baseline cap and none of the run's, on the bars' own scale
  CHECK: node tools/qa/energy-qa.mjs — rects of [data-band] and every [data-bar] cap
  EXPECT: eleven caps inside the band's vertical extent (±1.5px), three above it; data-run=3
  EVIDENCE: NIGHT_FLOOR run=3 band=4577.3–4584.7 baseline-caps-in-band=true run-caps-above=true

- [x] G3: The tone sits on exactly the run's caps, and the eleven others share one other colour
  CHECK: node tools/qa/energy-qa.mjs — borderTopColor of every cap
  EXPECT: last three one colour; first eleven another single colour
  EVIDENCE: run-tone-on-last-3-only=true. The first draft of this check compared caps with the verdict TEXT and broke the moment text moved to the ink token — a tone is for fills, an ink for text, and the gate now says so

- [x] G4: The leak is a verdict — three cards leak on load, each for a reason, and the runway's still goes 3→2→3 with the arrows
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: leaks=3 (band above usual, runway short, night floor running); 3→2→3 across the runway's keys
  EVIDENCE: leaks 3→2→3; ENERGY_CHECKS=ok

- [x] G5: The values are reachable by keyboard — one stop, the forward arrow follows the writing direction
  CHECK: node tools/qa/energy-qa.mjs — focus [data-barchart], read which value has opacity 1, ArrowLeft, read again
  EXPECT: focus reveals night 0; ArrowLeft (forward in Arabic) reveals night 1 and only it
  EVIDENCE: reveal 0→1, one revealed at a time. First read said −1: the value fades in over 180ms and the probe read at 150ms — the probe waits past the transition now (a null is a probe error until proven otherwise)

- [x] G6: A revealed night keeps its own colour — the reveal is the value, never the verdict's tone (§27)
  CHECK: look at gates/screenshots/qa-night-floor-light-rtl.png with night 23 revealed
  EXPECT: night 23 shows "0.29" in accent with an accent hatch; the three run bars alone are danger
  EVIDENCE: first screenshots showed the revealed baseline bar painted in danger — `loud || hov` shared one colour path; the bar keeps its encoding and only the value text and hatch take the accent on reveal. Retaken and looked at in light, night, coral

- [x] G7: Fourteen columns fit the card, and the band's label sits clear of the bars
  CHECK: the screenshots; the energy panel's OVERFLOW in madar-qa
  EXPECT: bar 5 (the last) fully inside; label at the plot's top inline-end corner
  EVIDENCE: first screenshots clipped the last bar and laid the label across the run — `gap` became a prop (4 for fourteen nights), columns got min-width 0, the label moved to the top corner. OVERFLOW=none across 7 packs

- [x] G8: The named stop may carry a name
  CHECK: npm run qa:source (aria-name-legal)
  EXPECT: ARIA_NAME_LEGAL=ok
  EVIDENCE: first run FAIL — a `<div aria-label>` with no role; role="group" added; ok

- [x] G9: Energy joins the pack sweep, and clears it in seven packs
  CHECK: node tools/qa/madar-qa.mjs with madar-energy in PACK_SECTIONS
  EXPECT: AXE_VIOLATIONS_MADAR=0, CONTRAST_FAILURES=0, OVERFLOW=none
  EVIDENCE: first sweep found ONE contrast node in energy, light 1440: not this card — the AllocationBar's "over by 40" in `--danger` at 12px on the surface, 4.44:1 against 4.5. Energy had simply never been swept. Fixed at the root: madar now aliases the four `-ink` tokens (the tone mixed 76% toward the pack's ink) and every small toned TEXT in energy and the runway uses them; the tones stay on fills and hatches. Second sweep: AXE_VIOLATIONS_MADAR=0 CONTRAST_FAILURES=0 APCA_BELOW_BODY=16 (ceiling 16) OVERFLOW=none, exit 0

- [x] G10: Screenshots in both directions and a dark pack
  CHECK: node nf.mjs
  EXPECT: gates/screenshots/qa-night-floor-{light-rtl,night-rtl,coral-ltr}.png
  EVIDENCE: captured with the second night revealed by keyboard in each; looked at

## Divergences and what is not claimed
- The floors are props with defaults; nothing reads a meter. The 1–5 a.m. window is stated in the footer, not computed from hourly data.
- The band is min..max of the baseline nights, not a percentile. Eleven nights is too few for a percentile to mean more than the range does.
- The run counts strictly-above-band nights from the end; a night exactly at the band's top breaks the run. Written here so it is a decision, not an accident.
- The value reveal is one stop with fourteen arrow positions; fine for fourteen, hostile for a hundred.
