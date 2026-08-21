/**
 * Six design directions, or six labels on one design?
 *
 * `data-direction` is the third document axis after `data-theme` (seven colour
 * packs) and `data-glass` (three glass levels). It claims to re-render the whole
 * library in six registers by remapping twelve tokens. That claim is trivially
 * faked: add six selectors, change one number in each, ship a picker.
 *
 * So this measures the resolved values in a real browser and asserts:
 *
 *   1. Every direction differs from the default in at least MIN_DELTA tokens.
 *      A register that changes three numbers is a variant, not a direction.
 *   2. No two directions resolve identically. Two names for one thing is the
 *      colour-twin defect (§27) at the register level.
 *   3. The default — no attribute at all — is untouched. A direction is opt-in,
 *      and the system as designed has to survive none of this being loaded.
 *   4. Hit areas do not shrink with the type. `data-dense` shrinks the body to
 *      0.84rem, and WCAG 2.5.8's 24px floor is not a stylistic choice; the
 *      operability harness owns the general case, this owns the dense register.
 *
 *   node tools/qa/directions.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4520;
const URL = `http://localhost:${PORT}/`;
const DIRECTIONS = ["civic", "editorial", "data-dense", "futuristic", "premium", "experimental"];
const MIN_DELTA = 8;

/* The twelve a direction is allowed to move, and nothing else. A direction that
   reached for a colour token would be a theme pack wearing the wrong name. */
const TOKENS = [
  "--nova-radius-control", "--nova-radius-field", "--nova-radius-card",
  "--nova-radius-feature", "--nova-radius-pill",
  "--nova-text-body-md", "--nova-text-body-sm", "--nova-text-body-lg",
  "--nova-text-label-md", "--nova-text-label-sm",
  "--nova-text-display-xl", "--nova-text-headline-lg", "--nova-text-title-lg",
  "--nova-motion-instant", "--nova-motion-fast", "--nova-motion-base",
  "--nova-motion-slow", "--nova-motion-scene", "--nova-ease-standard",
];

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
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

const read = (dir) =>
  page.evaluate(([d, toks]) => {
    const root = document.documentElement;
    if (d) root.setAttribute("data-direction", d); else root.removeAttribute("data-direction");
    const cs = getComputedStyle(root);
    const out = {};
    for (const t of toks) out[t] = cs.getPropertyValue(t).trim();
    /* the smallest interactive box on the page, in this register */
    let min = Infinity;
    for (const el of document.querySelectorAll("button, a[href], input, [role='radio'], [role='switch']")) {
      const b = el.getBoundingClientRect();
      if (b.width < 1 || b.height < 1) continue;
      if (el.closest("p, li, bdi")) continue;
      min = Math.min(min, Math.min(b.width, b.height));
    }
    return { tokens: out, minHit: Math.round(min) };
  }, [dir, TOKENS]);

const base = await read(null);
const seen = new Map();

for (const d of DIRECTIONS) {
  const got = await read(d);
  const changed = TOKENS.filter((t) => got.tokens[t] !== base.tokens[t]);
  if (changed.length < MIN_DELTA) {
    failures.push(`${d} moves only ${changed.length} of ${TOKENS.length} tokens (needs ${MIN_DELTA}) — a variant, not a direction`);
  }
  const fingerprint = TOKENS.map((t) => got.tokens[t]).join("|");
  if (seen.has(fingerprint)) failures.push(`${d} resolves identically to ${seen.get(fingerprint)} — two names, one design`);
  seen.set(fingerprint, d);

  if (got.minHit < 24) failures.push(`${d}: smallest interactive box is ${got.minHit}px, under the WCAG 2.5.8 floor of 24`);
  console.log(`${d.padEnd(14)} moves ${String(changed.length).padStart(2)}/${TOKENS.length} tokens · card radius ${got.tokens["--nova-radius-card"]} · body ${got.tokens["--nova-text-body-md"]} · base motion ${got.tokens["--nova-motion-base"]} · min hit ${got.minHit}px`);
}

/* ── the two compared specimens must not overlap ────────────────────────────
   They overlapped by 30px on first build: a grid item defaults to
   `min-width: auto`, which is min-content, so the chip + field + button row
   pushed the card 44px past its track. A comment saying so is not a check —
   this measures the rendered boxes. */
await page.goto(`${URL}#madar-directions`, { waitUntil: "networkidle" });
await page.waitForTimeout(1100);
const overlap = await page.evaluate(() => {
  const regs = [...document.querySelectorAll("[data-register]")]
    .map((el) => el.querySelector("article")?.getBoundingClientRect())
    .filter(Boolean);
  if (regs.length < 2) return null;
  const [a, b] = regs;
  return Math.max(0, Math.round(Math.min(a.right, b.right) - Math.max(a.left, b.left)));
});
if (overlap === null) failures.push("the two compared specimens were not found on the page");
else if (overlap > 0) failures.push(`the compared specimens overlap by ${overlap}px`);
console.log(`SPECIMEN_OVERLAP=${overlap ?? "missing"}px`);

/* the default has to survive with the attribute removed again */
const after = await read(null);
for (const t of TOKENS) {
  if (after.tokens[t] !== base.tokens[t]) failures.push(`the default changed after switching: ${t} ${base.tokens[t]} -> ${after.tokens[t]}`);
}
console.log(`default        card radius ${base.tokens["--nova-radius-card"]} · body ${base.tokens["--nova-text-body-md"]} · base motion ${base.tokens["--nova-motion-base"]} · min hit ${base.minHit}px`);

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
console.log(`DIRECTIONS=${DIRECTIONS.length} distinct=${seen.size}`);
console.log(`DIRECTIONS_CHECK=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
