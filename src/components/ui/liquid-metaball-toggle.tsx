/* Twenty-odd declarations, and the cleverest thing in this batch. There is no
   thumb and no track: the whole toggle is ONE element whose ::before holds two
   white circles, and the gooey merge comes from

       filter: blur(0.66em) contrast(20)

   on the parent. Blur turns each circle into a soft ramp; contrast(20) crushes
   that ramp back to a hard edge -- so where two blurs overlap they read as one
   joined blob, and where they do not they read as two separate discs. That pair
   of functions IS the metaball. mix-blend-mode: darken is what lets the white
   circles subtract from the black body rather than sit on it.

   The transition easing is worth reading too: cubic-bezier(0.75, 0, 0.75, 50).
   A y2 of 50 is a fifty-fold overshoot, which on a 1px translate is a snap, not a
   wobble -- the element moves half a pixel and the curve makes that read as an
   instant commit while the ::before slides properly.

   It is an "appearance: none" checkbox styled directly, so it stays focusable and
   operable with no change. The upload writes no focus rule; one is added, and it
   has to sit OUTSIDE the blur-and-contrast filter or the ring would be crushed
   by contrast(20) along with everything else -- so it goes on a wrapper. */
import styled from 'styled-components';

export const LiquidMetaballToggle = ({ label = 'Liquid' }: { label?: string }) => {
  return (
    <StyledWrapper>
      {/* the ring lives here, outside the filtered element */}
      <span className="liquid-3-ring">
        <input className="liquid-3" type="checkbox" aria-label={label} />
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .liquid-3-ring {
    display: inline-block;
    border-radius: 20em;
    padding: 1em;
  }

  .liquid-3-ring:has(.liquid-3:focus-visible) {
    outline: 2px solid #000;
    outline-offset: 2px;
  }

  /* Measured: the input still picked up a ring of its own from the global
     input:focus-visible rule, and any ring drawn on THIS element passes through
     blur(0.66em) contrast(20) -- so it is crushed into the metaball along with
     everything else. Suppressed here, because the visible ring is on the wrapper
     outside the filter. */
  .liquid-3:focus-visible {
    outline: none;
  }

  .liquid-3 {
    --primary: #000;
    --secondary: #fff;
    --time: 0.6s;
    appearance: none;
    position: relative;
    cursor: pointer;
    width: 10em;
    aspect-ratio: 2 / 1;
    background: var(--primary);
    border-radius: 20em;
    box-shadow: 0 0 0 1em var(--secondary);
    transform: translateX(0.5px);
    transition: transform var(--time) cubic-bezier(0.75, 0, 0.75, 50);
    filter: blur(0.66em) contrast(20);
    mix-blend-mode: darken;
    overflow: hidden;
  }

  .liquid-3::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 100%;
    transform: translate(-25%, -50%);
    left: 50%;
    top: 50%;
    background: radial-gradient(
        closest-side circle at 12.5% 50%,
        var(--secondary) 50%,
        #0000 0
      ),
      radial-gradient(
        closest-side circle at 87.5% 50%,
        var(--secondary) 50%,
        #0000 0
      ),
      #f000;
    transition: transform var(--time) cubic-bezier(0.75, 0, 0.75, 1.3);
  }

  .liquid-3:checked {
    transform: translateX(-0.5px);
  }

  .liquid-3:checked::before {
    transform: translate(-75%, -50%);
  }

  /* The filter crushes contrast by 20x, which would eat any ring drawn inside
     it. Under reduced motion the 0.6s slide shortens; the merge itself is not
     motion, it is the drawing. */
  @media (prefers-reduced-motion: reduce) {
    .liquid-3,
    .liquid-3::before {
      transition-duration: 0.01ms;
    }
  }
`;

export default LiquidMetaballToggle;
