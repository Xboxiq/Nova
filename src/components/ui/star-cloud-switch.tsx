/* A day/night toggle drawn entirely with a box-shadow trick: .slider:before is a
   1.2em square whose "inset 8px -4px 0 0 #fff" shadow eats a crescent out of it,
   so the thumb IS the moon. On :checked the shadow becomes
   "inset 15px -4px 0 15px #ffcf48" -- a spread wide enough to fill the whole box
   with sun yellow, which is how one declaration turns a crescent into a disc.

   Three stars are positioned absolutely and fade out when checked; .cloud is
   sized 3.5em and fades in, and it is the one thing the upload does not supply.
   The CSS gives it a width, a corner position and nothing else, so it is a shape,
   not a glyph: drawn here as three overlapping rounded boxes, which is what a
   3.5em-wide CSS cloud is.

   The input is hidden with opacity/0-size, so it stays focusable; the upload
   writes no focus rule, so one is added on the track. */
import styled from 'styled-components';

export const StarCloudSwitch = ({ label = 'Night mode' }: { label?: string }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" aria-label={label} />
        <span className="slider">
          <span className="star star_1" />
          <span className="star star_2" />
          <span className="star star_3" />
          <span className="cloud" aria-hidden="true">
            <i /><i /><i />
          </span>
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 4em;
    height: 2.2em;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2a2a2a;
    transition: 0.4s;
    border-radius: 30px;
    overflow: hidden;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.2em;
    width: 1.2em;
    border-radius: 20px;
    left: 0.5em;
    bottom: 0.5em;
    transition: 0.4s;
    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  .switch input:checked + .slider {
    background-color: #00a6ff;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.8em);
    box-shadow: inset 15px -4px 0px 15px #ffcf48;
  }

  .star {
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 5px;
    transition: all 0.4s;
    height: 5px;
  }

  .star_1 {
    left: 2.5em;
    top: 0.5em;
  }

  .star_2 {
    left: 2.2em;
    top: 1.2em;
  }

  .star_3 {
    left: 3em;
    top: 0.9em;
  }

  .switch input:checked ~ .slider .star {
    opacity: 0;
  }

  .cloud {
    width: 3.5em;
    position: absolute;
    bottom: -1.4em;
    left: -1.1em;
    opacity: 0;
    transition: all 0.4s;
  }

  .switch input:checked ~ .slider .cloud {
    opacity: 1;
  }

  /* The cloud: three rounded lumps, which is what the declared 3.5em width and
     corner offset describe. Inferred, not supplied. */
  .cloud {
    height: 1.6em;
    display: block;
  }

  .cloud i {
    position: absolute;
    display: block;
    background: #fff;
    border-radius: 999px;
  }

  .cloud i:nth-child(1) { width: 3.5em; height: 0.9em; bottom: 0; left: 0; }
  .cloud i:nth-child(2) { width: 1.3em; height: 1.3em; bottom: 0.4em; left: 0.7em; }
  .cloud i:nth-child(3) { width: 1em; height: 1em; bottom: 0.5em; left: 1.9em; }

  .switch input:focus-visible + .slider {
    outline: 2px solid #00a6ff;
    outline-offset: 3px;
  }
`;

export default StarCloudSwitch;
