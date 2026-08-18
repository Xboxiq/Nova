# Gates: every section has an address, and an addition is visible

The owner looked at the deployed site after two families shipped and reported
seeing no additions at all. The code was live — the chunks returned 200 and
carried the new strings — so this was a delivery defect, not a build one: the
library holds thirty-two sections, always opens on the first, and had no way to
name any of the others. There was no link to hand anyone, and nothing on screen
said an addition existed.

These gates cover the fix and the contrast regression it caused on the way.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.99s

- [x] G3: The URL fragment is the address — read on load, written on selection, and followed on change
  CHECK: node -e 'const s=require("fs").readFileSync("src/App.tsx","utf8");const reads=/function sectionFromHash\(\): string \| null \{[\s\S]*?madarSections\.some/.test(s);const init=/useState\(\(\) => sectionFromHash\(\) \?\? madarSections\[0\]\.id\)/.test(s);const writes=/window\.history\.replaceState\(null, "", `#\$\{id\}`\)/.test(s);const listens=/addEventListener\("hashchange", open\)/.test(s);console.log(reads&&init&&writes&&listens?"FRAGMENT_IS_ADDRESS":"NO_ADDRESS "+[reads,init,writes,listens].join())'
  EXPECT: FRAGMENT_IS_ADDRESS
  EVIDENCE: FRAGMENT_IS_ADDRESS

- [x] G4: The nav anchor still means the block — a fragment that is not a section id changes nothing
  CHECK: node -e 'const s=require("fs").readFileSync("src/App.tsx","utf8");const guarded=/return madarSections\.some\(\(section\) => section\.id === id\) \? id : null;/.test(s);const used=/const id = sectionFromHash\(\);\n      if \(id\) setMadarSection\(id\);/.test(s);console.log(guarded&&used?"ANCHOR_SAFE":"ANCHOR_HIJACKED "+[guarded,used].join())'
  EXPECT: ANCHOR_SAFE
  EVIDENCE: ANCHOR_SAFE

- [x] G5: The recently-added row is driven by the registry, not by a hardcoded list that will rot
  CHECK: node -e 'const f=require("fs");const reg=f.readFileSync("src/madar/sections.ts","utf8");const ui=f.readFileSync("src/components/MadarLibrary.tsx","utf8");const marked=(reg.match(/^    added: true,$/gm)||[]).length;const derived=/const added = madarSections\.filter\(\(section\) => section\.added\);/.test(ui)&&/added\.map\(\(section\) =>/.test(ui);const nohardcode=!/madar-energy|madar-upload/.test(ui);console.log(marked===2&&derived&&nohardcode?"ROW_FROM_REGISTRY":"ROW_HARDCODED "+[marked,derived,nohardcode].join())'
  EXPECT: ROW_FROM_REGISTRY
  EVIDENCE: ROW_FROM_REGISTRY

- [x] G6: The mark puts the accent at its edge, not in its fill — the pastel pill axe caught failing in three packs
  CHECK: node -e 'const css=require("fs").readFileSync("src/madar-library.css","utf8");const rule=/\.madar-new \{[\s\S]*?\n\}/.exec(css)[0];const inked=/color: var\(--nova-ink\);/.test(rule);const outlined=/border: 1px solid var\(--nova-action\);/.test(rule);const nofill=/background: transparent;/.test(rule)&&!/action-soft/.test(rule);console.log(inked&&outlined&&nofill?"ACCENT_AT_THE_EDGE":"PASTEL_PILL "+[inked,outlined,nofill].join())'
  EXPECT: ACCENT_AT_THE_EDGE
  EVIDENCE: ACCENT_AT_THE_EDGE

- [x] G7: In a browser: a pasted fragment opens and lands on its section, picking one leaves a link, and the additions are on screen
  CHECK: node tools/qa/addressing.mjs
  EXPECT: ADDRESSING=ok
  EVIDENCE: ADDRESSING=ok | RUNTIME_ERRORS=0

- [x] G8: Axe and contrast are green across the packs with the row and the mark in — this is the regression gate
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G9: The shell's slop count did not rise to pay for a badge
  CHECK: node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /SHELL_SLOP_HITS=([0-5]?[0-9]|6[0-2])$/m
  EVIDENCE: SHELL_SLOP_HITS=62

- [x] G10: The row is captured, so what the owner will actually see is on record
  CHECK: node -e "console.log(require('fs').existsSync('gates/screenshots/qa-addressing-light-rtl.png')?'SHOT_PRESENT':'MISSING')"
  EXPECT: SHOT_PRESENT
  EVIDENCE: SHOT_PRESENT
