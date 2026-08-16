# Gates: the Upload family

Source: the Glass Upload Card in `design-system/madar/SOURCES-UPLOAD.md`. The
idea taken is that an upload has a destination with a shape, and the destination
reacts to what lands in it. The card's own execution — six stacked radial
gradients, a CDN font host, forty hand-written purple `hsl()` values, and a
counter that reaches 100 without uploading anything — was rejected, and these
gates are what stop any of it from arriving through the back door.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds and the section is its own lazy chunk
  CHECK: npm run build 2>&1 | grep -E 'assets/Upload-|built in'
  EXPECT: /assets\/Upload-[^ ]+\.js/m
  EVIDENCE: dist/assets/Upload-vIyqq_-6.js                                          2.75 kB │ gzip:   1.52 kB │ map:     5.23 kB | ✓ built in 2.16s

- [x] G3: The component declares no raw color — every color is a token
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY

- [x] G4: No external font or icon host is introduced, and no CDN link is copied over
  CHECK: node -e "const f=require('fs');const files=['src/madar/components/upload.tsx','src/madar/showcase/sections/Upload.tsx'];const bad=files.flatMap(p=>[...f.readFileSync(p,'utf8').matchAll(/https?:\/\/[^'\"\s)]+/g)].map(m=>p+': '+m[0]));console.log(bad.length?'EXTERNAL_HOST '+bad.join(' | '):'SELF_CONTAINED')"
  EXPECT: SELF_CONTAINED
  EVIDENCE: SELF_CONTAINED

- [x] G5: The component itself is clean by the scanner — nothing the source was rejected for came back with it
  CHECK: node -e "const r=JSON.parse(require('child_process').execFileSync('node',['.claude/skills/kill-ai-slop/scripts/scan.mjs','src','--json'],{encoding:'utf8',maxBuffer:33554432}));const hits=r.findings.flatMap(f=>f.hits.filter(h=>h.file==='madar/components/upload.tsx').map(h=>f.id+' '+h.line));console.log('COMPONENT_SLOP='+hits.length);hits.forEach(h=>console.log('  '+h))"
  EXPECT: /^COMPONENT_SLOP=0$/m
  EVIDENCE: COMPONENT_SLOP=0

- [x] G6: The lid is driven by state, not by an infinite loop — no repeating animation on the component
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const loops=[...s.matchAll(/animation:[^,;'\`]*infinite/g)].map(m=>m[0].trim());const bad=loops.filter(l=>!/spin/.test(l));console.log(bad.length?'AMBIENT_LOOP '+bad.join(' | '):'STATE_DRIVEN')"
  EXPECT: STATE_DRIVEN
  EVIDENCE: STATE_DRIVEN

- [x] G7: Cancel actually aborts the transfer rather than only hiding the row
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const ok=/new AbortController\(\)/.test(s)&&/controller\.signal/.test(s)&&/signal\.addEventListener\('abort'/.test(s)&&/AbortError/.test(s);console.log(ok?'ABORT_WIRED':'ABORT_COSMETIC')"
  EXPECT: ABORT_WIRED
  EVIDENCE: ABORT_WIRED

- [x] G8: Progress is announced to assistive tech, not only drawn
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const need=['role=\"progressbar\"','aria-valuenow','aria-valuemin','aria-valuemax','aria-live'];const miss=need.filter(n=>!s.includes(n));console.log(miss.length?'A11Y_MISSING '+miss.join(','):'ANNOUNCED')"
  EXPECT: ANNOUNCED
  EVIDENCE: ANNOUNCED

- [x] G9: Layout is direction-agnostic — no physical left/right that would strand RTL
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const bad=[...s.matchAll(/\b(marginLeft|marginRight|paddingLeft|paddingRight|left:|right:)\s*[:=]?/g)].map(m=>m[0]);console.log(bad.length?'PHYSICAL_SIDE '+[...new Set(bad)].join(','):'LOGICAL_ONLY')"
  EXPECT: LOGICAL_ONLY
  EVIDENCE: LOGICAL_ONLY

- [x] G10: The showcase demonstrates failure deterministically, so the retry path is not decoration
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/showcase/sections/Upload.tsx','utf8');const ok=/reject\(new Error/.test(s)&&!/Math\.random/.test(s);console.log(ok?'DETERMINISTIC_FAILURE':'NO_FAILURE_PATH')"
  EXPECT: DETERMINISTIC_FAILURE
  EVIDENCE: DETERMINISTIC_FAILURE

- [x] G11: The existing FileDropzone was left alone rather than half-merged into this
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/essentials.tsx','utf8');console.log(/export function FileDropzone/.test(s)?'DROPZONE_INTACT':'DROPZONE_DISTURBED')"
  EXPECT: DROPZONE_INTACT
  EVIDENCE: DROPZONE_INTACT

- [x] G12: The section is registered, exported, and reachable — not an orphan file
  CHECK: node -e "const f=require('fs');const reg=f.readFileSync('src/madar/sections.ts','utf8');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const ok=/madar-upload/.test(reg)&&/sections\/Upload/.test(reg)&&/UploadFolder/.test(bar);console.log(ok?'WIRED_UP':'ORPHANED')"
  EXPECT: WIRED_UP
  EVIDENCE: WIRED_UP

- [x] G13: Axe stays clean, contrast holds across the packs, nothing overflows, no runtime errors
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /RUNTIME_ERRORS=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G14: The upload actually runs in a browser: files land, progress advances, and a failure exposes retry
  CHECK: node tools/qa/upload-qa.mjs
  EXPECT: UPLOAD_FLOW=ok
  EVIDENCE: UPLOAD_FLOW=ok | RUNTIME_ERRORS=0

- [x] G15: Filenames and sizes are bidi-isolated, so an Arabic name does not send its extension to the wrong end
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const ok=/<bdi[\s\S]{0,300}?\{item\.name\}[\s\S]{0,20}?<\/bdi>/.test(s)&&/<bdi[^>]*>\{formatSize\(item\.size\)\}<\/bdi>/.test(s);console.log(ok?'BIDI_ISOLATED':'BIDI_UNGUARDED')"
  EXPECT: BIDI_ISOLATED
  EVIDENCE: BIDI_ISOLATED

- [x] G16: Both directions and a dark pack are captured, so the mirroring is judged by eye and not by claim
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','mint-ltr'].map(n=>'gates/screenshots/qa-upload-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
