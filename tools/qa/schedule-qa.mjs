/**
 * The schedule family's claims are geometric and behavioural, so they are checked
 * in a browser: the day has to hold twenty-four countable hours, "now" has to
 * land on the hours' own scale, the hours that have not happened have to be
 * hatched in their period's colour, and a chosen window has to be priced through
 * the plan and compared against the cheapest window of the same length.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/schedule-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4433;
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
const page = await browser.newPage({ viewport: { width: 1320, height: 1000 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(`${URL}#madar-schedule`, { waitUntil: "networkidle" });
await page.waitForSelector("#madar-schedule-panel [data-day-strip]", { timeout: 15000 });

const strip = "#madar-schedule-panel [data-day-strip]";

// ── the day is counted, and the unit is declared ────────────────────────────
const cells = await page.locator(`${strip} [data-hour]`).first().evaluate((el) => el.parentElement.children.length);
if (cells !== 24) failures.push(`the strip holds ${cells} hours, expected 24`);
const note = await page.locator("#madar-schedule-panel p", { hasText: "كل خانة ساعة" }).count();
if (!note) failures.push("the hour unit is not declared under the strip");

// ── "now" lands on the hours' own scale, and is a construction line ─────────
const now = await page.evaluate((sel) => {
  const track = document.querySelector(sel);
  const line = track.parentElement.querySelector("[data-now-line]");
  const t = track.getBoundingClientRect();
  const l = line.getBoundingClientRect();
  const rtl = getComputedStyle(track).direction === "rtl";
  return {
    at: ((rtl ? t.right - l.right : l.left - t.left) / t.width) * 100,
    style: getComputedStyle(line).borderInlineStartStyle,
  };
}, strip);
// the section's default is 14.4 of 24 → 60%
if (Math.abs(now.at - 60) > 1.5) failures.push(`the now line sits at ${now.at.toFixed(1)}%, expected 60%`);
if (now.style !== "dashed") failures.push(`the now line is ${now.style}, not a dashed construction line`);

// ── what has not happened is hatched, in its own period's colour ────────────
const hatch = await page.evaluate((sel) => {
  const at = (h) => document.querySelector(`${sel} [data-hour="${h}"]`);
  const bg = (h) => getComputedStyle(at(h)).backgroundImage;
  return {
    past: bg(13), future: bg(19),
    futurePeriod: at(19).dataset.period, pastPeriod: at(13).dataset.period,
    currentRing: getComputedStyle(at(14)).boxShadow,
    plainRing: getComputedStyle(at(13)).boxShadow,
  };
}, strip);
if (hatch.past !== "none") failures.push(`hour 13 has already happened but is hatched: ${hatch.past}`);
if (hatch.future === "none") failures.push("hour 19 has not happened yet and is not hatched");
if (!/rgb/.test(hatch.future)) failures.push(`the future hatch carries no colour: ${hatch.future}`);
// the inset at the joint is the only depth left after the shadows went
if (!/inset/.test(hatch.currentRing)) failures.push(`the current hour has no inset ring: ${hatch.currentRing}`);
if (/inset/.test(hatch.plainRing)) failures.push("an ordinary hour carries the current hour's ring");

// ── the clock draws the plan, not the axis ─────────────────────────────────
const clock = await page.evaluate(() => {
  const bands = [...document.querySelectorAll("#madar-schedule-panel [data-band]")];
  return {
    count: bands.length,
    hatched: bands.filter((b) => /madar-clock-hatch/.test(b.getAttribute("stroke") ?? "")).length,
    hand: Boolean(document.querySelector("#madar-schedule-panel [data-hand]")),
  };
});
if (clock.count >= 24) failures.push(`the clock drew ${clock.count} bands: consecutive hours were not merged`);
if (clock.count < 4) failures.push(`the clock drew only ${clock.count} bands`);
if (!clock.hatched) failures.push("no arc on the clock is hatched, so the future is painted as lived");
if (!clock.hand) failures.push("the clock has no hand");

// ── a window is priced through the plan, and against the cheapest ──────────
const before = await page.locator("#madar-schedule-panel [data-window-cost]").innerText();
await page.locator('#madar-schedule-panel [data-window-cost]').scrollIntoViewIfNeeded();
const picker = '#madar-schedule-panel [data-day-strip]';
const strips = await page.locator(picker).count();
if (strips !== 2) failures.push(`expected the axis twice, found ${strips}`);
// pick 02:00 → 05:00 inside the picker's own strip (the second one)
await page.locator(picker).nth(1).locator('[data-hour="2"]').click();
await page.locator(picker).nth(1).locator('[data-hour="5"]').click();
const after = await page.locator("#madar-schedule-panel [data-window-cost]").innerText();
if (after === before) failures.push(`picking a window did not change the price (${before})`);
const nums = async (sel) => Number((await page.locator(sel).innerText()).replace(/[^\d.]/g, ""));
const cost = await nums("#madar-schedule-panel [data-window-cost]");
const best = await nums("#madar-schedule-panel [data-window-best]");
// four off-peak hours at 0.18 for a 2.4 kW load
if (Math.abs(cost - 1.73) > 0.02) failures.push(`04 hours off-peak priced ${cost}, expected 1.73`);
if (best > cost + 0.001) failures.push(`the cheapest window (${best}) costs more than the chosen one (${cost})`);

// ── the axis is one tab stop, and the arrows follow the writing direction ───
const keys = await page.evaluate((sel) => {
  const track = document.querySelector(sel);
  return {
    stops: [...track.querySelectorAll("[data-hour]")].filter((b) => b.tabIndex === 0).length,
    rtl: getComputedStyle(track).direction === "rtl",
  };
}, strip);
if (keys.stops !== 1) failures.push(`the strip offers ${keys.stops} tab stops, expected 1`);

const focused = () => page.evaluate(() => document.activeElement?.getAttribute("data-hour"));
await page.locator(`${strip} [data-hour][tabindex="0"]`).first().focus();
const from = Number(await focused());
// in RTL the next hour lies to the left, so ArrowLeft has to mean forward
await page.keyboard.press(keys.rtl ? "ArrowLeft" : "ArrowRight");
const fwd = Number(await focused());
if (fwd !== from + 1) failures.push(`forward arrow moved ${from} → ${fwd}, expected ${from + 1}`);
await page.keyboard.press("Home");
if (Number(await focused()) !== 0) failures.push("Home did not reach the first hour");
await page.keyboard.press("End");
if (Number(await focused()) !== 23) failures.push("End did not reach the last hour");

await browser.close();
server.kill();

console.log(`SCHEDULE_CHECKS=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
