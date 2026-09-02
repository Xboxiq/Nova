'use client'

/* Tenth upload of this batch, implemented per its own requirements.

   DIVERGENCE 1, and it is not the defect I expected to find. The dock items are
   `motion.div`s with `cursor-pointer` and `whileTap`, and my first reading was
   "nine pressable things with no keyboard path". The measurement says something
   sharper: framer-motion puts an element carrying `whileTap` INTO the tab order
   itself, so the nine badges arrive as `<div tabindex="0">` with `role: null`,
   `aria-label: null` and `text: ""`. They are already nine tab stops, and each one
   announces nothing at all. That is worse than being unreachable — an unreachable
   control is merely missing, while these are nine empty landings a keyboard user
   must walk through to leave the dock.

   And the only thing that names an item is the tooltip, which is revealed by
   `group-hover` alone: measured, focusing a badge leaves the tooltip at
   `opacity: 0`. So the name exists and never appears for the person who most needs
   it, while the same text sits in the accessibility tree as nine loose words,
   because `opacity: 0` hides from eyes and not from screen readers.

   So the badge is a real `<button>` carrying its label as an accessible name, the
   tooltip is `aria-hidden` (the name already says it, and hearing it twice is
   worse), and the tooltip is revealed on focus as well as on hover. The dock is
   `role="toolbar"` so the nine stops are announced as one group rather than nine
   strangers. No press handler is specified anywhere in the brief, so pressing
   still does only what it did — the `whileTap` squash.

   DIVERGENCE 2. The named photograph is carried and does not arrive here
   (`naturalWidth` 0), so a local ground is drawn underneath it.

   DIVERGENCE 3. The blur layer had no fill of its own, so the dock took whatever
   brightness the ground gave it. It carries a dark scrim now, and the ground stays
   vivid — dimming the ground is the mistake this section recorded once already.

   DIVERGENCE 4. The tooltip needed the same treatment more urgently, because it
   floats ABOVE the dock over the raw ground rather than over the dock's material.
   Its specified `rgba(255,255,255,0.1)` film over a bright bloom puts `text-white/90`
   at about 2.6 against 4.5. The specified film is kept exactly and a scrim is added
   UNDER it, which computes to about 8.6.

   DIVERGENCE 5. `useSpring` is a motion value no CSS blanket reaches, so under
   `prefers-reduced-motion` the badge binds the raw transform and the spring is
   bypassed. Both hooks still run every render.

   DIVERGENCE 6. Six `{}` left where the registry stripped comment text out.

   Measured and NOT changed: the icon glyphs. `${color}18` is a 9.4% film of the
   colour over the dock material, so every glyph sits on something near the dock's
   own darkness, and all nine clear the 3:1 a glyph needs — worst is Peace at 3.60,
   then Passion and Love at 4.11. Nothing to fix, and worth stating as a number
   rather than assumed from the fact that it looks fine. */

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/* Tailwind's utilities load without Preflight here, so a `<button>` keeps its
   user-agent chrome unless it is reset. Fifth upload in a row to need it. */
const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent p-0'

const SCRIM = 'rgba(14,12,16,0.72)'
import {
  Sun,
  Heart,
  MusicNote,
  Coffee,
  Leaf,
  Star,
  Moon,
  Flame,
  Cloud,
} from '@phosphor-icons/react'

const DOCK_ITEMS = [
  { icon: Sun,       color: '#FFBE0B', label: 'Energy' },
  { icon: Heart,     color: '#FF5C8A', label: 'Love' },
  { icon: MusicNote, color: '#FF7B54', label: 'Joy' },
  { icon: Coffee,    color: '#C9A96E', label: 'Comfort' },
  { icon: Leaf,      color: '#06D6A0', label: 'Nature' },
  { icon: Star,      color: '#FFBE0B', label: 'Dreams' },
  { icon: Moon,      color: '#B388FF', label: 'Rest' },
  { icon: Flame,     color: '#FF5C8A', label: 'Passion' },
  { icon: Cloud,     color: '#3A86FF', label: 'Peace' },
]

const ICON_SIZE = 44
const MAG_RANGE = 120
const MAG_SCALE = 1.55

function DockItem({
  icon: Icon,
  color,
  label,
  mouseX,
  index,
}: {
  icon: typeof Sun
  color: string
  label: string
  mouseX: ReturnType<typeof useMotionValue<number>>
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (mx: number) => {
    const el = ref.current
    if (!el || mx < 0) return 200
    const rect = el.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    return Math.abs(mx - center)
  })

  const rawSize = useTransform(distance, [0, MAG_RANGE], [ICON_SIZE * MAG_SCALE, ICON_SIZE])
  const still = useReducedMotion()
  const springSize = useSpring(rawSize, { stiffness: 300, damping: 22, mass: 0.5 })
  const size = still ? rawSize : springSize
  const y = useTransform(size, [ICON_SIZE, ICON_SIZE * MAG_SCALE], [0, -12])

  return (
    <motion.div
      ref={ref}
      className="group relative flex cursor-pointer flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: index * 0.04 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-10 rounded-lg px-3 py-1.5 text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background:
            'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), ' + SCRIM,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'opacity 0.15s',
        }}
      >
        {label}
      </motion.div>
      <motion.button
        type="button"
        aria-label={label}
        style={{
          width: size,
          height: size,
          y,
          background: `${color}18`,
          border: `1px solid ${color}22`,
          borderRadius: 12,
        }}
        whileTap={{ scale: 0.82 }}
        className={`${PREFLIGHT_BUTTON} flex cursor-pointer items-center justify-center`}
      >
        <Icon size={22} weight="regular" style={{ color }} />
      </motion.button>
    </motion.div>
  )
}

export default function GlassDock() {
  const mouseX = useMotionValue(-200)

  return (
    <div className="relative flex min-h-screen w-full items-center justify-end overflow-hidden bg-[#1A1A19] pb-8">
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
        src="https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%201%20(1).png?updatedAt=1775223702866"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="flex w-full overflow-x-auto py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          role="toolbar"
          aria-label="Dock"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(-200)}
          className="relative isolate mx-auto flex shrink-0 items-end gap-2 rounded-3xl px-4 pb-3 pt-3"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
            style={{
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              background: SCRIM,
            }}
          />
          {DOCK_ITEMS.map((item, i) => (
            <DockItem key={item.label} {...item} mouseX={mouseX} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
