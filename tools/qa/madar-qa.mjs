/**
 * Runnable acceptance check for the Madar surface.
 *
 * Builds nothing and installs nothing: it serves the existing `dist/` with
 * `vite preview`, drives it with Playwright, and prints one KEY=VALUE line per
 * gate in GATES.md. Run `npm run build` first.
 *
 *   node tools/qa/madar-qa.mjs
 *
 * Playwright is not a project dependency; it is resolved from wherever it is
 * installed (a global install is fine). Without it the script says so and
 * exits non-zero rather than pretending the checks passed.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const PORT = 4319;
const URL = `http://localhost:${PORT}/`;
const THEMES = ["light", "dark", "mint", "coral", "sky", "iris", "night"];
const PACK_SECTIONS = ["madar-color-tokens", "madar-admin-access", "madar-consequence"];
const AA = 4.5;

// Pairs that carry text or an icon on a surface, so AA applies to all of them.
const PAIRS = [
  ["--nova-ink", "--nova-canvas"],
  ["--nova-ink-secondary", "--nova-surface"],
  ["--nova-ink-tertiary", "--nova-surface-quiet"],
  ["--nova-on-action", "--nova-action"],
  ["--nova-action-ink", "--nova-surface"],
  ["--nova-on-ink-block", "--nova-ink-block"],
  ["--nova-danger", "--nova-surface"],
  ["--nova-success", "--nova-surface"],
];

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

const AXE = await (async () => {
  for (const base of [import.meta.url, `${execSync("npm root -g", { encoding: "utf8" }).trim()}/`]) {
    try {
      return createRequire(base).resolve("axe-core/axe.min.js");
    } catch { /* try the next resolution root */ }
  }
  return null;
})();

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
const stop = () => server.kill();
process.on("exit", stop);

for (let i = 0; i < 60; i += 1) {
  try {
    const res = await fetch(URL);
    if (res.ok) break;
  } catch { /* server still starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const runtimeErrors = [];
const overflow = [];
const axeViolations = [];
const contrastFailures = [];

const browser = await chromium.launch();

async function open(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && runtimeErrors.push(m.text()));
  page.on("pageerror", (e) => runtimeErrors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle" });
  return { ctx, page };
}

const setTheme = (page, theme, dir = "rtl") =>
  page.evaluate(([t, d]) => {
    document.documentElement.dataset.theme = t;
    document.documentElement.dir = d;
    document.documentElement.lang = d === "rtl" ? "ar" : "en";
  }, [theme, dir]);

const measureOverflow = (page) =>
  page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    body: document.body.scrollWidth,
  }));

// ── contrast across every pack ──────────────────────────────────────────────
{
  const { ctx, page } = await open(1440, 1000);
  for (const theme of THEMES) {
    await setTheme(page, theme);
    const ratios = await page.evaluate((pairs) => {
      const probe = document.createElement("span");
      probe.style.display = "none";
      document.body.appendChild(probe);
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const g = canvas.getContext("2d");
      const rgb = (token) => {
        probe.style.color = `var(${token})`;
        g.fillStyle = "#fff";
        g.fillRect(0, 0, 1, 1);
        g.fillStyle = getComputedStyle(probe).color;
        g.fillRect(0, 0, 1, 1);
        return [...g.getImageData(0, 0, 1, 1).data].slice(0, 3);
      };
      const lum = (c) =>
        c.map((v) => v / 255).map((s) => (s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4))
          .reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
      const out = pairs.map(([fg, bg]) => {
        const [a, b] = [lum(rgb(fg)), lum(rgb(bg))];
        return [`${fg}/${bg}`, Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100];
      });
      probe.remove();
      return out;
    }, PAIRS);

    for (const [pair, ratio] of ratios) {
      // The light pack's tertiary pair predates the merge and is tracked in
      // AUDIT.md; every pack the merge introduced must clear AA.
      const preExisting = theme === "light" && pair.startsWith("--nova-ink-tertiary");
      if (ratio < AA && !preExisting) contrastFailures.push(`${theme} ${pair} ${ratio}`);
    }
  }
  await ctx.close();
}

// ── theme menu opens, applies a pack, and dismisses both ways ───────────────
const menuFailures = [];
{
  const { ctx, page } = await open(1440, 1000);
  const trigger = page.locator('.theme-menu > button');
  const panel = page.locator(".theme-panel");

  await trigger.click();
  if (!(await panel.isVisible())) menuFailures.push("panel did not open");

  await page.locator(".theme-pack-list button", { hasText: /Iris|بنفسجي/ }).click();
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "iris") {
    menuFailures.push("pack selection did not apply");
  }

  await page.locator("#main-content").click({ position: { x: 5, y: 5 } });
  if (await panel.isVisible()) menuFailures.push("outside click did not dismiss");

  await trigger.click();
  await page.keyboard.press("Escape");
  if (await panel.isVisible()) menuFailures.push("Escape did not dismiss");

  await ctx.close();
}

// ── Axe and overflow across packs and viewports ─────────────────────────────
const CASES = [
  { theme: "light", w: 1440, h: 1000, dir: "rtl" },
  { theme: "mint", w: 1440, h: 1000, dir: "ltr" },
  { theme: "iris", w: 1440, h: 1000, dir: "rtl" },
  { theme: "sky", w: 1440, h: 1000, dir: "rtl" },
  { theme: "night", w: 390, h: 844, dir: "rtl" },
  { theme: "coral", w: 390, h: 844, dir: "ltr" },
];

for (const c of CASES) {
  const { ctx, page } = await open(c.w, c.h);
  await setTheme(page, c.theme, c.dir);
  await page.locator("#madar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  for (const section of PACK_SECTIONS) {
    await page.locator(`#${section}-tab`).click();
    await page.waitForTimeout(700);

    const size = await measureOverflow(page);
    if (size.scroll > size.client || size.body > size.client) {
      overflow.push(`${c.theme} ${c.w}px ${c.dir} ${section} scroll=${size.scroll} client=${size.client}`);
    }

    if (AXE) {
      await page.addScriptTag({ path: AXE });
      const result = await page.evaluate(async () =>
        window.axe.run(document.querySelector("#madar"), {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
        }),
      );
      for (const v of result.violations) {
        axeViolations.push(`${c.theme} ${c.w}px ${section} ${v.id} x${v.nodes.length}`);
      }
    }
  }
  await ctx.close();
}

await browser.close();
stop();

const report = [
  `CONTRAST_FAILURES=${contrastFailures.length}`,
  ...contrastFailures.map((f) => `  contrast: ${f}`),
  `OVERFLOW=${overflow.length ? overflow.join(" | ") : "none"}`,
  `AXE_VIOLATIONS_MADAR=${AXE ? axeViolations.length : "skipped-no-axe-core"}`,
  ...axeViolations.map((v) => `  axe: ${v}`),
  `THEME_MENU=${menuFailures.length ? menuFailures.join(" | ") : "ok"}`,
  `RUNTIME_ERRORS=${runtimeErrors.length}`,
  ...runtimeErrors.slice(0, 5).map((e) => `  error: ${e}`),
];
console.log(report.join("\n"));

const failed =
  contrastFailures.length || overflow.length || axeViolations.length || runtimeErrors.length || menuFailures.length;
process.exit(failed ? 1 : 0);
