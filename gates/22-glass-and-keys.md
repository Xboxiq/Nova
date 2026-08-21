# Gate 22 — the stated recipe, and one grammar in two keys

The owner sent fourteen more reference images with four words: **«أفعل نفس الشيء مع
هذه الصور»** — do the same thing with these. "The same thing" is the pipeline the
last two rounds established, and its first step is not code. It is measuring the
batch, because a batch of fourteen crops is not fourteen designs.

Measured, the fourteen were **five** artefacts, and one of the five was not a
design at all.

| the batch | what it actually is | what was built |
| --- | --- | --- |
| 2 crops, green field + glass folder + phone | one compliance app | `DocFolder`, `ReviewTrack`, `ComplianceScreen` |
| 4 crops, violet dark board | one engineering board | `TimeSheet`, `ArcGauge`, `TaskCard`, `LaneBoard`, `UploadFeed` |
| 1 slide, lavender palette | the slide already in the library, on another ground | `PaletteSlide` gained `tone` — 9 lines, no new component |
| 3 crops, light learning hub | one hub | `CourseCard`, `TrackGantt`, `TaskLane`, `LearnHub` |
| 5 crops, glass blobs + **the recipe slide** | one hydration app, and its spec | `pane()`, `CurveCard`, `BlobStat`, `VitalsScreen`, `GlassRecipe` |

## What the batch handed over that the last one did not

One slide carries the effect values written on the artboard: Background Blur 20 ·
White Stroke 35% · Soft Shadow Y:8 Blur:30 12% · Top Highlight 1px White · Inner
Shadow 0/1/8 20% · Transparent Fill 25%.

Being handed the numbers is what made the file a file. Two unrelated products in
the batch — a legal compliance app on emerald, a hydration tracker on aqua — are
the *same pane* over different grounds. Typed at each use site, those two would
drift apart inside a week of edits, so the six numbers are five tokens in
`bridge.css` (§28) and one function in `glasswork.tsx`.

## Gates

Run with `node .claude/skills/unlazy/scripts/gate-check.mjs --timeout 300` — G14's
check drives six sections through seven theme packs at two viewports and outgrew the
checker's 120-second default. At the default it reports `(no output)`, which is the
timeout and not a failure. Note also that the checker rewrites this file from the
copy it read at startup, so an edit made while it runs is lost: edit it, then run it.

- [x] G1: The batch was deduplicated before any code was written
  Fourteen crops, five artefacts: three of them assembled from crops of one screen.
  Two files hold all five, because the compliance and hydration apps share a pane
  and the two boards share a grammar.
  CHECK: ls src/madar/components/glasswork.tsx src/madar/components/projectwork.tsx
  EXPECT: /projectwork.tsx/m
  EVIDENCE: src/madar/components/glasswork.tsx | src/madar/components/projectwork.tsx

- [x] G2: Four duplicates refused in writing, not silently
  Kanban board, progress donut, calendar, file tree — each refusal names the
  component that already does the job, in the file header and on the page.
  CHECK: grep -o 'KanbanBoard\|SplitDonut\|CalendarMonth\|TreeView' src/madar/components/projectwork.tsx | sort -u | wc -l
  EXPECT: 4
  EVIDENCE: 4

- [x] G3: The handed numbers are named, not typed
  The recipe slide states six values. None is written at a use site.
  CHECK: grep -c 'blur(20px)' src/madar/components/glasswork.tsx; echo "grep_exit=$?"
  EXPECT: grep_exit=1
  EVIDENCE: 0 | grep_exit=1

- [x] G4: A recurring design is a key, not a second component
  PaletteSlide, ArcGauge, TaskCard and LaneBoard each have one implementation and
  two palettes.
  CHECK: grep -c "tone = 'dark'\|tone = 'light'\|tone?: Key" src/madar/components/projectwork.tsx
  EXPECT: /^[1-9]/m
  EVIDENCE: 8

- [x] G5: Both keys are on the page
  The light key's lane-heading ink was correct and unproven: mutating it back to the
  raw hue was NOT caught until a light LaneBoard was rendered in the section. With
  it, the same mutation produces six axe violations. A key that is not rendered is a
  claim nothing measures.
  CHECK: grep -c 'tone="light"' src/madar/showcase/sections/Projectwork.tsx
  EXPECT: /^[3-9]/m
  EVIDENCE: 4

- [x] G6: Every reading is derived
  The folder summed to 23 pages in the first draft and honestly printed 23; the
  reference says 12, so the sheets changed, not the print.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/glasswork.tsx","utf8");console.log("SHEETS_SUM="+[...s.matchAll(/pages: (\d+)/g)].map(m=>+m[1]).reduce((a,b)=>a+b,0))'
  EXPECT: SHEETS_SUM=12
  EVIDENCE: SHEETS_SUM=12

- [x] G7: No reading is derived from a row index
  TaskLane printed `(i + 1) / (n + 1)` as a completion percentage — an invented
  number wearing a percent sign, which is what the rest of the file refuses.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/projectwork.tsx","utf8");console.log(/progress: number/.test(s)&&!/tasks.length \+ 1/.test(s)?"PROGRESS_IS_DATA":"PROGRESS_IS_INDEX")'
  EXPECT: PROGRESS_IS_DATA
  EVIDENCE: PROGRESS_IS_DATA

- [x] G8: Interactions are reachable, consequential and direction-correct
  Nineteen new probes across the two sections. The harness's keyboard probe had
  `aria-selected` hardcoded from the grid it was first written for; a radio group
  states itself with `aria-checked`, so the state attribute became the case's to
  declare rather than the harness's to dictate.
  CHECK: node tools/qa/operable.mjs 2>&1 | grep -E '^OPERATED|^OPERABLE='
  EXPECT: /OPERABLE=ok/m
  EVIDENCE: OPERATED=45 interactions | OPERABLE=ok

- [x] G9: A decoration may not intercept a control
  The 208px arc overflowed its 162px box and the aria-hidden svg swallowed the click
  meant for the second legend pill. Nothing looked wrong; the harness found it.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/projectwork.tsx","utf8");console.log(/pointerEvents: .none./.test(s)?"ARC_REFUSES_POINTER":"ARC_EATS_CLICKS")'
  EXPECT: ARC_REFUSES_POINTER
  EVIDENCE: ARC_REFUSES_POINTER

- [x] G10: The fan's back sheets are reachable by a hand as well as a test
  Raising the selected sheet's z-index put it over the middle of every sheet behind
  it. Selection became a lift, and the fan pitches below each sheet's own height.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/glasswork.tsx","utf8");console.log(/zIndex: i,/.test(s)&&/FAN_PITCH = 54/.test(s)?"FAN_FLAT_STACK":"FAN_REORDERS")'
  EXPECT: FAN_FLAT_STACK
  EVIDENCE: FAN_FLAT_STACK

- [x] G11: A component owns its ground, and the fix is smaller than the bug
  SplitDonut measured 1.64:1 in the night pack at 390px. Every value in it is chosen
  for white and both original call sites wrapped it in a white card; a third forgot.
  `ground` now paints it and both wrappers were deleted.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/showcase/sections/Boards.tsx","utf8");console.log("DONUT_WRAPPERS="+(s.match(/background: .#fff., padding/g)||[]).length)'
  EXPECT: DONUT_WRAPPERS=0
  EVIDENCE: DONUT_WRAPPERS=0

- [x] G12: Selection is added, never subtracted
  Course cards at 0.66 and arc bands at 0.5 greyed out the black plate the card
  exists to carry, and turned amber to brown and green to sludge.
  CHECK: node -e 'const f=require("fs");let n=0;for(const x of ["glasswork","projectwork"])n+=(f.readFileSync("src/madar/components/"+x+".tsx","utf8").match(/opacity: on \? 1 :/g)||[]).length;console.log("FADED_SELECTIONS="+n)'
  EXPECT: FADED_SELECTIONS=0
  EVIDENCE: FADED_SELECTIONS=0

- [x] G13: The geometry ceilings held while the family grew
  Two new families and 33 more distinct colours, and the twin count did not move.
  One candidate appeared — an off-white for ink against an off-white for a ground,
  1.4 apart — and the ground moved rather than the ceiling.
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep -E 'ANGLES|RADII|SHADOWS|TWINS|GEOMETRY='
  EXPECT: /GEOMETRY=ok/m
  EVIDENCE: COLOUR_TWINS=10 within RGB distance 4 (ceiling 10) | GEOMETRY=ok

- [x] G14: Eight contrast defects fixed at the palette, not at eight sites
  White on the accent 4.23; the leader row's role line 2.95; the light key's label
  3.96-4.22 in three places; the priority chip 1.57 (hue ink on an 18% tint of
  itself); the lane heading 4.48 dark and 2.19 light; the course footer on the raw
  gradient; the blob text about 2:1 under white, which no checker reports because
  axe skips a gradient background; the day pills ghostly.
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|CONTRAST_FAILURES'
  EXPECT: AXE_VIOLATIONS_MADAR=0
  EVIDENCE: CONTRAST_FAILURES=0 | AXE_VIOLATIONS_MADAR=0

- [x] G15: The slop standard was obeyed where it was right
  Rule 04 bans five specific hexes and correctly flagged both of my first guesses at
  the reference's accent. The board stays purple; it does not have to be the default
  purple, and #6d3ce0 also clears 6.2:1 under white where #8b5cf6 did not.
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | grep -E '^ANTI_SLOP_30'
  EXPECT: ANTI_SLOP_30=ok
  EVIDENCE: ANTI_SLOP_30=ok

- [x] G16: Three helpers stopped being two drifted copies each
  isRtl, move, n and smooth existed twice each in credit.tsx and boards.tsx, already
  drifted: one copy treated ArrowUp/Down as no-ops on a one-dimensional strip. A
  third pair was about to be written, so they moved to roving.ts and the stepping
  version won. Net deletion.
  CHECK: grep -l 'function move' src/madar/components/*.ts src/madar/components/*.tsx | tr '\n' ' '
  EXPECT: /^src\/madar\/components\/roving.ts *$/m
  EVIDENCE: src/madar/components/roving.ts

- [x] G17: A sentence about a rule is not a breach of it
  The scanner flagged the comment recording why a banned violet was not used.
  geometry.mjs had already learned that comments are not drawings.
  CHECK: node -e 'const s=require("fs").readFileSync("tools/qa/anti-slop-30.mjs","utf8");console.log(/is not a drawing/.test(s)?"PROSE_SKIPPED":"PROSE_COUNTED")'
  EXPECT: PROSE_SKIPPED
  EVIDENCE: PROSE_SKIPPED

- [x] G18: The build and the types are clean from scratch
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 1.64s

- [ ] G19: The upload advances on its own
  CHECK: echo abandoned
  EXPECT: never
  EVIDENCE: pending

- [ ] G20: The recipe prints its tokens' computed values
  CHECK: echo abandoned
  EXPECT: never
  EVIDENCE: pending

ABANDON: G19 UploadFeed shows 43% because the reference does, and the step is a button. A specimen that advances on its own is a thing a reader cannot inspect, and nothing here talks to a network. The ceiling is written at the call site with a ponytail marker.

ABANDON: G20 GlassRecipe draws the pane from the tokens and names them beside it; it does not print their computed values. Reading them back would need a layout effect per row to show what the stylesheet already says one line away.

## The two decisions still open

Both were raised at «جاهز للدمج؟» and are still the owner's:

1. `studies/` now partly duplicates `src/`. `credit-app` (×4) and
   `arounda-palette` are fully superseded; `nursing-dashboard` and `insightos`
   partly; `product-card` is still unique. Delete the superseded ones and correct
   the quarantine rationale in `studies/README.md`, or keep them as references?
2. `REFERENCE_GREY_CONTRAST=132` nodes below AA using the reference's own greys,
   under a ceiling of 300, documented in `design-system/REFERENCE-CONTRAST.md`.
   Full AA, sixth pack only, or as-is?
