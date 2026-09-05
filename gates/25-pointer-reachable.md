# Gates: a pointer cursor that a keyboard cannot follow

The second most repeated defect across twenty-eight imported uploads was the
mouse-only control — a drag-only deck, a hover-only tooltip, a `<div>` with an
`onClick`. Each painted `cursor: pointer` or `grab` and offered nothing to a
keyboard. `operable.mjs` catches this for controls someone registered; this
sweeps every element on every section for the cursor that promises action and
asks whether a keyboard can reach it. The cursor set is every value that is not
passive: `pointer`, `grab`, `grabbing`, `crosshair`, the resize arrows, `zoom-*`,
`help` — the first draft named only three and was widened after measuring the
source: madar's own `physics`, `kinetics99` and `consequence` paint `ew-resize`,
`ns-resize` and `crosshair`, and every one of them turned out reachable (0 new
offenders; 8 more elements in `DECLARED_DECORATION`).

Census on the day the gate was written, root `#main-content` per section:

| scope | unreachable pointer elements |
|---|---|
| shell | 0 |
| madar's own eleven sections | 0 each |
| `madar-imported` | 6 (a 330×330 card and its title, `cursor: pointer`, no handler) |
| `madar-imported-2` | 11 (a 275×80 `div.button`, a checkmark span, a switch's parts) |
| `madar-imported-3` | 91 (a battery card, its glows, its content) |

The first census counted dozens more and was wrong: `<label for>` reaches its
input, and a roving radio at `tabindex="-1"` is reached by arrow. Both are in the
rule now.


## Gates

- [x] G1: Production build succeeds on the artefact the gate reads
  CHECK: npm run build > log 2>&1; echo BUILD_EXIT=$?
  EXPECT: BUILD_EXIT=0
  EVIDENCE: BUILD_EXIT=0, three times — mutant in, mutant hidden, mutant out

- [x] G2: The gate is green on the current build and the census in the header is what it prints
  CHECK: npm run qa:pointer
  EXPECT: shell 0, eleven own sections 0, imported 6 / 11 / 91, POINTER_REACHABLE=ok
  EVIDENCE: shell unreachable=0; madar-nova-instruments … madar-matrix unreachable=0 each; madar-imported 6, madar-imported-2 11, madar-imported-3 91; IMPORTED_POINTER_UNREACHABLE=108 (ceiling 110); DECLARED_DECORATION=2482 (2474 under the three-cursor first draft; the widening added 8 declared and 0 offenders); POINTER_REACHABLE=ok (0); exit 0

- [x] G3: Mutation — one unreachable pointer element in an own section FAILS the gate, and is named
  CHECK: inject `<div style={{cursor:"pointer"}} onClick />` into the hold specimen in NovaInstruments; build; npm run qa:pointer
  EXPECT: POINTER_REACHABLE=FAIL (1) naming madar-nova-instruments, exit 1
  EVIDENCE: first run printed FAIL (2) — `UNREACHABLE shell: div 40x40` AND `UNREACHABLE madar-nova-instruments: div 40x40`: the shell sweep took the whole body, which includes the section the page opens on. Fixed: the shell sweep skips `#main-content`. Rerun on the same build: `UNREACHABLE madar-nova-instruments: div 40x40 cursor=pointer`, POINTER_REACHABLE=FAIL (1), exit 1; shell declared-decoration fell 193→75 and the total 2592→2474, the double count gone

- [x] G4: Mutation — the same element inside `aria-hidden` is accepted as declared decoration, counted once
  CHECK: add aria-hidden="true" to the mutant; build; npm run qa:pointer
  EXPECT: POINTER_REACHABLE=ok, DECLARED_DECORATION rises by exactly one
  EVIDENCE: madar-nova-instruments unreachable=0 declared-decoration=119 (was 118); DECLARED_DECORATION=2475 (was 2474); ok (0)

- [x] G5: The mutant is gone and the build is the committed one
  CHECK: sed -i '/data-mutant=""/d'; git diff --stat NovaInstruments.tsx; build; qa:pointer
  EXPECT: empty diff; the G2 numbers exactly
  EVIDENCE: empty diff; shell 0, own 0 ×11, imported 6/11/91, DECLARED_DECORATION=2474, ok (0)

- [x] G6: Rule correctness — the two reachability paths the first census got wrong are handled
  CHECK: read the offender list of the imported sections for `<label for>` and roving `tabindex="-1"` members
  EXPECT: neither kind appears
  EVIDENCE: the first census listed dozens of labels and radio members; with `for=` / wrapping / previous-sibling and the COMPOSITE-with-one-tabbable-member rule, imported-3 fell to 91 and every own section to 0. What remains in imports is a card and its title with no handler at all (imported), a `div.button` (imported-2), a battery card and its glows (imported-3)

- [x] G7: The imported half is counted under a ceiling, not failed, and the ceiling is two above today
  CHECK: read IMPORTED_CEILING; npm run qa:pointer
  EXPECT: 110; the line names the exemption's source
  EVIDENCE: `IMPORTED_POINTER_UNREACHABLE=108 (ceiling 110, … exempt from this repo's law as hover-policy exempts src/components/ui)`; a 111th trips the gate with a message that says to write the divergence or fix it

- [x] G8: Wired into the live chain, after operable and before directions
  CHECK: grep '"qa:live"' package.json; grep '"qa:pointer"' package.json
  EXPECT: pointer-reachable in the loop; a standalone script
  EVIDENCE: `qa:live … spec-row-qa operable pointer-reachable directions matrix icon-contrast madar-qa`; `qa:pointer: node tools/qa/pointer-reachable.mjs`

## Divergences and what is not claimed

- The gate reads the computed cursor, so a `<div onClick>` that never set `cursor: pointer` is invisible to it. `operable.mjs` is still the gate for that, for controls someone registers. The two together are the coverage; neither alone is.
- Cursor kinds measured, not assumed: the built CSS carries `pointer` ×8, `not-allowed` ×2, `text`, `grab`, `grabbing` (a lower bound — styled-components and inline styles inject at runtime); the source carries `crosshair` ×2, `ew-resize` ×2, `ns-resize` ×1 in madar's own components. All non-passive kinds are now swept; the five own ones are reachable.
- `aria-hidden` is trusted as a declaration. A component can lie with it; the gate makes the lie visible in `DECLARED_DECORATION` rather than catching it.
- The imported 108 are the owner's to fix or exempt one by one; the ceiling only stops the number growing unnoticed.

## The second promise: `title`

A tooltip is information, and a browser opens it for a mouse only. Measured with
the same reachability rule, madar's own sections carried 26 of them; the
imported sections 0. What they were, and what happened to each:

| where | count | what the title said | fix |
|---|---|---|---|
| `MeterFace` seal | 1 | the tier name — written in the same span | title deleted |
| `TariffLadder` steps | 4 | tier name and upper bound — the bounds 200/400/600 were written NOWHERE else | bounds written under the axis, one per step end, on the steps' own flex scale |
| `AllocationBar` parts | 5 (two instances) | label and value — repeated by the legend beneath | title deleted |
| `BillDocument` tier dots | 5 | the tier name — the next span says it | title deleted, dot `aria-hidden` |
| `MemojiAvatar` | 11 | the person's name — written beside it in every host | `aria-hidden`; the square is decoration for a name |
| `OutageCompare` / `DutyCycle` marks | (not swept then) | from–to and minutes per mark | exempt inside `role="img"`; `OutageCompare`'s tracks were bare divs and now carry `role="img"` with a count-and-minutes name like `DutyCycle` already did |

- [x] G9: A title on an unreachable element outside a named picture fails the gate, by name
  CHECK: inject `<span title="…">` into the hold specimen; build; npm run qa:pointer
  EXPECT: POINTER_REACHABLE=FAIL (1) naming madar-nova-instruments with the title text
  EVIDENCE: `UNREACHABLE madar-nova-instruments: span 72x24 title="تلميحٌ لا يفتحه إلّا الفأر"`; FAIL (1); exit 1. Removed, diff empty, rebuilt

- [x] G10: After the fixes, seventeen own sections are at zero under BOTH promises
  CHECK: npm run qa:pointer (OWN now adds madar-outage, madar-schedule, madar-soft-vocabulary, madar-upload, madar-buttons — each censused at 0 cursor offenders before joining)
  EXPECT: every own section unreachable=0; imported unchanged at 6/11/91
  EVIDENCE: all seventeen 0; imported 6, 11, 91; IMPORTED_POINTER_UNREACHABLE=108; DECLARED_DECORATION=3158 (was 2594: the five new sections' aria-hidden pointer elements, plus the avatars and dots now declared); POINTER_REACHABLE=ok (0)

- [x] G11: The ladder's boundaries are visible text, aligned to the step ends, in both directions
  CHECK: node ladder.mjs — rects of [data-tier-edge] against [data-tier-step]
  EXPECT: each label cell spans the same inline extent as its step, within 1px; text 200, 400, 600, 900 ك.و.س
  EVIDENCE: rtl edges 454–518 / 387–451 / 320–384 / 220–317 against steps 454–518 / 386–451 / 319–383 / 220–316; ltr 682–746 / 749–813 / 816–880 / 883–980 against 682–746 / 749–814 / 817–881 / 884–980. Screenshots gates/screenshots/qa-tariff-ladder-{light-rtl,coral-ltr}.png, looked at

- [x] G12: The energy gate follows the change and adds the claim
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: seal and steps selected by data attributes; boundaries read 200,400,600,900; zero `[title]` in the panel; ENERGY_CHECKS=ok
  EVIDENCE: ENERGY_CHECKS=ok RUNTIME_ERRORS=0 — the two selectors that keyed on the tooltip text (`[title*='الشريحة']`) would have silently matched nothing; they were rewritten before the run, not after

### Not claimed
- The marks inside `OutageCompare` and `DutyCycle` still carry per-mark from–to in `title`, reachable by mouse only. The picture has a name and an axis, so the reading is available; the precision is not, to a sighted keyboard user. The reachable form is a roving axis like `DayStrip`, and it is deferred and written here rather than exempted silently.
- `aria-hidden` on `MemojiAvatar` trusts every host to write the name beside it. All five hosts do today; a future host that shows avatars alone would be hiding names, and nothing measures that yet.

## The whole registry, and the affordances that were pictures

Once the gate could count, it was pointed at every section in `sections.ts`
instead of a hand-written list — so a new section is enforced the day it is
added. The first full census returned **599** unreachable elements in madar's own
sections, and the number was wrong: a cursor inherits, so a card with twelve
children reported thirteen. Counting only the ROOT of each pointer subtree gave
**227** distinct affordances a keyboard could not reach, in 16 sections. What they
were, and what each became:

| class | count | example | fix |
|---|---|---|---|
| hover reveals with a pointer cursor and no click | 17 | signature cards, rituals, icon lab tiles, flip card, kinetics doors | `tabIndex={0}` with `onFocus`/`onBlur` mirroring enter/leave — the reveal is reachable and the global ring shows where |
| pictures of controls: rows and cards with `cursor: pointer` and nothing behind it | 12 | list rows, data rows, file card, chips, foil card, dock rows, 140 heat-map cells | the cursor removed — a specimen that does nothing must not promise |
| rows meant as controls, drawn as `div` | 12 | sidebar items, menu rows, quick actions, sortable table headers | real `<button>`s (`.i-row-btn` strips the UA chrome so the hover classes still paint); headers carry `aria-sort` |
| sliders without a keyboard | 6 | rubber-band slider, range handles, rotary knob, before/after divider, number scrubber | `role="slider"` with arrows that follow the writing direction (§33), Home/End, `aria-valuenow`; the range handles were an inline component that remounted on every keypress and lost focus — hoisted to a plain function |
| listboxes whose options only took clicks | 2 | `ListBox`; `SelectField`'s popup (unseen by the sweep because it renders only when open — found by the keyboard probe) | roving tabindex on the picked option; arrows move it, Enter/Space pick, Escape closes the popup; the popup focuses its picked option on open |
| an expander with `role="button"` and no tabindex | 1 | dynamic island | `tabIndex={0}`, Enter/Space click it |
| a swipe row whose action button sat behind it | 1 | swipeable list row | the grab cursor moved to the wrapper that CONTAINS the button; focusing the button slides the row open |
| a chart whose slices highlight on hover | 5 + 5 | donut slices and legend rows | legend rows focusable; slices `aria-hidden` as the mouse duplicate |
| drag-only lists | 9 | kanban cards ×4, a sortable list ×4, a drag-to-dismiss card | the keyboard's drag: Space lifts (`aria-pressed`), arrows carry — vertical for the list, horizontal following the writing direction for the kanban — Space/Enter set down, Escape too; Delete/Backspace dismiss the card; a `role="status"` line speaks only after a keyboard move. The list is a vertical `toolbar` with one roving stop; the kanban re-focuses the card by id after it mounts in the other column |
| **named debt** | **1** | a pointer-following playground | counted under a ceiling of 1; no keyboard form exists for a thing that follows the pointer |

- [x] G13: The gate reads the registry, and every own section is at zero or at its named debt
  CHECK: npm run qa:pointer
  EXPECT: 42 own sections; only kinetics-99 1 non-zero, marked "named debt" (data-collections and kinetics-bank were 4 and 5 until G16); imports 3 under a ceiling of 5 roots
  EVIDENCE: OWN_DEBT=1 after G16 (10 before it); IMPORTED_POINTER_UNREACHABLE=3 (ceiling 5); DECLARED_DECORATION=9 (roots only now); POINTER_REACHABLE=ok (0). The registry regex found 45 ids, 3 imported

- [x] G14: Every new keyboard path was driven, both directions where direction matters
  CHECK: node keys.mjs — focus, press, read aria-valuenow / aria-pressed / aria-sort / aria-expanded / transform
  EXPECT: forward changes the value and back returns it; rtl forward is ArrowLeft, ltr forward is ArrowRight
  EVIDENCE: rubber-band 60→65→60; range low 20→21→20, high 80→81→80; knob 40→45→40; divider 50→55→50 and in ltr ArrowRight 50→55; scrubber 24→35 (ArrowUp then Shift+ArrowUp); flip card focus→pressed, Enter→unpressed; sortable headers 4 buttons, Enter → aria-sort=ascending; dynamic island false→Enter→true; swipe row focus → translateX 0→92; signature cards 4 focusable, markup changes on focus and restores on blur; menu row buttons transparent at rest, painted on hover; ListBox tabindex 0,-1,-1 and ArrowDown moves selection and focus to 1; SelectField opens with focus on "Riyadh (GMT+3)" (tabindex 0,-1,-1,-1), ArrowDown → "Dubai (GMT+4)", Enter closes and the trigger reads the new value, Escape closes. The range handles first read 20→21→21: the remount bug, found by the probe, fixed, re-read. Two probe runs timed out waiting for a section under parallel load and passed alone: a probe waits for a selector now, not a timer

- [x] G16: The drag-only lists take the keyboard, and focus rides the carried item
  CHECK: node reorder.mjs — Space, arrows, Space; read order, aria-pressed, activeElement, the status line; kanban in rtl then ltr
  EXPECT: the lifted row moves two down and stays focused; unlifted arrows move focus only; Delete dismisses and the card respawns; a kanban card carried one column forward with ArrowLeft in Arabic and back with ArrowLeft in English, focus on it throughout
  EVIDENCE: list tabindex 0,-1,-1,-1; lifted=true; order A>B>C>D → B>C>A>D with focus on A; set down aria-pressed=false; unlifted ArrowUp leaves order, focus → B. Dismiss: opacity 1→0→1 after respawn. Kanban rtl: k1 column 0→1, focus rides=true, status "مراجعة الرموز: في عمود قيد التنفيذ" then "وُضِعت"; ltr: ArrowLeft 1→0. First run: the gate still saw 3 rows (a roving group needs a composite role — now a vertical toolbar), the unlifted arrow landed one row off (the status span was child 0; rows are now indexed by [data-row]), and the kanban lost focus on carry (a card re-mounts in the other column; re-focused by id). All three found by the probe, not by reading

- [x] G15: The other harnesses agree after the wave
  CHECK: npm run qa:source; node tools/qa/operable.mjs; node tools/qa/spec-row-qa.mjs
  EXPECT: all ok
  EVIDENCE: twelve source gates ok; OPERATED=85 OPERABLE_FAILURES=0; SPEC_ROW_RENDER=ok

### Not claimed
- One debt remains: the pointer-following playground has no keyboard meaning at all. Its ceiling of 1 stops the number growing; nothing will make it smaller but removing the specimen.
- A hover reveal made focusable is reachable, not necessarily comfortable: seventeen new tab stops appeared in specimen banks. A bank with many reveals would want one roving stop, as `DayStrip` does.
