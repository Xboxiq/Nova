/**
 * A component that takes the focus indicator away must put one back.
 *
 * Twenty-eight uploads into this batch, `outline: none` had silenced the focus
 * ring twice in a way nothing caught: `taga-toggle` on its track and
 * `glass-sidebar` on all eight of its controls. Both were INLINE — an object in
 * `style={{ … }}` — and that placement is the whole reason they went unseen.
 *
 * This project rings focus from `src/styles.css:87`:
 *
 *   button:focus-visible, a:focus-visible, input:focus-visible,
 *   textarea:focus-visible, select:focus-visible, [tabindex]:focus-visible {
 *     outline: 3px solid …; outline-offset: 3px;
 *   }
 *
 * That block is UNLAYERED author CSS. Unlayered author rules outrank anything in
 * a cascade layer, which is why the same file's `button { font: inherit }` beats
 * every Tailwind font utility — four components in this batch showed that. But an
 * inline style outranks unlayered author CSS in turn. So `style={{ outline:
 * 'none' }}` is the one placement in this repo's cascade from which a component
 * can switch the system's focus ring off with nothing able to answer it. There is
 * no replacement possible at that level: a component cannot write
 * `:focus-visible` inline.
 *
 * So the two rules differ by placement, because the cascade does:
 *
 *   A. INLINE `outline: 'none'` is refused outright. Nothing can replace it.
 *   B. `outline: none` inside a stylesheet string is allowed only if the same
 *      file keys something on `:focus` or `:focus-visible`. That is where the
 *      legitimate cases live: `char-swap-join-button` declares `outline: none`
 *      and makes focus visible as a whole state machine instead — the label
 *      swaps, the underline draws 480 units, the arrow crosses 128px. Refusing
 *      that would be refusing a better focus indicator than an outline.
 *
 * Comments are stripped before either rule runs, so a file cannot satisfy this
 * gate by describing the defect in prose — which matters here, because the two
 * inline cases now survive only as sentences in their own divergence notes.
 *
 *   node tools/qa/focus-ring-intact.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/components";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

/* Block and line comments go first: this gate's own subject matter is written
   in prose in several of the files it scans. */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");

const files = walk(ROOT);
const inlineOffenders = [];
const unreplaced = [];
let stylesheetCases = 0;

/* `outline: 'none'` or `outline: "none"` — a quoted value only ever appears
   inside a JS object, never in CSS text. */
const INLINE = /\boutline\s*:\s*(['"])none\1/g;
/* an unquoted `outline: none` belongs to CSS inside a template string */
const IN_CSS = /\boutline\s*:\s*none\s*(?:;|\n|$)/;

for (const file of files) {
  const src = stripComments(readFileSync(file, "utf8"));

  for (const m of src.matchAll(INLINE)) {
    const line = src.slice(0, m.index).split("\n").length;
    inlineOffenders.push(`${file}:${line}  style={{ outline: 'none' }} — outranks the unlayered ring in styles.css and nothing can answer it`);
  }

  if (IN_CSS.test(src)) {
    stylesheetCases++;
    if (!/:focus(-visible)?\b/.test(src))
      unreplaced.push(`${file}  declares outline: none and keys nothing on :focus`);
  }
}

const failures = [...inlineOffenders, ...unreplaced];
console.log(`FOCUS_FILES_SCANNED=${files.length}`);
console.log(`STYLESHEET_OUTLINE_NONE=${stylesheetCases} (allowed: each keys focus itself)`);
for (const f of failures) console.log(`  RING ${f}`);
console.log(`FOCUS_RING_INTACT=${failures.length ? "FAIL" : "ok"} (${failures.length})`);
process.exit(failures.length ? 1 : 0);
