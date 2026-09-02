'use client'

/* Eleventh upload of this batch, implemented per its own requirements.

   It arrives better than its own brief in three places, which is worth saying:
   the close button already has `type="button"`, an `aria-label` and a real
   `onClick` that dismisses through `AnimatePresence`, and the width already reads
   `min(340px, calc(100vw - 2rem))` where the brief asked for a flat 340.

   DIVERGENCE 1, and it is a finding about this repository rather than about the
   upload. The two text buttons rendered in the wrong colour, at the wrong size
   and at the wrong weight — `text-white`, `text-sm` and `font-semibold` all
   losing at once. It is not Preflight and it is not the user agent. Measured by
   putting the SAME three classes on a `div` and on a `button` inside this very
   card:

     div     -> rgb(255,255,255)  14px  600      button -> rgb(16,36,46)  16px  400

   and a bare `<button>` reads identically to the classed one. The cause is this
   project's own reset in `src/styles.css`: `button { color: inherit }` and
   `button, input, textarea, select { font: inherit }`. Those rules are UNLAYERED,
   and unlayered author styles outrank anything inside a cascade layer, so they
   beat every Tailwind utility, which lives in `@layer utilities`. `rgb(16,36,46)`
   is `--nova-ink` arriving through that `inherit`.

   So on a `<button>` in this project, text colour and font CANNOT be set by a
   Tailwind utility at all. They are set inline here, to exactly the values the
   brief names. This is the first upload in the batch with text inside a button,
   which is why four earlier ones never showed it — their buttons hold icons.

   DIVERGENCE 2. The description read 3.58 against 4.5 at `text-white/40`, on the
   flat card before any ground was added, so it fails on the upload's own terms
   and worse once the ground is vivid. It is the sentence explaining what the
   product does, so it is raised rather than reported.

   DIVERGENCE 3. The card is a dialog and said so nowhere. It gets `role="dialog"`
   and is named by its own heading through `aria-labelledby`. It deliberately does
   NOT get `aria-modal`: nothing is trapped here and the page behind stays fully
   interactive, and claiming otherwise would strand a screen-reader user inside one
   specimen on a page that holds thirty. For the same reason no focus trap is
   added — in this showcase that would be a defect, not a feature.

   DIVERGENCE 4. The named photograph is carried and fails here with
   `ERR_CONNECTION_RESET`, so a local ground is drawn underneath it.

   DIVERGENCE 5. The blur layer had no fill of its own; it carries a dark scrim
   now and the ground stays vivid.

   DIVERGENCE 6. Nine `{}` left where the registry stripped comment text out.

   DIVERGENCE 7. The primary label failed on its own button, and the cause is the
   gradient rather than the ink. Measured white against the pill's two ends:
   3.68 on the amber, 6.84 on the red. Computing the whole span over the card
   interior shows the trap:

     base amber  rgb(197,125,44)   white 3.30   dark 5.28
     base red    rgb(142, 44,34)   white 8.29   dark 2.10
     hover amber rgb(232,164,75)   white 2.13   dark 8.17
     hover red   rgb(193, 64,41)   white 5.21   dark 3.34

   NO FLAT INK CROSSES THIS GRADIENT. White fails on both amber ends and a dark
   ink fails on both red ends, because the span runs from luminance 0.10 to 0.27
   and white needs at most 0.183 while near-black needs at least 0.235. Swapping
   the text colour cannot fix it; the span itself has to narrow.

   So the hues, the direction and the red stops are all kept exactly as written,
   and only the amber stops let more of the dark card through — 0.75 and 0.90 both
   become 0.56, the highest alpha at which white still clears 4.5 on the lighter of
   the two. Hover still brightens, because its colour is the lighter one at the
   same alpha.

   Reported and left alone: dismissing the card removes it with no way back inside
   the component, because the brief gives no reopen. Measured, the specimen heals
   itself — cards go 1, then 0 after Close, then 1 again after leaving the section
   and returning, because the panel remounts and `useState(true)` runs again. */

import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, ShieldCheck } from '@phosphor-icons/react'

/* Tailwind's utilities load without Preflight AND lose to the unlayered button
   reset described above, so a `<button>` needs its chrome removed by class and its
   type set inline. */
const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent'

export default function GlassModal() {
  const [open, setOpen] = useState(true)
  const headingId = useId()

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
      <AnimatePresence>
        {open && (
      <motion.div
        initial={{ scale: 0.9, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 16, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        role="dialog"
        aria-labelledby={headingId}
        className="relative isolate w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[-1] rounded-3xl"
          style={{
            backdropFilter: 'blur(40px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
            background: 'rgba(14,12,16,0.72)',
          }}
        />
        <div
          className="absolute left-8 right-8 top-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
        />
        <motion.button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <X size={14} weight="regular" className="text-white/60" />
        </motion.button>
        <div className="flex flex-col items-center px-8 pb-8 pt-10">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl"
            style={{
              background: '#FFA03218',
              border: '1px solid #FFA03222',
            }}
          >
            <ShieldCheck size={28} weight="regular" style={{ color: '#FFA032' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            id={headingId}
            className="mb-2 text-lg font-semibold text-white/90"
          >
            Upgrade to Pro
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6 text-center text-sm leading-relaxed text-white/65"
          >
            Unlock premium components, priority support, and early access to new features.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex w-full flex-col gap-3"
          >
            {['Unlimited components', 'Source code access', 'Priority support'].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: 'rgba(255, 155, 50, 0.18)' }}
                >
                  <Check size={10} weight="regular" style={{ color: 'rgba(255, 155, 50, 1)' }} />
                </div>
                <span className="text-sm text-white/60">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex w-full flex-col gap-2">
            <motion.button
              whileHover={{
                scale: 1.04,
                background: 'linear-gradient(135deg, rgba(255, 180, 80, 0.56), rgba(235, 75, 45, 0.8))',
                boxShadow: '0 4px 24px rgba(220, 80, 30, 0.6)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${PREFLIGHT_BUTTON} w-full cursor-pointer rounded-full py-3`}
              style={{
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(255, 160, 50, 0.56), rgba(220, 60, 40, 0.6))',
                border: '1px solid rgba(255, 180, 80, 0.25)',
                boxShadow: '0 2px 16px rgba(220, 80, 30, 0.4)',
              }}
            >
              Upgrade Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${PREFLIGHT_BUTTON} w-full cursor-pointer rounded-full py-3`}
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 14,
                fontWeight: 500,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              Maybe Later
            </motion.button>
          </div>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
