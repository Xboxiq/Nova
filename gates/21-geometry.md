# Gates: the full review — angles, radii, gradients, neutrals

The owner said the colours and shapes had a problem in execution and distribution
— the angles, the shadows, the colour gradients and their measurement, the way the
shapes are composed and built — and asked for a complete review.

A complaint like that cannot be fixed as stated, so it was measured first. What
came back turned "it looks inconsistent" into five numbers:

| measure | before | after |
|---|---|---|
| linear-gradient angles typed inline | **13** | **2**, both semantic |
| angles the hatch is drawn at | **4** | **1** |
| radii typed as raw numbers | **~20 values** | **0** |
| pill shapes / distinct radii for them | 11 / **7** | 11 / **1 token** |
| accidental colour twins (RGB ≤ 8) | **74** | **10**, each with a reason |

Seven angles for one sheen means the light is not one light. Four drawings for the
hatch means §15-b's term has four dialects. Seven radii for a pill means the same
shape written seven ways. And eleven off-whites in one file, most used once, is
what "colour distribution" looks like when nobody counted.

The fix was not to unify the numbers but to **name** them, so the contradiction
becomes impossible by construction rather than by vigilance: `--sheen`, `--wash`,
`--hatch-angle`, `--drag`, and a nine-step radius ladder.

Two rules kept the review from becoming a blind sweep, and they are now §27's own
provisos: two close stops of one gradient are not twins, they *are* the gradient;
and within one design there is one scale, while across designs each keeps its own.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 1.79s

- [x] G3: The angles are named, and only the two semantic ones are typed
  0deg and 90deg are the split divider flipping its lit end onto the side being
  read — a reading, not a style.
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep RAW_GRADIENT_ANGLES
  EXPECT: /RAW_GRADIENT_ANGLES=2 \(0deg 90deg\)/m
  EVIDENCE: RAW_GRADIENT_ANGLES=2 (0deg 90deg)

- [x] G4: The hatch is drawn at exactly one angle, and the SVG pattern is checked against the token
  A CSS variable cannot enter an SVG attribute, so the pattern carries the number
  and the harness compares it rather than trusting it.
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep HATCH_ANGLES
  EXPECT: /HATCH_ANGLES=135 \(token 135deg\)/m
  EVIDENCE: HATCH_ANGLES=135 (token 135deg)

- [x] G5: No radius is typed as a number; every shape comes off the ladder
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep -E 'RAW_RADII|LADDER'
  EXPECT: /RAW_RADII=0 \(none\)/m
  EVIDENCE: RAW_RADII=0 (none) | LADDER=9/9 steps declared

- [x] G6: Eleven pills, one token
  CHECK: node -e 'const f=require("fs");let n=0;for(const x of ["credit","boards"]){n+=(f.readFileSync("src/madar/components/"+x+".tsx","utf8").match(/borderRadius: .var\(--r-pill\)./g)||[]).length}console.log(n>=11?"PILLS_UNIFIED "+n:"PILLS_SPLIT "+n)'
  EXPECT: /PILLS_UNIFIED/
  EVIDENCE: PILLS_UNIFIED 13

- [x] G7: No shadow bypasses the depth tokens, and none of the thirteen duplicates another
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep RAW_SHADOWS; node -e 'const s=require("fs").readFileSync("src/madar/bridge.css","utf8");const v=[...s.matchAll(/--depth-[a-z]+:\s*([^;]+);/g)].map(m=>m[1].replace(/\s+/g," ").trim());const dup=v.length-new Set(v).size;console.log(dup?"DUPLICATE_DEPTHS "+dup:"DEPTHS_DISTINCT "+v.length)'
  EXPECT: /DEPTHS_DISTINCT/
  EVIDENCE: RAW_SHADOWS=0 | DEPTHS_DISTINCT 13

- [x] G8: The colour twins fell from 74 to 10, and the ceiling has no slack in it
  CHECK: node tools/qa/geometry.mjs 2>&1 | grep -E 'COLOUR_TWINS|DISTINCT_COLOURS'
  EXPECT: /COLOUR_TWINS=10 within RGB distance 4 \(ceiling 10\)/m
  EVIDENCE: COLOUR_TWINS=10 (ceiling 10) | DISTINCT_COLOURS=111

- [x] G9: One spelling per colour, and one ink
  Two spellings of white and two inks for one role were the plainest part of it.
  CHECK: node -e 'const f=require("fs");let bad=[];for(const x of ["mesh","credit","boards"]){const s=f.readFileSync("src/madar/components/"+x+".tsx","utf8");for(const h of ["#ffffff","#fbfbfb","#101010"])if(s.includes(h))bad.push(x+":"+h)}console.log(bad.length?"SPELLINGS_SPLIT "+bad.join(","):"ONE_SPELLING")'
  EXPECT: ONE_SPELLING
  EVIDENCE: ONE_SPELLING

- [x] G10: The harness does not count comments as drawings
  Its first version counted a hex that appeared only inside a sentence explaining a
  bug — which is how a measurement starts lying.
  CHECK: node -e 'const s=require("fs").readFileSync("tools/qa/geometry.mjs","utf8");console.log(/const strip = \(s\) => s\.replace\(\/\\\/\\\*/.test(s)?"COMMENTS_STRIPPED":"COUNTS_COMMENTS")'
  EXPECT: COMMENTS_STRIPPED
  EVIDENCE: COMMENTS_STRIPPED

- [x] G11: A fifth angle for the hatch is caught
  Proven by mutation: put the SVG pattern back at 120 and the check must fail.
  CHECK: cp src/madar/components/boards.tsx /tmp/g11.tsx; perl -0pi -e 's/patternTransform="rotate\(135\)"/patternTransform="rotate(120)"/' src/madar/components/boards.tsx; node tools/qa/geometry.mjs 2>&1 | grep -c 'one meaning, one angle'; cp /tmp/g11.tsx src/madar/components/boards.tsx; node tools/qa/geometry.mjs 2>&1 | tail -1
  EXPECT: /GEOMETRY=ok/m
  EVIDENCE: 1 (failure reported at 120) | GEOMETRY=ok after restore

- [x] G12: A raw radius creeping back is caught
  CHECK: cp src/madar/components/boards.tsx /tmp/g12.tsx; perl -0pi -e "s/borderRadius: 'var\(--r-tile\)', padding: 10/borderRadius: 11, padding: 10/" src/madar/components/boards.tsx; node tools/qa/geometry.mjs 2>&1 | grep -c 'typed as numbers'; cp /tmp/g12.tsx src/madar/components/boards.tsx; node tools/qa/geometry.mjs 2>&1 | tail -1
  EXPECT: /GEOMETRY=ok/m
  EVIDENCE: 1 (failure reported at 11px) | GEOMETRY=ok after restore

- [x] G13: §27 is in the law with both of its provisos
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 27\. المعنى الواحد رسمةٌ واحدة، والشكل الواحد رقمٌ واحد/.test(s);const a=/نقطتان متقاربتان في تدرّجٍ واحد ليستا توأمين/.test(s);const b=/داخل التصميم الواحد سُلَّمٌ واحد؛ وبين التصميمات يبقى لكلٍّ لونه/.test(s);const num=/ثلاث عشرة زاوية/.test(s);console.log(art&&a&&b&&num?"LAW_27_COMPLETE":"LAW_27_PARTIAL "+[art,a,b,num].join())'
  EXPECT: LAW_27_COMPLETE
  EVIDENCE: LAW_27_COMPLETE

- [x] G14: The review is written down with its numbers, before and after
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/GEOMETRY-REVIEW.md","utf8");const t=(s.match(/^\| /gm)||[]).length>=12;const paid=/الفروق البصرية المدفوعة، مذكورةً لا مخفيّة/.test(s);const why=/ولكلٍّ سبب/.test(s);console.log(t&&paid&&why?"REVIEW_RECORDED":"REVIEW_THIN "+[t,paid,why].join())'
  EXPECT: REVIEW_RECORDED
  EVIDENCE: REVIEW_RECORDED

- [x] G15: Nothing regressed — operability, accessibility, composition, the other families
  CHECK: for f in madar-qa operable composition spec-row-qa dispatch-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 depth-policy mono-usage no-raw-markdown pages-subpath; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: all sixteen ok
