'use client'

/* Nineteenth upload of this batch.

   DIVERGENCE 1. The scramble renamed the control. The label is the button's text,
   so while it scrambles the button's ACCESSIBLE NAME scrambles with it — measured
   through the accessibility tree at three moments after hover:

     &*@?=>%?=$   ->   INITIALI>>   ->   INITIALIZE

   For 700ms the only thing naming this control is random punctuation. So the name
   is pinned with `aria-label` and the scrambling text is `aria-hidden`: the effect
   is untouched for the eye, and the button is called INITIALIZE throughout.

   DIVERGENCE 2. `text-lg font-semibold font-mono` were all lost. Measured on the
   button: 16px, weight 400, and `-apple-system` — not 18px, not 600, not
   monospace. This project's unlayered `button { font: inherit }` outranks every
   Tailwind utility, the fourth component in this batch to show it. Set inline.
   (`tracking-widest` survives, because the `font` shorthand does not reset
   letter-spacing — checked rather than assumed.)

   DIVERGENCE 3. The dark test is `classList.contains('dark')`, and this project
   switches on `data-theme` instead. Measured: with `data-theme="night"` the root
   still computed `rgb(245,241,234)`, the light ground. `data-theme` is added to
   the test and to the observer; the original checks stay, since they are what makes
   this work outside this repo.

   DIVERGENCE 4. The scramble ignored `prefers-reduced-motion` — measured 14 of 14
   frames scrambled under `reduce`, the same as without it. `MotionConfig` cannot
   reach it: this is a requestAnimationFrame loop driving React state, not a framer
   animation. Under the preference the label now resolves at once. The hover glow
   and the corner brackets stay, because a colour change is not motion.

   DIVERGENCE 5. `type="button"`, absent.

   DIVERGENCE 6. One `{}` left where the registry stripped comment text out.

   A note on measuring this one, because it cost three probes. My first readings
   said the glow was already on at rest and that the scramble never fired at all.
   Both were the same artifact: a click leaves Playwright's pointer where it
   clicked, the later scroll slid this button under that resting pointer, and the
   700ms scramble had run to completion before the first read. Parking the pointer
   before reading gives `shadow: "none"` at rest and a clean resolve —
   `I>*&%??+?@` to `IN~=^!@!??` to `INI=^^?^=>` to `INIT?!+++%`. */
import { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react'
import { motion } from 'framer-motion'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect



const LABEL = 'INITIALIZE'
const GLITCH_CHARS = '@#$%&!*^~<>?+='
// tune: raise to lengthen the scramble
const SCRAMBLE_DURATION = 700
// tune: raise to slow character updates
const SCRAMBLE_INTERVAL = 40

const DARK = {
  text: '#00ff41',
  textDim: 'rgba(0, 255, 65, 0.6)',
  glow: 'rgba(0, 255, 65, 0.15)',
  borderDefault: '#2E2A24',
}

const LIGHT = {
  text: '#2a6b0a',
  textDim: 'rgba(42, 107, 10, 0.7)',
  glow: 'rgba(42, 107, 10, 0.12)',
  borderDefault: '#DDD8CE',
}

function getRandomChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

export default function GlitchButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current
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

  const colors = isDark ? DARK : LIGHT

  const [displayText, setDisplayText] = useState(LABEL)
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number>(0)
  const isHoveredRef = useRef(false)
  const startTimeRef = useRef(0)
  const lastUpdateRef = useRef(0)

  const cleanup = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  useEffect(() => {
    return () => { cleanup() }
  }, [cleanup])

  const scrambleTick = useCallback((timestamp: number) => {
    if (!isHoveredRef.current) return

    const elapsed = timestamp - startTimeRef.current
    const resolvePerChar = SCRAMBLE_DURATION / LABEL.length

    if (timestamp - lastUpdateRef.current < SCRAMBLE_INTERVAL) {
      rafRef.current = requestAnimationFrame(scrambleTick)
      return
    }
    lastUpdateRef.current = timestamp

    const resolvedCount = Math.min(
      Math.floor(elapsed / resolvePerChar),
      LABEL.length
    )

    if (resolvedCount >= LABEL.length) {
      setDisplayText(LABEL)
      return
    }

    const chars: string[] = []
    for (let i = 0; i < LABEL.length; i++) {
      chars.push(i < resolvedCount ? LABEL[i] : getRandomChar())
    }
    setDisplayText(chars.join(''))

    rafRef.current = requestAnimationFrame(scrambleTick)
  }, [])

  function handleMouseEnter() {
    isHoveredRef.current = true
    setIsHovered(true)
    /* Under the preference the label arrives resolved: the glow and the brackets
       still respond, because a colour change is not motion. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(LABEL)
      return
    }
    startTimeRef.current = performance.now()
    lastUpdateRef.current = 0
    cleanup()
    rafRef.current = requestAnimationFrame(scrambleTick)
  }

  function handleMouseLeave() {
    isHoveredRef.current = false
    setIsHovered(false)
    cleanup()
    setDisplayText(LABEL)
  }

  return (
    <div ref={containerRef} className="flex min-h-screen w-full items-center justify-center" style={{ background: isDark ? '#110F0C' : '#F5F1EA' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.button
          type="button"
          aria-label={LABEL}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative cursor-pointer px-8 py-4 font-mono text-lg font-semibold tracking-widest"
          style={{
            background: isDark ? '#110F0C' : '#F5F1EA',
            color: colors.text,
            /* The three the button reset ate: measured 16px / 400 / -apple-system. */
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            boxShadow: isHovered
              ? `0 0 20px ${colors.glow}, inset 0 0 12px ${colors.glow}`
              : 'none',
            transition: 'box-shadow 0.3s',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
            <span
              key={corner}
              className="pointer-events-none absolute"
              style={{
                width: 10,
                height: 10,
                top: corner.startsWith('t') ? 0 : 'auto',
                bottom: corner.startsWith('b') ? 0 : 'auto',
                left: corner.endsWith('l') ? 0 : 'auto',
                right: corner.endsWith('r') ? 0 : 'auto',
                borderColor: isHovered ? colors.textDim : colors.borderDefault,
                borderTopWidth: corner.startsWith('t') ? 1.5 : 0,
                borderBottomWidth: corner.startsWith('b') ? 1.5 : 0,
                borderLeftWidth: corner.endsWith('l') ? 1.5 : 0,
                borderRightWidth: corner.endsWith('r') ? 1.5 : 0,
                borderStyle: 'solid',
                transition: 'border-color 0.3s',
              }}
            />
          ))}

          {/* Hidden from the accessibility tree: `aria-label` above names the
              button steadily while this text is still scrambling. */}
          <span aria-hidden className="relative z-10">{displayText}</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
