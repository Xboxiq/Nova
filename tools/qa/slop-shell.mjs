/**
 * The de-slop pass draws one line: NOVA's own product shell must be clean,
 * while the Madar showcase keeps its documentation vocabulary and the library
 * keeps the patterns it exists to demonstrate (a gradient button is supposed to
 * have a gradient).
 *
 * A raw scanner count cannot tell those apart, so this classifies the scanner's
 * findings by path and reports only what lands on the shell. That makes
 * "the shell is clean" a gate instead of an opinion.
 *
 *   node tools/qa/slop-shell.mjs [groupId …]
 */
import { execFileSync } from "node:child_process";

const groups = process.argv.slice(2);

// The shell: what a visitor sees as the product, before any demo renders.
const isShell = (file) =>
  !file.startsWith("madar/") &&
  !file.startsWith("components/demos/") &&
  file !== "demos.css";

const raw = execFileSync(
  "node",
  [".claude/skills/kill-ai-slop/scripts/scan.mjs", "src", "--json"],
  { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
);
const report = JSON.parse(raw);

let shellHits = 0;
const lines = [];
for (const finding of report.findings) {
  if (groups.length && !groups.includes(finding.id)) continue;
  const hits = finding.hits.filter((h) => isShell(h.file));
  if (!hits.length) continue;
  shellHits += hits.length;
  lines.push(`  ${finding.id} ${finding.name}: ${hits.length}`);
  for (const h of hits.slice(0, 6)) lines.push(`      ${h.file}:${h.line}`);
  if (hits.length > 6) lines.push(`      … and ${hits.length - 6} more`);
}

console.log(lines.join("\n"));
console.log(`SHELL_SLOP_HITS=${shellHits}`);
process.exit(shellHits ? 1 : 0);
