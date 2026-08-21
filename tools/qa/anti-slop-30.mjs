/**
 * The anti-slop-ui standard, made runnable.
 *
 * The skill lists thirty banned patterns. Some of them this repository's own
 * kill-ai-slop scanner already indexes, so those are delegated rather than
 * re-implemented — a second detector for the same pattern is a second number to
 * keep in sync. What is added here is the rules that scanner has no group for.
 *
 * Three rules are marked MANUAL on purpose: they are architectural judgements a
 * regex cannot make (is this layout a bento collage or a data table?), and the
 * ruling for each is written in design-system/ANTI-SLOP-30.md. They print as
 * MANUAL, never as PASS, so the count is not flattered.
 *
 *   node tools/qa/anti-slop-30.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SHELL_CSS = [
  "src/styles.css", "src/primitives.css", "src/madar-library.css",
  "src/demos.css", "src/advanced-lab.css", "src/pattern-studio.css",
];
const TOKENS = "design-system/nova-design-os/tokens/tokens.css";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(tsx?|css)$/.test(name)) out.push(path);
  }
  return out;
}

const read = (path) => { try { return readFileSync(path, "utf8"); } catch { return ""; } };
const ALL = walk("src");
const SHELL_TSX = ALL.filter((p) => /^src\/(App\.tsx|i18n\.ts|components\/)/.test(p));
const CSS = [...SHELL_CSS, TOKENS];
const SHOWCASE = ALL.filter((p) => p.startsWith("src/madar/showcase/"));

/** Every hit names its own location. A line preceded by
    `anti-slop-ignore-next-line <rule>` is exempt — the same convention the
    kill-ai-slop scanner uses, so an exemption has to be written beside the code
    with its reason rather than living as an unexplained number. */
function scan(files, re, rule) {
  const hits = [];
  for (const path of files) {
    const lines = read(path).split("\n");
    lines.forEach((line, i) => {
      /* A line that is nothing but prose is not a drawing. `geometry.mjs` learned
         this when it counted a hex that appeared only inside a sentence explaining
         a bug; this scanner then flagged the comment recording *why* a banned
         violet was not used. A sentence about a rule is not a breach of it.
         ponytail: the test is line-based, so a comment that closes and continues
         into code on the same line is skipped too — no such line exists here, and
         the fix if one appears is to strip block comments before splitting. */
      if (/^(\/\/|\/\*|\*)/.test(line.trim())) return;
      const prev = lines[i - 1] ?? "";
      const exempt = new RegExp(`anti-slop-ignore-next-line[^\\n]*\\b${rule}\\b`).test(prev);
      if (!exempt && re.test(line)) hits.push(`${path}:${i + 1}  ${line.trim().slice(0, 90)}`);
    });
  }
  return hits;
}

/** Every :hover rule whose body raises or enlarges the element. */
function hoverLifts() {
  const hits = [];
  for (const path of ALL.filter((p) => p.endsWith(".css"))) {
    for (const m of read(path).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!/:hover/.test(m[1])) continue;
      const body = m[2];
      if (/transform:[^;]*translateY\(\s*-/.test(body) || /transform:[^;]*scale\(\s*(1\.[1-9]|[2-9])/.test(body)) {
        hits.push(`${path}  ${m[1].trim().split("\n").pop().slice(0, 46)}`);
      }
    }
  }
  return hits;
}

/** Rule 02 is about the canvas, not about every white pixel. A 3px star dot and
    a 7% white hover film are not "a blinding pure white canvas", so the check
    reads the canvas token and the page's own background instead of grepping. */
function pureWhiteCanvas() {
  const hits = [];
  const tokens = read(TOKENS);
  for (const m of tokens.matchAll(/--nova-canvas:\s*([^;]+);/g)) {
    if (/#fff\b|#ffffff\b|\bwhite\b|rgb\(255[,\s]+255[,\s]+255/i.test(m[1])) {
      hits.push(`${TOKENS}  --nova-canvas: ${m[1].trim()}`);
    }
  }
  const shell = read("src/styles.css");
  for (const m of shell.matchAll(/(^|\n)\s*(body|html)[^{]*\{([^}]*)\}/g)) {
    if (/background[^;]*(#fff\b|#ffffff\b|\bwhite\b)/i.test(m[3])) hits.push(`src/styles.css  ${m[2]} background is pure white`);
  }
  return hits;
}

const RULES = [
  { n: "02", name: "no pure white canvas", fn: pureWhiteCanvas },
  { n: "04", name: "no purple-on-black dark mode", files: [...CSS, ...ALL],
    re: /#(8b5cf6|a855f7|7c3aed|6d28d9|c084fc)\b/i },
  { n: "10", name: "no Inter / Geist / Space Grotesk", files: CSS,
    re: /font-family[^;]*("|')(Inter|Geist|Space Grotesk)/i },
  /* The CSS branch already excluded `transparent`, because a transparent side
     border is the triangle trick and not a stripe. The JSX branch did not, so it
     flagged every drawn marker in the library. The rule's own intent is the
     coloured accent stripe; the exclusion belongs on both branches. */
  { n: "11", name: "no coloured left stripe", files: [...CSS, ...ALL],
    re: /border-left:\s*[2-9]px solid (?!transparent)|borderLeft:\s*[`'"]?\s*[2-9]px solid (?!transparent)/i },
  { n: "15", name: "no faux terminal window chrome", files: [...CSS, ...ALL],
    re: /window-controls|traffic-lights?\b/ },
  { n: "19", name: "no sparkle glyphs", files: ALL, re: /Sparkle|✨/ },
  /* an arrow glyph in a metric delta is data; what the standard bans is a
     bouncing or pulsing directional affordance, so the check is the motion. */
  { n: "20", name: "no animated / bouncing arrows", files: [...CSS, ...ALL],
    re: /animation:[^;]*\b(bounce|bob|float-?arrow)|scroll-?(down|hint|cue)[^;]*animation/i },
  { n: "23", name: "no em dash in a rendered heading", files: [...SHOWCASE, ...SHELL_TSX],
    re: /\b(title|eyebrow|label)="[^"]*—/ },
  { n: "24", name: 'no "it is not X, it is Y" copy', files: ALL,
    re: /ليس مجرّد|ليست مجرّد|ليس فقط|not just an?\b|isn'?t just/i },
  /* A check that reports state (a checkbox, a "done" row) is state, not a
     bullet — that distinction is ruled in ANTI-SLOP-30.md and carried by an
     ignore directive at each such site. What is banned is a check glyph sitting
     in front of prose, or dropped into copy as decoration. */
  { n: "25", name: "no checkmark as a bullet or in copy", files: ALL,
    re: /<PiCheck\s*\/>\s*\{?["'\u0600-\u06FF]|["'`][^"'`]*[✓✔✅]/ },
  /* #21 across every stylesheet, library included. The line is elevation and
     scale: an axial nudge along the reading direction is a direction cue, and a
     press scale answers a pointer that is already down. */
  { n: "21", name: "no lift or scale on hover", fn: hoverLifts },
  { n: "29", name: "no neon accents", files: [...CSS, ...ALL],
    re: /#(0{2}ff0{2}|0{2}ffff|ff0{2}ff|39ff14|0ff|f0f)\b/i },
];

const failures = [];
const lines = [];

for (const rule of RULES) {
  const hits = rule.fn ? rule.fn() : scan([...new Set(rule.files)], rule.re, rule.n);
  lines.push(`  ${hits.length ? "FAIL" : "PASS"} ${rule.n}  ${rule.name}${hits.length ? ` (${hits.length})` : ""}`);
  hits.slice(0, 4).forEach((h) => lines.push(`         ${h}`));
  if (hits.length) failures.push(rule.n);
}

/* Rules 28, 29 and 30 of the standard are requirements rather than bans, so they
   are checked by presence: the thing has to exist and be reachable. */
const app = read("src/App.tsx");
const present = [
  { n: "28", name: "skeleton loaders for lazy views",
    ok: read("src/components/MadarStageSkeleton.tsx").includes("aria-busy")
      && !/fallback=\{<p className="madar-loading"/.test(app + read("src/components/MadarLibrary.tsx")) },
  { n: "29", name: "Terms of Use reachable from the footer",
    ok: /setLegalDoc\("terms"\)/.test(app) && read("src/components/LegalDialog.tsx").includes("Terms of Use") },
  { n: "30", name: "Privacy Policy reachable from the footer",
    ok: /setLegalDoc\("privacy"\)/.test(app) && read("src/components/LegalDialog.tsx").includes("Privacy Policy") },
  { n: "--", name: "no dead # link in the footer",
    ok: !/<a href="#"/.test(app) },
];
for (const p of present) {
  lines.push(`  ${p.ok ? "PASS" : "FAIL"} ${p.n}  ${p.name}`);
  if (!p.ok) failures.push(p.n);
}

/* Delegated: the existing scanner owns these groups, and gates/03 + gates/04
   hold their ceilings. Reported so the mapping is visible, not re-counted. */
const DELEGATED = [
  ["01", "harsh gradients", "kill-ai-slop 02 + 06"],
  ["05/07", "oversized drop shadow", "kill-ai-slop 20"],
  ["08/09", "glassmorphism and max radius", "kill-ai-slop 19 + 21"],
  ["07/18", "emoji in UI copy", "kill-ai-slop 15"],
  ["17", "AI-drawn SVG icon", "kill-ai-slop 24"],
  ["21/28", "springy hover", "kill-ai-slop 26"],
  ["14", "mono outside code", "kill-ai-slop 34 + tools/qa/mono-usage.mjs"],
];
DELEGATED.forEach(([n, name, to]) => lines.push(`  DELEG ${n}  ${name} → ${to}`));

const MANUAL = [
  ["13/14/16", "3-card rows, bento collages, 3-tier pricing", "catalogued vocabulary vs shell usage"],
  ["26/27", "fake testimonials, real product demos", "library defaults vs marketing claims"],
  ["06/09/12", "shadows, radii, hatch", "conflicts with VISUAL-LAW §3, §11, §15"],
];
MANUAL.forEach(([n, name, why]) => lines.push(`  MANUAL ${n}  ${name} — ${why}`));

console.log(lines.join("\n"));
console.log(`ANTI_SLOP_30=${failures.length ? `FAIL ${failures.join(",")}` : "ok"}`);
process.exit(failures.length ? 1 : 0);
