/* The smallest upload in the whole log -- 991 bytes -- and it specifies seven
   SVG parts by name without drawing any of them.

   Every rule is `#toggle:checked + svg #part`, and the seven parts are
   `#container`, `#patches`, `#stars`, `#button`, `#sun`, `#moon`, `#cloud`. What
   each one does is fully stated:

     #container  fill goes to #2b4360          the sky darkens
     #button     translate(28px, 2.333px)      the knob slides right
     #sun        opacity 1 -> 0
     #moon       opacity 0 -> 1
     #cloud      opacity 1 -> 0
     #stars      opacity 0 -> 1
     #patches    ...nothing. It is in the transition list and has NO state rule.

   `#patches` is the tell. A part that transitions but never changes must be a
   CHILD of something that does -- so the patches are the moon's craters, riding
   its opacity and listed in the transition group only so they ease with it. Same
   reasoning puts `#sun` and `#moon` inside `#button`: they never move, but the
   knob does, and a face that stayed behind while its knob slid away would be
   wrong. The CSS names the parts; the nesting is what the CSS does NOT say about
   them.

   `translate(28px, 2.333px)` -- twenty-eight across and a third of a pixel down.
   The vertical component is not symmetry, it is somebody nudging the knob by eye
   and keeping the number.

   `#toggle { opacity: 0; width: 0; height: 0 }` is the right way to hide the
   input: it stays focusable and stays in the accessibility tree. The literal ids
   are kept as written, which means TWO of these on one page would produce
   duplicate ids -- the rules themselves are safe, because styled-components
   scopes them to this tree, but the document would be invalid. Declared rather
   than quietly renamed, on the same terms as the segmented tabs earlier in this
   log, and the specimen renders one.

   Two additions: the input had no name, and it had no focus indicator -- the
   whole component is a checkbox whose only visible state is inside an svg. */
import styled from 'styled-components';

export const SkyThemeToggle = ({
  label = 'Night mode',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'input'>) => (
  <StyledWrapper>
    <label id="theme-toggle-button">
      <input type="checkbox" id="toggle" aria-label={label} {...rest} />
      <svg viewBox="0 0 60 30">
        <rect id="container" x="0" y="0" width="60" height="30" rx="15" fill="#83cbd8" />
        <g id="cloud" fill="#fff" opacity="1">
          <circle cx="44" cy="9" r="4" />
          <circle cx="50" cy="10" r="3" />
          <circle cx="39" cy="11" r="3" />
        </g>
        <g id="stars" fill="#fff">
          <circle cx="12" cy="7" r="1" />
          <circle cx="20" cy="12" r="0.8" />
          <circle cx="9" cy="18" r="0.9" />
          <circle cx="17" cy="22" r="0.7" />
        </g>
        <g id="button">
          <circle cx="15" cy="15" r="11" fill="#ffe375" />
          <circle id="sun" cx="15" cy="15" r="9" fill="#fcd53f" />
          <g id="moon">
            <circle cx="15" cy="15" r="9" fill="#cad2d8" />
            <g id="patches" fill="#a8b5bd">
              <circle cx="12" cy="12" r="2" />
              <circle cx="18" cy="17" r="1.6" />
              <circle cx="13.5" cy="19" r="1.2" />
            </g>
          </g>
        </g>
      </svg>
    </label>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  #theme-toggle-button {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 7em;
    cursor: pointer;
  }

  /* The upload gives the svg no dimensions; the label is 7em wide and the svg
     fills it, with the viewBox supplying the ratio. Sized here rather than with
     attributes, because "height=auto" is not a valid SVG attribute length —
     Chromium rejects it outright, which the operable harness reported as a
     runtime error. */
  #theme-toggle-button svg {
    display: block;
    width: 100%;
    height: auto;
  }

  /* Hide default HTML checkbox */
  #toggle {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  /* Added: the input is correctly focusable and shows nothing when focused. */
  #toggle:focus-visible + svg #container {
    stroke: #1b6ef3;
    stroke-width: 3;
  }

  #container,
  #patches,
  #stars,
  #button,
  #sun,
  #moon,
  #cloud {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.25s;
  }

  /* night sky background */
  #toggle:checked + svg #container {
    fill: #2b4360;
  }

  /* move button to right when checked */
  #toggle:checked + svg #button {
    transform: translate(28px, 2.333px);
  }

  /* show/hide sun and moon based on checkbox state */
  #sun {
    opacity: 1;
  }

  #toggle:checked + svg #sun {
    opacity: 0;
  }

  #moon {
    opacity: 0;
  }

  #toggle:checked + svg #moon {
    opacity: 1;
  }

  /* show or hide background items on checkbox state */
  #cloud {
    opacity: 1;
  }

  #toggle:checked + svg #cloud {
    opacity: 0;
  }

  #stars {
    opacity: 0;
  }

  #toggle:checked + svg #stars {
    opacity: 1;
  }
`;
