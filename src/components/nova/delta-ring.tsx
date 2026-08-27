/* حَلَقةُ الفَرق — مسارانِ يتشاركانِ محورًا، فالمرسومُ ما بينَهما.
   DeltaRing -- two readings on one angular axis, and the sector between them is the
   drawn thing. VISUAL-LAW SS19, in the round.

   THE SECTOR IS THE INFORMATION. Two concentric hairlines carry the two readings --
   concentric because they share the ANGULAR axis, which is what SS19 is about, and
   two strokes on one radius would simply hide each other. The thick band between
   their ends is the delta, and it is drawn by dash arithmetic rather than by a
   second path:

     stroke-dasharray:  calc(max(v, b) - min(v, b))  100
     stroke-dashoffset: calc(-1 * min(v, b))

   With pathLength="100" the dash units are percent of the circle, so that is
   literally "start at the lower reading, run for the difference". No conversion, no
   second source of truth, and no branch anywhere for which reading is larger --
   `min()` and `max()` settle it in CSS.

   THE SIGN IS A MIX. The same saturating clamp as the other instruments, so the
   band, its bloom, its end cap and the numeral all take one colour that flips at
   the crossing with no class and no attribute.

   THE CAPS ARE ROTATIONS, NOT POSITIONS. Each end cap is a dot drawn once at twelve
   o'clock and rotated `calc(var(--nv-*) * 3.6deg)` about the centre -- one hundred
   units to three hundred and sixty degrees. So a cap cannot drift out of agreement
   with the arc it terminates: they are the same number.

   ONE FOCUS. The value is the control; the base is a declared reference in
   `aria-valuetext`. Bezel, well and glass are the family's, so this reads as the
   dial's sibling rather than a second visual idea. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const RING = 'M60 16 A44 44 0 0 1 60 104 A44 44 0 0 1 60 16';
const clampValue = (n: number) => Math.min(100, Math.max(0, n));
const signed = (n: number) => (n > 0 ? '+' + n : String(n));

export const DeltaRing = ({
  label = 'Drift',
  unit = '%',
  base = 48,
  value: controlled,
  defaultValue = 71,
  onChange,
}: {
  label?: string; unit?: string; base?: number;
  value?: number; defaultValue?: number; onChange?: (n: number) => void;
}) => {
  const [own, setOwn] = useState(defaultValue);
  const value = clampValue(controlled ?? own);
  const ref = clampValue(base);
  const delta = Math.round((value - ref) * 10) / 10;
  const labelId = 'nv-ring-' + useId().replace(/:/g, '');

  const set = (n: number) => {
    const v = clampValue(n);
    if (controlled === undefined) setOwn(v);
    onChange?.(v);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 1;
    const dir =
      e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'PageUp' ? 1
      : e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'PageDown' ? -1
      : 0;
    if (dir !== 0) { e.preventDefault(); set(value + dir * step); return; }
    if (e.key === 'Home') { e.preventDefault(); set(0); }
    if (e.key === 'End') { e.preventDefault(); set(100); }
  };

  return (
    <StyledWrapper>
      <div
        className="ring"
        style={{ ['--nv-value' as string]: value, ['--nv-base' as string]: ref }}
        role="slider"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={signed(delta) + unit + ', ' + (delta >= 0 ? 'above' : 'below') + ' the ' + ref + unit + ' reference'}
        onKeyDown={onKeyDown}
      >
        <div className="ring__bezel">
          <span className="ring__well" aria-hidden="true" />

          <svg className="ring__face" viewBox="0 0 120 120" aria-hidden="true">
            <path className="ring__track" d={RING} pathLength={100} />
            {/* the delta sector: start at the lower reading, run for the difference */}
            <path className="ring__bloom" d={RING} pathLength={100} />
            <path className="ring__sector" d={RING} pathLength={100} />
            {/* the two readings, concentric because they share the angular axis */}
            <path className="ring__base-line" d={RING} pathLength={100} />
            <path className="ring__value-line" d={RING} pathLength={100} />
            {/* caps: one dot, rotated by its own reading */}
            <circle className="ring__cap ring__cap--base" cx="60" cy="16" r="3.4" />
            <circle className="ring__cap ring__cap--value" cx="60" cy="16" r="4" />
          </svg>

          <span className="ring__plate" aria-hidden="true" />
          <p className="ring__readout">
            <output className="ring__value">{signed(delta)}</output>
            <span className="ring__unit">{unit}</span>
          </p>
          <span className="ring__glass" aria-hidden="true" />
        </div>
        <span className="ring__label" id={labelId}>{label}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @property --nv-value { syntax: "<number>"; inherits: true; initial-value: 0; }
  @property --nv-base { syntax: "<number>"; inherits: true; initial-value: 0; }

  .ring {
    --nv-min: min(var(--nv-value), var(--nv-base));
    --nv-max: max(var(--nv-value), var(--nv-base));
    --nv-span: calc(var(--nv-max) - var(--nv-min));
    --nv-sign: clamp(0, calc((var(--nv-value) - var(--nv-base)) * 100), 1);
    --nv-tone: color-mix(
      in oklab,
      var(--nova-success) calc(var(--nv-sign) * 100%),
      var(--nova-danger)
    );

    display: grid;
    justify-items: center;
    gap: 0.5rem;
    inline-size: 13.5rem;
    padding: 0.875rem;
    border: 1px solid var(--nova-border);
    border-radius: var(--r-lg);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nova-surface) 92%, white) 0%,
        var(--nova-surface) 42%
      );
    box-shadow: var(--depth-widget);
    transition:
      --nv-value 340ms cubic-bezier(0.22, 1, 0.36, 1),
      --nv-base 340ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .ring:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 4px;
  }

  .ring__bezel {
    position: relative;
    inline-size: 9.25rem;
    block-size: 9.25rem;
    border-radius: 50%;
    isolation: isolate;
    background: radial-gradient(
      circle at 50% 8%,
      color-mix(in oklab, var(--nova-surface-raised) 90%, white) 0%,
      var(--nova-surface-raised) 48%,
      color-mix(in oklab, var(--nova-surface-raised) 86%, black) 100%
    );
    box-shadow: var(--depth-instrument-bezel);
  }

  .ring__well {
    position: absolute;
    inset: 7%;
    border-radius: 50%;
    box-shadow: var(--depth-instrument-well);
    pointer-events: none;
  }

  .ring__face {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
  }

  .ring__track,
  .ring__bloom,
  .ring__sector,
  .ring__base-line,
  .ring__value-line {
    fill: none;
    stroke-linecap: butt;
  }

  .ring__track {
    stroke: color-mix(in oklab, var(--nova-ink) 13%, transparent);
    stroke-width: 11;
  }

  .ring__bloom,
  .ring__sector {
    stroke: var(--nv-tone);
    stroke-dasharray: var(--nv-span) 100;
    stroke-dashoffset: calc(-1 * var(--nv-min));
  }

  .ring__bloom {
    stroke-width: 17;
    filter: blur(6px);
    opacity: calc(0.22 + var(--nv-span) * 0.008);
  }

  .ring__sector {
    stroke-width: 11;
  }

  /* the two readings, one unit apart in radius so neither hides the other */
  .ring__base-line,
  .ring__value-line {
    stroke-width: 2;
  }

  .ring__base-line {
    stroke: color-mix(in oklab, var(--nova-ink) 62%, transparent);
    stroke-dasharray: var(--nv-base) 100;
    translate: 0 0;
    scale: 0.845;
    transform-box: view-box;
    transform-origin: 60px 60px;
  }

  .ring__value-line {
    stroke: var(--nova-ink);
    stroke-dasharray: var(--nv-value) 100;
    scale: 1.155;
    transform-box: view-box;
    transform-origin: 60px 60px;
  }

  .ring__cap {
    transform-box: view-box;
    transform-origin: 60px 60px;
    stroke: var(--nova-surface-raised);
    stroke-width: 2;
  }

  .ring__cap--base {
    fill: color-mix(in oklab, var(--nova-ink) 62%, transparent);
    transform: rotate(calc(var(--nv-base) * 3.6deg)) scale(0.845);
  }

  .ring__cap--value {
    fill: var(--nv-tone);
    transform: rotate(calc(var(--nv-value) * 3.6deg)) scale(1.155);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.38));
  }

  .ring__plate {
    position: absolute;
    inset: 26%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 12%,
      color-mix(in oklab, var(--nova-surface-raised) 94%, white) 0%,
      var(--nova-surface-raised) 70%
    );
    box-shadow:
      0 1px 0 var(--bevel-hair) inset,
      var(--depth-instrument-hub);
    pointer-events: none;
  }

  .ring__readout {
    position: absolute;
    inset: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.0625rem;
    color: var(--nova-ink);
    pointer-events: none;
  }

  .ring__value {
    font-size: 1.5rem;
    font-weight: 660;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }

  .ring__unit {
    align-self: center;
    font-size: 0.75rem;
    color: var(--nova-ink-secondary);
  }

  .ring__glass {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      ellipse 56% 28% at 50% 3%,
      rgba(255, 255, 255, 0.28) 0%,
      rgba(255, 255, 255, 0.06) 54%,
      transparent 78%
    );
    mask-image: linear-gradient(180deg, black 0%, black 40%, transparent 72%);
    pointer-events: none;
  }

  .ring__label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--nova-ink-secondary);
  }

  @media (prefers-reduced-motion: reduce) {
    .ring { transition-duration: 1ms, 1ms; }
  }
`;

export default DeltaRing;
