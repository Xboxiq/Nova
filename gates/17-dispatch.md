# Gates: dispatch, and the fifteen repositories read a second time

Two things in one round, and they are connected.

The owner asked whether I had actually used the account they sent. The honest
answer was: one repository out of thirty. Fifteen had been refused wholesale for
their surfaces — glass and neumorphism, both banned — and refusing a file for its
paint throws away its structure with it. So all fifteen were read again as code,
with one question: what is the structure underneath, and do we already have it?
`VISUAL-ANALYSIS-08.md` records every verdict. The harvest was one technique,
and it happened to be the one the library most needed: a **gradient hairline**,
bright on one side of the object and faint on the other, which gives back the
thickness that deleting the shadows cost — and the cost was written into §1 at
the time, so this closes a debt the law had recorded against itself.

The second thing is the dispatch family, from the owner's own domain: several
orders, one address, one delivery; a distance band that doubles the fee; a rate
that belongs to the customer; a courier who hands an order to another. Every one
of those is a derivation, so §24 governs the file — what can be derived is not
declared, and a subtraction is drawn as a subtraction.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.27s

- [x] G3: §24 — the delivery is derived from the address, not declared
  Five orders, four sharing a doorstep: two deliveries, and nothing in the data
  says so.
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -E 'DISPATCH_DELIVERIES|DISPATCH_CHECKS'
  EXPECT: /DISPATCH_DELIVERIES=2 from 5 orders/m
  EVIDENCE: DISPATCH_DELIVERIES=2 from 5 orders | DISPATCH_CHECKS=ok

- [x] G4: The brace spans exactly what it claims, and one order gets no brace
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'brace|does not span'
  EXPECT: 0
  EVIDENCE: 0

- [x] G5: "Double" is drawn double — the surcharge is as long as the base
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep DISPATCH_DOUBLE
  EXPECT: /DISPATCH_DOUBLE=1\.00x/m
  EVIDENCE: DISPATCH_DOUBLE=1.00x

- [x] G6: The customer's rate is drawn as length removed, hatched, with a reference edge
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep DISPATCH_DISCOUNT
  EXPECT: /DISPATCH_DISCOUNT=20\.0%/m
  EVIDENCE: DISPATCH_DISCOUNT=20.0%

- [x] G7: §22 one layer deeper — the check measures paint, not layout
  The discount first shipped as a third flex child, which made the row 120% wide
  and `overflow: hidden` clipped it away completely. The gate passed anyway,
  because getBoundingClientRect reports a clipped box at full width. It now
  intersects each segment with the track and compares the two, so "laid out" and
  "visible" cannot be confused again.
  CHECK: node -e 'const s=require("fs").readFileSync("tools/qa/dispatch-qa.mjs","utf8");const clip=/Math\.min\(r\.right, track\.right\) - Math\.max\(r\.left, track\.left\)/.test(s);const both=/discountLaidOut/.test(s)&&/of it is inside the track/.test(s);console.log(clip&&both?"MEASURES_PAINT":"MEASURES_BOX "+[clip,both].join())'
  EXPECT: MEASURES_PAINT
  EVIDENCE: MEASURES_PAINT

- [x] G8: A transfer moves load between couriers and conserves the total
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE "load should|created or destroyed"
  EXPECT: 0
  EVIDENCE: 0

- [x] G9: The order that left is drawn as a hatched gap, not simply gone
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'gap the order left|reads as a load|drawn as gained'
  EXPECT: 0
  EVIDENCE: 0

- [x] G10: The undo is a removal, not a second ledger
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -cE 'did not restore|still drawn after the undo'
  EXPECT: 0
  EVIDENCE: 0

- [x] G11: Keyboard operable, and the arrows follow the writing direction
  CHECK: node tools/qa/dispatch-qa.mjs 2>&1 | grep -c 'did not move the selection'
  EXPECT: 0
  EVIDENCE: 0

- [x] G12: The section is in the seven-pack accessibility and contrast sweep
  Added to madar-qa's PACK_SECTIONS rather than checked once by hand, so it stays
  measured.
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|CONTRAST_FAILURES|OVERFLOW'; grep -c 'madar-dispatch' tools/qa/madar-qa.mjs
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: CONTRAST_FAILURES=0 | OVERFLOW=none | AXE_VIOLATIONS_MADAR=0 | 1

- [x] G13: §23 — the lit edge is in the stylesheet, from tokens, and vertical
  A diagonal gradient would flip meaning between Arabic and English; light comes
  from above in both.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/bridge.css","utf8");const lit=/\.madar-lit::before \{[\s\S]{0,400}mask-composite: exclude/.test(s);const vertical=/linear-gradient\(to bottom, var\(--border-strong\), var\(--border\)\)/.test(s);const noRaw=!/\.madar-lit::before \{[\s\S]{0,400}rgba\(255,255,255/.test(s);const four=/\[data-edge=.lit.\] \{[\s\S]{0,400}inset 0 -1px 0/.test(s);console.log(lit&&vertical&&noRaw&&four?"LIT_EDGE_OK":"LIT_EDGE_PARTIAL "+[lit,vertical,noRaw,four].join())'
  EXPECT: LIT_EDGE_OK
  EVIDENCE: LIT_EDGE_OK

- [x] G14: The lit edge is used by what was built next, not filed away
  CHECK: grep -c 'data-edge="lit"' src/madar/components/dispatch.tsx
  EXPECT: 2
  EVIDENCE: 2

- [x] G15: §23 and §24 are in the law, and the account's re-reading is written down
  CHECK: node -e 'const f=require("fs");const law=f.readFileSync("design-system/VISUAL-LAW.md","utf8");const a23=/### 23\. الحدّ يحمل الضوء/.test(law)&&/الأجسام تقرأ أرقّ/.test(law);const a24=/### 24\. المجموعة تُشتقّ من سببها، والطرح يُرسم طرحًا/.test(law)&&/ما يمكن اشتقاقه لا يُعلَن/.test(law);const an=f.readFileSync("design-system/VISUAL-ANALYSIS-08.md","utf8");const rows=(an.match(/^\| `/gm)||[]).length>=9;const own=/الرفض كان صحيحًا في السطح وخطأً في المنهج/.test(an);console.log(a23&&a24&&rows&&own?"DOCS_COMPLETE":"DOCS_PARTIAL "+[a23,a24,rows,own].join())'
  EXPECT: DOCS_COMPLETE
  EVIDENCE: DOCS_COMPLETE

- [x] G16: Nothing that passed before regressed
  CHECK: for f in composition spec-row-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 no-drop-shadow mono-usage; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: composition ok | spec-row-qa ok | energy-qa ok | schedule-qa ok | outage-qa ok | addressing ok | upload-qa ok | glass-zero ok | anti-slop-30 ok | no-drop-shadow ok | mono-usage ok

- [x] G17: The section is captured in both directions and a dark pack
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','light-ltr'].map(n=>'gates/screenshots/qa-dispatch-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
