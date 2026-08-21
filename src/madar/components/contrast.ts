/**
 * Contrast, in one place, for both lenses.
 *
 * These formulas existed once already — inside a `page.evaluate` in
 * `tools/qa/madar-qa.mjs`, where only Node could reach them. The moment a
 * component needed to measure its own contrast *in the browser*, that became two
 * copies of one formula, which is exactly the defect §27 was written about: one
 * meaning, one drawing.
 *
 * So the maths lives here, the component imports it, and the harness imports it
 * too. A change to how this library measures contrast is one edit.
 */

/* A 1x1 canvas, because parsing the string is a losing game.
   The first version of this matched `rgb()` and `rgba()` on the reasoning that
   `getComputedStyle` resolves everything to those. It does not: Chromium
   serialises a colour declared in `oklch()` as **`lab(...)`**, so six of the
   seven theme packs came back unparsed and 35 of 49 cells in the contact sheet
   reported "pass" having measured nothing at all — the exact failure the sheet
   exists to catch, inside the sheet. Found by `tools/qa/matrix.mjs` on its first
   run.

   The browser owns colour conversion, so it does the conversion. White is laid
   down first so a translucent ink composites against something rather than
   against nothing. */
let pad: CanvasRenderingContext2D | null | undefined;
const cache = new Map<string, [number, number, number] | null>();

/** Any CSS colour to 8-bit sRGB, via the browser's own parser. */
export function toRgb(css: string): [number, number, number] | null {
  if (!css) return null;
  const hit = cache.get(css);
  if (hit !== undefined) return hit;

  if (pad === undefined) {
    const canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
    if (canvas) { canvas.width = canvas.height = 1; }
    pad = canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null;
  }
  if (!pad) return null;

  pad.fillStyle = '#fff';
  pad.fillRect(0, 0, 1, 1);
  const before = pad.fillStyle;
  pad.fillStyle = css;
  /* an unparseable value leaves fillStyle untouched, which is how the canvas
     reports "I did not understand that" */
  if (pad.fillStyle === before && !/^#f{3,6}$|white/i.test(css.trim())) {
    cache.set(css, null);
    return null;
  }
  pad.fillRect(0, 0, 1, 1);
  const [r, g, b] = pad.getImageData(0, 0, 1, 1).data;
  const out: [number, number, number] = [r, g, b];
  cache.set(css, out);
  return out;
}

const srgbToLinear = (v: number) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

/** WCAG 2.x relative luminance. */
export const luminance = (c: [number, number, number]) =>
  0.2126 * srgbToLinear(c[0]) + 0.7152 * srgbToLinear(c[1]) + 0.0722 * srgbToLinear(c[2]);

/** WCAG 2.x contrast ratio, 1 to 21. The gate the standard actually asks for. */
export function ratio(fg: [number, number, number], bg: [number, number, number]) {
  const [a, b] = [luminance(fg), luminance(bg)];
  return Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100;
}

/* APCA 0.98G-4g. The second lens: WCAG 2.x has no notion of polarity, and light
   text on a dark ground is a different problem from dark text on a light one.
   Seven theme packs, four of them dark, is where that difference shows. */
const Y = (c: [number, number, number]) => {
  const y = 0.2126729 * (c[0] / 255) ** 2.4 + 0.7151522 * (c[1] / 255) ** 2.4 + 0.072175 * (c[2] / 255) ** 2.4;
  return y < 0.022 ? y + (0.022 - y) ** 1.414 : y;
};

/** APCA lightness contrast (Lc), absolute. 60 is the floor for body text. */
export function apca(text: [number, number, number], bg: [number, number, number]) {
  const [yt, yb] = [Y(text), Y(bg)];
  let lc: number;
  if (yb > yt) {
    lc = (yb ** 0.56 - yt ** 0.57) * 1.14;
    lc = lc < 0.1 ? 0 : lc - 0.027;
  } else {
    lc = (yb ** 0.65 - yt ** 0.62) * 1.14;
    lc = lc > -0.1 ? 0 : lc + 0.027;
  }
  return Math.round(Math.abs(lc) * 1000) / 10;
}

/** The alpha of any resolved colour, 0 to 1. Anything the browser resolves ends
    in a slash-alpha or has none at all, in which case it is opaque. */
export function alphaOf(css: string): number {
  const m = css.match(/\/\s*([\d.]+%?)\s*\)/) || css.match(/,\s*([\d.]+)\s*\)/);
  if (!m) return 1;
  return m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
}

export const AA_BODY = 4.5;
export const AA_LARGE = 3;
export const APCA_BODY = 60;

/** What a measured pair is: both lenses, and a verdict from the one that gates. */
export interface Reading {
  ratio: number;
  lc: number;
  /** Fails the standard the product is held to. */
  fails: boolean;
  /** Passes WCAG but APCA calls it thin — the disagreement worth seeing. */
  thin: boolean;
}

/** Measure a live element against its own painted background. Walks up for the
    first non-transparent ancestor, because `backgroundColor` on the element
    itself is usually `rgba(0,0,0,0)` and comparing ink to nothing reads as a
    perfect 21:1 — a measurement that flatters is worse than none. */
export function readPair(el: Element, large = false): Reading | null {
  const fg = toRgb(getComputedStyle(el).color);
  if (!fg) return null;

  /* Walk up for the first ancestor that actually paints. Transparency is read off
     the alpha channel, not off the string: `lab(...)` and `color(...)` have no
     comma-zero to match, which is the same lesson as the parser above. */
  let node: Element | null = el;
  let bg: [number, number, number] | null = null;
  while (node) {
    const paint = getComputedStyle(node).backgroundColor;
    if (alphaOf(paint) > 0.95) { bg = toRgb(paint); if (bg) break; }
    node = node.parentElement;
  }
  if (!bg) return null;

  const r = ratio(fg, bg);
  const lc = apca(fg, bg);
  return { ratio: r, lc, fails: r < (large ? AA_LARGE : AA_BODY), thin: r >= (large ? AA_LARGE : AA_BODY) && lc < APCA_BODY };
}
