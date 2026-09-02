'use client'

/* Ninth upload of this batch, implemented per its own requirements.

   This one arrives in far better shape than its neighbours, and that is worth
   saying as plainly as the defects: the track is already `role="slider"` with
   `aria-valuemin/max/now`, it already answers the arrow keys and Home and End, it
   already carries a focus ring, it already cleans its window listeners up on
   unmount, and its tap target is already 44x44. Four of the five things the last
   four uploads had to be given, this one brought.

   DIVERGENCE 1, and it is the one that matters. All that keyboard support could
   not be reached by the gesture a person actually makes. `onPointerDown` calls
   `preventDefault()`, which is right for suppressing selection and touch scroll
   but also suppresses the focus that a press would otherwise move — so after
   clicking a track, the track is not focused and the arrow keys do nothing.
   Measured: click the middle of Brightness and the value becomes 50, then
   `activeElement` is still the section tab and `ArrowRight` leaves it at 50; focus
   the same track programmatically and it reads 50, 52, then 100 on End. One line
   — focus the track in the handler — turns shipped-but-unreachable into working.

   DIVERGENCE 2. The specified photograph is carried as named and does not arrive
   here: `naturalWidth` 0, `complete` false. A local ground is drawn underneath, so
   the photograph paints over it at the specified `opacity-60` where it loads and
   the ground carries the glass where it does not.

   DIVERGENCE 3. The specified blur layer had no fill of its own, so the material
   was blur alone and the panel interior took whatever brightness the ground had.
   It now carries a dark scrim — blur, saturate, then tint — which is what keeps
   the world behind vivid while the interior stays dark enough to read on. The
   alternative, dimming the ground, is the mistake this section already recorded
   once.

   DIVERGENCE 4. `useSpring` is a motion value that no CSS blanket reaches, so
   under `prefers-reduced-motion` the thumb takes the transform directly and the
   spring is bypassed. Both hooks are still called on every render; only the bound
   value changes.

   DIVERGENCE 5. Six `{}` left where the registry stripped comment text out.

   Manrope is named first in the panel's stack as asked, with the project's own UI
   family behind it; the value readouts stay `font-mono` as the typography section
   asks. This application loads no external font host, so the fallback renders. */

import { useState, useRef, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const FONT_STACK =
  "'Manrope', var(--nova-font-ui, ui-sans-serif, system-ui, sans-serif)"


const BACKGROUND = 'https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%204%20(1).png?updatedAt=1775226802133'

const SLIDERS = [
  { label: 'Brightness', defaultValue: 72, colorA: '#5B8FF9', colorB: '#A78BFA' },
  { label: 'Contrast',   defaultValue: 45, colorA: '#FF6BF5', colorB: '#FF6680' },
  { label: 'Warmth',     defaultValue: 60, colorA: '#FF7B54', colorB: '#FFBE0B' },
  { label: 'Saturation', defaultValue: 55, colorA: '#06D6A0', colorB: '#5B8FF9' },
]


function lerpHex(a: string, b: string, t: number): string {
  const ah = a.replace('#', '')
  const bh = b.replace('#', '')
  const ar = parseInt(ah.slice(0, 2), 16)
  const ag = parseInt(ah.slice(2, 4), 16)
  const ab = parseInt(ah.slice(4, 6), 16)
  const br = parseInt(bh.slice(0, 2), 16)
  const bg = parseInt(bh.slice(2, 4), 16)
  const bb = parseInt(bh.slice(4, 6), 16)
  return `#${Math.round(ar + (br - ar) * t).toString(16).padStart(2, '0')}${Math.round(ag + (bg - ag) * t).toString(16).padStart(2, '0')}${Math.round(ab + (bb - ab) * t).toString(16).padStart(2, '0')}`
}


function Slider({
  label,
  defaultValue,
  colorA,
  colorB,
  delay,
}: {
  label: string
  defaultValue: number
  colorA: string
  colorB: string
  delay: number
}) {
  const [value, setValue] = useState(defaultValue)
  const [hovered, setHovered] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useMotionValue(0)
  const still = useReducedMotion()
  const rawScale = useTransform(isDragging, [0, 1], [1, 1.3])
  const springScale = useSpring(rawScale, { stiffness: 400, damping: 20 })
  const thumbScale = still ? rawScale : springScale

  const onMoveRef = useRef<((ev: PointerEvent) => void) | null>(null)
  const onUpRef = useRef<(() => void) | null>(null)

  const thumbColor = lerpHex(colorA, colorB, value / 100)

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.set(1)

    const track = trackRef.current
    if (!track) return

    /* `preventDefault` above stops selection and touch scrolling, and takes the
       press's focus with it. Without this line the arrow keys below are dead to
       anyone who reached the slider by pressing it. */
    track.focus()

    const updateValue = (clientX: number) => {
      const rect = track.getBoundingClientRect()
      setValue(Math.round(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100))
    }

    updateValue(e.clientX)

    const onMove = (ev: PointerEvent) => updateValue(ev.clientX)
    const onUp = () => {
      isDragging.set(0)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      onMoveRef.current = null
      onUpRef.current = null
    }
    onMoveRef.current = onMove
    onUpRef.current = onUp
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = value - 1
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = value + 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 100
    if (next === null) return
    e.preventDefault()
    setValue(Math.max(0, Math.min(100, next)))
  }

  useEffect(() => {
    return () => {
      if (onMoveRef.current) window.removeEventListener('pointermove', onMoveRef.current)
      if (onUpRef.current) window.removeEventListener('pointerup', onUpRef.current)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22, delay }}
      className="flex flex-col gap-[14px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between">
        <motion.span
          animate={{ color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium"
          style={{ fontFamily: FONT_STACK }}
        >
          {label}
        </motion.span>
        <span className="font-mono text-sm font-semibold" style={{ color: thumbColor }}>{value}</span>
      </div>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        className="relative h-[5px] w-full cursor-pointer rounded-full touch-none outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        style={{
          background: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
          transition: 'background 0.2s ease',
        }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colorA}, ${colorB})`,
            filter: hovered ? `drop-shadow(0 0 4px ${thumbColor}88)` : 'none',
            transition: 'filter 0.2s ease',
          }}
        />
        <motion.div
          className="absolute top-1/2 flex h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${value}%`, scale: thumbScale }}
        >
          <div
            className="h-[18px] w-[18px] rounded-full bg-white"
            style={{
              boxShadow: `0 0 0 2.5px ${thumbColor}, 0 2px 10px ${thumbColor}66`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}


export default function GlassSlider() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
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
        src={BACKGROUND}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <motion.div
        initial={{ y: 20, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="relative isolate flex w-[calc(100%-32px)] max-w-[360px] flex-col gap-7 rounded-3xl px-7 py-8"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
          style={{
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            background: 'rgba(14,12,16,0.76)',
          }}
        />
        <div
          className="absolute left-7 right-7 top-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
        />

        <h3
          className="text-base font-semibold text-white/80"
          style={{ fontFamily: FONT_STACK }}
        >
          Display
        </h3>

        {SLIDERS.map((s, i) => (
          <Slider key={s.label} {...s} delay={0.08 + i * 0.06} />
        ))}
      </motion.div>
    </div>
  )
}
