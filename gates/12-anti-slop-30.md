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
  CHECK: node -e "const s=require('fs').readFileSync('design-system/ANTI-SLOP-30.md','utf8');const rows=(s.match(/^\| [0-9]{2} \|/gm)||[]).length;const conflicts=/تعارض مسجَّل/.test(s)&&/§3/.test(s)&&/data-glass/.test(s)&&/القانون يسبق/.test(s);const asks=/المطلوب منك/.test(s)&&/قرارٌ ينتظرك/.test(s);console.log(rows===30&&conflicts&&asks?'MATRIX_AND_CONFLICTS':'INCOMPLETE '+[rows,conflicts,asks].join())"
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
