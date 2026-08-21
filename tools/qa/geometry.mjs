/**
 * The angles, the radii, the gradients and the neutrals — measured.
 *
 * The owner asked for a full review of exactly these: how the colours and shapes
 * are distributed, the angles, the shadows, the gradients and their measurement,
 * and how the shapes are built. Measured rather than eyeballed, the family had:
 *
 *   · 13 distinct linear-gradient angles — 150, 158, 160, 166, 168, 178, 180 —
 *     in a system whose law is one light from above. Seven ways of writing one
 *     sheen.
 *   · 4 angles for the hatch: 135 (the library's own semantic mark), plus 120 and
 *     115 invented in the new files. §15-b gives the hatch one meaning, and one
 *     meaning cannot have four drawings.
 *   · 11 pill shapes drawn with 7 different radii (26, 31, 20, 23, 36, 17, 13,
 *     11). A pill is a pill; those were seven spellings of one shape.
 *   · ~20 raw pixel radii for rectangles doing five jobs.
 *   · 74 pairs of near-identical colours, worst of all eleven off-whites in one
 *     file, most used once.
 *
 * What is *not* a defect, and is therefore not counted: two close stops of one
 * gradient (the olive slide runs #101312 → #121512 on purpose), a semantic tint
 * that happens to sit near a neutral (a selected row), and the motion-streak
 * angle, which is a different mark from the hatch and is declared separately.
 *
 *   node tools/qa/geometry.mjs
 */
import { readFileSync } from "node:fs";

const TSX = ["mesh", "credit", "boards", "glasswork", "projectwork"].map((f) => `src/madar/components/${f}.tsx`);
const CSS = "src/madar/bridge.css";

/* Comments are not drawings. The first version of this audit counted a hex that
   appeared only inside a sentence explaining a bug, which is how a measurement
   starts lying. */
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const code = Object.fromEntries(TSX.map((f) => [f, strip(readFileSync(f, "utf8"))]));
const all = Object.values(code).join("\n");
const css = readFileSync(CSS, "utf8");

const failures = [];
const line = [];

/* ── 1. angles are named, not typed ─────────────────────────────────────────── */
const rawAngles = [...all.matchAll(/linear-gradient\(\s*(-?[\d.]+deg)/g)].map((m) => m[1]);
const distinct = [...new Set(rawAngles)];
line.push(`RAW_GRADIENT_ANGLES=${distinct.length} (${distinct.join(" ") || "none"})`);
/* 0deg and 90deg are the split divider flipping its lit end onto the side under
   inspection — a reading, not a style. Anything else typed inline is a fourth
   dialect waiting to happen. */
const allowed = new Set(["0deg", "90deg"]);
const stray = distinct.filter((a) => !allowed.has(a));
if (stray.length) failures.push(`inline gradient angles that should be named tokens: ${stray.join(", ")}`);

for (const t of ["--sheen", "--wash", "--hatch-angle", "--drag"]) {
  if (!new RegExp(`${t}:\\s*[\\d.]+deg`).test(css)) failures.push(`${t} is not declared in bridge.css`);
}

/* ── 2. the hatch has exactly one angle, everywhere ─────────────────────────── */
const declared = css.match(/--hatch-angle:\s*([\d.]+)deg/);
const hatchDeg = declared ? declared[1] : null;
const hatchAngles = new Set();
for (const m of css.matchAll(/repeating-linear-gradient\(\s*\n?\s*([\d.]+)deg/g)) hatchAngles.add(m[1]);
for (const m of all.matchAll(/repeating-linear-gradient\(\s*([\d.]+)deg/g)) hatchAngles.add(m[1]);
/* the SVG pattern cannot take a CSS variable, so it carries the number and has
   to be checked against the token rather than trusted */
for (const m of all.matchAll(/patternTransform="rotate\((-?[\d.]+)\)"/g)) hatchAngles.add(m[1]);
line.push(`HATCH_ANGLES=${[...hatchAngles].join(" ") || "none"} (token ${hatchDeg}deg)`);
const wrong = [...hatchAngles].filter((a) => a !== hatchDeg);
if (wrong.length) failures.push(`the hatch is drawn at ${wrong.join(", ")} as well as ${hatchDeg} — one meaning, one angle`);

/* ── 3. no raw pixel radii: every shape comes off the ladder ────────────────── */
const rawRadii = [...all.matchAll(/borderRadius: (\d[\d.]*)/g)].map((m) => m[1]);
line.push(`RAW_RADII=${rawRadii.length} (${[...new Set(rawRadii)].join(" ") || "none"})`);
if (rawRadii.length) failures.push(`${rawRadii.length} radii typed as numbers instead of ladder tokens: ${[...new Set(rawRadii)].join(", ")}`);

const ladder = ["--r-xs", "--r-lg", "--r-tile", "--r-panel", "--r-block", "--r-sheet", "--r-widget", "--r-screen", "--r-pill"];
const missing = ladder.filter((t) => !new RegExp(`${t}:`).test(css));
if (missing.length) failures.push(`ladder steps not declared: ${missing.join(", ")}`);
line.push(`LADDER=${ladder.length - missing.length}/${ladder.length} steps declared`);

/* ── 4. shadows come from the depth tokens ──────────────────────────────────── */
const rawShadow = [];
for (const [f, s] of Object.entries(code)) {
  for (const m of s.matchAll(/boxShadow: [`']([^`']+)[`']/g)) {
    for (const seg of m[1].split(/,(?![^(]*\))/)) {
      const t = seg.trim();
      if (!t || t.startsWith("inset") || t.includes("--depth") || t.includes("--bevel")) continue;
      /* a zero-blur ring and a plain hairline are drawn edges, not depth */
      if (/^0 0 0 [\d.]+px/.test(t)) continue;
      rawShadow.push(`${f}: ${t}`);
    }
  }
}
line.push(`RAW_SHADOWS=${rawShadow.length}`);
if (rawShadow.length) failures.push(`shadows bypassing the depth tokens: ${rawShadow.slice(0, 4).join(" | ")}`);

/* ── 5. accidental colour twins ─────────────────────────────────────────────── */
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
const norm = (h) => (h.length === 3 ? h.split("").map((c) => c + c).join("") : h);

/* Two stops of one gradient are allowed to be close: that is what a gradient is.
   So colours inside a single gradient() call are paired off before comparing. */
const gradientPairs = new Set();
for (const m of all.matchAll(/(?:linear|radial)-gradient\(([^;]*?)\)(?=[,;'"`\s])/g)) {
  const hexes = [...m[1].matchAll(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)].map((x) => norm(x[1].toLowerCase()));
  for (let i = 0; i < hexes.length; i += 1) for (let j = i + 1; j < hexes.length; j += 1) {
    gradientPairs.add([hexes[i], hexes[j]].sort().join("~"));
  }
}

const use = new Map();
for (const m of all.matchAll(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)) {
  const h = norm(m[1].toLowerCase());
  use.set(h, (use.get(h) || 0) + 1);
}
const keys = [...use.keys()];
const twins = [];
for (let i = 0; i < keys.length; i += 1) {
  for (let j = i + 1; j < keys.length; j += 1) {
    const key = [keys[i], keys[j]].sort().join("~");
    if (gradientPairs.has(key)) continue;
    const a = rgb(keys[i]); const b = rgb(keys[j]);
    const d = Math.sqrt(a.reduce((t, v, k) => t + (v - b[k]) ** 2, 0));
    if (d > 0 && d <= 4) twins.push(`#${keys[i]}~#${keys[j]} d=${d.toFixed(1)}`);
  }
}
const TWIN_CEILING = 10; // measured after the review, with slack removed; may fall, never rise
line.push(`COLOUR_TWINS=${twins.length} within RGB distance 4 (ceiling ${TWIN_CEILING})`);
if (twins.length > TWIN_CEILING) failures.push(`colour twins rose to ${twins.length}: ${twins.slice(0, 6).join(", ")}`);
line.push(`DISTINCT_COLOURS=${keys.length}`);

for (const f of failures) console.log(`  FAIL ${f}`);
if (twins.length) console.log(`  twins: ${twins.join(", ")}`);
for (const l of line) console.log(l);
console.log(`GEOMETRY=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
