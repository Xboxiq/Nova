/**
 * Are the components actually usable, or only correct-looking?
 *
 * This file exists because of a defect the owner caught and no harness did. The
 * reference set was carried into the library pixel-faithful and **dead**: across
 * sixteen components there were two `useState`, one `onClick` and zero
 * `onKeyDown`. Tabs that did not switch, a legend that could not hide a series, a
 * search box that could not search, a text field that could not be typed into.
 * Every existing harness passed, because every existing harness measured how it
 * *looked* — contrast, radii, depth, composition — and none measured whether it
 * *worked*.
 *
 * So this drives the real page and asks three things of every family:
 *
 *   1. Reachability — each specimen offers at least one control a keyboard can
 *      get to. A card with no tab stop is a picture.
 *   2. Consequence — pressing it changes the DOM. A control whose result is
 *      invisible is the same lie in a different costume.
 *   3. Direction — the arrow that moves "forward" is the one that follows the
 *      writing direction, checked in both. A physical ArrowRight passes in
 *      English and lies in Arabic.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/operable.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4452;
const URL = `http://localhost:${PORT}/`;

/* Each entry: the section, and the controls that must exist and must do
   something. `changes` is a CSS selector or attribute whose value has to differ
   after the interaction — that is the "consequence" half of the check. */
const CASES = [
  {
    id: "madar-photographed",
    name: "credit",
    controls: [
      { what: "loan meter swap", click: "[data-meter]", watch: "[data-meter]", attr: "data-meter" },
      { what: "paid/left split", click: '[data-split] [role="radio"]:not([aria-checked="true"])', watch: "[data-split]", attr: "data-split" },
      { what: "month grid", click: '[data-months] [role="gridcell"]:not([aria-selected="true"])', watch: "[data-months]", attr: "data-selected" },
      { what: "loan tabs", click: '[role="tablist"][aria-label="Loan views"] [role="tab"][aria-selected="false"]', watch: "[data-panel]", attr: "data-panel" },
      { what: "score dock", click: '[data-dock]:not([aria-current])', watch: "[data-dock][aria-current]", exists: true },
      { what: "score bands", click: '[data-bands] [role="radio"]:not([aria-checked="true"])', watch: "[data-bands]", attr: "data-looking" },
      { what: "history point", click: '[data-history] circle[role="radio"]:not([aria-checked="true"])', watch: "[data-history]", attr: "data-at" },
      { what: "bureau legend", click: '[data-history] [role="switch"]', watch: '[data-history] [role="switch"]', attr: "aria-checked" },
      { what: "stat widget open", click: '[data-stat] button[aria-label^="Open"]', watch: "[data-stat]", appears: "[data-stat-detail]" },
    ],
    keyboard: { group: "[data-months]", cell: '[role="gridcell"]', attr: "data-selected" },
  },
  {
    id: "madar-boards",
    name: "boards",
    controls: [
      { what: "plate stat", click: '[data-plate-stat]:not([data-on])', watch: "[data-plate-note]", text: true },
      { what: "donut legend", click: '[data-slice][data-on]', watch: "[data-donut]", attr: "data-donut" },
      /* the selector followed `aria-sort` until axe refused it on a button; it
         now follows the label, which is what actually announces the state */
      { what: "table sort", click: '[data-opps] button[aria-label$="Activate to sort."]', watch: "[data-opps]", attr: "data-sort" },
      { what: "table row", click: '[data-row]:not([data-on])', watch: "[data-row][data-on]", exists: true },
      { what: "care metric", click: '[data-metric]:not([data-on])', watch: "[data-care-says]", text: true },
      { what: "care period", click: "[data-care] button[aria-label^=Period]", watch: "[data-care]", attr: "data-period" },
      { what: "flow band", click: '[data-band][data-on]', watch: "[data-flow]", attr: "data-flow" },
      { what: "orb resize", click: '[data-assistant] button[aria-label="Larger orb"]', watch: "[data-assistant] [data-orb-size]", attr: "data-orb-size" },
      { what: "palette copy", click: "[data-swatch]", watch: "[data-palette-says]", text: true },
    ],
    typing: { field: '[data-assistant] input', send: '[data-assistant] button[aria-label="Send"]', watch: '[data-assistant] [aria-live]' },
    search: { field: '[data-staff] input', watch: "[data-staff]", attr: "data-staff" },
  },
];

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
let operated = 0;
const browser = await chromium.launch();

const read = async (page, sel, attr) =>
  page.evaluate(([s, a]) => {
    const el = document.querySelector(s);
    if (!el) return null;
    return a ? el.getAttribute(a) : el.textContent.trim();
  }, [sel, attr]);

for (const c of CASES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on("pageerror", (e) => errors.push(`${c.name}: ${e}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${c.name}: ${m.text()}`));
  await page.goto(`${URL}#${c.id}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  /* ── 1 + 2. every control exists, is reachable, and changes something ── */
  for (const k of c.controls) {
    const target = page.locator(k.click).first();
    if (!(await target.count())) { failures.push(`${c.name}: no control for ${k.what} (${k.click})`); continue; }

    /* a control the keyboard cannot reach is a picture of a control */
    const focusable = await target.evaluate((el) => {
      const t = el.tagName.toLowerCase();
      const ti = el.getAttribute("tabindex");
      return t === "button" || t === "input" || t === "a" || (ti !== null && ti !== "-1") || el.getAttribute("role") === "radio";
    });
    if (!focusable) failures.push(`${c.name}: ${k.what} cannot be reached by keyboard`);

    const before = k.appears || k.exists ? null : await read(page, k.watch, k.attr);
    await target.scrollIntoViewIfNeeded();
    await target.click({ force: true });
    await page.waitForTimeout(220);

    if (k.appears) {
      if (!(await page.locator(k.appears).count())) failures.push(`${c.name}: ${k.what} pressed and ${k.appears} never appeared`);
    } else if (k.exists) {
      if (!(await page.locator(k.watch).count())) failures.push(`${c.name}: ${k.what} pressed and nothing became selected`);
    } else {
      const after = await read(page, k.watch, k.attr);
      if (after === before) {
        failures.push(`${c.name}: ${k.what} pressed and ${k.attr ?? "the text"} stayed at "${before}" — the control does nothing`);
      }
    }
    operated += 1;
  }

  /* ── typing: a field drawn is a field that must accept text ── */
  if (c.typing) {
    const before = await read(page, c.typing.watch);
    await page.locator(c.typing.field).fill("does this field work");
    const typed = await page.locator(c.typing.field).inputValue();
    if (typed !== "does this field work") failures.push(`${c.name}: the assistant field did not take the text`);
    await page.locator(c.typing.send).click();
    await page.waitForTimeout(220);
    if (await read(page, c.typing.watch) === before) failures.push(`${c.name}: sending changed nothing`);
    operated += 1;
  }

  /* ── search: a magnifier drawn is a filter that must filter ── */
  if (c.search) {
    const before = await read(page, c.search.watch, c.search.attr);
    await page.locator(c.search.field).fill("cardio");
    await page.waitForTimeout(220);
    const after = await read(page, c.search.watch, c.search.attr);
    if (after === before) failures.push(`${c.name}: the roster search did not narrow the list (${before} → ${after})`);
    if (Number(after) >= Number(before)) failures.push(`${c.name}: search widened or held the list: ${before} → ${after}`);
    operated += 1;
  }

  /* ── 3. the arrow that moves forward follows the writing direction ── */
  if (c.keyboard) {
    for (const dir of ["rtl", "ltr"]) {
      await page.evaluate((d) => { document.documentElement.dir = d; }, dir);
      await page.waitForTimeout(200);
      const cell = page.locator(`${c.keyboard.group} ${c.keyboard.cell}[aria-selected="true"]`).first();
      await cell.focus();
      const before = await read(page, c.keyboard.group, c.keyboard.attr);
      /* forward is ArrowLeft in Arabic and ArrowRight in English */
      await page.keyboard.press(dir === "rtl" ? "ArrowLeft" : "ArrowRight");
      await page.waitForTimeout(200);
      const after = await read(page, c.keyboard.group, c.keyboard.attr);
      if (after === before) failures.push(`${c.name} ${dir}: the forward arrow moved nothing`);
      /* and going back must return to where it started */
      await page.keyboard.press(dir === "rtl" ? "ArrowRight" : "ArrowLeft");
      await page.waitForTimeout(200);
      if (await read(page, c.keyboard.group, c.keyboard.attr) !== before) {
        failures.push(`${c.name} ${dir}: back did not undo forward`);
      }
      operated += 1;
    }
    await page.evaluate(() => { document.documentElement.dir = "rtl"; });
  }

  await page.close();
}

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
for (const e of [...new Set(errors)]) console.log(`  ERROR ${e}`);
console.log(`OPERATED=${operated} interactions`);
console.log(`OPERABLE_FAILURES=${failures.length}`);
console.log(`OPERABLE=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
