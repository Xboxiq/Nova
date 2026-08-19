/**
 * Literal `**bold**` in JSX text.
 *
 * The showcase prose is written in markdown-shaped Arabic in a file that renders
 * as JSX, so `**مهم**` reaches the screen as four asterisks around a word. It
 * shipped that way in the dispatch section and I only caught it by reading a
 * screenshot — which means the next one would ship too. So it is measured.
 *
 * Asterisks inside comments are fine (`/** ... *\/` is a docblock, not copy), and
 * a code fence or a regex may legitimately contain them, so only text that would
 * be *rendered* is flagged: markdown emphasis outside comments and outside string
 * literals used for logic.
 *
 *   node tools/qa/no-raw-markdown.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/madar/showcase", "src/madar/showcase/sections", "src/madar/components"];
const hits = [];

for (const dir of ROOTS) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".tsx"))) {
    const src = readFileSync(join(dir, file), "utf8");
    /* strip block and line comments first: a docblock opens with `**` by
       convention and is not copy */
    const bare = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const m of bare.matchAll(/\*\*[^*\n]{1,80}\*\*/g)) {
      const line = bare.slice(0, m.index).split("\n").length;
      hits.push(`${join(dir, file)}: ${m[0]}  (line ~${line} of the comment-stripped file)`);
    }
    /* the mirror mistake: emphasis written as markdown underscores */
    for (const m of bare.matchAll(/(?<![\w$])__[^_\n]{2,60}__(?![\w$])/g)) {
      hits.push(`${join(dir, file)}: ${m[0]}`);
    }
  }
}

for (const h of hits) console.log(`  FAIL literal markdown in rendered text — ${h}`);
console.log(`RAW_MARKDOWN=${hits.length}`);
console.log(`NO_RAW_MARKDOWN=${hits.length ? "FAIL" : "ok"}`);
process.exit(hits.length ? 1 : 0);
