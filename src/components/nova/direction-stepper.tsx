/* مِسطرةُ الخُطوات — والمرسومُ هو المِحورُ المنطقيُّ لا الفيزيائيّ.
   DirectionStepper -- and the axis it draws on is the logical one, not the left.

   VISUAL-LAW §33: the corpus is full of steppers, rails and segmented progress,
   and every one of them is placed physically. This is the first that is not.

   WHY THIS FORM, AND WHY NOW. Twenty-eight uploads were implemented, measured
   and recorded in this batch, and not one of them survives the direction this
   project renders in. `Imported3.tsx` carries THIRTY-NINE `dir="ltr"` wrappers,
   one per specimen, each written by me to keep an import from breaking. Across
   the twenty-four imported files: ZERO logical properties between them. Ten
   reach for `left-…`, seven for `right-…`, five animate `x: -8`, and four bind
   `ArrowRight` to "forward". Against that, `index.html` opens
   `<html lang="ar" dir="rtl">` and `src/styles.css` carries FORTY-SIX logical
   properties with a `[dir="ltr"]` override beside each asymmetry — the design
   system was right the whole time and the feed never was. A survey of 21st.dev's
   four thousand one hundred components found the same hole: heroes, shaders,
   gradients, sign-ins, and nothing direction-aware. And this law itself had
   thirty-two articles and not one about direction.

   THE AXIS IS DECLARED, NOT PLACED.

     inset-inline-start / inset-inline-end / inline-size / padding-inline

   The track, the travelled part of it and every tile are laid on the inline
   axis, so the whole rail mirrors with no second rule, no `[dir]` override and
   no measurement in React. The fill grows from the reading-start edge in either
   direction because that is what `inset-inline-start` MEANS.

   AND THE ARROW KEYS ARE PART OF THE GEOMETRY. This is the half the corpus
   misses. In right-to-left reading order the NEXT step is to the LEFT, so
   `ArrowLeft` advances here and retreats under `ltr`. Four uploads hard-coded
   the opposite. The direction is read off the rail's own resolved `direction` at
   the moment a key arrives — not cached in state, not watched with an observer:

     const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'

   One line where it is needed, and it cannot be stale. The first draft of this
   file kept it in `useState` behind a `MutationObserver` on `<html>`, eleven
   lines that would have gone wrong inside a subtree that flips on its own — the
   same mistake as caching `prefers-reduced-motion` at mount instead of reading
   it at the event, which cost three uploads in this batch.

   IT PAINTS IN TOKENS, SO IT NEVER ASKS WHICH THEME IS ON. The most repeated
   defect in the feed was seven components in a row testing
   `classList.contains('dark')` in a repository with no `.dark` class. That
   question only has to be asked by a component carrying hard-coded hex.
   `var(--nova-ink)` is already answered, in all seven packs and both dark ones,
   upstream of anything here. Do not detect; do not hard-code.
   `tools/qa/theme-detection.mjs` now holds the line for the imports that must.

   THE HINT SAYS WHICH KEYS WORK, AND IT IS LEGIBLE. The single most repeated
   defect of all was an unreadable operating instruction — 1.57 in the flip
   calendar, 1.58 in the noise field, 2.25 in the user menu, 1.83 in the travel
   deck. Each was faint because it is secondary in the composition while being
   primary in the function. This one is `--nova-ink-secondary`, a token the
   repository's own contrast gate already holds above AA in every pack, so it
   cannot decay into that number.

   THE STEP IS THE VALUE; THE SLIDE IS THE DECORATION. Measured before it was
   handled: `transition: inline-size 0.24s` ran unchanged under
   `prefers-reduced-motion: reduce`, because this repository's blanket at
   `styles.css:2150` names five selectors and resets no transitions at all. So the
   duration collapses here instead, and the fill lands on the new step in one
   frame while still landing in the right place. The same split as the clock's
   time against its blink, the calendar's day against its page turn and the
   deck's hotel count against its count-up.

   (Worth the owner's attention, and not taken unilaterally: these durations are
   already tokens — `--nova-motion-base`, `--nova-motion-fast` and three more. One
   line inside that existing media block, redefining the five to `1ms`, would
   honour the preference for every component in the library that reads them
   rather than one at a time in each file. That is a system-wide behaviour change
   under the preference, which is the owner's call, so it is reported here and
   this file handles only itself.)

   FOCUS IS THE PROJECT'S. No outline of its own: the unlayered
   `[tabindex]:focus-visible` in `styles.css:87` outranks anything a component
   can add, and two uploads silenced it with an inline `outline: 'none'`.
   `tools/qa/focus-ring-intact.mjs` now refuses that placement outright. */
import { useCallback, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface DirectionStepperProps {
  steps: readonly string[]
  value?: number
  onChange?: (index: number) => void
  /** Names the rail for assistive technology. */
  label: string
  /** Shown under the rail; set to null to omit it. */
  hint?: string | null
}

export function DirectionStepper({
  steps,
  value,
  onChange,
  label,
  hint = 'استخدِم الأسهُمَ للتنقُّل',
}: DirectionStepperProps) {
  const railRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const [uncontrolled, setUncontrolled] = useState(0)
  const active = value ?? uncontrolled
  const railId = useId()

  const move = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, next))
    if (clamped === active) return
    if (value === undefined) setUncontrolled(clamped)
    onChange?.(clamped)
    itemRefs.current[clamped]?.focus()
  }, [active, onChange, steps.length, value])

  function onKeyDown(e: React.KeyboardEvent<HTMLOListElement>) {
    /* The logical axis, read where it is needed so it can never be stale. In
       rtl the next step is to the LEFT — the whole point of this component and
       the reverse of what four uploads hard-coded. */
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
    const back = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (e.key === forward || e.key === 'ArrowDown') { e.preventDefault(); move(active + 1); return }
    if (e.key === back || e.key === 'ArrowUp') { e.preventDefault(); move(active - 1); return }
    if (e.key === 'Home') { e.preventDefault(); move(0); return }
    if (e.key === 'End') { e.preventDefault(); move(steps.length - 1) }
  }

  const done = steps.length > 1 ? active / (steps.length - 1) : 0

  return (
    <div
      className="flex w-full min-w-0 flex-col gap-3"
      style={{ fontFamily: 'var(--nova-font-ui)' }}
    >
      <ol
        ref={railRef}
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative flex w-full min-w-0 list-none items-stretch gap-1 p-0"
        style={{ margin: 0 }}
      >
        {/* the track and the travelled part of it, both on the inline axis so the
            fill grows from the reading-start edge in either direction */}
        <span
          aria-hidden
          className="absolute"
          style={{
            insetInlineStart: 0,
            insetInlineEnd: 0,
            bottom: 0,
            height: 2,
            background: 'var(--nova-border)',
            borderRadius: 2,
          }}
        />
        <span
          aria-hidden
          className="absolute"
          style={{
            insetInlineStart: 0,
            bottom: 0,
            height: 2,
            inlineSize: `${done * 100}%`,
            background: 'var(--nova-action)',
            borderRadius: 2,
            transition: reduce ? 'none' : 'inline-size var(--nova-motion-base) var(--nova-ease-standard)',
          }}
        />

        {steps.map((step, i) => {
          const isActive = i === active
          const isPast = i < active
          return (
            <li key={step} className="min-w-0 flex-1">
              <button
                ref={(n) => { itemRefs.current[i] = n }}
                type="button"
                /* one tab stop for the whole rail, arrows move within it —
                   the roving-tabindex pattern this repo already uses for its
                   library picker */
                tabIndex={isActive ? 0 : -1}
                aria-current={isActive ? 'step' : undefined}
                aria-describedby={hint ? `${railId}-hint` : undefined}
                onClick={() => move(i)}
                className="flex w-full min-w-0 cursor-pointer flex-col items-start gap-1.5 border-0 bg-transparent pb-2 text-start"
                style={{
                  paddingInline: 2,
                  color: isActive
                    ? 'var(--nova-ink)'
                    : isPast ? 'var(--nova-ink-secondary)' : 'var(--nova-ink-tertiary)',
                  fontSize: 13,
                  fontWeight: isActive ? 650 : 500,
                  fontFamily: 'var(--nova-font-ui)',
                }}
              >
                <span
                  aria-hidden
                  className="shrink-0"
                  style={{
                    inlineSize: 20,
                    blockSize: 20,
                    borderRadius: 999,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontWeight: 650,
                    fontVariantNumeric: 'tabular-nums',
                    background: isActive || isPast ? 'var(--nova-action)' : 'var(--nova-surface-quiet)',
                    color: isActive || isPast ? 'var(--nova-on-action)' : 'var(--nova-ink-tertiary)',
                    border: isActive || isPast ? 'none' : '1px solid var(--nova-border)',
                    transition: reduce ? 'none' : 'background var(--nova-motion-fast) var(--nova-ease-standard)',
                  }}
                >
                  {i + 1}
                </span>
                <span className="truncate">{step}</span>
              </button>
            </li>
          )
        })}
      </ol>

      {hint && (
        <p
          id={`${railId}-hint`}
          /* --nova-ink-secondary is held above AA in all seven packs by the
             repository's own contrast gate, so this cannot become the 1.57 the
             flip calendar shipped with. */
          style={{ margin: 0, fontSize: 12, color: 'var(--nova-ink-secondary)' }}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default DirectionStepper
