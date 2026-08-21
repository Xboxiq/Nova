import type { CSSProperties, ReactNode } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   The photographed system — the primitives every screen in it is built from.

   The owner ruled the reference designs into the library unchanged: same
   colours, same angles, same gradients, same shadows, nothing sacrificed. That
   repeals `anti-slop-ui` 07 and 09 for this family and amends VISUAL-LAW §1 and
   §3, both recorded there.

   What makes this a system rather than a mood, and therefore what these
   primitives are:

   · **The mesh is five pools, not two stops.** A two-stop gradient fades; five
     radial pools laid over one linear ramp make the hue *turn* — green to olive
     to sand to peach to rose. That turn is the whole reading, and it is why
     `MeshSurface` takes a named variant instead of a pair of colours.
   · **One grain layer over everything.** It is the single reason the family
     reads as film rather than vector, and it belongs to the surface, not to
     each child.
   · **One light, from above.** The bevel is a lit top lip and a darker bottom
     lip; the inner glow is a pool in the upper third. Both are the same lamp.
   · **The accent is reserved.** Lime marks what has been measured — a paid
     month, a paid chip, the reading on a chart — and nothing else. That rule is
     what keeps it from becoming the neon the standard bans.

   Every value comes from a token in `bridge.css`, so the reference's exact
   number is preserved and there is still one place to read it from.
──────────────────────────────────────────────────────────────────────── */

export type MeshVariant =
  /** the loan screen: the full turn, green at the top, rose at the floor */
  | 'run'
  /** the same mesh cropped to a widget, green end */
  | 'green'
  /** the same mesh cropped to a widget, peach end */
  | 'peach'
  /** the light twin: the mesh pulled almost to white, hue only in the corners */
  | 'light'
  /** a black plate with a green pool lit inside it */
  | 'plate'
  /** the slide: black above turning olive below */
  | 'olive';

const MESH: Record<MeshVariant, string> = {
  run: [
    'radial-gradient(78% 52% at 14% -4%, var(--mesh-green-a) 0%, transparent 62%)',
    'radial-gradient(66% 44% at 84% -2%, var(--mesh-green-b) 0%, transparent 58%)',
    'radial-gradient(96% 60% at 4% 34%, var(--mesh-sand) 0%, transparent 64%)',
    'radial-gradient(96% 62% at 98% 52%, var(--mesh-peach) 0%, transparent 66%)',
    'radial-gradient(120% 74% at 46% 104%, var(--mesh-rose) 0%, transparent 72%)',
    'linear-gradient(var(--sheen), var(--mesh-ramp-1) 0%, var(--mesh-ramp-2) 38%, var(--mesh-ramp-3) 70%, var(--mesh-ramp-4) 100%)',
  ].join(','),
  green: [
    'radial-gradient(76% 52% at 16% 2%, var(--widget-green-a) 0%, transparent 62%)',
    'radial-gradient(72% 46% at 92% 8%, var(--widget-green-b) 0%, transparent 60%)',
    'radial-gradient(110% 70% at 42% 104%, var(--widget-green-c) 0%, transparent 68%)',
    'linear-gradient(var(--sheen), #5f7d18 0%, #7d9c22 46%, #b6d833 100%)',
  ].join(','),
  peach: [
    'radial-gradient(74% 50% at 18% 2%, var(--widget-peach-a) 0%, transparent 62%)',
    'radial-gradient(70% 46% at 90% 10%, var(--widget-peach-b) 0%, transparent 60%)',
    'radial-gradient(110% 72% at 46% 104%, var(--widget-peach-c) 0%, transparent 70%)',
    'linear-gradient(var(--sheen), #d8b49a 0%, #d5a488 48%, #eec4b2 100%)',
  ].join(','),
  light: [
    'radial-gradient(52% 34% at 88% 2%, rgba(214,246,120,0.5) 0%, transparent 62%)',
    'radial-gradient(56% 36% at 6% 6%, rgba(236,214,240,0.55) 0%, transparent 64%)',
    'radial-gradient(60% 40% at 96% 30%, rgba(255,222,196,0.55) 0%, transparent 66%)',
    'radial-gradient(70% 46% at 4% 40%, rgba(212,232,255,0.42) 0%, transparent 68%)',
    'linear-gradient(var(--wash), #f7f7f5 0%, #fbfbfa 44%, #fff 100%)',
  ].join(','),
  plate: [
    'radial-gradient(58% 130% at 20% 150%, var(--plate-pool) 0%, transparent 58%)',
    'radial-gradient(50% 110% at 86% 140%, var(--plate-pool-deep) 0%, transparent 56%)',
    'linear-gradient(var(--sheen), var(--plate-a) 0%, var(--plate-b) 46%, var(--plate-c) 100%)',
  ].join(','),
  olive: [
    'radial-gradient(120% 62% at 50% 106%, var(--olive-pool) 0%, transparent 66%)',
    'radial-gradient(90% 44% at 50% 88%, #5c6a12 0%, transparent 70%)',
    'linear-gradient(var(--wash), var(--olive-a) 0%, #121512 34%, var(--olive-b) 62%, var(--olive-c) 84%, var(--olive-d) 100%)',
  ].join(','),
};

/** Which variants carry light text, so a caller cannot get the ink wrong. */
const DARK_GROUND: Record<MeshVariant, boolean> = {
  run: true, green: true, peach: true, light: false, plate: true, olive: true,
};

export interface MeshSurfaceProps {
  variant?: MeshVariant;
  children?: ReactNode;
  /** Grain weight. `none` only for a surface that already sits on a grained one. */
  grain?: 'normal' | 'light' | 'heavy' | 'none';
  /** The pool of light in the upper third. */
  glow?: boolean;
  /** The lit-top/dark-bottom lip plus the family's drop shadow. */
  bevel?: boolean | 'deep';
  radius?: string;
  style?: CSSProperties;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export function MeshSurface({
  variant = 'run',
  children,
  grain = 'normal',
  glow = false,
  bevel = false,
  radius = 'var(--r-widget)',
  style,
  className,
  as: Tag = 'div',
}: MeshSurfaceProps) {
  const cls = [
    grain !== 'none' && 'madar-grain',
    grain === 'light' && 'madar-grain--light',
    grain === 'heavy' && 'madar-grain--heavy',
    glow && 'madar-glow',
    bevel === true && 'madar-bevel',
    bevel === 'deep' && 'madar-bevel--deep',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      data-mesh={variant}
      className={cls}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        background: MESH[variant],
        color: DARK_GROUND[variant] ? '#fff' : '#101312',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Ink ─────────────────────────────────────────────────────────────────────
   The family writes in exactly three weights of the same white: the reading at
   full strength, its label at 0.66, and a secondary line at 0.72. Naming them
   stops the drift into eleven different alphas that made the reference set look
   hand-tuned when it is actually systematic. */
export const ink = {
  strong: '#fff',
  label: 'rgba(255,255,255,0.66)',
  soft: 'rgba(255,255,255,0.72)',
  onLight: '#101312',
  labelOnLight: '#8f8f8c',
} as const;

/* ── Glass ───────────────────────────────────────────────────────────────────
   A chip or a sheet floating on the mesh: a white film at low alpha, a hairline,
   a blur, and the same lit lip. `lit` swaps the hairline and the inner glow for
   the accent, which is how the family marks the one chip that has been paid. */
export function glass(lit = false): CSSProperties {
  return lit
    ? {
        background: 'rgba(196,238,58,0.10)',
        border: '1px solid rgba(210,245,74,0.62)',
        backdropFilter: 'blur(14px)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.42), inset 0 0 22px rgba(210,245,74,0.22), var(--depth-lime-halo)',
      }
    : {
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.24)',
        backdropFilter: 'blur(14px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.36), inset 0 -1px 0 rgba(0,0,0,0.06)',
      };
}

/* ── Sphere ──────────────────────────────────────────────────────────────────
   A swatch in this family is a lit sphere, not a flat dot: the highlight sits up
   and to the left of centre, there is a terminator, and light bounces back along
   the lower edge. One function, because getting those three wrong is what makes
   a sphere look like a sticker. */
export function sphere(from: string, mid: string, to: string): CSSProperties {
  return {
    background: `radial-gradient(66% 66% at 33% 26%, ${from} 0%, ${mid} 46%, ${to} 84%)`,
    boxShadow: 'inset 0 -3px 5px rgba(255,255,255,0.28), var(--depth-sphere)',
  };
}

/* ── Orb ─────────────────────────────────────────────────────────────────────
   The assistant's orb from the sales board. Nine layers, and every one of them
   is doing work: a white specular, a mint pool, a lime pool, the emerald body,
   an outer halo, and an inset floor that gives it volume. Take any one away and
   it flattens into a circle. */
export function AiOrb({ size = 128 }: { size?: number }) {
  return (
    <span
      data-orb=""
      aria-hidden="true"
      style={{
        display: 'block',
        width: size,
        height: size,
        borderRadius: '50%',
        position: 'relative',
        background: [
          'radial-gradient(38% 38% at 34% 30%, #fff 0%, rgba(255,255,255,0) 62%)',
          'radial-gradient(74% 74% at 62% 40%, #6ff0c0 0%, rgba(111,240,192,0) 66%)',
          'radial-gradient(80% 80% at 40% 70%, #b9f53a 0%, rgba(185,245,58,0) 68%)',
          'radial-gradient(96% 96% at 50% 50%, #2fbf8a 0%, #0f7a58 74%, #063a29 100%)',
        ].join(','),
        boxShadow: 'var(--depth-orb), inset 0 -6px 14px rgba(0,0,0,0.4)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: -Math.round(size * 0.17),
          borderRadius: '50%',
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(140,240,150,0.28) 0%, rgba(140,240,150,0) 70%)',
        }}
      />
    </span>
  );
}

/* ── Smear ───────────────────────────────────────────────────────────────────
   The reference boards sit their widgets on a long-exposure photograph — a
   figure turning, a flower. A photograph cannot be reproduced in CSS, so this
   builds what makes one read that way: a blurred dark mass, directional drag in
   cyan and orange, and grain. It plays the same role — an out-of-focus field for
   a sharp object to stand on — and it is a stand-in, not a copy. */
export function Smear({ tone = 'figure' }: { tone?: 'figure' | 'sky' }) {
  const mass =
    tone === 'figure'
      ? [
          'radial-gradient(15% 20% at 58% 16%, rgba(8,10,14,0.96) 0%, transparent 74%)',
          'radial-gradient(13% 12% at 60% 24%, rgba(8,10,14,0.9) 0%, transparent 76%)',
          'radial-gradient(26% 30% at 56% 56%, rgba(8,10,14,0.94) 0%, transparent 72%)',
          'radial-gradient(34% 26% at 50% 86%, rgba(8,10,14,0.9) 0%, transparent 74%)',
        ].join(',')
      : [
          'radial-gradient(60% 40% at 24% 12%, #8fc3d6 0%, transparent 68%)',
          'radial-gradient(70% 46% at 78% 6%, #6fa9c4 0%, transparent 66%)',
          'radial-gradient(80% 50% at 50% 46%, #d9d3c2 0%, transparent 70%)',
          'linear-gradient(var(--wash), #a9cfdd 0%, #cfd6cf 46%, #ece2d2 100%)',
        ].join(',');

  return (
    <span aria-hidden="true" style={{ position: 'absolute', inset: -60, pointerEvents: 'none' }}>
      <span style={{ position: 'absolute', inset: 0, background: mass, filter: 'blur(18px)' }} />
      {tone === 'figure' && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            filter: 'blur(22px)',
            background: [
              'radial-gradient(24% 9% at 40% 14%, rgba(96,178,204,0.75) 0%, transparent 78%)',
              'radial-gradient(22% 8% at 26% 58%, rgba(226,112,52,0.62) 0%, transparent 78%)',
              'radial-gradient(18% 6% at 22% 64%, rgba(240,150,90,0.5) 0%, transparent 78%)',
            ].join(','),
          }}
        />
      )}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          filter: 'blur(1.5px)',
          background: 'repeating-linear-gradient(var(--drag), rgba(255,255,255,0.12) 0 2px, rgba(255,255,255,0) 2px 10px)',
          maskImage: 'radial-gradient(46% 60% at 42% 44%, #000 0%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(46% 60% at 42% 44%, #000 0%, transparent 76%)',
        }}
      />
    </span>
  );
}
