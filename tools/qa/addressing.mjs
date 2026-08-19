/**
 * Thirty-two sections and, until now, no address for any of them: the page
 * always opened on the first tab, so anything added later was invisible to
 * anyone who did not already know which tab to click — and there was no link
 * to hand them either.
 *
 * These checks are about reachability, not looks: a pasted fragment has to open
 * its section, picking a section has to leave a link behind, and an addition has
 * to be visible from where the page lands.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/addressing.mjs
 */
import { readFileSync } from "node:fs";
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4355;
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

// ── a pasted fragment opens its section, without a click ────────────────────
await page.goto(`${URL}#madar-energy`, { waitUntil: "networkidle" });
await page.waitForSelector("#madar-energy-panel", { timeout: 15000 });
const selected = await page.locator("#madar-energy-tab").getAttribute("aria-selected");
if (selected !== "true") failures.push(`#madar-energy did not open its own section (aria-selected=${selected})`);

// ── and it lands there, rather than at the top of a very long page ──────────
const landed = await page.evaluate(() => {
  const top = document.getElementById("madar")?.getBoundingClientRect().top ?? Infinity;
  return { scrolled: window.scrollY, top };
});
if (landed.scrolled < 200) failures.push(`a deep link did not scroll to the library (scrollY=${landed.scrolled})`);

// ── the addition is visible from where the page lands ───────────────────────
/* The expected number comes from the registry, not from a literal: hardcoding it
   made this check fail the next time something was added, which is the test
   breaking rather than the code. */
const expected = (readFileSync("src/madar/sections.ts", "utf8").match(/^\s*added: true,$/gm) ?? []).length;
if (expected < 1) failures.push("nothing in the registry is marked as an addition");
const strip = await page.locator(".madar-whats-new button");
const stripCount = await strip.count();
if (stripCount !== expected) failures.push(`the recently-added row lists ${stripCount} sections, registry says ${expected}`);
const marks = await page.locator(".madar-picker-list .madar-new").count();
if (marks !== expected) failures.push(`${marks} tabs carry the new mark, registry says ${expected}`);

// ── picking a section leaves a link behind ──────────────────────────────────
await page.locator("#madar-upload-tab").click();
await page.waitForSelector("#madar-upload-panel", { timeout: 15000 });
const hash = await page.evaluate(() => window.location.hash);
if (hash !== "#madar-upload") failures.push(`picking a section left the fragment as "${hash}"`);

// ── and the row itself works as navigation ─────────────────────────────────
await strip.first().click();
const afterStrip = await page.evaluate(() => window.location.hash);
if (!/^#madar-(upload|energy)$/.test(afterStrip)) failures.push(`the row did not navigate, fragment is "${afterStrip}"`);

// ── the nav anchor still means the block, not a section ────────────────────
await page.evaluate(() => { window.location.hash = "madar"; });
await page.waitForTimeout(200);
const stillOpen = await page.evaluate(() =>
  document.querySelector('.madar-picker-list button[aria-selected="true"]')?.id ?? "none");
if (stillOpen === "none") failures.push("the #madar anchor closed every section");

await browser.close();
server.kill();

console.log(`ADDRESSING=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
