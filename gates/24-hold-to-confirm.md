# Gates: hold to confirm — the first button the motion budget says should exist

VISUAL-LAW §32 asks, before "how does it move", "how many times a day is it
seen". Thirty-four button forms sit in `src/components/ui/` and every one of
them animates to decorate a click; none makes an irreversible action safe. This
is the one kind of button §32 says deserves motion — seen once, with a
consequence — and the motion is the time still left to let go.

Family: `src/components/nova/hold-to-confirm.tsx`. Hosted in `NovaInstruments`
in both directions. Every claim below is a number from a browser.

## What the corpus had, and what this is

| form | what happens on the press | can it be stopped? |
|---|---|---|
| `shredder-button` | one-shot destroy keyed to `:focus` | no |
| `delete-tooltip-button` | plain click with a label | no |
| `not-allowed-button` | refuses to act at all | — |
| **`hold-to-confirm`** | nothing, until 1200ms of continuous hold | **yes, at any instant before** |

The motion is one registered scalar, `--nv-hold`, and everything visible is
arithmetic on it: the fill is `inset-inline-end: calc((1 - hold) * 100%)`, the
colour is `color-mix(danger calc(100% - hold * 22%), ink)`, the lead hairline is
`opacity: hold`. Release, and all three fall back on the same transition.

## Gates

- [x] G1: Production build succeeds on the final artefact
  CHECK: npm run build > log 2>&1; echo BUILD_EXIT=$?
  EXPECT: BUILD_EXIT=0
  EVIDENCE: BUILD_EXIT=0 (after two builds broken by a backtick inside the styled template — counted before the third: 0)

- [x] G2: All thirteen source gates, including the two this batch added
  CHECK: npm run qa:source
  EXPECT: every line =ok
  EVIDENCE: GEOMETRY ROW_CLAIMS COMPOSITION DEPTH_POLICY NO_RAW_MARKDOWN ANTI_SLOP_30 HOVER_POLICY IMPORTED_VARS ARIA_NAME_LEGAL DEAD_TRANSITIONS FOCUS_RING_INTACT THEME_DETECTION — all ok; depth-policy accepts the inset well, hover-policy accepts `:hover, :focus-visible` paired in one rule

- [x] G3: The registered control is reachable and a click has a visible consequence — the REFUSAL
  CHECK: node tools/qa/operable.mjs
  EXPECT: OPERABLE=ok and the count rises from 80
  EVIDENCE: OPERATED=82 OPERABLE_FAILURES=0 — 80 + the registered refusal (data-state idle→nudged on click) + sweep 6's per-section count on the newly visited madar-nova-instruments, which also verified the new button is clipped by no ancestor

- [x] G4: The fill grows from the reading-start edge in BOTH directions with one rule and no `[dir]` override
  CHECK: node hold1.mjs — fromRight/fromLeft of the fill against the well, at rest and during the hold
  EXPECT: rtl anchored fromRight 0, ltr anchored fromLeft 0
  EVIDENCE: rtl AT_REST fromRight=0, HOLD fromRight=[0] throughout, widths 0→10→19→29…; ltr AT_REST fromLeft=0, mid-hold fromLeft=0

- [x] G5: The timer that commits and the transition that draws agree
  CHECK: node hold2.mjs — in-page requestAnimationFrame sampler, no round trips between samples
  EXPECT: done within a frame of the fill reaching 100%
  EVIDENCE: 83 distinct --nv-hold values rising linearly; data-state=done at 1208ms (nominal 1200); the done rule pins the fill full so the two are indistinguishable

- [x] G6: A short click does NOT confirm, and visibly says so; an aborted hold falls back quietly
  CHECK: node hold1.mjs
  EXPECT: click → nudged → idle within 1.15s; 0.5s hold released → idle, not nudged
  EVIDENCE: AFTER_CLICK state=nudged hint="امسك، لا تنقر"; +1.15s idle with the original hint; EARLY_RELEASE hold=0.51 → 80ms later state=idle (first draft landed in nudged — a native button fires click after a release; fixed with a 200ms elapsed guard)

- [x] G7: Every cancel path cancels, and the keyboard holds exactly like the pointer
  CHECK: node hold1.mjs
  EXPECT: pointerleave, blur, Space/Enter keyup all → idle with no late commit; Enter held → done
  EVIDENCE: POINTER_LEAVE → idle, 1s later idle; SPACE held 0.4 then released → idle; ENTER held 1.5s → done "Deleted"; Tab lands with the project's ring 3px solid (no outline of its own)

- [x] G8: Reduced motion does NOT shorten the hold, and the fill still reads
  CHECK: node hold2.mjs under reducedMotion: reduce
  EXPECT: commit still at ~1200ms; the fill in discrete steps on the commit's own clock
  EVIDENCE: six values at t = 0, 201, 401, 601, 802, 1001ms; done at 1203ms; held button computes transition-property: none. First draft: a CSS steps(6) transition was overruled by bridge.css:329 `.madar-surface * { transition-duration: 1ms !important }` — fill read 1 at 16ms while cancellable until 1199. The stepped fill is now driven by the commit timer, which no blanket can reach

- [x] G9: Contrast is a RANGE over the hold, and the low end clears AA in all seven packs, both directions
  CHECK: node hold3.mjs — outer label, hint, and the fill-clipped copy at hold 0.06 and 0.92, 14 rows
  EXPECT: every cell ≥ 4.5; the late end above the early end in every pack
  EVIDENCE: worst idle label 6.01 (night), worst hint 6.06 (iris), lit copy 4.92 at 0.06 → 5.80 at 0.92 (night, the minimum); light 5.22→6.58, dark 7.11→8.22, expressive packs 5.8→7.1. First draft measured 3.74 (light) and 4.07–4.27 with the label switched to --nova-on-action mid-hold, and white-on-white at hold 0; --nova-on-action rejected by measurement (3.09 in mint on danger)

- [x] G10: The two label copies coincide glyph on glyph
  CHECK: node hold3.mjs — Range rects of the text in both copies
  EXPECT: |dx| ≤ 1 and |dy| ≤ 1 in every row
  EVIDENCE: dx 0, dy 0 in all 14 rows (the lit copy is sized 100cqi against the inset-0 well made a container)

- [x] G11: Screenshots in both directions and a dark pack, mid-hold, and LOOKED AT
  CHECK: node hold4.mjs; then view
  EXPECT: mirrored fills, one word changing colour at the fill edge
  EVIDENCE: gates/screenshots/qa-hold-to-confirm-{light,night}-{rtl,ltr}.png at --nv-hold 0.64–0.75. The first set showed a smeared label: well at z -1 and label at z 1 painted BOTH copies over the fill a sub-pixel apart — every one of fourteen contrast rows and the coincidence check had passed. Swapped; re-shot; the four now read as one word changing colour

- [x] G12: Icons
  CHECK: npm run qa:icons
  EXPECT: 0 under 3:1
  EVIDENCE: ICON_PLAQUES_MEASURED=928 across 8 theme values, ICON_CONTRAST=ok

- [x] G13: qa:madar twice on the final build, byte-identical, no new reference grey
  CHECK: npm run qa:madar (x2) | diff
  EXPECT: IDENTICAL; AXE 0; REFERENCE_GREY_CONTRAST unchanged at 203
  EVIDENCE: MADAR_EXIT 0 and 0, reports IDENTICAL; CONTRAST_FAILURES=0 AXE_VIOLATIONS_MADAR=0 AXE_VIOLATIONS_SHELL=0 RUNTIME_ERRORS=0 REFERENCE_GREY_CONTRAST=203 (unchanged — every text on the button passes AA in all seven packs, so it adds nothing to the allowance)

## What the record owes

Two probe errors and two build breaks, written down because a record with no
errors is a record nobody reads: a sampler awaited before the press so it
finished before anything happened (a `null` reading is a probe error until
proven otherwise, and it was); the idle label read from the first
`.hold__label`, which had become the fill copy; coincidence compared a
full-width box to a text box and could never pass; and a backtick in a CSS
comment inside the `styled.div` template closed the template, twice.

Two corrections to earlier records in this batch: the stepper's header said the
repository's reduced-motion blanket "resets no transitions at all" — true of
`styles.css:2150`, false of madar surfaces where `bridge.css:329` resets every
one; and the token-level reduced-motion fix I called a proposal there is a
precedent the repository already set for `--dur-1..4`.
