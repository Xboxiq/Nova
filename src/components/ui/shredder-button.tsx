/* An animation keyed on :focus rather than :active, a keyframe list played
   backwards, and a negative layer that escapes its wrapper for the third time in
   this log.

   The shred fires on `.btn-delete:focus ~ .document` -- FOCUS, not click and not
   active. So tabbing to the button shreds the sheet before anything is pressed,
   exactly like the letters button earlier in this log. That is the author's
   choice and it stays, but it means focus and "the destructive thing happened"
   are one signal here, which is worth knowing before this is wired to anything
   real.

   `@keyframes shred` is applied with `reverse`, so it runs 100% -> 0%: the strips
   begin fully drawn and clipped away from the bottom, and un-shred upward. Both
   ends of that keyframe list set `stroke-width: 9` while the base rule sets
   `stroke-width: 0`, which is how the strips exist only while the animation is
   running -- there is no state in which a 9px stroke is painted at rest.

   `feed` is the other half: `clip-path: inset(0%)` to `inset(100% 0 0 0)` eats the
   document from the TOP downward, so the sheet disappears into the button's upper
   edge while the strips appear below it.

   The rollers are `::before` and `::after` on the button: 10px wide with
   `aspect-ratio: 1 / 2` and `border-radius: 35%`, `background-color: inherit` so
   they are always exactly the button's red. Hover pushes them 4px outward and
   `:active` pulls them back to 0 -- a press squeezes the machine shut.

   The defect: `.document` carries `z-index: -1`, and `.wrapper` is
   `position: relative` with NO z-index. Relative positioning alone does not
   create a stacking context, so the negative layer climbs past the wrapper to the
   nearest ancestor that does and paints beneath everything on the way -- the page
   background included. This is the third time this exact escape has appeared
   here (the yield card, the Realism glow, now this), and the fix is the same
   single declaration: `isolation: isolate` makes `.wrapper` the context the
   author assumed it already was.

   `background-image: radial-gradient(circle at 50% -50%, #fff, 10%, #0000)` puts
   the light source above the button, outside it -- the same trick as the Realism
   button, and the reason the red reads as moulded rather than flat.

   Two additions: `type="button"`, and a focus ring. The `:focus` rules already
   drive the animation, so the ring is the only thing missing from that state. */
import styled from 'styled-components';

const STRIPS = [0, 1, 2, 3, 4, 5, 6, 7];

export const ShredderButton = ({
  children = 'Shred',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <div className="wrapper">
      <button className="btn-delete" type="button" {...rest}>
        <svg className="btn-svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16v2H4zm2 4h12l-.7 9.1A2 2 0 0 1 15.3 22H8.7a2 2 0 0 1-2-1.9L6 11zm3-8h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z" />
        </svg>
        {children}
      </button>
      <div className="document" />
      <svg className="shredded" viewBox="0 0 100 200" width={120} height={240} aria-hidden="true">
        {STRIPS.map((i) => (
          <path key={i} d={`M ${6 + i * 12} 0 L ${6 + i * 12} 200`} />
        ))}
      </svg>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .wrapper {
    position: relative;
    /* Added: .document is z-index -1 and "position: relative" alone does NOT
       create a stacking context, so the sheet escaped this wrapper entirely and
       painted behind the page. Third time in this log. */
    isolation: isolate;
  }

  .btn-delete {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    user-select: none;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1.4rem 0.5rem 1rem;
    background-color: rgb(255, 0, 0);
    background-image: radial-gradient(circle at 50% -50%, #fff, 10%, #0000);
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 0.9em;
    color: #fff;
    cursor: pointer;
    box-shadow:
      0px 1px 1px rgba(3, 7, 18, 0.16),
      0px 3px 4px rgba(3, 7, 18, 0.14),
      0px 7px 9px rgba(3, 7, 18, 0.11),
      0px 12px 16px rgba(3, 7, 18, 0.09),
      0px 19px 26px rgba(3, 7, 18, 0.07),
      0px 27px 37px rgba(3, 7, 18, 0.05),
      0px 37px 50px rgba(3, 7, 18, 0.02);
    transition:
      box-shadow 0.3s ease,
      transform 0.15s ease;
    position: relative;
  }

  /* Added: the :focus rules below already run the animation; this is the ring
     that state had no way to show. */
  .btn-delete:focus-visible {
    outline: 3px solid rgb(255, 0, 0);
    outline-offset: 4px;
  }

  .btn-delete::after,
  .btn-delete::before {
    content: "";
    position: absolute;
    top: calc(50% - 10px);
    left: 0px;
    width: 10px;
    aspect-ratio: 1 / 2;
    border-radius: 35%;
    background-color: inherit;
    opacity: 1;
    transition:
      left 0.3s ease,
      right 0.3s ease,
      opacity 0.3s ease;
  }

  .btn-delete::after {
    left: auto;
    right: 0px;
  }

  .btn-svg {
    width: 24px;
    height: 24px;
    fill: #fff9;
    stroke: #fff0;
    transition: transform 0.3s ease;
  }

  .btn-delete:hover {
    box-shadow:
      0px 3px 4px rgba(3, 7, 18, 0.13),
      0px 14px 17px rgba(3, 7, 18, 0.11),
      0px 31px 38px rgba(3, 7, 18, 0.09),
      0px 55px 67px rgba(3, 7, 18, 0.07),
      0px 86px 105px rgba(3, 7, 18, 0.06),
      0px 124px 151px rgba(3, 7, 18, 0.04),
      0px 169px 206px rgba(3, 7, 18, 0.02);
    transform: scale(1.07);
  }

  .btn-delete:hover .btn-svg {
    transform: rotate(-8deg) scale(1.8);
  }

  .btn-delete:hover::after {
    opacity: 1;
    right: -4px;
  }

  .btn-delete:hover::before {
    opacity: 1;
    left: -4px;
  }

  .btn-delete:active::after {
    right: 0px;
  }

  .btn-delete:active::before {
    left: 0px;
  }

  .document {
    z-index: -1;
    position: absolute;
    top: -180%;
    left: 50%;
    width: 78%;
    height: 160px;
    background-color: #fff;
    border: 1px solid #0002;
    transform: translate(-50%, 0%) scale(0);
    transition:
      transform 0.3s ease,
      opacity 1s ease;
    filter: drop-shadow(0 0 5px #0001);
    opacity: 0;
  }

  .btn-delete:hover ~ .document {
    transform: translate(-50%, -30%) scale(1);
    opacity: 1;
  }

  .btn-delete:focus ~ .document {
    animation: feed 1.5s forwards;
    transform: translate(-50%, -50%) scale(1);
  }

  .shredded {
    position: absolute;
    z-index: -1;
    stroke: #fff;
    fill: none;
    stroke-width: 0;
    filter: drop-shadow(0 0 5px #0001);
    top: -180%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .btn-delete:focus ~ .shredded {
    animation: shred 1.5s cubic-bezier(1, 0.6, 0.6, 1) reverse;
  }

  @keyframes feed {
    0% {
      clip-path: inset(0% 0% 0% 0%);
    }
    100% {
      clip-path: inset(100% 0% 0% 0%);
    }
  }

  @keyframes shred {
    0% {
      stroke-width: 9;
      opacity: 0;
      clip-path: inset(0% 0% 0% 0%);
    }
    30% {
      opacity: 1;
    }
    100% {
      stroke-width: 9;
      clip-path: inset(0% 0% 100% 0%);
    }
  }
`;
