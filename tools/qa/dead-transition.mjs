/**
 * A property that is transitioned and never changed.
 *
 * `.component-card` declared `transition: border-color, box-shadow, transform` and
 * grep found `transform` on that class exactly once — inside that list. Nothing
 * ever set a box-shadow on it either. Two of the three entries were instructions
 * to the compositor to watch properties no rule in the repository writes.
 *
 * It is invisible: the page looks right, no gate fails, and the cost is real —
 * every transitioned property is a value the engine samples on every change to
 * that element. The same defect was printed seven times in IMPORTED.md for the
 * uploads before it was noticed in this repository's own sheets, in three places.
 *
 * THE TEST. For each rule `S { transition: p1, p2, … }`, take S's SUBJECT (its
 * last compound selector) and ask whether any other rule — or any keyframe, or
 * any inline style in the components — declares p1 on a subject that includes
 * S's. `.component-card:hover` includes `.component-card`; `.mobile-dock
 * .dock-primary` does NOT include `.mobile-dock a`, because its subject is
 * `.dock-primary` and the question is about `a`.
 *
 * Deliberately conservative in one direction: the subject match ignores
 * ancestors, so `a:hover { color }` anywhere in the repo satisfies a `color`
 * transition on any `… a`. That under-reports and never over-reports, which is
 * the safe side for a gate that fails the build.
 *
 *   node tools/qa/dead-transition.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* This repository's own sheets. `src/components/ui` is imported reference code
   under a named allowance and is not asked to meet rules written here. */
const SHEETS = [
  "src/styles.css",
  "src/demos.css",
  "src/advanced-lab.css",
  "src/pattern-studio.css",
  "src/primitives.css",
  "src/madar-library.css",
  "src/madar/bridge.css",
  "src/gold-showcase.css",
  "src/gold-gallery.css",
  "src/gold-lab.css",
  "src/gold-studio.css",
];
/* Longhands a shorthand covers, and the shorthand each longhand answers to. A
   `background` transition is satisfied by a rule setting `background-color`. */
const FAMILY = {
  background: ["background", "background-color", "background-image", "background-position", "background-size"],
  "background-color": ["background", "background-color"],
  "background-position": ["background", "background-position"],
  border: ["border", "border-color", "border-width", "border-top-color", "border-inline-start-color", "border-block-end-color", "border-style"],
  "border-color": ["border", "border-color", "border-top-color", "border-bottom-color", "border-left-color", "border-right-color", "border-inline-start-color", "border-inline-end-color", "border-block-start-color", "border-block-end-color"],
  "border-radius": ["border-radius", "border-top-left-radius", "border-start-start-radius", "border-end-end-radius"],
  transform: ["transform", "translate", "rotate", "scale"],
  inset: ["inset", "top", "right", "bottom", "left", "inset-block-end", "inset-block-start", "inset-inline-start", "inset-inline-end"],
  "block-size": ["block-size", "height", "max-block-size", "min-block-size"],
  "inline-size": ["inline-size", "width", "max-inline-size", "min-inline-size"],
  width: ["width", "inline-size", "max-width"],
  height: ["height", "block-size", "max-height"],
  margin: ["margin", "margin-block-start", "margin-block-end", "margin-inline-start", "margin-inline-end", "margin-top", "margin-bottom"],
  padding: ["padding", "padding-block", "padding-inline", "padding-inline-start", "padding-block-start"],
  "grid-template-columns": ["grid-template-columns", "grid-template"],
  "grid-template-rows": ["grid-template-rows", "grid-template"],
  flex: ["flex", "flex-grow", "flex-basis"],
  "font-variation-settings": ["font-variation-settings", "font-weight"],
  color: ["color"],
};

const read = (p) => { try { return readFileSync(p, "utf8"); } catch { return ""; } };
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

/* Every declaration block in every sheet, as { subject, props }. `subject` is the
   last compound of each selector in the list, so `a, .b > .c` yields `a` and `.c`. */
const subjectsOf = (selectorText) =>
  selectorText.split(",").map((s) => s.trim().split(/[\s>+~]+/).filter(Boolean).pop() || "").filter(Boolean);

/* THE FULL SELECTOR, NORMALISED — and this was added because reducing a rule to
   its SUBJECT alone loses the ancestor that identifies it. `.notification-deck
   article` and `.fold-deck article` both reduce to `article`, so a box-shadow on
   one appeared to vouch for the other, and a bare `article` subject collided with
   every article in the repository.

   So two excuses are accepted, and a property is live if EITHER holds: another
   rule's selector extends this one (`.fold-deck article` → `.fold-deck
   article.active`), or another rule's subject is a superset of this subject
   (`.component-card` → `.component-card:hover`). Two overlapping tests, both in
   the direction of reporting less, which is the right way to be wrong here. */
const norm = (sel) => sel.trim().replace(/\s*([>+~])\s*/g, " $1 ").replace(/\s+/g, " ");
const extends_ = (mineSel, theirSel) => {
  const a = norm(mineSel), b = norm(theirSel);
  if (!b.startsWith(a)) return false;
  const next = b.slice(a.length, a.length + 1);
  return next === "" || ".:[ >+~".includes(next);
};

/* The simple selectors inside one compound: `.a.b:hover[c]` → [.a, .b, :hover, [c]] */
const simplesOf = (compound) =>
  (compound.match(/(::?[a-z-]+(\([^)]*\))?|\.[A-Za-z0-9_-]+|#[A-Za-z0-9_-]+|\[[^\]]*\]|^[a-z][a-z0-9]*)/g) || []).map((x) => x.toLowerCase());

const blocks = [];
for (const file of SHEETS) {
  const css = strip(read(file));
  /* Split on `}` and read the selector as the text before the last `{`. Nested
     at-rules leave a chunk whose "selector" is the at-rule text, which yields no
     simple selectors and is skipped by simplesOf returning []. */
  let line = 1;
  for (const chunk of css.split("}")) {
    const brace = chunk.lastIndexOf("{");
    const lines = chunk.split("\n").length - 1;
    if (brace !== -1) {
      const selectorText = chunk.slice(0, brace).split(/[{;]/).pop().trim();
      const body = chunk.slice(brace + 1);
      const props = [...body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:/g)].map((m) => m[1]);
      blocks.push({ file, line, selectorText, props, body });
    }
    line += lines;
  }
}

/* An animation changes a property just as a state rule does — but only on the
   elements that RUN it. The first version of this check collected every property
   any keyframe anywhere sets and excused it globally, which is the same mistake
   as the inline-style hatch one level down: it let `transform` on
   `.component-card` pass because some unrelated keyframe animates a transform.
   The mutation test caught that too.
   
   So keyframes are indexed by NAME, and a transition is excused only when a rule
   whose subject includes this one names a keyframe that sets the property. */
const keyframeProps = new Map();
for (const file of SHEETS) {
  for (const kf of strip(read(file)).matchAll(/@keyframes\s+([A-Za-z0-9_-]+)[^{]*\{([\s\S]*?)\n\}/g)) {
    const set = keyframeProps.get(kf[1]) || new Set();
    for (const m of kf[2].matchAll(/([a-z-]+)\s*:/g)) set.add(m[1]);
    keyframeProps.set(kf[1], set);
  }
}
/* The keyframe names each block runs, from `animation` or `animation-name`. */
const namesIn = (body) => {
  const out = [];
  for (const m of body.matchAll(/(?:^|;)\s*animation(?:-name)?\s*:\s*([^;]+)/g)) {
    for (const token of m[1].split(/[,\s]+/)) if (keyframeProps.has(token)) out.push(token);
  }
  return out;
};

/* THE FIRST VERSION OF THIS GATE PROVED NOTHING, and the mutation test is what
   said so. It excused any property that appeared in any inline `style={{…}}`
   anywhere in the components — 160 property names — so `transform` and
   `box-shadow` on `.component-card`, which I had already confirmed dead by grep
   and by computed style, sailed through. An inline style applies to ONE element;
   it cannot vouch for a transition on a different one.

   What the gate genuinely cannot see is an SVG GEOMETRY ATTRIBUTE: `cx={x}` on a
   <circle> is a presentation attribute, not a declaration, and transitioning it
   is correct and common. So the escape hatch is narrow and named — the properties
   that are also SVG attributes — and nothing else. */
const SVG_ATTR = new Set([
  "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2", "d", "points",
  "offset", "width", "height", "fill", "stroke", "stroke-width", "stroke-dashoffset",
  "stroke-dasharray", "stop-color", "stop-opacity", "opacity", "transform",
]);

/* INLINE STYLES, SCOPED TO THE ELEMENT THAT CARRIES THEM. The first version of
   this gate excused any property named in any inline style anywhere; removing the
   hatch entirely then flagged `.adaptive-nav-lens { transform }`, which really is
   set inline (`style={{ transform }}`). Both are wrong for the same reason. What
   is needed is the pairing: the classes on the tag, and the properties its own
   style object sets.

   Shorthand object properties matter here — `style={{ transform }}` has no colon,
   so a `prop\s*:` scan misses exactly the case that produced the false positive. */
const inlineByClass = new Map();
const tagWalk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) { if (name !== "ui") tagWalk(path); continue; }
    if (!/\.tsx$/.test(name)) continue;
    const src = read(path);
    /* Each JSX opening tag, greedy enough to hold a style object. */
    for (const tag of src.matchAll(/<[A-Za-z][^<>]*?style=\{\{([\s\S]*?)\}\}[^<>]*?\/?>/g)) {
      const whole = tag[0];
      const body = tag[1];
      const props = new Set();
      for (const m of body.matchAll(/(?:^|,|\{)\s*([A-Za-z][A-Za-z0-9]*)\s*(?::|,|\}|$)/g)) {
        props.add(m[1].replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()));
      }
      /* `...style` means a caller can pass anything, so the element is opaque. */
      if (/\.\.\.\s*style/.test(body)) props.add("*");
      const classes = [];
      for (const cm of whole.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
        for (const token of (cm[1] || cm[2] || "").split(/[\s${}?:'"]+/)) if (/^[a-z][a-z0-9-]*$/.test(token)) classes.push("." + token);
      }
      /* A tag with NO className still carries its style: `<b style={{ transform:
         `scaleX(…)` }} />` in the skills bar is exactly that, and keying only by
         class reported it as dead. So the tag name is a key too. */
      const tagName = (whole.match(/^<([A-Za-z][A-Za-z0-9]*)/) || [])[1];
      if (tagName && /^[a-z]/.test(tagName)) classes.push(tagName);
      for (const c of classes) {
        const set = inlineByClass.get(c) || new Set();
        for (const pr of props) set.add(pr);
        inlineByClass.set(c, set);
      }
    }
  }
};
tagWalk("src/components");
tagWalk("src/madar");

const failures = [];
for (const b of blocks) {
  const list = b.body.match(/(?:^|;)\s*transition\s*:\s*([^;]+)/);
  if (!list) continue;
  const named = list[1]
    .split(",")
    .map((seg) => seg.trim().split(/\s+/)[0])
    .filter((p) => p && !["none", "all", "var(--nova-motion-fast)", "initial"].includes(p) && /^[a-z-]+$/.test(p));
  if (!named.length) continue;

  for (const mySelector of b.selectorText.split(",").map((x) => x.trim()).filter(Boolean)) {
    const subject = subjectsOf(mySelector)[0] || "";
    const mine = simplesOf(subject);
    if (!mine.length) continue;
    const reaches = (other) =>
      other.selectorText.split(",").some((sel) => extends_(mySelector, sel)) ||
      subjectsOf(other.selectorText).some((sel) => {
      const theirs = simplesOf(sel);
        return mine.every((x) => theirs.includes(x));
      });
    for (const prop of named) {
      const family = FAMILY[prop] || [prop];
      /* `transform` is in SVG_ATTR, so it is excused on an SVG subject only. */
      const svgSubject = mine.some((x) => /^(circle|path|line|rect|polyline|polygon|ellipse|text|g|svg|use|image)$/.test(x)) || /signal-point|signal-cursor/.test(subject);
      if (svgSubject && family.some((p) => SVG_ATTR.has(p))) continue;
      /* set inline on an element that carries this class */
      const inlineHere = mine.some((x) => {
        const set = inlineByClass.get(x);
        return set && (set.has("*") || family.some((pr) => set.has(pr)));
      });
      if (inlineHere) continue;
      /* A DECLARATION THAT READS A CUSTOM PROPERTY CAN CHANGE WITHOUT A SECOND
         RULE. `body { color: var(--nova-ink) }` transitions on every theme switch,
         because the token under it changes while the declaration stays put. No
         `:hover` rule will ever appear for it, and the transition is still live.
         So a property is excused when its own value on this subject reads a
         `var()` — which is why the colour entries here are not reported and the
         literal `transform` and `box-shadow` ones are. */
      const readsToken = blocks.some((other) =>
        reaches(other) &&
        family.some((pr) => new RegExp(`(?:^|;)\\s*${pr}\\s*:[^;]*var\\(`).test(other.body)));
      if (readsToken) continue;
      /* animated on THIS subject (or one that includes it), not anywhere */
      const animatedHere = blocks.some((other) =>
        namesIn(other.body).some((n) => family.some((p) => keyframeProps.get(n).has(p))) &&
        reaches(other));
      if (animatedHere) continue;
      const written = blocks.some((other) => {
        if (other === b) return false;
        if (!other.props.some((p) => family.includes(p))) return false;
        return reaches(other);
      });
      if (!written) failures.push(`${b.file}  ${norm(mySelector)} { transition: … ${prop} … } — nothing sets ${prop} on ${norm(mySelector)}`);
    }
  }
}

const unique = [...new Set(failures)];
console.log(`TRANSITION_BLOCKS=${blocks.filter((b) => /transition\s*:/.test(b.body)).length}`);
console.log(`KEYFRAMES_INDEXED=${keyframeProps.size}`);
for (const f of unique) console.log(`  DEAD ${f}`);
console.log(`DEAD_TRANSITIONS=${unique.length ? "FAIL" : "ok"} (${unique.length})`);
process.exit(unique.length ? 1 : 0);
