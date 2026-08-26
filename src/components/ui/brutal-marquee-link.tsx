/* A two-face link where the second face is a marquee, and the marquee is the
   reason the markup has four labels instead of one.

   THE FACE SWAP. Both faces are `position: absolute; inset: 0` inside a link with
   `overflow: hidden`. At rest the static face sits at translateY(0) and the hover
   face is parked at translateY(100%) -- one full height BELOW the box, so it is
   outside the clip. On hover the static face goes to translateY(-100%) and the
   hover face to 0, both over 500ms on `cubic-bezier(0.85, 0, 0.15, 1)`, which is
   an ease-in-out steep enough to read as a mechanical shove rather than a slide.
   Nothing fades; the clip does all the hiding.

   THE MARQUEE AND THE COUNT. `.marquee-track` is `width: max-content` and animates
   `translateX(0)` to `translateX(-50%)`. A translate of -50% of the TRACK is a
   seamless loop only if the second half is a copy of the first, so the track needs
   exactly TWO identical halves -- and the upload's own markup says "Let's Talk"
   four times, which is two per half. That is the count derived rather than
   guessed: the -50% fixes the number of halves at two, and the markup fixes the
   number of labels per half at two.

   `.marquee-half` carries `gap: 1.25rem` AND `padding-right: 1.25rem`, which is
   what makes the seam invisible: the gap between the two labels inside a half and
   the gap across the seam between halves are the same 20px.

   THE SHADOW THAT IS THE PRESS. `box-shadow: 6px 6px 0 0 #ff3366` with
   `transform: translate(6px, 6px)` on hover and `box-shadow: none` -- the button
   moves exactly onto its own shadow, so the offset is not decorative, it is the
   travel distance. `:active` keeps that translation and adds `scale(0.97)`, so the
   press happens after the button has already landed.

   THE FONT. `@import url("s://api.fontshare.com/...")` -- and note the scheme is
   "s://", not "https://", so the import is invalid and the face never loads even
   where the host is reachable. This repo's bridge forbids remote font hosts
   regardless, so "Clash Display" falls back to sans-serif here. Recorded, not
   silently dropped.

   THREE ADDITIONS.

   `outline: none` is declared and nothing replaces it, on a LINK -- so a keyboard
   user has no focus indicator at all. One `:focus-visible` rule restores it.

   The face swap is `:hover` only. On a link, that means the second label is
   unreachable by keyboard: focus does nothing. The two hover rules take
   `:focus-visible` alongside `:hover`, which is the difference between the
   component working and not working for a keyboard.

   The marquee repeats its label four times. Left alone a screen reader announces
   the link as "Start Project Let's Talk Let's Talk Let's Talk Let's Talk", so the
   marquee is `aria-hidden` -- and the static face's text stays visible to
   assistive technology, which is what keeps the link named. (The wave-9 mistake
   was hiding ALL of a link's content and leaving it nameless; the rule is hide the
   decoration, never the name.)

   Under `prefers-reduced-motion` this repo's blanket sets every animation to 1ms
   with one iteration, so the track lands on translateX(-50%) and stops -- the
   second half, which is a copy of the first, so the label still reads. That is why
   a two-half marquee degrades and a one-off scroll would not. */
import styled from 'styled-components';

const Arrow = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="square" />
  </svg>
);

const Star = () => (
  <svg className="icon icon-small" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.6 6.9L22 11l-7.4 2.1L12 20l-2.6-6.9L2 11l7.4-2.1z" />
  </svg>
);

/* Two labels per half, two halves per track: the -50% keyframe fixes the second
   number and the upload's own markup fixes the first. */
const Half = () => (
  <span className="marquee-half">
    <span className="text">Let&apos;s Talk</span>
    <Star />
    <span className="text">Let&apos;s Talk</span>
    <Star />
  </span>
);

export const BrutalMarqueeLink = ({
  label = 'Start Project',
  href = '#',
}: { label?: string; href?: string }) => (
  <StyledWrapper>
    <a className="brutal-btn" href={href}>
      <span className="face static-face">
        <span className="text">{label}</span>
        <Arrow />
      </span>
      <span className="face hover-face" aria-hidden="true">
        <span className="marquee-track">
          <Half />
          <Half />
        </span>
      </span>
    </a>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* Base Button Structure */
  .brutal-btn {
    position: relative;
    display: block;
    width: 16rem;
    height: 4rem;
    border: 3px solid #0a0a0a; /* neutral-950 */
    background-color: #0a0a0a;
    color: white;
    box-shadow: 6px 6px 0px 0px #ff3366;
    transition: all 300ms ease-out;
    overflow: hidden;
    cursor: pointer;
    /* The upload names "Clash Display" through an @import whose scheme is "s://".
       Invalid, and remote font hosts are forbidden here anyway. */
    font-family: "Clash Display", sans-serif;
    outline: none;
    text-decoration: none;
  }

  /* Hover and Active Mechanics */
  .brutal-btn:hover {
    transform: translate(6px, 6px);
    box-shadow: none;
  }

  .brutal-btn:active {
    /* Maintain the hover translation while shrinking the button */
    transform: translate(6px, 6px) scale(0.97);
    box-shadow: none;
  }

  /* Added: "outline: none" above is on a LINK and nothing replaces it. */
  .brutal-btn:focus-visible {
    outline: 3px solid #ff3366;
    outline-offset: 4px;
  }

  /* Common Face Logic */
  .face {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    transition: transform 500ms cubic-bezier(0.85, 0, 0.15, 1);
  }

  /* Static Face Logic */
  .static-face {
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: #0a0a0a;
    z-index: 10;
  }

  /* Added ":focus-visible": the swap is hover-only in the upload, which leaves
     the second face unreachable from a keyboard. */
  .brutal-btn:hover .static-face,
  .brutal-btn:focus-visible .static-face {
    transform: translateY(-100%);
  }

  /* Marquee Face Logic */
  .hover-face {
    background-color: #ff3366;
    color: #0a0a0a;
    transform: translateY(100%);
    z-index: 20;
  }

  .brutal-btn:hover .hover-face,
  .brutal-btn:focus-visible .hover-face {
    transform: translateY(0);
  }

  /* Typography and Icon Sizing */
  .text {
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .static-face .text {
    color: white;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }

  .icon-small {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  /* Marquee Animation Engine */
  .marquee-track {
    display: flex;
    width: max-content;
    animation: brutalMarquee 4s linear infinite;
  }

  .marquee-half {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding-right: 1.25rem;
    flex-shrink: 0;
  }

  @keyframes brutalMarquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

export default BrutalMarqueeLink;
