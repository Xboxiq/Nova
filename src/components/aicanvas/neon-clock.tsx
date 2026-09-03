'use client'

/* Eighteenth upload of this batch.

   DIVERGENCE 1, and it is the whole point of a clock. The time is drawn as SVG
   polygons, so it does not exist as text: the accessibility snapshot returns a row
   of nameless `image` nodes, and the container's entire text content measured
   "AMPMSUNMONTUEWEDTHUFRISATSEPTEMBER 3, 2026" — the day names and the date are
   there and THE TIME IS NOT. A screen reader could tell you the date and not what
   time it is.

   So the clock names itself: `role="img"` with an `aria-label` carrying the hour,
   minute, second, meridiem, weekday and date in readable form. Deliberately NOT a
   live region — a clock that announced itself every second would be unusable, and
   the label is there to be asked, not to interrupt.

   DIVERGENCE 2. The idle day names measured 2.03 against 4.5, composited over the
   clock's own ground with its dot overlay in place. They are the row that tells
   you which day it is, so the alpha goes from 0.28 to 0.56, the lowest value that
   clears the bar here — 4.60 measured after. The dimmed date at 0.65 was checked
   in the same pass and passes at 5.94, so it is left alone. (My first reading of
   that date said 1.26; the sample had fallen below the clock's dark box onto the
   page, and the number was mine, not the upload's.)

   DIVERGENCE 3. Reduced motion, split by what the motion is for. The time itself
   keeps advancing — a clock that stops is not a calmer clock, it is a broken one,
   and WCAG's own exception is for movement that is essential. The blinking colon
   is not essential: it is decoration that flashes twice a second for as long as
   the page is open. Measured before: it changed under `reduce` exactly as without
   it. Now it holds lit under the preference while the seconds keep counting.

   DIVERGENCE 4. Six `{}` left where the registry stripped comment text out.

   Left alone: `"Courier New", Courier, monospace` is a system stack, so nothing
   external is fetched and the brief's own typography section is satisfied. */
import { useState, useEffect } from 'react'


const CYAN     = '#55E8E2'
const CYAN_OFF  = 'rgba(85,232,226,0.055)'  
/* 0.28 measured 2.03 against 4.5 over this clock's own ground; 0.56 gives 4.60. */
const CYAN_IDLE = 'rgba(85,232,226,0.56)'   
const CYAN_DIM  = 'rgba(85,232,226,0.65)'   
const BG       = '#060a0a'
const GLOW_SVG = `drop-shadow(0 0 3px ${CYAN}) drop-shadow(0 0 8px ${CYAN}99)`
const GLOW_TXT = `0 0 5px ${CYAN}, 0 0 11px ${CYAN}88`


const VW = 42, VH = 80
// tune: raise to thicken the digit segments
const T  = 6    
// tune: raise to deepen the segment bevels
const BV = 3    
// tune: raise to increase segment edge gaps
const GP = 2    

function hPts(y: number): string {
  const x1 = GP + BV, x2 = VW - GP - BV, cy = y + T / 2
  return `${GP},${cy} ${x1},${y} ${x2},${y} ${VW-GP},${cy} ${x2},${y+T} ${x1},${y+T}`
}

function vPts(x: number, y1: number, y2: number): string {
  const cx = x + T / 2
  return `${cx},${y1} ${x+T},${y1+BV} ${x+T},${y2-BV} ${cx},${y2} ${x},${y2-BV} ${x},${y1+BV}`
}

const aY = GP, gY = VH / 2 - T / 2, dY = VH - GP - T
const lX = GP, rX = VW - GP - T


const aEnd = aY,         gTop = gY - GP
const gEnd = gY + T + GP, dTop = dY + T

const SHAPES = [
  hPts(aY),               
  vPts(rX, aEnd, gTop),  
  vPts(rX, gEnd, dTop),  
  hPts(dY),               
  vPts(lX, gEnd, dTop),  
  vPts(lX, aEnd, gTop),  
  hPts(gY),               
]


const SEG: Record<string, boolean[]> = {
  '0': [true,  true,  true,  true,  true,  true,  false],
  '1': [false, true,  true,  false, false, false, false],
  '2': [true,  true,  false, true,  true,  false, true ],
  '3': [true,  true,  true,  true,  false, false, true ],
  '4': [false, true,  true,  false, false, true,  true ],
  '5': [true,  false, true,  true,  false, true,  true ],
  '6': [true,  false, true,  true,  true,  true,  true ],
  '7': [true,  true,  true,  false, false, false, false],
  '8': [true,  true,  true,  true,  true,  true,  true ],
  '9': [true,  true,  true,  true,  false, true,  true ],
}


function Digit({ char, size }: { char: string; size: number }) {
  const segs = SEG[char] ?? SEG['8']
  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width={size}
      height={Math.round(size * VH / VW)}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
    >
      {SHAPES.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill={segs[i] ? CYAN : CYAN_OFF}
          style={segs[i] ? { filter: GLOW_SVG } : undefined}
        />
      ))}
    </svg>
  )
}


function ColonDots({ dim, size }: { dim: boolean; size: number }) {
  return (
    <svg
      viewBox={`0 0 ${VW * 0.44} ${VH}`}
      width={Math.round(size * 0.44)}
      height={Math.round(size * VH / VW)}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
    >
      {([0.30, 0.68] as const).map((yf, i) => (
        <circle
          key={i}
          cx={VW * 0.22}
          cy={VH * yf}
          r={VW * 0.125}
          fill={dim ? CYAN_OFF : CYAN}
          style={dim ? undefined : { filter: GLOW_SVG }}
        />
      ))}
    </svg>
  )
}


const pad2 = (n: number) => n.toString().padStart(2, '0')
const DAYS  = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const

type Now = {
  h: string
  m: string
  s: string
  isPM: boolean
  dow: number
  date: string
  label: string
}

function getNow(): Now {
  const d = new Date()
  const h = d.getHours()
  return {
    h:    pad2(h % 12 || 12),
    m:    pad2(d.getMinutes()),
    s:    pad2(d.getSeconds()),
    isPM: h >= 12,
    dow:  d.getDay(),
    date: d.toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    }).toUpperCase(),
    /* The same instant in words, for the reader who cannot see polygons. */
    label: `${h % 12 || 12}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${
      h >= 12 ? 'PM' : 'AM'
    }, ${d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    })}`,
  }
}


// tune: change to resize the primary time digits
const BIG       = 50                          
// tune: change to resize the seconds digits
const SML       = 24                          
const GAP       = 3                           
const COLON_BIG = Math.round(BIG * 0.44)     
const COLON_SML = Math.round(SML * 0.44)     

const TIME_W    = 4 * BIG + COLON_BIG + COLON_SML + 2 * SML + 7 * GAP



export default function NeonClock() {
  
  
  const [now,     setNow]     = useState<Now | null>(null)
  const [colonOn, setColonOn] = useState(true)

  useEffect(() => {
    setNow(getNow())
    /* The tick stays; the blink does not. A clock that stops telling the time is
       not calmer, it is broken — WCAG's exception is for movement that is
       essential — but a colon flashing twice a second for as long as the page is
       open is decoration, and it holds lit under the preference instead. */
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreferenceChange = () => { if (stillness.matches) setColonOn(true) }
    stillness.addEventListener('change', onPreferenceChange)
    onPreferenceChange()
    const id = setInterval(() => {
      setNow(getNow())
      if (!stillness.matches) setColonOn(c => !c)
    }, 1000)
    return () => {
      clearInterval(id)
      stillness.removeEventListener('change', onPreferenceChange)
    }
  }, [])

  
  
  if (now === null) {
    return (
      <div
        className="relative flex min-h-screen w-full select-none items-center justify-center overflow-hidden"
        style={{ background: BG, fontFamily: '"Courier New", Courier, monospace' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.48) 1.3px, transparent 1.3px)',
            backgroundSize: '3.8px 3.8px',
          }}
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={now.label}
      className="relative flex h-full w-full select-none items-center justify-center overflow-hidden"
      style={{ background: BG, fontFamily: '"Courier New", Courier, monospace' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: GAP }}>
          <Digit char={now.h[0]} size={BIG} />
          <Digit char={now.h[1]} size={BIG} />
          <ColonDots dim={false} size={BIG} />
          <Digit char={now.m[0]} size={BIG} />
          <Digit char={now.m[1]} size={BIG} />
          <ColonDots dim={!colonOn} size={SML} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 6, fontSize: 13, letterSpacing: '0.08em', marginBottom: 3 }}>
              <span style={{ color: !now.isPM ? CYAN : CYAN_IDLE, textShadow: !now.isPM ? GLOW_TXT : 'none' }}>AM</span>
              <span style={{ color:  now.isPM ? CYAN : CYAN_IDLE, textShadow:  now.isPM ? GLOW_TXT : 'none' }}>PM</span>
            </div>
            <div style={{ display: 'flex', gap: GAP }}>
              <Digit char={now.s[0]} size={SML} />
              <Digit char={now.s[1]} size={SML} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: TIME_W,
            marginTop: 13,
            fontSize: 13,
            letterSpacing: '0.05em',
          }}
        >
          {DAYS.map((d, i) => (
            <span
              key={d}
              style={{
                color:      i === now.dow ? CYAN        : CYAN_IDLE,
                textShadow: i === now.dow ? GLOW_TXT    : 'none',
              }}
            >
              {d}
            </span>
          ))}
        </div>
        <div
          style={{
            width: TIME_W,
            marginTop: 5,
            textAlign: 'center',
            fontSize: 13,
            letterSpacing: '0.1em',
            color: CYAN_DIM,
          }}
        >
          {now.date}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.48) 1.3px, transparent 1.3px)',
          backgroundSize: '3.8px 3.8px',
        }}
      />
    </div>
  )
}
