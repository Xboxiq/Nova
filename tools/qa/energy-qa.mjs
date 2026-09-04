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
  const seal = document.querySelector("#madar-energy-panel [data-tier-seal] i");
  const segs = [...document.querySelectorAll("#madar-energy-panel [data-tier-step] .madar-fill")];
  return {
    seal: getComputedStyle(seal).backgroundColor,
    ladder: segs.map((s) => getComputedStyle(s).backgroundColor),
  };
});
const edges = await page.locator("#madar-energy-panel [data-tier-edge]").allTextContents();
if (edges.map((t) => t.replace(/\D/g, "")).join() !== "200,400,600,900") failures.push(`ladder boundaries should read 200,400,600,900 under the steps, got ${edges.join(" | ")}`);
if (await page.locator("#madar-energy-panel [title]").count()) failures.push("energy still carries a title tooltip somewhere — hover-only information");
if (!tier.ladder.includes(tier.seal)) {
  failures.push(`tier colour ${tier.seal} is not among the ladder's ${tier.ladder.join(", ")}`);
}

// ── the leak reports a verdict, and nothing else ────────────────────────────
// Two cards are in a verdict state on load: ConsumptionBand above its usual
// range, and PrepaidRunway short of its top-up day. Both leaks must be state:
// the runway's is proved below by moving the marker and watching it go out.
const leaks = await page.locator("#madar-energy-panel .madar-leak").count();
if (leaks !== 2) failures.push(`expected exactly two cards to be leaking (band above usual, runway short), found ${leaks}`);

// ── the prepaid runway: lengths are the arithmetic, the leak is the verdict ──
await page.waitForSelector("#madar-energy-panel [data-runway]", { timeout: 15000 });
const runway = () => page.evaluate(() => {
  const root = document.querySelector("#madar-energy-panel [data-runway]");
  const rtl = getComputedStyle(root).direction === "rtl";
  const t = root.querySelector("[data-track]").getBoundingClientRect();
  const span = (sel) => { const el = root.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); return rtl ? [(t.right - b.right) / t.width, (t.right - b.left) / t.width] : [(b.left - t.left) / t.width, (b.right - t.left) / t.width]; };
  const th = root.querySelector("[data-marker]").getBoundingClientRect();
  return { topUp: +root.dataset.topUp, short: root.dataset.short, fill: span("[data-fill]"), shortfall: span("[data-shortfall]"),
    thumb: rtl ? (t.right - th.left - th.width / 2) / t.width : (th.left + th.width / 2 - t.left) / t.width,
    edges: root.querySelectorAll("[data-day-edge]").length, leaks: document.querySelectorAll("#madar-energy-panel .madar-leak").length };
});
/* the defaults: balance 58 over days 12,17,16,11,11,12,11,12,17,16 (total 135), top-up on day index 5 (needs 67) */
const R = await runway();
const near = (a, b, tol = 0.006) => Math.abs(a - b) <= tol;
if (!near(R.fill[1], 58 / 135)) failures.push(`runway: the balance is drawn ${(R.fill[1] * 100).toFixed(2)}% long, expected ${(58 / 135 * 100).toFixed(2)}%`);
if (!R.shortfall || !near(R.shortfall[0], 58 / 135) || !near(R.shortfall[1], 67 / 135)) failures.push(`runway: the shortfall hatch is ${JSON.stringify(R.shortfall)}, expected from the balance's end to the top-up day (${(58 / 135).toFixed(4)}→${(67 / 135).toFixed(4)})`);
if (!near(R.thumb, 67 / 135)) failures.push(`runway: the top-up marker sits at ${(R.thumb * 100).toFixed(2)}%, expected ${(67 / 135 * 100).toFixed(2)}%`);
if (R.edges !== 9) failures.push(`runway: ${R.edges} day boundaries drawn for 10 days, expected 9`);
if (R.short !== "true") failures.push(`runway: default should be short of its top-up day, data-short=${R.short}`);
/* one day back (ArrowRight in Arabic) needs 56 ≤ 58: the hatch goes, the leak goes out, and the count drops to the band's alone */
await page.locator("#madar-energy-panel [data-thumb]").focus();
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
const R2 = await runway();
if (R2.topUp !== 4 || R2.short !== "false" || R2.shortfall || R2.leaks !== 1) failures.push(`runway: after one day back expected top-up 4, not short, no hatch, one leak left; got top-up ${R2.topUp} short=${R2.short} hatch=${JSON.stringify(R2.shortfall)} leaks=${R2.leaks}`);
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(300);
const R3 = await runway();
if (R3.topUp !== 5 || R3.leaks !== 2) failures.push(`runway: forward did not restore top-up 5 and the leak (top-up ${R3.topUp}, leaks ${R3.leaks})`);
/* a press on the axis at 21.5% of its length (29 of 135) lands the marker on the nearest day boundary — day 2 — and leaves focus on the axis so the arrows continue from there */
const axis = await page.locator("#madar-energy-panel [data-axis]").boundingBox();
await page.mouse.click(axis.x + axis.width * (1 - 0.215), axis.y + axis.height / 2);
await page.waitForTimeout(300);
const R4 = await runway();
const focused = await page.evaluate(() => document.activeElement?.hasAttribute("data-axis"));
if (R4.topUp !== 2 || !focused) failures.push(`runway: a press at 21.5% should put the top-up on day 2 with focus on the axis; got top-up ${R4.topUp}, axis focused=${focused}`);
console.log(`RUNWAY balance=${(R.fill[1] * 100).toFixed(2)}% shortfall=${(R.shortfall?.[0] * 100).toFixed(2)}→${(R.shortfall?.[1] * 100).toFixed(2)}% thumb=${(R.thumb * 100).toFixed(2)}% edges=${R.edges} leaks ${R.leaks}→${R2.leaks}→${R3.leaks} press@21.5%→day ${R4.topUp} focused=${focused}`);

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

// ── the perforation is an affordance, so it tracks the state ────────────────
await page.waitForSelector("#madar-energy-panel [data-bill]", { timeout: 15000 });
const bills = await page.evaluate(() =>
  [...document.querySelectorAll("#madar-energy-panel [data-bill]")].map((b) => ({
    state: b.dataset.bill,
    notches: b.querySelector("[data-perforation]")?.children.length ?? 0,
    stub: Boolean(b.querySelector("[data-stub]")),
    settled: Boolean(b.querySelector("[data-settled]")),
    total: (b.querySelector("[data-stub] b, [data-settled] b")?.textContent ?? "").trim(),
  })),
);
if (bills.length !== 2) failures.push(`expected the bill in both states, found ${bills.length}`);
const due = bills.find((b) => b.state === "due");
const settled = bills.find((b) => b.state === "settled");
if (!due?.notches) failures.push("a payable bill has no perforation to tear along");
if (!due?.stub) failures.push("a payable bill has no stub");
if (settled?.notches) failures.push(`a settled bill still shows ${settled.notches} notches with nothing to detach`);
if (settled?.stub || !settled?.settled) failures.push("a settled bill is not drawn settled");
// two states, not one card duplicated: the readings differ so the totals differ.
if (due && settled && due.total === settled.total) {
  failures.push(`both bills show ${due.total} — the states are documented with the same numbers`);
}

await browser.close();
server.kill();

console.log(`ENERGY_CHECKS=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
