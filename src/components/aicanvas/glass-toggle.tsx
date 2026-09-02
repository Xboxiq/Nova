'use client'

/* Eighth upload of this batch, built to the supplied specification.

   The note that came with it is the reason the material is written the way it is
   below. Glass is not the panel — it is the relationship between the panel and
   what lies behind it, and the previous upload in this section had that
   relationship backwards. There, the ground was dimmed to rescue the contrast of
   the text on top, which is precisely the move that destroys the effect: blur a
   flat dark field and you get a flat dark field. The legibility has to come out of
   the MATERIAL, not out of flattening the world behind it.

   So the ground here stays vivid, and the blur layer carries a dark scrim of its
   own — blur, then saturate, then tint. That is how a dark material actually
   works: the colour outside the panel keeps its life, the blur has structure to
   smear, and the interior is dark enough to carry white text. The scrim is the one
   addition to the specified layer, and it is what makes the specified
   `rgba(255,255,255,0.06)` and `white/60` label legible without touching either.

   DIVERGENCE 1. The specified background is a hotlinked photograph on a
   third-party CDN, and it was requested by name, so it is carried. But it does
   not arrive in every environment: measured here, the request is issued and
   nothing comes back — no response, no failure event, `naturalWidth` still 0 after
   twelve seconds. A glass panel over a missing photograph is a flat box, so a
   local ground is drawn underneath it: the photograph paints over the gradient at
   the specified `opacity-60` when it loads, and the gradient carries the glass
   when it does not. Nothing is removed and nothing is substituted.

   DIVERGENCE 2. A toggle that only answers a mouse is not a toggle. The rows are
   `role="switch"` with `aria-checked`, named by their own label through
   `aria-labelledby`, so Space and Enter come free with the button element and the
   state is announced rather than merely coloured. The "On"/"Off" line is marked
   `aria-hidden` because `aria-checked` already says it, and hearing it twice is
   worse than not seeing it once.

   DIVERGENCE 3. This project loads Tailwind's utilities without Preflight, so a
   `<button>` keeps its user-agent chrome unless it is reset — the fourth upload in
   a row to need the same three declarations.

   DIVERGENCE 4. `useSpring` is a motion value and no CSS blanket reaches it, so
   under `prefers-reduced-motion` the track is moved with `jump()` instead, which
   sets it without an animation. The entrance transitions are handled by the
   showcase's `MotionConfig`.

   Manrope is named first in the stack as asked, with the project's own UI family
   behind it. This application loads no external font host — four uploads have now
   named a face it does not carry — so on this machine the fallback renders, and
   the typography section's "project default sans-serif" is what appears. */

import { useEffect, useId, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent p-0'

const FONT_STACK =
  "'Manrope', var(--nova-font-ui, ui-sans-serif, system-ui, sans-serif)"

const SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 }

interface ToggleSpec {
  label: string
  defaultOn: boolean
  color: string
  delay: number
}

const TOGGLES: ToggleSpec[] = [
  { label: 'Dark Mode', defaultOn: true, color: '#FF6BF5', delay: 0.1 },
  { label: 'Notifications', defaultOn: true, color: '#06D6A0', delay: 0.15 },
  { label: 'Auto-Update', defaultOn: false, color: '#FFBE0B', delay: 0.2 },
  { label: 'Analytics', defaultOn: false, color: '#FF7B54', delay: 0.25 },
  { label: 'Haptic Feedback', defaultOn: true, color: '#3A86FF', delay: 0.3 },
]

function Toggle({ label, defaultOn, color, delay }: ToggleSpec) {
  const [on, setOn] = useState(defaultOn)
  const labelId = useId()
  const still = useReducedMotion()

  const progress = useSpring(defaultOn ? 1 : 0, { stiffness: 300, damping: 22 })

  useEffect(() => {
    const next = on ? 1 : 0
    if (still) progress.jump(next)
    else progress.set(next)
  }, [on, still, progress])

  const trackBackground = useTransform(
    progress,
    [0, 1],
    ['rgba(255,255,255,0.08)', `${color}44`],
  )
  const trackBorderColor = useTransform(
    progress,
    [0, 1],
    ['rgba(255,255,255,0.1)', `${color}55`],
  )
  const thumbX = useTransform(progress, [0, 1], [2, 26])
  const thumbShadow = useTransform(
    progress,
    [0, 1],
    ['0 2px 8px rgba(0,0,0,0.3)', `0 2px 16px ${color}44`],
  )

  /* The lit ring only exists when the switch is on, and the inner shade deepens
     when it is off. A plain string: it changes only when `on` changes, which is a
     render anyway. */
  const trackShadow = on
    ? `0 0 20px ${color}15, inset 0 1px 2px rgba(0,0,0,0.1)`
    : 'inset 0 1px 2px rgba(0,0,0,0.2)'

  return (
    <motion.div
      className="flex items-center justify-between"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...SPRING, delay }}
    >
      <span className="flex flex-col">
        <span
          id={labelId}
          className="text-sm font-medium text-white/60"
          style={{ fontFamily: FONT_STACK }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="text-[11px]"
          style={{
            fontFamily: FONT_STACK,
            color: on ? color : 'rgba(255,255,255,0.25)',
            opacity: on ? 1 : 0.5,
          }}
        >
          {on ? 'On' : 'Off'}
        </span>
      </span>

      <motion.button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={labelId}
        onClick={() => setOn((v) => !v)}
        whileTap={{ scale: 0.95 }}
        className={`${PREFLIGHT_BUTTON} relative h-8 w-14 shrink-0 cursor-pointer rounded-full`}
        style={{
          background: trackBackground,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: trackBorderColor,
          boxShadow: trackShadow,
        }}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{ opacity: on ? 0.3 : 0 }}
          transition={SPRING}
          style={{
            background: `radial-gradient(circle at 75% 50%, ${color}, transparent 70%)`,
          }}
        />
        <motion.span
          aria-hidden
          className="absolute top-1/2 h-6 w-6 rounded-full"
          style={{
            x: thumbX,
            y: '-50%',
            boxShadow: thumbShadow,
            background: on
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.5))',
          }}
        >
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{
              inset: 2,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.5), transparent 60%)',
            }}
          />
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

export default function GlassToggle() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
      {/* Local ground first, so the blur has something to smear when the CDN
          photograph does not arrive. Vivid on purpose: a dimmed ground is what
          makes glass look like paint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(118% 90% at 24% 14%, rgba(255, 138, 76, 0.85), transparent 58%),' +
            'radial-gradient(104% 84% at 82% 76%, rgba(255, 92, 150, 0.60), transparent 60%),' +
            'radial-gradient(88% 72% at 60% 40%, rgba(255, 206, 128, 0.50), transparent 54%)',
        }}
      />
      <img
        src="https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%201%20(1).png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <motion.div
        className="relative isolate flex w-[320px] flex-col gap-5 rounded-3xl px-7 py-7"
        initial={{ y: 20, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        transition={SPRING}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow:
            '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* The specified blur layer, plus the scrim that makes the material dark
            instead of the world dark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
          style={{
            backdropFilter: 'blur(24px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
            background: 'rgba(14,12,16,0.66)',
          }}
        />
        {/* Top edge highlight: the tell that a surface has thickness. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-7 right-7 top-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />

        <h3
          className="text-base font-semibold text-white/80"
          style={{ fontFamily: FONT_STACK }}
        >
          Preferences
        </h3>

        {TOGGLES.map((spec, i) => (
          <div key={spec.label} className="flex flex-col gap-5">
            {i > 0 && (
              <div
                aria-hidden
                className="h-[1px] w-full"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
            )}
            <Toggle {...spec} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
