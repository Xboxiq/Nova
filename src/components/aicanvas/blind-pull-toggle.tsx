'use client'

/* Twenty-first upload of this batch.

   DIVERGENCE 1. The button had no name, and it contained six things that also
   had no name. Measured on the pristine upload, the accessibility tree read
   `button ""` holding six `image ""` nodes — the icon is redrawn once per slat,
   which is how the blind works, so a screen reader met a nameless control full of
   nameless pictures. The whole slat stack is now `aria-hidden` (one attribute,
   all six) and the button carries `aria-label` plus `aria-pressed`, which is the
   honest shape for a control that has a state of its own.

   DIVERGENCE 2. The cord was a second control only a mouse could use. It is a
   `<div>` with an `onClick`: measured `tabIndex` -1, no role, no name,
   `cursor: pointer`, and Tab past the button lands somewhere else entirely. It
   does exactly what the button does, so it does not need to become a second
   control — it needs to stop pretending to be one. `aria-hidden`, and the pointer
   shortcut stays for the mouse.

   DIVERGENCE 3. `type="button"`, absent. Measured `null`, so inside a form this
   toggle submits it.

   DIVERGENCE 4. The dark test is `classList.contains('dark')` and this project
   switches on `data-theme`. Measured with a wait after the attribute write —
   reading in the same tick reads the old style, which cost me a false negative on
   the previous upload — `data-theme="night"` still gave the light ground
   `rgb(237,234,229)`. `data-theme` added to the test and the observer.

   DIVERGENCE 5. Reduced motion, and this one behaves unlike every other
   `animate()` in this batch. `useAnimate`'s animate is scoped to the component,
   so it DOES see `MotionConfig` — measured 14 of 20 sampled frames mid-squash
   without the preference against 0 with it, once the guard below is in. But the
   pristine upload under the preference does not skip the step, it JUMPS to the
   end value: `scaleY` still reaches 0. So every slat flicks to nothing and back
   inside one frame — measured 35ms and 36ms from click to icon change, against
   441ms and 436ms without the preference — and the cord snaps 14px to 31px in the
   same instant. That is a flash, which is the one thing the preference exists to
   prevent, so the choreography is skipped outright: 1.6ms and 2ms, `scaleY` never
   leaves 1, the cord never leaves 14px. The mode still changes, because that is
   what the control is for.

   (I first wrote that the preference cost the toggle 630ms. It does not. That
   number was the floor of my own probe, which sampled twenty frames before it
   began looking for the icon to change; the component was never slow. Measuring
   the latency on its own — timed inside the page by a MutationObserver, with no
   sampling loop and no round trip in front of it — gives the 35ms above. The
   defect is a flicker, not a wait.)

   REPORTED, NOT FIXED — the toggle toggles nothing. It is presented as a
   dark/light mode control, and clicking it changes its own icon and nothing else:
   measured before and after a click, `document.documentElement.dataset.theme`
   stayed `light`, the class list stayed empty, and the component's own ground
   stayed `rgb(237,234,229)`. That is what the specification asks for — step 4 is
   "flip toggleDark" and nothing more — and wiring a specimen to the page's theme
   would let one exhibit repaint the whole showcase. `aria-pressed` reports the
   control's own state, which is true; that the state drives nothing is the
   owner's call.

   REPORTED, NOT FIXED — the responsive size can only ever land on a clamp bound.
   `size = clamp(48, min(w, h) * 0.2, 80)` measures the ROOT, whose height is the
   content's height once the root is not `min-h-screen`. Measured in this
   showcase: root 634x70, `min(w,h) * 0.2` = 14, clamped up to 48. Standalone with
   `min-h-screen` it is `min(w, viewport) * 0.2`, which clamps down to 80. So the
   formula is a switch between 48 and 80, never a ramp. Left as specified.

   Nothing was found for the `{}` residue this time, and no mount jump either: I
   expected the button to paint at `MAX_SIZE` 80 before the ResizeObserver
   corrected it to 48, and sampled every animation frame from before the section
   mounted to catch it. Every frame read 48. The suspicion is withdrawn and
   `useEffect` left alone. */
import { useState, useCallback, useLayoutEffect, useEffect, useRef } from 'react'
import { motion, useAnimate, stagger } from 'framer-motion'
import { Moon, Sun } from '@phosphor-icons/react'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const SLATS      = 6
const MAX_SIZE   = 80  // tune: raise to increase the maximum control size
const MIN_SIZE   = 48  // tune: raise to increase the minimum control size

export default function BlindPullToggle() {
  const [toggleDark, setToggleDark] = useState(true)
  const [pageIsDark, setPageIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })
  const [animating, setAnimating]   = useState(false)
  const [size, setSize]             = useState(MAX_SIZE) 
  const sizeRef                     = useRef(MAX_SIZE)   
  const [scope, animate]            = useAnimate()

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
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
    return () => mo.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      const s = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.round(Math.min(w, h) * 0.2)))
      sizeRef.current = s
      setSize(s)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const iconSize   = Math.round(size * 0.45)               // tune: raise the multiplier to enlarge the icon
  const radius     = Math.round(size * 0.275)              // tune: raise the multiplier to round the corners further
  const cordRestH  = Math.round(size * 0.30)               // tune: raise the multiplier to lengthen the resting cord
  const dotSize    = Math.max(8, Math.round(size * 0.138)) // tune: raise the multiplier to enlarge the pull dot

  const previewBg    = pageIsDark ? '#110F0C' : '#EDEAE5'
  const buttonBg     = pageIsDark
    ? 'linear-gradient(145deg, #3a3530, #252019)'
    : 'linear-gradient(145deg, #E8E4DC, #DFDBD4)'
  const buttonBorder = pageIsDark
    ? '1.5px solid rgba(255,255,255,0.10)'
    : '1.5px solid rgba(0,0,0,0.12)'
  const buttonShadow = pageIsDark
    ? '0 6px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)'
    : '0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)'
  const iconColor    = pageIsDark ? 'white' : '#2E2A24'
  const cordTop      = pageIsDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.22)'
  const cordBottom   = pageIsDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'
  const dotBg        = pageIsDark ? 'rgba(255,255,255,0.62)' : 'rgba(0,0,0,0.32)'
  const dotShadow    = pageIsDark ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.12)'

  const handleToggle = useCallback(async () => {
    if (animating) return
    // The mode is what this control is for, so it still changes. What the
    // preference removes is the blind: `useAnimate`'s animate obeys MotionConfig
    // by jumping to the end value, which flicks every slat to nothing and still
    // costs the awaits their time. Skipping the choreography outright is the
    // only reading of the preference that leaves the control usable.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setToggleDark((d) => !d)
      return
    }
    setAnimating(true)

    const pullH = Math.round(sizeRef.current * 0.65)
    const restH = Math.round(sizeRef.current * 0.30)

    await animate('.cord-line', { height: pullH }, { duration: 0.1, ease: [0.4, 0, 1, 1] })
    animate('.cord-line', { height: restH }, { type: 'spring', stiffness: 300, damping: 18 })
    await animate('.slat', { scaleY: 0 }, { delay: stagger(0.04), duration: 0.1, ease: 'easeIn' })
    setToggleDark((d) => !d)
    await animate('.slat', { scaleY: 1 }, { delay: stagger(0.04), duration: 0.13, ease: 'easeOut' })

    setAnimating(false)
  }, [animating, animate])

  return (
    <div
      ref={scope}
      className="flex min-h-screen w-full items-center justify-center"
      style={{ background: previewBg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex select-none flex-col items-center"
      >
        <motion.button
          type="button"
          aria-label="Night mode"
          aria-pressed={toggleDark}
          onClick={handleToggle}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            border: buttonBorder,
            boxShadow: buttonShadow,
            cursor: 'pointer',
            position: 'relative',
            background: 'transparent',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: radius - 1,
              overflow: 'hidden',
            }}
          >
            {Array.from({ length: SLATS }).map((_, i) => {
              const topPx     = Math.round((i / SLATS) * size)
              const nextTopPx = i === SLATS - 1
                ? size
                : Math.round(((i + 1) / SLATS) * size)
              const heightPx  = nextTopPx - topPx

              return (
                <div
                  key={i}
                  className="slat"
                  style={{
                    position: 'absolute',
                    top: topPx,
                    left: 0,
                    width: '100%',
                    height: heightPx,
                    overflow: 'hidden',
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -topPx,
                      left: 0,
                      width: size,
                      height: size,
                      background: buttonBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: iconColor,
                    }}
                  >
                    {toggleDark ? (
                      <Moon size={iconSize} weight="regular" />
                    ) : (
                      <Sun size={iconSize} weight="regular" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.button>

        {/* the same action as the button, for a mouse. Hidden from the
            accessibility tree rather than made into a second control. */}
        <div
          aria-hidden
          className="flex cursor-pointer flex-col items-center"
          onClick={handleToggle}
        >
          <div
            className="cord-line"
            style={{
              width: 2,
              height: cordRestH,
              background: `linear-gradient(to bottom, ${cordTop}, ${cordBottom})`,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: dotBg,
              boxShadow: dotShadow,
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
