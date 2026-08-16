/**
 * AGENTS.md tells agents which skills to use. If it names one that is not
 * installed, every future session follows an instruction it cannot carry out —
 * which is how `apple-design` sat in the working agreement, unused and
 * uninstalled, for the project's first weeks.
 *
 * This checks that every backticked name AGENTS.md tells you to *use* exists
 * under .claude/skills/.
 *
 *   node tools/qa/agents-skill-claims.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const agents = readFileSync("AGENTS.md", "utf8");
const installed = new Set(
  existsSync(".claude/skills")
    ? readdirSync(".claude/skills", { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [],
);

// Only lines that instruct use of a named skill, e.g. "Use `apple-design` for …".
const claimed = new Set();
for (const line of agents.split("\n")) {
  if (!/\bUse\b/.test(line)) continue;
  for (const [, name] of line.matchAll(/`([a-z][a-z0-9-]{2,})`/g)) {
    // Skip paths and file names; a skill claim is a bare slug.
    if (name.includes("/") || name.includes(".")) continue;
    claimed.add(name);
  }
}

const missing = [...claimed].filter((name) => !installed.has(name));
console.log(
  missing.length
    ? `MISSING_SKILLS ${missing.join(", ")} (claimed by AGENTS.md, absent from .claude/skills/)`
    : `ALL_CLAIMED_SKILLS_PRESENT (${claimed.size} checked)`,
);
process.exit(missing.length ? 1 : 0);
