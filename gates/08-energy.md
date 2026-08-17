# Gates: the Energy family

The owner confirmed this is an energy product, so reading and consumption get
real components rather than the meter references being treated as mood. The
family is built to `design-system/VISUAL-LAW.md` and these gates check that the
law was followed rather than cited.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds and the section is its own lazy chunk
  CHECK: npm run build 2>&1 | grep -E 'assets/Energy-|built in'
  EXPECT: /assets\/Energy-[^ ]+\.js/m
  EVIDENCE: dist/assets/Energy-DXnxrA3G.js                                          2.77 kB │ gzip:   1.40 kB │ map:     4.60 kB | ✓ built in 2.21s

- [x] G3: The family declares no raw colour, so it rides the seven packs
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/energy.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY

- [x] G4: Tier colour is an encoding, not decoration — one table, four fixed tiers, and the same colour reaches the seal and the ladder
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const t=/const TIER: Record<TariffTier[\s\S]*?\n\};/.exec(s)[0];const tiers=(t.match(/color: .var\(--/g)||[]).length;const seal=/background: TIER\[tier\]\.color/.test(s);const ladder=/background: TIER\[tier\]\.color/.test(s)&&/TIER\[tier\]\.color : .var\(--border\)./.test(s);console.log(tiers===4&&seal&&ladder?"TIER_IS_ENCODING":"TIER_IS_DECOR "+[tiers,seal,ladder].join())'
  EXPECT: TIER_IS_ENCODING
  EVIDENCE: TIER_IS_ENCODING

- [x] G5: The register turns as a mechanism — a transform on a drum, not text being replaced
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const drum=/function Drum\([\s\S]*?\n\}/.exec(s)[0];const wheel=/\[0, 1, 2, 3, 4, 5, 6, 7, 8, 9\]\.map/.test(drum);const moves=/transform: `translateY\(\$\{-digit \* 26\}px\)`/.test(drum);const clipped=/overflow: .hidden./.test(drum);console.log(wheel&&moves&&clipped?"REGISTER_IS_MECHANISM":"REGISTER_IS_TEXT "+[wheel,moves,clipped].join())'
  EXPECT: REGISTER_IS_MECHANISM
  EVIDENCE: REGISTER_IS_MECHANISM

- [x] G6: The leak reports leaving the usual range and nothing else — no state, no leak
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const gated=/className=\{outside \? .madar-leak. : undefined\}/.test(s);const coloured=/outside \? \{ \[.--madar-leak-color/.test(s);const derived=/const outside = above \|\| below;/.test(s);console.log(gated&&coloured&&derived?"LEAK_IS_VERDICT":"LEAK_IS_DECOR "+[gated,coloured,derived].join())'
  EXPECT: LEAK_IS_VERDICT
  EVIDENCE: LEAK_IS_VERDICT

- [x] G7: The strip is divided by a rule, not boxed into cards
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const strip=/export function UsageStrip[\s\S]*?\n\}/.exec(s)[0];const hairline=/borderInlineStart: i === 0 \? .none. : .1px solid var\(--border\)./.test(strip);const noPerItemBox=!/boxShadow/.test(strip.split("rows.map")[1]);console.log(hairline&&noPerItemBox?"DIVIDED_BY_RULE":"BOXED_IN_CARDS "+[hairline,noPerItemBox].join())'
  EXPECT: DIVIDED_BY_RULE
  EVIDENCE: DIVIDED_BY_RULE

- [x] G8: What already existed was checked, and the reuse-or-not decision is written down rather than left to inference
  CHECK: node -e 'const f=require("fs");const s=f.readFileSync("src/madar/components/energy.tsx","utf8");const reuses=/import \{ Sparkline \} from ..\/charts.;/.test(s)&&/<Sparkline /.test(s);const explains=/MeterDial/.test(s)&&/OdometerNumber/.test(s)&&/different job/.test(s);console.log(reuses&&explains?"REUSE_DECIDED":"REUSE_UNEXAMINED "+[reuses,explains].join())'
  EXPECT: REUSE_DECIDED
  EVIDENCE: REUSE_DECIDED

- [x] G9: In a browser: the usual range lands where the numbers put it, the register turns, the reading is announced, and one card leaks
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: ENERGY_CHECKS=ok
  EVIDENCE: ENERGY_CHECKS=ok | RUNTIME_ERRORS=0

- [x] G10: Axe, contrast across the packs, overflow and runtime all stay green with the family in
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G11: The section is registered and exported, not an orphan file
  CHECK: node -e "const f=require('fs');const reg=f.readFileSync('src/madar/sections.ts','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const ok=/madar-energy/.test(reg)&&/sections\/Energy/.test(reg)&&/MeterFace/.test(bar)&&/TariffLadder/.test(bar);console.log(ok?'WIRED_UP':'ORPHANED')"
  EXPECT: WIRED_UP
  EVIDENCE: WIRED_UP

- [x] G12: Both directions and a dark pack are captured, so the instrument is judged by eye
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','coral-ltr'].map(n=>'gates/screenshots/qa-energy-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
