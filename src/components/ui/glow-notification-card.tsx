/* Uploads 67 and 68 carry byte-identical CSS (1503 chars after normalising); 68
   only adds unstyled words. One component.

   The layers are fixed by z-index: ::before at 2 is the inner panel, ::after at 4
   is the gradient rail, .notiglow at 3 sits between them, .notiborderglow at 1
   sits under everything, and the text at 5 is on top. So the border glow lights
   the 1px rim the inner panel leaves exposed, and the inner glow washes the panel
   itself -- two lights, one under and one over the same surface.

   THE MECHANISM THE CSS CANNOT SUPPLY: both glows are 20rem radial gradients with
   "transform: translate(-50%, -50%)" and NO top or left. So they centre on the
   element origin -- a wash stuck in the top-left corner. A closest-side radial
   translated by half its own size is the signature of a light that follows the
   pointer, and nothing in a stylesheet can move it. So two custom properties are
   set from a pointermove handler and the offsets read them. That is the
   difference between the effect existing and not; the gradients, sizes, opacities
   and z-order are untouched. */
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

export const GlowNotificationCard = ({
  title = 'Welcome To Uiverse',
  body = 'Contribute to Open Source UI Elements',
}: { title?: string; body?: string }) => {
  const host = useRef<HTMLDivElement>(null);

  const track = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = host.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', e.clientX - r.left + 'px');
    el.style.setProperty('--glow-y', e.clientY - r.top + 'px');
  }, []);

  return (
    <StyledWrapper>
      <div className="notification" ref={host} onPointerMove={track}>
        <div className="notiglow" />
        <div className="notiborderglow" />
        <div className="notititle">{title}</div>
        <div className="notibody">{body}</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .notification {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;
    width: 18rem;
    height: 8rem;
    background: #29292c;
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
    --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
    --color: #32a6ff;
  }

  .notification:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2;
  }

  .notification:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  .notification:hover:after {
    transform: translateX(0.15rem);
  }

  .notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notititle {
    transform: translateX(0.15rem);
  }

  .notibody {
    color: #99999d;
    padding: 0 1.25rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notibody {
    transform: translateX(0.25rem);
  }

  .notiglow,
  .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .notiglow {
    z-index: 3;
  }

  .notiborderglow {
    z-index: 1;
  }

  .notification:hover .notiglow {
    opacity: 0.1;
  }

  .notification:hover .notiborderglow {
    opacity: 0.1;
  }

  /* The two lines the stylesheet could not have. Without them both glows sit at
     the origin and the effect is a corner smudge. */
  .notiglow,
  .notiborderglow {
    left: var(--glow-x, 50%);
    top: var(--glow-y, 50%);
  }

  /* .note in the upload is position:fixed at 80% of the VIEWPORT -- a page-level
     caption, not part of the card. Left out rather than dropped into a component
     where it would float over unrelated content. */
`;

export default GlowNotificationCard;
