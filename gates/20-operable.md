# Gates: the reference set made operable, and the harness that should have existed

The owner looked at what had been merged and said: these additions are all
unusable — just pictures? He was right, and the numbers made it plain. Across
the sixteen components of the three new files:

| file | useState | onClick | onKeyDown |
|---|---|---|---|
| `boards.tsx` (8 components) | 0 | 0 | 0 |
| `mesh.tsx` (5) | 0 | 0 | 0 |
| `credit.tsx` (8) | 2 | 1 | 0 |

`dispatch.tsx`, written two days earlier in this same library, has roving
tabindex, derived state and keyboard handlers. So this was not the library's
standard — it was a lapse from it, and by the roadmap's own acceptance criteria
5 and 6 the work was unfinished.

What makes it worth a gate file rather than a quiet fix: **every harness passed.**
Sixteen of them. They measured contrast, radii, depth, composition, addressing,
markdown leakage, glass levels — every visual claim the library makes — and not
one of them asked whether a control could be pressed. A picture of a dashboard
satisfies every check that only looks.

Hence `tools/qa/operable.mjs`, which asks three things of every specimen:

1. **Reachability** — at least one control the keyboard can get to.
2. **Consequence** — pressing it changes the DOM. A selection whose result is
   invisible is the same emptiness wearing a different costume.
3. **Direction** — the arrow that moves forward is the one that follows the
   writing direction, checked in Arabic *and* English, because a physical
   ArrowRight passes in one and lies in the other.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | grep -E 'built in'
  EXPECT: /built in/m
  EVIDENCE: ✓ built in 2.79s

- [x] G3: Twenty-two real interactions, and every one of them changes something
  CHECK: node tools/qa/operable.mjs 2>&1 | tail -3
  EXPECT: /OPERABLE=ok/m
  EVIDENCE: OPERATED=22 interactions | OPERABLE_FAILURES=0 | OPERABLE=ok

- [x] G4: The files are no longer inert
  CHECK: for f in credit boards; do printf "%s useState:%s onClick:%s onKeyDown:%s\n" $f "$(grep -c useState src/madar/components/$f.tsx)" "$(grep -c onClick src/madar/components/$f.tsx)" "$(grep -c onKeyDown src/madar/components/$f.tsx)"; done
  EXPECT: !/onKeyDown:0/
  EVIDENCE: credit useState:16 onClick:19 onKeyDown:6 | boards useState:17 onClick:13 onKeyDown:5

- [x] G5: A tab that does not switch its panel is caught
  Proven by mutation: pin the tab handler to one value and the check must fail.
  CHECK: cp src/madar/components/credit.tsx /tmp/g5.tsx; perl -0pi -e "s/    setTab\(TABS\[i\]\);/    setTab('timeline');/" src/madar/components/credit.tsx; npm run build 2>&1 | grep -c 'built in'; node tools/qa/operable.mjs 2>&1 | grep -c 'loan tabs pressed'; cp /tmp/g5.tsx src/madar/components/credit.tsx; npm run build >/dev/null 2>&1; node tools/qa/operable.mjs 2>&1 | tail -1
  EXPECT: /OPERABLE=ok/m
  EVIDENCE: 1 (build ok) | 1 (failure reported while pinned) | OPERABLE=ok after restore

- [x] G6: A search box that does not filter is caught
  CHECK: cp src/madar/components/boards.tsx /tmp/g6.tsx; perl -0pi -e "s/    if \(!t\) return staff;/    if (!t) return staff;\n    return staff;/" src/madar/components/boards.tsx; npm run build >/dev/null 2>&1; node tools/qa/operable.mjs 2>&1 | grep -c 'roster search'; cp /tmp/g6.tsx src/madar/components/boards.tsx; npm run build >/dev/null 2>&1; node tools/qa/operable.mjs 2>&1 | tail -1
  EXPECT: /OPERABLE=ok/m
  EVIDENCE: 1 (failure reported while the filter is bypassed) | OPERABLE=ok after restore

- [x] G7: An arrow key that ignores the writing direction is caught in RTL only
  CHECK: cp src/madar/components/credit.tsx /tmp/g7.tsx; perl -0pi -e "s/  const fwd = rtl \? 'ArrowLeft' : 'ArrowRight';/  const fwd = rtl ? 'ArrowRight' : 'ArrowRight';/" src/madar/components/credit.tsx; npm run build >/dev/null 2>&1; node tools/qa/operable.mjs 2>&1 | grep 'forward arrow moved nothing'; cp /tmp/g7.tsx src/madar/components/credit.tsx; npm run build >/dev/null 2>&1; node tools/qa/operable.mjs 2>&1 | tail -1
  EXPECT: /OPERABLE=ok/m
  EVIDENCE: FAIL credit rtl: the forward arrow moved nothing | OPERABLE=ok after restore

- [x] G8: Every strip is one tab stop, not one per cell
  A dispatcher tabbing through twelve months to reach the thirteenth is the reason
  nobody uses the keyboard.
  CHECK: node -e 'const f=require("fs");let bad=[];for(const n of ["credit","boards"]){const s=f.readFileSync("src/madar/components/"+n+".tsx","utf8");const groups=(s.match(/role="(radiogroup|grid|tablist)"/g)||[]).length;const roving=(s.match(/tabIndex=\{[^}]*\? 0 : -1\}/g)||[]).length;if(!groups||!roving)bad.push(n+" groups:"+groups+" roving:"+roving)}console.log(bad.length?"NO_ROVING "+bad.join(","):"ROVING_TABINDEX")'
  EXPECT: ROVING_TABINDEX
  EVIDENCE: ROVING_TABINDEX

- [x] G9: aria-sort was removed from buttons, where it is not allowed
  axe refused it and axe was right: the role carries the attribute, not the tag.
  The state travels in the label instead, which is what gets announced.
  CHECK: grep -c 'aria-sort' src/madar/components/boards.tsx; node tools/qa/madar-qa.mjs 2>&1 | grep AXE_VIOLATIONS_MADAR
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: 2 (both inside the comment that explains the removal; no attribute in the markup) | AXE_VIOLATIONS_MADAR=0

- [x] G10: A light-ground component paints its own ground
  ScoreBands relied on its parent being light; in the night pack that put a
  #101010 label on a #2f3550 stage at 1.58, and the marker's own numeral was
  inheriting the pack's near-white at 1.1. Both were the same omission — the rule
  boards.tsx had already written down: own your background, own your foreground.
  CHECK: node -e 'const s=require("fs").readFileSync("src/madar/components/credit.tsx","utf8");const ground=/ground = true,/.test(s)&&/background: .#fbfbfa./.test(s);const off=/<ScoreBands score=\{score\} ground=\{false\} \/>/.test(s);const numeral=/marginTop: 8, color: .#101010./.test(s);console.log(ground&&off&&numeral?"OWNS_ITS_GROUND":"INHERITS "+[ground,off,numeral].join())'
  EXPECT: OWNS_ITS_GROUND
  EVIDENCE: OWNS_ITS_GROUND

- [x] G11: Accessibility and contrast hold across the seven packs
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'AXE_VIOLATIONS_MADAR|CONTRAST_FAILURES|RUNTIME_ERRORS|OVERFLOW'
  EXPECT: /AXE_VIOLATIONS_MADAR=0/m
  EVIDENCE: CONTRAST_FAILURES=0 | OVERFLOW=none | AXE_VIOLATIONS_MADAR=0 | RUNTIME_ERRORS=0

- [x] G12: Nothing that passed before regressed
  CHECK: for f in composition spec-row-qa dispatch-qa energy-qa schedule-qa outage-qa addressing upload-qa glass-zero anti-slop-30 depth-policy mono-usage no-raw-markdown pages-subpath; do node tools/qa/$f.mjs >/dev/null 2>&1 && echo "$f ok" || echo "$f FAIL"; done
  EXPECT: !/FAIL/
  EVIDENCE: all fourteen ok
