/* Two icon buttons whose animation morphs the path data itself.

   The rare thing here is what the keyframes animate:

     @keyframes has-saved-line-bottom {
       33.333% { d: path("M 17 20 L 17 13 L 7 13 L 7 20"); }
       99.999% { d: path("M 17 21 L 17 21 L 7 21 L 7 21"); }
     }

   That is the `d` property -- the geometry of the path, not a transform of it.
   The bookmark's lower notch is not scaled or rotated flat; its four points are
   moved until the two upper ones sit exactly on the two lower ones, which is how
   the notch closes into a straight edge. Then a SECOND animation
   (`has-saved-line-bottom-2`) reopens it, delayed by 75% of the first
   animation's duration and running in the same declaration list -- two
   animations on one element, sequenced by delay, because one keyframe list
   cannot both close and reopen and end on `fill: white`.

   Animating `d` requires the paths to be structurally identical -- same commands,
   same count -- which is why every value in those keyframes is four points and
   why the paths in the markup have to be written the same way. It is also
   Chromium-only for now; elsewhere the notch simply does not move, and the
   scale-and-rotate half of the same keyframes still plays.

   The zoom is one gesture in three custom properties: `--zoom-from: 1.75`,
   `--zoom-via: 0.75`, `--zoom-to: 1`. Overshoot, undershoot, settle -- with a
   20-degree rotation only at the middle step, so the icon tips as it passes
   through its smallest point.

   `.has_liked` is styled by two selectors here and given no animation of its own
   in the upload, so it inherits only the colour change. Left exactly that way.

   Two additions. Both are icon-only buttons with no text and no `aria-label`, so
   they announced as "button"; and every rule is keyed on `:hover`, so a keyboard
   user got no border colour, no fill and no animation. `:focus-visible` carries
   the same colour change, plus a real ring. */
import styled from 'styled-components';

export const HasActionButtons = ({
  saveLabel = 'Save',
  likeLabel = 'Like',
}: { saveLabel?: string; likeLabel?: string }) => (
  <StyledWrapper>
    <button className="action_has has_saved" type="button" aria-label={saveLabel}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path data-path="box" d="M 5 3 L 19 3 L 19 21 L 12 16 L 5 21 Z" />
        <path data-path="line-top" d="M 3 5 L 3 3 L 3 3" />
        <path data-path="line-bottom" d="M 17 20 L 17 13 L 7 13 L 7 20" />
      </svg>
    </button>
    <button className="action_has has_liked" type="button" aria-label={likeLabel}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M12 20.3 4.6 13a4.8 4.8 0 0 1 6.8-6.8l.6.6.6-.6A4.8 4.8 0 0 1 19.4 13z" />
      </svg>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  gap: 0.75rem;

  .action_has {
    --color: 0 0% 60%;
    --color-has: 211deg 100% 48%;
    --sz: 1rem;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(var(--sz) * 2.5);
    width: calc(var(--sz) * 2.5);
    padding: 0.4rem 0.5rem;
    border-radius: 0.375rem;
    border: 0.0625rem solid hsl(var(--color));
    background: transparent;
    color: hsl(var(--color));
  }

  .has_saved:hover {
    border-color: hsl(var(--color-has));
  }

  .has_liked:hover svg,
  .has_saved:hover svg {
    color: hsl(var(--color-has));
  }

  /* Added: every rule in the upload is keyed on :hover, so a keyboard user got
     no colour change at all -- and neither button had a name. */
  .action_has:focus-visible {
    border-color: hsl(var(--color-has));
    outline: 3px solid hsl(var(--color-has));
    outline-offset: 3px;
  }

  .action_has:focus-visible svg {
    color: hsl(var(--color-has));
  }

  .has_liked svg,
  .has_saved svg {
    overflow: visible;
    height: calc(var(--sz) * 1.75);
    width: calc(var(--sz) * 1.75);
    --ease: cubic-bezier(0.5, 0, 0.25, 1);
    --zoom-from: 1.75;
    --zoom-via: 0.75;
    --zoom-to: 1;
    --duration: 1s;
  }

  .has_saved:hover path[data-path="box"] {
    transition: all 0.3s var(--ease);
    animation: has-saved var(--duration) var(--ease) forwards;
    fill: hsl(var(--color-has) / 0.35);
  }

  .has_saved:hover path[data-path="line-top"] {
    animation: has-saved-line-top var(--duration) var(--ease) forwards;
  }

  .has_saved:hover path[data-path="line-bottom"] {
    animation:
      has-saved-line-bottom var(--duration) var(--ease) forwards,
      has-saved-line-bottom-2 calc(var(--duration) * 1) var(--ease)
        calc(var(--duration) * 0.75);
  }

  @keyframes has-saved-line-top {
    33.333% {
      transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
      d: path("M 3 5 L 3 8 L 3 8");
    }
    66.666% {
      transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
    }
    99.999% {
      transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
    }
  }

  @keyframes has-saved-line-bottom {
    33.333% {
      transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
      d: path("M 17 20 L 17 13 L 7 13 L 7 20");
    }
    66.666% {
      transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
    }
    99.999% {
      transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
      d: path("M 17 21 L 17 21 L 7 21 L 7 21");
    }
  }

  @keyframes has-saved-line-bottom-2 {
    from {
      d: path("M 17 21 L 17 21 L 7 21 L 7 21");
    }
    to {
      transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
      d: path("M 17 20 L 17 13 L 7 13 L 7 20");
      fill: white;
    }
  }

  @keyframes has-saved {
    33.333% {
      transform: rotate(0deg) translate(1px, 2px) scale(var(--zoom-from));
    }
    66.666% {
      transform: rotate(20deg) translate(2px, -2px) scale(var(--zoom-via));
    }
    99.999% {
      transform: rotate(0deg) translate(0px, 0px) scale(var(--zoom-to));
    }
  }
`;
