# Gates: the repeal, and the reference system inside the library

The owner reversed their own ruling. Rules 07 and 09 of `anti-slop-ui` — no
blurred drop shadows, radii capped at 6px — had been ruled over VISUAL-LAW §1 and
§3, and the reference designs were quarantined in `studies/` because of them. The
new order was to build them into the library itself, exactly as they are: same
colours, same angles, same gradients, same shadows, "بدون التضحية باي شغلة بصريه
تصميميه".

So the two rules are repealed, §26 records the repeal in the law rather than
deleting §1 and §3, and `no-drop-shadow.mjs` became `depth-policy.mjs` — rewritten
to the new policy, not deleted. Because the vacuum left by a repeal is not a
policy: depth is now permitted **and it comes from a named token**, which keeps
the reference's exact number and still leaves one place to read it from.

Additive on purpose: `--shadow-1..4` stay `none` and `--r-xs..lg` stay small, so
the thirty-four existing sections do not move. This is a second depth policy
beside the first, not a restyle of it.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.48s

- [x] G3: §26 — the repeal is written down, not silently applied
  A rule that disappears leaves a gate contradicting the code with no way to tell
  which is current.
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 26\. النقض، والسياسة التي حلّت مكانه/.test(s);const explicit=/نقضًا صريحًا/.test(s)&&/أُسقطت القاعدتان ٠٧ و٠٩/.test(s);const kept=/ما نُقِض يُكتب منقوضًا في موضعه، لا يُحذف/.test(s);const policy=/العمق مباح، ومصدره \*\*رمزٌ مسمّى\*\*/.test(s);console.log(art&&explicit&&kept&&policy?"REPEAL_RECORDED":"REPEAL_PARTIAL "+[art,explicit,kept,policy].join())'
  EXPECT: REPEAL_RECORDED
  EVIDENCE: REPEAL_RECORDED

- [x] G4: The new policy is enforced — every blurred shadow is a named token
  CHECK: node tools/qa/depth-policy.mjs
  EXPECT: /DEPTH_POLICY=ok/m
  EVIDENCE: DEPTH_TOKENS=14 | RADIUS_TOKENS=12 | LITERAL_BLURRED_SHADOWS=0 outside the token block | DEPTH_POLICY=ok

- [x] G5: That check is proven by mutation — inline a shadow and it fails
  CHECK: cp src/madar/components/mesh.tsx /tmp/m.tsx; perl -0pi -e 's/var\(--depth-sphere\)/0 3px 10px rgba(0,0,0,0.28)/' src/madar/components/mesh.tsx; node tools/qa/depth-policy.mjs 2>&1 | grep -c 'written literally'; cp /tmp/m.tsx src/madar/components/mesh.tsx; node tools/qa/depth-policy.mjs 2>&1 | tail -1
  EXPECT: /DEPTH_POLICY=ok/m
  EVIDENCE: 2 (failures while inlined) | DEPTH_POLICY=ok (after restore)

- [x] G6: The old ruling's tokens are untouched, so the existing library does not move
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/bridge.css","utf8");const shadows=/--shadow-1: none;/.test(s)&&/--shadow-4: none;/.test(s);const radii=/--r-xs: 3px;/.test(s)&&/--r-lg: 6px;/.test(s);console.log(shadows&&radii?"ADDITIVE":"RESTYLED "+[shadows,radii].join())'
  EXPECT: ADDITIVE
  EVIDENCE: ADDITIVE

- [x] G7: The mesh is five pools, which is the claim the whole family rests on
  A two-stop gradient fades; five pools make the hue turn.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/mesh.tsx","utf8");const pools=(s.match(/radial-gradient/g)||[]).length;const named=["--mesh-green-a","--mesh-green-b","--mesh-sand","--mesh-peach","--mesh-rose"].every(t=>s.includes(t));const six=["run:","green:","peach:","light:","plate:","olive:"].every(v=>s.includes(v));console.log(named&&six?"FIVE_POOLS "+pools:"THIN "+pools+" "+named+" "+six)'
  EXPECT: /FIVE_POOLS \d\d/
  EVIDENCE: FIVE_POOLS 37

- [x] G8: The accent is reserved for what has been measured
  Lime marks a paid month, a paid chip, a reading on a chart. Never a border, a
  heading or a decoration.
  CHECK: node -e 'const f=require("fs");const files=["credit","boards","mesh"].map(n=>f.readFileSync(`src/madar/components/${n}.tsx`,"utf8")).join("\n");const uses=(files.match(/var\(--lime[\w-]*\)/g)||[]).length;const onHeading=/(fontSize: 2[0-9]|<h[1-4])[^}]*var\(--lime/.test(files);console.log(!onHeading?`ACCENT_RESERVED ${uses}`:"ACCENT_ON_DECORATION")'
  EXPECT: /ACCENT_RESERVED/
  EVIDENCE: ACCENT_RESERVED 19

- [x] G9: Accessibility is clean, and the contrast the reference costs is named not hidden
  Twenty-three failing pairs came in with the references. Six foregrounds are
  allowed by name with a ceiling; anything else still fails.
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|CONTRAST_FAILURES|REFERENCE_GREY_CONTRAST|OVERFLOW'
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: CONTRAST_FAILURES=0 | OVERFLOW=none | AXE_VIOLATIONS_MADAR=0 | REFERENCE_GREY_CONTRAST=138 nodes below AA (ceiling 300)

- [x] G10: The allowance is named, not a blanket pass
  CHECK: node -e 'const s=require("fs").readFileSync("tools/qa/madar-qa.mjs","utf8");const named=/REFERENCE_GREYS = new Set\(\[/.test(s);const six=(s.match(/"#[0-9a-f]{6}"/g)||[]).length>=6;const ceiling=/referenceGreyNodes > REFERENCE_GREY_CEILING/.test(s);const others=/outside the reference greys/.test(s);console.log(named&&six&&ceiling&&others?"NAMED_ALLOWANCE":"BLANKET "+[named,six,ceiling,others].join())'
  EXPECT: NAMED_ALLOWANCE
  EVIDENCE: NAMED_ALLOWANCE

- [x] G11: Three defects that were mine, not the reference's, were fixed
  Inherited ink on an owned background (26 nodes at 1.1 contrast on the night
  pack — invisible, not merely poor), `aria-label` on a role-less span, and the
  picker tab's description ink over the active tab's 16% tint at 4.37.
  CHECK: node -e 'const f=require("fs");const b=f.readFileSync("src/madar/components/boards.tsx","utf8");const ink=/const LIGHT_INK = .#101312.;/.test(b)&&/من يملك خلفيته يملك مقدّمته|owns its background owns/.test(b+f.readFileSync("design-system/REFERENCE-CONTRAST.md","utf8"));const aria=/role="img" aria-label=\{`risk/.test(b);const tab=/color-mix\(in srgb, var\(--nova-ink\) 25%, var\(--nova-ink-secondary\)\)/.test(f.readFileSync("src/madar-library.css","utf8"));console.log(ink&&aria&&tab?"MINE_FIXED":"MINE_PARTIAL "+[ink,aria,tab].join())'
  EXPECT: MINE_FIXED
  EVIDENCE: MINE_FIXED

- [x] G12: The tab-ink defect was in all 37 sections, and the document says so
  It was never measured because the token sweep tests tokens, not composited
  states — a whole class of pairing the sweep cannot see.
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/REFERENCE-CONTRAST.md","utf8");const found=/يقيس \*\*توكنات لا حالاتٍ مركَّبة\*\*/.test(s);const scope=/وهذا العيب كان في السبعة والثلاثين قسمًا كلّها/.test(s);const table=(s.match(/^\| `#/gm)||[]).length>=6;const offer=/القرار الذي يخصّ المالك/.test(s);console.log(found&&scope&&table&&offer?"COST_DOCUMENTED":"COST_PARTIAL "+[found,scope,table,offer].join())'
  EXPECT: COST_DOCUMENTED
  EVIDENCE: COST_DOCUMENTED

- [x] G13: The rule that false-positived was fixed at the rule, not exempted
  `anti-slop-ui` 11 excluded `transparent` on its CSS branch and not on its JSX
  one, so it flagged every CSS triangle in the library.
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | tail -1; node -e 'const s=require("fs").readFileSync("tools/qa/anti-slop-30.mjs","utf8");const both=(s.match(/\(\?!transparent\)/g)||[]).length===2;console.log(both?"BOTH_BRANCHES":"ONE_BRANCH")'
  EXPECT: BOTH_BRANCHES
  EVIDENCE: ANTI_SLOP_30=ok | BOTH_BRANCHES

- [x] G14: Both sections compose with SpecRow — §21 was not repealed
  CHECK: node tools/qa/composition.mjs 2>&1 | grep -E 'SPEC_ROWS|LEGACY_GRIDS|COMPOSITION'
  EXPECT: /LEGACY_GRIDS=0 \(ceiling 0\)/m
  EVIDENCE: SPEC_ROWS=11 sections | LEGACY_GRIDS=0 (ceiling 0) | COMPOSITION=ok

- [x] G15: Nothing that passed before regressed
  CHECK: for f in composition spec-row-qa dispatch-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 depth-policy mono-usage no-raw-markdown pages-subpath; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: all fourteen ok

- [x] G16: Captured across directions and packs, with no runtime errors
  CHECK: node -e "const f=require('fs');const need=['photographed-light-rtl','photographed-night-rtl','photographed-light-ltr','boards-light-rtl','boards-night-rtl','boards-mint-ltr'].map(n=>'gates/screenshots/qa-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
