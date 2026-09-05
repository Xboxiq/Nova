/**
 * A brand a shop can choose is a brand that must be legible on every pack.
 *
 * `data-brand` multiplies with `data-theme`: eight brands over seven packs is
 * fifty-six accent/ground pairs, and no one reviews fifty-six pairs by eye. A
 * palette nobody measured is a palette that ships illegible on somebody's pack
 * — the defect this repo already paid for once, when `--nova-danger` at 12px
 * read 4.44:1 on the light surface and axe found it rather than a person.
 *
 * WHAT IS MEASURED, and why each floor is what it is:
 *   action  vs surface      >= 3.0  — a filled button is a UI COMPONENT, and
 *                                     WCAG 1.4.11 asks 3:1 of its boundary
 *   on-action vs action     >= 4.5  — the label INSIDE that button is body text
 *   action-ink vs surface   >= 4.5  — the accent used as small text on the ground
 *   focus   vs surface      >= 3.0  — the ring must be findable on the ground
 *
 * Read in a real browser from the resolved computed values, because every one of
 * these is an oklch expression with a calc() in it: the derivation rule is the
 * thing under test, and a hex table in a test file would only be testing itself.
 *
 *   node tools/qa/brand-contrast.mjs
 */
import { execSync, spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const PORT = 4597;
const URL = `http://localhost:${PORT}/`;

/* run from the repo root, like every gate here; `URL` is shadowed by the const above */
const REGISTRY = readFileSync("src/brands.ts", "utf8");
/* the BRANDS array only: the file also registers the radius names, and a first
   run swept those in as brands — which is how the derivation hole below was found */
const BRAND_BLOCK = REGISTRY.slice(REGISTRY.indexOf("export const BRANDS"), REGISTRY.indexOf("export type RadiusName"));
const BRANDS = [...BRAND_BLOCK.matchAll(/name: "([a-z]+)"/g)].map((m) => m[1]).filter((n) => n !== "none");
const PACKS = ["light", "dark", "mint", "coral", "sky", "iris", "night"];
const PAIRS = [
  ["--nova-action", "--nova-surface", 3.0, "the filled control against the ground"],
  ["--nova-on-action", "--nova-action", 4.5, "the label inside the control"],
  ["--nova-action-ink", "--nova-surface", 4.5, "the accent as small text"],
  ["--nova-focus", "--nova-surface", 3.0, "the focus ring against the ground"],
];

let chromium;
try { chromium = createRequire(import.meta.url)("playwright").chromium; }
catch { chromium = createRequire(`${execSync("npm root -g", { encoding: "utf8" }).trim()}/`)("playwright").chromium; }

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore", detached: true });
process.on("exit", () => { try { process.kill(-server.pid); } catch { /* gone */ } });
for (let i = 0; i < 60; i += 1) { try { if ((await fetch(URL)).ok) break; } catch { /* starting */ } await new Promise((r) => setTimeout(r, 500)); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await page.route(/ik\.imagekit\.io/, (r) => r.abort());
await page.goto(URL, { waitUntil: "networkidle" });

/* Resolution is a PIXEL read, not a string parse: `oklch(calc(0.44 - 0.13) ...)`
   has no hex form until a browser paints it, and this repo has been wrong four
   times parsing colour text by hand. */
const measure = await page.evaluate(async ([brands, packs, pairs]) => {
  const probe = document.createElement("span");
  probe.style.cssText = "position:fixed;inset:0;width:1px;height:1px;opacity:0;pointer-events:none";
  document.body.appendChild(probe);
  const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const rgb = (value) => {
    probe.style.color = value;
    const painted = getComputedStyle(probe).color;
    canvas.fillStyle = "#000";
    canvas.fillRect(0, 0, 1, 1);
    canvas.fillStyle = painted;
    canvas.fillRect(0, 0, 1, 1);
    const [r, g, b] = canvas.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  };
  const lum = ([r, g, b]) => {
    const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const root = document.documentElement;
  const out = [];
  for (const brand of brands) {
    root.dataset.brand = brand;
    for (const pack of packs) {
      root.dataset.theme = pack;
      for (const [fg, bg, floor, what] of pairs) {
        out.push({ brand, pack, fg, bg, floor, what, ratio: +ratio(rgb(`var(${fg})`), rgb(`var(${bg})`)).toFixed(2) });
      }
    }
  }
  /* the guard, measured rather than asserted: an unknown brand must be a no-op */
  root.dataset.theme = "light";
  delete root.dataset.brand;
  const packAccent = rgb("var(--nova-action)");
  root.dataset.brand = "not-a-registered-brand";
  const unknownAccent = rgb("var(--nova-action)");
  out.push({ brand: "<unknown>", pack: "light", fg: "--nova-action", bg: "<pack accent>", floor: 0, what: "an unregistered brand leaves the pack's accent untouched", ratio: packAccent.join() === unknownAccent.join() ? 1 : 0, guard: true });
  delete root.dataset.brand;
  root.dataset.theme = "light";
  probe.remove();
  return out;
}, [BRANDS, PACKS, PAIRS]);

await browser.close();

const guards = measure.filter((m) => m.guard);
const failures = measure.filter((m) => !m.guard).filter((m) => !(m.ratio >= m.floor) || Number.isNaN(m.ratio))
  .concat(guards.filter((g) => g.ratio !== 1).map((g) => ({ ...g, ratio: "differs", floor: "identical" })));
const worst = {};
for (const m of measure.filter((x) => !x.guard)) {
  const key = `${m.fg} on ${m.bg}`;
  if (!worst[key] || m.ratio < worst[key].ratio) worst[key] = m;
}
for (const [key, m] of Object.entries(worst)) {
  console.log(`${key.padEnd(38)} worst ${String(m.ratio).padStart(6)} (floor ${m.floor})  ${m.brand}/${m.pack} — ${m.what}`);
}
console.log(`BRAND_PAIRS_MEASURED=${measure.length - guards.length} (${BRANDS.length} brands x ${PACKS.length} packs x ${PAIRS.length} pairs)`);
for (const f of failures) console.log(`  UNDER ${f.brand}/${f.pack}: ${f.fg} on ${f.bg} = ${f.ratio}, floor ${f.floor} — ${f.what}`);
console.log(`UNKNOWN_BRAND_IS_NOOP=${guards.every((g) => g.ratio === 1) ? "ok" : "FAIL"}`);
console.log(`BRAND_CONTRAST=${failures.length ? "FAIL" : "ok"} (${failures.length})`);
process.exit(failures.length ? 1 : 0);
