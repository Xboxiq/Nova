/**
 * The energy family's claims are geometric and behavioural, so they are checked
 * in a browser rather than by reading the source: the usual range has to land
 * where the numbers say it lands, the register has to turn when consumption
 * happens, and the tier colours have to be the same colour in two places.
 *
 * The fifth-batch additions are checked the same way, because their claims are
 * also geometric: the reference line has to sit on the bars' own scale, the
 * comb has to hold as many ticks as the reading has units, and the legend has
 * to repeat each segment's own treatment rather than a colour dot.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/energy-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4333;
const URL = `http://localhost:${PORT}/`;

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
const page = await browser.newPage({ viewport: { width: 1320, height: 1100 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(URL, { waitUntil: "networkidle" });
await page.locator("#madar").scrollIntoViewIfNeeded();
await page.locator("#madar-energy-tab").click();
await page.waitForSelector("#madar-energy-panel .madar-hatch", { timeout: 15000 });

// ── the usual range lands where the numbers put it ──────────────────────────
const band = await page.evaluate(() => {
  const seg = document.querySelector("#madar-energy-panel .madar-hatch");
  const track = seg.parentElement;
  const s = seg.getBoundingClientRect();
  const t = track.getBoundingClientRect();
  return {
    width: Math.round((s.width / t.width) * 100),
    start: Math.round(((t.right - s.right) / t.width) * 100),
  };
});
// defaults are 260..380 of 520: a 23% band starting 50% along.
if (Math.abs(band.width - 23) > 1) failures.push(`usual range is ${band.width}% wide, expected 23%`);
if (Math.abs(band.start - 50) > 1) failures.push(`usual range starts at ${band.start}%, expected 50%`);

// ── the register turns because consumption happened ─────────────────────────
const drumAt = () =>
  page.evaluate(() => {
    const reg = document.querySelector('#madar-energy-panel [aria-label*="القراءة"]');
    return [...reg.querySelectorAll("span > span")]
      .map((el) => getComputedStyle(el).transform)
      .filter((t) => t !== "none")
      .join("|");
  });
const before = await drumAt();
await page.waitForFunction(
  (prev) => {
    const reg = document.querySelector('#madar-energy-panel [aria-label*="القراءة"]');
    const now = [...reg.querySelectorAll("span > span")]
      .map((el) => getComputedStyle(el).transform).filter((t) => t !== "none").join("|");
    return now !== prev;
  },
  before,
  { timeout: 12000 },
).catch(() => failures.push("the register never turned while consumption ran"));

// ── the reading is announced, not only drawn ────────────────────────────────
const label = await page.locator('#madar-energy-panel [aria-label*="القراءة"]').getAttribute("aria-label");
if (!/كيلوواط ساعة/.test(label ?? "")) failures.push(`register not announced, got: ${label}`);

// ── the tier colour is one colour, in the seal and in the ladder ────────────
const tier = await page.evaluate(() => {
  const seal = document.querySelector("#madar-energy-panel [title*='الشريحة'] i");
  const segs = [...document.querySelectorAll("#madar-energy-panel [title*='الشريحة'] .madar-fill")];
  return {
    seal: getComputedStyle(seal).backgroundColor,
    ladder: segs.map((s) => getComputedStyle(s).backgroundColor),
  };
});
if (!tier.ladder.includes(tier.seal)) {
  failures.push(`tier colour ${tier.seal} is not among the ladder's ${tier.ladder.join(", ")}`);
}

// ── the leak reports leaving the usual range, and nothing else ──────────────
const leaks = await page.locator("#madar-energy-panel .madar-leak").count();
if (leaks !== 1) failures.push(`expected exactly one card to be leaking, found ${leaks}`);

// ── fifth batch: the reference line is drawn on the bars' scale ─────────────
await page.waitForSelector("#madar-energy-panel [data-target-line]", { timeout: 15000 });
await page.evaluate(() =>
  Promise.all(
    [...document.querySelectorAll("#madar-energy-panel [data-bar]")]
      .flatMap((el) => el.getAnimations())
      .map((a) => a.finished.catch(() => {})),
  ),
);
const ref = await page.evaluate(() => {
  const q = (s) => document.querySelector(`#madar-energy-panel ${s}`);
  const line = q("[data-target-line]");
  const apr = q('[data-bar="أبريل"]');   // 402, just over the 400 target
  const jan = q('[data-bar="يناير"]');   // 318, well under it
  const may = q('[data-bar="مايو"]');    // 468, well over it
  return {
    gap: Math.abs(line.getBoundingClientRect().top - apr.getBoundingClientRect().top),
    style: getComputedStyle(line).borderTopStyle,
    apr: getComputedStyle(apr).backgroundColor,
    jan: getComputedStyle(jan).backgroundColor,
    may: getComputedStyle(may).backgroundColor,
  };
});
// 402 against a 400 target on a 468 scale: the line must land on that bar's top.
if (ref.gap > 2) failures.push(`the target line is ${ref.gap.toFixed(1)}px off the bar it should touch`);
if (ref.style !== "dashed") failures.push(`the reference line is ${ref.style}, not a dashed construction line`);
if (ref.apr !== ref.may) failures.push(`bars over the target disagree: ${ref.apr} vs ${ref.may}`);
if (ref.jan === ref.may) failures.push("a bar under the target is drawn as loud as one over it");

// ── the comb holds as many ticks as the reading has units ───────────────────
const comb = await page.evaluate(() => {
  const el = document.querySelector('#madar-energy-panel [data-comb="التكييف"]');
  const h = [...el.children].map((t) => t.getBoundingClientRect().height);
  return { n: h.length, first: h[0], last: h[h.length - 1], label: el.getAttribute("aria-label") };
});
// 186 kWh at 10 per tick: eighteen whole units and a remainder that is drawn short.
if (comb.n !== 19) failures.push(`the comb holds ${comb.n} ticks, expected 19 for 186 at 10 each`);
if (!(comb.last < comb.first)) failures.push("the part-unit tick is drawn as tall as a whole one");
if (!/186/.test(comb.label ?? "")) failures.push(`the comb is not announced with its reading, got: ${comb.label}`);

// ── the legend repeats the treatment, so the reading is never colour alone ──
const alloc = await page.evaluate(() => {
  const bi = (sel, i) =>
    getComputedStyle(document.querySelectorAll(`#madar-energy-panel ${sel}`)[i]).backgroundImage;
  return {
    freePart: bi('[data-part="free"]', 0), freeSwatch: bi('[data-swatch="free"]', 0),
    usedPart: bi('[data-part="used"]', 0), usedSwatch: bi('[data-swatch="used"]', 0),
    projPart: bi('[data-part="projected"]', 0),
    edges: document.querySelectorAll("#madar-energy-panel [data-budget-edge]").length,
  };
});
if (alloc.freePart !== alloc.freeSwatch) failures.push("the legend swatch does not repeat the hatch it stands for");
if (alloc.usedPart !== "none" || alloc.usedSwatch !== "none") failures.push("the metered segment is not solid");
if (alloc.projPart === alloc.freePart) failures.push("the projection and the remainder are hatched identically");
// only the overshooting card draws its allocation edge; the one within it does not.
if (alloc.edges !== 1) failures.push(`expected one allocation edge, found ${alloc.edges}`);

// ── and that edge sits where the allocation is, not at the end of the bar ───
const edgeAt = await page.evaluate(() => {
  const e = document.querySelector("#madar-energy-panel [data-budget-edge]");
  const track = e.parentElement.querySelector("[data-allocation]");
  const er = e.getBoundingClientRect();
  const tr = track.getBoundingClientRect();
  const rtl = getComputedStyle(track).direction === "rtl";
  return Math.round((((rtl ? tr.right - er.right : er.left - tr.left) / tr.width)) * 100);
});
// 450 allocated on a 490 scale (412 metered + 78 projected).
if (Math.abs(edgeAt - 92) > 2) failures.push(`the allocation edge sits at ${edgeAt}%, expected 92%`);

await browser.close();
server.kill();

console.log(`ENERGY_CHECKS=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
