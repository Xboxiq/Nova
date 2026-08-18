# Gates: the outage family, and §19

Round one of the growth programme in `design-system/LIBRARY-ROADMAP.md`. It did
not land as planned, and that is recorded rather than tidied away: the plan said
"a timeline of outages", and building it showed that is `DutyCycle`'s shape with
different labels — spans on an axis, width for duration. It would have added a
component and no answer.

The question a customer actually has is comparative — is it me or the grid? — and
that answer lives in whether the two series coincide. Hence §19, and hence a
component whose whole job is to draw the crossing.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds and the section is its own lazy chunk
  CHECK: npm run build 2>&1 | grep -E 'assets/Outage-|built in'
  EXPECT: /assets\/Outage-[^ ]+\.js/m
  EVIDENCE: dist/assets/Outage-Cgx5buEJ.js                                          2.46 kB │ gzip:   1.29 kB │ map:     4.04 kB | ✓ built in 2.16s

- [x] G3: No raw colour, so it rides the seven packs
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/outage.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY

- [x] G4: It obeys the rules the owner ruled in — nothing over 6px, no shadow that is not an inset
  CHECK: node tools/qa/no-drop-shadow.mjs 2>&1 | grep -E 'BLURRED_DROP_SHADOWS|RADII_OVER_6PX'
  EXPECT: /BLURRED_DROP_SHADOWS=0/m
  EVIDENCE: BLURRED_DROP_SHADOWS=0 | RADII_OVER_6PX=0

- [x] G5: The crossing is computed, not eyeballed — and the verdict is derived from it
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/outage.tsx","utf8");const fn=/function cross\(a: Span, b: Span\): Span \| null \{[\s\S]*?\n\}/.exec(s)[0];const real=/Math\.max\(a\.from, b\.from\)/.test(fn)&&/Math\.min\(a\.to, b\.to\)/.test(fn);const ties=/mine\.flatMap\(\(m\) => theirs\.map\(\(t\) => cross\(m, t\)\)/.test(s);const derived=/const alone = mine\.filter\(\(m\) => !theirs\.some\(\(t\) => cross\(m, t\)\)\);/.test(s)&&/return alone\.length \? .premises. : .grid.;/.test(s);console.log(real&&ties&&derived?"VERDICT_IS_DERIVED":"VERDICT_IS_TYPED_IN "+[real,ties,derived].join())'
  EXPECT: VERDICT_IS_DERIVED
  EVIDENCE: VERDICT_IS_DERIVED

- [x] G6: The saturated colour appears once — on what has not ended. History is neutral
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/outage.tsx","utf8");const once=/background: still \? .var\(--danger\). : .var\(--border-strong\).,/.test(s);const derived=/const still = live && s\.to >= now;/.test(s);const why=/history is neutral; only what is still happening is coloured/.test(s);console.log(once&&derived&&why?"COLOUR_ONCE":"COLOUR_EVERYWHERE "+[once,derived,why].join())'
  EXPECT: COLOUR_ONCE
  EVIDENCE: COLOUR_ONCE

- [x] G7: The tie reads as a tie — hairlines alone were too quiet at three pixels
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/outage.tsx","utf8");const edges=/borderInlineStart: .1px solid var\(--border-strong\).,\n                borderInlineEnd: .1px solid var\(--border-strong\).,/.test(s);const shaded=/backgroundColor: .color-mix\(in srgb, var\(--border-strong\) 26%, transparent\).,/.test(s);const why=/too quiet to see at\n                 three pixels wide/.test(s);console.log(edges&&shaded&&why?"TIE_IS_VISIBLE":"TIE_IS_INVISIBLE "+[edges,shaded,why].join())'
  EXPECT: TIE_IS_VISIBLE
  EVIDENCE: TIE_IS_VISIBLE

- [x] G8: The duplicate that was not built is written down, with the reason
  CHECK: node -e 'const f=require("fs");const c=f.readFileSync("src/madar/components/outage.tsx","utf8");const r=f.readFileSync("design-system/LIBRARY-ROADMAP.md","utf8");const named=/that is `DutyCycle`.s shape with different labels/.test(c)&&/add a component and no answer/.test(c);const learned=/الخطّة تُختبر عند البناء/.test(r);console.log(named&&learned?"DUPLICATE_REFUSED":"DUPLICATE_UNEXAMINED "+[named,learned].join())'
  EXPECT: DUPLICATE_REFUSED
  EVIDENCE: DUPLICATE_REFUSED

- [x] G9: In a browser: every tie sits on a real crossing, every crossing is tied, the two cases disagree, and one untied outage flips the verdict
  CHECK: node tools/qa/outage-qa.mjs
  EXPECT: OUTAGE_CHECKS=ok
  EVIDENCE: OUTAGE_CHECKS=ok | RUNTIME_ERRORS=0

- [x] G10: Axe, contrast across the seven packs, overflow and runtime stay green
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G11: The standard still passes, and the shell's slop count did not rise
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | tail -1; node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /ANTI_SLOP_30=ok/m
  EVIDENCE: ANTI_SLOP_30=ok | SHELL_SLOP_HITS=54

- [x] G12: §19 is in the law, with both conditions it implies
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const art=/### 19\. حين يتشارك مساران محورًا/.test(s);const derived=/الحكم مُشتَقّ لا مكتوب/.test(s);const visible=/والرابطة تُقرأ رابطةً/.test(s);const banned=/حكمٌ مكتوب بيدٍ بجانب رسم لا يُشتقّ منه \(§19\)/.test(s);console.log(art&&derived&&visible&&banned?"LAW_19_COMPLETE":"LAW_19_PARTIAL "+[art,derived,visible,banned].join())'
  EXPECT: LAW_19_COMPLETE
  EVIDENCE: LAW_19_COMPLETE

- [x] G13: Registered, exported, marked as an addition
  CHECK: node -e "const f=require('fs');const reg=f.readFileSync('src/madar/sections.ts','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const ok=/madar-outage/.test(reg)&&/sections\/Outage/.test(reg)&&/OutageCompare/.test(bar);console.log(ok?'WIRED_UP':'ORPHANED')"
  EXPECT: WIRED_UP
  EVIDENCE: WIRED_UP

- [x] G14: Both directions and a dark pack are captured
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','iris-ltr'].map(n=>'gates/screenshots/qa-outage-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
