'use client'

/* Twenty-seventh upload of this batch, and the first to arrive with no written
   specification at all — just the install line. So it is judged on its own terms
   and against this project's rules, with nothing to defer to on a disagreement.

   DIVERGENCE 1. The deck cannot be operated without a mouse. Measured: zero
   buttons, zero focusable elements, `cursor` reading `default, default, grab`
   across the three cards, and Tab / Space / ArrowDown / Enter leaving the z-order
   exactly as it was. The only way to reach the second destination was to drag the
   top card off the pile. The front card is now a `button`-role control with
   `tabIndex={0}`, a name that says which destination it is, and Enter or Space
   doing what the drag does. The drag is untouched.

   DIVERGENCE 2. Two texts could not be read, both solved numerically rather than
   guessed. The country line at `rgba(255,255,255,0.45)` measured **4.21** on the
   card's own `[42,40,37]` — just under — and 0.48 is the smallest alpha that
   clears 4.5:1, giving 4.54. The hint "swipe down to shuffle" measured **1.83**
   on the light ground and **2.21** on the dark; it needs 0.55 and 0.45
   respectively, giving 4.61 and 4.54. That hint is the fourth operating
   instruction in this batch to have been unreadable, after the flip calendar's
   1.57, the noise field's 1.58 and the user menu's 2.25 — it is the single most
   repeated defect in twenty-seven uploads.

   DIVERGENCE 3. The hotel count animates from zero, and it is a NUMBER, not an
   ornament. `useCountUp` drives it with a `setInterval`, which no CSS blanket and
   no `MotionConfig` can reach — measured on the FRONT card from before the
   section mounted, 38 and 39 distinct values sweeping 0 to 250 under `reduce`,
   against 21 and 23 without it, which is the same animation sampled over a
   different window. Under the preference the count now arrives whole. The same
   split as the clock upload earlier in this batch: the time is essential, the
   ticking is not.

   DIVERGENCE 4. The dark test is `classList.contains('dark')` and this project
   switches on `data-theme` — the seventh upload in a row. Measured: `light`,
   `dark` and `night` all gave the same light ground `rgb(245,241,234)`.

   DIVERGENCE 5. Nine `{}` left where the registry stripped comment text out, and
   the exported function was called `FloatingCards` in a file called
   `traveldeck.tsx`. Renamed to match.

   RECORDED — the lime circle with the arrow in it looks exactly like a button
   and is a `div` with no handler. Inert, like the badges and calls to action in
   four earlier uploads, and left the same way. Its own contrast is fine: `#1A1A19`
   on `#BECF5D` measures 10.18.

   A note on measuring the counter, because my first attempt read a value that was
   correct and meaningless. I sampled the first span matching a run of digits and
   got `0` in every frame of both runs, and nearly wrote that the count-up does
   not happen. It does: that span belongs to a card at the BACK of the pile, where
   `active={isFront && !isExiting}` correctly holds it at zero. The front card had
   also finished counting long before my first read, 1.6s after scrolling. Reading
   the highest-`zIndex` card, with the sampler installed before the section
   mounted, gives the numbers above. Eighth claim in this batch that my own
   sampling produced rather than the code. */
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Buildings, ArrowUpRight } from '@phosphor-icons/react'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect


const CARD_W = 280
const CARD_H = 200

const CARDS = [
  { title: 'Maafushi',   sub: 'Crystal waters',    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=520&q=80&fit=crop&crop=center', country: 'Maldives',    hotels: 120 },
  { title: 'Swiss Alps', sub: 'Powder & peaks',    img: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=520&q=80&fit=crop&crop=center', country: 'Switzerland', hotels: 87  },
  { title: 'Bali',       sub: 'Sun-soaked shores', img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=520&q=80&fit=crop&crop=center', country: 'Indonesia',   hotels: 250 },
] as const

// tune: adjust offsets and rotation to change the deck spread
const POSITIONS = [
  { x:  12, y: -32, rotate:  6, zIndex: 1, opacity: 1.00 },
  { x:   6, y: -18, rotate:  4, zIndex: 2, opacity: 1.00 },
  { x:   0, y:   0, rotate:  0, zIndex: 3, opacity: 1.00 },
] as const

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0)
  useIsomorphicLayoutEffect(() => {
    if (!active) { setValue(0); return }
    // A setInterval is beyond the reach of both the CSS blanket and MotionConfig,
    // and this is a count of hotels, not an ornament: under the preference the
    // number arrives whole rather than being withheld for 900ms.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    const duration = 900
    const steps = 40
    const interval = duration / steps
    let step = 0
    const id = setInterval(() => {
      step++
      setValue(Math.round((step / steps) * target))
      if (step >= steps) clearInterval(id)
    }, interval)
    return () => clearInterval(id)
  }, [active, target])
  return value
}

function HotelsCounter({ target, active }: { target: number; active: boolean }) {
  const value = useCountUp(target, active)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 5,
    }}>
      <Buildings weight="regular" size={16} style={{ color: '#E8E8DF', opacity: 0.55 }} />
      <span style={{
        fontSize: 10,
        fontWeight: 500,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '0.04em',
        fontVariantNumeric: 'tabular-nums',
      }}>
        hotels <span style={{ color: 'rgba(255,255,255,0.85)', marginLeft: 2 }}>{value}</span>
      </span>
    </div>
  )
}

export default function TravelDeck() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })
  const [order, setOrder] = useState<[number, number, number]>([0, 1, 2])
  const [isShuffling, setIsShuffling] = useState(false)
  const [exitingCard, setExitingCard] = useState<number | null>(null)

  // the drag and the keyboard both come through here, so the two can never
  // disagree about what "next" means
  function shuffleFrom(i: number) {
    if (isShuffling) return
    setIsShuffling(true)
    setExitingCard(i)
  }

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
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    const cardWrapper = el.closest('[data-card-theme]')
    if (cardWrapper) observer.observe(cardWrapper, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])


  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: isDark ? '#110F0C' : '#F5F1EA' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />


      <div style={{ position: 'relative', width: CARD_W, height: CARD_H }}>
        {CARDS.map((card, i) => {
          const posIndex = order.indexOf(i)
          const pos = POSITIONS[posIndex]
          const isFront = posIndex === 2
          const isExiting = exitingCard === i
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: CARD_W,
                height: CARD_H,
                cursor: isFront ? 'grab' : 'default',
                borderRadius: 16,
                background: '#2A2825',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: isDark
                  ? '8px -8px 24px rgba(0,0,0,0.35)'
                  : '8px -8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflow: 'hidden',
                padding: 0,
              }}
              drag={isFront && !isShuffling ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              dragMomentum={false}
              onDragEnd={(_e, info) => {
                if (!isFront || isShuffling) return
                if (info.offset.y > 80 || info.velocity.y > 400) shuffleFrom(i)
              }}
              role={isFront ? 'button' : undefined}
              tabIndex={isFront ? 0 : -1}
              aria-hidden={isFront ? undefined : true}
              aria-label={isFront ? `${card.title}, ${card.country} — show the next destination` : undefined}
              onKeyDown={isFront ? (e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return
                e.preventDefault()
                shuffleFrom(i)
              } : undefined}
              animate={isExiting
                ? { y: 600, rotate: 8, opacity: 0 }
                : { x: pos.x, y: pos.y, rotate: pos.rotate, zIndex: pos.zIndex, opacity: pos.opacity }
              }
              transition={isExiting
                ? { duration: 0.45, ease: 'easeIn' }
                : { type: 'spring', stiffness: 80, damping: 16 }
              }
              onAnimationComplete={() => {
                if (isExiting) {
                  setExitingCard(null)
                  setOrder(prev => [prev[2], prev[0], prev[1]])
                  setTimeout(() => setIsShuffling(false), 400)
                }
              }}
            >
              <div style={{
                padding: '10px 10px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                flex: '0 0 auto',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <HotelsCounter target={card.hotels} active={isFront && !isExiting} />

                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: '#BECF5D',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowUpRight weight="bold" size={13} style={{ color: '#1A1A19' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <p style={{
                    fontSize: 17,
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}>
                    {card.title}
                  </p>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 500,
                    /* 0.45 measured 4.21 on the card's own ground; 0.48 is the
                       smallest alpha that clears 4.5:1, at 4.54 */
                    color: 'rgba(255,255,255,0.48)',
                    letterSpacing: '0.04em',
                  }}>
                    {card.country}
                  </span>
                </div>
              </div>

              <div style={{
                margin: '8px 6px 6px',
                borderRadius: 12,
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              </div>
            </motion.div>
          )
        })}
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: 24,
          fontSize: 11,
          /* the only sentence saying the deck can be moved: 0.25 measured 2.21
             on the dark ground and 1.83 on the light. These are the smallest
             alphas that clear 4.5:1 — 4.54 and 4.61. */
          color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.55)',
          letterSpacing: '0.05em',
        }}
      >
        swipe down to shuffle
      </p>
    </div>
  )
}
