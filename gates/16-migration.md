# Gates: the migration, and the harness that had to watch the page

`gates/15` measured the composition and printed the legacy count — twenty-one
sections still on the equal auto-fit card grid — with a ceiling to stop it
growing. Half the library in the new shape and half in the old is worse than all
of it being old, so this file is that number driven to zero.

The route mattered more than the count. Rewriting thirty call sites with a regex
broke two sections outright, so the ordinal and the alternation moved into CSS
instead: a counter numbers the rows and `:nth-child(even)` flips the sides, which
means a section's own local wrapper — `Panel`, `Cell`, `RitualCard` — becomes one
line of `SpecRow` and its call sites are never touched. Sixteen specimen banks
that have no sentence per specimen got `SpecShelf` instead, because inventing
fifty paragraphs of copy to fit a master-detail row is its own slop.

Then the real lesson, which is §22. A `str.replace` hit three copies of the same
rule and destroyed the even-row and narrow-screen selectors, so every odd row
drew its statement and its specimen in the same grid column — one on top of the
other — and `composition.mjs` stayed green, because it reads the source and the
source still said the right thing. A check that reads code testifies about code.
Hence `spec-row-qa.mjs`, which measures the rendered row in a browser.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.11s

- [x] G3: The equal auto-fit card grid is gone from every section, and the ceiling is zero
  CHECK: node tools/qa/composition.mjs 2>&1 | grep -E 'LEGACY_GRIDS|COMPOSITION'
  EXPECT: /LEGACY_GRIDS=0 \(ceiling 0\)/m
  EVIDENCE: LEGACY_GRIDS=0 (ceiling 0) | COMPOSITION=ok

- [x] G4: Every section now composes with a primitive rather than a grid
  CHECK: node tools/qa/composition.mjs 2>&1 | grep -E 'SPEC_ROWS|SPEC_SHELVES'
  EXPECT: /SPEC_ROWS=8 sections/m
  EVIDENCE: SPEC_ROWS=8 sections | SPEC_SHELVES=16 sections

- [x] G5: §22 — the row is measured on the drawn page, and the halves do not overlap
  CHECK: node tools/qa/spec-row-qa.mjs 2>&1 | tail -3
  EXPECT: /SPEC_ROW_RENDER=ok/m
  EVIDENCE: SPEC_ROW_FAILURES=0 | SPEC_ROW_ERRORS=0 | SPEC_ROW_RENDER=ok

- [x] G6: The defect that got through would now be caught — the check fails when the selector is broken
  CHECK: cp src/madar/bridge.css /tmp/b.css; perl -0pi -e 's/\.madar-spec-copy \{\n  display: grid;\n  grid-column: 2;/.madar-spec-copy {\n  display: grid;\n  grid-column: 1;/' src/madar/bridge.css; npm run build >/dev/null 2>&1; node tools/qa/spec-row-qa.mjs 2>&1 | grep -cE 'both halves sit in grid column|halves overlap'; cp /tmp/b.css src/madar/bridge.css; npm run build >/dev/null 2>&1; node tools/qa/spec-row-qa.mjs 2>&1 | tail -1
  EXPECT: /SPEC_ROW_RENDER=ok/m
  EVIDENCE: 32 (failures reported while broken) | SPEC_ROW_RENDER=ok (after restore)

- [x] G7: Sideways overflow is judged against the shell's own baseline, not against zero
  A pre-existing defect must be reported, not inherited: the floating dock pushes
  every section 8px wide at 720px, including sections this work never touched.
  CHECK: node tools/qa/spec-row-qa.mjs 2>&1 | grep 'shell baseline'
  EXPECT: /overflow 8px, shell baseline 8px/m
  EVIDENCE: narrow rtl: overflow 8px, shell baseline 8px | narrow ltr: overflow 8px, shell baseline 8px

- [x] G8: A specimen that paints its own surface gets no plinth under it
  CHECK: node -e 'const f=require("fs");const r=f.readFileSync("src/madar/showcase/SpecRow.tsx","utf8");const css=f.readFileSync("src/madar/bridge.css","utf8");const prop=/bare \? .bare. : fill \? .fill. : ../.test(r);const rule=/\[data-spec-stage=.bare.\] \{\s*\n\s*background: none;/.test(css);const used=/specimen=\{children\} bare/.test(f.readFileSync("src/madar/showcase/sections/Upload.tsx","utf8"));console.log(prop&&rule&&used?"NO_CARD_IN_CARD":"CARD_IN_CARD "+[prop,rule,used].join())'
  EXPECT: NO_CARD_IN_CARD
  EVIDENCE: NO_CARD_IN_CARD

- [x] G9: The shelf's rhythm is uneven and declared, not random
  CHECK: node tools/qa/spec-row-qa.mjs 2>&1 | grep -c 'which is the equal grid again'; node -e 'const s=require("fs").readFileSync("src/madar/showcase/SpecRow.tsx","utf8");console.log(/rhythm = \[7, 5, 5, 7, 12\]/.test(s)?"RHYTHM_DECLARED":"RHYTHM_MISSING")'
  EXPECT: RHYTHM_DECLARED
  EVIDENCE: 0 | RHYTHM_DECLARED

- [x] G10: Every row's ordinal is drawn, and it restarts per section
  CHECK: node tools/qa/spec-row-qa.mjs 2>&1 | grep -cE 'no ordinal is drawn|do not restart'; node tools/qa/composition.mjs 2>&1 | grep ROW_CLAIMS
  EXPECT: /ROW_CLAIMS=ok/m
  EVIDENCE: 0 | ROW_CLAIMS=ok

- [x] G11: §22 is in the law, stated as the failure it came from
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 22\. القياس يقع على المرسوم، لا على المكتوب/.test(s);const green=/وبوّابةُ التكوين كانت \*\*خضراء\*\*/.test(s);const rule=/تُقاس في متصفّح/.test(s);const dies=/البوّابة المعلَّقة بتفصيلٍ تنفيذيّ تموت بموته/.test(s);console.log(art&&green&&rule&&dies?"LAW_22_COMPLETE":"LAW_22_PARTIAL "+[art,green,rule,dies].join())'
  EXPECT: LAW_22_COMPLETE
  EVIDENCE: LAW_22_COMPLETE

- [x] G12: Nothing that passed before regressed — accessibility, packs, depth, families
  CHECK: for f in madar-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 no-drop-shadow; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: madar-qa ok | energy-qa ok | schedule-qa ok | outage-qa ok | addressing ok | upload-qa ok | glass-zero ok | anti-slop-30 ok | no-drop-shadow ok

- [x] G13: The migrated composition is captured across directions and packs
  CHECK: node -e "const f=require('fs');const need=['upload-light-rtl','data-collections-night-rtl','kinetics-bank-light-ltr','atelier-mint-rtl'].map(n=>'gates/screenshots/qa-composition-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
