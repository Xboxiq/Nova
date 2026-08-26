/* The whole effect is one 32px circle parked off the top-right corner at
   "z-index: -1", scaled 28x on hover. 32 x 28 = 896px, which is why a card capped
   at 300x320 fills completely: the circle only has to out-reach the diagonal.
   .go-corner is a separate, unscaled square that keeps its own gradient on top.

   The upload writes this as an <a> with no href. Kept as an <a>, but given a real
   href, because the corner arrow and "text-decoration: none" both say link and a
   link with no destination is neither focusable nor announced. */
import styled from 'styled-components';

export const SweepProductCard = ({
  title = 'Product Name',
  body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat veritatis nobis saepe itaque rerum nostrum aliquid obcaecati odio officia deleniti. Expedita iste et illum, quaerat pariatur consequatur eum nihil itaque!',
  href = '#',
}: { title?: string; body?: string; href?: string }) => {
  return (
    <StyledWrapper>
      <a className="card" href={href}>
        <div className="card-title">{title}</div>
        <div className="small-desc">{body}</div>
        <div className="go-corner">
          <div className="go-arrow" aria-hidden="true">→</div>
        </div>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-title {
    color: #262626;
    font-size: 1.5em;
    line-height: normal;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  .small-desc {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5em;
    color: #452c2c;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .card {
    display: block;
    position: relative;
    max-width: 300px;
    max-height: 320px;
    background-color: #f2f8f9;
    border-radius: 10px;
    padding: 2em 1.2em;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
    font-family: Arial, Helvetica, sans-serif;
  }

  .card:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #364a60, #384c6c);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.35s ease-out;
  }

  .card:hover:before {
    transform: scale(28);
  }

  .card:hover .small-desc {
    transition: all 0.5s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }

  .card:hover .card-title {
    transition: all 0.5s ease-out;
    color: #ffffff;
  }

  /* A link with no focus style, and this one has a dark hover ground, so the ring
     needs to read against both. */
  .card:focus-visible {
    outline: 3px solid #384c6c;
    outline-offset: 3px;
  }

  /* The sweep is a colour change only; on focus the card must reach the same
     readable state as hover or a keyboard reader gets dark-on-dark text. */
  .card:focus-visible:before {
    transform: scale(28);
  }
  .card:focus-visible .small-desc { color: rgba(255, 255, 255, 0.8); }
  .card:focus-visible .card-title { color: #ffffff; }
`;

export default SweepProductCard;
