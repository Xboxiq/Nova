/**
 * The composition, measured as rendered rather than as written.
 *
 * `tools/qa/composition.mjs` reads the source and passed happily while the built
 * stylesheet was broken: a `str.replace` had hit three occurrences of
 * `.madar-spec-copy {` instead of one, so the even-row and narrow-screen rules
 * lost their selectors and every odd row put its statement and its specimen in
 * the same grid column — stacked on top of each other. The source regexes all
 * still matched. Nothing but the rendered page could catch it.
 *
 * So this is the row measured in a browser: the two halves occupy different
 * columns, they do not overlap, the wide half really is the wider one, the side
 * alternates down the section, the ordinal restarts per section, and the narrow
 * viewport collapses to one column instead of crushing both halves.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/spec-row-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4441;
const URL = `http://localhost:${PORT}/`;
/* one section per composition primitive: rows with a centred specimen, rows with
   a filled stage, a plain shelf, and a bare shelf */
const SECTIONS = ["madar-energy", "madar-upload", "madar-essentials", "madar-kinetics-bank", "madar-atelier"];
/* A section with no composition primitive in it, used as the control for sideways
   overflow: the floating dock in the shell already pushes the page 8px wide at
   720px on every section, so an absolute "does not scroll sideways" assertion
   would fail on a defect this change did not cause and cannot fix from here.
   The rows are held to adding nothing to it. */
const CONTROL = "madar-typography";

let chromium;
try {
  chromium = createRequire(import.meta.url)("playwright").chromium;
} catch {
  const root = execSync("npm root -g", { encoding: "utf8" }).trim();
  chromium = createRequire(`${root}/`)("playwright").chromium;
}

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());
for (let i = 0; i < 60; i += 1) {
  try { if ((await fetch(URL)).ok) break; } catch { /* starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const failures = [];
const errors = [];
const browser = await chromium.launch();

const measure = () => {
  const rows = [...document.querySelectorAll(".madar-spec-row")];
  return {
    rows: rows.map((row) => {
      const box = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y), b: Math.round(r.bottom) }; };
      const stage = row.querySelector(":scope > .madar-spec-stage");
      const copy = row.querySelector(":scope > .madar-spec-copy");
      return {
        stage: stage ? { ...box(stage), col: getComputedStyle(stage).gridColumnStart } : null,
        copy: copy ? { ...box(copy), col: getComputedStyle(copy).gridColumnStart } : null,
        ordinal: copy?.querySelector(".madar-spec-ordinal")
          ? getComputedStyle(copy.querySelector(".madar-spec-ordinal"), "::before").content
          : null,
      };
    }),
    shelves: [...document.querySelectorAll("[data-spec-shelf]")].map((s) => ({
      spans: [...s.children].map((c) => Number(c.dataset.shelfItem)),
      widths: [...s.children].map((c) => Math.round(c.getBoundingClientRect().width)),
    })),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
};

for (const dir of ["rtl", "ltr"]) {
  const page = await browser.newPage({ viewport: { width: 1360, height: 1100 } });
  page.on("pageerror", (e) => errors.push(`${dir}: ${e}`));

  await page.goto(`${URL}#${CONTROL}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(350);
  const baseline = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

  for (const id of SECTIONS) {
    await page.goto(`${URL}#${id}`, { waitUntil: "networkidle" });
    if (dir === "ltr") await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.lang = "en"; });
    await page.waitForSelector(".madar-spec-row, [data-spec-shelf]", { timeout: 15000 });
    await page.waitForTimeout(350);
    const m = await page.evaluate(measure);

    if (!m.rows.length && !m.shelves.length) failures.push(`${dir} ${id}: no composition primitive rendered at all`);
    if (m.overflow > baseline + 1) failures.push(`${dir} ${id}: scrolls sideways by ${m.overflow}px against a ${baseline}px baseline`);

    m.rows.forEach((row, i) => {
      if (!row.stage || !row.copy) { failures.push(`${dir} ${id} row ${i}: a half is missing`); return; }
      // the defect that got through: same column, one drawn over the other
      if (row.stage.col === row.copy.col) failures.push(`${dir} ${id} row ${i}: both halves sit in grid column ${row.stage.col}`);
      const overlaps = row.stage.x < row.copy.x + row.copy.w && row.copy.x < row.stage.x + row.stage.w
        && row.stage.y < row.copy.b && row.copy.y < row.stage.b;
      if (overlaps) failures.push(`${dir} ${id} row ${i}: the halves overlap on screen`);
      // asymmetric, and by the ratio the law states rather than any ratio
      const ratio = Math.max(row.stage.w, row.copy.w) / Math.min(row.stage.w, row.copy.w);
      if (ratio < 1.25) failures.push(`${dir} ${id} row ${i}: halves are ${ratio.toFixed(2)}:1, which reads as equal`);
      if (!row.ordinal || row.ordinal === "none") failures.push(`${dir} ${id} row ${i}: no ordinal is drawn`);
    });

    // the side alternates: consecutive rows put the specimen on opposite sides
    const sides = m.rows.map((r) => r.stage?.col);
    for (let i = 1; i < sides.length; i += 1) {
      if (sides[i] === sides[i - 1]) failures.push(`${dir} ${id}: rows ${i - 1} and ${i} both put the specimen in column ${sides[i]}`);
    }

    // the shelf's rhythm is uneven, and it is the rhythm that was asked for
    m.shelves.forEach((s, i) => {
      if (s.spans.length > 1 && new Set(s.spans.slice(0, Math.min(3, s.spans.length))).size === 1) {
        failures.push(`${dir} ${id} shelf ${i}: every item spans ${s.spans[0]}, which is the equal grid again`);
      }
      s.spans.forEach((span, j) => {
        if (!span || span < 1 || span > 12) failures.push(`${dir} ${id} shelf ${i} item ${j}: span ${span} is outside the twelve`);
      });
    });
  }

  // narrow: one column, no crushed halves
  const page2 = await browser.newPage({ viewport: { width: 720, height: 1100 } });
  page2.on("pageerror", (e) => errors.push(`${dir} narrow: ${e}`));
  await page2.goto(`${URL}#${CONTROL}`, { waitUntil: "networkidle" });
  await page2.waitForTimeout(350);
  const narrowBaseline = await page2.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page2.goto(`${URL}#madar-energy`, { waitUntil: "networkidle" });
  if (dir === "ltr") await page2.evaluate(() => { document.documentElement.dir = "ltr"; });
  await page2.waitForSelector(".madar-spec-row", { timeout: 15000 });
  await page2.waitForTimeout(350);
  const narrow = await page2.evaluate(measure);
  narrow.rows.forEach((row, i) => {
    if (row.stage && row.copy && row.stage.y >= row.copy.y && row.copy.b > row.stage.y) {
      failures.push(`narrow ${dir} row ${i}: the halves are still side by side`);
    }
  });
  if (narrow.overflow > narrowBaseline + 1) failures.push(`narrow ${dir}: scrolls sideways by ${narrow.overflow}px against a ${narrowBaseline}px baseline`);
  console.log(`  narrow ${dir}: overflow ${narrow.overflow}px, shell baseline ${narrowBaseline}px`);
  await page2.close();
  await page.close();
}

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
for (const e of [...new Set(errors)]) console.log(`  ERROR ${e}`);
console.log(`SPEC_ROW_FAILURES=${failures.length}`);
console.log(`SPEC_ROW_ERRORS=${new Set(errors).size}`);
console.log(`SPEC_ROW_RENDER=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
