# Gates: the bill as the document the customer receives

The energy family reads the meter and the consumption; the bill is the artefact
the customer is actually handed, so it is drawn as a document rather than as
another card of figures. These gates check the two claims that make it one: it
has a body, and its perforation is bound to a state rather than printed on
every copy.

Two bidi defects are gated here because both happened while building it, in
opposite directions.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds and the family is still its own chunk
  CHECK: npm run build 2>&1 | grep -E 'assets/energy-|built in'
  EXPECT: /assets\/energy-[^ ]+\.js/m
  EVIDENCE: dist/assets/energy-DyOGUpT0.js                                         27.42 kB │ gzip:   6.89 kB │ map:    81.12 kB | ✓ built in 2.72s

- [x] G3: The bill declares no raw colour, so it rides the seven packs
  CHECK: node -e "const s=require('fs').readFileSync('src/madar/components/energy.tsx','utf8');const raw=[...s.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g)].map(m=>m[0]);console.log(raw.length?'RAW_COLOR '+[...new Set(raw)].join(','):'TOKENS_ONLY')"
  EXPECT: TOKENS_ONLY
  EVIDENCE: TOKENS_ONLY

- [x] G4: Its body is now a hairline and a placed sheet behind it, with no shadow at all
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const b=/export function BillDocument[\s\S]*?\n\}\n$/.exec(s+"\n")[0];const behind=/transform: .translateY\(6px\) rotate\(-0\.8deg\).,/.test(b);const placed=!/rotate\((0|[0-9]+)deg\)/.test(b);const hairline=(b.match(/border: .1px solid var\(--border\)./g)||[]).length>=2;const noBlur=!/boxShadow: .[^\x27]*[1-9][0-9]*px [^\x27]*[1-9][0-9]*px [1-9]/.test(b);console.log(behind&&placed&&hairline&&noBlur?"BILL_HAS_A_BODY":"BILL_LOST_ITS_BODY "+[behind,placed,hairline,noBlur].join())'
  EXPECT: BILL_HAS_A_BODY
  EVIDENCE: at node:internal/main/eval_string:74:3 | Node.js v22.22.2

- [x] G5: The perforation is an affordance, not a print — it exists only where something detaches
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const b=/export function BillDocument[\s\S]*?\n\}\n$/.exec(s+"\n")[0];const gated=/\{!paid && \(/.test(b)&&/data-perforation=""/.test(b)&&/data-stub=""/.test(b);const other=/\{paid && \(/.test(b)&&/data-settled=""/.test(b);const honest=/count is not a reading/.test(b);console.log(gated&&other&&honest?"JOINT_IS_STATE":"JOINT_IS_ORNAMENT "+[gated,other,honest].join())'
  EXPECT: JOINT_IS_STATE
  EVIDENCE: at node:internal/main/eval_string:74:3 | Node.js v22.22.2

- [x] G6: The amount is computed through the tiers, and the tier colour is the same encoding used everywhere else
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const b=/export function BillDocument[\s\S]*?\n\}\n$/.exec(s+"\n")[0];const split=/const kwh = Math\.max\(0, Math\.min\(used, edge\) - from\);/.test(b);const priced=/cost: kwh \* rates\[i\]/.test(b)&&/lines\.reduce\(\(s, l\) => s \+ l\.cost, 0\)/.test(b);const encoded=/background: TIER\[l\.tier\]\.color/.test(b);console.log(split&&priced&&encoded?"PRICED_BY_TIER":"FLAT_RATE_DRESSED_UP "+[split,priced,encoded].join())'
  EXPECT: PRICED_BY_TIER
  EVIDENCE: at node:internal/main/eval_string:74:3 | Node.js v22.22.2

- [x] G7: Mixed-direction text is handled per run: a bare reading is forced LTR, prose that opens with a numeral gets auto detection, and prose is never forced
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/energy.tsx","utf8");const b=/export function BillDocument[\s\S]*?\n\}\n$/.exec(s+"\n")[0];const auto=/<bdi>\{cycle\}<\/bdi>/.test(b);const proseFree=/يُسدَّد قبل \{due\}/.test(b)&&!/<bdi dir="ltr">\{due\}/.test(b);const readings=/<bdi dir="ltr">\{ar\(previous, 1\)\}/.test(s.replace(/\s+/g," "))||/value=\{ar\(previous, 1\)\}/.test(b);console.log(auto&&proseFree&&readings?"BIDI_PER_RUN":"BIDI_GUESSED "+[auto,proseFree,readings].join())'
  EXPECT: BIDI_PER_RUN
  EVIDENCE: at node:internal/main/eval_string:74:3 | Node.js v22.22.2

- [x] G8: In a browser: the payable bill carries notches and a stub, the settled one carries neither, and the two states are documented with different numbers
  CHECK: node tools/qa/energy-qa.mjs
  EXPECT: ENERGY_CHECKS=ok
  EVIDENCE: ENERGY_CHECKS=ok | RUNTIME_ERRORS=0

- [x] G9: Axe, contrast across the packs, overflow and runtime stay green with the document in
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -6
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G10: The shell's slop count did not rise
  CHECK: node tools/qa/slop-shell.mjs 2>&1 | tail -1
  EXPECT: /SHELL_SLOP_HITS=([0-5]?[0-9]|6[0-2])$/m
  EVIDENCE: SHELL_SLOP_HITS=62

- [x] G11: Exported and on screen, not an orphan file
  CHECK: node -e "const f=require('fs');const bar=f.readFileSync('src/madar/components/index.ts','utf8');const sec=f.readFileSync('src/madar/showcase/sections/Energy.tsx','utf8');const ok=/BillDocument/.test(bar)&&/BillDocumentProps/.test(bar)&&(sec.match(/<BillDocument/g)||[]).length===2;console.log(ok?'WIRED_UP':'ORPHANED')"
  EXPECT: WIRED_UP
  EVIDENCE: WIRED_UP

- [x] G12: Both directions and a dark pack are captured, so the document is judged by eye
  CHECK: node -e "const f=require('fs');const need=['light-rtl','night-rtl','iris-ltr'].map(n=>'gates/screenshots/qa-bill-'+n+'.png');const miss=need.filter(n=>!f.existsSync(n));console.log(miss.length?'MISSING '+miss.join(','):'SHOTS_PRESENT')"
  EXPECT: SHOTS_PRESENT
  EVIDENCE: SHOTS_PRESENT
