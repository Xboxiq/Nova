/**
 * Hover, on a device that cannot hover.
 *
 * `better-accessibility` asks for every hover treatment to sit behind
 * `@media (hover: hover) and (pointer: fine)`. Measured, the shell has 88 `:hover`
 * rules, and gating all 88 would be a large diff for mostly no defect: a hover
 * that only changes **colour** flashes on tap and clears on the next one.
 *
 * Two kinds are real:
 *
 *   · **MOVE** — a transform on hover sticks on a touch device until the reader
 *     taps somewhere else. Cosmetic, but it is a stuck state nobody asked for.
 *   · **REVEAL** — an opacity or visibility change hides the content from a touch
 *     reader *entirely*. The liquid dock's labels were the button's only visible
 *     name, and a finger could not reach them.
 *
 * So this measures those two and ignores colour. A rule is satisfied when it sits
 * inside a hover-capability guard, or when a `(hover: none), (pointer: coarse)`
 * block neutralises its selector.
 *
 * A rule that sets `transform: none` is a fix, not a defect — the first version of
 * this scan counted two of those, which is how a measurement starts lying.
 *
 *   node tools/qa/hover-policy.mjs
 */
import { readFileSync, readdirSync } from "node:fs";

const files = [
  ...readdirSync("src").filter((f) => f.endsWith(".css")).map((f) => `src/${f}`),
  ...readdirSync("src/madar").filter((f) => f.endsWith(".css")).map((f) => `src/madar/${f}`),
  /* `src/components/nova/` holds components written here rather than imported, so
     unlike `src/components/ui/` they carry no exemption from this repo's own law.
     Their CSS lives in styled-components templates inside .tsx, which this scan
     never read before, so the directory is named explicitly. */
  ...readdirSync("src/components/nova").filter((f) => f.endsWith(".tsx")).map((f) => `src/components/nova/${f}`),
];

const MOVE = /(?:^|[;{\s])(?:transform|translate|scale|rotate)\s*:\s*(?!none)/;
const REVEAL = /(?:^|[;{\s])(?:opacity|visibility)\s*:\s*(?!1\b|visible)/;
const GUARD = /@media[^{]*\(\s*hover\s*:\s*hover\s*\)/;
const RELIEF = /@media[^{]*(?:hover\s*:\s*none|pointer\s*:\s*coarse)/;

const failures = [];
let moved = 0;
let revealed = 0;
let guarded = 0;

/* Comments are not selectors. The first version of the relief scan read the
   sentence explaining the dock's label as if it were the rule it explains — the
   same defect `geometry.mjs` and `anti-slop-30.mjs` each had to be taught. */
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");
const norm = (s) => s.replace(/\s+/g, " ").trim();

for (const file of files) {
  const src = strip(readFileSync(file, "utf8"));

  /* Every selector named inside a coarse-pointer block, so a rule elsewhere in the
     same stylesheet counts as answered. */
  const relieved = new Set();
  for (const m of src.matchAll(/@media([^{]*)\{((?:[^{}]*\{[^{}]*\})*)/g)) {
    if (!RELIEF.test(`@media${m[1]}`)) continue;
    for (const inner of m[2].matchAll(/([^{}]+)\{/g)) {
      for (const sel of inner[1].split(",")) relieved.add(norm(sel));
    }
  }

  for (const m of src.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = norm(m[1].split("\n").pop());
    if (!selector.includes(":hover")) continue;
    const body = m[2];
    const kind = [MOVE.test(body) && "MOVE", REVEAL.test(body) && "REVEAL"].filter(Boolean);
    if (!kind.length) continue;

    if (kind.includes("MOVE")) moved += 1;
    if (kind.includes("REVEAL")) revealed += 1;

    /* inside a hover-capability guard already? walk back to the nearest @media */
    const before = src.slice(0, m.index);
    const open = before.lastIndexOf("@media");
    const inGuard = open !== -1 && GUARD.test(src.slice(open, src.indexOf("{", open) + 1))
      /* and the guard has not closed before this rule */
      && before.slice(open).split("}").length <= before.slice(open).split("{").length;

    if (inGuard) { guarded += 1; continue; }
    /* A MOVE is answered by neutralising the hover rule itself. A REVEAL is
       answered by unhiding the **base** element — `.dock button span { opacity: 1 }`
       makes `.dock button:hover span { opacity: 1 }` a no-op — so the selector is
       also compared with `:hover` stripped. Matching only the literal string would
       have demanded the one fix that does not actually reveal anything. */
    const forms = selector.split(",").map(norm);
    const bare = forms.map((x) => norm(x.replace(/:hover\b/g, "")));
    if ([...forms, ...bare].some((x) => relieved.has(x))) { guarded += 1; continue; }

    const line = before.split("\n").length;
    failures.push(`${file}:${line} ${kind.join("+")} ${selector.slice(0, 70)}`);
  }
}

for (const f of failures) console.log(`  FAIL ${f}`);
console.log(`MOVING_HOVER=${moved} REVEALING_HOVER=${revealed} ANSWERED=${guarded}`);
console.log(`HOVER_POLICY=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
