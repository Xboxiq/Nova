/**
 * Group 34 of the slop scanner ("tasteful-terminal") counts every monospace
 * declaration, which is the wrong unit for a design system: showing a token
 * value or a duration in mono is what mono is for. The slop is mono used as
 * decoration — on prose, on labels that are words, on an icon slot.
 *
 * So this asks the question the count cannot: on the NOVA shell, is every
 * monospace declaration attached to code, a key, or a numeric readout?
 * A selector qualifies by its subject — a code-ish element, or a class named
 * for the reading it carries. That keeps the rule enforceable for new CSS
 * instead of freezing today's file list.
 *
 *   node tools/qa/mono-usage.mjs
 */
import { readFileSync, readdirSync } from "node:fs";

// The shell: NOVA's own product surface. `demos.css` and `src/madar/` are the
// library's exhibits and keep their own vocabulary.
const files = readdirSync("src")
  .filter((f) => f.endsWith(".css") && f !== "demos.css")
  .map((f) => `src/${f}`);

const CODE_ELEMENTS = /(^|[\s>+~])(code|kbd|samp|pre|output|var|dd|time)$/;
const READOUT_NAME = /(metric|label|ruler|spec|readout|value|count|stat|tick|token|timing|duration|coord|axis)/i;

const offenders = [];

for (const file of files) {
  for (const block of readFileSync(file, "utf8").split("}")) {
    const brace = block.indexOf("{");
    if (brace === -1) continue;

    const selector = block.slice(0, brace).split("\n").pop().trim();
    if (!/font-family:[^;]*mono/i.test(block.slice(brace + 1))) continue;

    const subject = selector.split(",").pop().trim();
    if (!CODE_ELEMENTS.test(subject) && !READOUT_NAME.test(subject)) {
      offenders.push(`${file}: ${selector}`);
    }
  }
}

console.log(offenders.length ? `MONO_DECORATION\n${offenders.map((o) => `  ${o}`).join("\n")}` : "MONO_CODE_ONLY");
process.exit(offenders.length ? 1 : 0);
