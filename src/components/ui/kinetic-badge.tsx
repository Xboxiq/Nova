/* A spin that does not accelerate on hover -- it jumps.

   `.badge-text` runs `spinSlow 10s linear infinite`, and the hover rule sets
   `spinSlow 3s linear infinite`. Same animation name, new duration. Changing a
   running animation's duration does not restart it and does not ease into the new
   speed: the animation keeps its current TIME and recomputes progress against the
   new duration. Five seconds into the 10s pass the badge is at 180deg; the moment
   the duration becomes 3s that same 5s reads as 1.67 cycles, so the badge snaps
   to 240deg and carries on faster. The faster spin is real; the smooth handover
   is not.

   That is the author's, and it is left alone -- but it is the kind of thing that
   gets "fixed" by someone who assumes a transition was forgotten, so it is named.

   `.loader {}` sits at the top of the upload: an empty rule, matching nothing,
   doing nothing. Kept, because deleting it would be tidying somebody else's file.

   `font-family: "Oswald", sans-serif` -- and the upload reaches the face through
   `@import url(...fonts.googleapis.com...)`. This repository's own bridge states
   that no external font host is introduced, so the import is not carried and the
   name falls through to the fallback. Oswald exists as a local package and adding
   it is one install and one import line, but that is a dependency decision and
   therefore the owner's, not something to slip in inside a component. Three
   uploads now name faces this repo does not load -- Inter, Clash Display, Oswald
   -- and all three are recorded rather than substituted.

   The rotating text needs a circular `<textPath>`; the upload gives its box and
   `overflow: visible` and nothing else, so the path is drawn here at the size the
   140px badge implies.

   Two additions: the anchor is written `<a href="#">`, and a link with no
   destination is not focusable and not announced, so it gets a real one. And a
   focus ring plus a `:focus-visible` mirror of the three hover consequences,
   since the entire component only reacts to a pointer. */
import styled from 'styled-components';

export const KineticBadge = ({
  text = 'VIEW MASTERPIECE • VIEW MASTERPIECE • ',
  href = '#masterpiece',
  label = 'View masterpiece',
}: { text?: string; href?: string; label?: string }) => (
  <StyledWrapper>
    {/* The name has to be here. Every child of this link is aria-hidden — the
        rotating textPath because it would otherwise be read one glyph at a time,
        the arrow because it is decoration — which left the anchor with NO
        accessible name at all, and axe reported `link-name` in six theme/viewport
        combinations. The second wave running in which my own accessibility
        handling was the defect rather than the upload: hiding the content is
        right, hiding it without replacing the name is not. */}
    <a className="kinetic-badge" href={href} aria-label={label}>
      <span className="badge-bg" />
      <span className="badge-text" aria-hidden="true">
        <svg viewBox="0 0 140 140" width={140} height={140}>
          <defs>
            <path id="kinetic-badge-ring" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
          </defs>
          <text fill="currentColor" fontSize="13" letterSpacing="1.5">
            <textPath href="#kinetic-badge-ring">{text}</textPath>
          </text>
        </svg>
      </span>
      <span className="badge-icon">
        <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .loader {
  }

  .kinetic-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 140px;
    text-decoration: none;
    color: #1a1a1a;
    font-family: "Oswald", sans-serif;
    border-radius: 50%;
    cursor: pointer;
  }

  /* Added: every rule below is hover-keyed. */
  .kinetic-badge:focus-visible {
    outline: 3px solid #1a1a1a;
    outline-offset: 4px;
  }

  /* The solid background that expands on hover */
  .badge-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    border-radius: 50%;
    transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);
    z-index: 1;
  }

  .kinetic-badge:hover .badge-bg,
  .kinetic-badge:focus-visible .badge-bg {
    transform: translate(-50%, -50%) scale(1);
  }

  /* The SVG Text Layer */
  .badge-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    /* Endless slow rotation */
    animation: spinSlow 10s linear infinite;
    transition: color 0.4s ease;
  }

  .badge-text svg {
    overflow: visible;
  }

  /* Smooth snap to white text on hover */
  .kinetic-badge:hover .badge-text,
  .kinetic-badge:focus-visible .badge-text {
    color: #f4f4f4;
    /* Accelerate the spin */
    animation: spinSlow 3s linear infinite;
  }

  /* The Center Icon */
  .badge-icon {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s cubic-bezier(0.85, 0, 0.15, 1);
    color: #1a1a1a;
  }

  /* Rotate and color-invert the arrow */
  .kinetic-badge:hover .badge-icon,
  .kinetic-badge:focus-visible .badge-icon {
    transform: rotate(45deg) scale(1.2);
    color: #f4f4f4;
  }

  /* Keyframes for the infinite text path rotation */
  @keyframes spinSlow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
