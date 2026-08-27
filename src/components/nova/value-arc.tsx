/* قُرصُ القيمة — والغِنى فيه معلومةٌ لا زخرفة.
   ValueArc -- a dial where the richness is a reading.

   WHY THIS WAS REWRITTEN. The first version of this file was measured, gated and
   correct, and it looked like a wireframe: two layers, four token colours, one flat
   stroke, and no hover rule anywhere. That was not taste, it was constraints
   over-applied -- I had banned literal shadows, refused to leave the four
   `--nova-*` colours, and skipped the corpus's best motion idea entirely. The
   imported ninety-five are rich because they stack six to ten layers, derive many
   gradient stops, and run five animations at once.

   So the constraints were widened rather than dropped, and every widening keeps the
   gate green:

     depth       four new NAMED tokens in bridge.css instead of inline shadows
     colour      many stops, all `color-mix()` off the theme's own tokens
     layers       six, not two: bezel, well, halo, bloom, arc, dome
     hover       permitted, and gated behind (hover: hover) so nothing sticks

   AND THE RICHNESS IS INFORMATION. This is the part the corpus never reached: its
   glows and halos are constant, so they say nothing. Here every decorative layer is
   arithmetic on the same scalar the reading is:

     the bloom's spread   --depth-instrument-bloom is calc() on var(--nv-value)
     the halo's opacity   calc(0.10 + var(--nv-value) * 0.0042)
     the arc's dash       var(--nv-value) 100 with pathLength="100"
     the needle's angle   calc(-135deg + var(--nv-value) * 2.7deg)
     the tick step        clamp(0, (var(--nv-value) - var(--i) * 10) * 100, 1)

   Five facts, one number, one interpolation. Turn the dial up and the instrument
   does not merely point higher -- it gets brighter, because on a real instrument
   heat and reading are the same event.

   THE ARC IS A GRADIENT, NOT A COLOUR. An SVG stroke cannot take a CSS gradient, so
   the fill strokes `url(#id)` and the stops are set from CSS -- which means they can
   be `color-mix(in oklab, var(--nova-action) …)` and stay theme-derived. The
   gradient runs top-light to bottom-dark, because VISUAL-LAW SS2 puts the light
   directly above and a dial lit from anywhere else reads as a sticker.

   The id comes from `useId()`. Two dials on one page was the corpus's most common
   latent defect -- literal ids, duplicated, invalidating the document.

   HOVER SPEEDS UP WHAT IS ALREADY RUNNING. Upload 31's halving of five durations is
   the best motion idea in the whole corpus: changing `animation-duration` on a
   running animation keeps the progress fraction, so nothing restarts and the whole
   instrument just gets more urgent. Here the halo goes 14s to 7s and the dome's
   sheen 9s to 5s. It sits behind `@media (hover: hover) and (pointer: fine)` so a
   touch reader is never left in a stuck state.

   WHAT DID NOT CHANGE. The reading is still the motion, the readout still sits
   OUTSIDE the bezel so no translucent layer composites over text -- that is the
   trap that made a contrast gate flaky earlier in this repo -- and the keyboard
   contract, the theme derivation and the reduced-motion answer are the same. This
   version has both animations AND transitions, so the repo blanket covers one half
   and the block at the foot covers the other. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const TICKS = Array.from({ length: 11 }, (_, i) => i);

/* 270deg opening at the bottom: theta -135deg to +135deg about (60, 62), r = 46.
   Endpoints computed: 46 * sin(135deg) = 32.527. */
const ARC = 'M27.473 94.527 A46 46 0 1 1 92.527 94.527';

const clampValue = (n: number) => Math.min(100, Math.max(0, n));

export const ValueArc = ({
  label = 'Load',
  unit = '%',
  value: controlled,
  defaultValue = 62,
  onChange,
}: {
  label?: string;
  unit?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (n: number) => void;
}) => {
  const [own, setOwn] = useState(defaultValue);
  const value = clampValue(controlled ?? own);
  const uid = useId().replace(/:/g, '');
  const gradId = 'nv-arc-' + uid;
  const labelId = 'nv-lbl-' + uid;

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
        className="dial"
        style={{ ['--nv-value' as string]: value }}
        role="slider"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={value + unit}
        onKeyDown={onKeyDown}
      >
        <div className="dial__bezel">
          {/* ambient light, and its opacity is the reading */}
          <span className="dial__halo" aria-hidden="true" />
          <span className="dial__well" aria-hidden="true" />

          <svg className="dial__face" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              {/* stops are set from CSS, so they can be color-mix of a theme token */}
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop className="dial__stop dial__stop--a" offset="0%" />
                <stop className="dial__stop dial__stop--b" offset="52%" />
                <stop className="dial__stop dial__stop--c" offset="100%" />
              </linearGradient>
            </defs>

            <path className="dial__track" d={ARC} pathLength={100} />
            {/* the bloom carries the same dash, so the glow stops where the value does */}
            <path className="dial__bloom" d={ARC} pathLength={100} stroke={'url(#' + gradId + ')'} />
            <path className="dial__fill" d={ARC} pathLength={100} stroke={'url(#' + gradId + ')'} />

            {TICKS.map((i) => (
              <line
                key={i}
                className="dial__tick"
                x1="60" y1="22" x2="60" y2="28"
                style={{ ['--i' as string]: i }}
              />
            ))}

            <line className="dial__needle-shadow" x1="60" y1="62" x2="60" y2="32" />
            <line className="dial__needle" x1="60" y1="62" x2="60" y2="32" />
            <circle className="dial__hub" cx="60" cy="62" r="4.5" />
          </svg>

          <span className="dial__dome" aria-hidden="true" />
        </div>

        {/* outside the bezel: nothing translucent composites over the numerals */}
        <p className="dial__readout">
          <output className="dial__value">{value}</output>
          <span className="dial__unit">{unit}</span>
        </p>
        <span className="dial__label" id={labelId}>{label}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The family's scalar. Registered, so it interpolates. It must INHERIT: set on
     the root and read by six descendants -- the first draft wrote inherits: false
     and every descendant computed the initial 0 instead. What stops one
     instrument's value reaching another is that each declares its own on its own
     root, so an inner one shadows an outer. */
  @property --nv-value {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .dial {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 0.375rem;
    padding: 0.75rem;
    inline-size: 13.5rem;
    /* the family's card: same border, same lit-from-above ground, same depth as
       the delta gauge, so two instruments read as one set rather than two widgets */
    border: 1px solid var(--nova-border);
    border-radius: var(--r-lg);
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nova-surface) 92%, white) 0%,
        var(--nova-surface) 42%
      );
    box-shadow: var(--depth-widget);
    transition: --nv-value 340ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .dial:focus-visible {
    outline: 2px solid var(--nova-action);
    outline-offset: 4px;
  }

  /* layer 1: the bezel. Four bevels and a drop, from one named token. */
  .dial__bezel {
    position: relative;
    inline-size: 9.5rem;
    block-size: 9.5rem;
    border-radius: 50%;
    isolation: isolate;
    background:
      radial-gradient(
        circle at 50% 8%,
        color-mix(in oklab, var(--nova-surface-raised) 88%, white) 0%,
        var(--nova-surface-raised) 46%,
        color-mix(in oklab, var(--nova-surface-raised) 88%, black) 100%
      );
    box-shadow: var(--depth-instrument-bezel);
  }

  /* layer 2: the well the dial sits in */
  .dial__well {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    box-shadow: var(--depth-instrument-well);
    pointer-events: none;
  }

  /* layer 3: ambient light. Its OPACITY is the reading. */
  .dial__halo {
    position: absolute;
    inset: -14%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      color-mix(in oklab, var(--nova-action) 42%, transparent) 62deg,
      transparent 132deg,
      color-mix(in oklab, var(--nova-action) 22%, transparent) 214deg,
      transparent 300deg
    );
    filter: blur(14px);
    opacity: calc(0.1 + var(--nv-value) * 0.0042);
    animation: dialHalo 14s linear infinite;
    pointer-events: none;
    z-index: -1;
  }

  .dial__face {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    overflow: visible;
  }

  /* the gradient's stops, derived from the theme rather than declared */
  .dial__stop--a { stop-color: color-mix(in oklab, var(--nova-action) 62%, white); }
  .dial__stop--b { stop-color: var(--nova-action); }
  .dial__stop--c { stop-color: color-mix(in oklab, var(--nova-action) 72%, black); }

  .dial__track,
  .dial__bloom,
  .dial__fill {
    fill: none;
    stroke-linecap: round;
  }

  /* The unread part of the scale, and SS11 again: mixed off the theme's INK rather
     than its border, because border-on-raised is near-white in the light packs and
     the remainder of the arc disappeared. Ink flips with the theme, so one
     declaration is a ghost in all seven. */
  .dial__track {
    stroke: color-mix(in oklab, var(--nova-ink) 14%, transparent);
    stroke-width: 8;
  }

  /* layer 4: the bloom. Same dash, so the glow ends where the reading ends. */
  .dial__bloom {
    stroke-width: 13;
    stroke-dasharray: var(--nv-value) 100;
    filter: blur(6px);
    opacity: calc(0.24 + var(--nv-value) * 0.0035);
  }

  /* layer 5: the reading itself */
  .dial__fill {
    stroke-width: 8;
    stroke-dasharray: var(--nv-value) 100;
  }

  /* r 34..40, inside the arc's inner edge at 42, with the needle stopping at 30.
     The first draft put them at r 40..47 and they collided with the 8-wide stroke
     centred on 46 -- a dial's marks sit clear of its scale, never on it. */
  .dial__tick {
    stroke: var(--nova-ink);
    stroke-width: 1.8;
    stroke-linecap: round;
    transform-box: view-box;
    transform-origin: 60px 62px;
    transform: rotate(calc(-135deg + var(--i) * 27deg));
    /* clamp saturates, so this is a step function on the same scalar -- floored at
       0.18 rather than 0, because SS11 makes the unread part of a scale data too:
       at zero the marks vanished and the scale looked as though it ended at the
       needle. Lit is 1, unread is a ghost, and both are the same declaration. */
    opacity: calc(0.18 + clamp(0, calc((var(--nv-value) - var(--i) * 10) * 100), 1) * 0.82);
  }

  .dial__needle,
  .dial__needle-shadow {
    stroke-linecap: round;
    transform-box: view-box;
    transform-origin: 60px 62px;
    transform: rotate(calc(-135deg + var(--nv-value) * 2.7deg));
  }

  .dial__needle-shadow {
    stroke: rgba(0, 0, 0, 0.34);
    stroke-width: 4;
    filter: blur(2px);
    translate: 0 1.5px;
  }

  .dial__needle {
    stroke: var(--nova-ink);
    stroke-width: 2.5;
  }

  .dial__hub {
    fill: color-mix(in oklab, var(--nova-surface-raised) 80%, white);
    stroke: var(--nova-ink);
    stroke-width: 2.5;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
  }

  /* layer 6: the glass. Light from directly above (SS2), plus a slow sheen. */
  .dial__dome {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      radial-gradient(
        ellipse 58% 30% at 50% 3%,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.07) 52%,
        transparent 76%
      ),
      linear-gradient(
        158deg,
        transparent 0 44%,
        rgba(255, 255, 255, 0.07) 50%,
        transparent 56% 100%
      );
    background-size: 100% 100%, 260% 100%;
    /* Glass reads from the upper half. The first draft ran the sheen across the
       whole face with mix-blend-mode: screen and the dial went foggy -- a
       highlight that covers everything is not a highlight. */
    mask-image: linear-gradient(180deg, black 0%, black 42%, transparent 76%);
    animation: dialSheen 9s ease-in-out infinite;
    pointer-events: none;
  }

  .dial__readout {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.125rem;
    color: var(--nova-ink);
  }

  .dial__value {
    font-size: 1.875rem;
    font-weight: 660;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .dial__unit {
    font-size: 0.875rem;
    color: var(--nova-ink-secondary);
  }

  .dial__label {
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--nova-ink-secondary);
  }

  @keyframes dialHalo {
    to { rotate: 360deg; }
  }

  @keyframes dialSheen {
    0%, 100% { background-position: 0 0, 130% 0; }
    50% { background-position: 0 0, -30% 0; }
  }

  /* Hover does not add motion; it halves what is running. Changing the duration of
     a running animation keeps its progress fraction, so nothing restarts.
     Gated, so a touch reader is never left in a state a finger cannot clear. */
  @media (hover: hover) and (pointer: fine) {
    .dial:hover .dial__halo { animation-duration: 7s; }
    .dial:hover .dial__dome { animation-duration: 5s; }
  }

  /* The blanket in tokens.css neutralises the two animations above. It does not
     touch a transition, so the scalar needs its own answer. */
  @media (prefers-reduced-motion: reduce) {
    .dial {
      transition-duration: 1ms;
    }
  }
`;

export default ValueArc;
