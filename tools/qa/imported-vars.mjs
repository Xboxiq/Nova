/**
 * A custom property the imported code reads, and this repo has already taken.
 *
 * The Continue Application button paints `var(--bg, var(--background))` and sets
 * `--bg` only inside its own `:hover` rule — the fallback is meant to supply the
 * resting colour. But `src/madar/bridge.css` declares `--bg: var(--nova-canvas)`,
 * custom properties inherit, and a var() fallback is used ONLY when the name is
 * guaranteed-invalid. So `--bg` arrived already defined and the button painted
 * the page's own canvas: an invisible button whose white label measured 1.08:1.
 *
 * Nothing else in the harness could see it. It has a name, a real box, it takes
 * focus and fires, it is not clipped, and the page does not overflow. Only axe
 * caught it, and only in the packs whose canvas happens to be light — a defect
 * that hides itself in exactly the theme you develop in is worth its own gate.
 *
 * The rule: inside `src/components/ui`, a `var(--x)` whose FALLBACK is being
 * relied on must not name a property this repository declares globally. Reading a
 * repo property deliberately is fine — that is what the bridge is for — and so is
 * reading one the file declares itself. What fails is the silent capture: the
 * upload expects the name to be free, and it is not.
 *
 *   node tools/qa/imported-vars.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* `ui/` is the imported reference code; `nova/` is written here. Both read the
   host's names, so both can capture one. */
const SCANNED = ["src/components/ui", "src/components/nova"];
/* Where this project declares its own custom properties. A name declared in any
   of these inherits into every imported component. */
const HOST = [
  "src/madar/bridge.css",
  "src/styles.css",
  "src/primitives.css",
  "design-system/nova-design-os/tokens/tokens.css",
];

const read = (p) => { try { return readFileSync(p, "utf8"); } catch { return ""; } };

/* Only properties declared on a document-level or surface-level selector can
   inherit far enough to reach an imported component. A property declared inside
   another component's own class cannot. `:root`, `html`, `*` and the surface
   wrapper are the ones that travel. */
const hostGlobals = new Set();
for (const file of HOST) {
  /* Comments out first, then split on `}` and read the selector as the text
     before the last `{` in each chunk. The first version anchored on `(^|})`,
     which silently skipped the FIRST rule of every file — and `:root` is the
     first rule of bridge.css, which is where `--bg` lives. The mutation test
     found that: the gate stayed green with the real fix removed. */
  const css = read(file).replace(/\/\*[\s\S]*?\*\//g, "");
  for (const chunk of css.split("}")) {
    const brace = chunk.lastIndexOf("{");
    if (brace === -1) continue;
    const selector = chunk.slice(0, brace).split(/[{;]/).pop().trim();
    if (!/(^|,)\s*(:root|html|\*|\.madar-surface|body)\b/.test(selector)) continue;
    for (const decl of chunk.slice(brace + 1).matchAll(/(--[a-z0-9-]+)\s*:/gi)) hostGlobals.add(decl[1]);
  }
}

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(name)) files.push(p);
  }
};
for (const dir of SCANNED) walk(dir);

const failures = [];
for (const file of files) {
  /* Comments stripped, and this one is embarrassing enough to write down: the
     note explaining the fix contains the literal text `--bg: initial`, so the
     gate read its own documentation and passed. Prose is not a declaration. */
  const src = read(file).replace(/\/\*[\s\S]*?\*\//g, "");
  /* The question has to be asked per DECLARATION BLOCK, not per file. The first
     version of this gate collected every `--x:` in the file and passed anything
     it found — which meant a component declaring `--bg` inside its own `:hover`
     rule satisfied it, and that does nothing for the resting state. The mutation
     test caught that: removing the real fix left the gate green.

     A var() fallback is reached only when the name is guaranteed-invalid ON THAT
     ELEMENT. So the block that performs the read is the only place a declaration
     can help. `--x: initial` is the documented hand-back; `--x: <value>` in the
     same block also settles it, since then the component owns the name and the
     fallback is simply unused. */
  for (const use of src.matchAll(/var\(\s*(--[a-z0-9-]+)\s*,/g)) {
    const name = use[1];
    if (!hostGlobals.has(name)) continue;
    /* The enclosing block: from the last unmatched `{` before the read to the
       first `}` after it. */
    const before = src.slice(0, use.index);
    const open = before.lastIndexOf("{");
    if (open === -1) continue;
    const close = src.indexOf("}", use.index);
    const block = src.slice(open + 1, close === -1 ? src.length : close);
    if (new RegExp(`${name}\\s*:`).test(block)) continue;
    const line = before.split("\n").length;
    failures.push(`${file}:${line}  var(${name}, …) — ${name} is declared globally by this repo and NOT reset in this block, so the fallback is never reached`);
  }
}

console.log(`HOST_GLOBAL_PROPERTIES=${hostGlobals.size}`);
console.log(`COMPONENT_FILES_SCANNED=${files.length}`);
for (const f of failures) console.log(`  FAIL ${f}`);
console.log(`IMPORTED_VARS=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
