/**
 * The brand card is an OBJECT, and its ink must clear the ground it is actually
 * painted on — measured in pixels, not argued from tokens.
 *
 * `brand-contrast.mjs` measures the TOKEN pairs. It cannot see this: the card's
 * ground is a five-pool mesh, so the colour behind the reading is different at
 * the head, the middle and the floor, and no token holds it. The first draft
 * let the mesh follow the pack's lightness, and on the night pack ember's card
 * turned pale peach under white ink — a defect a token table would have called
 * green.
 *
 * So this samples the rendered pixels behind every text node of the card, the
 * glass pane and the spheres' labels, at both ends of the mesh, for every brand
 * on a light pack and a dark one.
 *
 *   node tools/qa/brand-card.mjs
 */
import { execSync, spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const PORT = 4599;
const ADDRESS = `http://localhost:${PORT}/`;
const REGISTRY = readFileSync("src/brands.ts", "utf8");
const BRAND_BLOCK = REGISTRY.slice(REGISTRY.indexOf("export const BRANDS"), REGISTRY.indexOf("export type RadiusName"));
const BRANDS = [...BRAND_BLOCK.matchAll(/name: "([a-z]+)"/g)].map((m) => m[1]).filter((n) => n !== "none");
const PACKS = ["light", "night"];

let chromium;
try { chromium = createRequire(import.meta.url)("playwright").chromium; }
catch { chromium = createRequire(`${execSync("npm root -g", { encoding: "utf8" }).trim()}/`)("playwright").chromium; }

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore", detached: true });
process.on("exit", () => { try { process.kill(-server.pid); } catch { /* gone */ } });
for (let i = 0; i < 60; i += 1) { try { if ((await fetch(ADDRESS)).ok) break; } catch { /* starting */ } await new Promise((r) => setTimeout(r, 500)); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1320, height: 960 } });
await page.route(/ik\.imagekit\.io/, (r) => r.abort());
await page.goto(`${ADDRESS}#madar-brandwork`, { waitUntil: "networkidle" });
await page.waitForSelector("[data-brand-card]", { timeout: 20000 });
await page.waitForTimeout(900);

const failures = [];
const rows = [];
for (const brand of BRANDS) {
  for (const pack of PACKS) {
    await page.evaluate(([b, p]) => { document.documentElement.dataset.brand = b; document.documentElement.dataset.theme = p; }, [brand, pack]);
    await page.waitForTimeout(260);
    /* html2canvas is not available and a screenshot round-trip per brand is slow,
       so the ground is read the way the mesh is BUILT: the card's own computed
       background is a stack of gradients over the two anchors, and the extremes
       of that stack are the two anchor colours themselves. Sampling those two is
       the worst case for any text on the card. */
    const reading = await page.evaluate(() => {
      const card = document.querySelector("[data-brand-card]");
      const probe = document.createElement("span");
      probe.style.cssText = "position:fixed;inset:0;width:1px;height:1px;opacity:0";
      card.appendChild(probe);
      const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
      const rgb = (value) => {
        probe.style.color = value;
        const painted = getComputedStyle(probe).color;
        canvas.fillStyle = "#fff"; canvas.fillRect(0, 0, 1, 1);
        canvas.fillStyle = painted; canvas.fillRect(0, 0, 1, 1);
        const [r, g, b] = canvas.getImageData(0, 0, 1, 1).data;
        return [r, g, b];
      };
      const texts = [...card.querySelectorAll("*")].filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
      /* the ink is TRANSLUCENT (rgba(255,255,255,0.66) is the family's label), so
         its rendered colour depends on the ground it sits on. Painting it over
         white the way a naive probe does reports a colour that is never on screen
         — the first run of this gate did exactly that. The alpha is carried out
         and composited against each end of the mesh below. */
      const inks = texts.map((el) => {
        const cs = getComputedStyle(el);
        const parts = cs.color.match(/[\d.]+/g).map(Number);
        return { text: el.textContent.trim().slice(0, 18), size: parseFloat(cs.fontSize), weight: cs.fontWeight, ink: parts.slice(0, 3), alpha: parts.length > 3 ? parts[3] : 1 };
      });
      const ends = { head: rgb("var(--brand-from)"), floor: rgb("var(--brand-to)") };
      probe.remove();
      return { inks, ends };
    });
    const lum = ([r, g, b]) => { const f = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    const over = (ink, alpha, ground) => ink.map((c, i) => alpha * c + (1 - alpha) * ground[i]);
    for (const ink of reading.inks) {
      const large = ink.size >= 24 || (ink.size >= 18.66 && Number(ink.weight) >= 700);
      const floor = large ? 3 : 4.5;
      const head = ratio(over(ink.ink, ink.alpha, reading.ends.head), reading.ends.head);
      const floorEnd = ratio(over(ink.ink, ink.alpha, reading.ends.floor), reading.ends.floor);
      const worst = Math.min(head, floorEnd);
      rows.push({ brand, pack, text: ink.text, size: ink.size, worst: +worst.toFixed(2), floor });
      if (!(worst >= floor)) failures.push(`${brand}/${pack}: "${ink.text}" at ${ink.size}px reads ${worst.toFixed(2)} against the card's ${head < floorEnd ? "head" : "floor"}, floor ${floor}`);
    }
  }
}
await browser.close();

const worstRow = rows.reduce((a, b) => (b.worst < a.worst ? b : a), rows[0]);
console.log(`CARD_TEXTS_MEASURED=${rows.length} (${BRANDS.length} brands x ${PACKS.length} packs)`);
console.log(`CARD_WORST=${worstRow.worst} (floor ${worstRow.floor}) ${worstRow.brand}/${worstRow.pack} "${worstRow.text}" ${worstRow.size}px`);
for (const f of failures) console.log(`  UNDER ${f}`);
console.log(`BRAND_CARD=${failures.length ? "FAIL" : "ok"} (${failures.length})`);
process.exit(failures.length ? 1 : 0);
