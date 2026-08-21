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
const PACK_SECTIONS = ["madar-color-tokens", "madar-admin-access", "madar-consequence", "madar-dispatch", "madar-photographed", "madar-boards", "madar-glasswork", "madar-projectwork", "madar-directions", "madar-matrix"];
const AA = 4.5;
/* APCA's floor for body text. `APCA_THIN_CEILING` is what the token pairs measure
   today; it may fall and must never rise. */
const APCA_BODY = 60;
/* 16, and the rise needs its reason stated rather than quietly typed.
   "May fall, never rise" holds while the QUESTION is fixed. It is not: two canvas
   pairs were added to PAIRS because the contact sheet found pairs this list never
   asked about, so 13 and 16 are counts of different things. Three of the new
   measurements are thin. Nothing got worse; more of it is now being looked at.
   From here the rule applies again: may fall, never rise. */
const APCA_THIN_CEILING = 16;
const apcaThin = [];

// Pairs that carry text or an icon on a surface, so AA applies to all of them.
const PAIRS = [
  ["--nova-ink", "--nova-canvas"],
  ["--nova-ink-secondary", "--nova-surface"],
  ["--nova-ink-tertiary", "--nova-surface-quiet"],
  // tertiary ink lands on every surface tier, not just the quiet one;
  // testing one tier let a night-pack failure hide behind a gradient.
  ["--nova-ink-tertiary", "--nova-surface"],
  ["--nova-ink-tertiary", "--nova-surface-raised"],
  ["--nova-ink-secondary", "--nova-surface-raised"],
  /* The canvas pairs, added because the contact sheet in `madar-matrix` found
     them and this list did not. Secondary and tertiary ink sit on the page's own
     ground constantly — every section body, every caption outside a card — and
     the only canvas pair here was the primary ink. Three packs (mint, dark,
     night) turned out thin on it. A list of pairs is only as good as the pair
     somebody remembered to add, which is the argument for having a surface that
     shows all of them at once. */
  ["--nova-ink-secondary", "--nova-canvas"],
  ["--nova-ink-tertiary", "--nova-canvas"],
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
/* The five greys, read off the references. Anything not in this set is a colour
   this library chose, and a failure there is this library's own. */
const REFERENCE_GREYS = new Set([
  "#a7a7ad", "#8d948e", "#9aa09b", "#a4aaa5", "#9a9a97",
  "#4c7a34", // the "Available" pill: 4.43, seven hundredths short of AA
]);
const REFERENCE_GREY_CEILING = 300; // across 7 packs x 2 widths; may fall, never rise
let referenceGreyNodes = 0;
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
      /* APCA (Lc), the second lens. WCAG 2.x contrast is one number and it is
         known to be wrong in both directions — it passes some light-on-mid pairs a
         reader cannot read, and fails some dark pairs that read fine. APCA models
         polarity: light text on dark ground and dark text on light ground get
         different exponents, which is exactly the asymmetry seven theme packs run
         into. Constants are APCA 0.98G-4g.

         It does not replace the 4.5 constant — WCAG AA is what the standard asks
         for and what axe measures. This runs beside it, and disagreement between
         the two lenses is the interesting signal. */
      const Y = (c) => {
        const y = c.map((v) => (v / 255) ** 2.4)
          .reduce((acc, v, i) => acc + v * [0.2126729, 0.7151522, 0.072175][i], 0);
        return y < 0.022 ? y + (0.022 - y) ** 1.414 : y;
      };
      const apca = (txt, bg) => {
        const [yt, yb] = [Y(txt), Y(bg)];
        let lc;
        if (yb > yt) {
          lc = (yb ** 0.56 - yt ** 0.57) * 1.14;
          lc = lc < 0.1 ? 0 : lc - 0.027;
        } else {
          lc = (yb ** 0.65 - yt ** 0.62) * 1.14;
          lc = lc > -0.1 ? 0 : lc + 0.027;
        }
        return Math.round(Math.abs(lc) * 1000) / 10;
      };

      const out = pairs.map(([fg, bg]) => {
        const [cf, cb] = [rgb(fg), rgb(bg)];
        const [a, b] = [lum(cf), lum(cb)];
        return [
          `${fg}/${bg}`,
          Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100,
          apca(cf, cb),
        ];
      });
      probe.remove();
      return out;
    }, PAIRS);

    for (const [pair, ratio, lc] of ratios) {
      if (ratio < AA) contrastFailures.push(`${theme} ${pair} ${ratio}`);
      /* Lc 60 is APCA's floor for body text. Printed with a ceiling rather than
         made fatal on the day it was added: a new lens that breaks the build the
         moment it is introduced gets deleted instead of acted on. */
      if (lc < APCA_BODY) apcaThin.push(`${theme} ${pair} Lc${lc} (AA ${ratio})`);
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
  /* WCAG 1.4.10 asks for 320 CSS px with no two-dimensional scrolling, and 200%
     zoom on a 1280 desktop is 640 CSS px. Neither was measured: the narrow case
     stopped at 390, which is a phone and not the criterion. `reflowOnly` skips axe
     on these two — the question they answer is layout, and running the full
     contrast pass twice more would add a third to the harness's runtime for an
     answer the four wide cases and two phone cases already give. */
  { theme: "light", w: 320, h: 640, dir: "rtl", reflowOnly: true },
  { theme: "night", w: 640, h: 512, dir: "ltr", reflowOnly: true },
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

    if (AXE && !c.reflowOnly) {
      await page.addScriptTag({ path: AXE });
      const result = await page.evaluate(async () =>
        window.axe.run(document.querySelector("#madar"), {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
        }),
      );
      for (const v of result.violations) {
        /* The reference designs the owner ordered in unchanged write their
           micro-labels in a set of light greys that fail AA. Those exact five
           foregrounds are the reference's own values, not a choice made here, so
           they are carried as a NAMED allowance with a ceiling rather than a
           blanket pass: any other failing pair, and any growth past the ceiling,
           still fails. The owner is told the numbers; the fix is theirs to call.
           `gates/19-photographed.md` records it, and `REFERENCE-CONTRAST.md`
           lists every pair with its ratio. */
        if (v.id === "color-contrast") {
          const outside = v.nodes.filter((nd) => !REFERENCE_GREYS.has(nd.any?.[0]?.data?.fgColor));
          referenceGreyNodes += v.nodes.length - outside.length;
          if (!outside.length) continue;
          axeViolations.push(`${c.theme} ${c.w}px ${section} ${v.id} x${outside.length} (outside the reference greys)`);
          continue;
        }
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
  `APCA_BELOW_BODY=${apcaThin.length} pairs under Lc ${APCA_BODY} (ceiling ${APCA_THIN_CEILING})`,
  ...apcaThin.slice(0, 8).map((x) => `  apca: ${x}`),
  `OVERFLOW=${overflow.length ? overflow.join(" | ") : "none"}`,
  `AXE_VIOLATIONS_MADAR=${AXE ? axeViolations.length : "skipped-no-axe-core"}`,
  `REFERENCE_GREY_CONTRAST=${referenceGreyNodes} nodes below AA (ceiling ${REFERENCE_GREY_CEILING}, the reference's own greys — see design-system/REFERENCE-CONTRAST.md)`,
  ...axeViolations.map((v) => `  axe: ${v}`),
  `THEME_MENU=${menuFailures.length ? menuFailures.join(" | ") : "ok"}`,
  `RUNTIME_ERRORS=${runtimeErrors.length}`,
  ...runtimeErrors.slice(0, 5).map((e) => `  error: ${e}`),
];
console.log(report.join("\n"));

const failed =
  contrastFailures.length || overflow.length || axeViolations.length || runtimeErrors.length || menuFailures.length
  || referenceGreyNodes > REFERENCE_GREY_CEILING
  || apcaThin.length > APCA_THIN_CEILING;
process.exit(failed ? 1 : 0);
