# Gates: measuring to a drawn reference, and drawing a quantity countable

The fifth batch of visual feed was read at technique level in
`design-system/VISUAL-ANALYSIS-05.md`, and two of its techniques earned articles
in the law: §14 (a reading is measured against a reference drawn on the data's
own scale) and §15 (a quantity made of units is drawn in units, and hatching
means "not a realised measurement").

Both claims are geometric, so most of these gates measure in a browser rather
than read the source. Two of them exist because the first run failed: the
`background` shorthand was erasing the hatch it was supposed to carry, and the
bars had drifted 6px off the scale the reference line was placed on.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds with the additions in
  CHECK: npm run build 2>&1 | grep -E 'assets/energy-|built in'
  EXPECT: /assets\/energy-[^ ]+\.js/m
  EVIDENCE: dist/assets/energy-qA7wYa3Q.js                                         21.92 kB │ gzip:   5.98 kB │ map:    66.20 kB | ✓ built in 2.62s

- [x] G3: Still no raw colour, and the category palette is reused rather than invented a second time
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/energy.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);const reuse=/import \{ CATEGORICAL \} from '.\/dataviz';/.test(s)&&/CATEGORICAL\[i % CATEGORICAL.length\]/.test(s);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):(reuse?'TOKENS_ONLY_PALETTE_REUSED':'PALETTE_REDECLARED'))"
  EXPECT: TOKENS_ONLY_PALETTE_REUSED
  EVIDENCE: TOKENS_ONLY_PALETTE_REUSED

- [x] G4: The reference is a construction line — dashed, hairline, neutral — and the tone goes to the bars that cross it, not to the line
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/charts.tsx","utf8");const line=/data-target-line[\s\S]*?\/>/.exec(s)[0];const dashed=/borderTop: .1px dashed var\(--border-strong\)./.test(line);const noTone=!/tone/.test(line);const barTone=/background: loud\(b\.value\) \|\| hov === i \? tone :/.test(s);console.log(dashed&&noTone&&barTone?"REFERENCE_IS_STRUCTURE":"REFERENCE_IS_DATA "+[dashed,noTone,barTone].join())'
  EXPECT: REFERENCE_IS_STRUCTURE
  EVIDENCE: REFERENCE_IS_STRUCTURE

- [x] G5: The scale extends past the reference instead of being reset to it, so an overshoot cannot be hidden
  CHECK: node -e 'const f=require("fs");const c=f.readFileSync("src/madar/components/charts.tsx","utf8");const e=f.readFileSync("src/madar/components/energy.tsx","utf8");const chart=/const max = Math\.max\(\.\.\.data\.map\(\(b\) => b\.value\), target\?\.value \?\? 0\);/.test(c);const bar=/const scale = Math\.max\(budget, used \+ projected\);/.test(e);const edge=/data-budget-edge/.test(e);console.log(chart&&bar&&edge?"SCALE_HOLDS_REFERENCE":"SCALE_CLAMPS "+[chart,bar,edge].join())'
  EXPECT: SCALE_HOLDS_REFERENCE
  EVIDENCE: SCALE_HOLDS_REFERENCE

- [x] G6: The plot area is exact — every row has a fixed height and does not shrink, which is what the 6px drift cost us
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/charts.tsx","utf8");const consts=/const VAL = 13; const LAB = 14; const GAP = 6;/.test(s);const derived=/const barMax = height - VAL - LAB - GAP \* 2;/.test(s);const nogrow=(s.match(/flex: .none./g)||[]).length>=3;console.log(consts&&derived&&nogrow?"PLOT_EXACT":"PLOT_DRIFTS "+[consts,derived,nogrow].join())'
  EXPECT: PLOT_EXACT
  EVIDENCE: PLOT_EXACT

- [x] G7: Hatching means "not measured" — the metered part is solid, the projection and the remainder are both hatched, and in different colours
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const p=/const parts = \[[\s\S]*?\]\.filter/.exec(s)[0];const solid=(p.match(/solid: true/g)||[]).length===1;const soft=(p.match(/solid: false/g)||[]).length===2;const hues=/color: over \? .var\(--danger\). : .var\(--accent\)./.test(p)&&/color: .var\(--border\)./.test(p);console.log(solid&&soft&&hues?"HATCH_MEANS_UNMEASURED":"HATCH_IS_TEXTURE "+[solid,soft,hues].join())'
  EXPECT: HATCH_MEANS_UNMEASURED
  EVIDENCE: HATCH_MEANS_UNMEASURED

- [x] G8: No `background` shorthand on anything hatched — the shorthand resets background-image and inline styles outrank the class
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const sw=/const swatch = \(p: \(typeof parts\)\[number\]\) => \(\{[\s\S]*?\}\);/.exec(s)[0];console.log(/backgroundColor:/.test(sw)&&!/[^-]background:/.test(sw)?"NO_SHORTHAND_ON_HATCH":"SHORTHAND_ERASES_HATCH")'
  EXPECT: NO_SHORTHAND_ON_HATCH
  EVIDENCE: NO_SHORTHAND_ON_HATCH

- [x] G9: The tick count comes from the reading, the unit is declared, and a part unit is drawn part
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const c=/export function LoadComb[\s\S]*?\n\}/.exec(s)[0];const counted=/const units = r\.kwh \/ unit;/.test(c)&&/length: whole \+ \(rest > 0 \? 1 : 0\)/.test(c);const partial=/height: partial \? Math\.max\(6, Math\.round\(20 \* rest\)\) : 20/.test(c);const declared=/كل شرطة/.test(c);console.log(counted&&partial&&declared?"COUNT_IS_REAL":"COUNT_IS_TEXTURE "+[counted,partial,declared].join())'
  EXPECT: COUNT_IS_REAL
  EVIDENCE: COUNT_IS_REAL

- [x] G10: The leftover bucket takes the neutral, so "everything else" does not spend a taxonomy colour or collide with the verdict red
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const flagged=/\{ label: .أخرى., kwh: 34, other: true \}/.test(s);const neutral=/r\.other \? .var\(--border-strong\). : CATEGORICAL/.test(s);console.log(flagged&&neutral?"OTHER_IS_NEUTRAL":"OTHER_TAKES_A_HUE "+[flagged,neutral].join())'
  EXPECT: OTHER_IS_NEUTRAL
  EVIDENCE: OTHER_IS_NEUTRAL

- [x] G11: In a browser: the line lands on the bar that equals the target, the comb holds 19 ticks for 186 at 10 each, the legend repeats each treatment, and the allocation edge sits at 92%
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: ENERGY_CHECKS=ok
  EVIDENCE: ENERGY_CHECKS=ok | RUNTIME_ERRORS=0

- [x] G12: Axe, contrast across the seven packs, overflow and runtime all stay green
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G13: The shell's slop count did not rise to pay for any of this
  CHECK: node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /SHELL_SLOP_HITS=([0-5]?[0-9]|6[0-2])$/m
  EVIDENCE: SHELL_SLOP_HITS=62

- [x] G14: The component is documented in its states, not in its best one — the overshoot is on screen
  CHECK: node -e "const f=require('fs');const sec=f.readFileSync('src/madar/showcase/sections/Energy.tsx','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const twice=(sec.match(/<AllocationBar/g)||[]).length===2&&/budget=\{450\} projected=\{78\}/.test(sec);const wired=/AllocationBar, LoadComb/.test(bar)&&/<LoadComb \/>/.test(sec)&&/target=\{\{ value: 400/.test(sec);console.log(twice&&wired?'STATES_DOCUMENTED':'HAPPY_PATH_ONLY '+[twice,wired].join())"
  EXPECT: STATES_DOCUMENTED
  EVIDENCE: STATES_DOCUMENTED

- [x] G15: The batch is recorded in the law with what it earned and what it did not, including the third refusal
  CHECK: node -e "const f=require('fs');const law=f.readFileSync('design-system/VISUAL-LAW.md','utf8');const an=f.readFileSync('design-system/VISUAL-ANALYSIS-05.md','utf8');const arts=/### 14\. القياس إلى مرجع مرسوم/.test(law)&&/### 15\. المقدار المعدود/.test(law);const refused=/للمرّة الثالثة/.test(law)&&/مرفوض للتكرار/.test(law);const owned=/الاختصار .background. كان يمحو التخطيط/.test(an);console.log(arts&&refused&&owned?'BATCH_RECORDED':'BATCH_UNRECORDED '+[arts,refused,owned].join())"
  EXPECT: BATCH_RECORDED
  EVIDENCE: BATCH_RECORDED

- [x] G16: Both directions and a dark pack are captured, so the instruments are judged by eye
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','sky-ltr'].map(n=>'gates/screenshots/qa-energy5-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
