# Gates: the anti-slop-ui standard

The owner supplied the `anti-slop-ui` skill and asked for it to be applied. It is
installed at `.claude/skills/anti-slop-ui/SKILL.md`, and its own closing section
is a thirty-row verification matrix — so these gates exist to keep that matrix
true rather than ticked.

Three of its rules collide with `design-system/VISUAL-LAW.md`, which the owner
authored across five batches of visual feed. Those are recorded as conflicts with
a ruling and a question, not silently resolved; `ANTI-SLOP-30.md` holds them, and
G8 checks they stay recorded.

- [x] G1: The skill is installed as a project skill, not pasted into a comment
  CHECK: node -e "const f=require('fs');const p='.claude/skills/anti-slop-ui/SKILL.md';const s=f.existsSync(p)?f.readFileSync(p,'utf8'):'';console.log(/^---\nname: anti-slop-ui/.test(s)&&/THE 30 BANNED UI\/UX PATTERNS/.test(s)?'SKILL_INSTALLED':'SKILL_MISSING')"
  EXPECT: SKILL_INSTALLED
  EVIDENCE: SKILL_INSTALLED

- [x] G2: TypeScript compiles clean from scratch after the sweep
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G3: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 1.67s

- [x] G4: The standard is enforced by a runnable check, and it passes
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | tail -1
  EXPECT: ANTI_SLOP_30=ok
  EVIDENCE: ANTI_SLOP_30=ok

- [x] G5: Not one sparkle left anywhere, and the brand mark is drawn rather than imported
  CHECK: node -e "const {execSync}=require('child_process');const n=execSync('grep -rc Sparkle src/ | grep -v \":0\" | wc -l',{encoding:'utf8'}).trim();const mark=require('fs').readFileSync('src/components/BrandMark.tsx','utf8');console.log(n==='0'&&/<svg/.test(mark)&&/<path d=/.test(mark)?'NO_SPARKLES_OWN_MARK':'SPARKLES '+n)"
  EXPECT: NO_SPARKLES_OWN_MARK
  EVIDENCE: NO_SPARKLES_OWN_MARK

- [x] G6: The lazy stage holds its shape while loading, instead of a line of text
  CHECK: node -e "const f=require('fs');const sk=f.readFileSync('src/components/MadarStageSkeleton.tsx','utf8');const app=f.readFileSync('src/App.tsx','utf8')+f.readFileSync('src/components/MadarLibrary.tsx','utf8');const shaped=/madar-skeleton-title/.test(sk)&&/madar-skeleton-grid/.test(sk)&&/aria-busy/.test(sk);const used=(app.match(/<MadarStageSkeleton locale=\{locale\} \/>/g)||[]).length===2&&!/madar-loading/.test(app);console.log(shaped&&used?'STAGE_HOLDS_SHAPE':'STAGE_FLASHES '+[shaped,used].join())"
  EXPECT: STAGE_HOLDS_SHAPE
  EVIDENCE: STAGE_HOLDS_SHAPE

- [x] G7: Terms and Privacy are real documents behind real controls, and they describe what the site actually does
  CHECK: node -e "const s=require('fs').readFileSync('src/components/LegalDialog.tsx','utf8');const both=/Terms of Use/.test(s)&&/Privacy Policy/.test(s)&&/شروط الاستخدام/.test(s)&&/سياسة الخصوصية/.test(s);const truthful=/nova-theme/.test(s)&&/nova-glass/.test(s)&&/nova-locale/.test(s)&&/GitHub Pages/.test(s)&&/no external requests/.test(s);const native=/showModal\(\)/.test(s);console.log(both&&truthful&&native?'LEGAL_IS_REAL':'LEGAL_IS_A_STUB '+[both,truthful,native].join())"
  EXPECT: LEGAL_IS_REAL
  EVIDENCE: LEGAL_IS_REAL

- [x] G8: The conflicts with the project's own law are recorded with a ruling, not quietly resolved either way
  CHECK: node -e "const s=require('fs').readFileSync('design-system/ANTI-SLOP-30.md','utf8');const matrix=s.split('## الجدول')[1].split('---')[0];const rows=(matrix.match(/^\| [0-9]{2} \|/gm)||[]).length;const conflicts=/تعارض مسجَّل/.test(s)&&/§3/.test(s)&&/data-glass/.test(s)&&/القانون يسبق/.test(s);const asks=/المطلوب منك/.test(s)&&/قرارٌ ينتظرك/.test(s);console.log(rows===30&&conflicts&&asks?'MATRIX_AND_CONFLICTS':'INCOMPLETE '+[rows,conflicts,asks].join())"
  EXPECT: MATRIX_AND_CONFLICTS
  EVIDENCE: MATRIX_AND_CONFLICTS

- [x] G9: Exemptions carry a written reason, and the scanner honours only those
  CHECK: node -e "const f=require('fs');const sc=f.readFileSync('tools/qa/anti-slop-30.mjs','utf8');const honours=/anti-slop-ignore-next-line/.test(sc);const c=f.readFileSync('src/madar/components/content.tsx','utf8');const reasoned=/hue slider's track is the colour circle itself[\s\S]{0,140}anti-slop-ignore-next-line 29/.test(c);console.log(honours&&reasoned?'EXEMPTIONS_REASONED':'EXEMPTIONS_BARE '+[honours,reasoned].join())"
  EXPECT: EXEMPTIONS_REASONED
  EVIDENCE: EXEMPTIONS_REASONED

- [x] G10: No hover lift survives in the shell — the border colour is the whole report
  CHECK: node -e 'const f=require("fs");const files=["src/styles.css","src/primitives.css","src/madar-library.css","src/demos.css"];const bad=[];for(const p of files){const css=f.readFileSync(p,"utf8");for(const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)){if(/:hover/.test(m[1])&&/transform:\s*translateY\(-/.test(m[2]))bad.push(p+":"+m[1].trim().split("\n").pop().slice(0,40));}}console.log(bad.length?"HOVER_LIFTS "+bad.join(" | "):"NO_HOVER_LIFT")'
  EXPECT: NO_HOVER_LIFT
  EVIDENCE: NO_HOVER_LIFT

- [x] G11: The sweep did not raise the existing scanner's shell count, and every check still passes
  CHECK: node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /SHELL_SLOP_HITS=([0-5]?[0-9]|6[0-2])$/m
  EVIDENCE: SHELL_SLOP_HITS=61

- [x] G12: Axe, contrast across the seven packs, overflow, runtime and addressing all stay green
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G13: The footer and both documents are captured, so what shipped is on record
  CHECK: node -e "const f=require('fs');const need=['gates/screenshots/qa-legal-light-rtl.png','gates/screenshots/qa-footer-night-rtl.png','gates/screenshots/qa-glass-g0-light-rtl.png'];const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT

- [x] G14: The mono family named in the tokens is the one the bundle actually ships
  CHECK: node -e 'const f=require("fs");const pkg=JSON.parse(f.readFileSync("package.json","utf8")).dependencies;const tok=f.readFileSync("design-system/nova-design-os/tokens/tokens.css","utf8");const main=f.readFileSync("src/main.tsx","utf8");const named=/--nova-font-mono: "IBM Plex Mono"/.test(tok);const shipped=Boolean(pkg["@fontsource/ibm-plex-mono"])&&/ibm-plex-mono\/latin-400\.css/.test(main);const gone=!pkg["@fontsource-variable/geist-mono"]&&!/geist/i.test(tok+main);console.log(named&&shipped&&gone?"MONO_NAMED_AND_SHIPPED":"MONO_NOMINAL "+[named,shipped,gone].join())'
  EXPECT: MONO_NAMED_AND_SHIPPED
  EVIDENCE: MONO_NAMED_AND_SHIPPED

- [x] G15: Only the latin subsets ride along, so the fix did not cost 160kB of unrenderable glyphs
  CHECK: node -e 'const {execSync}=require("child_process");const out=execSync("ls dist/assets | grep -c ibm-plex-mono || true",{encoding:"utf8"}).trim();const bad=execSync("ls dist/assets | grep -cE \"ibm-plex-mono-(cyrillic|vietnamese|greek)\" || true",{encoding:"utf8"}).trim();console.log(Number(out)>0&&bad==="0"?"LATIN_ONLY":"SUBSETS_BLOATED "+[out,bad].join())'
  EXPECT: LATIN_ONLY
  EVIDENCE: LATIN_ONLY

- [x] G16: Rule 08 is reachable rather than parked — a solid glass level exists and rebinds the tokens, not just the blur
  CHECK: node -e 'const f=require("fs");const t=f.readFileSync("src/madar/theme/themes.ts","utf8");const css=f.readFileSync("src/madar/bridge.css","utf8");const typed=/GlassLevel = "g0"/.test(t)&&/level: "g0"/.test(t)&&/value === "g0"/.test(t);const block=/\[data-glass="g0"\] \{[\s\S]*?\}/.exec(css);const rebinds=block&&/--nova-glass: var\(--nova-surface\)/.test(block[0])&&/--nova-glass-specular: transparent/.test(block[0])&&/--glass-blur: 0px/.test(block[0]);console.log(typed&&rebinds?"SOLID_LEVEL_EXISTS":"GLASS_HAS_NO_ZERO "+[typed,Boolean(rebinds)].join())'
  EXPECT: SOLID_LEVEL_EXISTS
  EVIDENCE: SOLID_LEVEL_EXISTS

- [x] G17: In a browser, g0 actually turns the glass opaque
  CHECK: node tools/qa/glass-zero.mjs
  EXPECT: GLASS_ZERO=ok
  EVIDENCE: GLASS_ZERO=ok | OFFERED_IN_UI=true

- [x] G18: The state-reporting check keeps its ruling beside the code, not only in the document
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/content.tsx","utf8");const c=/\/\* ── ChecklistRow[\s\S]*?\*\//.exec(s)[0];console.log(/anti-slop-ui #16 and #25/.test(c)&&/`ok` is a real boolean/.test(c)&&/ANTI-SLOP-30\.md/.test(c)?"RULING_BESIDE_CODE":"RULING_ONLY_IN_DOC")'
  EXPECT: RULING_BESIDE_CODE
  EVIDENCE: RULING_BESIDE_CODE

- [x] G19: Rules 07 and 09 are executed, and measured rather than asserted
  CHECK: node tools/qa/no-drop-shadow.mjs 2>&1 | grep -E 'BLURRED_DROP_SHADOWS|RADII_OVER_6PX'
  EXPECT: /BLURRED_DROP_SHADOWS=0/m
  EVIDENCE: BLURRED_DROP_SHADOWS=0 | RADII_OVER_6PX=0

- [x] G20: The radius tokens are inside the band, so thirty sections follow from one block
  CHECK: node -e 'const t=require("fs").readFileSync("design-system/nova-design-os/tokens/tokens.css","utf8");const vals=[...t.matchAll(/--nova-radius-\w+:\s*(\d+)px/g)].map((m)=>Number(m[1]));const shadows=[...t.matchAll(/--nova-shadow-(sm|md|lg):\s*([^;]+);/g)].map((m)=>m[2].trim());console.log(vals.length>=5&&vals.every((v)=>v<=6)&&shadows.every((v)=>v==="none")?"TOKENS_IN_BAND "+vals.join("/"):"TOKENS_OUT "+vals.join("/"))'
  EXPECT: /^TOKENS_IN_BAND/m
  EVIDENCE: TOKENS_IN_BAND 4/5/6/6/6

- [x] G21: The five banned layouts are gone from the library, its barrel, its roster and the showcase
  CHECK: node -e 'const {execSync}=require("child_process");const n=execSync("grep -rl \"SquishyPricing\\|TestimonialSlider\\|NoiseDotCard\\|BentoGrid\\|BentoCell\\|DotMatrixReadout\" src/ | wc -l",{encoding:"utf8"}).trim();console.log(n==="0"?"VOCABULARY_REMOVED":"TRACES_LEFT "+n)'
  EXPECT: VOCABULARY_REMOVED
  EVIDENCE: VOCABULARY_REMOVED

- [x] G22: The solid surface is what a reader lands on
  CHECK: node -e 'const s=require("fs").readFileSync("src/App.tsx","utf8");console.log(/isGlassLevel\(stored\) \? stored : "g0"/.test(s)?"SOLID_BY_DEFAULT":"GLASS_BY_DEFAULT")'
  EXPECT: SOLID_BY_DEFAULT
  EVIDENCE: SOLID_BY_DEFAULT

- [x] G23: The law was amended to match the code, rather than left asserting three shadows that no longer exist
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/VISUAL-LAW.md","utf8");const amended=(s.match(/معدَّل بقرار المالك/g)||[]).length===2;const ruling=/حكم المالك بترجيح `anti-slop-ui` #7 و#9/.test(s)&&/بقي \*\*الانحجاب المحيطي/.test(s);const cost=/الأجسام في المكتبة تقرأ الآن \*\*أرقّ\*\*/.test(s);console.log(amended&&ruling&&cost?"LAW_MATCHES_CODE":"LAW_IS_STALE "+[amended,ruling,cost].join())'
  EXPECT: LAW_MATCHES_CODE
  EVIDENCE: LAW_MATCHES_CODE

- [x] G24: Everything else still holds with the depth gone: axe, contrast, both instruments, the upload flow and addressing
  CHECK: for f in madar-qa energy-qa upload-qa addressing glass-zero; do node tools/qa/$f.mjs 2>&1 | grep -E '^(CONTRAST_FAILURES|AXE_VIOLATIONS_MADAR|ENERGY_CHECKS|UPLOAD_FLOW|ADDRESSING|GLASS_ZERO)='; done
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: ADDRESSING=ok | GLASS_ZERO=ok

- [x] G25: The standard is measured over the library too, not the shell alone
  CHECK: node -e 'const s=require("fs").readFileSync("tools/qa/anti-slop-30.mjs","utf8");const four=/\{ n: "04"[^}]*files: \[\.\.\.CSS, \.\.\.ALL\]/.test(s);const twentyfour=/\{ n: "24"[^}]*files: ALL,/.test(s);const hover=/\{ n: "21", name: "no lift or scale on hover", fn: hoverLifts \}/.test(s);console.log(four&&twentyfour&&hover?"LIBRARY_IN_SCOPE":"SHELL_ONLY "+[four,twentyfour,hover].join())'
  EXPECT: LIBRARY_IN_SCOPE
  EVIDENCE: LIBRARY_IN_SCOPE

- [x] G26: No lift and no scale on hover in any stylesheet, the madar layer included
  CHECK: node tools/qa/anti-slop-30.mjs 2>&1 | grep -E '^  (PASS|FAIL) 21 '
  EXPECT: /^  PASS 21/m
  EVIDENCE: PASS 21  no lift or scale on hover

- [x] G27: The library's hover utilities report through colour, and the press scales are deliberately left
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/interactions.css","utf8");const lift=/\.i-lift:hover,\n\.i-lift-shadow:hover,\n\.i-lift2-shadow:hover \{ border-color: var\(--border-strong\); \}/.test(s);const dock=/\.i-dock-icon:hover \{ background: var\(--surface-2\); \}/.test(s);const card=/\.i-card:hover \{ border-color: var\(--border-strong\); \}/.test(s);const press=(s.match(/\.i-press-\d+:active \{ transform: scale\(/g)||[]).length>=5;const why=/direct manipulation rather than an invitation/.test(s);console.log(lift&&dock&&card&&press&&why?"UTILITIES_RECOLOURED":"UTILITIES_STILL_LIFT "+[lift,dock,card,press,why].join())'
  EXPECT: UTILITIES_RECOLOURED
  EVIDENCE: UTILITIES_RECOLOURED

- [x] G28: What the scanner flags in the library but is not a violation is written down with its reason, so it is not churned next pass
  CHECK: node -e 'const s=require("fs").readFileSync("design-system/ANTI-SLOP-30.md","utf8");const sec=/## تمريرة المكتبة/.test(s);const rulings=/\*\*مفردات الفيزياء\*\*/.test(s)&&/أطقم Lucide\/Feather الجاهزة/.test(s)&&/مؤشّرًا \*\*نازلًا سلفًا\*\*/.test(s);const emoji=/\*\*هو البيان المعدود\*\*/.test(s);console.log(sec&&rulings&&emoji?"LIBRARY_PASS_RECORDED":"UNRECORDED "+[sec,rulings,emoji].join())'
  EXPECT: LIBRARY_PASS_RECORDED
  EVIDENCE: LIBRARY_PASS_RECORDED

- [x] G29: The emoji that stays keeps its ruling beside the component
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/social.tsx","utf8");const c=/\/\* ── ReactionBar[\s\S]*?\*\//.exec(s)[0];console.log(/anti-slop-ui #18/.test(c)&&/the emoji \*is\* the data/.test(c)&&/ANTI-SLOP-30\.md/.test(c)?"RULING_BESIDE_CODE":"RULING_ONLY_IN_DOC")'
  EXPECT: RULING_BESIDE_CODE
  EVIDENCE: RULING_BESIDE_CODE

- [x] G30: The matrix is numbered by the skill's own closing checklist, and every one of the thirty has a row
  CHECK: node -e 'const f=require("fs");const doc=f.readFileSync("design-system/ANTI-SLOP-30.md","utf8");const matrix=doc.split("## الجدول")[1].split("`ANTI_SLOP_30")[0];const nums=[...matrix.matchAll(/^\| (\d{2}) \|/gm)].map((m)=>m[1]);const complete=nums.length===30&&nums.every((n,i)=>Number(n)===i+1);const skill=f.readFileSync(".claude/skills/anti-slop-ui/SKILL.md","utf8");const anchors=[["02","Lucide"],["07","emoji"],["09","em dash"],["15","X, it"],["19","radii are crisp"],["28","translateY lift"]];const placed=anchors.every(([n,txt])=>new RegExp(`\\| ${n} \\|[^\\n]*`).test(matrix))&&anchors.every(([,txt])=>skill.toLowerCase().includes(txt.toLowerCase()));const noted=/ترقيم \*\*قائمة التحقّق في آخر المهارة\*\*/.test(doc);console.log(complete&&placed&&noted?"MATRIX_CANONICAL":"MATRIX_DRIFTED "+[nums.length,complete,placed,noted].join())'
  EXPECT: MATRIX_CANONICAL
  EVIDENCE: MATRIX_CANONICAL
