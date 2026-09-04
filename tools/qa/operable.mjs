/**
 * Are the components actually usable, or only correct-looking?
 *
 * This file exists because of a defect the owner caught and no harness did. The
 * reference set was carried into the library pixel-faithful and **dead**: across
 * sixteen components there were two `useState`, one `onClick` and zero
 * `onKeyDown`. Tabs that did not switch, a legend that could not hide a series, a
 * search box that could not search, a text field that could not be typed into.
 * Every existing harness passed, because every existing harness measured how it
 * *looked* — contrast, radii, depth, composition — and none measured whether it
 * *worked*.
 *
 * So this drives the real page and asks three things of every family:
 *
 *   1. Reachability — each specimen offers at least one control a keyboard can
 *      get to. A card with no tab stop is a picture.
 *   2. Consequence — pressing it changes the DOM. A control whose result is
 *      invisible is the same lie in a different costume.
 *   3. Direction — the arrow that moves "forward" is the one that follows the
 *      writing direction, checked in both. A physical ArrowRight passes in
 *      English and lies in Arabic.
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/operable.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4452;
const URL = `http://localhost:${PORT}/`;

/* Each entry: the section, and the controls that must exist and must do
   something. `changes` is a CSS selector or attribute whose value has to differ
   after the interaction — that is the "consequence" half of the check. */
const CASES = [
  {
    id: "madar-photographed",
    name: "credit",
    controls: [
      { what: "loan meter swap", click: "[data-meter]", watch: "[data-meter]", attr: "data-meter" },
      { what: "paid/left split", click: '[data-split] [role="radio"]:not([aria-checked="true"])', watch: "[data-split]", attr: "data-split" },
      { what: "month grid", click: '[data-months] [role="gridcell"]:not([aria-selected="true"])', watch: "[data-months]", attr: "data-selected" },
      { what: "loan tabs", click: '[role="tablist"][aria-label="Loan views"] [role="tab"][aria-selected="false"]', watch: "[data-panel]", attr: "data-panel" },
      { what: "score dock", click: '[data-dock]:not([aria-current])', watch: "[data-dock][aria-current]", exists: true },
      { what: "score bands", click: '[data-bands] [role="radio"]:not([aria-checked="true"])', watch: "[data-bands]", attr: "data-looking" },
      { what: "history point", click: '[data-history] circle[role="radio"]:not([aria-checked="true"])', watch: "[data-history]", attr: "data-at" },
      { what: "bureau legend", click: '[data-history] [role="switch"]', watch: '[data-history] [role="switch"]', attr: "aria-checked" },
      { what: "stat widget open", click: '[data-stat] button[aria-label^="Open"]', watch: "[data-stat]", appears: "[data-stat-detail]" },
    ],
    keyboard: { group: "[data-months]", cell: '[role="gridcell"]', attr: "data-selected" },
  },
  {
    id: "madar-boards",
    name: "boards",
    controls: [
      { what: "plate stat", click: '[data-plate-stat]:not([data-on])', watch: "[data-plate-note]", text: true },
      { what: "donut legend", click: '[data-slice][data-on]', watch: "[data-donut]", attr: "data-donut" },
      /* the selector followed `aria-sort` until axe refused it on a button; it
         now follows the label, which is what actually announces the state */
      { what: "table sort", click: '[data-opps] button[aria-label$="Activate to sort."]', watch: "[data-opps]", attr: "data-sort" },
      { what: "table row", click: '[data-row]:not([data-on])', watch: "[data-row][data-on]", exists: true },
      { what: "care metric", click: '[data-metric]:not([data-on])', watch: "[data-care-says]", text: true },
      { what: "care period", click: "[data-care] button[aria-label^=Period]", watch: "[data-care]", attr: "data-period" },
      { what: "flow band", click: '[data-band][data-on]', watch: "[data-flow]", attr: "data-flow" },
      { what: "orb resize", click: '[data-assistant] button[aria-label="Larger orb"]', watch: "[data-assistant] [data-orb-size]", attr: "data-orb-size" },
      { what: "palette copy", click: "[data-swatch]", watch: "[data-palette-says]", text: true },
    ],
    typing: { field: '[data-assistant] input', send: '[data-assistant] button[aria-label="Send"]', watch: '[data-assistant] [aria-live]' },
    search: { field: '[data-staff] input', watch: "[data-staff]", attr: "data-staff" },
  },
  {
    id: "madar-glasswork",
    name: "glasswork",
    controls: [
      { what: "document fan", click: '[data-fan] [data-sheet]:not([aria-checked="true"])', watch: "[data-fan]", attr: "data-fan" },
      { what: "folder front line", click: '[data-fan] [data-sheet]:not([aria-checked="true"])', watch: "[data-folder-front]", text: true },
      { what: "activity row", click: '[data-activity]:not([aria-checked="true"])', watch: "[data-compliance]", attr: "data-compliance" },
      /* the eye is the only control here whose consequence is in a *different*
         component — the header count. A switch that only recoloured itself would
         pass a naive check and still be a decoration. */
      { what: "read switch", click: "[data-eye]", watch: "[data-seen]", text: true },
      { what: "day pill", click: '[data-curve] [data-day]:not([aria-checked="true"])', watch: "[data-curve]", attr: "data-curve" },
      { what: "curve reading", click: '[data-curve] [data-day]:not([aria-checked="true"])', watch: "[data-reading]", text: true },
      { what: "metric blob", click: '[data-blob]:not([aria-checked="true"])', watch: "[data-blob-says]", text: true },
      { what: "log a reading", click: "[data-add]", watch: "[data-logged]", text: true },
    ],
    keyboard: { group: "[data-curve]", cell: "[data-day]", attr: "data-curve", state: "aria-checked" },
  },
  {
    id: "madar-projectwork",
    name: "projectwork",
    controls: [
      { what: "timesheet sort", click: '[data-sortby="name"]', watch: "[data-timesheet]", attr: "data-timesheet" },
      /* sorting by name has to move the accent plate off row one, because the
         first row is only the leader when the list is ordered by hours */
      { what: "leader plate follows the sort", click: '[data-sortby="hours"]', watch: "[data-member]", attr: "data-member" },
      { what: "period", click: "[data-period]", watch: "[data-period]", attr: "data-period" },
      { what: "velocity band", click: '[data-band-pick]:not([aria-checked="true"])', watch: "[data-gauge]", attr: "data-gauge" },
      { what: "band share", click: '[data-band-pick]:not([aria-checked="true"])', watch: "[data-share]", text: true },
      { what: "subtasks open", click: "[data-subtasks]", watch: "[data-task]", appears: "[data-subtask]" },
      { what: "advance a card", click: "[data-advance]", watch: "[data-lanes]", attr: "data-lanes" },
      { what: "upload step", click: "[data-step]", watch: "[data-feed]", attr: "data-feed" },
      { what: "course pick", click: '[data-course]:not([aria-checked="true"])', watch: "[data-hub]", attr: "data-hub" },
      { what: "gantt row", click: '[data-gantt-row]:not([aria-checked="true"])', watch: "[data-gantt]", attr: "data-gantt" },
      { what: "task pick", click: '[data-pick-task]:not([aria-checked="true"])', watch: "[data-tasklane]", attr: "data-tasklane" },
    ],
    keyboard: { group: "[data-gantt]", cell: "[data-gantt-row]", attr: "data-gantt", state: "aria-checked" },
  },
  {
    id: "madar-directions",
    name: "directions",
    controls: [
      { what: "pick a register", click: '[data-direction-pick]:not([aria-checked="true"])', watch: "[data-directions]", attr: "data-directions" },
      /* the sentence naming the reader has to follow the register, or the six are
         six labels on one design — which is what tools/qa/directions.mjs measures
         in the tokens and this measures on the page */
      { what: "the reader sentence follows", click: '[data-direction-pick]:not([aria-checked="true"])', watch: "[data-direction-reader]", text: true },
      { what: "the compared specimen follows", click: '[data-direction-pick]:not([aria-checked="true"])', watch: '[data-register]:not([data-register="default"])', attr: "data-register" },
    ],
    keyboard: { group: "[data-directions]", cell: "[data-direction-pick]", attr: "data-directions", state: "aria-checked" },
  },
  {
    id: "madar-matrix",
    name: "matrix",
    controls: [
      { what: "pick a cell", click: '[data-cell-pick]:not([aria-checked="true"])', watch: "[data-matrix]", attr: "data-matrix" },
      { what: "the readout names the cell", click: '[data-cell-pick]:not([aria-checked="true"])', watch: "[data-matrix-says]", text: true },
    ],
    keyboard: { group: "[data-matrix]", cell: "[data-cell-pick]", attr: "data-matrix", state: "aria-checked" },
  },
  {
    id: "madar-imported",
    name: "imported",
    controls: [
      /* The imported drawer's whole mechanism is that the sheet's height animates
         to the measured height of the view inside it, so the consequence to watch
         is not a class or an attribute — it is the sheet getting taller. */
      { what: "open the drawer", click: "text=Click Me To Open Drawer", watch: "[data-vaul-drawer]", exists: true },
    ],
    toggles: [
      "input.hidden-checkbox",
      "label.container input[type='checkbox']",
      ".prism-checkbox__input:not(:disabled)",
      ".deadbolt-input",
      ".pixel-checkbox",
      ".pb-ai-checkbox input",
      ".folder__toggle",
    ],
    /* ── a radio group that does not exclude ─────────────────────────────────
       Four of the imported radio groups shipped with NO `name` attribute, and
       five radios with no shared name are five independent radios: every one of
       them can be on at once and none can be switched off. That is not a style
       defect, it is the control not being the control it claims to be, and it is
       invisible to axe and to a screenshot alike. So: click through every radio
       in the group and assert that exactly one is checked at the end and that it
       is the last one clicked. */
    exclusive: [".pb-ai-radio-group input[type='radio']"],
  },
  {
    id: "madar-imported-3",
    name: "imported-3",
    controls: [
      /* The printstream sidebar's four tabs were <div>s in the upload, styled as
         buttons and doing nothing. They are buttons here, and the only thing that
         carries "which one is current" to a screen reader is aria-current -- so
         that is the consequence to watch. A tab that paints an active look and
         moves no state is the exact failure this harness exists for. */
      { what: "printstream tab", click: ".cs2-printstream-ui .vtab:not([aria-current])", watch: ".cs2-printstream-ui .vtab[aria-current]", exists: true },
    ],
  },
  {
    id: "madar-imported-2",
    name: "imported-2",
    exclusive: [
      ".radio > input[type='radio']",
      ".container input[type='radio']",
    ],
  },
  {
    id: "madar-nova-instruments",
    name: "nova-instruments",
    controls: [
      /* A hold-to-confirm button is the one control here that must NOT commit on
         the gesture this harness performs. So the consequence watched is the
         refusal: a short click flips data-state to "nudged" and the hint says
         "hold, don't click". A button that silently swallowed the click would
         be the emptiness this file exists to catch, wearing a safer costume. */
      { what: "hold-to-confirm refuses a click", click: "[data-hold-rtl] .hold", watch: "[data-hold-rtl] .hold", attr: "data-state" },
    ],
  },
];

let chromium;
try {
  chromium = createRequire(import.meta.url)("playwright").chromium;
} catch {
  const root = execSync("npm root -g", { encoding: "utf8" }).trim();
  chromium = createRequire(`${root}/`)("playwright").chromium;
}

const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
process.on("exit", () => server.kill());
for (let i = 0; i < 60; i += 1) {
  try { if ((await fetch(URL)).ok) break; } catch { /* starting */ }
  await new Promise((r) => setTimeout(r, 500));
}

const failures = [];
const errors = [];
let operated = 0;
const browser = await chromium.launch();

const read = async (page, sel, attr) =>
  page.evaluate(([s, a]) => {
    const el = document.querySelector(s);
    if (!el) return null;
    return a ? el.getAttribute(a) : el.textContent.trim();
  }, [sel, attr]);

/* Any console error fails this gate, which is the right default and made the gate
   non-deterministic once uploads began carrying the owner's background photograph
   from `ik.imagekit.io`. That host is unreachable from this environment: sometimes
   the request hangs and says nothing, sometimes it dies with ERR_CONNECTION_RESET
   and Chromium logs "Failed to load resource" — so the same unchanged build failed
   one run and passed the next.

   A failed fetch of a decorative background on an approved external host is a fact
   about this network, not a defect in a component, so it is filtered. Scoping it is
   fiddlier than it looks: Chromium's console text for a failed subresource is
   "Failed to load resource: net::ERR_CONNECTION_RESET" and carries NO url, so a
   filter written against the message alone would swallow every reset on the page,
   from any host. So the message is only ever suppressed when a request to that host
   actually failed in the same page — which the `requestfailed` event does name.
   The decision is deferred to the end of each case so it cannot depend on whether
   the console line or the request event arrives first. What was filtered is counted
   and printed, so a run that suppressed something says so. */
const OFFLINE_HOST = "ik.imagekit.io";
const suppressed = [];
const isResourceLoadError = (text) =>
  /Failed to load resource/i.test(text) &&
  /ERR_(CONNECTION_RESET|CONNECTION_CLOSED|TIMED_OUT|NAME_NOT_RESOLVED|FAILED|ABORTED)/.test(text);

for (const c of CASES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on("pageerror", (e) => errors.push(`${c.name}: ${e}`));
  /* Refused up front for the reason written at the top of this file: an unreachable
     host that fails at a DIFFERENT moment each run moves layout while the gate is
     measuring, and that is what made this gate count 81 controls in one run and 80
     in the next on an unchanged build. Refusing it makes the failure identical
     every time. */
  await page.route(new RegExp(OFFLINE_HOST.replace(".", "\\.")), (r) => r.abort());
  let offlineHostFailed = false;
  const undecided = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const text = m.text();
    if (isResourceLoadError(text)) { undecided.push(text); return; }
    errors.push(`${c.name}: ${text}`);
  });
  page.on("requestfailed", (r) => {
    if (r.url().includes(OFFLINE_HOST)) offlineHostFailed = true;
  });
  await page.goto(`${URL}#${c.id}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  /* ── 1 + 2. every control exists, is reachable, and changes something ── */
  for (const k of c.controls ?? []) {
    const target = page.locator(k.click).first();
    if (!(await target.count())) { failures.push(`${c.name}: no control for ${k.what} (${k.click})`); continue; }

    /* a control the keyboard cannot reach is a picture of a control */
    const focusable = await target.evaluate((el) => {
      const t = el.tagName.toLowerCase();
      const ti = el.getAttribute("tabindex");
      return t === "button" || t === "input" || t === "a" || (ti !== null && ti !== "-1") || el.getAttribute("role") === "radio";
    });
    if (!focusable) failures.push(`${c.name}: ${k.what} cannot be reached by keyboard`);

    const before = k.appears || k.exists ? null : await read(page, k.watch, k.attr);
    await target.scrollIntoViewIfNeeded();
    await target.click({ force: true });
    await page.waitForTimeout(220);

    if (k.appears) {
      if (!(await page.locator(k.appears).count())) failures.push(`${c.name}: ${k.what} pressed and ${k.appears} never appeared`);
    } else if (k.exists) {
      if (!(await page.locator(k.watch).count())) failures.push(`${c.name}: ${k.what} pressed and nothing became selected`);
    } else {
      const after = await read(page, k.watch, k.attr);
      if (after === before) {
        failures.push(`${c.name}: ${k.what} pressed and ${k.attr ?? "the text"} stayed at "${before}" — the control does nothing`);
      }
    }
    operated += 1;
  }

  /* ── typing: a field drawn is a field that must accept text ── */
  if (c.typing) {
    const before = await read(page, c.typing.watch);
    await page.locator(c.typing.field).fill("does this field work");
    const typed = await page.locator(c.typing.field).inputValue();
    if (typed !== "does this field work") failures.push(`${c.name}: the assistant field did not take the text`);
    await page.locator(c.typing.send).click();
    await page.waitForTimeout(220);
    if (await read(page, c.typing.watch) === before) failures.push(`${c.name}: sending changed nothing`);
    operated += 1;
  }

  /* ── search: a magnifier drawn is a filter that must filter ── */
  if (c.search) {
    const before = await read(page, c.search.watch, c.search.attr);
    await page.locator(c.search.field).fill("cardio");
    await page.waitForTimeout(220);
    const after = await read(page, c.search.watch, c.search.attr);
    if (after === before) failures.push(`${c.name}: the roster search did not narrow the list (${before} → ${after})`);
    if (Number(after) >= Number(before)) failures.push(`${c.name}: search widened or held the list: ${before} → ${after}`);
    operated += 1;
  }

    /* ── 4. a control smaller than the finger meant to hit it ──────────────────
     WCAG 2.5.8 asks for 24x24 CSS px, and `better-accessibility` raises it to 44
     for a primary action. This harness measured whether a control could be
     *reached* and whether it *did* something, and never whether it could be
     *hit* — which is the failure a keyboard test can never see. Exempt: a control
     inside a line of text (an inline link), and one with enough clear space
     around it, both of which the criterion itself exempts. */
  const small = await page.evaluate(() => {
    const out = [];
    const TARGETS = 'button, [role="radio"], [role="switch"], [role="tab"], a[href], input, select, textarea';
    /* Every target's centre, so the criterion's SPACING exception can actually be
       evaluated. This comment has promised "one with enough clear space" since the
       gate was written and never implemented it — which is how the tilt card's
       75x21 "View more" button, the author's own 12px text link with a hundred
       pixels of air around it, came out as a failure. WCAG 2.5.8 exempts an
       undersized target whose 24px-diameter circle does not intersect any other
       target's: two centres 24px apart or more cannot overlap. */
    const centres = [...document.querySelectorAll(TARGETS)].map((n) => {
      const r = n.getBoundingClientRect();
      return { n, cx: r.left + r.width / 2, cy: r.top + r.height / 2, has: r.width > 0 && r.height > 0 };
    }).filter((c) => c.has);
    const crowded = (el) => {
      const me = centres.find((c) => c.n === el);
      if (!me) return false;
      return centres.some((c) => c.n !== el && Math.hypot(c.cx - me.cx, c.cy - me.cy) < 24);
    };
    for (const el of document.querySelectorAll(TARGETS)) {
      const r = el.getBoundingClientRect();
      if (el.closest('p, li, bdi')) continue;
      /* A 0x0 box normally means "not rendered", and skipping it is right almost
         always — including for the command palette's own search field, which is
         0x0 while the palette is closed and which the first version of this
         exception failed in every section. The one case worth keeping is a 0x0
         input with NO label at all: `appearance: none` on a radio measures 0x0
         and is still the live control, so if nothing is associated with it there
         is no hit target anywhere. Labelled 0x0 inputs are their label's problem
         and their label is measured on its own elsewhere. */
      if ((!r.width || !r.height) && !(el.tagName === 'INPUT' && !(el.labels?.length ?? 0))) continue;

      if (Math.min(r.width, r.height) < 24) {
        /* Recognise the PATTERN, not one technique. This began as a clip-path
           test, missed a control hidden with `opacity: 0` at 1x1 (the folder's
           toggle), then missed `clip: rect(0 0 0 0)` — the legacy sr-only, which
           is what the juicy switch uses — and missed `appearance: none`, which
           hides by painting nothing at all. Four spellings of one intention: an
           input made invisible, whose real target is its label.

           The label is found with `el.labels`, not `el.closest('label')`. The
           first version only looked upward, so it demanded a WRAPPING label and
           failed ten controls whose label is a sibling joined by `for` — the
           same association and the same hit target. The DOM already answers
           this; the harness was asking a narrower question.

           And this whole branch sits INSIDE the size test, which is deliberate:
           written the other way round it demanded a label of every hidden input
           at any size and failed seven sections on an `input.sr-only[type=file]`
           that is 776x44 and had always passed on its own size. */
        const cs = el.tagName === 'INPUT' ? getComputedStyle(el) : null;
        if (cs && (cs.clipPath.startsWith('inset(50%') || +cs.opacity === 0
                   || cs.clip.startsWith('rect(') || cs.appearance === 'none')) {
          const boxes = [...(el.labels ?? [])].map((l) => l.getBoundingClientRect());
          const best = boxes.sort((a, b) => Math.min(b.width, b.height) - Math.min(a.width, a.height))[0];
          if (best && Math.min(best.width, best.height) >= 24) continue;
          out.push(best
            ? `label ${Math.round(best.width)}x${Math.round(best.height)} for a hidden input`
            : 'hidden input with no <label> to hit');
          continue;
        }
        /* The spacing exception: undersized but with clear space around it is
           what the criterion permits. Undersized AND crowded is what it forbids. */
        if (!crowded(el)) continue;
        out.push(`${el.tagName.toLowerCase()}${el.getAttribute('data-day') !== null ? '[data-day]' : ''} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30)}" (and crowded: another target within 24px)`);
      }
    }
    return out;
  });
  if (small.length) failures.push(`${c.name}: ${small.length} control(s) under 24x24 CSS px: ${small.slice(0, 3).join(" | ")}`);

  /* ── 5. a checkbox drawn as a shape ───────────────────────────────────────
     The imported bookmark is a real <input type="checkbox"> hidden behind a
     drawn shape, and the upload hid it with `display: none` — which does not
     hide a checkbox, it deletes it: unfocusable, out of the tab order, out of
     the accessibility tree, operable by mouse alone. That is the exact defect
     class this harness exists for, so it gets a gate rather than a paragraph.
     Focus it, press Space, and the checked state must flip both ways. */
  for (const sel of c.toggles ?? []) {
    const el = page.locator(sel).first();
    if (!(await el.count())) { failures.push(`${c.name}: no toggle at ${sel}`); continue; }
    const reached = await el.evaluate((n) => { n.focus(); return document.activeElement === n; });
    if (!reached) { failures.push(`${c.name}: ${sel} cannot take focus — a keyboard cannot operate it`); continue; }
    const before = await el.isChecked();
    await page.keyboard.press("Space");
    await page.waitForTimeout(120);
    if (await el.isChecked() === before) failures.push(`${c.name}: Space did not flip ${sel}`);
    await page.keyboard.press("Space");
    await page.waitForTimeout(120);
    if (await el.isChecked() !== before) failures.push(`${c.name}: Space did not flip ${sel} back`);
    operated += 1;
  }

  for (const sel of c.exclusive ?? []) {
    const group = page.locator(sel);
    const n = await group.count();
    if (n < 2) { failures.push(`${c.name}: fewer than two radios at ${sel}`); continue; }
    for (let i = 0; i < n; i += 1) {
      await group.nth(i).evaluate((el) => { el.click(); });
      await page.waitForTimeout(60);
      const checked = await group.evaluateAll((els) => els.map((e) => e.checked));
      const on = checked.filter(Boolean).length;
      if (on !== 1) { failures.push(`${c.name}: ${sel} has ${on} radios checked at once — the group does not exclude`); break; }
      if (!checked[i]) { failures.push(`${c.name}: ${sel} clicking radio ${i} did not check it`); break; }
    }
    operated += 1;
  }

  /* ── 6. a control clipped out of existence by its own ancestor ────────────
     The reset-password card shipped a "Reset Password" button that sat 39.5px
     BELOW the 230px card containing it, and the card carries `overflow: hidden`
     — so the card's only action was invisible and unclickable. Nothing else here
     could see it: the button has a name (axe is happy), a 180x30 box (the target
     gate is happy), and it takes focus and fires (the control gates are happy).
     It is simply not on screen.

     So: for every interactive element, walk its ancestors, and if a clipping
     ancestor's box does not contain it, that is a failure. A few pixels of
     rounding are allowed; being outside by more than a quarter of the element's
     own size is not. Elements that are deliberately parked outside a clip and
     brought in on hover — the GET STARTED arrow, the delete tooltip — are not
     interactive themselves, which is why this walks controls and not every box. */
  /* Third shape, and the reason is timing. A disclosure opens with a TRANSITION —
     the flex product card grows over 0.4s — so focusing a clipped control and
     measuring in the same synchronous pass reads the card mid-expansion and
     reports a failure that resolves 400ms later. The candidates are therefore
     collected first, then focused and re-measured one at a time with a wait, in
     Node rather than in the page.

     The question this settles: a control clipped at rest is a disclosure if
     focusing it brings it into view, and a defect if it does not. The
     reset-password button is the second kind — nothing reveals it. */
  const candidates = await page.evaluate(() => {
    const out = [];
    let n = 0;
    for (const el of document.querySelectorAll('button, a[href], input, select, textarea, [role="radio"], [role="switch"], [role="tab"]')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const own = getComputedStyle(el);
      if (own.clipPath.startsWith('inset(50%') || +own.opacity === 0 || own.clip.startsWith('rect(')) continue;
      /* `inert` is not a hidden control, it is a control that HAS BEEN WITHDRAWN.
         The subtree is out of the tab order and out of the accessibility tree, so
         "clipped and focus does not reveal it" is not a defect there — it is the
         declared intent, and `el.focus()` is a no-op by specification. This gate
         predates the attribute and reported a collapsed tree folder's four buttons
         the day one arrived. `closest` and not a computed style because inertness
         is inherited through the DOM, not through the cascade. */
      if (el.closest('[inert]')) continue;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (!/hidden|clip/.test(cs.overflowX + cs.overflowY)) continue;
        const pr = p.getBoundingClientRect();
        if (!pr.width || !pr.height) continue;
        const visibleLabel = [...(el.labels ?? [])].some((l) => {
          const lr = l.getBoundingClientRect();
          return lr.width && lr.height && lr.top >= pr.top - 1 && lr.bottom <= pr.bottom + 1
            && lr.left >= pr.left - 1 && lr.right <= pr.right + 1;
        });
        if (visibleLabel) continue;
        const outside = Math.max(0, pr.top - r.bottom, r.top - pr.bottom, pr.left - r.right, r.left - pr.right);
        const over = Math.max(0, r.bottom - pr.bottom, pr.top - r.top, r.right - pr.right, pr.left - r.left);
        if (outside > 0 || over > Math.max(4, Math.min(r.width, r.height) / 4)) {
          /* Only the element is marked. The clipping ancestor is re-derived on
             the second pass by walking up again — marking it broke as soon as two
             candidates shared one parent, which the flex card's two buttons do. */
          const mark = `clip-probe-${n++}`;
          el.setAttribute('data-clip-probe', mark);
          out.push({ mark, label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24),
                     tag: el.tagName.toLowerCase(), parent: `${p.tagName.toLowerCase()}.${(p.className || '').toString().split(' ')[0]}` });
          break;
        }
      }
    }
    return out;
  });

  const clipped = [];
  for (const c of candidates) {
    await page.evaluate((mark) => {
      const el = document.querySelector(`[data-clip-probe="${mark}"]`);
      el.focus({ preventScroll: true });
    }, c.mark);
    /* Long enough for a disclosure's own transition; the flex card's is 0.4s. */
    await page.waitForTimeout(650);
    const gap = await page.evaluate((mark) => {
      const el = document.querySelector(`[data-clip-probe="${mark}"]`);
      let p = el.parentElement;
      while (p) {
        const cs = getComputedStyle(p);
        const pb = p.getBoundingClientRect();
        if (/hidden|clip/.test(cs.overflowX + cs.overflowY) && pb.width && pb.height) break;
        p = p.parentElement;
      }
      if (!p) return 0;
      const r = el.getBoundingClientRect(), pr = p.getBoundingClientRect();
      const o = Math.max(0, pr.top - r.bottom, r.top - pr.bottom, pr.left - r.right, r.left - pr.right);
      const v = Math.max(0, r.bottom - pr.bottom, pr.top - r.top, r.right - pr.right, pr.left - r.left);
      return o > 0 || v > Math.max(4, Math.min(r.width, r.height) / 4) ? Math.round(Math.max(o, v)) : 0;
    }, c.mark);
    if (gap) clipped.push(`${c.tag} "${c.label}" is ${gap}px outside a clipping ${c.parent}, and focusing it does not reveal it`);
    operated += 1;
  }

  if (clipped.length) failures.push(`${c.name}: ${clipped.length} control(s) clipped by an ancestor: ${clipped.slice(0, 3).join(" | ")}`);
  operated += 1;

  /* ── 3. the arrow that moves forward follows the writing direction ── */
  if (c.keyboard) {
    for (const dir of ["rtl", "ltr"]) {
      await page.evaluate((d) => { document.documentElement.dir = d; }, dir);
      await page.waitForTimeout(200);
      /* The probe followed `aria-selected` because the first family it was written
         for was a grid. A radio group states itself with `aria-checked`, and a
         harness that insists on the grid's attribute would be pushing components
         towards the wrong ARIA pattern to satisfy the test. So the state
         attribute is the case's to declare. */
      const state = c.keyboard.state ?? "aria-selected";
      const cell = page.locator(`${c.keyboard.group} ${c.keyboard.cell}[${state}="true"]`).first();
      await cell.focus();
      const before = await read(page, c.keyboard.group, c.keyboard.attr);
      /* forward is ArrowLeft in Arabic and ArrowRight in English */
      await page.keyboard.press(dir === "rtl" ? "ArrowLeft" : "ArrowRight");
      await page.waitForTimeout(200);
      const after = await read(page, c.keyboard.group, c.keyboard.attr);
      if (after === before) failures.push(`${c.name} ${dir}: the forward arrow moved nothing`);
      /* and going back must return to where it started */
      await page.keyboard.press(dir === "rtl" ? "ArrowRight" : "ArrowLeft");
      await page.waitForTimeout(200);
      if (await read(page, c.keyboard.group, c.keyboard.attr) !== before) {
        failures.push(`${c.name} ${dir}: back did not undo forward`);
      }
      operated += 1;
    }
    await page.evaluate(() => { document.documentElement.dir = "rtl"; });
  }

  /* Decided here, once the case is done, so event order cannot change the verdict. */
  for (const text of undecided) {
    if (offlineHostFailed) suppressed.push(`${c.name}: ${text.slice(0, 58)}`);
    else errors.push(`${c.name}: ${text}`);
  }

  await page.close();
}

/* ── The library's own tablist, by keyboard alone ────────────────────────────
   `tabIndex={-1}` on the unselected tabs is what a tablist is supposed to do: it
   keeps Tab from walking through forty-five items. But it is only half of the
   pattern, and for a long time this repository shipped the half: measured, the
   picker had 45 tabs, ONE reachable by Tab, and ArrowDown, ArrowUp, Home and End
   moved nothing at all. A keyboard user could reach exactly one of forty-five
   sections and could never leave it.

   Nothing in the harness could see it. Every other check here CLICKS, and clicking
   worked perfectly — the defect lived entirely in the one interaction no gate
   performed. So this block performs it, and asserts the panel followed: focus
   moving without the panel changing would be the same half-built pattern again. */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on("pageerror", (e) => errors.push(`tablist: ${e}`));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.locator("#madar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  const state = () => page.evaluate(() => {
    const tabs = [...document.querySelectorAll('.madar-picker-list [role="tab"]')];
    return {
      tabs: tabs.length,
      focused: tabs.indexOf(document.activeElement),
      selected: tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"),
      panel: document.querySelector('.madar-stage[role="tabpanel"]')?.id ?? "",
    };
  });

  const first = page.locator('.madar-picker-list [role="tab"][tabindex="0"]').first();
  if (!(await first.count())) {
    failures.push("tablist: no tab carries tabindex=0, so the picker has no keyboard entry point");
  } else {
    await first.focus();
    const at = await state();
    if (at.focused !== at.selected) failures.push(`tablist: focus (${at.focused}) and selection (${at.selected}) disagree at rest`);

    for (const [key, expect] of [["ArrowDown", 1], ["End", "last"], ["Home", 0]]) {
      const before = await state();
      await page.keyboard.press(key);
      await page.waitForTimeout(400);
      const after = await state();
      const want = expect === "last" ? after.tabs - 1 : expect;
      if (after.focused !== want) failures.push(`tablist: ${key} put focus at ${after.focused}, expected ${want}`);
      if (after.selected !== want) failures.push(`tablist: ${key} left selection at ${after.selected}, expected ${want}`);
      if (after.panel === before.panel) failures.push(`tablist: ${key} moved the tab and the panel stayed "${before.panel}"`);
      operated += 1;
    }
  }
  await page.close();
}

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
for (const e of [...new Set(errors)]) console.log(`  ERROR ${e}`);
console.log(`OPERATED=${operated} interactions`);
console.log(
  /* Distinct messages, not occurrences: the occurrence count tallies renders rather
     than causes and drifts between runs on an unchanged build. */
  `OFFLINE_ASSET_ERRORS=${
    suppressed.length
      ? `${new Set(suppressed.map((x) => x.split(": ").slice(1).join(": "))).size} distinct, refused and filtered (${OFFLINE_HOST}, named allowance)`
      : "none"
  }`,
);
console.log(`OPERABLE_FAILURES=${failures.length}`);
console.log(`OPERABLE=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
