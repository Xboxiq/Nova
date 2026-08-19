/**
 * The dispatch family's whole claim is that nothing about the money or the
 * grouping is typed — the delivery follows from the address, the surcharge from
 * the distance band, the discount from the customer's rate, and the loads from
 * the transfers. So the checks are all the same shape: change the input, and see
 * whether the *drawing* moved.
 *
 * The strongest of them is the last: the segment widths on screen must sum to
 * the fee the component prints. A bar that says one thing while the number says
 * another is worse than no bar, and the only way to catch it is to measure both
 * (§22).
 *
 * Run `npm run build` first.
 *
 *   node tools/qa/dispatch-qa.mjs
 */
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";

const PORT = 4447;
const URL = `http://localhost:${PORT}/`;

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
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1360, height: 1100 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(`${URL}#madar-dispatch`, { waitUntil: "networkidle" });
await page.waitForSelector("[data-dispatch-group]", { timeout: 15000 });

// ── the grouping is derived: five orders, two deliveries, four under one brace
const group = await page.evaluate(() => {
  const root = document.querySelector("[data-dispatch-group]");
  const deliveries = [...root.querySelectorAll("[data-delivery]")].map((d) => ({
    orders: Number(d.dataset.delivery),
    brace: d.querySelector("[data-brace]")?.dataset.brace,
    braceHeight: Math.round(d.querySelector("[data-brace]").getBoundingClientRect().height),
    rowsHeight: Math.round([...d.querySelectorAll("[data-order]")].reduce((h, r) => h + r.getBoundingClientRect().height, 0)),
  }));
  return { deliveries, orders: root.querySelectorAll("[data-order]").length };
});

if (group.orders !== 5) failures.push(`expected five orders drawn, found ${group.orders}`);
if (group.deliveries.length !== 2) failures.push(`expected two deliveries derived from two addresses, found ${group.deliveries.length}`);
const grouped = group.deliveries.find((d) => d.orders > 1);
const alone = group.deliveries.find((d) => d.orders === 1);
if (!grouped || grouped.orders !== 4) failures.push(`the shared address should carry four orders, carries ${grouped?.orders}`);
if (!alone) failures.push("the order at its own address should stand outside the brace");
// a brace around one thing claims a grouping that is not there
if (alone && alone.brace !== "single") failures.push(`the lone order draws a ${alone.brace} brace`);
if (grouped && grouped.brace !== "group") failures.push(`the shared delivery draws a ${grouped.brace} brace`);
// the brace has to actually span the rows it claims
if (grouped && grouped.braceHeight < grouped.rowsHeight) {
  failures.push(`the brace is ${grouped.braceHeight}px over ${grouped.rowsHeight}px of orders, so it does not span them`);
}

// ── "double" is drawn as double: the surcharge segment equals the base segment
const fee = await page.evaluate(() => {
  const bar = document.querySelector("[data-fee]");
  const track = bar.querySelector("[data-seg=base]").parentElement.getBoundingClientRect();
  /* The *visible* width, not the laid-out one. The first version of this check
     read getBoundingClientRect directly and passed while `overflow: hidden` was
     clipping the discount segment off the end of the track entirely — the box
     was 20% wide and none of it was painted. Intersecting with the track is what
     turns "it exists in layout" into "a reader can see it". */
  const w = (sel) => {
    const el = bar.querySelector(sel);
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return Math.max(0, Math.min(r.right, track.right) - Math.max(r.left, track.left));
  };
  const text = (sel) => bar.querySelector(sel)?.textContent ?? "";
  return {
    base: w("[data-seg=base]"),
    surcharge: w("[data-seg=surcharge]"),
    discount: w("[data-seg=discount]"),
    track: track.width,
    /* laid out vs painted, kept apart on purpose */
    discountLaidOut: bar.querySelector("[data-seg=discount]")?.getBoundingClientRect().width ?? 0,
    total: text("[data-total]"),
    ref: !!bar.querySelector("[data-ref=undiscounted]"),
    hatched: bar.querySelector("[data-seg=discount]")?.classList.contains("madar-hatch"),
  };
});

const ratio = fee.surcharge / fee.base;
if (Math.abs(ratio - 1) > 0.02) {
  failures.push(`the far band doubles the fee, so the surcharge must be as long as the base — it is ${ratio.toFixed(2)}×`);
}
if (fee.base + fee.surcharge < fee.track - 1.5) {
  failures.push(`base + surcharge is ${Math.round(fee.base + fee.surcharge)}px of a ${Math.round(fee.track)}px track, so the bar is not scaled to the undiscounted fee`);
}
if (!fee.discount) failures.push("the discount is not drawn at all");
if (fee.discountLaidOut - fee.discount > 1) {
  failures.push(`the discount is ${Math.round(fee.discountLaidOut)}px wide but only ${Math.round(fee.discount)}px of it is inside the track, so the rest is clipped away`);
}
if (!fee.hatched) failures.push("the discount is drawn solid, which claims a charge that was never made");
if (!fee.ref) failures.push("no drawn reference for where the fee would have ended undiscounted");

// the drawn discount is the stated percentage of the drawn fee
const discountShare = fee.discount / (fee.base + fee.surcharge);
if (Math.abs(discountShare - 0.2) > 0.02) {
  failures.push(`the 20% rate should take a fifth of the bar; it takes ${(discountShare * 100).toFixed(1)}%`);
}

// ── the cash at the door is not the order total: prepaid contributes nothing
const cash = await page.evaluate(() => {
  const root = document.querySelector("[data-dispatch-group]");
  return [...root.querySelectorAll("[data-delivery]")].map((d) => ({
    orders: [...d.querySelectorAll("[data-order]")].map((o) => ({
      pay: o.querySelector("[data-pay]").dataset.pay,
      amount: Number(o.querySelector("[data-pay]").textContent.replace(/[^0-9]/g, "")),
      hatched: o.querySelector("[data-pay]").classList.contains("madar-hatch"),
    })),
    cash: Number(d.querySelector("[data-cash]").dataset.cash),
  }));
});
const FEE = 3000; // 1500 base x2 far band, collected once per door
for (const d of cash) {
  const cod = d.orders.filter((o) => o.pay === "cod");
  const expected = cod.length ? cod.reduce((t, o) => t + o.amount, 0) + FEE : 0;
  if (d.cash !== expected) failures.push(`cash at the door is ${d.cash}, but the unpaid goods plus one fee come to ${expected}`);
  for (const o of d.orders) {
    if ((o.pay === "prepaid") !== o.hatched) {
      failures.push(`a ${o.pay} amount is drawn ${o.hatched ? "hatched" : "solid"}, which claims the wrong thing about cash in hand`);
    }
  }
}
const anyPrepaidDoor = cash.find((d) => d.orders.some((o) => o.pay === "prepaid") && d.orders.some((o) => o.pay === "cod"));
if (!anyPrepaidDoor) failures.push("no door mixes prepaid and unpaid orders, so the derivation is not actually demonstrated");

// ── the handoff moves load between rows, and marks the gap it left
const before = await page.evaluate(() =>
  [...document.querySelectorAll("[data-courier]")].map((c) => ({
    id: c.dataset.courier, load: Number(c.dataset.load), cash: Number(c.dataset.cash),
  })));

await page.locator('[data-handoff] [data-target="هند"]').click();
await page.waitForTimeout(200);

const after = await page.evaluate(() => ({
  loads: [...document.querySelectorAll("[data-courier]")].map((c) => ({ id: c.dataset.courier, load: Number(c.dataset.load) })),
  left: document.querySelectorAll('[data-stub="left"]').length,
  gained: document.querySelectorAll('[data-stub="gained"]').length,
  leftHatched: [...document.querySelectorAll('[data-stub="left"]')].every((s) => s.classList.contains("madar-hatch")),
}));

const load = (rows, id) => rows.find((r) => r.id === id)?.load;
if (load(after.loads, "سالم") !== load(before, "سالم") - 1) {
  failures.push(`the sending courier's load should fall by one: ${load(before, "سالم")} → ${load(after.loads, "سالم")}`);
}
if (load(after.loads, "هند") !== load(before, "هند") + 1) {
  failures.push(`the receiving courier's load should rise by one: ${load(before, "هند")} → ${load(after.loads, "هند")}`);
}
const total = (rows) => rows.reduce((s, r) => s + r.load, 0);
if (total(after.loads) !== total(before)) failures.push(`a transfer created or destroyed load: ${total(before)} → ${total(after.loads)}`);
if (after.left !== 1) failures.push(`the gap the order left should be drawn once, drawn ${after.left} times`);
if (!after.leftHatched) failures.push("the gap it left is drawn solid, so it still reads as a load");
if (after.gained !== 1) failures.push(`the received order should be drawn as gained, found ${after.gained}`);

// ── the money moved with the order, and the split door is drawn
const afterCash = await page.evaluate(() => ({
  rows: [...document.querySelectorAll("[data-courier]")].map((c) => ({
    id: c.dataset.courier, cash: Number(c.dataset.cash), splits: Number(c.dataset.splits),
  })),
  drawn: document.querySelectorAll("[data-split-door]").length,
}));
const cashOf = (rows, id) => rows.find((r) => r.id === id)?.cash;
/* A-4473 is the prepaid one, so the order the test moves carries no cash — and
   that is the point: the liability follows the money, not the parcel. The rows
   that do hold cash must be unchanged by moving a prepaid order. */
if (cashOf(afterCash.rows, "سالم") !== cashOf(before, "سالم")) {
  failures.push(`moving a prepaid order changed the sender's cash: ${cashOf(before, "سالم")} → ${cashOf(afterCash.rows, "سالم")}`);
}
const totalCash = (rows) => rows.reduce((t, r) => t + r.cash, 0);
if (totalCash(afterCash.rows) !== totalCash(before)) {
  failures.push(`a transfer created or destroyed cash: ${totalCash(before)} → ${totalCash(afterCash.rows)}`);
}
if (afterCash.rows.reduce((t, r) => t + r.splits, 0) === 0) {
  failures.push("taking one order out of a four-order door did not register as a split door");
}
if (afterCash.drawn < 2) {
  failures.push(`a split door involves two couriers, so it is drawn on both rows — drawn on ${afterCash.drawn}`);
}

// putting it back is a removal, not a second ledger
await page.locator('[data-handoff] button:has-text("أعِده")').click();
await page.waitForTimeout(200);
const restored = await page.evaluate(() => ({
  loads: [...document.querySelectorAll("[data-courier]")].map((c) => ({
    id: c.dataset.courier, load: Number(c.dataset.load), cash: Number(c.dataset.cash),
  })),
  left: document.querySelectorAll('[data-stub="left"]').length,
  splits: document.querySelectorAll("[data-split-door]").length,
  cash: [...document.querySelectorAll("[data-courier]")].map((c) => Number(c.dataset.cash)),
}));
if (restored.splits !== 0) failures.push(`${restored.splits} split-door marks survive the undo`);
if (JSON.stringify(restored.loads) !== JSON.stringify(before)) failures.push("undoing the transfer did not restore the original loads");
if (JSON.stringify(restored.cash) !== JSON.stringify(before.map((r) => r.cash))) {
  failures.push(`undoing the transfer left the cash at ${restored.cash.join("/")} instead of ${before.map((r) => r.cash).join("/")}`);
}
if (restored.left !== 0) failures.push(`${restored.left} gap(s) still drawn after the undo`);

// ── the run: the delay is split into inherited and own, and it propagates
const run = await page.evaluate(() => {
  const root = document.querySelector("[data-run]");
  const stops = [...root.querySelectorAll("[data-stop]")].map((li) => ({
    n: Number(li.dataset.stop),
    own: Number(li.dataset.own),
    inherited: Number(li.dataset.inherited),
    done: li.dataset.done !== undefined,
    within: li.querySelector("[data-seg=within]")?.getBoundingClientRect().width ?? 0,
    withinHatched: li.querySelector("[data-seg=within]")?.classList.contains("madar-hatch"),
    overrun: li.querySelector("[data-seg=overrun]")?.getBoundingClientRect().width ?? 0,
    inheritedHatched: li.querySelector("[data-seg=inherited]")?.classList.contains("madar-hatch"),
    tick: !!li.querySelector("[data-tick]"),
  }));
  return { stops, behind: Number(root.querySelector("[data-behind]").dataset.behind), verdict: root.querySelector("[data-verdict]").dataset.verdict };
});

// lateness accumulates: each stop inherits the sum of the overruns before it
let carry = 0;
for (const stop of run.stops) {
  if (stop.inherited !== carry) failures.push(`stop ${stop.n} inherited ${stop.inherited} min, but the stops before it lost ${carry}`);
  if (stop.done) carry += stop.own;
  if (!stop.tick) failures.push(`stop ${stop.n} draws no promise reference, so "late" has nothing to be late against`);
  // a plan drawn solid claims a reading nobody took
  if (stop.done === stop.withinHatched) {
    failures.push(`stop ${stop.n} is ${stop.done ? "measured" : "unreached"} but drawn ${stop.withinHatched ? "hatched" : "solid"}`);
  }
  if (stop.inherited > 0 && !stop.inheritedHatched) {
    failures.push(`stop ${stop.n} draws inherited delay solid, which blames it for time lost at another door`);
  }
  if (stop.own > 0 && stop.overrun <= 0) failures.push(`stop ${stop.n} is ${stop.own} min over but draws no overrun`);
  if (stop.own <= 0 && stop.overrun > 0) failures.push(`stop ${stop.n} draws an overrun it did not have`);
}
if (run.behind !== carry) failures.push(`the run reports ${run.behind} min behind, the stops account for ${carry}`);
const worst = run.stops.filter((s) => s.done).reduce((w, s) => (!w || s.own > w.own ? s : w), null);
if (worst && worst.own > 0 && run.verdict !== "stop") failures.push("a stop overran its promise but the verdict does not name one");
/* The overrun and the promise are lengths on one scale, so their ratio on screen
   must be their ratio in minutes — a bar that exaggerates lateness is as wrong as
   one that hides it. Checked against the stop's own numbers rather than a
   constant, because the stops differ. */
const PROMISE = { 1: 18, 2: 12, 3: 15, 4: 20, 5: 14 };
for (const stop of run.stops) {
  if (stop.own <= 0 || !stop.within) continue;
  const drawn = stop.overrun / stop.within;
  const real = stop.own / PROMISE[stop.n];
  if (Math.abs(drawn - real) > 0.03) {
    failures.push(`stop ${stop.n} draws its overrun at ${drawn.toFixed(2)}x its promise but it is ${real.toFixed(2)}x`);
  }
}

// ── the money follows a COD order, which is the claim the prepaid case cannot make
await page.locator('[data-handoff] [role="radio"][aria-label*="A-4471"]').click();
await page.locator('[data-handoff] [data-target="كاظم"]').click();
await page.waitForTimeout(200);
const codMove = await page.evaluate(() =>
  [...document.querySelectorAll("[data-courier]")].map((c) => ({ id: c.dataset.courier, cash: Number(c.dataset.cash) })));
const AMOUNT = 1800; // A-4471, cash on delivery
if (cashOf(codMove, "سالم") !== cashOf(before, "سالم") - AMOUNT) {
  failures.push(`the sender's cash should fall by ${AMOUNT}: ${cashOf(before, "سالم")} → ${cashOf(codMove, "سالم")}`);
}
if (cashOf(codMove, "كاظم") !== cashOf(before, "كاظم") + AMOUNT) {
  failures.push(`the receiver's cash should rise by ${AMOUNT}: ${cashOf(before, "كاظم")} → ${cashOf(codMove, "كاظم")}`);
}
if (totalCash(codMove) !== totalCash(before)) {
  failures.push(`moving a COD order changed the total cash: ${totalCash(before)} → ${totalCash(codMove)}`);
}
await page.locator('[data-handoff] button:has-text("أعِده")').click();
await page.waitForTimeout(200);

// ── keyboard: the arrows follow the writing direction
await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').focus();
const first = await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').getAttribute("aria-label");
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(120);
const second = await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').getAttribute("aria-label");
if (first === second) failures.push("ArrowLeft did not move the selection in RTL");

/* ── the run's segments run along the writing direction, and the promise tick
      lands exactly on the within/overrun boundary. Measured in both directions
      because a physical `left` would pass in one and lie in the other — the
      failure mode logical properties exist to prevent, and the only way to know
      they were used is to measure the drawing. */
const geometry = async () =>
  page.evaluate(() => {
    const rtl = getComputedStyle(document.documentElement).direction === "rtl";
    const li = [...document.querySelectorAll("[data-stop]")].find((l) => Number(l.dataset.own) > 0 && Number(l.dataset.inherited) > 0);
    if (!li) return null;
    const track = li.querySelector("[data-seg=within]").parentElement.getBoundingClientRect();
    /* distance from the *inline start* edge, so one expectation covers both */
    const from = (el) => {
      const r = el.getBoundingClientRect();
      return rtl ? Math.round(track.right - r.right) : Math.round(r.left - track.left);
    };
    const seg = (n) => { const e = li.querySelector(`[data-seg=${n}]`); return e ? { at: from(e), w: Math.round(e.getBoundingClientRect().width) } : null; };
    return { rtl, inherited: seg("inherited"), within: seg("within"), overrun: seg("overrun"), tick: from(li.querySelector("[data-tick]")) };
  });

for (const dir of ["rtl", "ltr"]) {
  if (dir === "ltr") {
    await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.lang = "en"; });
    await page.waitForTimeout(250);
  }
  const g = await geometry();
  if (!g) { failures.push("no stop carries both an inherited and an own delay, so the split is untested"); continue; }
  if (g.inherited.at !== 0) failures.push(`${dir}: the inherited delay does not start at the row's inline start (${g.inherited.at}px in)`);
  if (g.within.at !== g.inherited.w) failures.push(`${dir}: the promised duration starts at ${g.within.at}px, not after the ${g.inherited.w}px it inherited`);
  if (g.overrun.at !== g.inherited.w + g.within.w) failures.push(`${dir}: the overrun does not begin where the promise ends`);
  // the reference has to sit on the boundary it claims, within a pixel of rounding
  if (Math.abs(g.tick - (g.inherited.w + g.within.w)) > 1) {
    failures.push(`${dir}: the promise tick is at ${g.tick}px but the promise ends at ${g.inherited.w + g.within.w}px`);
  }
}

const ltrOverflow = await page.evaluate(() => {
  const el = document.querySelector("[data-dispatch-group]");
  return el.scrollWidth - el.clientWidth;
});
if (ltrOverflow > 1) failures.push(`the group overflows its own box by ${ltrOverflow}px in LTR`);

await browser.close();

for (const f of failures) console.log(`  FAIL ${f}`);
for (const e of [...new Set(errors)]) console.log(`  ERROR ${e}`);
console.log(`DISPATCH_DELIVERIES=${group.deliveries.length} from ${group.orders} orders`);
console.log(`DISPATCH_DOUBLE=${ratio.toFixed(2)}x`);
console.log(`DISPATCH_DISCOUNT=${(discountShare * 100).toFixed(1)}%`);
console.log(`DISPATCH_CASH=${cash.map((d) => d.cash).join("/")}`);
console.log(`DISPATCH_BEHIND=${run.behind} min, verdict ${run.verdict}`);
console.log(`DISPATCH_FAILURES=${failures.length}`);
console.log(`DISPATCH_CHECKS=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
