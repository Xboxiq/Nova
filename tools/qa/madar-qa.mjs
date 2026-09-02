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
const PACK_SECTIONS = ["madar-nova-instruments", "madar-color-tokens", "madar-admin-access", "madar-consequence", "madar-dispatch", "madar-photographed", "madar-boards", "madar-glasswork", "madar-projectwork", "madar-directions", "madar-matrix", "madar-imported", "madar-imported-2", "madar-imported-3"];
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
/* Violations in the application shell, outside the showcase. Fatal at zero: this
   is the repo's own code, not the reference designs the owner ordered in. */
const shellViolations = [];
/* Sections whose skeleton never went away — a chunk that failed to load is not
   a section this gate may declare clean. */
const skeletonStuck = [];
/* Sections whose inline styles never stopped changing. Not fatal on its own — a
   deliberately endless animation is legitimate — but it is printed, because a
   number measured on a moving target deserves to be labelled as one. */
const unsettled = [];

/* Two identical fingerprints of every inline `style` in the scope, 160ms apart.
   160 because Framer Motion's springs here settle in well under that and a frame
   is 16ms: ten frames of stillness is stillness. */
/* 14 tries is ~2.2s. The entrances this exists for land in under 300ms, and the
   one section that never settles — a progress simulator writing inline styles
   every 80ms forever — should not be charged 6 seconds in each of eight cases to
   prove it. It is named in STILL_MOVING instead, and its numbers are identical
   across runs regardless. */
async function settle(page, scope, tries = 14) {
  let last = null;
  for (let i = 0; i < tries; i++) {
    const now = await page.evaluate((sel) => {
      const root = document.querySelector(sel);
      if (!root) return "";
      let out = "";
      for (const el of root.querySelectorAll("[style]")) out += el.getAttribute("style") + "|";
      return out;
    }, scope);
    if (now === last) return;
    last = now;
    await page.waitForTimeout(160);
  }
  throw new Error("did not settle");
}

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
const offlineAssetErrors = [];
const overflow = [];
const axeViolations = [];
/* The five greys, read off the references. Anything not in this set is a colour
   this library chose, and a failure there is this library's own. */
const REFERENCE_GREYS = new Set([
  "#a7a7ad", "#8d948e", "#9aa09b", "#a4aaa5", "#9a9a97",
  "#4c7a34", // the "Available" pill: 4.43, seven hundredths short of AA

  /* A second "Available" pill, from upload 83, and BOTH of its colours are the
     author's: `color: #178d00` on `background-color: #e1f9dc`, declared in the
     same rule. Measured on the page: 3.87 at 16px. Unlike the folder card --
     where the failing ground was a cream I had chosen and the fix was to delete
     my own decoration -- there is nothing of mine in this pair to remove. So it
     is carried on the same named terms as the line above: the number is printed,
     any other failing pair still fails, and raising the green is a design change
     and therefore the owner's. REFERENCE-CONTRAST.md lists it. */
  "#178d00", // "Available for new project" on #e1f9dc — 3.87

  /* Upload 98's "NEW" badge, and BOTH of its colours are the author's: the badge
     is `bg-blue-500/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400`, a
     hardcoded blue pair rather than a token, and in the NIGHT pack alone the dark
     half composites to `#51a2ff` on `#34456a` — 3.61 at 10px bold, against 4.5.
     Two nodes; the six other packs pass.

     Carried on the terms the two entries above established, and for the same
     reason: there is nothing of MINE in the pair to remove. Recolouring an
     upload's badge is a design change to what the owner ordered in unchanged, so
     the number is printed and the decision stays theirs. The remedy, when they
     want it, is one word each: `text-blue-300 dark:bg-blue-400/25`, or the token
     pair this repo already publishes — `--nova-info-ink` on `--nova-info-soft`. */
  "#51a2ff", // upload 98's NEW badge on #34456a in the night pack — 3.61

  /* Upload 99's two `text-neutral-500` runs, and both halves of both pairs are
     the author's: Tailwind's neutral-500 on the card's own hardcoded
     `bg-neutral-50` / `dark:bg-neutral-900`. Measured `#737373` on `#f5f5f5` at
     4.34 and on `#171717` at 3.78 — a caption and a timestamp, 10px and 11px.

     The card's TITLE is not carried here and was fixed instead, and the line
     between them is the one this file has drawn twice already: the title's ground
     was the author's but its ink was `--color-primary`, which is to say mine, so
     there was something of mine in the pair to correct. In these two there is
     nothing. The remedy for the owner is `text-neutral-600 dark:text-neutral-400`,
     which clears both. */
  "#737373", // upload 99's caption and timestamp — 4.34 light, 3.78 dark

  /* Upload 103's caption, and this one differs in kind from the four above it, so
     it is worth saying out loud rather than filing quietly: the others are
     decoration — a badge, a timestamp, a supporting line — while this text is the
     OPERATING INSTRUCTIONS. "click to fan out" is how a reader learns the card
     stack does anything at all. It is carried under the same rule, because both
     halves are the author's (Tailwind zinc-500 on the component's own zinc-950,
     with no theme involvement at all), but the owner should weigh this one
     knowing it is instructions and not trim.

     Measured `#71717b` on `#09090b` at 4.12, 12px, weight 400, against 4.5.

     Two further facts the owner needs. The pair is width-independent — fixed
     utilities, no media query — yet the gate only samples it in the 390px cases;
     at 1440px the element sitting over the caption's centre is an opaque card
     ("Mist"), while at 390px it is the transparent stage container. So this number
     would come and go with the layout if it were not named here.

     And it went unseen until this batch for a plainer reason: until the specimen's
     grid column was allowed to shrink, the upload's own scaling never ran, and the
     stack covered the caption at every width. The colours never changed; what
     changed is that the gate can now reach them.

     The remedy is one word: `text-zinc-400` clears it at 5.9. */
  "#71717b", // upload 103's caption — 4.12, and it is instructions, not decoration

  /* Upload 97's own sub-caption: `rgb(128, 128, 128)` on the card's own white,
     measured 3.94 at 11.2px. Both values are declared in the upload, in the same
     file, and mid-grey on white is the plainest case this allowance exists for.
     Named on the same terms: printed, ceilinged, and darkening it is the owner's
     call. Computed, not guessed: the minimal step is #767676 at 4.54 -- the
     first draft of this line said #6f6f6f "reaches 4.61" and it is 5.03, a
     deeper darkening than needed. */
  "#808080", // "Type your email to recover" on #ffffff — 3.94

  /* Upload 29/79's two hint lines: `color: #0006` -- rgba(0,0,0,0.4) -- declared
     in the upload, composited on the ground this showcase gives it to
     rgb(140,145,148) = #8c9194, measured 2.79 at 12px.

     The ground here is mine (#eaf1f7, chosen because the button's four corner
     points are #ffffff and vanish on white), so the question the folder card
     answered had to be asked again: is the failing half mine? Computed, no. An
     alpha of 0.4 over PURE WHITE -- the lightest ground that exists, and therefore
     the ceiling for this declaration -- composites to #999999 and measures 2.85.
     No ground reaches AA for this alpha, so there is no decoration of mine to
     delete; the value is the defect and the value is the author's.

     Named, printed, ceilinged, as above. The minimal remedy for the owner:
     #0006 -> #0009 measures 5.53 on this ground (the exact threshold is alpha
     0.55, 4.63; #0008 is 4.37 and still short). REFERENCE-CONTRAST.md lists it. */
  "#8c9194", // "Hover to reveal address" on #eaf1f7 — 2.79

  /* Upload 52's hint, and the first pair in this log that has no single ratio.
     `.hint-pop` is `color: #888` running `pulseHint`, which cycles `opacity`
     between 0.8 at its 0% and 100% frames and 1 at its 50% frame. On the ground
     this showcase gives it, that is a pair whose contrast MOVES:

       0% / 100% frame   opacity 0.8   composites #6e6e6f   3.92
       50% frame         opacity 1     composites #888888   5.64

     So it passed or failed depending on which frame axe happened to sample -- one
     node in one harness run out of two, and one probe pass out of five. The gate is
     now frozen on the 0% frame (see the CASES loop), which makes the verdict
     deterministic and picks the worse of the two ends.

     The ground is mine again, so the folder-card question was asked again and
     computed again: `#888` at 0.8 opacity over PURE BLACK -- the ground that
     maximises this pair, since opacity always drags the ink toward whatever is
     behind it -- reaches only 4.06. No ground clears AA, so there is nothing of
     mine to delete and the value is the author's.

     Named, printed, ceilinged. The minimal remedy for the owner: #888 -> #999
     measures 4.79 at the low end and 7.02 at the high one. */
  "#6e6e6f", // "Tap to spin" on #08080c — 3.92 at the 0% frame, 5.64 at the 50%

  /* The imported agent pipeline's own foregrounds. The owner ordered that file
     implemented as its own requirements state, and these alphas ARE the design:
     white at 18%, 20%, 30% and 42% on #090909, plus the blue at 55%. Measured on
     the page they are 1.62, 1.75, 2.58 and 4.02 — and the pipeline is a chrome
     surface where the reading that matters (the log line) is the highest of them.

     Carried as a NAMED allowance with a ceiling rather than a blanket pass, on the
     same terms as the greys above: the numbers are printed, any OTHER failing pair
     still fails, and growth past the ceiling still fails. The owner is told the
     figures; raising the alphas is a design change and therefore theirs to call.
     See design-system/IMPORTED.md. */
  "#353535", // white/[0.18] — 1.62
  "#3a3a3a", // white/20     — 1.75
  "#535353", // white/30     — 2.58
  "#707070", // white/[0.42] — 4.02, the log line
  "#043190", // #0052FF/55   — 1.75
]);
const REFERENCE_GREY_CEILING = 300; // across 7 packs x 2 widths; may fall, never rise
let referenceGreyNodes = 0;
const contrastFailures = [];

const browser = await chromium.launch();

async function open(width, height) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  /* The uploads carry the owner's background photograph from `ik.imagekit.io`, and
     that host is unreachable from this environment. Left alone it fails DIFFERENTLY
     from run to run — sometimes hanging silently, sometimes dying late with
     ERR_CONNECTION_RESET — and a late failure moves layout and scroll while the
     gate is measuring. That is how the same unchanged build produced
     RUNTIME_ERRORS=0 and then RUNTIME_ERRORS=3, and how the operable gate counted
     one control more in the runs where the reset landed.

     So the request is refused here, immediately and identically every run. This
     hides nothing: the host cannot be reached either way, and the image-loaded path
     does not exist in this environment to be tested. What it removes is the timing
     jitter. The refusal still logs a console error, so that one line is filtered
     and counted rather than dropped silently. */
  await page.route(/ik\.imagekit\.io/, (r) => r.abort());
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const text = m.text();
    if (/Failed to load resource/i.test(text) && /ERR_(FAILED|ABORTED|CONNECTION_RESET|TIMED_OUT)/.test(text)) {
      offlineAssetErrors.push(text.slice(0, 60));
      return;
    }
    runtimeErrors.push(text);
  });
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

  /* Freeze every animation on its 0% frame before anything is measured.

     Without this the axe pass samples whatever frame each animation happens to be
     on when it runs, and a component that ANIMATES a colour or an opacity then
     passes or fails at random. That is exactly what happened: the wheel selector's
     hint pulses `opacity` between 0.8 and 1 over 2s, so the same node measured 3.93
     at one end and 5.64 at the other, and one axe node appeared in one run out of
     two and one probe pass out of five. A gate whose verdict depends on animation
     phase is a gate whose green means nothing.

     `animation-delay: 0s` with `animation-play-state: paused` holds the 0% frame --
     the same frame every run, and the one the author declared as the starting
     state.

     `transition: none` is the other half of the same problem, and it was added
     after the first half proved insufficient. Freezing animations left the counter
     bouncing 191/192 and produced one contrast node in one pack that three probe
     passes could not reproduce -- because a transitioned colour is mid-flight for as
     long as its duration says, and the imported components carry transitions of 900
     to 1200ms against a 700ms settle. With transitions off, every element is AT its
     target value, which is the state worth measuring and the only one that is the
     same every run. Nothing in the section switching depends on a transition
     completing; the tabs change a class, not an animation. */
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-delay: 0s !important; " +
      "animation-play-state: paused !important; transition: none !important }",
  });

  /* ── The shell, which this gate had never looked at ─────────────────────────
     Every axe pass below scopes itself to `#madar`, so the showcase was audited
     and the APPLICATION around it was not: the hero, the filters, the gallery of
     72 component cards and 8 category headings. That is where the product lives.

     The hole was found by measuring one element the eye had already flagged: the
     item count in each category heading was painted `--nova-border-strong`, a
     BORDER token used as a text colour, and it measures 1.56 to 2.52 against its
     own ground in all seven theme values -- against a 3:1 threshold, since at
     24px it is large text. Eight nodes per view, in every pack, since the day it
     was written, and no gate could see them.

     `exclude` is load-bearing: `#madar` is inside `#main-content`, and without it
     this pass re-reports the 192 reference greys the section pass already carries
     as a named allowance.

     And the scope is `#main-content`, not `document`, because THAT WAS MEASURED
     TOO. `axe.run(document, …)` on this page tests 279 nodes and finds zero
     violations; `axe.run(main, …)` tests 778 and finds the eight. A wider context
     tested LESS -- so widening the existing pass to the whole document would have
     found nothing and read as proof there was nothing to find. */
  if (AXE && !c.reflowOnly) {
    await page.addScriptTag({ path: AXE });
    const shell = await page.evaluate(async () =>
      window.axe.run(
        { include: [["#main-content"]], exclude: [["#madar"]] },
        { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } },
      ),
    );
    for (const v of shell.violations) {
      shellViolations.push(
        `${c.theme} ${c.w}px shell ${v.id} x${v.nodes.length}` +
          (v.nodes[0]?.any?.[0]?.message ? ` — ${v.nodes[0].any[0].message.slice(0, 110)}` : ""),
      );
    }
  }

  await page.locator("#madar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  for (const section of PACK_SECTIONS) {
    await page.locator(`#${section}-tab`).click();
    await page.waitForTimeout(700);

    /* THE 700ms WAS A GUESS, AND IT LOST A RACE. Every section is a lazy chunk
       behind `Suspense`, so what is on screen after a fixed delay is whichever of
       the skeleton and the content happened to win. Two runs of this gate on the
       SAME build returned `AXE_VIOLATIONS_MADAR=2` and then `0`, and the reference
       grey count wandered 194, 197, 199, 201 across runs — the tell, because a
       count of nodes that drifts means the set of nodes axe SEES drifts.
       Caught in the act: one probe pass in six audited a
       `<div class="madar-skeleton">` and reported zero contrast nodes, because the
       section had not arrived yet.
    
       So the wait is now a CONDITION rather than a duration. A gate that sometimes
       measures the loading state is a gate whose green means nothing, and every
       number it printed today was quietly conditional on a race. */
    await page
      .locator(`#${section}-panel .madar-skeleton`)
      .waitFor({ state: "detached", timeout: 15000 })
      .catch(() => {
        skeletonStuck.push(`${c.theme} ${c.w}px ${section}`);
      });

    /* AND THEN WAIT FOR THE MOTION TO STOP, which the freeze above cannot do.
       The stylesheet freezes CSS animations and transitions; it has no reach into
       an animation JavaScript drives by writing inline styles every frame, and
       three of the last four uploads animate exactly that way.

       What it cost: axe measured a card mid-entrance and reported its title at
       `#e2e2d9` on `#e8e8e0` — 1.05:1 — a pair that appears nowhere in the
       component. Sampled six times over six seconds, the same title is a stable
       `rgb(26, 26, 24)` on `rgb(241, 241, 240)`, about 13:1. The violation was the
       measurement, not the code.

       Framer Motion writes to the `style` attribute, so the attribute values ARE
       the animation's state. Fingerprint them and wait for two identical samples:
       when the inline styles stop moving, the motion has landed. This also covers
       a late web font and a slow image, which shift layout the same way. */
    await settle(page, `#${section}-panel`).catch(() => {
      unsettled.push(`${c.theme} ${c.w}px ${section}`);
    });

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
  `AXE_VIOLATIONS_SHELL=${AXE ? shellViolations.length : "skipped-no-axe-core"}`,
  ...shellViolations.slice(0, 10).map((v) => `  shell: ${v}`),
  `REFERENCE_GREY_CONTRAST=${referenceGreyNodes} nodes below AA (ceiling ${REFERENCE_GREY_CEILING}, the reference's own greys — see design-system/REFERENCE-CONTRAST.md)`,
  ...axeViolations.map((v) => `  axe: ${v}`),
  `SKELETON_STUCK=${skeletonStuck.length ? skeletonStuck.join(" | ") : "none"}`,
  `STILL_MOVING=${unsettled.length ? unsettled.join(" | ") : "none"}`,
  `THEME_MENU=${menuFailures.length ? menuFailures.join(" | ") : "ok"}`,
  `RUNTIME_ERRORS=${runtimeErrors.length}`,
  /* Counted as DISTINCT messages, not as occurrences. The raw occurrence count is
     a tally of how many renders happened to reach a specimen carrying the image,
     which moves with lazy loading and pack sweeps — it read 50 then 45 on one
     unchanged build. The distinct set is what the line is actually for: proof that
     something was suppressed, and what. */
  `OFFLINE_ASSET_ERRORS=${
    offlineAssetErrors.length
      ? `${new Set(offlineAssetErrors).size} distinct, refused and filtered (ik.imagekit.io, named allowance)`
      : "none"
  }`,
  ...runtimeErrors.slice(0, 5).map((e) => `  error: ${e}`),
];
console.log(report.join("\n"));

const failed =
  contrastFailures.length || overflow.length || axeViolations.length || shellViolations.length || runtimeErrors.length || menuFailures.length || skeletonStuck.length
  || referenceGreyNodes > REFERENCE_GREY_CEILING
  || apcaThin.length > APCA_THIN_CEILING;
process.exit(failed ? 1 : 0);
