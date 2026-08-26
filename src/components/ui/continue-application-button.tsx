/* Nine custom properties set by one hover, and a chevron made of two bars.

   Every moving part reads a variable and the hover rule writes all nine at once:

     --fx  -40px   the folder body and its back leaf slide left, out of the panel
     --fr  -60deg  the folder's front flap rotates on perspective(120px)
     --fd  .15s    their delay drops from 0.3s to 0.15s -- FASTER on the way in
     --fds 0s      the flap's own delay drops from 0.45s to nothing
     --pbx  3px    the paper behind shifts right
     --pby -3px    and up
     --pbd .15s
     --pex -24px   the pencil travels in from off-panel
     --cx   2px    the chevron nudges

   Two of those are the reason the animation reads as a sequence rather than a
   pile: `--fd` and `--fds` are DELAYS, and they shrink on hover. Leaving them at
   0.3s and 0.45s would have made the return trip and the outbound trip take the
   same staggered time; shortening them means the pieces snap apart quickly and
   drift back slowly.

   The chevron is `::before` and `::after` on the button itself: two 10px bars
   with `transform-origin: 9px 1px` -- a point 9px along the bar, not its centre
   -- rotated -45deg and +45deg. Rotating about a shared far end is what makes two
   straight bars meet as an arrow instead of forming an X.

   The pencil starts at `left: 105%` inside a 53px panel with `overflow: hidden`,
   so it is entirely outside its own container at rest and enters through the
   right edge on hover. Same mechanism as the GET STARTED arrow earlier in this
   log, and again the clip is what makes it work.

   `transform: scaleY(0.5)` on the paper's ruled lines turns a 2px box into a
   1px hairline, and `box-shadow: 0 12px 0, 0 24px 0` repeats that one line twice
   more -- three ruled lines from a single element and no extra markup.

   One addition: the upload declares `outline: none` on the button and adds no
   replacement, so the focus ring is put back. The label is real text, so the
   name was never in question. */
import styled from 'styled-components';

export const ContinueApplicationButton = ({
  children = 'Continue Application',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="continue-application" type="button" {...rest}>
      <div>
        <span className="folder">
          <span className="top">
            <svg viewBox="0 0 24 27" aria-hidden="true">
              <path d="M1.2 0h8.3l2.4 3h11a1.2 1.2 0 0 1 1.1 1.2v21.6A1.2 1.2 0 0 1 22.9 27H1.2A1.2 1.2 0 0 1 0 25.8V1.2A1.2 1.2 0 0 1 1.2 0z" />
            </svg>
          </span>
          <span className="paper" />
        </span>
        <span className="pencil" />
      </div>
      {children}
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .continue-application {
    --color: #fff;
    --background: #404660;
    --background-hover: #3a4059;
    --background-left: #2b3044;
    --folder: #f3e9cb;
    --folder-inner: #beb393;
    --paper: #ffffff;
    --paper-lines: #bbc1e1;
    --paper-behind: #e1e6f9;
    --pencil-cap: #fff;
    --pencil-top: #275efe;
    --pencil-middle: #fff;
    --pencil-bottom: #5c86ff;
    --shadow: rgba(13, 15, 25, 0.2);

    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    padding: 17px 29px 17px 69px;
    transition: background 0.3s;
    color: var(--color);
    background: var(--bg, var(--background));

    /* Added, and it is a NAME COLLISION rather than a defect in the upload. The
       button paints "var(--bg, var(--background))" and only ever sets --bg inside
       its own :hover rule, expecting the fallback to supply the resting colour.
       But this repo declares "--bg: var(--nova-canvas)" in src/madar/bridge.css,
       and custom properties inherit -- so --bg arrives already defined, the
       fallback is never reached, and the button paints the PAGE'S OWN CANVAS.
       Measured before this line: white label on #fbf5ee at 1.08:1, i.e. an
       invisible button with unreadable text, in every pack whose canvas is light.

       "--bg: initial" makes the name guaranteed-invalid on this element, which is
       exactly what "var()" needs to fall back. The hover rule still sets it and
       still wins. Nothing of the author's is changed; the name is simply given
       back to them. */
    --bg: initial;
  }

  /* Added: "outline: none" above with no replacement anywhere in the upload. */
  .continue-application:focus-visible {
    outline: 3px solid #5c86ff;
    outline-offset: 3px;
  }

  .continue-application > div {
    top: 0;
    left: 0;
    bottom: 0;
    width: 53px;
    position: absolute;
    overflow: hidden;
    border-radius: 5px 0 0 5px;
    background: var(--background-left);
  }

  .continue-application > div .folder {
    width: 23px;
    height: 27px;
    position: absolute;
    left: 15px;
    top: 13px;
  }

  .continue-application > div .folder .top {
    left: 0;
    top: 0;
    z-index: 2;
    position: absolute;
    transform: translateX(var(--fx, 0));
    transition: transform 0.4s ease var(--fd, 0.3s);
  }

  .continue-application > div .folder .top svg {
    width: 24px;
    height: 27px;
    display: block;
    fill: var(--folder);
    transform-origin: 0 50%;
    transition: transform 0.3s ease var(--fds, 0.45s);
    transform: perspective(120px) rotateY(var(--fr, 0deg));
  }

  .continue-application > div .folder:before,
  .continue-application > div .folder:after,
  .continue-application > div .folder .paper {
    content: "";
    position: absolute;
    left: var(--l, 0);
    top: var(--t, 0);
    width: var(--w, 100%);
    height: var(--h, 100%);
    border-radius: 1px;
    background: var(--b, var(--folder-inner));
  }

  .continue-application > div .folder:before {
    box-shadow:
      0 1.5px 3px var(--shadow),
      0 2.5px 5px var(--shadow),
      0 3.5px 7px var(--shadow);
    transform: translateX(var(--fx, 0));
    transition: transform 0.4s ease var(--fd, 0.3s);
  }

  .continue-application > div .folder:after,
  .continue-application > div .folder .paper {
    --l: 1px;
    --t: 1px;
    --w: 21px;
    --h: 25px;
    --b: var(--paper-behind);
  }

  .continue-application > div .folder:after {
    transform: translate(var(--pbx, 0), var(--pby, 0));
    transition: transform 0.4s ease var(--pbd, 0s);
  }

  .continue-application > div .folder .paper {
    z-index: 1;
    --b: var(--paper);
  }

  .continue-application > div .folder .paper:before,
  .continue-application > div .folder .paper:after {
    content: "";
    width: var(--wp, 14px);
    height: 2px;
    border-radius: 1px;
    transform: scaleY(0.5);
    left: 3px;
    top: var(--tp, 3px);
    position: absolute;
    background: var(--paper-lines);
    box-shadow:
      0 12px 0 0 var(--paper-lines),
      0 24px 0 0 var(--paper-lines);
  }

  .continue-application > div .folder .paper:after {
    --tp: 6px;
    --wp: 10px;
  }

  .continue-application > div .pencil {
    height: 2px;
    width: 3px;
    border-radius: 1px 1px 0 0;
    top: 8px;
    left: 105%;
    position: absolute;
    z-index: 3;
    transform-origin: 50% 19px;
    background: var(--pencil-cap);
    transform: translateX(var(--pex, 0)) rotate(35deg);
    transition: transform 0.4s ease var(--pbd, 0s);
  }

  .continue-application > div .pencil:before,
  .continue-application > div .pencil:after {
    content: "";
    position: absolute;
    display: block;
    background: var(--b, linear-gradient(var(--pencil-top) 55%, var(--pencil-middle) 55.1%, var(--pencil-middle) 60%, var(--pencil-bottom) 60.1%));
    width: var(--w, 5px);
    height: var(--h, 20px);
    border-radius: var(--br, 2px 2px 0 0);
    top: var(--t, 2px);
    left: var(--l, -1px);
  }

  .continue-application > div .pencil:before {
    -webkit-clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
    clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
  }

  .continue-application > div .pencil:after {
    --b: none;
    --w: 3px;
    --h: 6px;
    --br: 0 2px 1px 0;
    --t: 3px;
    --l: 3px;
    border-top: 1px solid var(--pencil-top);
    border-right: 1px solid var(--pencil-top);
  }

  .continue-application:before,
  .continue-application:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    border-radius: 1px;
    background: var(--color);
    transform-origin: 9px 1px;
    transform: translateX(var(--cx, 0)) scale(0.5) rotate(var(--r, -45deg));
    top: 26px;
    right: 16px;
    transition: transform 0.3s;
  }

  .continue-application:after {
    --r: 45deg;
  }

  .continue-application:hover {
    --cx: 2px;
    --bg: var(--background-hover);
    --fx: -40px;
    --fr: -60deg;
    --fd: 0.15s;
    --fds: 0s;
    --pbx: 3px;
    --pby: -3px;
    --pbd: 0.15s;
    --pex: -24px;
  }
`;
