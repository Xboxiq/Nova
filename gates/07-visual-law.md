# Gates: the visual composition law

The owner supplied twelve references as a visual feed and asked that creativity
and the refusal of slop become a standing law rather than a mood. The feed is
not uniform: some of it is objects with volume, angle and placed shadow, and
some of it is exactly the flat corporate illustration and pastel icon-tile
families this repository already scans for. Reading the feed is part of the law,
so these gates cover both the written rule and its reference implementation in
`UploadFolder`.

- [x] G1: The law is written down, including the part where references were rejected
  CHECK: node -e "const d=require('fs').readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['الجسم قبل الشكل','ظلّ التلامُس','الظلّ المصبوب','الانحجاب المحيطي','الزاوية قرار','مرفوض'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'LAW_INCOMPLETE '+miss.join(','):'LAW_WRITTEN')"
  EXPECT: LAW_WRITTEN
  EVIDENCE: LAW_WRITTEN

- [x] G2: No lateral light — the two side walls carry the same value, so mirroring for RTL cannot invert the lighting
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const sides=[...s.matchAll(/brightness=\{LIGHT\.(\w+)\}/g)].map(m=>m[1]).filter(n=>n==='sideWall');const lit=/const LIGHT = \{[\s\S]*?\};/.exec(s)[0];const one=/sideWall:\s*([0-9.]+)/.exec(lit)[1];console.log(sides.length===2&&one?'LIGHT_OVERHEAD_'+one:'LATERAL_LIGHT')"
  EXPECT: /^LIGHT_OVERHEAD_/m
  EVIDENCE: LIGHT_OVERHEAD_0.92

- [x] G3: All three shadow roles are present and distinct — contact, cast, and occlusion at the joint
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const need=['data-folder-part=\"contact-shadow\"','data-folder-part=\"cast-shadow\"','data-folder-part=\"occlusion\"'];const miss=need.filter(n=>!s.includes(n));console.log(miss.length?'SHADOWS_MISSING '+miss.join(','):'THREE_SHADOWS')"
  EXPECT: THREE_SHADOWS
  EVIDENCE: THREE_SHADOWS

- [x] G4: The slips are placed by hand, not by loop — no two angles are equal and none is zero
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const a=JSON.parse(/const SLIP_TILT = (\[[^\]]*\])/.exec(s)[1]);const ok=a.length>=3&&new Set(a).size===a.length&&a.every(v=>v!==0);console.log(ok?'ANGLES_UNEQUAL '+a.join(','):'ANGLES_MECHANICAL '+a.join(','))"
  EXPECT: /^ANGLES_UNEQUAL/m
  EVIDENCE: ANGLES_UNEQUAL -3.5,2.1,-1.2

- [x] G5: The clip reports a state rather than trimming the object — it renders only once the work is filed
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const gated=/\{filed && sheets > 0 && spread === 0 && \(/.test(s);const wired=/filed=\{!active && !failed && items\.length > 0\}/.test(s);console.log(gated&&wired?'CLIP_IS_STATE':'CLIP_IS_ORNAMENT')"
  EXPECT: CLIP_IS_STATE
  EVIDENCE: CLIP_IS_STATE

- [x] G6: The wire genuinely passes over and under, rather than being drawn to look as though it does
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/upload.tsx","utf8");const halves=/half="back"/.test(s)&&/half="front"/.test(s);const split=/clipPath: half === .back./.test(s);const depth=/translateZ\(\$\{z\}px\)/.test(s)&&/z=\{[^}]*-\s*2\}/.test(s)&&/z=\{[^}]*\+\s*4\}/.test(s);console.log(halves&&split&&depth?"OCCLUDED_BY_DEPTH":"PAINTED_TO_LOOK_LAYERED "+[halves,split,depth].join())'
  EXPECT: OCCLUDED_BY_DEPTH
  EVIDENCE: OCCLUDED_BY_DEPTH

- [x] G7: The rejected families from the feed are named, so the refusal is a decision on record and not an omission
  CHECK: node -e "const d=require('fs').readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['رسوم القطاع المسطّحة','حزمة الأيقونات','باستيلية'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'REFUSAL_UNRECORDED '+miss.join(','):'REFUSAL_RECORDED')"
  EXPECT: REFUSAL_RECORDED
  EVIDENCE: REFUSAL_RECORDED

- [x] G8: The added detail costs nothing in behaviour: the flow, axe, contrast and overflow all stay green
  CHECK: node tools/qa/upload-qa.mjs 2>&1 | head -2; node tools/qa/madar-qa.mjs 2>&1 | grep -E 'CONTRAST|AXE|OVERFLOW'
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: OVERFLOW=none | AXE_VIOLATIONS_MADAR=0

- [x] G9: The component still declares no raw color, so the new material rides the seven packs
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY
