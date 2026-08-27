/* A checkbox that is the button, and a text field that keeps its focus after
   shrinking to nothing.

   The whole mechanism is one `<input type="checkbox">` with `appearance: none`,
   parked at `right: 17px` over the icon, at `z-index: 9`. It paints nothing --
   it IS the magnifier, in the sense that the magnifier is a drawing underneath it
   and the checkbox is the hit area on top. Checking it collapses the pill:
   `.checkbox:checked ~ .mainbox { width: 50px }`, and the field inside goes to
   `width: 0; height: 0px`.

   `flex-direction: row-reverse` is why the icon appears on the right while being
   first in the markup, which is also what makes the collapse read as the field
   retracting INTO the icon rather than the icon sliding across.

   Two real defects, both fixed, because neither is a look.

   `.checkbox:focus { border: none; outline: none }` removes the focus ring from
   the only control in the component. There is no replacement rule anywhere in the
   upload, so a keyboard user has no way to know the toggle is focused. And the
   checkbox has no label and no text of any kind -- `appearance: none` on an
   unlabelled input announces as "checkbox" and nothing more.

   The third thing is subtler and is the reason this needed React rather than
   CSS. When the pill is collapsed the search field is 0x0 -- and a zero-sized
   text input is still in the tab order. A keyboard user tabs from the toggle
   straight into an invisible field, types into nothing, and has no way to tell
   where they are. `.mainbox` has no `overflow: hidden`, so the field is not even
   clipped, just sized away. CSS cannot fix that; the field has to leave the tab
   order when it has no size, which is one attribute driven by the same state the
   CSS already keys on. */
import { useId, useState } from 'react';
import styled from 'styled-components';

export const CollapsingSearch = ({
  placeholder = 'Search',
  toggleLabel = 'Collapse search',
  fieldLabel = 'Search',
}: { placeholder?: string; toggleLabel?: string; fieldLabel?: string }) => {
  const id = useId();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledWrapper>
      <div className="container">
        <input
          className="checkbox"
          type="checkbox"
          id={id}
          aria-label={toggleLabel}
          checked={collapsed}
          onChange={(e) => setCollapsed(e.target.checked)}
        />
        <div className="mainbox">
          <div className="iconContainer">
            <svg className="search_icon" viewBox="0 0 512 512" width={20} height={20} aria-hidden="true">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 0 0 0 288z" />
            </svg>
          </div>
          <input
            className="search_input"
            type="search"
            placeholder={placeholder}
            aria-label={fieldLabel}
            /* A 0x0 text input is still focusable. When the pill is collapsed the
               field has no size and no clip, so without this a keyboard lands
               inside an invisible box. */
            tabIndex={collapsed ? -1 : 0}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    box-sizing: border-box;
    width: fit-content;
  }

  .mainbox {
    box-sizing: border-box;
    position: relative;
    width: 230px;
    height: 50px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    border-radius: 160px;
    background-color: rgb(0, 0, 0);
    transition: all 0.3s ease;
  }

  .checkbox:focus {
    border: none;
    outline: none;
  }

  /* Added: the rule above takes the ring off the only control here, and the
     upload replaces it with nothing. */
  .checkbox:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 2px;
    border-radius: 4px;
  }

  .checkbox:checked {
    right: 10px;
  }

  .checkbox:checked ~ .mainbox {
    width: 50px;
  }

  .checkbox:checked ~ .mainbox .search_input {
    width: 0;
    height: 0px;
  }

  .checkbox:checked ~ .mainbox .iconContainer {
    padding-right: 8px;
  }

  .checkbox {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 17px;
    top: 10px;
    z-index: 9;
    cursor: pointer;
    appearance: none;
    margin: 0;
  }

  .search_input {
    box-sizing: border-box;
    height: 100%;
    width: 170px;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 4px;
    padding-left: 10px;
    font-size: 1em;
    color: white;
    transition: all 0.3s ease;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .search_input:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: -2px;
    border-radius: 100px;
  }

  .search_input::placeholder {
    color: rgba(255, 255, 255, 0.776);
  }

  .iconContainer {
    box-sizing: border-box;
    padding-top: 5px;
    width: fit-content;
    transition: all 0.3s ease;
  }

  .search_icon {
    box-sizing: border-box;
    fill: white;
    font-size: 1.3em;
  }
`;
