'use client'

/* Fifteenth upload of this batch, one of three that arrived together, and the one
   with the worst numbers in it.

   DIVERGENCE 1. The idle tabs were `rgba(255,255,255,0.32)` — measured 2.83 over
   the pill's own surface, against 4.5 for a 10px label. Four of five tabs are idle
   at any moment, so that is most of the control most of the time. Raised to 0.55,
   which reads 5.48. The hover value was already fine at 6.95 and is untouched.

   DIVERGENCE 2. One active colour failed and four passed, so only one moved.
   Measured on the pill surface: Explore 5.70, Create 7.72, Messages 4.96, Profile
   5.47 — and Home's #3A86FF at 4.18. The blue is stepped one place lighter to
   #60A5FA, which reads 5.73 and is still recognisably the same blue. Note the
   20px icon in that colour already passed on its own bar of 3; it is the 10px
   label that failed, and both share one colour, so one value fixes both.

   DIVERGENCE 3. Five tabs with an active one, and nothing exposed it. These are
   not tabs over panels — there are no panels — so `role="tablist"` would be a
   claim about structure that is not there, and it would also promise arrow-key
   navigation this component does not implement. `aria-pressed` states what is
   actually true: one of five buttons is currently chosen.

   DIVERGENCE 4. `type="button"`, absent on all five.

   DIVERGENCE 5. The named photograph is carried and does not arrive here, so a
   local ground is drawn underneath and the blur layer carries a dark scrim.

   DIVERGENCE 6. Three `{}` left where the registry stripped comment text out.

   Arrived better than its brief: the pill is already
   `w-[min(380px,calc(100vw-2rem))]` where the brief asked for a flat 380.

   Manrope is named first in the stack as asked, with the project's own family
   behind it; no external font host is loaded here, so the fallback renders. */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { House, Compass, PlusCircle, ChatCircle, User } from '@phosphor-icons/react'

const SCRIM = 'rgba(14,12,16,0.66)'
/* Utilities load without Preflight here, and the project's own button reset does
   not touch background or appearance — so a button with no background of its own
   paints ButtonFace. */
const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent p-0'
const FONT_STACK =
  "'Manrope', var(--nova-font-ui, ui-sans-serif, system-ui, sans-serif)"
/* 0.32 as shipped measured 2.83 over the pill against 4.5; this reads 5.48. */
const IDLE_INK = 'rgba(255,255,255,0.55)'

const TABS = [
  /* #3A86FF measured 4.18 at 10px on the pill; one step lighter reads 5.73. */
  { icon: House,       label: 'Home',     color: '#60A5FA' },
  { icon: Compass,     label: 'Explore',  color: '#FF7B54' },
  { icon: PlusCircle,  label: 'Create',   color: '#06D6A0' },
  { icon: ChatCircle,  label: 'Messages', color: '#FF5C8A' },
  { icon: User,        label: 'Profile',  color: '#B388FF' },
]

export default function GlassTabBar() {
  const [active, setActive]   = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

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
        src="https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%201%20(1).png?updatedAt=1775223702866"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="relative isolate flex w-[min(380px,calc(100vw-2rem))] items-center justify-around rounded-full px-5 py-2.5"
        style={{
          /* The scrim sits on the PILL rather than on the `z-[-1]` blur layer so
             that `axe` can resolve it: axe walks a text node's ANCESTORS, and a
             negative-z sibling is not one. Worth keeping on its own terms — a gate
             that cannot see the ground cannot judge the text on it. */
          background:
            'linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), ' + SCRIM,
          border: '1px solid rgba(255, 255, 255, 0.11)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[-1] rounded-full"
          style={{
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          }}
        />
        {TABS.map((tab, i) => {
          const Icon     = tab.icon
          const isActive = active === i
          const isHover  = hovered === i && !isActive

          return (
            <motion.button
              key={tab.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              /* `bg-transparent` is load-bearing, and axe found this before I did.
                 With no background of its own a `<button>` paints the user agent's
                 ButtonFace, and this project's reset covers colour, cursor and font
                 but not background — so each tab rendered as a light grey rectangle
                 on dark glass. Measured: the pixel inside a tab was rgb(239,239,239)
                 while the pill around it was rgb(86,58,47). I had read axe's
                 "#f8f8f8 on #efefef, 1.08" as the gate being blind to a scrim it
                 could not walk to, and started making the scrim visible to it
                 instead. The scrim move is right for its own reason, but the failure
                 axe reported was real and mine was the blind measurement: I had
                 sampled the pill BETWEEN the tabs, where no button paints. */
              className={`${PREFLIGHT_BUTTON} relative flex cursor-pointer flex-col items-center gap-[3px] px-3 py-1`}
              whileTap={{ scale: 0.85 }}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-glow"
                  className={`absolute -inset-y-1 rounded-full ${
                    i === 0                  ? '-left-5 -right-3'  :
                    i === TABS.length - 1   ? '-left-3 -right-5'  :
                                              '-inset-x-3'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.08)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div
                className="relative z-10 flex flex-col items-center gap-px"
                style={{
                  transform: i === 0 ? 'translateX(-4px)' : i === TABS.length - 1 ? 'translateX(4px)' : undefined,
                }}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon
                    size={20}
                    weight="regular"
                    style={{
                      color: isActive ? tab.color : isHover ? 'rgba(255,255,255,0.7)' : IDLE_INK,
                      transition: 'color 0.2s ease',
                    }}
                  />
                </motion.div>

                <span
                  className="text-[10px] font-medium"
                  style={{
                    fontFamily: FONT_STACK,
                    color: isActive ? tab.color : isHover ? 'rgba(255,255,255,0.7)' : IDLE_INK,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {tab.label}
                </span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
