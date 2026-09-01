import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// tune: raise to increase sphere density
const PARTICLE_COUNT = 9000


function makeSprite(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const half = size / 2
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half)
  grad.addColorStop(0.00, 'rgba(255,255,255,1.00)')
  grad.addColorStop(0.20, 'rgba(255,255,255,0.80)')
  grad.addColorStop(0.55, 'rgba(255,255,255,0.25)')
  grad.addColorStop(1.00, 'rgba(255,255,255,0.00)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}


function colorFromY(ny: number): [number, number, number] {
  if (ny >= 0) {
    return [1.0, 0.55 + ny * 0.37, 0.02 + ny * 0.63]
  } else {
    const d = -ny
    const v = 0.38 + d * 0.62
    return [v, v, v + (1 - d) * 0.07]
  }
}

export default function ParticleSphere() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.clientWidth  || 500
    const H = container.clientHeight || 500

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(52, W / H, 0.1, 100)
    camera.position.z = 2.9

    // Throws outright when the browser cannot hand back a WebGL context:
    // hardware acceleration switched off, an older or virtualised machine, or
    // too many live contexts on one page. Thrown from inside an effect it takes
    // the surrounding page down with it, so an empty frame is the better
    // failure.
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
    } catch {
      return
    }
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000)
    container.appendChild(renderer.domElement)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.acos(2 * Math.random() - 1)
      const phi   = 2 * Math.PI * Math.random()
      const r = 1.0 + (Math.random() - 0.5) * 0.14

      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.cos(theta)
      const z = r * Math.sin(theta) * Math.sin(phi)

      positions[i * 3]     = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const ny          = Math.max(-1, Math.min(1, y / r))
      const [cr, cg, cb] = colorFromY(ny)
      colors[i * 3]     = cr
      colors[i * 3 + 1] = cg
      colors[i * 3 + 2] = cb
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

    const sprite  = makeSprite()
    const mat     = new THREE.PointsMaterial({
      size:         0.032,
      map:          sprite,
      vertexColors: true,
      transparent:  true,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
    })

    const mesh = new THREE.Points(geo, mat)
    mesh.rotation.x = 0.28
    mesh.rotation.z = 0.08
    scene.add(mesh)

    let raf = 0
    let t = 0

    /* DIVERGENCE 2. The loop rotated for ever with no regard for
       `prefers-reduced-motion`, and this was measured rather than assumed: two
       screenshots of the canvas 700ms apart differ under `reduce` exactly as they
       do without it. This repo's blanket is CSS — `animation-duration: 1ms` — and
       it has no reach into a requestAnimationFrame loop, so nothing else in the
       project could stop it. Content that moves indefinitely with no way to stop
       it is WCAG 2.2.2, and the previous upload in this same section handles the
       same question itself, so the bar is not hypothetical.

       Still, ONE frame is rendered either way: the sphere is the specimen, and a
       black square would be a worse answer than a still sphere. Only the rotation
       stops, and the listener means toggling the preference takes effect without a
       reload. */
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)')

    function draw() {
      mesh.rotation.y = t
      mesh.rotation.z = 0.08 + Math.sin(t * 0.4) * 0.04
      renderer.render(scene, camera)
    }

    function tick() {
      raf = requestAnimationFrame(tick)
      t += 0.004
      draw()
    }

    function run() {
      cancelAnimationFrame(raf)
      raf = 0
      if (stillness.matches) { draw(); return }
      tick()
    }
    run()
    stillness.addEventListener('change', run)

    /* DIVERGENCE 3. `W` and `H` were read once, on mount, and never again: no
       `ResizeObserver`, `[]` deps, and `setSize` writes a fixed inline
       `width: 380px` onto the canvas. Measured across five viewports in a fluid
       column — 1440 / 900 / 600 / 420 / 360 — the drawing buffer AND the CSS box
       both stayed `380x380` at every one of them. The canvas therefore stops
       being sized BY the layout and starts being the floor OF it: at 360px the
       specimen box measured 428 inside a 270px column, a 158px overflow.

       No gate here catches that. The overflow check reads
       `document.documentElement.scrollWidth`, and that equalled `innerWidth` at
       every width (360 = 360) because an ancestor clips the excess — so the break
       is silent, which is the reason to fix it rather than only report it.

       Two parts, because one alone deadlocks. The observer alone cannot help: the
       container is only ever as wide as its widest child, and that child is the
       380px canvas, so it would keep reporting 380 for ever. Taking the canvas out
       of flow breaks the cycle — the container's width then comes from its parent,
       the observer reads it, and the buffer follows. `draw()` runs on every resize
       so the still frame under `reduce` is redrawn at the new size too. */
    const fit = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      draw()
    }
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'

    /* DIVERGENCE 4. The accessibility snapshot of the specimen showed
       `{"role":"Canvas","name":""}` — a node with no name, which announces
       nothing and is pure clutter to a screen reader. The sphere is decoration;
       the sibling canvas in `canvasui/FlameWrap` hides its own the same way. */
    renderer.domElement.setAttribute('aria-hidden', 'true')
    const ro = new ResizeObserver(fit)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      stillness.removeEventListener('change', run)
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      // Hand the GPU context back explicitly: dispose() frees the scene but
      // leaves the context alive, and a browser grants only about sixteen per
      // page, so remounting a few times exhausts them.
      try {
        renderer.forceContextLoss()
      } catch {}
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="relative h-full w-full" />
}
