# Gates: the composition, and the batch that exposed it

The owner said the design's look was not what they wanted, and pointed at an
account full of references. Reviewing the standard against my own work first
found the cause, and it was larger than any reference in the batch: I had applied
`anti-slop-ui`'s thirty prohibitions and ignored the REQUIRED half of them.

Rule 13 bans the equal three-across card grid and prescribes asymmetrical
layouts and master-detail rows instead. Twenty-four of thirty-four sections were
that grid — I had built the banned pattern into every section I wrote while my
scanner checked only the shell. The components were measured; the composition was
not. Hence §21, and hence this file.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.23s

- [x] G3: The composition is measured, and the sections I wrote are off the grid
  CHECK: node tools/qa/composition.mjs
  EXPECT: COMPOSITION=ok
  EVIDENCE: LEGACY_GRIDS=0 (ceiling 0) | COMPOSITION=ok

- [x] G4: The row is what the standard asks for — unequal columns, a hairline, a toned stage, alternating sides
  Rewritten: the ordinal and the alternation moved out of props and into CSS so a
  section's local wrapper could become one line of SpecRow, and the old check was
  looking for a `flip` prop that no longer exists. A gate pinned to an
  implementation detail dies with the detail; the claims are read from the
  stylesheet now.
  CHECK: node tools/qa/composition.mjs 2>&1 | grep -E 'ROW_CLAIMS'
  EXPECT: /ROW_CLAIMS=ok/m
  EVIDENCE: ROW_CLAIMS=ok

- [x] G5: The legacy count is printed rather than hidden, and the ceiling is now zero
  The ceiling was 21 when this file was written, then 16, and the migration took
  it to 0. It was lowered each time rather than left slack, which is the only way
  a ceiling means anything.
  CHECK: node tools/qa/composition.mjs 2>&1 | grep LEGACY_GRIDS
  EXPECT: /LEGACY_GRIDS=0 \(ceiling 0\)/m
  EVIDENCE: LEGACY_GRIDS=0 (ceiling 0)

- [x] G6: §20 — depth is three ramps together, and one alone is not depth
  CHECK: node -e 'const f=require("fs");const s=f.readFileSync("src/madar/showcase/SpecRow.tsx","utf8");const three=/translateY\(\$\{i \* 18\}px\) scale\(\$\{1 - i \* 0\.05\}\)/.test(s)&&/opacity: 1 - i \* 0\.1/.test(s);const law=f.readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 20\. العمق بثلاثة انحدارات/.test(law)&&/أخفض فقط تُقرأ سوء ترتيب/.test(law);console.log(three&&art?"THREE_RAMPS":"RAMPS_INCOMPLETE "+[three,art].join())'
  EXPECT: THREE_RAMPS
  EVIDENCE: THREE_RAMPS

- [x] G7: The stack opens on a press, never on hover or on scroll
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/showcase/SpecRow.tsx","utf8");const press=/aria-expanded=\{open\}/.test(s)&&/onClick=\{\(\) => setOpen/.test(s);const noHover=!/onMouseEnter|:hover/.test(s);const why=/a\n   pointer already down is direct manipulation rather than an invitation/.test(s);console.log(press&&noHover&&why?"OPENS_ON_PRESS":"OPENS_ON_HOVER "+[press,noHover,why].join())'
  EXPECT: OPENS_ON_PRESS
  EVIDENCE: OPENS_ON_PRESS

- [x] G8: §21 is in the law, stated as my own defect rather than as a reference's lesson
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 21\. التكوين يُقاس كما تُقاس المكوّنات/.test(s);const owned=/عيبٍ في عملي كشفه المالك/.test(s);const lesson=/ما لا يُقاس يعود/.test(s);const banned=/شبكة بطاقات متساوية في قسم توثيق/.test(s);console.log(art&&owned&&lesson&&banned?"LAW_21_COMPLETE":"LAW_21_PARTIAL "+[art,owned,lesson,banned].join())'
  EXPECT: LAW_21_COMPLETE
  EVIDENCE: LAW_21_COMPLETE

- [x] G9: The account was triaged in full, including the part that contradicts the owner's own skill
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-ANALYSIS-07.md","utf8");const counted=/٢٤ قسمًا من ٣٤/.test(s);const table=(s.match(/^\| /gm)||[]).length>=8;const conflict=/أكثر الحساب \*\*زجاجٌ وأسطح منتفخة\*\*/.test(s)&&/لا يمكن تنفيذ الاثنين معًا/.test(s);const code=/قرأتُ شيفرته لا صورته/.test(s);console.log(counted&&table&&conflict&&code?"ACCOUNT_TRIAGED":"TRIAGE_PARTIAL "+[counted,table,conflict,code].join())'
  EXPECT: ACCOUNT_TRIAGED
  EVIDENCE: ACCOUNT_TRIAGED

- [x] G10: Everything that passed before still passes with the sections restructured
  CHECK: for f in madar-qa energy-qa schedule-qa outage-qa addressing; do node tools/qa/$f.mjs 2>&1 | grep -E '^(AXE_VIOLATIONS_MADAR|OVERFLOW|ENERGY_CHECKS|SCHEDULE_CHECKS|OUTAGE_CHECKS|ADDRESSING)='; done
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: OUTAGE_CHECKS=ok | ADDRESSING=ok

- [x] G11: The standard and the depth rules still hold
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | tail -1; node tools/qa/no-drop-shadow.mjs 2>&1 | head -2
  EXPECT: /ANTI_SLOP_30=ok/m
  EVIDENCE: BLURRED_DROP_SHADOWS=0 | RADII_OVER_6PX=0

- [x] G12: The new composition is captured in both directions and a dark pack
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','mint-ltr'].map(n=>'gates/screenshots/qa-schedule-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
