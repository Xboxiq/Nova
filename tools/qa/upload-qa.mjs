/**
 * The Upload section's claims are behavioural, so a static check cannot make
 * them: files have to land, progress has to advance, a rejected file has to
 * end in a retry rather than a stuck bar.
 *
 * This drives the built app in a real browser and prints one KEY=VALUE line.
 * Run `npm run build` first.
 *
 *   node tools/qa/upload-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4327;
const URL = `http://localhost:${PORT}/`;

let chromium;
try {
  chromium = createRequire(import.meta.url)("playwright").chromium;
} catch {
  try {
    const root = execSync("npm root -g", { encoding: "utf8" }).trim();
    chromium = createRequire(`${root}/`)("playwright").chromium;
  } catch {
    console.error("playwright not found. Install it (npm i -g playwright) and re-run.");
    process.exit(2);
  }
}

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());

for (let i = 0; i < 60; i += 1) {
  try {
    if ((await fetch(URL)).ok) break;
  } catch { /* still starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const failures = [];
const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(URL, { waitUntil: "networkidle" });
await page.locator("#madar").scrollIntoViewIfNeeded();
await page.locator("#madar-upload-tab").click();
// The picker input is hidden behind its button, so wait for it attached.
await page.waitForSelector("#madar-upload-panel input[type=file]", { state: "attached", timeout: 15000 });

const panel = page.locator("#madar-upload-panel");
const inputs = panel.locator("input[type=file]");
const bars = panel.locator('[role="progressbar"]');

// ── the happy path: two files land and the aggregate reaches 100 ────────────
if ((await bars.first().getAttribute("aria-valuenow")) !== "0") {
  failures.push("aggregate progress did not start at 0");
}

await inputs.first().setInputFiles([
  { name: "brief.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(140_000, 7) },
  { name: "notes.txt", mimeType: "text/plain", buffer: Buffer.alloc(20_000, 3) },
]);

if ((await panel.locator("li").count()) !== 2) failures.push("dropped files did not appear as rows");

// The lid is state-driven, so it must have left its shut angle while active.
const lidOpen = await panel.locator("svg").nth(1).evaluate((el) => getComputedStyle(el).transform);
if (lidOpen === "none" || /matrix\(1, 0, 0, 1, 0, 0\)/.test(lidOpen)) {
  failures.push("folder lid did not open when files landed");
}

await page.waitForFunction(
  () => document.querySelector('#madar-upload-panel [role="progressbar"]')?.getAttribute("aria-valuenow") === "100",
  null,
  { timeout: 20000 },
).catch(() => failures.push("aggregate progress never reached 100"));

const doneText = await panel.locator('[aria-live="polite"]').first().textContent();
if (!/اكتمل/.test(doneText ?? "")) failures.push(`completion not announced, got: ${doneText}`);

// ── the failure path: a rejected file must end in a retry, not a stuck bar ──
await inputs.nth(1).setInputFiles([
  { name: "handoff.zip", mimeType: "application/zip", buffer: Buffer.alloc(60_000, 1) },
]);

const retry = page.locator('#madar-upload-panel button[aria-label^="إعادة المحاولة"]');
await retry.first().waitFor({ state: "visible", timeout: 15000 })
  .catch(() => failures.push("a rejected file did not expose a retry control"));

if (!failures.length) {
  // Retry must actually re-run the transfer: the row goes back to uploading.
  await retry.first().click();
  await page.waitForTimeout(300);
  const cancelBack = await page.locator('#madar-upload-panel button[aria-label^="إلغاء"]').count();
  if (!cancelBack) failures.push("retry did not restart the transfer");
}

await browser.close();
server.kill();

console.log(`UPLOAD_FLOW=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`RUNTIME_ERRORS=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log(`  error: ${e}`));
process.exit(failures.length || errors.length ? 1 : 0);
