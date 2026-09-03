'use client'

/* Twenty-sixth upload of this batch, second of two arriving together, and the
   best-formed file in the whole batch on the things that usually go wrong:
   `useReducedMotion()` is already wired to both the width transition and the
   pulse, the refresh button already carries `aria-label="Replay animation"`,
   there is no inline `outline: none`, and every timeout is cleared on cleanup.
   Four divergences remain.

   DIVERGENCE 1. Four progress bars and no progress semantics. Measured:
   `[role="progressbar"]` count zero. A screen reader met "STORAGE" and "72%" as
   two unrelated strings sitting near each other, with nothing saying the second
   is the value of the first, and nothing to read at all while the number is still
   counting up from zero. Each track is now a `progressbar` with `aria-label`,
   `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, and the visible label row
   is `aria-hidden` so the pair is announced once rather than twice.

   DIVERGENCE 2. The glass carried nothing, the third time in three uploads.
   `rgba(255,255,255,0.06)` over an orange flower: forcing the root to the
   flower's brightest patch, the ground becomes `[241,184,203]`, on which the bar
   labels measure **1.24** and the percentages **1.02 to 1.53**. A dark scrim
   under the author's film moves the ground to `[71,58,65]`.

   DIVERGENCE 3. Both texts still failed with the scrim in place, so both were
   solved numerically. The labels at `rgba(255,255,255,0.40)` gave 3.78 on the
   site's ground and 3.16 over the bright patch; the smallest alpha reaching
   4.5:1 is 0.46 and 0.55 respectively, so **0.55** is used.

   The percentages were `${color}88` — the bar's own accent at alpha 0.53 —
   measuring 2.15, 2.37, 3.23 and 3.57 on the site ground and 1.02 to 1.53 over
   the flower. And two of the four accents cannot be read as text at ALL: solved
   over the scrimmed panel at the flower's brightest, `#3A86FF` reaches only 3.10
   at full opacity and `#FF5C8A` only 3.68, with no alpha that clears 4.5.
   `#06D6A0` needs 0.85 and `#FFBE0B` needs 0.76. A readout is data, not
   decoration, so rather than two unreadable numbers or a per-bar inconsistency
   the percentages go to `rgba(255,255,255,0.75)`. The colour coding is not lost:
   it is in the fill each number sits above, which is non-text and owes 3:1, not
   4.5:1. Accents on fills, not on glyphs — the same conclusion the sidebar
   reached from the same arithmetic.

   DIVERGENCE 4. Ten `{}`, and `type="button"` absent. */
import { useState, useEffect, useCallback } from 'react'
import { motion, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { ArrowClockwise } from '@phosphor-icons/react'


const GLASS_BLUR = {
  backdropFilter: 'blur(24px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
} as const

const GLASS_PANEL = {
  /* The author's white film is kept exactly and a dark scrim goes under it. Over
     the flower's brightest patch the film alone left the labels at 1.24. */
  background:
    'linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), rgba(14,12,16,0.80)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow:
    '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
} as const

const BACKGROUND_IMAGE =
  'https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%204%20(1).png?updatedAt=1775226802133'


interface GlassProgressBarProps {
  value: number
  color: string
  gradient: string
  label?: string
  animated?: boolean
}

interface BarConfig {
  label: string
  value: number
  color: string
  gradient: string
  delay: number
}


const BARS: BarConfig[] = [
  { label: 'Storage', value: 72, color: '#3A86FF', gradient: '#3A86FF, #2962FF', delay: 200 },
  { label: 'Upload',  value: 45, color: '#FF5C8A', gradient: '#FF5C8A, #FF1744', delay: 400 },
  { label: 'Battery', value: 88, color: '#06D6A0', gradient: '#06D6A0, #00BFA5', delay: 600 },
  { label: 'Memory',  value: 30, color: '#FFBE0B', gradient: '#FFBE0B, #FF9800', delay: 800 },
]


function GlassProgressBar({
  value,
  color,
  gradient,
  label,
  animated = false,
}: GlassProgressBarProps) {
  const prefersReduced = useReducedMotion()

  const springValue = useSpring(0, { stiffness: 80, damping: 20 })
  const [displayPercent, setDisplayPercent] = useState(0)

  useEffect(() => {
    springValue.set(value)
  }, [value, springValue])

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayPercent(Math.round(latest))
  })

  const glowAlpha = Math.round(40 + value * 0.4)
    .toString(16)
    .padStart(2, '0')
  const glowSize = 4 + value * 0.08

  const fillTransition = prefersReduced
    ? { duration: 0.3 }
    : { type: 'spring' as const, stiffness: 200, damping: 24 }

  const pulseAnimate =
    animated && !prefersReduced
      ? {
          width: `${value}%`,
          opacity: [0.85, 1, 0.85],
        }
      : { width: `${value}%` }

  const pulseTransition =
    animated && !prefersReduced
      ? {
          width: fillTransition,
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
        }
      : fillTransition

  return (
    <div className="w-full">
      {/* announced once, by the progressbar below, instead of as two loose
          strings that nothing relates to each other */}
      <div aria-hidden className="mb-2 flex items-center justify-between px-1">
        {label && (
          <span
            className="text-[10px] font-semibold uppercase tracking-widest font-sans"
            /* 0.40 measured 3.16 over the flower; 0.55 is the smallest alpha
               that clears 4.5:1 there as well as on the site's own ground */
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {label}
          </span>
        )}
        <span
          className="text-[10px] font-semibold tabular-nums font-sans"
          /* `${color}88` measured 1.02 to 1.53 over the flower, and two of the
             four accents cannot reach 4.5:1 as text at any alpha. The colour
             coding lives in the fill below, which owes 3:1, not 4.5:1. */
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {displayPercent}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-2 w-full overflow-hidden rounded-full"
        style={{ ...GLASS_PANEL }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={GLASS_BLUR}
        />

        <motion.div
          className="absolute bottom-0 left-0 top-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${gradient})`,
            filter: `drop-shadow(0 0 ${glowSize}px ${color}${glowAlpha})`,
          }}
          initial={{ width: '0%' }}
          animate={pulseAnimate}
          transition={pulseTransition}
        />
      </div>
    </div>
  )
}


export default function GlassProgress() {
  const [values, setValues] = useState<number[]>([0, 0, 0, 0])
  const [resetKey, setResetKey] = useState(0)

  const replay = useCallback(() => {
    setValues([0, 0, 0, 0])
    setResetKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []

    BARS.forEach((bar, i) => {
      const id = setTimeout(() => {
        setValues((prev) => {
          const next = [...prev]
          next[i] = bar.value
          return next
        })
      }, bar.delay)
      timeouts.push(id)
    })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [resetKey])

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="relative flex w-full max-w-[340px] flex-col items-center gap-4 px-4">
        <motion.div
          initial={{ scale: 0.92, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative isolate w-full overflow-hidden rounded-3xl"
          style={{ ...GLASS_PANEL }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
            style={GLASS_BLUR}
          />

          <div
            className="absolute left-8 right-8 top-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
          />

          <div className="flex flex-col gap-5 px-6 py-6">
            {BARS.map((bar, i) => (
              <GlassProgressBar
                key={bar.label}
                label={bar.label}
                value={values[i]}
                color={bar.color}
                gradient={bar.gradient}
                animated
              />
            ))}
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={replay}
          whileHover={{ scale: 1.12, background: 'rgba(255,255,255,0.12)' }}
          whileTap={{ scale: 0.9, rotate: -90 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          aria-label="Replay animation"
        >
          <ArrowClockwise size={18} weight="regular" className="text-white/50" />
        </motion.button>
      </div>
    </div>
  )
}
