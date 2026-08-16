# Gates: the library runs on GitHub Pages

Pages serves this repo from a project subpath (`https://xboxiq.github.io/nova/`),
not from a domain root. The failure that costs the most time here is silent: an
absolute asset URL still returns 200 for `index.html`, so the deploy looks fine
and the page is blank. These gates make the subpath the thing that is tested,
not the thing that is assumed.

One step is not automatable and is not gated: in the repository's
**Settings → Pages**, the source must be set to **GitHub Actions**. Until an
owner does that, the workflow builds and the deploy step fails. Everything in
this file is what has to be true for that one click to be enough.

- [x] G1: The build emits relative asset URLs, so one artifact serves from root or from any subpath
  CHECK: node -e "const h=require('fs').readFileSync('dist/index.html','utf8');const abs=[...h.matchAll(/(?:src|href)=\"(\/[^\"]*)\"/g)].map(m=>m[1]);console.log(abs.length?'ABSOLUTE_URLS '+abs.join(','):'RELATIVE_URLS')"
  EXPECT: RELATIVE_URLS
  EVIDENCE: RELATIVE_URLS

- [x] G2: Served from the `/nova/` subpath, nothing 404s, nothing throws, and a lazily-imported section still renders
  CHECK: node tools/qa/pages-subpath.mjs
  EXPECT: LAZY_SECTION_RENDERED=yes
  EVIDENCE: SUBPATH_ERRORS=0 | LAZY_SECTION_RENDERED=yes

- [x] G3: Serving from the root still works — the subpath fix is not a trade
  CHECK: node tools/qa/madar-qa.mjs 2>&1 | grep -E 'RUNTIME|AXE'
  EXPECT: RUNTIME_ERRORS=0
  EVIDENCE: AXE_VIOLATIONS_MADAR=0 | RUNTIME_ERRORS=0

- [x] G4: The deploy workflow builds from source and publishes `dist`, rather than trusting the committed copy
  CHECK: node -e "const w=require('fs').readFileSync('.github/workflows/pages.yml','utf8');const need=['npm run build','upload-pages-artifact','deploy-pages','path: dist'];const miss=need.filter(n=>!w.includes(n));console.log(miss.length?'WORKFLOW_INCOMPLETE '+miss.join(','):'WORKFLOW_COMPLETE')"
  EXPECT: WORKFLOW_COMPLETE
  EVIDENCE: WORKFLOW_COMPLETE

- [x] G5: The workflow can actually install — `npm ci` has a lockfile committed to match
  CHECK: git ls-files --error-unmatch package-lock.json >/dev/null 2>&1 && npm ci --dry-run 2>&1 | grep -E '^added [0-9]+ packages'
  EXPECT: /^added \d+ packages/m
  EVIDENCE: added 48 packages in 377ms
