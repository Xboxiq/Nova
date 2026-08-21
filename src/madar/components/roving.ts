/**
 * Direction, and one mover for every strip in the library.
 *
 * This existed twice — once in `credit.tsx`, once in `boards.tsx` — with the two
 * copies already drifted: one treated ArrowUp/Down as no-ops on a one-dimensional
 * strip, the other stepped by one. A third copy was about to be written for the
 * glass and project families, so it moved here instead. The stepping version won,
 * because a vertical list read with the up arrow is the common case and a strip
 * that ignores it is the bug the two copies were hiding from each other.
 */

/** Reading direction, read once per interaction rather than assumed. */
export const isRtl = () =>
  typeof document !== 'undefined' && getComputedStyle(document.documentElement).direction === 'rtl';

/**
 * `forward` is the arrow that moves along the writing direction, so the same
 * component reads correctly in Arabic and in English without a second code path.
 * Pass `cols` for a grid; leave it off and the vertical arrows step by one.
 * Returns the new index, or null when the key was not ours to handle.
 */
export function move(key: string, at: number, count: number, cols?: number): number | null {
  const rtl = isRtl();
  const step: Record<string, number> = {
    [rtl ? 'ArrowLeft' : 'ArrowRight']: 1,
    [rtl ? 'ArrowRight' : 'ArrowLeft']: -1,
    Home: -count,
    End: count,
    ...(cols ? { ArrowDown: cols, ArrowUp: -cols } : { ArrowDown: 1, ArrowUp: -1 }),
  };
  if (!(key in step)) return null;
  return Math.min(count - 1, Math.max(0, at + step[key]));
}

/** A reading, grouped, in the digits the reference writes it in. */
export const n = (v: number, digits = 0) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/**
 * A monotone-ish cubic through a list of points, with the control handles on the
 * vertical midline between neighbours. That constraint is what keeps the curve
 * from overshooting past a reading — a spline that arcs above the highest point
 * is drawing a number nobody measured.
 */
export function smooth(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p = pts[i];
    const q = pts[i + 1];
    const mx = (p.x + q.x) / 2;
    d += ` C${mx} ${p.y} ${mx} ${q.y} ${q.x} ${q.y}`;
  }
  return d;
}
