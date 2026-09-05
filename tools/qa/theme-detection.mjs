/**
 * A component that asks whether the page is dark must ask the way this page
 * answers.
 *
 * This is the single most repeated defect in the imported batch: seven uploads
 * in a row detected dark mode with
 *
 *   document.documentElement.classList.contains('dark')
 *
 * and this project does not carry that class. It switches on `data-theme`, with
 * seven values, two of which are dark — `dark` and `night`. Every one of the
 * seven components therefore painted its light palette on a dark page, and the
 * measurement was always the same shape: set `data-theme="night"`, read the
 * ground, get the light colour back.
 *
 *   flip-calendar   rgb(245,241,234) where rgb(17,15,12) was due
 *   blind-pull      rgb(237,234,229)
 *   taga-toggle     rgb(237,234,229)
 *   noise-bg        rgb(245,241,234)
 *   traveldeck      rgb(245,241,234)
 *   glitch-button   rgb(245,241,234)
 *   noise-field     (same shape)
 *
 * The class test is not wrong in itself — it is what makes these components work
 * in a repository that does use a `.dark` class, and it was kept in all seven
 * fixes for exactly that reason. What is wrong is asking ONLY that question. So
 * this gate does not ban the class test; it requires that a file asking it also
 * asks about `data-theme`.
 *
 * There is a second half that is easy to fix by half. `noise-bg` held the answer
 * twice — `isDark` for the paint and `isDarkRef` for the frame loop — and a fix
 * applied to one of them would leave the canvas painting the wrong colour while
 * the labels were right. So a file that keeps more than one copy of the answer
 * has to feed both from the same test, which in practice means one function; a
 * file with two independent `classList.contains('dark')` reads and one
 * `data-theme` read is reported.
 *
 * Comments are stripped first, so the prose above cannot satisfy the gate for
 * the files that quote it.
 *
 *   node tools/qa/theme-detection.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/components";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");

/* `.dark` asked of the document or of a card wrapper */
const CLASS_TEST = /classList\.contains\(\s*['"]dark['"]\s*\)/g;
/* either the dataset form or the attribute form counts as asking */
const DATA_TEST = /dataset\.theme|getAttribute\(\s*['"]data-theme['"]\s*\)|['"]data-theme['"]/;

const files = walk(ROOT);
const failures = [];
let asking = 0;

for (const file of files) {
  const src = stripComments(readFileSync(file, "utf8"));
  const classReads = [...src.matchAll(CLASS_TEST)];
  if (!classReads.length) continue;
  asking++;

  if (!DATA_TEST.test(src)) {
    failures.push(`${file}  asks classList.contains('dark') ${classReads.length}x and never asks data-theme — this project has no .dark class`);
    continue;
  }
  /* the half-fix: more class reads than data reads means one path still
     answers the old question on its own */
  const dataReads = (src.match(/dataset\.theme/g) || []).length;
  if (dataReads && classReads.length > dataReads + 1)
    failures.push(`${file}  ${classReads.length} class reads against ${dataReads} data-theme reads — one path still answers alone`);
}

console.log(`THEME_FILES_SCANNED=${files.length}`);
console.log(`ASKING_ABOUT_DARK=${asking}`);
for (const f of failures) console.log(`  THEME ${f}`);
console.log(`THEME_DETECTION=${failures.length ? "FAIL" : "ok"} (${failures.length})`);
process.exit(failures.length ? 1 : 0);
