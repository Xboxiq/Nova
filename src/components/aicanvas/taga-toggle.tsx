'use client'

/* Twenty-second upload of this batch, and the best-formed one yet: it arrives
   with `type="button"`, `role="switch"` and `aria-checked` already in place, and
   Space and Enter both work — measured, `aria-checked` false to true with the
   thumb at x=3 then x=21, and back.

   DIVERGENCE 1. `outline: 'none'` is inline on the track, so the switch is
   keyboard-reachable and shows nothing when it is reached. Measured: Tab lands on
   it, and the computed outline is `0px` / `none`. This project rings focus from
   `src/styles.css:87`, but that rule is unlayered author CSS and an inline style
   outranks it — the one place in this repo's cascade where a component can still
   silence the system. Deleted, and the ring comes back.

   DIVERGENCE 2. `aria-label="Toggle"` names the widget type, not the control.
   With `role="switch"` it announced "Toggle, switch, off", which tells a listener
   nothing they did not already know. The face is the whole subject of this
   control, so it is now labelled for that. The face SVG was also a nameless
   `image` node in the tree; `aria-hidden`, since `aria-checked` already carries
   the state it draws.

   DIVERGENCE 3. The dark test is `classList.contains('dark')` and this project
   switches on `data-theme`. Measured with a wait after the write: `light`, `dark`
   and `night` all gave the same light ground `rgb(237,234,229)` and the same grey
   track. Adding the `dark` CLASS did change both, which is how the upload is
   meant to work elsewhere, so the original test stays alongside.

   DIVERGENCE 4. The thumb spring ignores `prefers-reduced-motion`: this is the
   free `animate()` import, not `useAnimate`'s scoped one, so `MotionConfig`
   cannot see it — measured nine distinct thumb positions sweeping 3 to 21 under
   the preference. It now snaps. The eyes' crossfade is left alone: their `scale`
   is a transform and `MotionConfig` already drops it, and what remains is a
   160ms opacity swap that IS the state change becoming visible.

   DIVERGENCE 5. The mouth does not interpolate, and the specification's own note
   says it should. "Because both share the same M+Q structure, Framer Motion
   interpolates between them smoothly" is not true: framer animates `pathLength`,
   `pathOffset` and `pathSpacing`, never the `d` attribute, so the
   `transition={{ duration: 0.28 }}` on that path governs nothing. Measured by
   sampling `d` every animation frame from inside the page, with the start value
   recorded before the click and the click fired on the third frame: **two**
   distinct values in seventy frames — flat at frame 0, smile at frame 4 — while
   the thumb's `x`, on the same page over the same seventy frames, took **eleven**.
   The sampler was not the problem. Since the two paths really do share their
   command structure, one motion value can lerp the three numbers that differ, and
   `thumbX` is already sweeping exactly the right range — so the smile now grows
   as the thumb slides, which is what the specification was describing.

   DIVERGENCE 6. Six `{}` left where the registry stripped comment text out.

   REPORTED, NOT FIXED — the control's own boundaries are faint, and the palette
   is the author's. Measured track against ground and thumb against track, in both
   states and both packs: light off 2.38 and 2.86, light on **1.36** and **1.63**,
   dark off 2.02 and 9.47, dark on 7.44 and 2.57. Five of those eight are under
   the 3:1 that WCAG 1.4.11 asks of a user-interface component's boundary, and the
   white thumb on the yellow track at 1.63 is the faintest. No gate in this repo
   measures non-text pairs — axe returns clean and `REFERENCE_GREY_CONTRAST`
   counts text — so this ships unmeasured by anything but this note. The state
   itself is never in doubt: the thumb moves, and the face changes from x-x eyes
   to a smile at 10.23 against its own ground. It is the edges that are soft.

   One suspicion checked and dropped: I expected `useTransform(thumbX, [offX,
   onX], [offTrack, onTrack])` to have frozen the light colours at first render,
   since `pageIsDark` starts false and the effect corrects it afterwards. Adding
   the `dark` class moved the track from `rgb(158,152,144)` to `rgb(74,69,64)`, so
   it re-derives. Nothing to fix. */
import { useState, useCallback, useLayoutEffect, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect






// tune: change these bounds to resize the responsive track
const MAX_TRACK_W = 80
const MIN_TRACK_W = 48
const FACE_COLOR  = '#4A3F35'  

export default function TagaToggle() {
  const [isOn, setIsOn]             = useState(false)
  const [animating, setAnimating]   = useState(false)
  const [pageIsDark, setPageIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })
  const [trackW, setTrackW]         = useState(MAX_TRACK_W)
  const containerRef                = useRef<HTMLDivElement>(null)
  const isOnRef                     = useRef(false)

  
  const trackH = Math.round(trackW * 0.58)
  const thumb  = Math.round(trackW * 0.50)
  const pad    = Math.max(3, Math.round(trackW * 0.04))
  const offX   = pad
  const onX    = trackW - thumb - pad

  const thumbX = useMotionValue(offX)

  
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const check = () => {
      const card = el.closest('[data-card-theme]')
      const pack = document.documentElement.dataset.theme
      setPageIsDark(
        card
          ? card.classList.contains('dark')
          : pack === 'dark' || pack === 'night' ||
            document.documentElement.classList.contains('dark'),
      )
    }
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    const cardWrapper = el.closest('[data-card-theme]')
    if (cardWrapper) mo.observe(cardWrapper, { attributes: true, attributeFilter: ['class'] })
    const update = () => {
      const s = Math.max(
        MIN_TRACK_W,
        Math.min(MAX_TRACK_W, Math.round(Math.min(el.offsetWidth, el.offsetHeight) * 0.18)),
      )
      setTrackW(s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => { mo.disconnect(); ro.disconnect() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  
  useEffect(() => {
    thumbX.set(isOnRef.current ? onX : offX)
  }, [trackW]) // eslint-disable-line react-hooks/exhaustive-deps

  
  const offTrack   = pageIsDark ? '#4A4540' : '#9E9890'
  const onTrack    = pageIsDark ? '#D4960A' : '#F5C518'
  const trackColor = useTransform(thumbX, [offX, onX], [offTrack, onTrack])

  
  const handleToggle = useCallback(async () => {
    if (animating) return
    setAnimating(true)
    const target = isOn ? offX : onX
    isOnRef.current = !isOn
    setIsOn((v) => !v)
    // The free `animate()` has no component context, so MotionConfig cannot
    // reach this spring the way it reaches a motion element's own props.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      thumbX.set(target)
    } else {
      await animate(thumbX, target, { type: 'spring', stiffness: 500, damping: 36 })
    }
    setAnimating(false)
  }, [isOn, animating, thumbX, offX, onX])

  
  const previewBg   = pageIsDark ? '#110F0C' : '#EDEAE5'
  const trackInset  = pageIsDark
    ? 'inset 0 1px 4px rgba(0,0,0,0.50)'
    : 'inset 0 1px 3px rgba(0,0,0,0.14)'
  const thumbShadow = pageIsDark
    ? '0 3px 8px rgba(0,0,0,0.50), 0 1px 3px rgba(0,0,0,0.30)'
    : '0 3px 8px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.10)'

  
  // The two paths share their command structure, which is what the specification
  // relied on — but framer never animates `d`, so it has to be lerped by hand.
  // `thumbX` already sweeps the right range, so the smile grows with the slide.
  const mouthPath = useTransform(thumbX, (v) => {
    const p = onX === offX ? 0 : Math.min(1, Math.max(0, (v - offX) / (onX - offX)))
    const end = (0.43 + (0.15 - 0.43) * p).toFixed(4)
    const ctrl = (0.43 + (0.50 - 0.43) * p).toFixed(4)
    return `M -0.40,${end} Q 0,${ctrl} 0.40,${end}`
  })

  const faceSize = thumb * 0.78

  
  const eyeSpring = { duration: 0.16, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen w-full items-center justify-center"
      style={{ background: previewBg }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="select-none"
      >
        <motion.button
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-label="Mood"
          onClick={handleToggle}
          style={{
            width: trackW,
            height: trackH,
            borderRadius: trackH / 2,
            backgroundColor: trackColor,
            boxShadow: trackInset,
            position: 'relative',
            cursor: 'pointer',
            border: 'none',
            display: 'block',
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: pad,
              x: thumbX,
              width: thumb,
              height: thumb,
              borderRadius: '50%',
              background: 'white',
              boxShadow: thumbShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              aria-hidden
              viewBox="-1 -1 2 2"
              width={faceSize}
              height={faceSize}
            >
              <AnimatePresence mode="wait">
                {isOn ? (
                  <motion.path
                    key="le-happy"
                    d="M -0.50,-0.28 Q -0.32,-0.06 -0.14,-0.28"
                    stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" fill="none"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={eyeSpring}
                  />
                ) : (
                  <motion.g
                    key="le-dead"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={eyeSpring}
                  >
                    <line x1="-0.50" y1="-0.33" x2="-0.14" y2="-0.01"
                      stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" />
                    <line x1="-0.14" y1="-0.33" x2="-0.50" y2="-0.01"
                      stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" />
                  </motion.g>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {isOn ? (
                  <motion.path
                    key="re-happy"
                    d="M 0.14,-0.28 Q 0.32,-0.06 0.50,-0.28"
                    stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" fill="none"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={eyeSpring}
                  />
                ) : (
                  <motion.g
                    key="re-dead"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={eyeSpring}
                  >
                    <line x1="0.14" y1="-0.33" x2="0.50" y2="-0.01"
                      stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" />
                    <line x1="0.50" y1="-0.33" x2="0.14" y2="-0.01"
                      stroke={FACE_COLOR} strokeWidth={0.13} strokeLinecap="round" />
                  </motion.g>
                )}
              </AnimatePresence>

              <motion.path
                d={mouthPath}
                stroke={FACE_COLOR}
                strokeWidth={0.13}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  )
}
