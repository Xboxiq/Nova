/* ────────────────────────────────────────────────────────────────────────
   Brandwork — what the brand axis LOOKS like, once it is a token.

   `data-brand` (design-system/nova-design-os/tokens/brands.css) publishes a
   product's colour as anchors, and derives from them an action family, a
   gradient, a mesh and a tint. This file is the family that reads those tokens
   back — a card whose ground IS the brand, a palette drawn as lit spheres, and
   a glass pane tinted by the brand rather than by a hard-coded white.

   Checked before writing it, and not reused:
   · `MeshSurface` (mesh.tsx) paints eight NAMED meshes — the photographed
     reference's own colours, fixed. This card paints whatever the brand is, so
     it takes `--brand-mesh` instead: same material, chosen ground.
   · `PaletteSlide` (glasswork.tsx) shows a palette as flat chips. `BrandSpheres`
     draws the same set as lit spheres, because a swatch in this system is an
     object with a highlight and a terminator (§ the sphere rule in mesh.tsx).
   · `pane()` (glasswork.tsx) is the owner's own glass recipe and is REUSED
     verbatim here — only the tint is the brand's.

   The material is the one the owner already ruled in: five pools that turn, one
   grain layer, one light from directly above (§2), a lit top lip and a darker
   bottom lip. Nothing here invents a second look — the brand only changes which
   colour that look is made of.
──────────────────────────────────────────────────────────────────────── */

export interface BrandCardProps {
  /** The reading the card is about. */
  label?: string;
  value?: string;
  unit?: string;
  /** The line under the reading. */
  note?: string;
  /** `mesh` — pools that turn (the photographed ground). `ramp` — the two
      anchors as one linear turn, for a smaller card that cannot hold pools. */
  ground?: 'mesh' | 'ramp';
  width?: number;
  height?: number;
}

/* ── BrandCard — the gradient card, and the gradient is the PRODUCT's ────────
   A gradient written into a component is a gradient nobody can choose; this one
   is `var(--brand-mesh)`, so the same card is violet for one shop and polished
   orange for another with no edit. Ink is white because every brand's mesh is
   its saturated end — the pair is measured in tools/qa/brand-contrast.mjs. */
export function BrandCard({
  label = 'استهلاك الشهر',
  value = '412',
  unit = 'ك.و.س',
  note = 'أعلى من معتادك بـ 8٪',
  ground = 'mesh',
  width = 316,
  height = 316,
}: BrandCardProps) {
  return (
    <div
      data-brand-card={ground}
      className="madar-grain madar-glow"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
        padding: 26,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--r-widget)',
        background: ground === 'mesh' ? 'var(--brand-mesh, var(--nova-action))' : 'var(--brand-gradient, var(--nova-action))',
        color: '#fff',
        boxShadow:
          'inset 0 1.5px 0 var(--bevel-lit), inset 0 -1.5px 0 var(--bevel-dark), inset 0 0 0 1px var(--bevel-hair), var(--depth-widget)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.92)' }}>{label}</span>
        {/* the one chip that is measured wears the brand's own light, not a
            second colour: the tint is the brand at low alpha over its own mesh */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 11px',
            borderRadius: 'var(--r-pill)',
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.28)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.36)',
          }}
        >
          مقيس
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <b style={{ fontSize: 62, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.035em' }}>
          <bdi dir="ltr">{value}</bdi>
        </b>
        <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.92)' }}>{unit}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 14 }}>
        <span style={{ color: 'rgba(255,255,255,0.92)' }}>{note}</span>
        {/* fourteen counted units: the quantity drawn counted (§15), lit at the
            measured end — the same meter the loan widget uses, in brand colour */}
        <span aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              style={{
                width: 2,
                height: i >= 6 ? 22 : 14,
                borderRadius: 'var(--r-pill)',
                background: i >= 6 ? '#fff' : 'rgba(255,255,255,0.45)',
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/* ── BrandSpheres — the curated set, drawn as objects rather than dots ───────
   A palette shown as flat circles is a legend; shown as lit spheres it is a
   material sample, which is what a shop owner is actually choosing. The
   highlight sits up and left of centre, there is a terminator, and light
   bounces back along the lower edge — the three things whose absence makes a
   sphere read as a sticker. */
export interface BrandSphere { name: string; from: string; mid: string; to: string }

const SET: BrandSphere[] = [
  { name: 'بنفسجي غامق', from: 'oklch(0.66 0.175 300)', mid: 'oklch(0.44 0.175 300)', to: 'oklch(0.30 0.140 300)' },
  { name: 'برتقالي مصقول', from: 'oklch(0.80 0.150 42)', mid: 'oklch(0.60 0.165 42)', to: 'oklch(0.42 0.140 32)' },
  { name: 'زيتوني', from: 'oklch(0.76 0.150 128)', mid: 'oklch(0.52 0.150 128)', to: 'oklch(0.34 0.120 128)' },
  { name: 'تركوازي عميق', from: 'oklch(0.74 0.110 195)', mid: 'oklch(0.50 0.120 195)', to: 'oklch(0.33 0.100 195)' },
  { name: 'نيلي حبري', from: 'oklch(0.70 0.160 262)', mid: 'oklch(0.47 0.170 262)', to: 'oklch(0.31 0.140 262)' },
  { name: 'قرمزي', from: 'oklch(0.72 0.170 18)', mid: 'oklch(0.51 0.175 18)', to: 'oklch(0.34 0.140 18)' },
  { name: 'طيني', from: 'oklch(0.74 0.070 58)', mid: 'oklch(0.52 0.075 58)', to: 'oklch(0.36 0.060 58)' },
  { name: 'فحمي', from: 'oklch(0.62 0.020 250)', mid: 'oklch(0.40 0.022 250)', to: 'oklch(0.26 0.020 250)' },
];

export function BrandSpheres({ spheres = SET, size = 54 }: { spheres?: BrandSphere[]; size?: number }) {
  return (
    <ul
      data-brand-spheres=""
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--sp-5)',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {spheres.map((s) => (
        <li key={s.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: size + 22 }}>
          <span
            aria-hidden="true"
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(66% 66% at 33% 26%, ${s.from} 0%, ${s.mid} 46%, ${s.to} 84%)`,
              boxShadow: 'inset 0 -3px 5px rgba(255,255,255,0.28), var(--depth-sphere)',
            }}
          />
          <span style={{ fontSize: 11.5, lineHeight: 1.3, textAlign: 'center', color: 'var(--text-2)' }}>{s.name}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── BrandGlass — the owner's own pane recipe, tinted by the brand ───────────
   The six numbers on the owner's slide (blur 20, stroke 35%, fill 25%, top
   highlight 1px white, inner shadow 0/1/8 20%, soft shadow y8 b30 12%) are
   tokens in bridge.css and are used verbatim. The ONE thing the brand changes
   is the tint — and legibility still comes from the material, never from
   dimming the ground: the reading sits on a scrim inside the pane. */
export function BrandGlass({ title = 'زجاجٌ بلون العلامة', reading = '58', unit = 'ك.و.س' }: { title?: string; reading?: string; unit?: string }) {
  return (
    <div
      data-brand-glass=""
      className="madar-grain madar-grain--light"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: 316,
        height: 200,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'var(--r-sheet)',
        background: 'var(--brand-mesh, var(--nova-action))',
      }}
    >
      <div
        style={{
          width: 236,
          padding: '18px 20px',
          borderRadius: 'var(--r-panel)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          background: 'var(--pane-fill)',
          border: '1px solid var(--pane-stroke)',
          backdropFilter: 'blur(var(--pane-blur))',
          WebkitBackdropFilter: 'blur(var(--pane-blur))',
          boxShadow: 'inset 0 1px 0 var(--pane-highlight), inset 0 1px 8px var(--pane-inner), var(--depth-pane)',
        }}
      >
        {/* the scrim: the film is the pane's own material, so the ink clears AA
            without the ground being dimmed — the owner's ruling on glass */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(180deg, rgba(12,14,20,0.34) 0%, rgba(12,14,20,0.46) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* the title is the pane's content, not its accessible name: a bare div is
            `generic`, and `generic` refuses a name (aria-name-legal caught it) */}
        <span style={{ position: 'relative', fontSize: 13, color: 'rgba(255,255,255,0.92)' }}>{title}</span>
        <span style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 6, color: '#fff' }}>
          <b style={{ fontSize: 38, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em' }}>
            <bdi dir="ltr">{reading}</bdi>
          </b>
          <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)' }}>{unit}</span>
        </span>
      </div>
    </div>
  );
}
