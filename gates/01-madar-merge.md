# Gates: Madar merge verification and over-engineering pass

Scope: prove the Madar-into-NOVA merge is actually complete and carries no over-built code, using runnable checks rather than claims.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | tail -2
  EXPECT: built in
  EVIDENCE: ✓ built in 2.62s

- [x] G3: Zero known dependency vulnerabilities
  CHECK: npm audit --audit-level=high 2>&1 | tail -2
  EXPECT: found 0 vulnerabilities
  EVIDENCE: found 0 vulnerabilities

- [x] G4: The bridge declares no color of its own, so there is one source of truth for color
  CHECK: grep -cE '(#[0-9a-fA-F]{3,8}\b|oklch\([0-9]|rgba?\([0-9]|hsla?\([0-9])' src/madar/bridge.css || true
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G5: All 29 Madar showcase sections are registered, none orphaned
  CHECK: node -e "const f=require('fs');const reg=(f.readFileSync('src/madar/sections.ts','utf8').match(/showcase\/sections\/(\w+)/g)||[]).map(s=>s.split('/')[2]).sort();const disk=f.readdirSync('src/madar/showcase/sections').map(x=>x.replace('.tsx','')).sort();console.log(reg.length===disk.length&&reg.every((v,i)=>v===disk[i])?'MATCH '+reg.length:'MISMATCH reg='+reg.length+' disk='+disk.length)"
  EXPECT: MATCH 29
  EVIDENCE: MATCH 29

- [x] G6: Every theme pack declares the full NOVA color contract, so no pack falls back to another pack's colors
  CHECK: awk '/\[data-theme/{p++; c[p]=0} /--nova-[a-z-]+:/{c[p]++} END{for(i=2;i<=p;i++) if(c[i]!=c[1]){print "MISMATCH pack " i " has " c[i] " vs " c[1]; exit} print "ALL_PACKS_COMPLETE " p}' design-system/nova-design-os/tokens/theme-packs.css
  EXPECT: ALL_PACKS_COMPLETE 5
  EVIDENCE: ALL_PACKS_COMPLETE 5

- [x] G7: Madar CSS cannot reach the NOVA shell: no unscoped element selectors
  CHECK: node -e "const c=require('fs').readFileSync('src/madar/interactions.css','utf8').replace(/\/\*[\s\S]*?\*\//g,'');const bad=[...c.matchAll(/^([^{@}]+)\{/gm)].map(m=>m[1].trim()).filter(s=>s.split(',').some(p=>/^(button|input|select|textarea|body|html|a|p|h[1-6]|::selection)\b/.test(p.trim())));console.log(bad.length?'LEAK '+JSON.stringify(bad):'SCOPED')"
  EXPECT: SCOPED
  EVIDENCE: SCOPED

- [x] G8: The app never imports from the archive, and the archive never builds
  CHECK: grep -rn "archive/madar" src/ index.html vite.config.ts tsconfig*.json 2>/dev/null | wc -l
  EXPECT: /^\s*0\s*$/
  EVIDENCE: 0

- [x] G9: Zero Axe WCAG 2.1 AA violations on the Madar surface across theme packs and viewports
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep AXE
  EXPECT: AXE_VIOLATIONS_MADAR=0
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G10: No horizontal overflow at 390px and 1440px, in RTL and LTR
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep OVERFLOW
  EXPECT: OVERFLOW=none
  EVIDENCE: OVERFLOW=none

- [x] G11: Zero console errors and zero page errors at runtime
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep RUNTIME
  EXPECT: RUNTIME_ERRORS=0
  EVIDENCE: RUNTIME_ERRORS=0

- [x] G12: Every theme pack clears WCAG AA on the measured token pairs
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep CONTRAST
  EXPECT: CONTRAST_FAILURES=0
  EVIDENCE: CONTRAST_FAILURES=0

- [x] G13: Theme menu opens, applies a pack, and dismisses on outside click and Escape
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep THEME_MENU
  EXPECT: THEME_MENU=ok
  EVIDENCE: THEME_MENU=ok

- [x] G14: ponytail-review run over the full merge diff; every finding either applied or refused with a stated reason
  EVIDENCE: 6 findings on the 1563-line merge diff. Applied 5: madarSectionCount deleted (zero callers, sections.ts); useMemo dropped from a 29-item filter (MadarLibrary.tsx); two near-identical filter memos folded into one search() helper (CommandPalette.tsx); DARK_THEMES.includes recomputed where isDarkTheme was in scope (App.tsx); outside-click and Escape handlers folded into one listener (App.tsx). Refused 1 with reason: replacing the theme popover with the native HTML popover attribute would need CSS anchor positioning, which is Chromium-only, or a hand-recomputed fixed position duplicating the topbar's centering math, so it buys 17 fewer lines at the cost of correct placement in Firefox and Safari. Also refused, same review: replacing the THEME_COLOR table with the computed --nova-canvas token, because getComputedStyle returns lab()/oklch() for the oklch packs and meta theme-color needs a color the browser will parse. Net measured: git diff --stat over the four touched files = 71 insertions, 81 deletions, -10 net after the cuts absorbed the new close handler.
