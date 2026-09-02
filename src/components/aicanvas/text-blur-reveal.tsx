'use client'

/* Twelfth upload of this batch, implemented per its own requirements.

   DIVERGENCE 1, and it confirms a finding from the upload before this one rather
   than discovering a new one. The CTA's `text-white text-sm font-semibold` all
   lost again: measured `rgb(16,36,46)` at 16px and weight 400. The cause is this
   project's own unlayered reset — `button { color: inherit }` and
   `button, input, textarea, select { font: inherit }` in `src/styles.css` — which
   outranks every Tailwind utility because utilities live in `@layer utilities`.
   Two components in a row, same cause, so it is a property of this repository and
   not a coincidence: on a `<button>` here, text colour and font must be set inline
   or they do not apply. Set inline, to the values the brief names.

   DIVERGENCE 2. Fixing the ink was not enough, because the pill is too light for
   white. Measured at both ends of the gradient, with the dark ink it shipped and
   with the white it asked for:

     violet end  fill rgb(140, 82,255)   dark 3.63   white 4.41
     indigo end  fill rgb(100, 94,255)   dark 3.49   white 4.58

   So white clears the bar on the indigo half and misses it on the violet half at
   14px. The hues and the direction are kept and each stop steps down one place on
   its own ramp — violet-500 to violet-600, indigo-500 to indigo-600 — which is the
   smallest change that carries white across the whole pill.

   DIVERGENCE 3. The button had no `type`, so it defaulted to `submit`. Harmless
   here, and a live bug the first time someone drops it inside a form.

   DIVERGENCE 4. Five `{}` left where the registry stripped comment text out.

   The headline font is NOT installed. The brief asks for Geist Pixel Circle from
   the `geist` package through `--font-geist-pixel-circle`; that variable is
   undefined here (measured empty), so the declaration is invalid and the words
   inherit. Installing a package is a dependency decision and the owner's, exactly
   as Oswald was in an earlier upload, so the variable is left exactly as written
   and the fallback renders — which is the "project default sans-serif" the brief's
   own typography section asks for. Fifth face named by an upload and not carried.

   Reported and not touched: the CTA has no handler, so it is a named button that
   does nothing; and the root ships no ground of its own, because the original
   preview frame supplies one — the showcase supplies it on the wrapper rather than
   editing the upload, and without it white words would land on a light page. */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// customize: replace the sentence and accented word indexes below
const WORDS = ['Craft', 'interfaces', 'that', 'feel', 'like', 'magic.']
const ACCENTED = new Set([1, 5]) 


// tune: raise to increase the delay between words
const STAGGER = 100
// tune: raise to slow each word reveal
const DURATION = 650
const LAST_WORD_END = (WORDS.length - 1) * STAGGER + DURATION 
const SHOW_BUTTON_AT = LAST_WORD_END + 150                     

export default function TextBlurReveal() {
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowCTA(true), SHOW_BUTTON_AT)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>
      <div className="relative flex flex-wrap justify-center gap-x-[0.4em] gap-y-1">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 22, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: DURATION / 1000,
              delay: (i * STAGGER) / 1000,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={
              ACCENTED.has(i)
                ? 'bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-4xl tracking-tight text-transparent'
                : 'text-4xl tracking-tight text-white'
            }
            style={{ fontFamily: 'var(--font-geist-pixel-circle)' }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      <motion.p
        key="sub"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: ((WORDS.length - 1) * STAGGER + 200) / 1000,
          ease: 'easeOut',
        }}
        className="relative text-base text-zinc-400"
      >
        Drop any phrase. Works with any text.
      </motion.p>
      <div className="flex h-10 items-center justify-center">
      <AnimatePresence>
        {showCTA && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 shadow-lg shadow-indigo-500/30 transition-opacity hover:opacity-90"
            style={{ color: '#ffffff', fontSize: 14, fontWeight: 600 }}
          >
            Start building
          </motion.button>
        )}
      </AnimatePresence>
      </div>

    </div>
  )
}
