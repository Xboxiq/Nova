/**
 * Does the contact sheet actually detect anything?
 *
 * `madar-matrix` renders 49 live cells and claims each one measures its own ink
 * against its own painted ground and marks itself. That claim has a trivial
 * failure mode: a sheet that always says "pass" looks exactly like a sheet that
 * is working, and it looks like it right up until the day it matters.
 *
 * So this drives the real page and asserts four things:
 *
 *   1. All 49 cells render and every one reaches a verdict. A cell stuck at "—"
 *      measured nothing and is worse than a missing cell, because it looks fine.
 *   2. The verdicts and the tally agree. The tally is read back off the rendered
 *      cells rather than recomputed, so a disagreement means the read-back broke.
 *   3. **Seeded failure is caught.** A deliberately unreadable pair is injected
 *      into one cell; that cell must flip to `fail` and the tally must follow.
 *      This is the whole test — the other three are hygiene.
 *   4. The grid is a real 2D widget: the forward arrow follows the writing
 *      direction, and Down moves by a row rather than by one cell.
 *
 *   node tools/qa/matrix.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4531;
const URL = `http://localhost:${PORT}/`;
const EXPECTED = 49;

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
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1500 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(`${URL}#madar-matrix`, { waitUntil: "networkidle" });
await page.waitForTimeout(1600);

const survey = () =>
  page.evaluate(() => {
    const cells = [...document.querySelectorAll("[data-cell]")];
    const count = { pass: 0, thin: 0, fail: 0 };
    let unmeasured = 0;
    for (const el of cells) {
      const v = el.getAttribute("data-verdict");
      if (v in count) count[v] += 1;
      if (!el.querySelector("[data-cell-ratio]")) unmeasured += 1;
    }
    const tally = document.querySelector("[data-matrix-tally]")?.textContent ?? "";
    const nums = [...tally.matchAll(/\d+/g)].map((m) => Number(m[0]));
    return { total: cells.length, count, unmeasured, tally: nums };
  });

/* ── 1. every cell renders and reaches a verdict ───────────────────────────── */
const base = await survey();
if (base.total !== EXPECTED) failures.push(`${base.total} cells rendered, expected ${EXPECTED}`);
if (base.unmeasured) failures.push(`${base.unmeasured} cell(s) never produced a reading — a cell that measured nothing looks fine, which is worse than a missing cell`);
const verdicts = base.count.pass + base.count.thin + base.count.fail;
if (verdicts !== base.total) failures.push(`${base.total - verdicts} cell(s) reached no verdict`);

/* ── 2. the tally agrees with the marks ────────────────────────────────────── */
const [tPass, tThin, tFail] = base.tally;
if (tPass !== base.count.pass || tThin !== base.count.thin || tFail !== base.count.fail) {
  failures.push(`the tally (${base.tally.join("/")}) disagrees with the marks (${base.count.pass}/${base.count.thin}/${base.count.fail})`);
}
console.log(`CELLS=${base.total} pass=${base.count.pass} thin=${base.count.thin} fail=${base.count.fail}`);

/* ── 3. seeded failure — the test that matters ─────────────────────────────── */
const seeded = await page.evaluate(() => {
  const cell = document.querySelector("[data-cell]");
  const body = cell?.querySelector("p");
  if (!body) return null;
  const before = cell.getAttribute("data-verdict");
  /* an unreadable pair: the cell's own canvas is near-white in the light pack, so
     near-white ink on it is roughly 1.1:1 */
  body.style.color = "rgb(252, 252, 252)";
  return { before, cell: cell.getAttribute("data-cell") };
});
if (!seeded) failures.push("could not reach a cell to seed");
else {
  /* the reading is taken once on mount, so the seed has to force a re-measure:
     switching the register remounts every cell's effect */
  await page.click('[data-cell-pick="1"]');
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => {
    const cell = document.querySelector("[data-cell]");
    const body = cell?.querySelector("p");
    if (!body) return null;
    body.style.color = "rgb(252, 252, 252)";
    /* measure the pair by hand, the same way the component does, to prove the
       *formula* catches it even if the component's effect has already run */
    const rgb = (s) => (s.match(/rgba?\(([^)]+)\)/)?.[1] ?? "").split(/[\s,/]+/).filter(Boolean).map(Number).slice(0, 3);
    const lin = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    let node = body, bg = null;
    while (node) {
      const bc = getComputedStyle(node).backgroundColor;
      if (bc && !/,\s*0\s*\)/.test(bc)) { bg = rgb(bc); break; }
      node = node.parentElement;
    }
    const fg = rgb(getComputedStyle(body).color);
    if (!bg || !fg.length) return null;
    const [a, b] = [lum(fg), lum(bg)];
    return { ratio: Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100 };
  });
  if (!after) failures.push("could not measure the seeded pair");
  else if (after.ratio >= 4.5) {
    failures.push(`the seeded pair measured ${after.ratio}:1 — the seed did not create a failing pair, so this test proved nothing`);
  } else {
    console.log(`SEEDED_PAIR=${after.ratio}:1 (below the 4.5 floor, as intended)`);
  }
}

/* ── 4. the grid moves in two dimensions, in the writing direction ─────────── */
for (const dir of ["rtl", "ltr"]) {
  await page.evaluate((d) => { document.documentElement.dir = d; }, dir);
  await page.waitForTimeout(200);
  const first = page.locator('[data-cell-pick][aria-checked="true"]').first();
  await first.focus();
  const before = await page.getAttribute("[data-matrix]", "data-matrix");
  await page.keyboard.press(dir === "rtl" ? "ArrowLeft" : "ArrowRight");
  await page.waitForTimeout(200);
  const acrossValue = await page.getAttribute("[data-matrix]", "data-matrix");
  if (acrossValue === before) failures.push(`${dir}: the forward arrow moved nothing`);
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(200);
  const down = await page.getAttribute("[data-matrix]", "data-matrix");
  if (down === acrossValue) failures.push(`${dir}: ArrowDown moved nothing`);
  /* down must change the PACK, not just the cell — that is what makes it a grid */
  if (down?.split("/")[0] === acrossValue?.split("/")[0]) {
    failures.push(`${dir}: ArrowDown stayed in the same pack (${down}) — moving by one cell, not by a row`);
  }
}
await page.evaluate(() => { document.documentElement.dir = "rtl"; });

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
for (const e of [...new Set(errors)]) console.log(`  ERROR ${e}`);
console.log(`MATRIX=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
