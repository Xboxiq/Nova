import type { SVGProps } from 'react';

/* The nine icons the reference imports from
   `@/components/ui/animated-drawer-utils/demo-icons`, which the upload did not
   ship. Drawn here rather than pulled from a set, because the reference names
   them by *meaning* — a phrase, a recovery phrase, a face ID — and a generic
   lookalike from an icon pack would say something slightly different.

   All nine share one grid and one stroke weight, on purpose: the tell of an
   AI-drawn icon set is nine glyphs at nine different weights on nine different
   grids. 24x24, 1.75 stroke, round caps, and every path drawn inside a 20x20
   optical box so they sit at the same visual size next to text. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

const base = ({ size = 20, ...rest }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...rest,
});

/** A key — "view private key". */
export const LockIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="12" r="3.4" />
    <path d="M11.4 12H20M17.2 12v3M14.4 12v2.2" />
  </svg>
);

/** A sheet of words — "view recovery phrase". */
export const PhraseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="3.2" width="16" height="17.6" rx="2.4" />
    <path d="M7.6 8h8.8M7.6 12h8.8M7.6 16h5.2" />
  </svg>
);

/** A wallet with a line through it — "remove wallet". */
export const BannedIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M6.1 6.1l11.8 11.8" />
  </svg>
);

/** The triangle that means stop and read. */
export const WarningIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.6 21 19.2H3z" />
    <path d="M12 9.6v4.4" />
    <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/** Irreversible: the arrow that cannot come back. */
export const DangerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4.4V8.8h-4.4" />
    <path d="M9.6 9.6l4.8 4.8M14.4 9.6l-4.8 4.8" />
  </svg>
);

/** A shield — "store it in a secure location". */
export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.2 19.2 6v6c0 4.2-3 7-7.2 8.8C7.8 19 4.8 16.2 4.8 12V6z" />
    <path d="M9.4 12.2l1.9 1.9 3.5-3.9" />
  </svg>
);

/** A crossed-out mouth — "never share with anyone". */
export const PassIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12c2.7-3.7 5.4-5.5 8-5.5s5.3 1.8 8 5.5c-2.7 3.7-5.4 5.5-8 5.5S6.7 15.7 4 12z" />
    <path d="M5.2 5.2l13.6 13.6" />
  </svg>
);

/** A lifebuoy with no rope — "we cannot recover it for you". */
export const RecoveryPhraseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M6.1 6.1l3.5 3.5M17.9 6.1l-3.5 3.5M6.1 17.9l3.5-3.5M17.9 17.9l-3.5-3.5" />
  </svg>
);

/** The face that unlocks — on the reveal action. */
export const FaceIDIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8.4V6.4A2.4 2.4 0 0 1 6.4 4h2M15.6 4h2A2.4 2.4 0 0 1 20 6.4v2M20 15.6v2a2.4 2.4 0 0 1-2.4 2.4h-2M8.4 20h-2A2.4 2.4 0 0 1 4 17.6v-2" />
    <path d="M9.2 10v1.6M14.8 10v1.6M12 10v3.2h-1.2" />
    <path d="M9.4 15.6c1.6 1.1 3.6 1.1 5.2 0" />
  </svg>
);
