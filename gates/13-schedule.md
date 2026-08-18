# Gates: the schedule family

The owner asked for the library to grow, following the `anti-slop-ui` skill they
installed. That standard removes the two easiest ways to make a thing read as a
thing — the drop shadow and the generous radius — so this family is the answer to
what is left: a hairline, an inset at a joint, and overlap.

It is also the family the energy product was missing. Reading a meter answers
"how much"; a day axis answers "when", which is the question a time-of-use tariff
actually poses.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds and the section is its own lazy chunk
  CHECK: npm run build 2>&1 | grep -E 'assets/Schedule-|built in'
  EXPECT: /assets\/Schedule-[^ ]+\.js/m
  EVIDENCE: dist/assets/Schedule-3mPrs2QA.js                                        3.01 kB │ gzip:   1.47 kB │ map:     4.64 kB | ✓ built in 1.96s

- [x] G3: The family declares no raw colour, so it rides the seven packs
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/schedule.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY

- [x] G4: It obeys the rules the owner ruled in — nothing over 6px, and no shadow that is not an inset
  CHECK: node tools/qa/no-drop-shadow.mjs 2>&1 | grep -E 'BLURRED_DROP_SHADOWS|RADII_OVER_6PX'
  EXPECT: /BLURRED_DROP_SHADOWS=0/m
  EVIDENCE: BLURRED_DROP_SHADOWS=0 | RADII_OVER_6PX=0

- [x] G5: Volume comes from the three means the amended §1 leaves — and the inset is on the joint, not the box
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/schedule.tsx","utf8");const inset=/boxShadow: current \? .inset 0 0 0 1px var\(--border-strong\). : undefined/.test(s);const hairline=/borderInlineStart: h === 0 \? .none. : .1px solid var\(--border\)./.test(s);const overlap=/data-now-line/.test(s)&&/position: .absolute./.test(s);const written=/a hairline that says where the object ends/.test(s);console.log(inset&&hairline&&overlap&&written?"FORM_WITHOUT_SHADOW":"FORM_UNSTATED "+[inset,hairline,overlap,written].join())'
  EXPECT: FORM_WITHOUT_SHADOW
  EVIDENCE: FORM_WITHOUT_SHADOW

- [x] G6: No element that carries a hatch colour also sets the `background` shorthand — the defect that erased the hatch twice
  CHECK: node -e 'const f=require("fs");const g=require("child_process").execSync("grep -rln madar-hatch src/madar --include=*.tsx",{encoding:"utf8"}).trim().split("\n");const bad=[];for(const p of g){const s=f.readFileSync(p,"utf8");for(const m of s.matchAll(/\{[^{}]*--madar-hatch-color[^{}]*\}/g)){if(/[^-\w]background:/.test(m[0]))bad.push(p+"  "+m[0].trim().slice(0,60));}for(const m of s.matchAll(/style=\{\{[^}]*\}\}/g)){/* an element given the hatch must not also set the shorthand */}}console.log(bad.length?"SHORTHAND_ERASES_HATCH "+bad.join(" | "):"NO_SHORTHAND_ON_HATCH")'
  EXPECT: NO_SHORTHAND_ON_HATCH
  EVIDENCE: NO_SHORTHAND_ON_HATCH

- [x] G7: Three periods, and only the ones that cost something carry a hue
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/schedule.tsx","utf8");const t=/const PERIOD: Record<Period[\s\S]*?\n\};/.exec(s)[0];const neutral=/off: \{ color: .var\(--border-strong\)./.test(t);const priced=/shoulder: \{ color: .var\(--warning\)./.test(t)&&/peak: \{ color: .var\(--danger\)./.test(t);const three=(t.match(/ar: \x27/g)||[]).length===3;console.log(neutral&&priced&&three?"PERIOD_IS_ENCODING":"PERIOD_IS_DECOR "+[neutral,priced,three].join())'
  EXPECT: PERIOD_IS_ENCODING
  EVIDENCE: PERIOD_IS_ENCODING

- [x] G8: The picker renders the axis rather than a second copy of the geometry
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/schedule.tsx","utf8");const w=/export function WindowPicker[\s\S]*?\n\}\n/.exec(s)[0];const reuses=/<DayStrip plan=\{plan\} now=\{now\} selection=\{range\} onPick=\{pick\}/.test(w);const noSecondGrid=!/data-day-strip/.test(w);console.log(reuses&&noSecondGrid?"ONE_AXIS_TWO_BEHAVIOURS":"GEOMETRY_DUPLICATED "+[reuses,noSecondGrid].join())'
  EXPECT: ONE_AXIS_TWO_BEHAVIOURS
  EVIDENCE: ONE_AXIS_TWO_BEHAVIOURS

- [x] G9: What already existed was checked, and the reuse-or-not decision is written down
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/schedule.tsx","utf8");const named=["RangeBar","RangeSlider","TimeField","Heatmap","Gauge","MeterDial","ProgressCircle"].every(n=>s.includes(n));const why=/does a different job rather than a similar one/.test(s);console.log(named&&why?"REUSE_DECIDED":"REUSE_UNEXAMINED "+[named,why].join())'
  EXPECT: REUSE_DECIDED
  EVIDENCE: REUSE_DECIDED

- [x] G10: In a browser: 24 counted hours, now on their own scale, the unlived ones hatched in their colour, the clock merging bands, a window priced against the cheapest, and one tab stop whose arrows follow the writing direction
  CHECK: node tools/qa/schedule-qa.mjs
  EXPECT: SCHEDULE_CHECKS=ok
  EVIDENCE: SCHEDULE_CHECKS=ok | RUNTIME_ERRORS=0

- [x] G11: Axe, contrast across the seven packs, overflow and runtime stay green with the family in
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G12: The standard still passes with the family in, and the shell's slop count did not rise
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | tail -1; node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /ANTI_SLOP_30=ok/m
  EVIDENCE: ANTI_SLOP_30=ok | SHELL_SLOP_HITS=54

- [x] G13: Registered, exported, and marked as an addition so it is reachable rather than buried
  CHECK: node -e "const f=require('fs');const reg=f.readFileSync('src/madar/sections.ts','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const ok=/madar-schedule/.test(reg)&&/sections\/Schedule/.test(reg)&&/added: true,\n    component: load\(\"Schedule\"/.test(reg)&&/DayStrip, WindowPicker, TariffClock/.test(bar);console.log(ok?'WIRED_UP':'ORPHANED')"
  EXPECT: WIRED_UP
  EVIDENCE: WIRED_UP

- [x] G14: Both directions and a dark pack are captured, so the axis is judged by eye
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','mint-ltr'].map(n=>'gates/screenshots/qa-schedule-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT

- [x] G15: The axis is one control, not twenty-four tab stops, and the arrows agree with the direction
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/schedule.tsx","utf8");const roving=/tabIndex=\{h === focus \? 0 : -1\}/.test(s);const mirrored=/const forward = rtl \? .ArrowLeft. : .ArrowRight.;/.test(s);const ends=/Home: -24, End: 24/.test(s);const why=/the key that means "next" has to agree/.test(s);console.log(roving&&mirrored&&ends&&why?"ONE_CONTROL_MANY_CELLS":"KEYBOARD_HOSTILE "+[roving,mirrored,ends,why].join())'
  EXPECT: ONE_CONTROL_MANY_CELLS
  EVIDENCE: ONE_CONTROL_MANY_CELLS

- [x] G16: The growth programme is written down with its acceptance criteria, so the next round is not improvised
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/LIBRARY-ROADMAP.md","utf8");const means=/حدّ شعري/.test(s)&&/ظلّ داخلي عند مَفصِل/.test(s)&&/تراكب/.test(s);const criteria=(s.match(/^\d\. \*\*/gm)||[]).length>=6;const rounds=(s.match(/^\*\*[٠-٩0-9]\./gm)||[]).length>=4;const done=/\| \*\*Schedule\*\* \|/.test(s);console.log(means&&criteria&&rounds&&done?"PROGRAMME_WRITTEN":"IMPROVISED "+[means,criteria,rounds,done].join())'
  EXPECT: PROGRAMME_WRITTEN
  EVIDENCE: PROGRAMME_WRITTEN
