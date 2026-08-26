/* The markup is named by the selectors: .title holds a span (the green disc) and
   .title-text; the span holds an svg positioned dead centre; .percent is a flex
   row, so it has more than one child -- a glyph and a number. .data holds a
   paragraph and .range, and .range holds .fill at a hard-coded 76%.

   And that 76% is the finding. The card reads "20%" in .percent and fills the bar
   to 76%: two different numbers for one card, neither derived from the other. In
   the upload they are both literals, so nothing is inconsistent yet -- but as a
   component it would be, so the bar's width comes from a prop and the default
   keeps the upload's 76 exactly. Stated, not silently reconciled.

   Two icons are not supplied. The CSS says: 1rem tall, white, centred in a green
   disc for the title, and a flex row in success green for the percent. A trend
   line and an up arrow -- lucide TrendingUp and ArrowUp. */
import { ArrowUp, TrendingUp } from 'lucide-react';
import styled from 'styled-components';

export const SalesStatCard = ({
  title = 'Sales',
  percent = '20%',
  value = '39,500',
  fill = 76,
}: { title?: string; percent?: string; value?: string; fill?: number }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="title">
          <span>
            <TrendingUp aria-hidden="true" focusable="false" />
          </span>
          <p className="title-text">{title}</p>
          <p className="percent">
            <ArrowUp aria-hidden="true" focusable="false" />
            {percent}
          </p>
        </div>
        <div className="data">
          <p>{value}</p>
          {/* role="img" with a name: a bar whose only content is a coloured div
              says nothing to a reader, and the number beside it is a different
              figure. */}
          <div className="range" role="img" aria-label={fill + " percent of target"}>
            <div className="fill" style={{ width: fill + '%' }} />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 320px;
    border-radius: 20px;
  }

  .title {
    display: flex;
    align-items: center;
  }

  .title span {
    position: relative;
    padding: 0.5rem;
    background-color: #10B981;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 9999px;
  }

  .title span svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    height: 1rem;
    width: 1rem;
  }

  .title-text {
    margin-left: 0.5rem;
    color: #374151;
    font-size: 18px;
  }

  .percent {
    margin-left: 0.5rem;
    color: #02972f;
    font-weight: 600;
    display: flex;
  }

  .percent svg {
    height: 1rem;
    width: 1rem;
    align-self: center;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .data p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #1F2937;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    text-align: left;
  }

  .data .range {
    position: relative;
    background-color: #E5E7EB;
    width: 100%;
    height: 0.5rem;
    border-radius: 0.25rem;
  }

  .data .range .fill {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #10B981;
    height: 100%;
    border-radius: 0.25rem;
  }
`;

export default SalesStatCard;
