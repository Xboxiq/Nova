/**
 * GitHub Pages serves this repo from a project subpath (`/nova/`), not from a
 * domain root. Absolute asset URLs are the classic way that breaks, and it
 * breaks silently — the page returns 200 and renders blank.
 *
 * So this serves the existing `dist/` under a subpath, loads it, opens a
 * lazily-imported section, and fails on any request that 404s. Run
 * `npm run build` first.
 *
 *   node tools/qa/pages-subpath.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4332;
const BASE = "/nova/";
const URL = `http://localhost:${PORT}${BASE}`;

let chromium;
try {
  chromium = createRequire(import.meta.url)("playwright").chromium;
} catch {
  const root = execSync("npm root -g", { encoding: "utf8" }).trim();
  chromium = createRequire(`${root}/`)("playwright").chromium;
}

const server = spawn("npx", ["vite", "preview", "--base", BASE, "--port", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());

for (let i = 0; i < 60; i += 1) {
  try {
    if ((await fetch(URL)).ok) break;
  } catch { /* server still starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const missing = [];
const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage();
page.on("response", (r) => r.status() >= 400 && missing.push(`${r.status()} ${r.url()}`));
page.on("requestfailed", (r) => missing.push(`failed ${r.url()}`));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: "networkidle" });

// A lazy chunk is the part a wrong base breaks after first paint.
await page.locator("#madar").scrollIntoViewIfNeeded();
await page.locator("#madar-consequence-tab").click();
await page.waitForTimeout(1200);

const painted = await page.evaluate(
  () => document.querySelector("#madar-consequence-panel")?.textContent?.trim().length ?? 0,
);

await browser.close();
server.kill();

console.log(`SUBPATH_404S=${missing.length}`);
missing.slice(0, 5).forEach((m) => console.log(`  ${m}`));
console.log(`SUBPATH_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  ${e}`));
console.log(`LAZY_SECTION_RENDERED=${painted > 0 ? "yes" : "no"}`);

process.exit(missing.length || errors.length || painted === 0 ? 1 : 0);
