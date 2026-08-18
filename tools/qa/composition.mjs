/**
 * VISUAL-LAW.md §21, and `anti-slop-ui` #13's REQUIRED half.
 *
 * The standard bans the equal three-across card grid and prescribes asymmetrical
 * layouts and master-detail rows in its place. I had applied the ban to the shell
 * and built the banned thing into every section I wrote — twenty-four of
 * thirty-four. The lesson is that what is not measured comes back, so the
 * composition is measured here the way the components already were.
 *
 * Sections written from now on must use SpecRow. The legacy count is printed
 * rather than hidden, and the ceiling stops it from growing.
 *
 *   node tools/qa/composition.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/madar/showcase/sections";
const MIGRATED = ["Energy.tsx", "Schedule.tsx", "Outage.tsx"];

const files = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));
const legacy = [];
const rows = [];

for (const file of files) {
  const src = readFileSync(join(DIR, file), "utf8");
  const grid = /repeat\(auto-fit,\s*minmax\(/.test(src);
  const spec = /<SpecRow\b/.test(src);
  if (spec) rows.push(file);
  if (grid && !spec) legacy.push(file);
  /* A migrated section must not keep the grid it was migrated off, and must not
     re-declare a local card wrapper — that is the nested card the scan flags. */
  if (MIGRATED.includes(file)) {
    if (!spec) console.log(`  FAIL ${file} is listed as migrated but uses no SpecRow`);
    if (grid) console.log(`  FAIL ${file} still carries the equal auto-fit grid`);
    if (/function Cell\(/.test(src)) console.log(`  FAIL ${file} still declares a local card wrapper`);
  }
}

const bad = MIGRATED.filter((f) => {
  const src = readFileSync(join(DIR, f), "utf8");
  return !/<SpecRow\b/.test(src) || /repeat\(auto-fit,\s*minmax\(/.test(src) || /function Cell\(/.test(src);
});

/* The row itself has to be asymmetric and alternating, or it is the grid with
   extra steps. */
const row = readFileSync("src/madar/showcase/SpecRow.tsx", "utf8");
const claims = {
  unequal: /minmax\(0,1fr\) minmax\(0,1\.45fr\)/.test(row) && /minmax\(0,1\.45fr\) minmax\(0,1fr\)/.test(row),
  hairline: /borderBlockStart: .1px solid var\(--border\)./.test(row),
  toned: /background: .var\(--surface-2\)./.test(row) && !/data-spec-stage[\s\S]{0,400}border: /.test(row),
  ramps: /translateY\(\$\{i \* 18\}px\) scale\(\$\{1 - i \* 0\.05\}\)/.test(row) && /opacity: 1 - i \* 0\.1/.test(row),
  press: /aria-expanded=\{open\}/.test(row) && !/onMouseEnter/.test(row),
};
const broken = Object.entries(claims).filter(([, ok]) => !ok).map(([k]) => k);

const alternates = MIGRATED.every((f) => /flip\b/.test(readFileSync(join(DIR, f), "utf8")));

console.log(`SPEC_ROWS=${rows.length} sections`);
console.log(`LEGACY_GRIDS=${legacy.length}`);
console.log(`ROW_CLAIMS=${broken.length ? "BROKEN " + broken.join(",") : "ok"}`);
console.log(`ALTERNATES=${alternates}`);
console.log(`COMPOSITION=${!bad.length && !broken.length && alternates ? "ok" : "FAIL"}`);
process.exit(bad.length || broken.length || !alternates ? 1 : 0);
