/* A square that becomes a tick by rotating 45deg and losing its own border.

   `.checkbox-btn input:checked ~ .checkmark` does two things: `transform:
   rotate(45deg)` and `border: none`. The 25px bordered square turns 45 degrees
   and then STOPS DRAWING ITSELF -- so the box does not become a tick, it gets out
   of the way and lets its own `::after` be the only thing visible. And the
   `::after` is two borders of a rectangle (`border-width: 0 2.5px 2.5px 0`),
   which is a right angle; a right angle inside a parent rotated 45deg is a tick.
   The rotation lives on the parent and the shape lives on the child, which is why
   neither element alone looks like anything.

   `visibility: hidden` AND `opacity: 0` AND `scale(0.2)` AND `rotate(-90deg)` on
   the resting `::after` -- four ways of not being there, three of which transition
   and one (visibility) which does not usefully. Verbatim.

   Two uploads (144911 and 144934) carry this CSS **byte for byte identical** after
   whitespace normalisation. One component.

   Two additions, and both are the difference between working and not working.
   The upload's `.checkbox-btn label { cursor: pointer; font-size: 14px }` implies
   a `<label>` INSIDE `.checkbox-btn` -- and `.checkbox-btn` is itself described in
   the author's own comment as "the label". A `<label>` inside a `<label>` is not
   valid, and the inner one would steal the association. So `.checkbox-btn` is a
   plain wrapper and the single `<label>` is the inner one, joined to the input by
   `for` -- which keeps the rule that styles it, keeps the 30px padding that makes
   room for the box, and gives the input the accessible name it did not have.

   And a focus ring on `.checkmark`, because the input is hidden with
   `opacity: 0; height: 0; width: 0` -- correctly, since that keeps it in the tab
   order and the a11y tree, unlike `display: none` -- but it means focus itself is
   invisible without one. `pulse` runs once on check. */
import { useId } from 'react';
import styled from 'styled-components';

export const RotateCheckCheckbox = ({
  label = 'Remember me',
  ...rest
}: { label?: string } & React.ComponentPropsWithoutRef<'input'>) => {
  const id = useId();

  return (
    <StyledWrapper>
      <div className="checkbox-btn">
        <input type="checkbox" id={id} {...rest} />
        <span className="checkmark" />
        <label htmlFor={id}>{label}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Customize the label (the checkbox-btn) */
  .checkbox-btn {
    display: block;
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .checkbox-btn input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkbox-btn label {
    cursor: pointer;
    font-size: 14px;
    /* Added, and the value is the author's own. The upload gives the label a
       cursor and a size and NO colour, so it inherited this repo's theme ink --
       measured in the coral pack: #32221b on the #1b1b21 ground at 1.12, dark
       ink on dark. The upload does declare one colour, though:
       "border: 2.5px solid #ffffff" on the box. A white box states the ground it
       expects, and a component that mandates a dark ground has to carry the ink
       that goes with it rather than borrow whatever it lands in. So the label
       takes the same #ffffff the box already uses -- no new colour introduced. */
    color: #ffffff;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 2.5px solid #ffffff;
    transition: 0.2s linear;
  }

  /* Added: the input is correctly hidden with opacity, which keeps it focusable
     — and therefore makes focus invisible without a ring of its own. */
  .checkbox-btn input:focus-visible ~ .checkmark {
    outline: 3px solid #0ea021;
    outline-offset: 3px;
  }

  .checkbox-btn input:checked ~ .checkmark {
    background-color: transparent;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    top: 40%;
    width: 10px;
    height: 14px;
    border: 2px solid #0ea021;
    filter: drop-shadow(0px 0px 10px #0ea021);
    border-width: 0 2.5px 2.5px 0;
    transition: 0.2s linear;
    transform: translate(-50%, -50%) rotate(-90deg) scale(0.2);
  }

  /* Show the checkmark when checked */
  .checkbox-btn input:checked ~ .checkmark:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
    animation: pulse 1s ease-in;
  }

  .checkbox-btn input:checked ~ .checkmark {
    transform: rotate(45deg);
    border: none;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1.6);
    }
  }
`;
