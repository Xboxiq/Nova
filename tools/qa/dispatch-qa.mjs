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

// ── the handoff moves load between rows, and marks the gap it left
const before = await page.evaluate(() =>
  [...document.querySelectorAll("[data-courier]")].map((c) => ({ id: c.dataset.courier, load: Number(c.dataset.load) })));

await page.locator('[data-handoff] [data-target="hind"]').click();
await page.waitForTimeout(200);

const after = await page.evaluate(() => ({
  loads: [...document.querySelectorAll("[data-courier]")].map((c) => ({ id: c.dataset.courier, load: Number(c.dataset.load) })),
  left: document.querySelectorAll('[data-stub="left"]').length,
  gained: document.querySelectorAll('[data-stub="gained"]').length,
  leftHatched: [...document.querySelectorAll('[data-stub="left"]')].every((s) => s.classList.contains("madar-hatch")),
}));

const load = (rows, id) => rows.find((r) => r.id === id)?.load;
if (load(after.loads, "salem") !== load(before, "salem") - 1) {
  failures.push(`the sending courier's load should fall by one: ${load(before, "salem")} → ${load(after.loads, "salem")}`);
}
if (load(after.loads, "hind") !== load(before, "hind") + 1) {
  failures.push(`the receiving courier's load should rise by one: ${load(before, "hind")} → ${load(after.loads, "hind")}`);
}
const total = (rows) => rows.reduce((s, r) => s + r.load, 0);
if (total(after.loads) !== total(before)) failures.push(`a transfer created or destroyed load: ${total(before)} → ${total(after.loads)}`);
if (after.left !== 1) failures.push(`the gap the order left should be drawn once, drawn ${after.left} times`);
if (!after.leftHatched) failures.push("the gap it left is drawn solid, so it still reads as a load");
if (after.gained !== 1) failures.push(`the received order should be drawn as gained, found ${after.gained}`);

// putting it back is a removal, not a second ledger
await page.locator('[data-handoff] button:has-text("أعِده")').click();
await page.waitForTimeout(200);
const restored = await page.evaluate(() => ({
  loads: [...document.querySelectorAll("[data-courier]")].map((c) => ({ id: c.dataset.courier, load: Number(c.dataset.load) })),
  left: document.querySelectorAll('[data-stub="left"]').length,
}));
if (JSON.stringify(restored.loads) !== JSON.stringify(before)) failures.push("undoing the transfer did not restore the original loads");
if (restored.left !== 0) failures.push(`${restored.left} gap(s) still drawn after the undo`);

// ── keyboard: the arrows follow the writing direction
await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').focus();
const first = await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').getAttribute("aria-label");
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(120);
const second = await page.locator('[data-handoff] [role="radio"][aria-checked="true"]').getAttribute("aria-label");
if (first === second) failures.push("ArrowLeft did not move the selection in RTL");

// ── the same in LTR: the arrow that moves forward flips with the direction
await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.lang = "en"; });
await page.waitForTimeout(200);
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
console.log(`DISPATCH_FAILURES=${failures.length}`);
console.log(`DISPATCH_CHECKS=${failures.length || errors.length ? "FAIL" : "ok"}`);
process.exit(failures.length || errors.length ? 1 : 0);
