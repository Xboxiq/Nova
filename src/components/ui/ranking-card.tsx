/* A card that hides real data behind a hover, and a second page that has to be
   taken out of the flow before it can slide up.

   The mechanism is two stacked pages and one transitioned height.
   `.cards` is 150px and becomes 270px on hover; `.outlinePage` is a fixed 150px
   at `z-index: 2`; `.detailPage` is 120px at `z-index: 1` with `top: -20px`, so
   it sits 20px UNDER the front page and its top strip is permanently covered.
   150 + 120 - 20 = 250, and the card opens to 270 -- the extra 20 is the
   `.splitLine` overhang. Every number in the set agrees with every other, which
   is how you can tell the layout was measured and not tuned.

   `.detailPage` is `display: none` at rest, and `display` does not transition --
   so the 1s `transition-duration` on it never runs. What the eye reads as the
   detail sliding out is the PARENT'S height animating over 0.5s while the child
   simply appears. The child's own transition is dead code. Kept.

   `.splitLine` is a 10px bar with a gradient that is transparent at both ends
   (`transparent 10%` ... `transparent 90%`) -- a light seam that fades out rather
   than a rule that stops. It sits at `top: 100px` on a 150px page, over the
   join.

   ONE addition, and it is the difference between working and not working: every
   number on the detail page -- the score, the medals, the grades -- is reachable
   ONLY by hovering. No pointer, no data. There is no interactive element in the
   upload to hang a focus state on and no `<button>` this could honestly become,
   so the card takes `tabindex` and `:focus-visible` mirrors `:hover` exactly:
   three declarations, no new elements, no redesign. A touch user still gets the
   summary; a keyboard user now gets the rest.

   The trophy, the avatar and the medals are named by the CSS and supplied by
   nothing, so they are drawn here at the sizes and positions those rules imply.
   `.slide-in-top` is declared in the upload and attached to nothing; it is left
   available on the detail page, which is the only element it makes sense on. */
import styled from 'styled-components';

export const RankingCard = ({
  place = '1st',
  name = 'Jessie Ben',
  score = 1105,
}: { place?: string; name?: string; score?: number }) => (
  <StyledWrapper>
    <div className="cards" tabIndex={0}>
      <div className="outlinePage">
        <div className="trophy">
          <svg viewBox="0 0 64 64" width={78} height={78} aria-hidden="true">
            <path d="M18 10h28v8a14 14 0 0 1-28 0v-8z" fill="#f7b733" />
            <path d="M14 12h4v6a8 8 0 0 1-4-7v1zm32 0h4v-1a8 8 0 0 1-4 7v-6z" fill="#ea9518" />
            <path d="M29 32h6v10h-6zM22 44h20v5H22z" fill="#ea9518" />
          </svg>
        </div>
        <p className="ranking_number">
          {place.replace(/[a-z]+$/i, '')}
          <span className="ranking_word">{place.replace(/^\d+/, '')}</span>
        </p>
        <div className="splitLine" />
        <div className="userAvatar">
          <svg viewBox="0 0 40 40" width={40} height={40} aria-hidden="true">
            <circle cx="20" cy="20" r="20" fill="#ffe8a0" />
            <circle cx="20" cy="16" r="7" fill="#6b7578" />
            <path d="M6 36a14 14 0 0 1 28 0z" fill="#6b7578" />
          </svg>
        </div>
        <span className="userName">{name}</span>
      </div>
      <div className="detailPage slide-in-top">
        <div className="medals">
          <svg viewBox="0 0 60 24" width={60} height={24} aria-hidden="true">
            <circle cx="10" cy="12" r="9" fill="#f7b733" />
            <circle cx="30" cy="12" r="9" fill="#c9ccd1" />
            <circle cx="50" cy="12" r="9" fill="#cd7f32" />
          </svg>
        </div>
        <div className="gradesBox">
          <div className="gradesIcon">
            <svg viewBox="0 0 44 44" width={44} height={44} aria-hidden="true">
              <rect x="4" y="4" width="36" height="36" rx="10" fill="#fffbf0" stroke="#ffdd87" strokeWidth="2" />
              <path d="M14 28l6-8 4 5 4-7 4 10z" fill="#ea9518" />
            </svg>
          </div>
          <span className="gradesBoxLabel">SCORE</span>
          <span className="gradesBoxNum">{score}</span>
        </div>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .cards {
    position: relative;
    height: 150px;
    transition-duration: 0.5s;
    background: none;
    overflow: hidden;
  }

  .cards:hover {
    height: 270px;
  }

  .cards:hover .outlinePage {
    box-shadow: 0 10px 15px #b1985e;
  }

  .cards:hover .detailPage {
    display: flex;
  }

  /* Added: the detail page is the only place the score, the medals and the
     grades exist, and the upload reaches it by pointer alone. Same three
     consequences, second trigger. */
  .cards:focus-visible {
    height: 270px;
    outline: 3px solid #f7b733;
    outline-offset: 4px;
  }

  .cards:focus-visible .outlinePage {
    box-shadow: 0 10px 15px #b1985e;
  }

  .cards:focus-visible .detailPage {
    display: flex;
  }

  .outlinePage {
    position: relative;
    background: linear-gradient(45deg, #fffbf0, #ffdd87);
    width: 300px;
    height: 150px;
    border-radius: 25px;
    transition-duration: 0.5s;
    z-index: 2;
  }

  .detailPage {
    position: relative;
    display: none;
    width: 300px;
    height: 120px;
    background: white;
    top: -20px;
    z-index: 1;
    transition-duration: 1s;
    border-radius: 0 0 25px 25px;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
  }

  .splitLine {
    position: absolute;
    width: 200px;
    height: 10px;
    top: 100px;
    background-image: linear-gradient(
      to right,
      transparent 10%,
      #ffe8a0 20%,
      #f7b733 50%,
      #ffe8a0 70%,
      transparent 90%
    );
    z-index: 1;
  }

  .trophy {
    position: absolute;
    right: 0px;
    top: 4px;
    z-index: 2;
  }

  .ranking_number {
    position: relative;
    color: #ffc64b;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    font-size: 80px;
    left: 20px;
    padding: 0;
    margin: 0;
    top: -5px;
  }

  .ranking_word {
    position: relative;
    font-size: 40px;
    color: #424c50;
  }

  .userAvatar {
    position: absolute;
    bottom: 6px;
    left: 20px;
  }

  .userName {
    position: relative;
    font-weight: 600;
    color: #6b7578;
    left: 55px;
    font-size: 18px;
    top: -2px;
  }

  .medals {
    position: absolute;
    top: 15px;
    right: 5px;
  }

  .gradesBox {
    position: relative;
    height: 75px;
    top: 10px;
    margin-right: 10px;
    margin-left: 15px;
  }

  .gradesIcon {
    position: absolute;
    top: 10px;
  }

  .gradesBoxLabel {
    position: relative;
    display: block;
    margin-left: 60px;
    color: #424c50;
    letter-spacing: 6px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 20px;
    font-weight: 800;
    font-size: 13px;
  }

  .gradesBoxNum {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    display: block;
    font-size: 25px;
    font-weight: 800;
    margin-left: 60px;
    color: #ea9518;
    top: -5px;
  }

  .timeNum {
    color: #6cabf6;
  }

  .slide-in-top {
    animation: slide-in-top 1s cubic-bezier(0.65, 0.05, 0.36, 1) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
