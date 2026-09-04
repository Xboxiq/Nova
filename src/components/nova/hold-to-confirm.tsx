/* زرُّ التثبيتِ بالضغطِ المُطوَّل — والحركةُ هي المُهلةُ الباقية، لا زينةُ النَّقرة.
   HoldToConfirm -- the motion is the time still left to change your mind.

   VISUAL-LAW §32: before "how does it move" comes "how many times a day is it
   seen". What is seen a hundred times does not move. What is seen once and has
   a consequence -- delete, send, sign -- deserves to move TO CONFIRM. Thirty-four
   button forms are catalogued in `src/components/ui/`, and every one of them
   animates to decorate a click. None makes an irreversible action safe. That is
   the form this fills, and it is the one kind of button the motion budget says
   should exist.

   DOES NOT DUPLICATE. `shredder-button` destroys on a one-shot keyed to
   `:focus` -- nothing can be stopped once it starts. `delete-tooltip-button` is a
   plain click with a label. `not-allowed-button` refuses to act at all. None
   carries a window in which the reader can still let go. That window is this
   component's whole subject.

   THE SCALAR IS THE MARGIN OF ERROR. `--nv-hold` is one registered number, 0 at
   rest and 1 at commit, transitioned over `--hold-ms` while the button is held
   and snapped back in 180ms the moment it is released. Every visible fact is
   arithmetic on it:

     fill          inset-inline-end: calc((1 - var(--nv-hold)) * 100%)
     depth         color-mix(danger calc(100% - var(--nv-hold) * 22%), ink)
     lead edge     opacity: var(--nv-hold)

   So the fill IS how much of the hold is left, the colour deepens toward the
   pack's ink as the consequence nears, and the leading hairline appears only
   while something is moving. Release, and all three fall back together on the
   same transition, because they are the same number.

   THE LABEL IS DRAWN TWICE AND NEVER SWITCHES COLOUR. The first draft turned
   the label to `--nova-on-action` the instant the hold began, and the numbers
   said no twice over: at hold 0 the fill has no width, so for the first frames
   the label was white on a white surface; and mid-hold, white on a fill that
   desaturated toward `danger-soft` measured 3.74 in light and 4.07 to 4.27 in
   four more packs. Prohibition 6 in MOTION-VOCABULARY names this exactly -- ink
   over a moving ground has a contrast RANGE, and the low end is what counts. So
   the label is drawn twice: once in `--nova-danger-ink` on the surface, once in
   `--nova-surface` inside the fill, clipped BY the fill. Whatever the fill has
   reached is surface-on-danger; the rest is ink-on-surface; no state decides a
   colour. And `--nova-surface`, not `--nova-on-action`: on-action is vetted
   against action, and on danger it measured 3.09 in mint. The surface is the
   pack's own extreme, so surface-on-danger is 5.15 light, 7.06 dark, 4.89
   night, 5.74 to 5.76 in the four expressive packs, and rises from there.

   INSET, NOT TRANSFORM (mechanic 5). The fill's edge is `inset-inline-end`, so
   its 1px lead hairline stays 1px the whole way; a `scaleX` fill would stretch it
   into a smear at the start and squash it at the end. And `inset-inline-*` is
   §33 for free: the fill grows from the reading-start edge in Arabic and in
   English with one rule and no `[dir]` override.

   THE COMMIT IS A TIMER, THE FILL IS A TRANSITION, ONE PROP FEEDS BOTH. The
   commit cannot be allowed to hang on a `transitionend` that some engine might
   not fire for a custom property; a confirm button that never confirms is
   broken in the worse direction. So the commit is a `setTimeout(holdMs)` armed
   on press and cleared on release, and the fill is a CSS transition of the same
   `holdMs`. They cannot disagree by more than a frame, and the measurement below
   checks that they do not.

   A CLICK DOES NOT CONFIRM -- AND SAYS SO. A native button fires `click` on a
   short press and on Space. Here that is the wrong gesture, so the click
   handler does nothing destructive: it flips `data-state` to `nudged` for 900ms
   and the hint says so. A control that silently ignores the gesture people try
   first is the failure `tools/qa/operable.mjs` exists to catch, and this is the
   consequence it watches for.

   THE KEYBOARD HOLDS TOO. `keydown` on Space or Enter arms the hold exactly as
   `pointerdown` does (the repeat flag is ignored), and `keyup` releases it.
   `blur` and `pointerleave` release as well, so dragging off the button or
   tabbing away is a cancel, never a commit.

   THE TIMER AND THE TRANSITION AGREE, MEASURED. Sampled every animation frame
   inside the page: 83 distinct values of `--nv-hold` climbing linearly from 0,
   and `data-state="done"` at 1208ms against a nominal 1200. The `done` rule
   then pins the fill full, so the last frame of the transition and the first
   frame of the commit cannot be told apart.

   REDUCED MOTION DOES NOT SHORTEN THE HOLD -- AND NO STYLESHEET CAN BE TRUSTED
   TO KEEP THAT PROMISE HERE. The duration is a safety margin, not a flourish;
   collapsing it to 1ms makes the button confirm on touch. The first draft kept a
   CSS `steps(6)` transition under the preference and measured the held button:
   `transition-duration: 0.001s`, `timing steps(6)` -- the timing from my rule,
   the duration from somewhere else. The somewhere else is `bridge.css:329`:

     @media (prefers-reduced-motion: reduce) {
       .madar-surface *, ::before, ::after {
         animation-duration: 1ms !important; transition-duration: 1ms !important;
       }
     }

   A universal blanket, scoped to madar surfaces, with `!important`. For every
   other component on the surface it is exactly right. For this one it made the
   fill read "committed" at 16ms while the button stayed cancellable until
   1199ms -- the worst thing this control can do. Nothing in a component's own
   stylesheet outranks it, and fighting `!important` with `!important` would break
   the day the blanket changes. So under the preference the fill is not a
   transition at all: the SAME timer that commits also steps `--nv-hold` through
   six values, 200ms apart. The reading survives, the glide goes, and the fill
   and the commit share one clock so they cannot disagree. The preference is read
   at the moment of the press, not cached at mount -- the lesson three uploads
   in this batch paid for.

   (Two corrections to my own earlier record, found by this. The stepper's header
   says the repository's blanket "resets no transitions at all": true of
   `styles.css:2150`, false of madar surfaces, where `bridge.css:329` resets every
   one. The stepper was hosted in `Imported3`, which is not a madar surface, so it
   measured 0.24s and I generalised from one host. And the same block already
   sets `--dur-1..4` to 1ms under the preference, so the token-level fix I called
   a proposal there is a precedent the repository set for its own durations and
   has not yet extended to `--nova-motion-*`.)

   TOKENS ONLY. The danger family is `--nova-danger` and the derived
   `--nova-danger-ink` from `bridge.css`; the well is
   `--depth-instrument-well`; the radius is `--r-lg`. Nothing here asks which
   pack is on. The hint is `--nova-ink-secondary`, held above AA in all seven by
   the repository's own gate -- the unreadable operating instruction was the most
   repeated defect in twenty-eight uploads, and this hint is the instruction. */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';

export interface HoldToConfirmProps {
  /** What the press does. Shown on the button. */
  label: string;
  /** Shown once it has happened. */
  doneLabel?: string;
  /** How long the reader must hold, in ms. The safety margin. */
  holdMs?: number;
  hint?: string;
  onConfirm?: () => void;
}

type State = 'idle' | 'holding' | 'nudged' | 'done';

export const HoldToConfirm = ({
  label,
  doneLabel = 'تمّ',
  holdMs = 1200,
  hint = 'امسك حتى يمتلئ — الإفلاتُ يُلغي',
  onConfirm,
}: HoldToConfirmProps) => {
  const [state, setState] = useState<State>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepper = useRef<ReturnType<typeof setInterval> | null>(null);
  const nudge = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressedAt = useRef(0);
  /* under the preference the fill is six discrete values on the commit's own
     clock; 0 otherwise, where the CSS transition owns the value */
  const [step, setStep] = useState(0);
  const STEPS = 6;
  const uid = useId().replace(/:/g, '');
  const hintId = 'nv-hold-hint-' + uid;
  const statusId = 'nv-hold-status-' + uid;

  const clear = () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    if (stepper.current) { clearInterval(stepper.current); stepper.current = null; }
    setStep(0);
  };

  const arm = useCallback(() => {
    if (state === 'done' || timer.current) return;
    pressedAt.current = performance.now();
    setState('holding');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let k = 0;
      stepper.current = setInterval(() => { k += 1; setStep(Math.min(k, STEPS)); }, holdMs / STEPS);
    }
    timer.current = setTimeout(() => {
      timer.current = null;
      setState('done');
      onConfirm?.();
    }, holdMs);
  }, [state, holdMs, onConfirm]);

  const release = useCallback(() => {
    if (!timer.current) return;
    clear();
    setState((s) => (s === 'holding' ? 'idle' : s));
  }, []);

  const onClick = () => {
    /* A short press is the gesture people try first, and it must visibly not
       be the gesture that commits. But a native button also fires `click` after
       a hold that was released early -- measured: a 0.51 hold let go landed in
       `nudged`, telling someone who had just held for half a second not to
       click. The falling fill already says "cancelled"; only a tap gets told. */
    if (state === 'done' || state === 'holding') return;
    if (performance.now() - pressedAt.current > 200) return;
    setState('nudged');
    if (nudge.current) clearTimeout(nudge.current);
    nudge.current = setTimeout(() => setState((s) => (s === 'nudged' ? 'idle' : s)), 900);
  };

  useEffect(() => () => { clear(); if (nudge.current) clearTimeout(nudge.current); }, []);

  const held = state === 'holding';

  return (
    <StyledWrapper style={{ ['--hold-ms' as string]: `${holdMs}ms`, ['--nv-hold-step' as string]: step / STEPS }}>
      <button
        type="button"
        className="hold"
        data-state={state}
        data-held={held ? '' : undefined}
        aria-describedby={hintId}
        aria-disabled={state === 'done' ? true : undefined}
        onPointerDown={(e) => { if (e.button === 0) arm(); }}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); arm(); } }}
        onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); } }}
        onBlur={release}
        onClick={onClick}
      >
        <span className="hold__well" aria-hidden="true">
          <span className="hold__fill">
            {/* the same words again, clipped BY the fill, so whatever part of
                the label the fill has reached is surface-on-danger and the rest
                is ink-on-surface -- correct on both grounds at every instant,
                with no colour switch on a state. Hidden from the tree: the
                accessible copy is the one below. */}
            <span className="hold__label hold__label--lit">{state === 'done' ? doneLabel : label}</span>
          </span>
        </span>
        <span className="hold__label">{state === 'done' ? doneLabel : label}</span>
      </button>
      <p className="hold__hint" id={hintId}>
        {state === 'nudged' ? 'امسك، لا تنقر' : hint}
      </p>
      {/* set once on commit and never again: a status region that counts down is
          a region that never stops talking (MOTION-VOCABULARY, prohibition 8) */}
      <span className="hold__status" role="status" id={statusId}>
        {state === 'done' ? doneLabel : ''}
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  @property --nv-hold {
    syntax: "<number>";
    inherits: true;
    initial-value: 0;
  }

  display: grid;
  gap: 0.5rem;
  justify-items: start;
  inline-size: max-content;

  .hold {
    --nv-hold: 0;
    position: relative;
    isolation: isolate;
    display: inline-grid;
    place-items: center;
    min-inline-size: 11rem;
    min-block-size: 44px;
    padding: 0 1.125rem;
    border: 1px solid color-mix(in oklab, var(--nova-danger) 42%, var(--nova-border));
    border-radius: var(--r-lg);
    background: var(--nova-surface);
    color: var(--nova-danger-ink);
    font: 600 0.875rem/1 var(--nova-font-ui);
    /* no letter-spacing: this is an Arabic-first control and Arabic is cursive;
       tracking opens the joins between letters */
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    /* the whole hold is this one transition; release snaps it back faster than
       it filled, so letting go reads as letting go */
    transition: --nv-hold 180ms ease-out, border-color var(--nova-motion-fast) var(--nova-ease-standard);
  }
  .hold[data-held] {
    --nv-hold: 1;
    transition: --nv-hold var(--hold-ms) linear, border-color var(--nova-motion-fast) var(--nova-ease-standard);
  }
  /* hover paired with focus-visible in the same rule, never alone; and it is a
     border, not a lift (anti-slop 28) */
  .hold:hover, .hold:focus-visible {
    border-color: color-mix(in oklab, var(--nova-danger) 72%, var(--nova-border));
  }
  .hold[data-state="done"] {
    cursor: default;
    color: var(--nova-ink-secondary);
    border-color: var(--nova-border);
  }

  .hold__well {
    position: absolute;
    inset: 0;
    /* ABOVE the outer label, not below it. The first draft had the well at -1
       and the label at 1, and the screenshot -- not any of fourteen contrast
       readings -- showed the result: both copies visible over the fill, the ink
       glyphs painted on top of the surface-coloured ones a sub-pixel apart, and
       the word read as smeared. The copies coincided exactly, which is why the
       number passed; the defect was that two were showing where one should. */
    z-index: 1;
    border-radius: inherit;
    overflow: hidden;
    box-shadow: var(--depth-instrument-well);
  }
  .hold__fill {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    /* the fill is the hold: what is left of the width is what is left of the time */
    inset-inline-end: calc((1 - var(--nv-hold)) * 100%);
    overflow: hidden;
    /* deepens TOWARD INK, not away from soft: ink is the pack's opposite of its
       surface, so the surface-coloured copy inside only gains contrast as the
       consequence nears. Measured at both ends in all seven packs: 4.89 at the
       start (night, the minimum) rising to 5.92 and above. */
    background: color-mix(
      in oklab,
      var(--nova-danger) calc(100% - var(--nv-hold) * 22%),
      var(--nova-ink)
    );
  }
  /* the leading hairline appears only while something is moving */
  .hold__fill::after {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: 1px;
    background: color-mix(in oklab, var(--nova-surface) 55%, var(--nova-danger));
    opacity: var(--nv-hold);
  }
  .hold[data-state="done"] .hold__fill {
    inset-inline-end: 0;
    background: var(--nova-surface-quiet);
  }
  .hold[data-state="done"] .hold__label--lit { opacity: 0; }
  .hold__label {
    position: relative;
    z-index: 0;
  }
  /* The copy inside the fill. Its inline-size is the WELL's, not the fill's:
     the well is inset:0 of the button so it costs nothing to make it a
     container, and 100cqi then resolves to the button's width however far the
     fill has shrunk. Same padding and centring as the button, so the two copies
     land glyph on glyph and the fill edge reads as one label changing colour. */
  .hold__well { container-type: inline-size; }
  .hold__label--lit {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    inline-size: 100cqi;
    display: grid;
    place-items: center;
    padding: 0 1.125rem;
    box-sizing: border-box;
    color: var(--nova-surface);
    white-space: nowrap;
  }
  .hold__hint {
    margin: 0;
    font: 500 0.75rem/1.4 var(--nova-font-ui);
    color: var(--nova-ink-secondary);
  }
  .hold__status {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  /* Under the preference the value is not transitioned at all: it is the step
     the commit timer has reached. bridge.css:329 forces every madar transition
     to 1ms with !important, so a CSS steps() here would have been overruled --
     measured, it was. The blanket and this rule now agree instead of fighting. */
  @media (prefers-reduced-motion: reduce) {
    .hold[data-held] {
      --nv-hold: var(--nv-hold-step, 0);
      transition: none;
    }
    .hold:not([data-held]) { transition-duration: 1ms; }
  }
`;

export default HoldToConfirm;
