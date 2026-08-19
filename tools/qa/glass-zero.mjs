/**
 * anti-slop-ui #8 refuses translucent milky surfaces. The system had three glass
 * levels and no zero, so the standard was not reachable at all. g0 does not lower
 * the blur — it rebinds the glass tokens to solid surfaces, which is the claim
 * measured here: in a browser, at g0, the glass token equals the surface token
 * and the specular highlight is gone.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/glass-zero.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4411;
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
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await page.goto(URL, { waitUntil: "networkidle" });

const at = async (level) => {
  await page.evaluate((g) => { document.documentElement.dataset.glass = g; }, level);
  await page.waitForTimeout(150);
  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const get = (n) => root.getPropertyValue(n).trim();
    return {
      glass: get("--nova-glass"), strong: get("--nova-glass-strong"),
      specular: get("--nova-glass-specular"), blur: get("--glass-blur"),
      surface: get("--nova-surface"),
    };
  });
};

const glassy = await at("g2");
const solid = await at("g0");

// at g2 the surface is translucent: an 8-digit hex or an rgba, either way not the surface token
if (glassy.glass === glassy.surface) failures.push(`g2 is already opaque (${glassy.glass}), so g0 proves nothing`);
if (solid.glass !== solid.surface) failures.push(`g0 glass is ${solid.glass}, expected the surface ${solid.surface}`);
if (solid.strong !== solid.surface) failures.push(`g0 strong glass is ${solid.strong}, expected ${solid.surface}`);
if (solid.specular !== "transparent") failures.push(`g0 keeps a specular highlight: ${solid.specular}`);
if (solid.blur !== "0px") failures.push(`g0 blur is ${solid.blur}`);

// and the level has to be offerable in the picker, not only settable by hand
await page.locator(".theme-menu > button").click();
await page.waitForSelector(".theme-panel", { timeout: 5000 });
const offered = await page.locator(".theme-panel button", { hasText: /G0|مصمت/ }).count();
if (offered !== 1) failures.push(`the solid level is not offered in the picker (found ${offered})`);

await browser.close();
server.kill();

console.log(`GLASS_ZERO=${failures.length ? failures.join(" | ") : "ok"}`);
console.log(`OFFERED_IN_UI=${offered === 1}`);
process.exit(failures.length ? 1 : 0);
