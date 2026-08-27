/* عجلةُ الاختيار — مِحوَرٌ خارجَ اللوحِ، فالمواضعُ على عجلةٍ واحدةٍ لا كلماتٌ تدور.
   WheelSelect -- the pivot is off the panel, so N labels are N positions on one
   wheel rather than N words that rotate.

   THE MECHANISM. `transform-origin: calc(100% + 9.5rem) center` puts the centre of
   rotation well outside the drum, so a label swinging 18deg travels on an arc whose
   radius is the distance to that centre -- long, shallow, and reading as a physical
   cylinder turning behind a window. The corpus found this once (upload 52) and used
   it for three words; the geometry deserves better, so here it carries a real
   selection.

   ONE SCALAR, EVERY LABEL. `--nv-index` is registered and interpolated, and every
   label's angle and brightness is arithmetic on its distance from it:

     angle    rotate(calc((var(--i) - var(--nv-index)) * 18deg))
     lit      1 - clamp(0, |i - index|, 1)      via max(d, -d) for the modulus
     depth    translateZ is not used; the shading does the depth

   So there is no "selected" class and no per-item state. Move the scalar and the
   whole drum turns, every label following its own distance from the new centre.

   NATIVE RADIOS, SO THE KEYBOARD IS FREE. Real `<input type="radio">` sharing one
   name gives arrow-key traversal, roving tabindex and the group semantics without a
   line of script. They are hidden the one correct way the corpus found -- zero size
   at zero opacity inside their own label, never `display: none`, which is what eight
   uploads used and what takes a control out of the tab order entirely. The names and
   ids come from useId().

   RICHNESS THAT IS STILL A READING. The drum's shading is a cylinder lit from above
   (SS2); the window is a band with a hairline top and a dark sill; the selected
   label carries a bloom whose strength is its own lit value, so the glow is the
   selection rather than a decoration next to it; and the detent notch marks the
   window's centre, which is the only position that means anything. */
import { useId, useState } from 'react';
import styled from 'styled-components';

const OPTIONS = ['Draft', 'Review', 'Staged', 'Live', 'Archived'];

export const WheelSelect = ({
  label = 'Stage',
  options = OPTIONS,
  defaultIndex = 3,
  onChange,
}: { label?: string; options?: string[]; defaultIndex?: number; onChange?: (i: number) => void }) => {
  const [index, setIndex] = useState(Math.min(defaultIndex, options.length - 1));
  const uid = useId().replace(/:/g, '');
  const groupName = 'nv-wheel-' + uid;
  const labelId = groupName + '-label';

  const pick = (i: number) => { setIndex(i); onChange?.(i); };

  return (
    <StyledWrapper>
      <div className="wheel" style={{ ['--nv-index' as string]: index }}>
        <span className="wheel__caption" id={labelId}>{label}</span>

        <div className="wheel__drum" role="radiogroup" aria-labelledby={labelId}>
          <span className="wheel__cylinder" aria-hidden="true" />
          <span className="wheel__sill" aria-hidden="true" />

          {options.map((opt, i) => (
            <label
              className="wheel__slot"
              key={opt}
              style={{ ['--i' as string]: i }}
              htmlFor={groupName + '-' + i}
            >
              {/* zero-size at zero opacity inside its own label: focusable, and
                  the arrow keys are the browser's, not mine */}
              <input
                className="wheel__input"
                type="radio"
                name={groupName}
                id={groupName + '-' + i}
                checked={i === index}
                onChange={() => pick(i)}
              />
              <span className="wheel__text">{opt}</span>
            </label>
          ))}

          <span className="wheel__detent" aria-hidden="true" />
          <span className="wheel__glass" aria-hidden="true" />
        </div>

        {/* no readout: the window already shows the selection, and a second copy
            of one fact is the corpus's habit, not this family's */}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @property --nv-index {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  .wheel {
    display: grid;
    justify-items: center;
    gap: 0.5rem;
    inline-size: 14rem;
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
    transition: --nv-index 380ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .wheel__caption {
    justify-self: start;
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
    color: var(--nova-ink-secondary);
  }

  .wheel__drum {
    position: relative;
    inline-size: 100%;
    block-size: 5.25rem;
    border-radius: var(--r-md);
    overflow: hidden;
    isolation: isolate;
  }

  /* a cylinder, lit from above */
  .wheel__cylinder {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        color-mix(in oklab, var(--nova-surface-quiet) 62%, black) 0%,
        color-mix(in oklab, var(--nova-surface-quiet) 96%, white) 46%,
        color-mix(in oklab, var(--nova-surface-quiet) 70%, black) 100%
      );
    box-shadow: var(--depth-instrument-well);
  }

  /* the window's dark sill, so the band reads as an opening and not a stripe */
  .wheel__sill {
    position: absolute;
    inset-inline: 0;
    inset-block: 38% 38%;
    background: color-mix(in oklab, var(--nova-ink) 8%, transparent);
    box-shadow:
      inset 0 1px 0 var(--bevel-hair),
      inset 0 -1px 0 color-mix(in oklab, var(--nova-ink) 22%, transparent);
    pointer-events: none;
  }

  .wheel__slot {
    /* --nv-lit: 1 at the window, 0 one step away and beyond. max(d, -d) is the
       modulus, so no abs() is needed and support is not a question. */
    --nv-d: calc(var(--i) - var(--nv-index));
    --nv-lit: calc(1 - clamp(0, max(var(--nv-d), calc(var(--nv-d) * -1)), 1));

    position: absolute;
    inset-block-start: 50%;
    inset-inline: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    /* the pivot, well outside the drum: a long shallow arc, not a spin */
    transform-origin: calc(100% + 9.5rem) center;
    /* 6deg, and NOTHING added to it. Two measurements settled this.

       The pivot sits about 264px from the drum's centre, so one step of theta
       travels 264 * sin(theta) vertically. At 18deg that is 118px inside an 84px
       drum: every neighbour landed outside the clip and the drum showed one word in
       a static box -- a wheel with nothing left to be a wheel.

       Then a vertical offset was added on top of the rotation to space them, and it
       made it worse, because THE ROTATION IS ALREADY THE VERTICAL TRAVEL. About a
       right-hand pivot, rotate(d * 6deg) moves the slot roughly -27.6px * d, and the
       added translate moved it +24.8px * d. The two cancelled to about -2.8px * d
       and all five labels stacked in the window as one smudge. So the rotation does
       the spacing alone, and 6deg is chosen because 264 * sin(6deg) is 27.6px --
       just outside the 30px window and inside the 84px drum, which is exactly where
       a neighbour has to sit. */
    /* negative, so a later option sits BELOW the window: a drum advances downward,
       which is the convention every picker on a phone already taught the reader. */
    transform: translateY(-50%) rotate(calc(var(--nv-d) * -6deg));
    /* floored at 0.28: a neighbour has to be legible for the drum to read as
       continuous. At 0.14 they were invisible. */
    opacity: calc(0.28 + var(--nv-lit) * 0.72);
    transition: opacity 380ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .wheel__input {
    position: absolute;
    inline-size: 0;
    block-size: 0;
    opacity: 0;
  }

  .wheel__text {
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--nova-ink);
    /* the bloom IS the selection: its strength is the slot's own lit value */
    filter: drop-shadow(
      0 0 calc(var(--nv-lit) * 10px)
        color-mix(in oklab, var(--nova-action) calc(var(--nv-lit) * 60%), transparent)
    );
  }

  .wheel__slot:has(.wheel__input:focus-visible) .wheel__text {
    outline: 2px solid var(--nova-action);
    outline-offset: 4px;
    border-radius: var(--r-xs);
  }

  /* the window's own frame: the only position that means anything, marked at both
     ends rather than by a lone tick floating at one side */
  .wheel__detent {
    position: absolute;
    inset-inline: 0.3125rem;
    inset-block: 38% 38%;
    border-radius: var(--r-xs);
    border-inline: 2px solid var(--nova-action);
    box-shadow: var(--depth-instrument-bloom);
    pointer-events: none;
  }

  .wheel__glass {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.02) 34%,
      transparent 52%
    );
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .wheel { transition-duration: 1ms; }
    .wheel__slot { transition-duration: 1ms; }
  }
`;

export default WheelSelect;
