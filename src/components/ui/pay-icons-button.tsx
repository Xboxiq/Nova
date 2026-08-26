/* Five icons in one 24px box, and a kill-switch that is saved by coming first.

   `.pay-btn:hover .icon { animation: none }` would switch off every icon
   animation on the button -- and it is written BEFORE the four rules that attach
   the animations. Specificity is equal (`.pay-btn:hover .icon` versus
   `.pay-btn:hover .card-icon`: one pseudo-class, two classes each), so source
   order decides, and the later four win. Move that one rule to the bottom of the
   file and the whole component stops animating. Worth knowing, because it looks
   like a leftover.

   The cycle is in the keyframes, not the delays. `iconRotate` is 2.5s long and
   the icon is only visible from 5% to 15% -- 0.125s to 0.375s. So each icon
   flashes for a quarter second and spends the other 2.25s hidden. Four icons at
   0, 0.5s, 1s and 1.5s fill 2s of the 2.5s cycle, which leaves a deliberate half
   second of nothing before the wallet-less button loops again.

   `visibility` is animated alongside `opacity` in every keyframe, which is not
   redundant: `visibility` is not interpolated, it flips at the keyframe boundary,
   so it takes the hidden icons out of hit-testing rather than just making them
   transparent. Two properties doing two different jobs.

   `:active` overrides all of it -- every icon off, the checkmark on with its own
   `checkmarkAppear` -- so a press interrupts the carousel and answers.

   Two additions: the whole carousel is `:hover`-keyed, so `:focus-visible`
   mirrors it, and the button gets a ring. The label is real text, so the name was
   never in question. */
import { Banknote, Check, CreditCard, DollarSign, Wallet } from 'lucide-react';
import styled from 'styled-components';

export const PayIconsButton = ({
  children = 'Pay Now',
  ...rest
}: React.ComponentPropsWithoutRef<'button'>) => (
  <StyledWrapper>
    <button className="pay-btn" type="button" {...rest}>
      <span className="icon-container">
        <Wallet className="icon wallet-icon default-icon" aria-hidden="true" />
        <CreditCard className="icon card-icon" aria-hidden="true" />
        <Banknote className="icon payment-icon" aria-hidden="true" />
        <DollarSign className="icon dollar-icon" aria-hidden="true" />
        <Check className="icon check-icon" aria-hidden="true" />
      </span>
      <span className="btn-text">{children}</span>
    </button>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .pay-btn {
    position: relative;
    padding: 12px 24px;
    font-size: 16px;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
  }

  .pay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  /* Added: everything below is hover-keyed. */
  .pay-btn:focus-visible {
    transform: translateY(-2px);
    outline: 3px solid #22c55e;
    outline-offset: 3px;
  }

  .icon-container {
    position: relative;
    width: 24px;
    height: 24px;
  }

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    color: #22c55e;
    opacity: 0;
    visibility: hidden;
  }

  .default-icon {
    opacity: 1;
    visibility: visible;
  }

  /* Hover animations */
  .pay-btn:hover .icon {
    animation: none;
  }

  .pay-btn:hover .wallet-icon,
  .pay-btn:focus-visible .wallet-icon {
    opacity: 0;
    visibility: hidden;
  }

  .pay-btn:hover .card-icon,
  .pay-btn:focus-visible .card-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0s;
  }

  .pay-btn:hover .payment-icon,
  .pay-btn:focus-visible .payment-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 0.5s;
  }

  .pay-btn:hover .dollar-icon,
  .pay-btn:focus-visible .dollar-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1s;
  }

  .pay-btn:hover .check-icon,
  .pay-btn:focus-visible .check-icon {
    animation: iconRotate 2.5s infinite;
    animation-delay: 1.5s;
  }

  /* Active state - show only checkmark */
  .pay-btn:active .icon {
    animation: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .pay-btn:active .check-icon {
    animation: checkmarkAppear 0.6s ease forwards;
    visibility: visible;
  }

  .btn-text {
    font-weight: 600;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  @keyframes iconRotate {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px) scale(0.5);
    }
    5% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    15% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    20% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
    100% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.5);
    }
  }

  @keyframes checkmarkAppear {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
`;
