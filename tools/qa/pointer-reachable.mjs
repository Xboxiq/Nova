/**
 * A cursor that says "you can act here" must be telling the truth for a keyboard.
 *
 * The second most repeated defect across twenty-eight imported uploads was the
 * mouse-only control: a deck that could only be turned by dragging its top card,
 * a tooltip that only appeared on hover, a cord `<div>` with an `onClick` that no
 * Tab could land on. Every one painted `cursor: pointer` or `cursor: grab` and
 * then offered nothing to a keyboard. `tools/qa/operable.mjs` catches this — but
 * only for controls somebody remembered to register. This sweeps everything.
 *
 * A SECOND PROMISE, added after a census: `title`. A tooltip is information, and
 * a browser opens it for a mouse only. The census found 26 in madar's own
 * sections — tier names on dots beside the same name in text, allocation parts
 * beside a legend that repeats them, avatars beside the name they stand for,
 * and the tariff ladder's boundaries, which were written NOWHERE else. The
 * redundant ones were deleted or declared decoration; the ladder's boundaries
 * became visible text under the axis. A title inside `role="img"` is exempt,
 * because the picture has its own name and assistive tech flattens its children.
 *
 * THE RULE. Any element whose COMPUTED cursor is not passive — not auto, default,
 * text, not-allowed, wait and their kin; so pointer, grab, crosshair, the resize
 * arrows, zoom, help, every cursor that promises the hand can do something —
 * must be reachable: focusable itself, or containing or inside something
 * focusable, or a `<label>` tied to a control (wrapping it, `for=`, or the input
 * just before it), or a roving member (`tabindex="-1"`) inside a composite that
 * has one tabbable member. Or it must sit inside `aria-hidden`, which is how a
 * component declares "this is decoration, or a mouse-only duplicate of a control
 * that IS reachable" — the blind toggle's cord does exactly that, on purpose.
 *
 * SCOPE, in two halves, because this repository's law already has two halves.
 * The shell and madar's own sections are held to it: one offender fails. The
 * three imported sections host `src/components/ui`, `canvasui` and `aicanvas`,
 * which `hover-policy` exempts from this repo's own law by name, so they are
 * COUNTED under a ceiling rather than failed — the `REFERENCE_GREY_CONTRAST`
 * shape. The ceiling sits two above today's number so a new upload that adds a
 * mouse-only control trips it and the divergence gets written down or fixed,
 * instead of accumulating silently.
 *
 * Measured on the day this was written, root `#main-content` per section as
 * `madar-qa` measures: shell 0; eleven own sections 0 each; imported 6, 11, 91.
 * `madar-energy` joined OWN the day the prepaid runway was added there (gates/26):
 * its first draft was 13 of these offenders, and this gate is what caught it.
 * "Shell" is the body MINUS `#main-content` — the first draft swept the whole
 * body and reported one injected offender twice, once as shell and once as the
 * section the page opens on; the mutation test is what found that.
 * The first census over-counted by dozens because it treated `<label for>` and
 * roving radios as unreachable; both are reachable, through the input and the
 * arrow keys respectively, and the rule above is what the correction produced.
 *
 *   node tools/qa/pointer-reachable.mjs
 */
import { execSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const PORT = 4589;
const URL = `http://localhost:${PORT}/`;
/* every section in the registry that is not an import — so a new section is enforced the day it is added */
const REGISTRY = readFileSync("src/madar/sections.ts", "utf8"); /* run from the repo root, like every gate here */
const IMPORTED = ["madar-imported", "madar-imported-2", "madar-imported-3"];
const OWN = [...REGISTRY.matchAll(/id: "(madar-[a-z0-9-]+)"/g)].map((m) => m[1]).filter((id) => !IMPORTED.includes(id));
/* two above the number of pointer-subtree ROOTS measured in the imports (3) */
const IMPORTED_CEILING = 5;
/* Own sections with NAMED debt: drag-only reorder (a kanban and a sortable list) and a
   pointer-following playground, whose keyboard forms are a roving reorder and nothing.
   Counted at today's number; one more fails. Everything else own fails at one. */
const DEBT = { "madar-data-collections": 4, "madar-kinetics-bank": 5, "madar-kinetics-99": 1 };

let chromium;
try { chromium = createRequire(import.meta.url)("playwright").chromium; }
catch { chromium = createRequire(`${execSync("npm root -g", { encoding: "utf8" }).trim()}/`)("playwright").chromium; }

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());
for (let i = 0; i < 60; i += 1) { try { if ((await fetch(URL)).ok) break; } catch { /* starting */ } await new Promise((r) => setTimeout(r, 500)); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
/* the owner's background photograph is unreachable from here and fails at a
   different moment each run; refusing it keeps layout identical every time */
await page.route(/ik\.imagekit\.io/, (r) => r.abort());

const sweep = (rootSel) => page.evaluate((sel) => {
  const root = sel ? document.querySelector(sel) : document.body;
  if (!root) return null;
  const PASSIVE = new Set(["auto", "default", "text", "vertical-text", "not-allowed", "no-drop", "wait", "progress", "none", "inherit", "initial", "unset"]);
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,summary,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
  const COMPOSITE = '[role="radiogroup"],[role="tablist"],[role="listbox"],[role="grid"],[role="menu"],[role="menubar"],[role="tree"],[role="toolbar"]';
  const reachable = (el) => {
    if (el.matches(FOCUSABLE) || el.closest(FOCUSABLE) || el.querySelector(FOCUSABLE)) return true;
    const lab = el.closest("label");
    if (lab) {
      if (lab.querySelector("input,select,textarea,button")) return true;
      const f = lab.getAttribute("for"); if (f && document.getElementById(f)) return true;
      const prev = lab.previousElementSibling; if (prev && prev.matches("input,select,textarea")) return true;
    }
    const comp = el.closest(COMPOSITE);
    if (comp && (el.getAttribute("tabindex") === "-1" || el.closest('[tabindex="-1"]')) &&
        comp.querySelector('[tabindex]:not([tabindex="-1"])')) return true;
    return false;
  };
  const offenders = []; let declared = 0;
  for (const el of root.querySelectorAll("*")) {
    if (!sel && el.closest("#main-content")) continue; /* the shell is the page minus the section it happens to show */
    /* two promises: a cursor that is not passive says the hand can act here; a `title`
       says there is more to know here — and a tooltip opens for a mouse only. A title
       inside a `role="img"` is exempt: the picture has its own name, and its children
       are flattened away for assistive tech, so that title was never anyone's only path. */
    const cursor = getComputedStyle(el).cursor;
    /* a cursor inherits, so a card's twelve children all report it; only the ROOT of a
       pointer subtree is an affordance — the parent's cursor being passive marks it */
    const parentCursor = el.parentElement ? getComputedStyle(el.parentElement).cursor : "auto";
    const promisesCursor = !PASSIVE.has(cursor) && (PASSIVE.has(parentCursor) || cursor !== parentCursor);
    const title = (el.getAttribute("title") || "").trim();
    const promise = promisesCursor ? `cursor=${cursor}` : title && !el.closest('[role="img"]') ? `title="${title.slice(0, 32)}"` : null;
    if (!promise) continue;
    if (el.closest("[aria-hidden='true'],[aria-hidden='']")) { declared += 1; continue; }
    if (reachable(el)) continue;
    const cls = (typeof el.className === "string" ? el.className : el.getAttribute("class") || "").split(" ").filter(Boolean).slice(0, 2).join(".");
    const b = el.getBoundingClientRect();
    offenders.push(`${el.tagName.toLowerCase()}${cls ? "." + cls : ""} ${Math.round(b.width)}x${Math.round(b.height)} ${promise}`);
  }
  return { offenders, declared };
}, rootSel);

const failures = [];
let declaredTotal = 0, importedTotal = 0, debtTotal = 0;

await page.goto(URL, { waitUntil: "networkidle" }); await page.waitForTimeout(900);
const shell = await sweep(null);
declaredTotal += shell.declared;
for (const o of shell.offenders) failures.push(`shell: ${o}`);
console.log(`shell                    unreachable=${shell.offenders.length} declared-decoration=${shell.declared}`);

for (const id of [...OWN, ...IMPORTED]) {
  await page.goto(`${URL}#${id}`, { waitUntil: "networkidle" }); await page.waitForTimeout(900);
  const r = await sweep("#main-content");
  if (!r) { failures.push(`${id}: #main-content not found`); continue; }
  declaredTotal += r.declared;
  const own = OWN.includes(id);
  console.log(`${id.padEnd(24)} unreachable=${r.offenders.length} declared-decoration=${r.declared}${own ? (id in DEBT ? `  (named debt, ceiling ${DEBT[id]})` : "") : "  (imported, counted)"}`);
  if (own && id in DEBT) {
    debtTotal += r.offenders.length;
    for (const o of r.offenders.slice(0, 6)) console.log(`    ${o}`);
    if (r.offenders.length > DEBT[id]) failures.push(`${id}: ${r.offenders.length} mouse-only affordances, over its named debt of ${DEBT[id]} — a new one was added; make it reachable or raise the debt with a reason`);
  } else if (own) for (const o of r.offenders) failures.push(`${id}: ${o}`);
  else { importedTotal += r.offenders.length; for (const o of r.offenders.slice(0, 4)) console.log(`    ${o}`); }
}
await browser.close();

for (const f of failures) console.log(`  UNREACHABLE ${f}`);
console.log(`DECLARED_DECORATION=${declaredTotal} (aria-hidden pointer elements: decoration or a mouse duplicate of a reachable control)`);
console.log(`OWN_DEBT=${debtTotal} (named per section in DEBT: drag-only reorder ×9, a pointer playground ×1 — keyboard forms deferred, not exempted)`);
console.log(`IMPORTED_POINTER_UNREACHABLE=${importedTotal} (ceiling ${IMPORTED_CEILING}, the imported corpus's own mouse-only controls — exempt from this repo's law as hover-policy exempts src/components/ui)`);
if (importedTotal > IMPORTED_CEILING) failures.push(`imported sections: ${importedTotal} mouse-only pointer elements, over the ceiling of ${IMPORTED_CEILING} — a new upload added one; write its divergence or fix it`);
console.log(`POINTER_REACHABLE=${failures.length ? "FAIL" : "ok"} (${failures.length})`);
process.exit(failures.length ? 1 : 0);
