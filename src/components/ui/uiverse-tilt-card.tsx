/* Five circles on five planes, and the one that is deliberately left behind.

   The logo is five nested circles at `translate3d(0, 0, 20px)` through `100px`,
   each with a longer `transition-delay` than the last -- 0, 0.4s, 0.8s, 1.2s,
   1.6s. Hover advances them to 60, 80, 100, 120px. Except circle1: there is no
   `.parent:hover ... .circle1` rule. It stays at 20px while the four above it
   climb, which is what turns a stack into a telescope -- the base has to hold
   still or the whole assembly just slides. Four hover rules for five circles is
   the design, not an omission.

   The 1.6-second delay on the innermost circle is longer than the card's own
   0.5s tilt, so the depth is still unfolding well after the card has finished
   rotating.

   `backdrop-filter: blur(5px)` is LIVE on `.logo .circle` and commented out on
   `.glass` -- the author tried it on the big panel and took it out. Left exactly
   as delivered, comment included, because that is a decision and not an
   accident.

   `.glass` gets `border-top-right-radius: 100%` on top of a 55px radius, which is
   what carves the quarter-round bite the circles sit in, and
   `translate3d(0, 0, 25px)` puts it just in front of the card while `.content`
   sits at 26px -- one pixel of separation doing all the work of "text on glass".

   The social buttons have their own 0.4/0.6/0.8s delays and lift to
   `translate3d(0, 0, 50px)`, so they arrive after the tilt and before the logo
   finishes. Three staggers running at once on three different clocks.

   Additions, all in the "difference between working and not working" class. The
   three social buttons and the arrow are `<button>` elements containing only an
   svg, so they announced as "button"; each gets a name. `.view-more-button` has
   `background: none; border: none` and no focus style, and the social buttons
   have `:hover` and `:active` colour changes with no focus equivalent -- so
   `:focus-visible` carries the same changes plus a ring. The tilt itself stays
   hover-only: it is decoration, and every piece of content is readable without
   it. */
import styled from 'styled-components';

const SOCIAL = [
  { name: 'Share on X', d: 'M3 3h4.5l4 5.5L16 3h5l-6.5 8.5L21 21h-4.5l-4.2-5.8L8 21H3l7-9z' },
  { name: 'Share on GitHub', d: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5a4 4 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6a4 4 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z' },
  { name: 'Share by email', d: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.6 2L12 12.2 19.4 7H4.6z' },
];

export const UiverseTiltCard = ({
  title = 'UIVERSE (3D UI)',
  text = 'Create, share, and use beautiful custom elements made with CSS',
}: { title?: string; text?: string }) => (
  <StyledWrapper>
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle1" />
          <span className="circle circle2" />
          <span className="circle circle3" />
          <span className="circle circle4" />
          <span className="circle circle5">
            <svg className="svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3 6.8 3.8L12 11.9 5.2 8.1 12 4.3z" />
            </svg>
          </span>
        </div>
        <div className="glass" />
        <div className="content">
          <span className="title">{title}</span>
          <span className="text">{text}</span>
        </div>
        <div className="bottom">
          <div className="social-buttons-container">
            {SOCIAL.map((s) => (
              <button className="social-button" type="button" key={s.name} aria-label={s.name}>
                <svg className="svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </button>
            ))}
          </div>
          <div className="view-more">
            <button className="view-more-button" type="button">View more</button>
            <svg className="svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h14M13 7l5 5-5 5" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .parent {
    width: 290px;
    height: 300px;
    perspective: 1000px;
  }

  .card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, rgb(0, 255, 214) 0%, rgb(8, 226, 96) 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow:
      rgba(5, 71, 17, 0) 40px 50px 25px -40px,
      rgba(5, 71, 17, 0.2) 0px 25px 25px -5px;
    position: relative;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.349) 0%, rgba(255, 255, 255, 0.815) 100%);
    /* -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px); */
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid white;
    border-bottom: 1px solid white;
    transition: all 0.5s ease-in-out;
  }

  .content {
    padding: 100px 60px 0px 30px;
    transform: translate3d(0, 0, 26px);
    position: relative;
  }

  .content .title {
    display: block;
    color: #00894d;
    font-weight: 900;
    font-size: 20px;
  }

  .content .text {
    display: block;
    color: rgba(0, 137, 78, 0.7647058824);
    font-size: 15px;
    margin-top: 20px;
  }

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #00c37b;
    font-weight: bolder;
    font-size: 12px;
    cursor: pointer;
  }

  /* Added: no focus style anywhere in the upload. */
  .bottom .view-more .view-more-button:focus-visible {
    outline: 3px solid #00894d;
    outline-offset: 2px;
    border-radius: 4px;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #00c37b;
    stroke-width: 3px;
    max-height: 15px;
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 30px;
    aspect-ratio: 1;
    padding: 5px;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(5, 71, 17, 0.5) 0px 7px 5px -5px;
    cursor: pointer;
  }

  .bottom .social-buttons-container .social-button:first-child {
    transition:
      transform 0.2s ease-in-out 0.4s,
      box-shadow 0.2s ease-in-out 0.4s;
  }

  .bottom .social-buttons-container .social-button:nth-child(2) {
    transition:
      transform 0.2s ease-in-out 0.6s,
      box-shadow 0.2s ease-in-out 0.6s;
  }

  .bottom .social-buttons-container .social-button:nth-child(3) {
    transition:
      transform 0.2s ease-in-out 0.8s,
      box-shadow 0.2s ease-in-out 0.8s;
  }

  .bottom .social-buttons-container .social-button .svg {
    width: 15px;
    fill: #00894d;
  }

  .bottom .social-buttons-container .social-button:hover {
    background: black;
  }

  .bottom .social-buttons-container .social-button:hover .svg {
    fill: white;
  }

  /* Added: the colour change above is hover-only. */
  .bottom .social-buttons-container .social-button:focus-visible {
    background: black;
    outline: 3px solid #00894d;
    outline-offset: 3px;
  }

  .bottom .social-buttons-container .social-button:focus-visible .svg {
    fill: white;
  }

  .bottom .social-buttons-container .social-button:active {
    background: rgb(255, 234, 0);
  }

  .bottom .social-buttons-container .social-button:active .svg {
    fill: black;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(100, 100, 111, 0.2) -10px 10px 20px 0px;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background: rgba(0, 249, 203, 0.2);
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    transition-delay: 0.4s;
  }

  .logo .circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .logo .circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .logo .circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
  }

  .logo .circle5 .svg {
    width: 20px;
    fill: white;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow:
      rgba(5, 71, 17, 0.3) 30px 50px 25px -40px,
      rgba(5, 71, 17, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(5, 71, 17, 0.2) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
  }
`;
