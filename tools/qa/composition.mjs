/**
 * VISUAL-LAW.md §21, and `anti-slop-ui` #13's REQUIRED half.
 *
 * The standard bans the equal three-across card grid and prescribes asymmetrical
 * layouts and master-detail rows in its place. I had applied the ban to the shell
 * and built the banned thing into every section I wrote — twenty-four of
 * thirty-four. The lesson is that what is not measured comes back, so the
 * composition is measured here the way the components already were.
 *
 * The second lesson is in this file's own history: it used to check `flip` and
 * `n={}` props, and when the ordinal and the alternation moved into CSS — so a
 * section's local wrapper could become one line of SpecRow instead of thirty
 * rewritten call sites — the harness kept measuring props that no longer existed.
 * A check pinned to an implementation detail dies with the detail. These claims
 * are pinned to the rendered result: the stylesheet that draws the row, and the
 * files that use it.
 *
 *   node tools/qa/composition.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/madar/showcase/sections";
const CEILING = 0; // the equal auto-fit grid is gone from the sections; it does not come back

const files = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));
const legacy = [];
const rows = [];
const shelves = [];
const faults = [];

for (const file of files) {
  const src = readFileSync(join(DIR, file), "utf8");
  const grid = /repeat\(auto-fit,\s*minmax\(/.test(src);
  const spec = /<SpecRow\b/.test(src);
  const shelf = /<SpecShelf\b/.test(src);
  if (spec) rows.push(file);
  if (shelf) shelves.push(file);
  if (grid && !spec && !shelf) legacy.push(file);

  /* A migrated section must not keep the grid it was migrated off of, and every
     run of rows needs its own counter reset or the ordinals keep climbing across
     the whole page. */
  if (spec || shelf) {
    if (grid) faults.push(`${file} still carries the equal auto-fit grid`);
    if (spec && !/<SpecList>/.test(src)) faults.push(`${file} uses SpecRow outside a SpecList, so its ordinals do not restart`);
  }
}

/* The row itself has to be asymmetric and alternating, or it is the grid with
   extra steps. Both live in the stylesheet now. */
const css = readFileSync("src/madar/bridge.css", "utf8");
const row = readFileSync("src/madar/showcase/SpecRow.tsx", "utf8");
const claims = {
  unequal: /grid-template-columns:\s*minmax\(0,\s*1\.45fr\)\s*minmax\(0,\s*1fr\)/.test(css),
  alternates:
    /:nth-child\(even\)\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1\.45fr\)/.test(css) &&
    /:nth-child\(even\)\s\.madar-spec-stage\s*\{\s*grid-column:\s*2/.test(css),
  counted: /\.madar-spec-list\s*\{\s*counter-reset:\s*madar-spec/.test(css) && /content:\s*counter\(madar-spec/.test(css),
  hairline: /\.madar-spec-row\s*\{[\s\S]{0,400}border-block-start:\s*1px solid var\(--border\)/.test(css),
  toned: /\.madar-spec-stage\s*\{[\s\S]{0,300}background:\s*var\(--surface-2\)/.test(css) && !/\.madar-spec-stage\s*\{[\s\S]{0,300}border:\s/.test(css),
  stacks: /translateY\(\$\{i \* 18\}px\) scale\(\$\{1 - i \* 0\.05\}\)/.test(row) && /opacity: 1 - i \* 0\.1/.test(row),
  press: /aria-expanded=\{open\}/.test(row) && !/onMouseEnter/.test(row),
  narrow: /@media \(max-width: 860px\)/.test(css),
};
const broken = Object.entries(claims).filter(([, ok]) => !ok).map(([k]) => k);

for (const f of faults) console.log(`  FAIL ${f}`);
if (legacy.length > CEILING) console.log(`  FAIL legacy grid count rose to ${legacy.length}, ceiling is ${CEILING}`);
if (legacy.length) console.log(`  legacy: ${legacy.join(", ")}`);

console.log(`SPEC_ROWS=${rows.length} sections`);
console.log(`SPEC_SHELVES=${shelves.length} sections`);
console.log(`LEGACY_GRIDS=${legacy.length} (ceiling ${CEILING})`);
console.log(`ROW_CLAIMS=${broken.length ? "BROKEN " + broken.join(",") : "ok"}`);
const ok = !faults.length && !broken.length && legacy.length <= CEILING;
console.log(`COMPOSITION=${ok ? "ok" : "FAIL"}`);
process.exit(ok ? 0 : 1);
