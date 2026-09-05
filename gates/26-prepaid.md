# Gates: prepaid — the balance read as time, to the day you can top up

The roadmap's third round asked «كم يكفيني الرصيد؟» and planned "balance ÷ rate =
6 days". Built, that number is wrong twice: the days are not equal (a weekend at
home draws half again as much as a weekday), and "6 days" still leaves the real
question to mental arithmetic — does it last until I can pay?

Family: `src/madar/components/prepaid.tsx`, `PrepaidRunway`. Hosted in the
Energy section after `LoadComb`. Every claim below is a number from a browser.

## The drawing

| element | what it is | how it is drawn |
|---|---|---|
| the axis | kilowatt-hours, cut into the coming days | each day a cell as WIDE as its usual draw — §15, in unequal units |
| the balance | measured | one solid length of ink from the start |
| where it ends | derived: a named day, a time of its day | a solid tick standing above the axis |
| the top-up day | a plan, the only control | a hollow marker ringed in surface (§15-ب: a plan is not a measurement) |
| the shortfall | the verdict | a hatched gap in danger colour from the balance's end to the marker — its LENGTH IS THE MISSING ENERGY |
| the leak | the same verdict on the card's edge | `madar-leak`, only while short |

Defaults: balance 58; days 12, 17, 16, 11, 11, 12, 11, 12, 17, 16 (total 135);
top-up on day index 5 (needs 67; short by 9). One day back needs 56 and the
verdict flips.

Checked before writing and not reused (in the file header): `ConsumptionBand`
(a fixed scale), `DayStrip` (24 equal hours), `TariffLadder` (price changes along
a length), `LoadComb` (counted units of one size).

## Gates

- [x] G1: Production build succeeds on the final artefact
  CHECK: npm run build > log 2>&1; echo BUILD_EXIT=$?
  EXPECT: BUILD_EXIT=0
  EVIDENCE: BUILD_EXIT=0 on each of the four builds this family took (first draft, article fix + focus fix, hollow marker, axis-as-slider)

- [x] G2: All thirteen source gates on the final source
  CHECK: npm run qa:source
  EXPECT: every line =ok
  EVIDENCE: GEOMETRY ROW_CLAIMS COMPOSITION DEPTH_POLICY NO_RAW_MARKDOWN ANTI_SLOP_30 HOVER_POLICY IMPORTED_VARS ARIA_NAME_LEGAL DEAD_TRANSITIONS FOCUS_RING_INTACT THEME_DETECTION — all ok

- [x] G3: The lengths ARE the arithmetic — balance, shortfall, marker, and the count of days
  CHECK: node tools/qa/energy-qa.mjs (the runway batch: rects relative to the track, direction-aware)
  EXPECT: balance 58/135 = 42.96%; shortfall from 42.96% to 67/135 = 49.63% (width 6.67% = 9 kWh); marker centre at 49.63%; 9 boundaries for 10 days
  EVIDENCE: RUNWAY balance=43.00% shortfall=43.00→49.63% thumb=49.63% edges=9 — the 0.04 is the track's 1px border inside the measured rect; tolerance 0.6%

- [x] G4: The leak is a verdict, not a decoration — it goes out when the plan changes and comes back when it changes back
  CHECK: node tools/qa/energy-qa.mjs — focus the axis, ArrowRight (back, in Arabic), ArrowLeft (forward)
  EXPECT: leaks in the panel 2 → 1 → 2; data-short true → false → true; the shortfall hatch absent at 1
  EVIDENCE: leaks 2→1→2; after one day back: top-up 4, short=false, hatch=null; forward restored top-up 5. The panel's old rule "exactly one card leaking" became "exactly two, both verdicts" with the reason written in the harness

- [x] G5: The axis is one slider and the arrows follow the WRITING direction, both ways (§33)
  CHECK: node tools/qa/operable.mjs (keyboard case for madar-energy: forward then back, in rtl and in ltr)
  EXPECT: forward moves data-top-up; back returns it; in both directions; OPERABLE=ok
  EVIDENCE: OPERATED=85 OPERABLE_FAILURES=0; probe: rtl ArrowRight 5→4, ArrowLeft 4→5, Home→1, End→10; ltr ArrowLeft back, ArrowRight forward — direction read from the element at the keystroke via `move(…, rtl)`, which now takes it as a parameter instead of assuming the document's

- [x] G6: A press on the axis lands the marker on the nearest day boundary and leaves focus on the axis
  CHECK: node tools/qa/energy-qa.mjs — mouse.click at 21.5% of the axis (29 of 135 kWh is day 2's start)
  EXPECT: data-top-up=2; document.activeElement is the axis
  EVIDENCE: press@21.5%→day 2 focused=true. First draft lost focus the instant it took it — the mouse events after pointerdown moved focus off — fixed with preventDefault on pointerdown; found because the probe's next two arrows moved nothing

- [x] G7: The cursor that promises a press is on a focusable element (gates/25), and the section stays at zero
  CHECK: node tools/qa/pointer-reachable.mjs with madar-energy added to OWN
  EXPECT: madar-energy unreachable=0; POINTER_REACHABLE=ok
  EVIDENCE: first draft: 13 unreachable — the pressable track was a div with the focusable thumb OUTSIDE it, and operable said the same thing in other words ("cannot be reached by keyboard"). The axis became the slider element and the marker a drawing inside it; madar-energy unreachable=0 declared-decoration=112; POINTER_REACHABLE=ok (0). madar-energy is now enforced, not counted

- [x] G8: One meaning, one drawing (§27) — the measured run-out and the planned top-up are not the same shape
  CHECK: look at gates/screenshots/qa-prepaid-light-rtl.png
  EXPECT: a solid tick where the balance ends; a hollow ringed marker at the top-up day
  EVIDENCE: first screenshots showed two near-identical vertical bars, and the marker's grey bar vanished over the ink fill. Now: solid 2px ink tick; hollow 10px marker with a 2px surface ring and a 2px danger/ink-2 border, legible over fill and hatch alike in light, night and coral

- [x] G9: Both directions and a dark pack, at the DEFAULT state
  CHECK: node prepaid1.mjs (reloads before capture so no interaction leaks into the picture)
  EXPECT: gates/screenshots/qa-prepaid-{light-rtl,night-rtl,coral-ltr}.png
  EVIDENCE: all three captured and looked at: fill from the reading-start edge in each, days labelled in reading order, shortfall hatch in danger between tick and marker, leak on the card's bottom edge, verdict in danger ink. First capture was taken after the probe had moved the marker and was retaken

- [x] G10: The composition of the host section is unbroken
  CHECK: node tools/qa/spec-row-qa.mjs (madar-energy is in its SECTIONS)
  EXPECT: SPEC_ROW_RENDER=ok
  EVIDENCE: SPEC_ROW_FAILURES=0 SPEC_ROW_ERRORS=0 SPEC_ROW_RENDER=ok; narrow rtl/ltr overflow 0px

- [x] G11: No live region — the verdict travels in the slider's own value text
  CHECK: read aria-valuetext after each move
  EXPECT: one sentence carrying the day and the verdict
  EVIDENCE: "الشحن يوم الثلاثاء، ينقصك 9 ك.و.س حتى يوم الشحن" → "الشحن يوم الاثنين، يكفي حتى يوم الشحن ويفضُل 2 ك.و.س"; no aria-live anywhere in the file (MOTION-VOCABULARY prohibition 8)

## Divergences and what is not claimed

- Balance and per-day draws are props with defaults; nothing here reads a meter. `useLiveReading` was not wired in because the question is about the coming days, not the current tick.
- The days' labels are the axis's only text at 11px in `--text-3`; their contrast is the pack's existing pair and was not re-measured here.
- The press snaps to the nearest boundary; there is no drag. A drag would add a pointer-move loop for a control the arrows already operate precisely.
- A probe-side error is recorded: two runs of the screenshot probe timed out waiting for the section, while an identical script on another port found it in 500ms. The port had been held by a server orphaned from an earlier run (killing `npx` does not kill the `vite` it spawned). Probes now spawn detached and kill the process group; the failure was never the component's.
