/* A button whose entire effect is three radial gradients and one escaped layer.

   No hover. No active. No transition. Everything this component does, it does
   standing still, which makes it the clearest specimen in the log of a gradient
   used as a light source rather than as decoration:

     .button    radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)
     .inner     radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)
     .inner::before  radial-gradient(circle 60px at 0% 100%, #00e1ff1a, ...)

   All three place their light source OUTSIDE the element -- above it at -10% and
   -50%, below-left at 0% 100%. The 2px of padding on the button with the darker
   gradient on the inner panel is what makes the rim read as a lit bevel: the same
   highlight, sampled 40% further from its source on the inside. And the two
   negative offsets differ, so the rim's highlight is tighter than the face's.

   `.blob1` is the blue: a 70px column at the bottom-left corner with its own
   radial gradient stopping at `transparent`, plus a shadow thrown up and left.
   `.inner` sits at `z-index: 3`, so the blob is behind the face, and
   `.inner::before` lays the same blue back over it at a tenth of the opacity.
   Three passes of one colour at three strengths.

   The one thing that needed adding beyond a focus ring: `.button::after` carries
   `z-index: -1`, and a negative z-index does not stop at a positioned parent --
   it climbs to the nearest ancestor that establishes a stacking context and
   paints beneath everything on the way. The glow was landing behind the page's
   own background. `isolation: isolate` on the button makes the button that
   ancestor, which is the same one-declaration fix the yield card needed.

   And the upload has no focus style at all, on a component with no other state
   -- so the ring is the only feedback a keyboard user can get here. */
import styled from 'styled-components';

export const RealismButton = ({
  children = 'Realism',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="button" type="button" {...rest}>
      <span className="blob1" />
      <span className="inner">{children}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    font-size: 1.4rem;
    border-radius: 16px;
    border: none;
    padding: 2px;
    background: radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b);
    position: relative;
    /* Added: without this the -1 layer below escapes the button entirely. */
    isolation: isolate;
  }

  /* Added: the upload has no focus state, and no hover or active either, so
     this is the only feedback available to a keyboard. */
  .button:focus-visible {
    outline: 3px solid #3fe9ff;
    outline-offset: 4px;
  }

  .button::after {
    content: "";
    position: absolute;
    width: 65%;
    height: 60%;
    border-radius: 120px;
    top: 0;
    right: 0;
    box-shadow: 0 0 20px #ffffff38;
    z-index: -1;
  }

  .blob1 {
    position: absolute;
    width: 70px;
    height: 100%;
    border-radius: 16px;
    bottom: 0;
    left: 0;
    background: radial-gradient(
      circle 60px at 0% 100%,
      #3fe9ff,
      #0000ff80,
      transparent
    );
    box-shadow: -10px 10px 30px #0051ff2d;
  }

  .inner {
    padding: 14px 25px;
    border-radius: 14px;
    color: #fff;
    z-index: 3;
    position: relative;
    background: radial-gradient(circle 80px at 80% -50%, #777777, #0f1111);
    display: block;
  }

  .inner::before {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 14px;
    background: radial-gradient(
      circle 60px at 0% 100%,
      #00e1ff1a,
      #0000ff11,
      transparent
    );
    position: absolute;
  }
`;
