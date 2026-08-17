/**
 * The energy family's claims are geometric and behavioural, so they are checked
 * in a browser rather than by reading the source: the usual range has to land
 * where the numbers say it lands, the register has to turn when consumption
 * happens, and the tier colours have to be the same colour in two places.
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

await browser.close();
server.kill();

console.log(`ENERGY_CHECKS=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
