/**
 * An accessible name on an element whose role forbids one.
 *
 * The receipt printer's eleven `.letter` spans have to be collapsed into a single
 * word for assistive technology, so the wrapper was given an `aria-label`. The
 * wrapper is a bare `<span>` — role `generic` — and `generic` PROHIBITS an
 * accessible name. axe reported it as `aria-prohibited-attr` in six
 * theme/viewport combinations, and the defect was in the accessibility ADDITION,
 * not in the upload: a fix that is itself invalid ARIA.
 *
 * Nothing else saw it. `qa:source` does not read ARIA, `qa:operable` tests
 * behaviour, and the name was present and correct as a string — it simply had no
 * legal place to live. The remedy is a role that accepts a name (`img`, `status`,
 * `group`, …), which is one attribute; the risk of doing it wrong again is
 * permanent, so it gets a gate.
 *
 * The rule: inside `src/components/ui`, a generic-role host element carrying
 * `aria-label` or `aria-labelledby` must also carry a `role`. Interactive and
 * landmark elements are exempt because their roles accept names by definition.
 *
 *   node tools/qa/aria-name-legal.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* Elements whose implicit role is `generic` (or otherwise nameless), so an
   aria-label on them is prohibited rather than merely useless. `<div>` and
   `<span>` are the two that come up; the rest are here because the same rule
   applies and someone will reach for them eventually. */
const GENERIC = ["div", "span", "p", "b", "i", "em", "strong", "small", "pre", "code", "label"];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx$/.test(name)) files.push(p);
  }
})("src/components/ui");

const failures = [];
for (const file of files) {
  const src = readFileSync(file, "utf8");
  /* Each opening tag, non-greedily up to its own `>`; `[^>]` cannot cross into
     the next tag, so an aria-label two elements away is not attributed here. */
  for (const tag of src.matchAll(/<([a-z][a-z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*?)\/?>/g)) {
    const [, name, attrs] = tag;
    if (!GENERIC.includes(name)) continue;
    if (!/\baria-label(ledby)?\s*=/.test(attrs)) continue;
    if (/\brole\s*=/.test(attrs)) continue;
    const line = src.slice(0, tag.index).split("\n").length;
    failures.push(`${file}:${line}  <${name}> carries an aria-label with no role — role "generic" prohibits an accessible name`);
  }
}

console.log(`ARIA_HOSTS_SCANNED=${files.length}`);
for (const f of failures) console.log(`  FAIL ${f}`);
console.log(`ARIA_NAME_LEGAL=${failures.length ? "FAIL" : "ok"}`);
process.exit(failures.length ? 1 : 0);
