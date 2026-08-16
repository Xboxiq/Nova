# Gates: anti-slop enforcement, and the design skills that earn their place

Scope: wire the design skills this project actually needs, then turn "no AI slop" from a stated value into a runnable gate, and take the codebase to zero unexplained slop hits.

Priority stated by the user: anti-slop above all. Every other skill in the list is judged by whether it serves work this repo actually does.

- [x] G1: TypeScript compiles clean from scratch
  CHECK: npm run typecheck -- --force 2>&1; echo "exit=$?"
  EXPECT: exit=0
  EVIDENCE: > tsc -b --pretty false --force | exit=0

- [x] G2: Production build succeeds
  CHECK: npm run build 2>&1 | tail -2
  EXPECT: built in
  EVIDENCE: ✓ built in 2.46s

- [x] G3: The already-vendored Impeccable payload is loadable as a skill, not stranded at a path Claude Code never reads
  CHECK: node -e "const f=require('fs');const ok=f.existsSync('.claude/skills/impeccable/SKILL.md')&&f.existsSync('.claude/skills/impeccable/scripts/context.mjs');console.log(ok?'IMPECCABLE_WIRED':'NOT_WIRED')"
  EXPECT: IMPECCABLE_WIRED
  EVIDENCE: IMPECCABLE_WIRED

- [x] G4: Impeccable's own setup command runs from the wired location
  CHECK: node .claude/skills/impeccable/scripts/context.mjs 2>&1 | head -3
  EXPECT: PRODUCT
  EVIDENCE: # PRODUCT.md | # NOVA UI Product Context

- [x] G5: The anti-slop scanner is vendored and runnable through an npm script
  CHECK: npm run slop 2>&1 | tail -3
  EXPECT: /groups|no slop|clean/
  EVIDENCE: → 14 groups, 440 hits. Confirm each by reading the code, then fix per references/fixes.md.

- [ ] G6: Zero unexplained slop hits across src: every surviving hit carries a deslop-ignore with a stated reason
  CHECK: npm run slop 2>&1 | tail -1
  EXPECT: /0 groups|no hits|clean/
  EVIDENCE: pending

- [ ] G7: No exemption is silent: every surviving hit carries a recorded reason
  EVIDENCE: pending

- [x] G8: The skills chosen are recorded with why each was taken and why each rejected one was not
  CHECK: node -e "const d=require('fs').readFileSync('design-system/SKILLS.md','utf8');const need=['impeccable','kill-ai-slop','slop.md','emilkowalski','ui-ux-pro-max','taste-skill','MengTo','SwiftUI','transitions-pro','kinetics'];const miss=need.filter(n=>!d.includes(n));console.log(miss.length?'UNDOCUMENTED '+miss.join(','):'SKILL_TRIAGE_RECORDED')"
  EXPECT: SKILL_TRIAGE_RECORDED
  EVIDENCE: SKILL_TRIAGE_RECORDED

- [x] G9: AGENTS.md no longer names a skill that is not actually installed
  CHECK: node tools/qa/agents-skill-claims.mjs
  EXPECT: ALL_CLAIMED_SKILLS_PRESENT
  EVIDENCE: ALL_CLAIMED_SKILLS_PRESENT (5 checked)

- [x] G10: The Madar surface still passes every existing check after the de-slop edits
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | tail -5
  EXPECT: AXE_VIOLATIONS_MADAR=0
  EVIDENCE: THEME_MENU=ok | RUNTIME_ERRORS=0

- [x] G11: No horizontal overflow and no runtime errors after the de-slop edits
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'OVERFLOW|RUNTIME'
  EXPECT: OVERFLOW=none
  EVIDENCE: OVERFLOW=none | RUNTIME_ERRORS=0

- [x] G12: Every one of the 14 reported slop groups has a recorded verdict: fixed, or exempt with a reason
  CHECK: node -e "const d=require('fs').readFileSync('design-system/ANTI-SLOP-PASS.md','utf8');const ids=['02','06','09','10','11','15','19','20','21','23','24','26','30','34'];const miss=ids.filter(i=>!new RegExp('\\\\|\\\\s*'+i+'\\\\s*\\\\|').test(d));console.log(miss.length?'NO_VERDICT '+miss.join(','):'ALL_14_ADJUDICATED')"
  EXPECT: ALL_14_ADJUDICATED
  EVIDENCE: ALL_14_ADJUDICATED

ABANDON: G6 406 of the 445 hits fall in six groups that are design-identity decisions, not defects: the background wash, the eyebrow-over-every-heading, the radius scale, 44 inline SVG icons, spring-on-hover, and mono usage. Several are features the owner explicitly requested and this repo committed to and documented, notably the three glass levels. Driving the count to zero would mean redesigning the product because a scanner flagged it. Every group has a recorded verdict and a recommendation in design-system/ANTI-SLOP-PASS.md; the six await the owner's call.

ABANDON: G7 Exemptions were recorded as group-level verdicts in design-system/ANTI-SLOP-PASS.md rather than as inline deslop-ignore directives. Scattering 406 inline suppressions through the source would bury the reasoning in noise and make the scanner read clean while nothing was decided. Inline directives get added per hit as each of the six groups is settled.
