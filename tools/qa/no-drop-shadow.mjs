/**
 * anti-slop-ui #7 and #9, made measurable.
 *
 * The owner ruled these two over VISUAL-LAW §1 and §3. The line drawn here is
 * blur, not the property: a *blurred* outer box-shadow is the floaty depth the
 * standard bans, while a zero-blur one is a drawn edge (the plane under a
 * keycap), `0 0 0 Npx` is a ring — the affordance the standard recommends — and
 * an inset is not a drop shadow at all. Those three survive by design.
 *
 * Radii are capped at 6px. A `50%` circle is not a pill and is left alone.
 *
 *   node tools/qa/no-drop-shadow.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d, out = []) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(n)) out.push(p);
  }
  return out;
};

/** Split on commas at paren depth zero — color-mix() is full of inner commas. */
function segments(value) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of value) {
    if (ch === "(") depth += 1;
    else if (ch === ")") depth -= 1;
    if (ch === "," && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}

/** Whitespace-split at depth zero, so `0 0 0 3px` yields four real tokens. */
function words(seg) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of seg) {
    if (ch === "(") depth += 1;
    else if (ch === ")") depth -= 1;
    if (/\s/.test(ch) && depth === 0) { if (cur) out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

const isLength = (w) => /^-?\d+(\.\d+)?(px|em|rem)$/.test(w) || w === "0";
const isZero = (w) => /^-?0(px|em|rem)?$/.test(w);

function blurred(seg) {
  if (seg.startsWith("inset")) return false;
  const lengths = words(seg).filter(isLength);
  if (lengths.length < 3) return false;   // no blur component at all
  return !isZero(lengths[2]);
}

const shadows = [];
const radii = [];
const computed = [];

for (const path of walk("src")) {
  /* Template interpolations become a plain non-zero length, so a computed offset
     still reads as a length and the braces stop truncating the declaration. */
  const src = readFileSync(path, "utf8").replace(/\$\{[^{}]*\}/g, "9");

  for (const m of src.matchAll(/box-?[Ss]hadow:\s*([^;{}\n]+)/g)) {
    const raw = m[1];
    /* A declaration can be a ternary, so each quoted literal inside it is its own
       candidate value. Checking the whole expression would read `active ?` as
       part of the shadow and mistake a ring for a blur. */
    const quoted = [...raw.matchAll(/'([^']*)'|`([^`]*)`/g)].map((q) => q[1] ?? q[2]);
    const values = quoted.length ? quoted : [raw];
    for (const value of values) {
      if (/var\(--(nova-)?shadow-/.test(value)) continue;   // the tokens are none
      for (const seg of segments(value)) {
        if (blurred(seg)) shadows.push(`${path}  ${seg.slice(0, 64)}`);
      }
    }
  }

  for (const m of readFileSync(path, "utf8").matchAll(/border-?[Rr]adius:\s*(?:'([^']*)'|`([^`]*)`|([^;,{}\n]+))/g)) {
    const value = (m[1] ?? m[2] ?? m[3] ?? "").trim();
    if (/var\(--/.test(value)) continue;
    /* A proportional radius belongs to a drawn shape — a bucket's rounded top —
       not to a container's corner, so it is reported for a look, never capped. */
    if (/\$\{/.test(value)) { computed.push(`${path}  ${value.slice(0, 50)}`); continue; }
    for (const w of words(value.replace(/'/g, ""))) {
      const n = Number(String(w).replace(/px$/, ""));
      if (/^\d+(\.\d+)?(px)?$/.test(w) && n > 6) radii.push(`${path}  ${value.slice(0, 44)}`);
    }
  }
}

const uniq = (a) => [...new Set(a)];
console.log(`BLURRED_DROP_SHADOWS=${uniq(shadows).length}`);
uniq(shadows).slice(0, 12).forEach((x) => console.log("  " + x));
console.log(`RADII_OVER_6PX=${uniq(radii).length}`);
uniq(radii).slice(0, 12).forEach((x) => console.log("  " + x));
console.log(`RADII_BY_SHAPE=${uniq(computed).length}`);
uniq(computed).forEach((x) => console.log("  " + x));
process.exit(shadows.length || radii.length ? 1 : 0);
