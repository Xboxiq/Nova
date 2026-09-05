'use client'

/* Twenty-third upload of this batch. Two divergences, four findings recorded,
   and one claim of mine that measurement destroyed twice before I let it go.

   DIVERGENCE 1. The dark test is `classList.contains('dark')` and this project
   switches on `data-theme`. Measured with a wait after the write: `light`, `dark`
   and `night` all gave the same light ground `rgb(245,241,234)`. Toggling the
   `dark` CLASS did work — the labels and the dot colour both changed — so the
   original test stays alongside the new one. There are two places to fix here,
   not one: `isDark` for the paint and `isDarkRef` for the frame loop, which is a
   good instinct of the upload's and easy to half-fix.

   DIVERGENCE 2. Neither label was legible, and the upload's own dark pack says
   what the bar should be. Measured, composited over each ground:

     "Noise"               light rgba(28,25,22,0.45)   2.83
                           dark  rgba(255,255,255,0.45) 4.53
     "hover to illuminate" light rgba(28,25,22,0.22)   1.58
                           dark  rgba(255,255,255,0.18) 1.69

   The dark label at 4.53 is the author choosing legibility; the light label is
   the SAME alpha against a different ground, falling to 2.83. So this is their
   own bar applied consistently, not my taste imposed. The hint has no such
   passing sibling, but at 1.58 the only sentence telling you the field responds
   to a pointer cannot be read at all — the same defect as the previous upload's
   cord hint, which measured 1.57. The smallest alpha that clears 4.5:1 was solved
   numerically rather than guessed: 0.61 on the light ground, 0.45 on the dark.
   Both labels now use it, giving 4.55 and 4.53.

   This does flatten the alpha difference between the label and the hint. The
   hierarchy survives in the two signals that carry it better anyway — 22px/700
   against 11px/600 uppercase with wide tracking — and reverting is two numbers if
   the faintness is wanted back.

   RECORDED — the specimen renders NOTHING under this repo's usual host wrapper,
   and the specification's own preamble predicts it: "or the root collapses and
   takes its absolute layers with it." Both children here are `absolute inset-0`,
   so the root has no in-flow content at all. Measured with the standard
   `[&>div]:min-h-0` that every other upload in this section uses: root height 0,
   canvas CSS height 0, `build()` bailing on `if (!cw || !ch) return`, the canvas
   still at its untouched 300x150 UA default, and zero lit pixels. The host gives
   it `min-h-[380px]` instead. The component is right and the wrapper was wrong,
   which is the reverse of the usual direction here and worth saying so.

   RECORDED — the neighbour cache is quadratic and rebuilds on every resize
   callback. Measured at this size: 240,920 canvas pixels, 2,008 dots, 2,015,028
   distance comparisons yielding 30,116 pairs, 9.7ms. Bounded by MAX_DOTS, so the
   worst case is 3,000 dots and 4.5M comparisons, but it runs once per
   ResizeObserver notification and a drag-resize sends many.

   RECORDED — the frame loop never stops. There is no visibility gating, so it
   keeps drawing 2,008 dots and up to 30,116 line segments while the section is
   scrolled out of view. A hidden TAB throttles rAF; being merely off-screen does
   not. The same finding was recorded for the sphere upload and is left the same
   way, so the two agree.

   RECORDED — reduced motion needs nothing here, and that is a conclusion, not an
   omission. Every other canvas in this batch had autonomous drift to stop; this
   field only moves in answer to the pointer, and the established reading in this
   batch is that a pointer response stays while a drift stops. The easing
   (`d.b += 0.16 * (tgt - d.b)`) is a ramp rather than a motion in space.

   And the claim I had to give up. `PEAK_A = 0.14` is BELOW both base alphas —
   0.18 dark, 0.28 light — so `baseA + (PEAK_A - baseA) * d.b` moves the alpha
   term DOWNWARD as a dot lights up, on a component labelled "hover to
   illuminate". The arithmetic is not in doubt. What I asserted from it was that
   the dots therefore get dimmer near the cursor, and that is false.

   Two probes said so. A mean alpha over a 120px disc read 0.357 unhovered
   against 20.18 hovered, which measures the connecting lines' COVERAGE, not any
   dot's alpha. A peak alpha read 45 against 179, which measures 30,116 line
   segments ACCUMULATING over the same pixels. So I removed the source of the
   confusion instead of arguing with it — `NEIGHBOUR_D = 0`, rebuild, no lines at
   all — and measured the mean of the fifty brightest pixels in the same disc:

     dark   23.8 at rest -> 33.7 hovered   (+41%)
     light  37.0 at rest -> 38.7 hovered   (+4.6%)

   The dots get BRIGHTER, because `sz` grows 0.8 to 1.4 at the same moment and a
   1.4px rect concentrates its alpha into whole pixels where a 0.8px rect spreads
   it across four. (The at-rest numbers confirm the model: 0.28 x 0.64 sub-pixel
   coverage predicts 46 and measured 45; 0.18 x 0.64 predicts 46 x 0.64 = 29 and
   measured 29.) So the effect works. What is true is much smaller and still worth
   the ink: in the LIGHT pack the dots barely respond at all, +4.6%, and what you
   see near the cursor is almost entirely the lines. Changing the formula to
   `baseA + PEAK_A * d.b` would make both packs brighten properly — but a +4.6%
   asymmetry is not a broken effect, and repainting the author's field on that
   evidence would be my taste, not their defect. Left exactly as shipped. */
import { useLayoutEffect, useEffect, useRef, useState } from 'react'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect



// tune: lower the divisor to add more dots
const DENSITY     = 1 / 120   
// tune: raise to permit more dots on large canvases
const MAX_DOTS    = 3000      
// tune: raise to widen pointer influence
const RADIUS      = 200      
// tune: raise to connect dots across larger gaps
const NEIGHBOUR_D = 35       
const BASE_A_DARK  = 0.18
const BASE_A_LIGHT = 0.28
const PEAK_A      = 0.14


type Dot  = { x: number; y: number; b: number }
type Pair = [Dot, Dot]

export default function NoiseBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouseRef     = useRef<{ x: number; y: number } | null>(null)
  const initialDark = () => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  }
  const isDarkRef = useRef(initialDark())
  const [isDark, setIsDark] = useState(initialDark)

  
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const check = () => {
      const card = el.closest('[data-card-theme]')
      const pack = document.documentElement.dataset.theme
      const dark = card
        ? card.classList.contains('dark')
        : pack === 'dark' || pack === 'night' ||
          document.documentElement.classList.contains('dark')
      setIsDark(dark)
      isDarkRef.current = dark
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    const cardWrapper = el.closest('[data-card-theme]')
    if (cardWrapper) observer.observe(cardWrapper, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    let dots: Dot[]  = []
    let pairs: Pair[] = []
    let animId = 0
    let alive  = true
    let cw = 0, ch = 0

    function build() {
      const dpr  = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      cw = rect.width
      ch = rect.height
      if (!cw || !ch) return
      canvas.width  = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      
      const count = Math.min(Math.round(cw * ch * DENSITY), MAX_DOTS)
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * cw,
        y: Math.random() * ch,
        b: 0,
      }))

      
      const nd2 = NEIGHBOUR_D * NEIGHBOUR_D
      pairs = []
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          if (dx * dx + dy * dy < nd2) pairs.push([dots[i], dots[j]])
        }
      }
    }

    function frame() {
      if (!alive) return
      ctx.clearRect(0, 0, cw, ch)

      const mx     = mouseRef.current?.x ?? -99999
      const my     = mouseRef.current?.y ?? -99999
      const r2     = RADIUS * RADIUS
      const dotRGB = isDarkRef.current ? '255,255,255' : '28,25,22'
      const baseA  = isDarkRef.current ? BASE_A_DARK : BASE_A_LIGHT

      
      for (const d of dots) {
        const dx    = d.x - mx
        const dy    = d.y - my
        const dist2 = dx * dx + dy * dy
        const tgt   = dist2 < r2 ? Math.exp(-dist2 / (RADIUS * RADIUS * 0.25)) : 0

        d.b += (tgt > d.b ? 0.16 : 0.07) * (tgt - d.b)
        if (d.b < 0.004) d.b = 0

        const alpha = baseA + (PEAK_A - baseA) * d.b
        const sz    = 0.8 + d.b * 0.6   
        ctx.fillStyle = `rgba(${dotRGB},${alpha.toFixed(2)})`
        ctx.fillRect(d.x - sz / 2, d.y - sz / 2, sz, sz)
      }

      
      for (const [a, b] of pairs) {
        if (a.b < 0.05 || b.b < 0.05) continue
        const lineAlpha = Math.min(a.b, b.b) * 0.10
        ctx.strokeStyle = `rgba(${dotRGB},${lineAlpha.toFixed(2)})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      animId = requestAnimationFrame(frame)
    }

    build()
    frame()

    const ro = new ResizeObserver(build)
    ro.observe(canvas.parentElement!)

    return () => {
      alive = false
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  function updateMouse(clientX: number, clientY: number) {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top }
  }

  const bg         = isDark ? '#110F0C' : '#F5F1EA'
  // 0.45 on the dark ground is the author's own choice and already measures 4.53;
  // 0.61 is the smallest alpha that reaches 4.5:1 on the light one.
  const legibleA   = isDark ? 0.45 : 0.61
  const labelColor = isDark ? `rgba(255,255,255,${legibleA})` : `rgba(28,25,22,${legibleA})`
  const hintColor  = labelColor

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: bg }}
      onMouseMove={(e) => updateMouse(e.clientX, e.clientY)}
      onMouseLeave={() => { mouseRef.current = null }}
      onTouchMove={(e) => { const t = e.touches[0]; if (t) updateMouse(t.clientX, t.clientY) }}
      onTouchEnd={() => { mouseRef.current = null }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span style={{ color: labelColor, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Noise
        </span>
        <span style={{ color: hintColor, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          hover to illuminate
        </span>
      </div>
    </div>
  )
}
