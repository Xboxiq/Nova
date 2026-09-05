'use client'

/* Seventeenth upload of this batch, and the cleanest one to arrive: dpr-correct
   canvas sizing, a ResizeObserver that preserves each arrow's angle and phase
   across a rebuild, full teardown, touch handling the brief never asked for, and
   not one `{}` of stripped-comment residue. Three divergences, all measured.

   DIVERGENCE 1. The field painted its LIGHT ground in every dark pack. Its dark
   test is `classList.contains('dark')`, and this project does not carry a `.dark`
   class — it switches on `data-theme`, whose seven values include `dark` and
   `night`. Measured: with `data-theme="night"` and again with `"dark"`, the root
   computed `rgb(245,241,234)`, which is `#F5F1EA`, the light value, and
   `classList.contains('dark')` was false in all three packs. So the arrows drew
   dark-on-light while the page around them was dark. `data-theme` is added to the
   test and to what the observer watches; the original checks are left in place,
   because they are what makes the component work outside this repo.

   DIVERGENCE 2. The loop never stops. `t += 0.004` every frame, for ever, and the
   idle state keeps drifting even with no pointer. This project's reduced-motion
   blanket is CSS — `animation-duration: 1ms` — and a `requestAnimationFrame` loop
   is out of its reach, exactly as the particle sphere was; `MotionConfig` cannot
   help either, since nothing here is framer. Measured before the fix: two canvas
   captures 700ms apart hash differently under `reduce` just as they do without it.
   So the preference is read in JS. One frame is still drawn either way — a field
   of arrows at rest is the specimen; an empty rectangle would be a worse answer —
   and the pointer still steers them, because that is motion the reader asked for
   by moving their own hand. Only the unattended drift stops.

   DIVERGENCE 3. The accessibility snapshot showed `{"role":"Canvas","name":""}`,
   a node that announces nothing. The field is decoration, and it is hidden the same
   way the sphere's canvas and FlameWrap's are.

   Reported and not touched: the whole effect is pointer-driven and has no keyboard
   equivalent, which is honest for decoration — there is nothing here to operate,
   only something to look at. */
import { useLayoutEffect, useEffect, useRef, useState } from 'react'
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect



// tune: raise to spread the arrows farther apart
const GRID_SPACING = 24    
// tune: raise to lengthen each arrow shaft
const SHAFT_LEN    = 8     
// tune: raise to enlarge each arrowhead
const HEAD_SIZE    = 4     


// tune: raise to widen pointer influence
const DECAY_DIST = 320     
// tune: raise to quicken arrows nearest the pointer
const LERP_FAST  = 0.12    
// tune: raise to quicken distant arrows
const LERP_MIN   = 0.006   
// tune: raise to quicken the return to idle flow
const IDLE_LERP  = 0.010   


// tune: raise to increase angular drift
const WOBBLE_AMP  = 0.18   
// tune: raise to speed the wobble
const WOBBLE_FREQ = 0.7    


interface Arrow {
  gx: number
  gy: number
  angle: number   
  phase: number   
}




function flowAngle(gx: number, gy: number, t: number): number {
  return (
    Math.sin(gx * 0.007 + t) * Math.PI +
    Math.cos(gy * 0.007 + t * 0.6) * Math.PI
  )
}


function lerpAngle(current: number, target: number, speed: number): number {
  let diff = target - current
  while (diff >  Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return current + diff * speed
}


export default function NoiseField() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const pack = document.documentElement.dataset.theme
    return pack === 'dark' || pack === 'night' ||
      document.documentElement.classList.contains('dark')
  })
  const isDarkRef   = useRef(isDark)
  const mouseRef    = useRef<{ x: number; y: number } | null>(null)
  const arrowsRef   = useRef<Arrow[]>([])

  useIsomorphicLayoutEffect(() => { isDarkRef.current = isDark }, [isDark])

  
  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const check = () => {
      const card = el.closest('[data-card-theme]')
      /* Third source, and it is the one that decides inside this project: the
         document's `data-theme`. Two of its seven values are dark. */
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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })
    const cw = el.closest('[data-card-theme]')
    if (cw) observer.observe(cw, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = null }
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top }
    }
    const onTouchEnd = () => { mouseRef.current = null }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchstart', onTouch, { passive: true })
    canvas.addEventListener('touchmove', onTouch, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd)
    return () => {
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchstart', onTouch)
      canvas.removeEventListener('touchmove', onTouch)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let t = 0

    function buildGrid(W: number, H: number) {
      
      const prev = new Map<string, Arrow>()
      for (const a of arrowsRef.current) prev.set(`${a.gx},${a.gy}`, a)
      const next: Arrow[] = []
      for (let gx = GRID_SPACING / 2; gx < W; gx += GRID_SPACING) {
        for (let gy = GRID_SPACING / 2; gy < H; gy += GRID_SPACING) {
          const existing = prev.get(`${gx},${gy}`)
          next.push({
            gx,
            gy,
            angle: existing?.angle ?? flowAngle(gx, gy, t),
            phase: existing?.phase ?? Math.random() * Math.PI * 2,
          })
        }
      }
      arrowsRef.current = next
    }

    const resize = () => {
      const w   = container.clientWidth  || 480
      const h   = container.clientHeight || 480
      const dpr = window.devicePixelRatio || 1
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGrid(w, h)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function draw() {
      const W     = container!.clientWidth  || 480
      const H     = container!.clientHeight || 480
      const dark  = isDarkRef.current
      const mouse = mouseRef.current

      
      ctx!.fillStyle = dark ? '#110F0C' : '#F5F1EA'
      ctx!.fillRect(0, 0, W, H)

      ctx!.lineCap  = 'round'
      ctx!.lineJoin = 'round'

      for (const arrow of arrowsRef.current) {
        const { gx, gy } = arrow

        if (mouse) {
          
          const dx   = mouse.x - gx
          const dy   = mouse.y - gy
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          const proximityFactor = Math.exp(-dist / DECAY_DIST)
          const wobble = WOBBLE_AMP * (1 - proximityFactor * 0.7) * Math.sin(t * WOBBLE_FREQ + arrow.phase)
          const targetAngle = Math.atan2(dy, dx) + wobble
          const speed = LERP_FAST * proximityFactor + LERP_MIN
          arrow.angle = lerpAngle(arrow.angle, targetAngle, speed)
        } else {
          
          const noiseAngle = flowAngle(gx, gy, t) + WOBBLE_AMP * 0.5 * Math.sin(t * WOBBLE_FREQ * 0.8 + arrow.phase)
          arrow.angle = lerpAngle(arrow.angle, noiseAngle, IDLE_LERP)
        }

        const angle = arrow.angle
        const cos   = Math.cos(angle)
        const sin   = Math.sin(angle)

        
        let alpha: number
        if (mouse) {
          const dx = mouse.x - gx, dy = mouse.y - gy
          const dist2 = dx * dx + dy * dy
          
          const proximity = Math.exp(-dist2 / (200 * 200))
          alpha = dark
            ? 0.06 + proximity * 0.84
            : 0.05 + proximity * 0.75
        } else {
          
          alpha = dark ? 0.18 : 0.15
        }

        const color = dark
          ? `rgba(255,255,255,${alpha.toFixed(3)})`
          : `rgba(28,25,22,${alpha.toFixed(3)})`

        ctx!.strokeStyle = color
        const tipX = gx + cos * SHAFT_LEN
        const tipY = gy + sin * SHAFT_LEN
        const tailX = gx - cos * SHAFT_LEN
        const tailY = gy - sin * SHAFT_LEN

        
        ctx!.lineWidth = 1.2
        ctx!.beginPath()
        ctx!.moveTo(tailX, tailY)
        ctx!.lineTo(tipX, tipY)
        ctx!.stroke()

        
        const headAngle = Math.PI - Math.PI / 5
        ctx!.lineWidth = 1.0
        ctx!.beginPath()
        ctx!.moveTo(tipX, tipY)
        ctx!.lineTo(
          tipX + Math.cos(angle + headAngle) * HEAD_SIZE,
          tipY + Math.sin(angle + headAngle) * HEAD_SIZE,
        )
        ctx!.stroke()
        ctx!.beginPath()
        ctx!.moveTo(tipX, tipY)
        ctx!.lineTo(
          tipX + Math.cos(angle - headAngle) * HEAD_SIZE,
          tipY + Math.sin(angle - headAngle) * HEAD_SIZE,
        )
        ctx!.stroke()
      }

      if (!stillness.matches) t += 0.004
      if (!stillness.matches) rafId = requestAnimationFrame(draw)
    }

    /* Under `reduce` the loop is not scheduled and `t` never advances, so the
       unattended drift stops; a pointer move still repaints one frame, because
       that motion is the reader's own doing. */
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMoveRepaint = () => { if (stillness.matches) draw() }
    const run = () => {
      cancelAnimationFrame(rafId)
      if (stillness.matches) { draw(); return }
      rafId = requestAnimationFrame(draw)
    }
    run()
    stillness.addEventListener('change', run)
    canvas.addEventListener('mousemove', onMoveRepaint)
    canvas.addEventListener('mouseleave', onMoveRepaint)

    return () => {
      cancelAnimationFrame(rafId)
      stillness.removeEventListener('change', run)
      canvas.removeEventListener('mousemove', onMoveRepaint)
      canvas.removeEventListener('mouseleave', onMoveRepaint)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: isDark ? '#110F0C' : '#F5F1EA' }}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0" />
    </div>
  )
}
