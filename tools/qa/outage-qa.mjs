/**
 * The outage family's whole claim is that the answer lives in the coincidence, so
 * the check is about the crossing: the tie has to be drawn only where the two
 * tracks actually overlap, the verdict has to be derived from those crossings
 * rather than typed beside them, and one outage without a counterpart has to flip
 * the verdict — which is the difference between "call the utility" and "check
 * your own breaker".
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/outage-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4436;
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

await page.goto(`${URL}#madar-outage`, { waitUntil: "networkidle" });
await page.waitForSelector("#madar-outage-panel [data-verdict]", { timeout: 15000 });

// ── both cases are on screen, and they disagree ─────────────────────────────
const verdicts = await page.locator("#madar-outage-panel [data-verdict]").evaluateAll(
  (els) => els.map((el) => el.dataset.verdict),
);
if (verdicts.length !== 2) failures.push(`expected both cases, found ${verdicts.length}`);
if (verdicts[0] !== "grid") failures.push(`the first case reads ${verdicts[0]}, expected grid`);
if (verdicts[1] !== "premises") failures.push(`the second case reads ${verdicts[1]}, expected premises`);

// ── the tie is drawn only where the tracks actually overlap ─────────────────
const geometry = await page.evaluate(() => {
  const cards = [...document.querySelectorAll("#madar-outage-panel [data-verdict]")].map((v) => v.parentElement);
  return cards.map((card) => {
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width };
    };
    const tracks = [...card.querySelectorAll("[data-track]")];
    const box = rect(tracks[0]);
    const norm = (el) => {
      const r = rect(el);
      return { a: (r.left - box.left) / box.width, b: (r.right - box.left) / box.width };
    };
    return {
      mine: [...tracks[0].querySelectorAll("[data-outage]")].map(norm),
      area: [...tracks[1].querySelectorAll("[data-outage]")].map(norm),
      ties: [...card.querySelectorAll("[data-tie]")].map(norm),
      ongoing: [...card.querySelectorAll('[data-outage="ongoing"]')].length,
      restored: [...card.querySelectorAll('[data-outage="restored"]')].length,
    };
  });
});

const overlaps = (x, y) => Math.min(x.b, y.b) - Math.max(x.a, y.a) > 0.002;
geometry.forEach((g, i) => {
  // every tie must sit inside a real crossing of the two tracks
  for (const tie of g.ties) {
    const real = g.mine.some((m) => overlaps(tie, m)) && g.area.some((a) => overlaps(tie, a));
    if (!real) failures.push(`case ${i + 1}: a tie is drawn where the tracks do not cross`);
  }
  // and every real crossing must be tied
  const crossings = g.mine.filter((m) => g.area.some((a) => overlaps(m, a))).length;
  if (g.ties.length !== crossings) {
    failures.push(`case ${i + 1}: ${crossings} crossings but ${g.ties.length} ties`);
  }
});

// case 1 ties every one of its own outages; case 2 leaves one untied
if (geometry[0] && geometry[0].ties.length !== geometry[0].mine.length) {
  failures.push("case 1 claims a grid fault while one of its outages stands alone");
}
if (geometry[1] && geometry[1].ties.length >= geometry[1].mine.length) {
  failures.push("case 2 claims a premises fault with nothing standing alone");
}

// ── the saturated colour appears once: on what has not ended ───────────────
geometry.forEach((g, i) => {
  if (g.ongoing !== 1) failures.push(`case ${i + 1}: ${g.ongoing} outages drawn as ongoing, expected 1`);
  if (!g.restored) failures.push(`case ${i + 1}: nothing drawn as history`);
});
const tone = await page.evaluate(() => {
  const on = document.querySelector('#madar-outage-panel [data-outage="ongoing"]');
  const off = document.querySelector('#madar-outage-panel [data-outage="restored"]');
  return { on: getComputedStyle(on).backgroundColor, off: getComputedStyle(off).backgroundColor };
});
if (tone.on === tone.off) failures.push(`an ongoing outage looks like history (${tone.on})`);

await browser.close();
server.kill();

console.log(`OUTAGE_CHECKS=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
