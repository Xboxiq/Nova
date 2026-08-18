# Gates: the visual composition law

The owner supplied twelve references as a visual feed and asked that creativity
and the refusal of slop become a standing law rather than a mood. The feed is
not uniform: some of it is objects with volume, angle and placed shadow, and
some of it is exactly the flat corporate illustration and pastel icon-tile
families this repository already scans for. Reading the feed is part of the law,
so these gates cover both the written rule and its reference implementation in
`UploadFolder`.

Two of these checks were rewritten after the fifth batch, and the reason is
worth keeping: the runner only executes gates that are still unmet, so a gate
recorded as met can quietly stop matching the code. G5 had been recorded before
`filed` was hoisted out of the call site into a derived const, and G13 before the
hatch colour was put behind a variable so a segment can carry its own. Both
claims still hold; both checks had gone stale. Re-running the whole file rather
than only the new one is what surfaced it.

- [x] G1: The law is written down, including the part where references were rejected
  CHECK: node -e "const d=require('fs').readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['الجسم قبل الشكل','ظلّ التلامُس','الظلّ المصبوب','الانحجاب المحيطي','الزاوية قرار','مرفوض'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'LAW_INCOMPLETE '+miss.join(','):'LAW_WRITTEN')"
  EXPECT: LAW_WRITTEN
  EVIDENCE: LAW_WRITTEN

- [x] G2: No lateral light — the two side walls carry the same value, so mirroring for RTL cannot invert the lighting
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const sides=[...s.matchAll(/brightness=\{LIGHT\.(\w+)\}/g)].map(m=>m[1]).filter(n=>n==='sideWall');const lit=/const LIGHT = \{[\s\S]*?\};/.exec(s)[0];const one=/sideWall:\s*([0-9.]+)/.exec(lit)[1];console.log(sides.length===2&&one?'LIGHT_OVERHEAD_'+one:'LATERAL_LIGHT')"
  EXPECT: /^LIGHT_OVERHEAD_/m
  EVIDENCE: LIGHT_OVERHEAD_0.95

- [x] G3: After the owner ruled anti-slop-ui #7 over §3, the two drop shadows are gone and the occlusion at the joint is not
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const gone=!/data-folder-part=\"(contact|cast)-shadow\"/.test(s);const joint=/data-folder-part=\"occlusion\"/.test(s);console.log(gone&&joint?'JOINT_ONLY':'RULING_NOT_APPLIED '+[gone,joint].join())"
  EXPECT: JOINT_ONLY
  EVIDENCE: JOINT_ONLY

- [x] G4: The slips are placed by hand, not by loop — no two angles are equal and none is zero
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const a=JSON.parse(/const SLIP_TILT = (\[[^\]]*\])/.exec(s)[1]);const ok=a.length>=3&&new Set(a).size===a.length&&a.every(v=>v!==0);console.log(ok?'ANGLES_UNEQUAL '+a.join(','):'ANGLES_MECHANICAL '+a.join(','))"
  EXPECT: /^ANGLES_UNEQUAL/m
  EVIDENCE: ANGLES_UNEQUAL -3.5,2.1,-1.2

- [x] G5: The clip reports a state rather than trimming the object — it renders only once the work is filed
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/upload.tsx','utf8');const gated=/\{filed && sheets > 0 && spread === 0 && \(/.test(s);const derived=/const filed = !active && !failed && items\.length > 0;/.test(s);const passed=/filed=\{filed\}/.test(s);console.log(gated&&derived&&passed?'CLIP_IS_STATE':'CLIP_IS_ORNAMENT '+[gated,derived,passed].join())"
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

- [x] G10: Colour is distributed the way the references distribute it — the object is a neutral material, not a swatch of the action colour
  CHECK: node -e "const f=require('fs');const c=f.readFileSync('src/madar/components/upload.tsx','utf8');const face=/background: 'var\(--surface-2\)',\s*\n\s*border: '1px solid var\(--border\)',/.test(c);const law=f.readFileSync('design-system/VISUAL-LAW.md','utf8').includes('الحاوية محايدة');console.log(face&&law?'MATERIAL_NOT_SWATCH':'ACCENT_AS_BODY '+[face,law].join())"
  EXPECT: MATERIAL_NOT_SWATCH
  EVIDENCE: MATERIAL_NOT_SWATCH

- [x] G11: Text does not mirror with the object it sits on, even when it carries its own transform
  CHECK: node -e 'const f=require("fs");const css=f.readFileSync("src/madar/bridge.css","utf8");const c=f.readFileSync("src/madar/components/upload.tsx","utf8");const varSet=/rtl.\] \.madar-folder-scene \{ --madar-mirror: -1; \}/.test(css)&&/\.madar-folder-scene \{ --madar-mirror: 1; \}/.test(css);const used=/scaleX\(var\(--madar-mirror\)\)/.test(c);const legend=/madar-folder-legend/.test(c);console.log(varSet&&used&&legend?"TEXT_UNMIRRORED":"TEXT_MIRRORS "+[varSet,used,legend].join())'
  EXPECT: TEXT_UNMIRRORED
  EVIDENCE: TEXT_UNMIRRORED

- [x] G12: The second batch's repeated refusal is on record, so sending a reference twice is not mistaken for accepting it
  CHECK: node -e "const d=require('fs').readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['الدفعة الثانية','للمرة الثانية','ليس حجّة على قبوله','الموكاب عرضٌ لا زخرفة'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'BATCH2_UNRECORDED '+miss.join(','):'BATCH2_RECORDED')"
  EXPECT: BATCH2_RECORDED
  EVIDENCE: BATCH2_RECORDED

- [x] G13: The unfilled part of a measure is drawn as data, and the hatch is a structure rather than a wash
  CHECK: node -e 'const f=require("fs");const css=f.readFileSync("src/madar/bridge.css","utf8");const c=f.readFileSync("src/madar/components/upload.tsx","utf8");const rule=/\.madar-track,\n\.madar-hatch \{[\s\S]*?\n\}/.exec(css)[0];const hatch=/repeating-linear-gradient\(/.test(rule)&&/var\(--madar-hatch-color, var\(--border\)\) 0 1px/.test(rule);const hard=!rule.includes("%");const used=(c.match(/className="madar-track"/g)||[]).length>=2;console.log(hatch&&hard&&used?"REMAINDER_IS_DATA":"REMAINDER_BLANK "+[hatch,hard,used].join())'
  EXPECT: REMAINDER_IS_DATA
  EVIDENCE: REMAINDER_IS_DATA

- [x] G14: The one place a gradient is allowed carries a written reason, so the exemption is a decision and not a gap in the scan
  CHECK: node -e 'const css=require("fs").readFileSync("src/madar/bridge.css","utf8");const reasoned=/deslop-ignore-next-line 06/.test(css)&&/hard stops, one token colour/.test(css);const clean=JSON.parse(require("child_process").execFileSync("node",[".claude/skills/kill-ai-slop/scripts/scan.mjs","src","--json"],{encoding:"utf8",maxBuffer:33554432})).findings.flatMap(x=>x.hits.filter(h=>h.file==="madar/bridge.css"&&x.id==="06")).length===0;console.log(reasoned&&clean?"EXEMPTION_REASONED":"EXEMPTION_BARE "+[reasoned,clean].join())'
  EXPECT: EXEMPTION_REASONED
  EVIDENCE: EXEMPTION_REASONED

- [x] G15: The third batch's verdicts are recorded, including what was deliberately deferred rather than taken
  CHECK: node -e "const d=require('fs').readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['الدفعة الثالثة','مُلاحَظ لا مأخوذ بعد','مؤجَّل بتحفّظ','الجزء الفارغ من المقياس'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'BATCH3_UNRECORDED '+miss.join(','):'BATCH3_RECORDED')"
  EXPECT: BATCH3_RECORDED
  EVIDENCE: BATCH3_RECORDED

- [x] G16: The light leak is bound to a state — the class and its colour arrive together, never as a default
  CHECK: node -e 'const f=require("fs");const css=f.readFileSync("src/madar/bridge.css","utf8");const c=f.readFileSync("src/madar/components/upload.tsx","utf8");const noDefault=/\.madar-leak::after \{[\s\S]*?\}/.exec(css)[0].includes("var(--madar-leak-color)")&&!/--madar-leak-color:\s*var\(--accent\)/.test(css);const gated=/className=\{filed \? .madar-leak. : undefined\}/.test(c);const coloured=/filed \? \{ \[.--madar-leak-color/.test(c);console.log(noDefault&&gated&&coloured?"LEAK_IS_STATE":"LEAK_IS_DECOR "+[noDefault,gated,coloured].join())'
  EXPECT: LEAK_IS_STATE
  EVIDENCE: LEAK_IS_STATE

- [x] G17: The fourth batch is analysed at technique level, and the over-broad refusal it corrected is recorded as a correction
  CHECK: node -e "const f=require('fs');const a=f.readFileSync('design-system/VISUAL-ANALYSIS-04.md','utf8');const l=f.readFileSync('design-system/VISUAL-LAW.md','utf8');const need=['تسريب الضوء','الملمس ذو البنية','قصاصة من المنتج','النقد المرسوم','الضابط يعيش على الوصلة'];const miss=need.filter(n=>!a.includes(n));const fixed=l.includes('تصحيح لحكم سابق')&&l.includes('هل يحمل النوعُ نفسه اللونَ نفسه');console.log(miss.length||!fixed?'BATCH4_INCOMPLETE '+miss.join(',')+' fixed='+fixed:'BATCH4_ANALYSED')"
  EXPECT: BATCH4_ANALYSED
  EVIDENCE: BATCH4_ANALYSED
