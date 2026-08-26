/* Two discs of the same size, one of which grows four times to flood the card.

   `.circle::after` is 118x118 at `top: 7px; left: 7px` inside a 131px ring --
   the filled disc behind the icon. `.overlay` is a SECOND 118x118 disc, absolute
   at `top: 70px; left: 50px`, sitting behind everything at `z-index: 0`. At rest
   the two are nearly coincident, which is why the card looks like it has one
   disc. Hover scales the overlay `scale(4)`: 118 x 4 = 472, and the card is
   220x321, so one disc four times its own size is what floods the whole card
   with the accent colour. The `::after` stays put, so the icon's own disc is what
   remains readable on top of the flood.

   `translateZ(0)` appears four times -- on the card, the overlay, the icon and
   the hover transform -- and none of it is 3D. It is the old compositing hint;
   the transforms are all 2D. Kept, because it is what the author wrote and it
   costs nothing but a layer.

   The z-order is written in round numbers that give the game away: the label at
   `z-index: 1000` and the icon at `10000`, over an overlay at `0`. Two values
   three orders of magnitude apart, to sit above one element. Verbatim.

   `--bg-color` and friends are declared on `.wallet`, and every rule that reads
   them is on `.card` and its descendants -- so `.card` must be INSIDE `.wallet`
   or the four custom properties resolve to nothing and the disc, the ring and
   the hover text colour all disappear. The upload gives no markup; the cascade
   does.

   Two additions. The upload's element is `text-decoration: none` on something
   with no `href` -- a link with no destination is not focusable and is not
   announced -- so it gets a real one. And a focus ring, since every state here
   is `:hover`. */
import styled from 'styled-components';

export const WalletHoverCard = ({
  label = 'Wallet',
  href = '#wallet',
}: { label?: string; href?: string }) => (
  <StyledWrapper className="wallet">
    <a className="card" href={href}>
      <div className="overlay" />
      <div className="circle">
        <svg viewBox="0 0 24 24" width={48} height={48} aria-hidden="true">
          <path d="M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1h1.5A1.5 1.5 0 0 1 21 9.5v7a1.5 1.5 0 0 1-1.5 1.5H18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm13 3v4h3.5v-4H16zm1.75 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="#fff" />
        </svg>
      </div>
      <p>{label}</p>
    </a>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  &.wallet {
    --bg-color: #ceb2fc;
    --bg-color-light: #f0e7ff;
    --text-color-hover: #fff;
    --box-shadow-color: rgba(206, 178, 252, 0.48);
  }

  .card {
    width: 220px;
    height: 321px;
    background: #fff;
    border-top-right-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-out;
    text-decoration: none;
  }

  /* Added: every state below is hover-only. */
  .card:focus-visible {
    outline: 3px solid var(--bg-color);
    outline-offset: 4px;
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
    box-shadow:
      0 24px 36px rgba(0, 0, 0, 0.11),
      0 24px 46px var(--box-shadow-color);
  }

  .card:hover .overlay {
    transform: scale(4) translateZ(0);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover p {
    color: var(--text-color-hover);
  }

  .card p {
    font-size: 17px;
    color: #4c5656;
    margin-top: 30px;
    z-index: 1000;
    transition: color 0.3s ease-out;
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 7px;
    left: 7px;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    width: 118px;
    position: absolute;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 70px;
    left: 50px;
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
`;
