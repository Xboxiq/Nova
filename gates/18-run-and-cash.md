# Gates: the run, the cash, and the split door

Three things were named as not-yet-built at the end of the dispatch round. Two of
them are here, and the third was refused with its reason — which is the part of
this file worth reading.

**Refused: the three-dot tracker.** "Order state in transit — received, on the
way, delivered" was on my own list, and building it would have been `Stepper`
from `forms.tsx` with new labels. A dispatcher does not ask which stage a delivery
is in; the app already knows. They ask **which stop is late, and is that stop's
own fault**. That question has an answer nothing in the library carries, because a
run is a chain: a stop that overruns pushes every stop behind it. So `DeliveryRun`
splits the delay into what a stop inherited and what it caused — the difference
between "fix the stop" and "fix the courier".

**Refused: the proof-of-delivery slip.** Also mine to propose, and it would have
been `BillDocument` again: a paper with thickness, lines, and a total. The state it
would carry belongs on the stop that was delivered, not on a second document.

**Built: cash on delivery, derived.** A courier holding unpaid goods is holding
money, and that is the number a shift is reconciled against. So `pay` moved onto
the order, the couriers are now derived from the orders rather than declared
beside them, and the liability follows a transfer. Cash at a door is not the order
total — the fee is collected once because the door opens once, and a prepaid order
at the same door contributes nothing.

**Built: the split door.** Four orders to one doorstep are one delivery; hand one
of them to another courier and the door is visited twice, which is the exact waste
this family exists to prevent. Derived from the same address key that formed the
group, and drawn on both rows — the transfer shows its own cost instead of
succeeding quietly.

And one defect caught by reading a screenshot rather than by a check, which is
always a warning: `**bold**` written in Arabic prose inside a `.tsx` file reaches
the screen as four asterisks. It shipped in the previous commit's section copy. It
is now `tools/qa/no-raw-markdown.mjs`.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.37s

- [x] G3: Cash at the door is derived, and prepaid contributes nothing to it
  The unpaid goods plus one fee, never the order total.
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -E 'DISPATCH_CASH|cash at the door'
  EXPECT: /DISPATCH_CASH=8150\/0/m
  EVIDENCE: DISPATCH_CASH=8150/0

- [x] G4: A prepaid amount is drawn hatched and an unpaid one solid
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'claims the wrong thing about cash in hand'
  EXPECT: 0
  EVIDENCE: 0

- [x] G5: At least one door mixes prepaid and unpaid, so the derivation is demonstrated not asserted
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'not actually demonstrated'
  EXPECT: 0
  EVIDENCE: 0

- [x] G6: The money follows a COD order, and a transfer neither creates nor destroys cash
  Proven in both directions: moving the prepaid order must NOT move money, and
  moving the 1800 COD order must move exactly 1800.
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE "cash should (fall|rise)|created or destroyed cash|changed the sender's cash"
  EXPECT: 0
  EVIDENCE: 0

- [x] G7: The cash derivation is proven by mutation, not by assertion
  Pinning `cash` to the courier's original holding instead of what they hold now
  must be caught.
  CHECK: cp src/madar/components/dispatch.tsx /tmp/d.tsx; perl -0pi -e 's/const cash = holds\.reduce/const cash = c.holding.reduce/' src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | grep -c "cash should"; cp /tmp/d.tsx src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | tail -1
  EXPECT: /DISPATCH_CHECKS=ok/m
  EVIDENCE: 2 (failures while pinned) | DISPATCH_CHECKS=ok (after restore)

- [x] G8: Splitting a four-order door is a drawn finding on both couriers' rows
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'did not register as a split door|drawn on both rows'
  EXPECT: 0
  EVIDENCE: 0

- [x] G9: The undo clears the split mark and restores the cash
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'split-door marks survive|left the cash at'
  EXPECT: 0
  EVIDENCE: 0

- [x] G10: §17 — lateness propagates, and each stop inherits exactly what was lost before it
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -E 'DISPATCH_BEHIND|inherited .* min, but'
  EXPECT: /DISPATCH_BEHIND=15 min, verdict stop/m
  EVIDENCE: DISPATCH_BEHIND=15 min, verdict stop

- [x] G11: The carry is proven by mutation — stop the accumulation and the check fails
  CHECK: cp src/madar/components/dispatch.tsx /tmp/d2.tsx; perl -0pi -e 's/if \(stop\.actual !== undefined\) carry \+= own;/if (stop.actual !== undefined) carry += 0;/' src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'but the stops before it lost'; cp /tmp/d2.tsx src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | tail -1
  EXPECT: /DISPATCH_CHECKS=ok/m
  EVIDENCE: 4 (failures while the carry is dropped) | DISPATCH_CHECKS=ok (after restore)

- [x] G12: An unreached stop is hatched and a measured one is solid
  A plan drawn solid claims a reading nobody took (§15-b).
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'but drawn (hatched|solid)|blames it for time lost at another door'
  EXPECT: 0
  EVIDENCE: 0

- [x] G13: The overrun is drawn at the same scale as the promise it exceeded
  A bar that exaggerates lateness is as wrong as one that hides it.
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'draws its overrun at'
  EXPECT: 0
  EVIDENCE: 0

- [x] G14: §22 — the segment order and the promise tick are measured in BOTH directions
  A physical `left` passes in one direction and lies in the other; the only way to
  know a logical property was used is to measure the drawing.
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'inline start|promise tick is at|does not begin where'
  EXPECT: 0
  EVIDENCE: 0

- [x] G15: That RTL check is proven by mutation
  CHECK: cp src/madar/components/dispatch.tsx /tmp/d3.tsx; perl -0pi -e "s/insetBlock: -2, insetInlineStart: pct/insetBlock: -2, left: pct/" src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'promise tick is at'; cp /tmp/d3.tsx src/madar/components/dispatch.tsx; npm run build >/dev/null 2>&1; node tools/qa/dispatch-qa.mjs 2>&1 | tail -1
  EXPECT: /DISPATCH_CHECKS=ok/m
  EVIDENCE: 1 (rtl: the promise tick is at 83px but the promise ends at 336px) | DISPATCH_CHECKS=ok

- [x] G16: Literal markdown never reaches the screen again
  It shipped once and was caught by reading a screenshot. Now it is measured, and
  the scanner is proven to bite.
  CHECK: node tools/qa/no-raw-markdown.mjs; cp src/madar/showcase/sections/Dispatch.tsx /tmp/d4.tsx; perl -0pi -e 's|<b>رحلة واحدة</b>|**رحلة واحدة**|' src/madar/showcase/sections/Dispatch.tsx; node tools/qa/no-raw-markdown.mjs 2>&1 | grep RAW_MARKDOWN; cp /tmp/d4.tsx src/madar/showcase/sections/Dispatch.tsx; node tools/qa/no-raw-markdown.mjs 2>&1 | tail -1
  EXPECT: /NO_RAW_MARKDOWN=ok$/m
  EVIDENCE: RAW_MARKDOWN=0 | RAW_MARKDOWN=1 (while reintroduced) | NO_RAW_MARKDOWN=ok

- [x] G17: The refusals are written down where the next round will read them
  Both the three-dot tracker and the proof-of-delivery slip are refused in the
  component's own header, by name and with the reason.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/dispatch.tsx","utf8");const stepper=/`Stepper` in `forms\.tsx` already draws stages/.test(s);const why=/A dispatcher does not ask which stage a delivery/.test(s);const notTimeline=/Not a timeline: no absolute axis/.test(s);console.log(stepper&&why&&notTimeline?"REFUSALS_RECORDED":"REFUSALS_THIN "+[stepper,why,notTimeline].join())'
  EXPECT: REFUSALS_RECORDED
  EVIDENCE: REFUSALS_RECORDED

- [x] G18: Accessibility holds across the seven packs in both directions
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|CONTRAST_FAILURES|OVERFLOW|RUNTIME_ERRORS'
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: CONTRAST_FAILURES=0 | OVERFLOW=none | AXE_VIOLATIONS_MADAR=0 | RUNTIME_ERRORS=0

- [x] G19: Nothing that passed before regressed
  CHECK: for f in composition spec-row-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 no-drop-shadow mono-usage pages-subpath; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: composition ok | spec-row-qa ok | energy-qa ok | schedule-qa ok | outage-qa ok | addressing ok | upload-qa ok | glass-zero ok | anti-slop-30 ok | no-drop-shadow ok | mono-usage ok | pages-subpath ok

- [x] G20: The three rows are captured in both directions and a dark pack
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','light-ltr'].map(n=>'gates/screenshots/qa-dispatch-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
