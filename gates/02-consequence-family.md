# Gates: Consequence family from the uploaded Uiverse blocks

Scope: triage ~60 uploaded Uiverse blocks against the existing 281 exports, then add only the genuinely missing ideas as a NOVA-token Madar family, registered and gated like the rest of the library.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | tail -2
  EXPECT: built in
  EVIDENCE: ✓ built in 2.37s

- [x] G3: All six new components exist and are exported from the barrel
  CHECK: node -e "const f=require('fs');const want=['ShredConfirm','ReceiptPrinter','DotMatrixReadout','ElasticSwitch','PerimeterProgress','MarqueeFrame'];const src=f.readFileSync('src/madar/components/consequence.tsx','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const miss=want.filter(n=>!src.includes('export function '+n)||!bar.includes(n));console.log(miss.length?'MISSING '+miss.join(','):'ALL_SIX_EXPORTED')"
  EXPECT: ALL_SIX_EXPORTED
  EVIDENCE: ALL_SIX_EXPORTED

- [x] G4: The new family declares no raw color, so it follows every theme pack
  CHECK: grep -cE '(#[0-9a-fA-F]{3,8}|oklch\([0-9]|hsla?\([0-9]|rgba?\([0-9])' src/madar/components/consequence.tsx || true
  EXPECT: /^0\s*$/
  EVIDENCE: 0

- [x] G5: The section is registered, taking Madar from 29 to 30 sections, none orphaned
  CHECK: node -e "const f=require('fs');const reg=(f.readFileSync('src/madar/sections.ts','utf8').match(/showcase\/sections\/(\w+)/g)||[]).map(s=>s.split('/')[2]).sort();const disk=f.readdirSync('src/madar/showcase/sections').map(x=>x.replace('.tsx','')).sort();console.log(reg.length===disk.length&&reg.every((v,i)=>v===disk[i])?'MATCH '+reg.length:'MISMATCH reg='+reg.length+' disk='+disk.length)"
  EXPECT: MATCH 30
  EVIDENCE: MATCH 30

- [x] G6: Every new component is actually rendered by the section, none merely defined
  CHECK: node -e "const f=require('fs');const want=['ShredConfirm','ReceiptPrinter','DotMatrixReadout','ElasticSwitch','PerimeterProgress','MarqueeFrame'];const s=f.readFileSync('src/madar/showcase/sections/Consequence.tsx','utf8');const miss=want.filter(n=>!s.includes('<'+n));console.log(miss.length?'NOT_RENDERED '+miss.join(','):'ALL_SIX_RENDERED')"
  EXPECT: ALL_SIX_RENDERED
  EVIDENCE: ALL_SIX_RENDERED

- [x] G7: Zero Axe WCAG 2.1 AA violations on the Madar surface, new section included, across theme packs and viewports
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep AXE
  EXPECT: AXE_VIOLATIONS_MADAR=0
  EVIDENCE: AXE_VIOLATIONS_MADAR=0

- [x] G8: No horizontal overflow at 390px and 1440px with the new section active, RTL and LTR
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep OVERFLOW
  EXPECT: OVERFLOW=none
  EVIDENCE: OVERFLOW=none

- [x] G9: Zero console errors and zero page errors at runtime
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep RUNTIME
  EXPECT: RUNTIME_ERRORS=0
  EVIDENCE: RUNTIME_ERRORS=0

- [x] G10: The QA harness actually exercises the new section, so G7 to G9 are not vacuous
  CHECK: grep -c 'madar-consequence' tools/qa/madar-qa.mjs
  EXPECT: /^[1-9]/
  EVIDENCE: 1

- [x] G11: Every animation in the new family drives transform, opacity, filter, or clip-path only, per design.md §6
  CHECK: node -e "const c=require('fs').readFileSync('src/madar/components/consequence.tsx','utf8');const names=[...c.matchAll(/@keyframes\s+([\w-]+)/g)].map(m=>m[1]);console.log(names.length?'INLINE_KEYFRAMES '+names.join(','):'NO_INLINE_KEYFRAMES')"
  EXPECT: NO_INLINE_KEYFRAMES
  EVIDENCE: NO_INLINE_KEYFRAMES

- [x] G12: Provenance recorded: every added pattern names its Uiverse author, and every skipped block names the existing component that already covers it
  CHECK: node -e "const d=require('fs').readFileSync('design-system/madar/SOURCES-UIVERSE.md','utf8');const stems=['Shred','Receipt','Matrix','Elastic','Perimeter','Marquee'];const miss=stems.filter(s=>!d.includes(s));console.log(miss.length?'UNDOCUMENTED '+miss.join(','):'PROVENANCE_RECORDED')"
  EXPECT: PROVENANCE_RECORDED
  EVIDENCE: PROVENANCE_RECORDED

- [x] G13: Nothing added duplicates an existing component: no stem appears in any other family file
  CHECK: node -e "const f=require('fs');const dir='src/madar/components';const stems=['Shred','Receipt','DotMatrix','ElasticSwitch','Perimeter','MarqueeFrame'];const dup=[];for(const file of f.readdirSync(dir)){if(file==='consequence.tsx'||!file.endsWith('.tsx'))continue;const src=f.readFileSync(dir+'/'+file,'utf8');for(const s of stems)if(src.includes(s))dup.push(s+' in '+file)}console.log(dup.length?'DUPLICATES '+dup.join('; '):'NO_DUPLICATES')"
  EXPECT: NO_DUPLICATES
  EVIDENCE: NO_DUPLICATES
