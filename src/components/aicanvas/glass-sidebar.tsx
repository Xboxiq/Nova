'use client'

/* Twenty-fifth upload of this batch, first of two arriving together. Its names
   are already right — every nav button carries `aria-label={item.label}` and the
   toggle's label changes with its state — so what follows is everything else.

   DIVERGENCE 1. `outline: 'none'` is inline on both buttons, which silences the
   focus ring on all EIGHT controls. Measured with focus genuinely on the first
   nav item: computed outline `0px` / `none`. The project rings focus from
   `src/styles.css:87`, unlayered author CSS that an inline style outranks — the
   second upload in a row to reach through the cascade and switch the system off.
   Deleted from both.

   DIVERGENCE 2. The glass carried nothing, same as the upload before it. The
   panel's fill is `rgba(255,255,255,0.06)` over a pink flower. Forcing the root
   to that flower's brightest patch, the ground becomes `[241,184,203]`, on which
   the idle nav labels at `rgba(255,255,255,0.75)` measure **1.48** and the
   tooltip at 0.90 measures little better. A dark scrim under the author's film
   takes the same labels to **6.88** and the tooltip to **9.14**, and the ground
   stays vivid. Both the panel and the tooltip use `GLASS_STYLE`, so one change
   covers both.

   DIVERGENCE 3. The active label was drawn in the item's own accent, and four of
   the seven accents cannot be read. Solved over the scrimmed panel at the
   flower's brightest: `#3A86FF` reaches only 3.10 at full opacity, `#FF5C8A`
   3.68, `#B388FF` 4.05, `#FF7B54` 4.22 — none of them can reach 4.5:1 at ANY
   alpha, and `#3A86FF` measured 2.07 as shipped. The other three can
   (`#06D6A0` at 0.85, `#FFBE0B` at 0.76, `#C9A96E` at 0.95). Rather than four
   unreadable labels or a per-item inconsistency, the active label goes to
   `rgba(255,255,255,0.95)` and the accent keeps doing what it already does
   better — tinting the icon tile, which is non-text and only owes 3:1. So the
   accents stay on tiles and fills and off glyphs, which is the whole finding.

   DIVERGENCE 4. Which item is active was visible and unsaid. `aria-current` on
   the active row; the toggle gets `aria-expanded` as well, since a label that
   changes text is not the same as a state a screen reader can query.

   DIVERGENCE 5. The collapsed rail's tooltip is the only place a sighted person
   can read what an icon means, and it appeared on hover alone. Measured: with
   focus on the first nav item and the rail collapsed, no tooltip in the DOM. It
   now appears on focus too. (A screen reader was never stuck here — the
   `aria-label` was always right. This is for the person who can see the screen
   and is not using a mouse.)

   DIVERGENCE 6. The width is a `useSpring`, which `MotionConfig` cannot reach —
   measured 14 distinct widths under `reduce` against 11 without, the same
   animation. Under the preference it jumps.

   DIVERGENCE 7. Twelve `{}` left where the registry stripped comment text out.

   DIVERGENCE 8. `type="button"` absent on both. */
import { useState, useEffect } from 'react'
import { motion, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  House,
  MagnifyingGlass,
  Folders,
  Bell,
  ChartLine,
  Gear,
  User,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react'


const COLLAPSED_WIDTH = 64
const EXPANDED_WIDTH = 220

// tune: change to resize the icon tiles
const ICON_TILE_SIZE = 44
const TOGGLE_BUTTON_HEIGHT = 36

const NAV_ITEMS = [
  { icon: House,           label: 'Home',          color: '#3A86FF' },
  { icon: MagnifyingGlass, label: 'Search',        color: '#B388FF' },
  { icon: Folders,         label: 'Projects',      color: '#FFBE0B' },
  { icon: Bell,            label: 'Notifications', color: '#FF5C8A' },
  { icon: ChartLine,       label: 'Analytics',     color: '#06D6A0' },
  { icon: Gear,            label: 'Settings',      color: '#C9A96E' },
  { icon: User,            label: 'Profile',       color: '#FF7B54' },
] as const

type NavItem = (typeof NAV_ITEMS)[number]

const GLASS_BLUR_STYLE = {
  backdropFilter: 'blur(24px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
} as const

const GLASS_STYLE = {
  /* The author's white film is kept exactly and a dark scrim goes under it, on
     the element the labels descend from. Over the flower's brightest patch the
     film alone left the idle labels at 1.48; this holds them at 6.88. */
  background:
    'linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)), rgba(14,12,16,0.80)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
} as const


function NavItemRow({
  item,
  index,
  isActive,
  isOpen,
  onActivate,
}: {
  item: NavItem
  index: number
  isActive: boolean
  isOpen: boolean
  onActivate: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  useEffect(() => { setHovered(false) }, [isOpen])

  return (
    <div className="relative flex w-full items-center">
      <AnimatePresence>
        {!isOpen && hovered && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute left-[calc(100%+10px)] z-50 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/90 font-sans"
            style={{ ...GLASS_STYLE, ...GLASS_BLUR_STYLE }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-current={isActive ? 'page' : undefined}
        onClick={onActivate}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        /* the tooltip is the only readable name on a collapsed rail, so it has
           to answer the keyboard as well as the pointer */
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        animate={{
          scale: hovered ? (isOpen ? 1.08 : 1.15) : 1,
          x: hovered ? (isOpen ? 0 : 3) : 0,
        }}
        whileTap={{ scale: 0.90 }}
        // tune: raise stiffness to sharpen item motion
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        className="flex w-full items-center gap-3 rounded-xl cursor-pointer justify-start"
        style={{ background: 'transparent', border: 'none' }}
        aria-label={item.label}
      >
        <motion.div
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: ICON_TILE_SIZE,
            height: ICON_TILE_SIZE,
            background: isActive ? `${item.color}28` : `${item.color}18`,
            border: `1px solid ${isActive ? `${item.color}44` : `${item.color}22`}`,
            transition: 'background 0.2s, border-color 0.2s',
          }}
        >
          <Icon size={20} weight="regular" style={{ color: item.color }} />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut', delay: 0.18 + index * 0.03 } }}
              exit={{ opacity: 0, x: -6, transition: { duration: 0.08, ease: 'easeIn', delay: 0 } }}
              className="whitespace-nowrap text-sm font-semibold font-sans"
              style={{
                /* four of the seven accents cannot reach 4.5:1 as text over
                   this material at any alpha, so the accent stays on the tile */
                color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
              }}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}


export default function GlassSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [toggleHovered, setToggleHovered] = useState(false)

  const widthSpring = useSpring(COLLAPSED_WIDTH, { stiffness: 280, damping: 26 })
  const reduce = useReducedMotion()

  function toggle() {
    const next = !isOpen
    setIsOpen(next)
    const width = next ? EXPANDED_WIDTH : COLLAPSED_WIDTH
    // MotionConfig governs a motion element's own props; a useSpring is neither,
    // so the preference has to be honoured here by hand.
    if (reduce) widthSpring.jump(width)
    else widthSpring.set(width)
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
      <img
        src="https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20pink%20Flower%20%20(1).png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div style={{ width: EXPANDED_WIDTH }} className="flex items-center justify-start">
        <motion.div
          style={{
            width: widthSpring,
            ...GLASS_STYLE,
          }}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          // tune: raise the delay to postpone the sidebar entrance
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
          className="relative isolate flex h-auto flex-col items-center gap-2 overflow-visible rounded-3xl px-2.5 py-3"
        >
          <div
            className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
            style={GLASS_BLUR_STYLE}
          />

          <div className="flex w-full flex-col gap-1.5">
            {NAV_ITEMS.map((item, i) => (
              <NavItemRow
                key={item.label}
                item={item}
                index={i}
                isActive={activeIndex === i}
                isOpen={isOpen}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </div>

          <div
            className="my-1 w-full"
            style={{ height: 1, background: 'rgba(255,255,255,0.1)' }}
          />

          <div className={`flex w-full items-center ${isOpen ? 'justify-start px-1' : 'justify-center'}`}>
            <motion.button
              type="button"
              aria-expanded={isOpen}
              onClick={toggle}
              onMouseEnter={() => setToggleHovered(true)}
              onMouseLeave={() => setToggleHovered(false)}
              animate={{ scale: toggleHovered ? 1.08 : 1 }}
              whileTap={{ scale: 0.90 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center justify-center rounded-2xl cursor-pointer"
              style={{
                width: ICON_TILE_SIZE,
                height: TOGGLE_BUTTON_HEIGHT,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="left"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowLeft size={18} weight="regular" className="text-white/70" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="right"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowRight size={18} weight="regular" className="text-white/70" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
