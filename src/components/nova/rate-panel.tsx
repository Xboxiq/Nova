/* لوحُ المُعدَّل — سُرعةُ المَسحِ هي القراءة، لا زينةٌ فوقَها.
   RatePanel -- the sweep's SPEED is the reading. Six layers, and every one of them
   is arithmetic on the same two scalars.

   THE CLEAREST STATEMENT OF THIS FAMILY'S RULE. The imported corpus runs animations
   at fixed durations, so their pace says nothing: a loader at 2s means the same at
   every value. Here:

     animation-duration: calc((118 - var(--nv-rate)) * 34ms)

   At rate 0 the sweep takes 4.0s; at 100 it takes 0.6s. You do not read the number
   to know the panel is busy -- you see it, before you focus on anything. That is a
   reading carried by pace, which no static screenshot can show and no fixed-duration
   animation can express.

   SEVERITY IS ONE SCALAR AND A NESTED MIX. `--nv-sev` runs 0 to 2 and the lamp's
   colour is a two-stage `color-mix` on it:

     mix( mix(success, warning, clamp(0, sev, 1)), danger, clamp(0, sev - 1, 1) )

   Both clamps saturate, so the tone is success below 1, warning at 1 and danger at
   2 -- and because the scalar is registered it INTERPOLATES, so a state change is a
   colour crossing rather than a swap. The thresholds live in one place, in JS, and
   the CSS never repeats them; it only reads the level they produced. A threshold
   written in two languages is a threshold that will disagree with itself.

   SIX LAYERS, ALL OF THEM READINGS.

     ground     a recess, so the panel is a housing and not a rectangle
     grid       a fine etched lattice, the only purely static layer
     sweep      travelling, and its DURATION is the rate
     segments   fourteen marks lit by clamp against the rate, floored at 0.16 (SS11)
     lamp       a dot whose tone is the severity and whose bloom is the rate
     glass      a specular cap on the upper third, masked (SS2)

   The rate is the control -- `role="slider"`, arrows, PageUp/Down, Home/End -- and
   the severity is a consequence of it rather than a second thing to operate.

   Both animations are neutralised by the repo blanket under reduced motion; the
   transition needs the block at the foot, because the blanket does not touch
   transitions. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const SEGMENTS = Array.from({ length: 14 }, (_, i) => i);
const clampValue = (n: number) => Math.min(100, Math.max(0, n));

/* The thresholds live here and nowhere else. The stylesheet reads the level, never
   the numbers that produced it. */
const LEVELS = [
  { at: 0, sev: 0, word: 'Nominal' },
  { at: 60, sev: 1, word: 'Elevated' },
  { at: 85, sev: 2, word: 'Critical' },
];
const levelFor = (rate: number) => [...LEVELS].reverse().find((l) => rate >= l.at) ?? LEVELS[0];

export const RatePanel = ({
  label = 'Ingest rate',
  unit = 'k/s',
  value: controlled,
  defaultValue = 68,
  onChange,
}: {
  label?: string; unit?: string;
  value?: number; defaultValue?: number; onChange?: (n: number) => void;
}) => {
  const [own, setOwn] = useState(defaultValue);
  const rate = clampValue(controlled ?? own);
  const level = levelFor(rate);
  const labelId = 'nv-rate-' + useId().replace(/:/g, '');

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
    if (dir !== 0) { e.preventDefault(); set(rate + dir * step); return; }
    if (e.key === 'Home') { e.preventDefault(); set(0); }
    if (e.key === 'End') { e.preventDefault(); set(100); }
  };

  return (
    <StyledWrapper>
      <div
        className="panel"
        style={{ ['--nv-rate' as string]: rate, ['--nv-sev' as string]: level.sev }}
        role="slider"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rate}
        aria-valuetext={rate + ' ' + unit + ', ' + level.word}
        onKeyDown={onKeyDown}
      >
        <div className="panel__head">
          <span className="panel__lamp" aria-hidden="true" />
          <span className="panel__label" id={labelId}>{label}</span>
          <p className="panel__readout">
            <output className="panel__value">{rate}</output>
            <span className="panel__unit">{unit}</span>
          </p>
        </div>

        <div className="panel__housing">
          <span className="panel__ground" aria-hidden="true" />
          <span className="panel__grid" aria-hidden="true" />
          {/* the duration is the reading */}
          <span className="panel__sweep" aria-hidden="true" />
          <span className="panel__bars" aria-hidden="true">
            {SEGMENTS.map((i) => (
              <span key={i} className="panel__bar" style={{ ['--i' as string]: i }} />
            ))}
          </span>
          <span className="panel__glass" aria-hidden="true" />
        </div>

        <output className="panel__state">{level.word}</output>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @property --nv-rate { syntax: "<number>"; inherits: true; initial-value: 0; }
  @property --nv-sev { syntax: "<number>"; inherits: true; initial-value: 0; }

  .panel {
    /* two saturating clamps, so the tone is success / warning / danger and
       everything between, from one interpolated scalar */
    --nv-tone: color-mix(
      in oklab,
      color-mix(
        in oklab,
        var(--nova-success),
        var(--nova-warning) calc(clamp(0, var(--nv-sev), 1) * 100%)
      ),
      var(--nova-danger) calc(clamp(0, calc(var(--nv-sev) - 1), 1) * 100%)
    );

    display: grid;
    gap: 0.625rem;
    inline-size: 20rem;
    padding: 0.875rem 1rem 0.75rem;
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
      --nv-rate 340ms cubic-bezier(0.22, 1, 0.36, 1),
      --nv-sev 340ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .panel:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 4px;
  }

  .panel__head {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  /* layer 5: tone is the severity, bloom is the rate */
  .panel__lamp {
    align-self: center;
    inline-size: 0.625rem;
    block-size: 0.625rem;
    border-radius: 50%;
    background: radial-gradient(
      circle at 34% 30%,
      color-mix(in oklab, var(--nv-tone) 55%, white) 0%,
      var(--nv-tone) 62%,
      color-mix(in oklab, var(--nv-tone) 72%, black) 100%
    );
    box-shadow:
      0 0 calc(2px + var(--nv-rate) * 0.14px)
        color-mix(in oklab, var(--nv-tone) 62%, transparent),
      var(--depth-instrument-hub);
  }

  .panel__label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--nova-ink-secondary);
  }

  .panel__readout {
    margin: 0;
    margin-inline-start: auto;
    display: flex;
    align-items: baseline;
    gap: 0.1875rem;
  }

  .panel__value {
    font-size: 1.375rem;
    font-weight: 660;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    color: var(--nova-ink);
  }

  .panel__unit {
    font-size: 0.75rem;
    color: var(--nova-ink-secondary);
  }

  .panel__housing {
    position: relative;
    block-size: 3.25rem;
    border-radius: var(--r-md);
    overflow: hidden;
    isolation: isolate;
  }

  /* layer 1 */
  .panel__ground {
    position: absolute;
    inset: 0;
    background: color-mix(in oklab, var(--nova-surface-quiet) 80%, black);
    box-shadow: var(--depth-instrument-well);
  }

  /* layer 2: the only static layer in the panel */
  .panel__grid {
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        90deg,
        color-mix(in oklab, var(--nova-ink) 9%, transparent) 0 1px,
        transparent 1px 12px
      ),
      repeating-linear-gradient(
        0deg,
        color-mix(in oklab, var(--nova-ink) 7%, transparent) 0 1px,
        transparent 1px 12px
      );
    pointer-events: none;
  }

  /* layer 3: the duration IS the reading. 4.0s at rest, 0.6s at full. */
  .panel__sweep {
    position: absolute;
    inset-block: 0;
    inline-size: 34%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in oklab, var(--nv-tone) 30%, transparent) 46%,
      color-mix(in oklab, var(--nv-tone) 52%, transparent) 62%,
      transparent 100%
    );
    filter: blur(2px);
    animation: panelSweep calc((118 - var(--nv-rate)) * 34ms) linear infinite;
    pointer-events: none;
  }

  /* layer 4 */
  .panel__bars {
    position: absolute;
    inset: 22% 6%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2px;
    pointer-events: none;
  }

  .panel__bar {
    flex: none;
    inline-size: 5px;
    border-radius: var(--r-xs);
    background: var(--nv-tone);
    /* the step function, floored at 0.16: SS11 makes the unread scale data too */
    block-size: calc(38% + var(--i) * 4.4%);
    opacity: calc(
      0.16 + clamp(0, calc((var(--nv-rate) - var(--i) * 7.14) * 100), 1) * 0.84
    );
  }

  /* layer 6: a specular cap on the upper third (SS2) */
  .panel__glass {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.03) 40%,
      transparent 62%
    );
    pointer-events: none;
  }

  .panel__state {
    justify-self: start;
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--nova-ink-secondary);
  }

  @keyframes panelSweep {
    from { translate: -100% 0; }
    to { translate: 300% 0; }
  }

  @media (hover: hover) and (pointer: fine) {
    .panel:hover .panel__sweep {
      animation-duration: calc((118 - var(--nv-rate)) * 20ms);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel { transition-duration: 1ms, 1ms; }
  }
`;

export default RatePanel;
