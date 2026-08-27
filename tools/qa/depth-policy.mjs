/**
 * Depth, after the repeal.
 *
 * This file used to be `no-drop-shadow.mjs`, and it enforced `anti-slop-ui` 07
 * and 09 — no blurred outer shadows anywhere, radii capped at 6px — because the
 * owner had ruled those two over VISUAL-LAW §1 and §3.
 *
 * The owner has now reversed that ruling and ordered the reference designs into
 * the library **unchanged**: same colours, same angles, same gradients, same
 * shadows, nothing sacrificed. So the old check is not stale, it is *repealed* —
 * and deleting it outright would leave the library with no depth policy at all,
 * which is how a repeal turns into a free-for-all.
 *
 * What replaces it is the policy the repeal actually implies:
 *
 *   1. Depth is permitted, and it comes from a **named token**. A blurred outer
 *      shadow at a use site must reference `var(--depth-*)` or `var(--shadow-*)`.
 *      The token holds the reference's exact number, so nothing is lost visually
 *      and there is still one place to read it from.
 *   2. A radius over 6px comes from a **named token** too — `var(--r-*)` — or is
 *      a circle (`50%`), which is a shape and not a radius decision.
 *   3. The depth tokens themselves are counted and printed. If the set grows to
 *      thirty, that is visible rather than discovered.
 *   4. The old measurement is still printed for the record: how many literal
 *      blurred shadows and oversized radii exist. It is no longer a failure — it
 *      is the number the repeal produced.
 *
 * Inset shadows are still not drop shadows, and `0 0 0 Npx` is still a ring.
 * Neither was ever the thing being argued about.
 *
 *   node tools/qa/depth-policy.mjs
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

/* A length in a shadow list: `12px`, and also a bare `0`, which is the one CSS
   writes without a unit. Missing that is how the first version of this check
   reported zero literal shadows while the components were full of them — every
   `0 0 18px` looked like a one-length list. */
const px = (w) => {
  if (w === "0") return 0;
  const m = /^(-?[\d.]+)px$/.exec(w);
  return m ? Math.abs(Number(m[1])) : null;
};

/** A blurred outer shadow: not inset, and its third length is non-zero. */
function isBlurredOuter(seg) {
  if (/\binset\b/.test(seg)) return false;
  const lengths = words(seg).map(px).filter((v) => v !== null);
  if (lengths.length >= 3 && lengths[2] > 0) return true;
  /* A blur radius written as calc() parsed to null and dropped out of the count, so
     `box-shadow: 0 0 calc(...) <colour>` was invisible here -- found by writing one
     in src/styles.css and watching this gate pass it. A calc() in a non-inset shadow
     is treated as a blurred outer shadow: over-reporting a shadow that ought to be a
     token is the safe side of this particular error. */
  return /\bcalc\(/.test(seg);
}

const IMPORTED = /^src[\\/]components[\\/]ui[\\/]/;

const files = walk("src");
const literalShadows = [];
const literalRadii = [];
const untokenised = [];
const imported = [];

for (const path of files) {
  const src = readFileSync(path, "utf8");

  /* box-shadow / boxShadow declarations */
  for (const m of src.matchAll(/(?:box-shadow|boxShadow)\s*:\s*(?:['"`])?([^;'"`}]+)/g)) {
    const value = m[1];
    if (/var\(--(?:depth|shadow)-/.test(value)) continue; // named: policy satisfied
    for (const seg of segments(value)) {
      if (!isBlurredOuter(seg)) continue;
      const line = src.slice(0, m.index).split("\n").length;
      literalShadows.push(`${path}:${line}  ${seg.slice(0, 64)}`);
      /* Inside the token block in bridge.css a literal IS the definition, so it
         is expected there and nowhere else. */
      if (/bridge\.css$/.test(path)) continue;
      /* IMPORTED: `src/components/ui/` holds reference code the owner ordered
         implemented against ITS requirements, not this repo's. Its shadows are
         its author's design, and rewriting them as `var(--depth-*)` would be
         rewriting the design under cover of a lint rule. So the allowance is
         named and counted rather than the file being silently skipped — the
         literals still print, they just do not fail. Anything outside this
         directory has no such excuse. */
      if (IMPORTED.test(path)) { imported.push(`${path}:${line}  ${seg.slice(0, 64)}`); continue; }
      untokenised.push(`${path}:${line}  ${seg.slice(0, 64)}`);
    }
  }

  /* radii */
  for (const m of src.matchAll(/(?:border-radius|borderRadius)\s*:\s*(?:['"`])?([^;'"`}]+)/g)) {
    const value = m[1];
    if (/var\(--r-/.test(value)) continue;
    if (/%/.test(value)) continue; // a circle or an ellipse is a shape
    for (const w of words(value.replace("/", " "))) {
      const v = px(w);
      if (v !== null && v > 6) {
        const line = src.slice(0, m.index).split("\n").length;
        literalRadii.push(`${path}:${line}  ${value.trim().slice(0, 48)}`);
        break;
      }
    }
  }
}

/* the token set itself, counted so its growth is visible */
const bridge = readFileSync("src/madar/bridge.css", "utf8");
const depthTokens = [...bridge.matchAll(/^\s*--depth-[\w-]+\s*:/gm)].length;
const radiusTokens = [...bridge.matchAll(/^\s*--r-[\w-]+\s*:/gm)].length;

/* the repeal has to be written down, or a reader finds a gate that contradicts
   the code and cannot tell which one is current */
const law = readFileSync("design-system/VISUAL-LAW.md", "utf8");
const repealRecorded = /نقضًا صريحًا|نُقِضت|أُسقطت القاعدتان/.test(law);

const failures = [];
if (!repealRecorded) failures.push("the repeal of rules 07 and 09 is not recorded in VISUAL-LAW.md");
if (!depthTokens) failures.push("no --depth-* tokens exist, so depth has no named source");
for (const u of untokenised.slice(0, 12)) failures.push(`blurred shadow written literally instead of as a token — ${u}`);
if (untokenised.length > 12) failures.push(`…and ${untokenised.length - 12} more literal shadows`);

for (const f of failures) console.log(`  FAIL ${f}`);
console.log(`DEPTH_TOKENS=${depthTokens}`);
console.log(`RADIUS_TOKENS=${radiusTokens}`);
for (const i of imported) console.log(`  IMPORTED ${i}`);
console.log(`LITERAL_BLURRED_SHADOWS=${literalShadows.length} (was banned, now permitted; ${untokenised.length} outside the token block and outside imported code)`);
console.log(`IMPORTED_LITERAL_SHADOWS=${imported.length} in src/components/ui (named allowance, not a pass)`);
console.log(`LITERAL_RADII_OVER_6PX=${literalRadii.length}`);
console.log(`DEPTH_POLICY=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
