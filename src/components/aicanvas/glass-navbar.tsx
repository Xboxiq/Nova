'use client'

/* Sixteenth upload of this batch.

   DIVERGENCE 1. Every button here paints the user agent's ButtonFace unless told
   otherwise — the third component in a row to need it, and this project's own reset
   covers colour, cursor and font but never background. Measured: the nav items
   compute `rgb(239,239,239)`.

   Both of my first measurements missed it, which is the part worth writing down.
   The computed-style dump was long enough that the nav items scrolled out of what
   I actually read, so I drew a conclusion from the three entries I could see. And
   the pixel probe sampled 3px in from the button's top-left corner — but the pill
   is `rounded-full`, so that point lies OUTSIDE the painted shape and returned the
   nav behind it, a comfortable dark. Two independent mistakes agreeing on a wrong
   answer is exactly how a wrong answer survives.

   DIVERGENCE 2. Text colour and font on a button cannot be set by a Tailwind
   utility in this project: `button { color: inherit }` and `font: inherit` are
   unlayered and outrank `@layer utilities`. Measured on both CTAs and the
   hamburger: `rgb(16,36,46)` at 16px weight 400 instead of white at 14px weight
   600 — and the hamburger's icon, drawn in `currentColor`, inherited that same
   dark ink onto a translucent white pill. Set inline.

   DIVERGENCE 3. The CTA gradient is the same one the modal upload carried, with
   the same trap: white clears the red end and misses the amber. I reused the 0.56
   proven there and it was not enough — measured 4.49, a hundredth short — because
   the ground here is brighter than the modal's card interior, and the alpha that
   works is a property of the PAIR rather than of the colour. Deepening the nav's
   own scrim from 0.66 to 0.80 barely moved the button, since a 56% film only lets
   44% of the ground through, so the amber stops went to 0.50 as well. Hues,
   direction and red stops untouched.

   The scrim change was needed anyway: at 0.66 the idle nav label measured 3.36,
   a failure my vivid ground caused rather than the upload, so the ground gave way
   rather than the author's `rgba(255,255,255,0.5)`.

   DIVERGENCE 4. The hamburger had no name, so it announced nothing, and no
   `aria-expanded`, so its state was invisible. Both added, plus `aria-controls`
   pointing at the panel it opens.

   DIVERGENCE 5. Nav items carry `aria-current="page"` when chosen. Not
   `aria-pressed`: this is a `<nav>`, and what the highlight means is "you are
   here", which is the attribute for it.

   DIVERGENCE 6. The named photograph is carried and does not arrive here, so a
   local ground is drawn underneath; the scrim goes into `glassStyle`, which sits on
   the `<nav>` itself — an ancestor of the labels, where `axe` can resolve it.

   DIVERGENCE 7. Eleven `{}` left where the registry stripped comment text out.

   Measured and NOT changed: the logo spins on `repeat: Infinity`, and the
   preference stops it — 44, 50, 56, 63 degrees without it, 0 in every sample with
   `reduce`. */
import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const NAV_ITEMS = ['Products', 'About', 'Blog']

export default function GlassNavbar() {
  const [active, setActive]     = useState<number | null>(null)
  const [hovered, setHovered]   = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  /* Utilities load without Preflight, and the project's button reset does not touch
     background or appearance, so a button with no background of its own paints
     ButtonFace. */
  const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent p-0'
  /* Colour and font must be inline on a button here: `button { color: inherit }`
     and `font: inherit` are unlayered and beat every utility. */
  const CTA_TEXT = { color: '#ffffff', fontSize: 14, fontWeight: 600 } as const
  const NAV_TEXT = { fontSize: 14, fontWeight: 500 } as const

  const glassStyle = {
    /* The specified film is kept and a dark scrim goes under it, on the element the
       labels descend from, so the contrast gate can resolve the ground. */
    background:
      'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), rgba(14,12,16,0.80)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  }

  const glassBlur = {
    backdropFilter: 'blur(24px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
  }

  const ctaStyle = {
    background: 'linear-gradient(135deg, rgba(255, 160, 50, 0.50), rgba(220, 60, 40, 0.6))',
    border: '1px solid rgba(255, 180, 80, 0.25)',
    boxShadow: '0 2px 16px rgba(220, 80, 30, 0.4)',
  }

  const ctaHoverStyle = {
    background: 'linear-gradient(135deg, rgba(255, 180, 80, 0.50), rgba(235, 75, 45, 0.8))',
    boxShadow: '0 4px 24px rgba(220, 80, 30, 0.6)',
  }

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
      <div className="relative flex w-[calc(100%-2rem)] max-w-[720px] flex-col">
        <motion.nav
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="relative isolate flex w-full items-center gap-1 rounded-full px-2 py-2"
          style={glassStyle}
        >
          <div className="pointer-events-none absolute inset-0 z-[-1] rounded-full" style={glassBlur} />
          <div className="flex cursor-pointer items-center gap-2 px-3" onClick={() => setActive(null)}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="h-6 w-6 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #FF6BF5, #FFBE0B)' }}
            />
            <span className="text-sm font-semibold text-white/90">Studio</span>
          </div>
          <div className="flex-1" />
          <div className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                type="button"
                aria-current={active === i ? 'page' : undefined}
                onClick={() => setActive(i)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className={`${PREFLIGHT_BUTTON} relative cursor-pointer rounded-full px-5 py-2`}
                style={{
                  ...NAV_TEXT,
                  color: active === i || hovered === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                {active === i && (
                  <motion.div
                    layoutId="glass-nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.1)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </motion.button>
            ))}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, ...ctaHoverStyle }}
              whileTap={{ scale: 0.96 }}
              className={`${PREFLIGHT_BUTTON} ml-2 cursor-pointer rounded-full px-5 py-2`}
              style={{ ...ctaStyle, ...CTA_TEXT }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Get Started
            </motion.button>
          </div>
          <motion.button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className={`${PREFLIGHT_BUTTON} mr-2 flex cursor-pointer items-center justify-center rounded-full p-2 sm:hidden`}
            onClick={() => setMenuOpen(v => !v)}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} weight="bold" /></motion.span>
                : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><List size={18} weight="bold" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </motion.nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              id={menuId}
              className="relative isolate mt-2 flex flex-col gap-1 rounded-2xl p-2 sm:hidden"
              style={glassStyle}
            >
              <div className="pointer-events-none absolute inset-0 z-[-1] rounded-2xl" style={glassBlur} />
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  aria-current={active === i ? 'page' : undefined}
                  onClick={() => { setActive(i); setMenuOpen(false) }}
                  className={`${PREFLIGHT_BUTTON} cursor-pointer rounded-full px-5 py-2.5 text-left transition-colors`}
                  style={{
                    ...NAV_TEXT,
                    color: active === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                    background: active === i ? 'rgba(255,255,255,0.1)' : 'transparent',
                  }}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className={`${PREFLIGHT_BUTTON} mt-1 cursor-pointer rounded-full px-5 py-2.5`}
                style={{ ...ctaStyle, ...CTA_TEXT }}
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
