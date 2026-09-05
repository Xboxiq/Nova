'use client'

/* Fourteenth upload of this batch, one of three that arrived together.

   DIVERGENCE 1. Twelve pills that toggle, and nothing said so. Each is already a
   real `<button>` with its label as text — measured, all twelve name themselves —
   but `aria-pressed` was absent, so the selected state existed only as a colour, a
   glow and a tick. It is carried on the attribute now, which is the one thing a
   screen reader can read. The tick and the dot are `aria-hidden`: they say the same
   thing the attribute says, and twice is worse than once.

   DIVERGENCE 2. The named photograph is carried and does not arrive here
   (`naturalWidth` 0), so a local ground is drawn underneath and the pill's blur
   layer carries a dark scrim of its own.

   DIVERGENCE 3. `type="button"`, absent on all twelve.

   DIVERGENCE 4. Three `{}` left where the registry stripped comment text out.

   Measured and NOT changed, which is worth as much as a fix: the idle label at
   `rgba(255,255,255,0.5)` reads 4.76 over the pill and passes. My first measurement
   said 3.63 and was wrong — my own helper resolved the translucent ink over black
   instead of over the surface it actually sits on, which turns white at half alpha
   into rgb(128,128,128) when the truth is rgb(149,149,149). The specified value
   stands.

   Manrope is named first in the stack as asked, with the project's own UI family
   behind it; no external font host is loaded here, so the fallback renders. */
import { useState } from 'react'
import { motion } from 'framer-motion'

// customize: replace the background and tag labels below

const BACKGROUND = 'https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%203%20(1).png?updatedAt=1775226815629'

const TAGS = [
  { label: 'Design',       color: '#FF9A3C' },
  { label: 'Development',  color: '#FFBE0B' },
  { label: 'Motion',       color: '#FF6BF5' },
  { label: 'AI',           color: '#FF7B54' },
  { label: '3D',           color: '#DC5A28' },
  { label: 'Typography',   color: '#FFD166' },
  { label: 'Branding',     color: '#FF6680' },
  { label: 'iOS',          color: '#FF9A3C' },
  { label: 'WebGL',        color: '#FFBE0B' },
  { label: 'React',        color: '#FF7B54' },
  { label: 'Figma',        color: '#FF6BF5' },
  { label: 'Prototyping',  color: '#FFD166' },
]

const GLASS_FILTER = 'blur(24px) saturate(1.8)'
/* 0.80, not the 0.66 the sibling components use. The pills are small and the
   bloom behind them is bright, and at 0.66 the specified `rgba(255,255,255,0.5)`
   label measured 4.13 — a failure caused by MY ground rather than by the upload,
   so the ground is what gives way. */
const SCRIM = 'rgba(14,12,16,0.80)'
const FONT_STACK =
  "'Manrope', var(--nova-font-ui, ui-sans-serif, system-ui, sans-serif)"


function GlassTag({ label, color, index }: { label: string; color: string; index: number }) {
  const [selected, setSelected] = useState(false)
  const [hovered,  setHovered]  = useState(false)

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      initial={{ scale: 0.8, y: 12 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.04 }}
      onClick={() => setSelected(s => !s)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className="relative isolate cursor-pointer rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
      style={{
        /* The scrim is a layer of THIS background rather than of the blur layer
           behind it. Same pixels — the blur layer paints behind either way — but
           `axe` resolves text against its ancestors, and a negative-z sibling is
           not one, so with the scrim back there the label was judged against the
           light page instead of against the pill. */
        background: `${
          selected
            ? `linear-gradient(135deg, ${color}33, ${color}18)`
            : hovered
              ? 'linear-gradient(rgba(255,255,255,0.13), rgba(255,255,255,0.13))'
              : 'linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08))'
        }, ${SCRIM}`,
        border: selected
          ? `1px solid ${color}55`
          : hovered ? '1px solid rgba(255,255,255,0.24)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow: selected
          ? `0 4px 24px ${color}30, inset 0 1px 0 rgba(255,255,255,0.12)`
          : hovered
            ? '0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18)'
            : '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] rounded-full"
        style={{ backdropFilter: GLASS_FILTER, WebkitBackdropFilter: GLASS_FILTER }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: selected ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
      />

      <div className="relative z-10 flex items-center gap-2">
        <div aria-hidden className="relative h-3.5 w-3.5 shrink-0">
          <motion.div
            animate={{ scale: selected ? 0 : 1, opacity: selected ? 0 : hovered ? 0.8 : 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute inset-0 m-auto h-2 w-2 rounded-full"
            style={{ background: color }}
          />
          {selected && (
            <motion.svg
              width="14" height="14" viewBox="0 0 14 14"
              className="absolute inset-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <motion.path
                d="M3 7.5L5.5 10L11 4"
                fill="none" stroke={color} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              />
            </motion.svg>
          )}
        </div>

        <span
          className="text-xs font-semibold sm:text-sm"
          style={{
            fontFamily: FONT_STACK,
            color: selected ? 'rgba(255,255,255,0.95)' : hovered ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.5)',
            transition: 'color 0.2s ease',
          }}
        >
          {label}
        </span>
      </div>
    </motion.button>
  )
}

export default function GlassTags() {
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
      <div
        className="relative flex w-full max-w-sm flex-wrap justify-center gap-2 px-4 sm:max-w-md sm:gap-3 sm:px-6"
      >
        {TAGS.map((tag, i) => (
          <GlassTag key={tag.label} label={tag.label} color={tag.color} index={i} />
        ))}
      </div>
    </div>
  )
}
