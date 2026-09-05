'use client'

/* Twentieth upload of this batch.

   DIVERGENCE 1. The card could only be operated by a mouse. It is a control that
   sets a value from 1 to 31 and its only input was `drag="y"`. Measured on the
   pristine upload: `tabIndex` -1, no `role`, no `aria-label`, and after
   ArrowUp / ArrowDown / PageDown / Space the day was still `01`. So it is now a
   `spinbutton` — a role that exists for exactly this, a number with a range —
   with `tabIndex={0}` and the four arrow keys. The drag is untouched. It needs no
   focus ring of its own: `src/styles.css:87` carries an unlayered
   `[tabindex]:focus-visible` rule, so the moment the element takes a tabindex the
   project rings it — measured under a real Tab, `3px solid` at `3px` offset. My
   first attempt added `focus-visible:outline-2 focus-visible:outline-offset-4` and
   an inline `outlineColor`; the utilities lost to that unlayered rule (measured
   3px/3px, not 2px/4px) and the inline colour won only by being inline, which
   meant overriding the system's own `--nova-focus`. All three deleted.

   DIVERGENCE 2. The day was announced twice. Both halves render the number, so
   the accessibility tree carried two `text "01"` nodes with nothing to say which
   was the value — and three during a flip, once the flap mounts its own copy. The
   halves are now `aria-hidden` and the value is carried once, by
   `aria-valuenow` / `aria-valuetext` on the spinbutton.

   DIVERGENCE 3. The hint's two colours are the wrong way round. `#3a3530` is a
   dark grey and was used on the DARK ground; `#C8C2B8` is a light grey and was
   used on the LIGHT one. Measured: `rgb(200,194,184)` on `rgb(245,241,234)` is
   **1.57** — and this is the only text on the screen telling you the card can be
   moved at all. Swapped, the same two values give 10.77 on the light ground and
   10.81 on the dark one.

   DIVERGENCE 4. The flip ran at full speed under `prefers-reduced-motion:
   reduce`. Measured with the preference set: 13 of 16 frames rotating, the scan
   line sweeping 46px to 266px, and the tilt matrix live under the pointer —
   identical to no preference (11 of 16, sampling jitter only). `MotionConfig`
   cannot reach any of it, because `animate(value, to)` is a free function with no
   component context; the config only governs a `motion` element's own props. The
   day still changes under the preference — that is the control's whole purpose —
   it just arrives without the page turn.

   DIVERGENCE 5. Thirteen `{}` left where the registry stripped comment text out.

   REPORTED, NOT FIXED — `perspective: 140` does nothing, and making it work is a
   decision I should not take alone. It sits on the flap itself, and CSS
   `perspective` applies to an element's CHILDREN, not to its own transform; the
   flap's one child has no 3D transform, so the page turn renders as a flat
   vertical squash. Measured across a whole flip: rendered height stayed
   `offsetHeight x |cos theta|` plus a constant 13.3px — constant to within 0.3px
   from cos theta = 1.00 down to 0.06, which is the flat cosine law exactly. (The
   13.3px is the card's own `rotate: 3deg` inflating a child's axis-aligned box:
   260 x sin 3 deg = 13.6. It is not depth; depth would grow with the angle.)
   `transformPerspective` is the property that does apply to the element's own
   transform, and I tried it at the specified 140 — whereupon the leaf balloons to
   187px from 107px, 1.75x, and pushes 20.5px past the card's top edge, where the
   card's `overflow-hidden` shears the top off the digits for several frames. So
   140 was never calibrated, because it never had an effect to calibrate. Trading
   a flat squash for a clipped balloon is not an improvement, and picking a
   different number is the owner's call, not mine. Left exactly as shipped.

   A note on measuring this one. My first no-preference run reported the drag did
   nothing at all — `0 of 14` frames, day still `01` — while the reduce run in the
   same script flipped to `02`. Two contexts, one script, opposite answers, and
   the one that claimed less was mine: the no-preference pass had run three other
   probes first, including a `Space` press that scrolls the page and a `focus()`
   on an element that cannot take focus. Cutting the script down to mount, park
   the pointer, drag, read — and running it three times — gives `01` to `02` every
   time. The first reading is retracted. */
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect


// tune: raise to slow the page flip
const FLIP_MS = 220

const DAY_MIN = 1
const DAY_MAX = 31

function fmt(n: number) { return String(n).padStart(2, '0') }

// Read at event time, not once at mount: the preference can change mid-session.
function prefersReduce() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FlipCalendar() {
  const [topDisplay,    setTopDisplay   ] = useState(DAY_MIN)
  const [bottomDisplay, setBottomDisplay] = useState(DAY_MIN)
  const [flapContent,   setFlapContent  ] = useState(DAY_MIN)
  const [flapVisible,   setFlapVisible  ] = useState(false)
  const [flapping,      setFlapping     ] = useState(false)
  const currentRef = useRef(DAY_MIN)
  const rootRef    = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })

  const rotateX     = useMotionValue(0)
  const scanY       = useMotionValue(18)
  const scanYPct    = useTransform(scanY, (v) => `${v}%`)

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  const aliveRef = useRef(true)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useIsomorphicLayoutEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const check = () => {
      const card = el.closest('[data-card-theme]')
      const pack = document.documentElement.dataset.theme
      setIsDark(
        card
          ? card.classList.contains('dark')
          : pack === 'dark' || pack === 'night' ||
            document.documentElement.classList.contains('dark'),
      )
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    const cardWrapper = el.closest('[data-card-theme]')
    if (cardWrapper) observer.observe(cardWrapper, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function sched(fn: () => void, ms: number) {
    const id = setTimeout(() => { if (aliveRef.current) fn() }, ms)
    timeouts.current.push(id)
  }

  function runFlip(
    target: number,
    durationMs: number,
    dir: 'next' | 'prev',
    onDone?: () => void,
  ) {
    const prev = currentRef.current
    currentRef.current = target
    setFlapContent(prev)
    setFlapVisible(true)

    if (dir === 'next') {
      scanY.set(18)
      animate(scanY, 104, { duration: (durationMs * 2) / 1000, ease: 'linear' })
    } else {
      scanY.set(104)
      animate(scanY, 18, { duration: (durationMs * 2) / 1000, ease: 'linear' })
    }

    rotateX.set(0)
    animate(rotateX, -90, { duration: durationMs / 1000, ease: 'easeIn' })

    sched(() => {
      setTopDisplay(target)
      setBottomDisplay(target)
      setFlapContent(target)
      rotateX.set(90)
      animate(rotateX, 0, { duration: durationMs / 1000, ease: 'easeOut' })
    }, durationMs)

    sched(() => {
      setFlapVisible(false)
      onDone?.()
    }, durationMs * 2 + 20)
  }

  function flip(dir: 'next' | 'prev') {
    if (flapping) return
    const cur = currentRef.current
    const target = dir === 'next'
      ? (cur === DAY_MAX ? DAY_MIN : cur + 1)
      : (cur === DAY_MIN ? DAY_MAX : cur - 1)
    // The day is the control's value, so it still changes under the preference.
    // What the preference removes is the page turn and the scan sweep.
    if (prefersReduce()) {
      currentRef.current = target
      setTopDisplay(target)
      setBottomDisplay(target)
      setFlapContent(target)
      return
    }
    setFlapping(true)
    runFlip(target, FLIP_MS, dir, () => setFlapping(false))
  }

  function onDragEnd(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.y) < 40 && Math.abs(info.velocity.y) < 300) return
    flip(info.offset.y > 0 || info.velocity.y > 300 ? 'next' : 'prev')
  }

  // Arrows only. PageUp/PageDown mean a LARGE step on a spinbutton and Home/End
  // mean jump to the ends; this control turns one leaf at a time, so binding
  // them to a single step would be a key that lies about what it does.
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step: Record<string, 'next' | 'prev'> = {
      ArrowUp: 'next', ArrowRight: 'next',
      ArrowDown: 'prev', ArrowLeft: 'prev',
    }
    if (!step[e.key]) return
    e.preventDefault()
    flip(step[e.key])
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (flapping || prefersReduce()) return
    const r = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width - 0.5
    const cy = (e.clientY - r.top) / r.height - 0.5
    animate(tiltX, cy * -11, { duration: 0.12, ease: 'linear' })
    animate(tiltY, cx *  11, { duration: 0.12, ease: 'linear' })
  }

  function handleMouseLeave() {
    if (prefersReduce()) return
    animate(tiltX, 0, { type: 'spring', stiffness: 160, damping: 18 })
    animate(tiltY, 0, { type: 'spring', stiffness: 160, damping: 18 })
  }

  const topGrad = isDark
    ? 'linear-gradient(155deg, #3572cc 0%, #2d62bc 55%, #2455a0 100%)'
    : 'linear-gradient(155deg, #4e9aec 0%, #3d88da 55%, #3078c8 100%)'

  const flapGrad = isDark
    ? 'linear-gradient(155deg, #2d64bc 0%, #2556ac 55%, #1e4894 100%)'
    : 'linear-gradient(155deg, #4290de 0%, #3480cc 55%, #2870bc 100%)'

  const bottomGrad = isDark
    ? 'linear-gradient(155deg, #4a8edc 0%, #5a9eec 55%, #68aef4 100%)'
    : 'linear-gradient(155deg, #5aaaee 0%, #6abaf8 55%, #76c4fc 100%)'

  const headerGrad = isDark
    ? 'linear-gradient(180deg, #2a2724 0%, #1e1c19 100%)'
    : 'linear-gradient(180deg, #d8d4ce 0%, #c6c2bc 100%)'

  const ringGrad = isDark
    ? 'radial-gradient(circle at 35% 30%, #f4f0ea 0%, #c0bcb6 45%, #888480 100%)'
    : 'radial-gradient(circle at 35% 30%, #ffffff 0%, #dedad4 45%, #aeaaa4 100%)'

  const cardShadow = isDark
    ? '0 40px 100px rgba(20,55,155,0.65), 0 12px 32px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)'
    : '0 40px 100px rgba(40,100,220,0.32), 0 12px 32px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.9)'

  const seam        = isDark ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.22)'
  const numShadow   = isDark
    ? '0 4px 24px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)'
    : '0 4px 24px rgba(0,0,0,0.3),  0 2px 8px rgba(0,0,0,0.22)'

  const day = currentRef.current

  return (
    <div ref={rootRef} className="flex min-h-screen w-full flex-col items-center justify-center gap-6" style={{ background: isDark ? '#110F0C' : '#F5F1EA' }}>

      {/* perspective belongs on the ancestor: it is what gives the card's tilt depth */}
      <div
        style={{ perspective: '900px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          role="spinbutton"
          tabIndex={0}
          aria-label="Day of month"
          aria-valuenow={day}
          aria-valuemin={DAY_MIN}
          aria-valuemax={DAY_MAX}
          aria-valuetext={fmt(day)}
          onKeyDown={onKeyDown}
          className="relative cursor-grab active:cursor-grabbing select-none"
          style={{
            width: 'min(260px, 56vw)',
            aspectRatio: '1 / 1',
            rotate: '3deg',
            rotateX: tiltX,
            rotateY: tiltY,
          }}
        >

          {/* the pad of pages underneath, three sheets peeking out below the card */}
          {[13, 8, 4].map((y, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                background: isDark ? '#2E2A24' : '#C8C2B8',
                transform: `translateY(${y}px)`,
                opacity: 0.28 + i * 0.2,
                zIndex: 0,
                borderRadius: 18,
                boxShadow: `0 ${y * 2}px ${y * 4}px rgba(0,0,0,0.35)`,
              }}
            />
          ))}

          {/* the card itself, clipping every layer below to its radius */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 1, boxShadow: cardShadow, borderRadius: 18 }}
          >

            {/* header: the binding, with the two rings the pages hang from */}
            <div
              className="absolute inset-x-0 top-0 flex items-end justify-center gap-8"
              style={{
                height: '18%',
                background: headerGrad,
                zIndex: 12,
                borderRadius: '18px 18px 0 0',
                borderLeft:  '1.5px solid rgba(0,0,0,0.14)',
                borderRight: '1.5px solid rgba(0,0,0,0.14)',
                paddingBottom: 7,
              }}
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 15, height: 15, borderRadius: '50%',
                    background: ringGrad,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </div>

            {/* bottom half: the settled day, already showing through */}
            <div
              className="absolute inset-x-0 bottom-0 overflow-hidden"
              style={{ top: '59%', background: bottomGrad }}
            >
              <Half n={bottomDisplay} half="bottom" numShadow={numShadow} />
            </div>

            {/* top half: the day at rest */}
            <div
              className="absolute inset-x-0 overflow-hidden"
              style={{
                top: '18%', bottom: '41%',
                background: topGrad,
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Half n={topDisplay} half="top" numShadow={numShadow} />
            </div>

            {/* the leaf in flight, hinged on its own bottom edge */}
            {flapVisible && (
              <div
                className="absolute inset-x-0"
                style={{ top: '18%', height: '41%', zIndex: 8 }}
              >
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    background: flapGrad,
                    rotateX,
                    perspective: 140,
                    transformOrigin: 'center bottom',
                    willChange: 'transform',
                    borderRadius: '12px 12px 0 0',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                  }}
                >
                  <Half n={flapContent} half="top" numShadow={numShadow} />
                </motion.div>

                {/* the crease the leaf folds along, lit from the front */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: 3,
                    background: 'rgba(255,255,255,0.25)',
                    zIndex: 9,
                    boxShadow: '0 0 8px rgba(255,255,255,0.18)',
                  }}
                />
              </div>
            )}

            {/* scan line: sweeps the card once per flip, in the flip's direction */}
            {flapVisible && (
              <motion.div
                className="absolute inset-x-0 pointer-events-none"
                style={{
                  top: scanYPct,
                  height: 2,
                  borderRadius: '9999px',
                  background: '#ffffff',
                  opacity: 0.3,
                  zIndex: 20,
                }}
              />
            )}

            {/* the gap the two halves meet across */}
            <div
              className="absolute inset-x-0 pointer-events-none"
              style={{
                top: 'calc(59% - 3px)', height: 6,
                background: seam, zIndex: 10,
              }}
            />

            {/* hairline under the binding */}
            <div
              className="absolute inset-x-0 pointer-events-none"
              style={{
                top: 'calc(18% - 1px)', height: 1,
                background: 'rgba(0,0,0,0.22)', zIndex: 11,
              }}
            />

            {/* sheen down the top half, so the card reads as one surface */}
            <div
              className="absolute inset-x-0 pointer-events-none"
              style={{
                top: '18%', height: '30%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)',
                borderRadius: '12px 12px 0 0',
                zIndex: 6,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* the only text saying the card moves, so it has to be readable */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="font-mono text-xs tracking-widest"
        style={{ color: isDark ? '#C8C2B8' : '#3a3530' }}
      >
        ↑ swipe ↓
      </motion.p>
    </div>
  )
}


interface HalfProps {
  n: number
  half: 'top' | 'bottom'
  numShadow: string
}

function Half({ n, half, numShadow }: HalfProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 flex items-center justify-center"
      style={{
        height: '200%',
        top:    half === 'top'    ? 0         : undefined,
        bottom: half === 'bottom' ? 0         : undefined,
      }}
    >
      <span
        className="font-sans font-bold select-none tabular-nums"
        style={{
          fontSize: 'clamp(3.8rem, 13vw, 6.5rem)',
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          textShadow: numShadow,
        }}
      >
        {fmt(n)}
      </span>
    </div>
  )
}
