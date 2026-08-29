/**
 * An icon on a coloured plaque, which axe does not look at.
 *
 * WCAG 1.4.11 asks 3:1 of a graphic that carries meaning, and axe-core's
 * `color-contrast` rule tests TEXT ONLY. So a 20px glyph alone inside a filled
 * square is invisible to every gate this repository has: `.map-pin` paints
 * `color: #fff` on `var(--nova-action)`, and in the mint pack the action colour is
 * a mid teal. Nothing measured it, in either direction, ever.
 *
 * The literal is the root of it. `#fff` cannot know that four of the seven packs
 * publish a DARK `--nova-on-action` — mint's is `oklch(0.20 0.040 200)` — because
 * their action colour is light enough that white on it does not read. Fourteen
 * rules in `demos.css` paint a literal white on a token-driven fill.
 *
 * THE TEST. In every pack, find an element whose whole content is an `<svg>` (a
 * glyph and nothing else), which paints its own background, and measure the
 * glyph's colour against the COMPOSITED stack beneath it — the light packs
 * declare their soft grounds with alpha, so reading one colour over black is how
 * this gate would lie to itself.
 *
 * `#madar` is excluded, as in the shell axe pass: the imported reference code the
 * owner ordered in unchanged is carried under a named allowance and is not asked
 * to meet a rule written here.
 *
 *   node tools/qa/icon-contrast.mjs
 */
import { execSync, spawn } from "node:child_process";
import { createRequire } from "node:module";

/* Same two-step lookup as madar-qa.mjs: this repo does not depend on Playwright,
   so it is found locally if it is there and globally if it is not. */
let chromium;
try {
  chromium = createRequire(import.meta.url)("playwright").chromium;
} catch {
  try {
    const root = execSync("npm root -g", { encoding: "utf8" }).trim();
    chromium = createRequire(`${root}/`)("playwright").chromium;
  } catch {
    console.error("playwright not found. Install it (npm i -g playwright) and re-run.");
    process.exit(1);
  }
}

const PORT = 4521;
const URL = `http://localhost:${PORT}/`;
/* WCAG 1.4.11, non-text contrast. */
const FLOOR = 3;
/* Every value `data-theme` can take: the two in tokens.css and the five packs. */
const THEMES = [null, "light", "dark", "mint", "coral", "sky", "iris", "night"];

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
const stop = () => server.kill();
process.on("exit", stop);

for (let i = 0; i < 60; i++) {
  try { if ((await fetch(URL)).ok) break; } catch { /* still starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await page.goto(URL, { waitUntil: "networkidle" });
/* Freeze, for the reason madar-qa.mjs freezes: a transitioned colour read
   mid-flight makes a gate whose verdict depends on timing. */
await page.addStyleTag({
  content: "*, *::before, *::after { animation-delay: 0s !important; " +
    "animation-play-state: paused !important; transition: none !important }",
});

const failures = [];
let measured = 0;

for (const theme of THEMES) {
  await page.evaluate((t) => {
    if (t === null) document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }, theme);
  await page.waitForTimeout(200);

  const found = await page.evaluate((floor) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const px = (v) => {
      cx.fillStyle = "#000"; cx.fillRect(0, 0, 1, 1);
      cx.fillStyle = v; cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const opaque = (v) => {
      cx.fillStyle = "#000"; cx.fillRect(0, 0, 1, 1); cx.fillStyle = v; cx.fillRect(0, 0, 1, 1);
      const a = cx.getImageData(0, 0, 1, 1).data;
      cx.fillStyle = "#fff"; cx.fillRect(0, 0, 1, 1); cx.fillStyle = v; cx.fillRect(0, 0, 1, 1);
      const b = cx.getImageData(0, 0, 1, 1).data;
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    };
    /* The real painted stack: the nearest opaque ancestor first, then every
       translucent layer from the outside in. */
    const stack = (el) => {
      const layers = [];
      for (let e = el; e; e = e.parentElement) {
        const b = getComputedStyle(e).backgroundColor;
        if (!b || /rgba\(0, 0, 0, 0\)/.test(b)) continue;
        layers.push(b);
        if (opaque(b)) break;
      }
      cx.fillStyle = "#fff"; cx.fillRect(0, 0, 1, 1);
      for (const b of layers.reverse()) { cx.fillStyle = b; cx.fillRect(0, 0, 1, 1); }
      const d = cx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    };
    const lum = (c) => {
      const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)];
      return Math.round(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)) * 100) / 100;
    };
    const path = (el) => {
      const bits = [];
      for (let e = el; e && bits.length < 3; e = e.parentElement) {
        const cls = typeof e.className === "string" && e.className.trim() ? "." + e.className.trim().split(/\s+/)[0] : "";
        bits.unshift(e.tagName.toLowerCase() + cls);
      }
      return bits.join(" > ");
    };

    const main = document.querySelector("#main-content");
    const madar = document.querySelector("#madar");
    const out = [], seen = new Set();
    let n = 0;
    for (const el of main.querySelectorAll("*")) {
      if (madar && madar.contains(el)) continue;
      /* A glyph and nothing else: one svg child, and no text of its own. */
      const svgs = [...el.children].filter((c) => c.tagName.toLowerCase() === "svg");
      if (svgs.length !== 1 || el.children.length !== 1) continue;
      if (el.textContent.trim()) continue;
      const cs = getComputedStyle(el);
      /* It must paint its own plaque — a glyph on the page ground is the page's
         problem and axe already measures the text beside it. */
      const own = cs.backgroundColor;
      if (!own || /rgba\(0, 0, 0, 0\)/.test(own)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) continue;
      n += 1;
      const glyph = getComputedStyle(svgs[0]).fill;
      const ink = px(!glyph || glyph === "none" || glyph === "currentcolor" ? cs.color : glyph);
      const value = ratio(ink, stack(el));
      const key = path(el);
      if (value < floor && !seen.has(key)) { seen.add(key); out.push({ key, value }); }
    }
    return { n, out };
  }, FLOOR);

  measured += found.n;
  for (const f of found.out) failures.push(`${theme ?? "(none)"}  ${f.key}  ${f.value}:1`);
}

await browser.close();
stop();

console.log(`ICON_PLAQUES_MEASURED=${measured} across ${THEMES.length} theme values`);
for (const f of failures) console.log(`  BELOW ${f}`);
console.log(`ICON_CONTRAST=${failures.length ? "FAIL" : "ok"} (${failures.length} under ${FLOOR}:1)`);
process.exit(failures.length ? 1 : 0);
