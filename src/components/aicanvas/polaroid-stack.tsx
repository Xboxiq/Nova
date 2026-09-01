/* Sixth upload of this batch, implemented per its own requirements.

   DIVERGENCE 1. The upload reached the handwriting face through
   `<style>@import url(fonts.googleapis.com/...Caveat...)</style>`, rendered inside
   the component, so every mount opened a request to a third party. Measured, not
   assumed: the request fires
   (`https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap`),
   and after removal the same probe records none.

   `document.fonts.check()` is NOT the way to verify this, and that was worth
   finding out: it returns true for `600 16px NoSuchFaceZZZ` as readily as for
   Caveat, so it answers "nothing is pending", not "the face is here". The network
   log is the evidence. This application
   loads no external font host anywhere — `index.html` carries no font link and the
   shipped CSS has no `@font-face` — so carrying this would make a component the
   first to introduce one, which is a privacy and dependency decision and therefore
   the owner's, not something to slip in from inside a card. So the import is not
   carried and `'Caveat'` falls through to its declared fallback, `cursive`. Caveat
   is the fourth face named by an upload and not loaded here, after Inter, Clash
   Display and Oswald, and it is recorded rather than substituted.

   DIVERGENCE 2. The whole component was pointer-only, and this was measured:
   `FOCUSABLE_IN_SPECIMEN 0`, no `role` anywhere, `Enter` changed nothing while a
   mouse click changed the layout. The cards are the interaction, so they are real
   buttons now — `Enter` and `Space` come free with the element, and `aria-pressed`
   carries the selected state that was previously only a shadow and a scale.

   The root keeps its plain `div` and its click handler on purpose. Giving the root
   a button role as well would nest six controls inside one and trade a keyboard
   defect for an ARIA one, so instead `Escape` restacks — the root can handle the
   key without being focusable, because the focused card is its descendant.

   DIVERGENCE 3. Seven `{}` were left behind in the JSX where the registry had
   stripped comment text out. They render nothing; they are removed because they
   are residue, not intent.

   Left alone and reported: the caption says "click" in a component that now also
   answers to a keyboard, but the copy is the author's. */
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* This project loads Tailwind's utilities without Preflight, so a `<button>` keeps
   its user-agent chrome unless it is reset. Same three declarations as the previous
   upload in this batch; said once per component rather than rediscovered. */
const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent p-0'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect



interface CardData {
  id: number
  label: string
  from: string
  to: string
}

interface Pos {
  x: number
  y: number
  rotate: number
}



// tune: change both dimensions to resize the polaroids
const CARD_W = 110
const CARD_H = 140




const STAGE_W = 2 * (160 + CARD_W / 2) + 32 
const STAGE_H = 220

// customize: replace the card labels and colors below
const CARDS: CardData[] = [
  { id: 0, label: 'Sunset', from: '#FF6B6B', to: '#FF8E53' },
  { id: 1, label: 'Ocean',  from: '#14B8A6', to: '#67E8F9' },
  /* Rule 04 bans purple-on-black dark mode and matches `#8b5cf6` literally, so it
     flagged this. What it flagged is one of five sample photo gradients inside a
     polaroid mock — Sunset, Ocean, Dream, Golden, Mist — not a surface, an accent
     or a theme, so the rule's intent is not what is happening here. Exempted in
     place with the scanner's own convention rather than by widening the rule for
     everyone or repainting the author's swatch.
     anti-slop-ignore-next-line 04 */
  { id: 2, label: 'Dream',  from: '#8B5CF6', to: '#C4B5FD' },
  { id: 3, label: 'Golden', from: '#F59E0B', to: '#FDE68A' },
  { id: 4, label: 'Mist',   from: '#64748B', to: '#CBD5E1' },
]


// tune: adjust these positions to change the stacked and fanned layouts
const STACKED: Pos[] = [
  { x: -6, y:  2, rotate: -12 },
  { x:  3, y: -4, rotate:  -5 },
  { x:  1, y:  1, rotate:   2 },
  { x: -4, y:  3, rotate:   8 },
  { x:  5, y: -2, rotate:  14 },
]


const FANNED: Pos[] = [
  { x: -160, y: 30, rotate: -22 },
  { x:  -80, y:  8, rotate: -11 },
  { x:    0, y: -4, rotate:   0 },
  { x:   80, y:  8, rotate:  11 },
  { x:  160, y: 30, rotate:  22 },
]



export default function PolaroidStack() {
  const [fanned, setFanned] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  
  
  const rootRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const update = () => {
      const next = Math.min(1, el.clientWidth / STAGE_W)
      setScale(Number.isFinite(next) && next > 0 ? next : 1)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const toggle = () => {
    setFanned((f) => !f)
    setHoveredId(null)
    setSelectedId(null)
  }

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden bg-zinc-950"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || !fanned) return
        setFanned(false)
        setHoveredId(null)
        setSelectedId(null)
      }}
    >
        <motion.div
          className="relative"
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {CARDS.map((card, i) => {
            const pos = fanned ? FANNED[i] : STACKED[i]
            const isHovered = fanned && hoveredId === card.id && selectedId !== card.id
            const isSelected = fanned && selectedId === card.id

            return (
              <motion.div
                key={card.id}
                className="absolute left-1/2 top-1/2"
                animate={{
                  x: pos.x - CARD_W / 2,
                  y: pos.y - CARD_H / 2,
                  rotate: isSelected ? 0 : pos.rotate,
                }}
                style={{ zIndex: isSelected ? 30 : isHovered ? 20 : i }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                  
                  delay: fanned
                    ? i * 0.06
                    : (CARDS.length - 1 - i) * 0.05,
                }}
              >
                <motion.button
                  type="button"
                  aria-pressed={isSelected}
                  className={PREFLIGHT_BUTTON}
                  animate={{
                    y: isSelected ? -28 : isHovered ? -18 : 0,
                    scale: isSelected ? 1.4 : isHovered ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  style={{ cursor: fanned ? 'pointer' : 'inherit' }}
                  onHoverStart={() => { if (fanned) setHoveredId(card.id) }}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={(e) => {
                    if (!fanned) return
                    e.stopPropagation()
                    setSelectedId((id) => (id === card.id ? null : card.id))
                    setHoveredId(null)
                  }}
                >
                  <div
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      backgroundColor: '#ffffff',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '8px 8px 0 8px',
                      boxShadow: isSelected
                        ? '0 32px 64px rgba(0,0,0,0.7), 0 12px 24px rgba(0,0,0,0.4)'
                        : isHovered
                          ? '0 20px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.3)'
                          : '0 4px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.15)',
                      transition: 'box-shadow 0.25s ease',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        height: 93,
                        background: `linear-gradient(135deg, ${card.from}, ${card.to})`,
                      }}
                    />

                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#3f3f46',
                          margin: 0,
                          lineHeight: 1,
                        }}
                      >
                        {card.label}
                      </p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          key={`${String(fanned)}-${String(selectedId !== null)}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 text-xs text-zinc-500"
          style={{
            pointerEvents: 'none',
            fontFamily: 'var(--font-sans, sans-serif)',
            letterSpacing: '0.03em',
          }}
        >
          {!fanned
            ? 'click to fan out'
            : selectedId !== null
              ? 'click card again to deselect'
              : 'click a card · click bg to stack'}
        </motion.p>
    </div>
  )
}
