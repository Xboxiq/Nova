'use client'

/* Twenty-fourth upload of this batch. Note first that the registry shipped
   something BETTER than the written specification: the spec places the panel at
   `left-full top-0 ml-2`, opening rightward, and the installed file opens it
   below and centred (`left-1/2 top-full`, `x: '-50%'`). The shipped choice is the
   right one — a rightward panel leaves the viewport on a narrow screen and on the
   wrong side entirely under `data-direction="rtl"`, which this project is built
   for. Kept as shipped, and the divergence between spec and code recorded rather
   than resolved toward the prose.

   DIVERGENCE 1. The glass was doing nothing for legibility, and this is the
   defect this batch was told about by name. The panel's own fill is
   `rgba(255,255,255,0.08)` — a LIGHT film — over a photograph of an orange
   flower. Computed over what that photograph actually is where it is brightest,
   roughly `[240,180,90]`: the film alone leaves a ground of `[241,186,103]`, on
   which the item labels at `rgba(255,255,255,0.70)` measure **1.49**, and even at
   0.80 only **1.58**. The panel's text is unreadable exactly where the picture is
   prettiest. So a dark scrim goes UNDER the author's film, on the element the
   text descends from — the same construction as the card and navbar uploads
   earlier in this batch — which holds the same labels at 6.05 over that bright
   patch and 8.45 over the site's own ground. The ground stays vivid; the material
   carries the text. The trigger gets the same treatment for the same reason.

   DIVERGENCE 2. The trigger announced nothing. Measured: `aria-expanded` null,
   `aria-haspopup` null, `aria-controls` null, and `type` null, so inside a form
   it submits. All four supplied, with an `id` on the panel to point at.

   DIVERGENCE 3. There was no way to close it from a keyboard. Measured: Escape
   changed nothing, and tabbing forward from the last item walked
   straight out of the open menu into the page's own footer links — "Profile,
   Settings, Team, Billing, Log Out, then two Arabic footer links" — with the
   panel still open behind. Escape now closes it and returns focus to the trigger,
   and focus leaving the container closes it too. Measured after: `aria-expanded`
   goes false 150ms after Escape with focus back on the trigger, Enter reopens,
   tabbing through all five items keeps it open, and the tab that leaves the
   container closes it — `aria-expanded` false, one button left in the specimen.

   (My first reading said the new Escape handler did nothing, because I counted
   buttons 500ms after the key and `AnimatePresence` still had the panel mounted
   for its exit. `aria-expanded` lives on the trigger, which never unmounts, and
   it had already flipped. Sixth claim in this batch that my own sampling made.)

   I deliberately did NOT add `role="menu"`. That role is a promise of arrow-key
   navigation with a single tab stop, and honouring it properly is a great deal
   more code than this needs. A group of plain buttons inside a popup is already
   reachable, already announced, and already operable — measured, all five are in
   the tab order in reading order. The gap was never the role; it was the closing.

   DIVERGENCE 4. Two texts could not be read. Measured on the site's own ground:
   the group headings at `rgba(255,255,255,0.25)` gave **2.25**, and "Log Out" at
   `rgba(255,90,90,0.70)` gave **2.92**. For the headings, the smallest alpha
   reaching 4.5:1 was solved numerically over both the site ground (0.47) and the
   bright patch of the photograph (0.56); 0.56 is used, so it holds either way.

   "Log Out" is a ceiling, not a fix. `rgba(255,90,90,a)` cannot reach 4.5:1 over
   the scrimmed panel at ANY alpha — solved across the whole range and it returns
   nothing — because `#FF5A5A` simply is not far enough from a mid grey. So it is
   taken as far as the author's own colour permits, alpha 1.0, and where it stops
   is printed rather than papered over. Moving it would mean changing their red,
   which is the owner's call. Its icon badge is a separate matter and passes the
   3:1 that non-text needs.

   DIVERGENCE 5. Reduced motion. The panel animates `filter: blur(4px)`, and
   `MotionConfig` disables transforms but not filters — measured 15 distinct
   filter/opacity states under `reduce` against 12 without it, which is the same
   animation. The item stagger is opacity too, and equally untouched. Under the
   preference the panel now fades with no blur and the items arrive together;
   `x: '-50%'` is kept in every variant because it is the panel's POSITION, not
   its animation, and dropping it would shove the panel half its width sideways.

   DIVERGENCE 6. Eight `{}` left where the registry stripped comment text out.
   (I counted ten first: `grep -c` counts LINES containing the pattern, and the
   two inert `onClick={() => {}}` handlers contain it too.)

   RECORDED — the five items are `onClick={() => {}}`. Inert, as in three earlier
   uploads in this batch, and left that way for the same reason.

   A note on measuring this one, because it cost two wrong contrast tables before
   a right one. Tailwind v4 emits `text-white/80` as `oklab(0.999994 ... / 0.8)`,
   and my helper read those 0-to-1 components as 0-to-255 bytes — the same mistake
   that made `lab()` colours read as near-black three times earlier in this batch,
   in a new dress. It reported the trigger's name at 1.43 when it is 9.51. So I
   rewrote the resolver to paint each colour and read the pixel back, which cannot
   care what syntax the colour arrived in — and got it wrong AGAIN, dividing by
   alpha on the theory that ImageData is premultiplied. It is not, by
   specification. What caught it in one run was a self-check on six colours whose
   answers are known independently: `rgba(255,255,255,0.5)` came back as 508. That
   self-check now runs before every table in this harness, and it is the only
   reason this one can be trusted. */
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  User,
  Gear,
  SignOut,
  Users,
  CreditCard,
  CaretUpDown,
} from '@phosphor-icons/react'


const BACKGROUND = 'https://ik.imagekit.io/aitoolkit/bg%20images/Ethereal%20Orange%20Flower%201%20(1).png?updatedAt=1775223702866'

const USER = {
  name: 'Jennifer Rivera',
  email: 'jennifer@studio.io',
  avatar: 'https://ik.imagekit.io/aitoolkit/Miscellaneous/Avatars/Silhouette%20Profile%20Against%20Gradient%20Background%201.webp',
}

const MENU_GROUPS = [
  {
    label: 'Account',
    items: [
      { icon: User, label: 'Profile',  color: '#3A86FF' },
      { icon: Gear, label: 'Settings', color: '#B388FF' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { icon: Users,      label: 'Team',    color: '#06D6A0' },
      { icon: CreditCard, label: 'Billing', color: '#FFBE0B' },
    ],
  },
]


const glassPanel = {
  /* The author's white film is kept exactly and a dark scrim goes under it, so
     the material carries the text instead of the photograph being dimmed. */
  background:
    'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), rgba(14,12,16,0.80)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
}

const glassPanelBlur = {
  backdropFilter: 'blur(24px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
}

const ACTIVE_GLOW =
  '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1.5px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.08)'


function MenuItem({
  icon: Icon,
  label,
  color,
  index,
}: {
  icon: typeof User
  label: string
  color: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, delay: reduce ? 0 : 0.06 + index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{ minHeight: 44, background: 'transparent' }}
    >
      <motion.button
        onClick={() => {}}
        animate={{
          x: hovered ? 3 : 0,
          scale: hovered ? 1.08 : 1,
        }}
        whileTap={{ scale: 0.90 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5"
        style={{ background: 'transparent', transformOrigin: 'left center' }}
      >
        <div
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: 32,
            height: 32,
            background: `${color}18`,
            border: `1px solid ${color}22`,
          }}
        >
          <Icon size={16} weight="regular" style={{ color }} />
        </div>
        <span
          className="text-sm font-medium"
          style={{
            color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.70)',
            /* group headings and Log Out are raised below; these hold at 8.45 */
            transition: 'color 0.15s',
          }}
        >
          {label}
        </span>
      </motion.button>
    </motion.div>
  )
}


export default function GlassUserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    // Escape is the only way a keyboard could shut this before, and there was
    // none: tabbing past the last item walked out into the page with the panel
    // still open, so focus leaving the container closes it as well.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    }
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null
      if (next && ref.current && !ref.current.contains(next)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    document.addEventListener('keydown', onKey)
    ref.current?.addEventListener('focusout', onFocusOut)
    const container = ref.current
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
      document.removeEventListener('keydown', onKey)
      container?.removeEventListener('focusout', onFocusOut)
    }
  }, [open])

  let itemIndex = 0

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
      <img
        src={BACKGROUND}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div ref={ref} className="relative flex flex-col items-center" style={{ marginTop: -150 }}>

        <motion.button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="glass-user-menu-panel"
          onClick={() => setOpen(v => !v)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          animate={{ boxShadow: open ? ACTIVE_GLOW : glassPanel.boxShadow }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative isolate flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{
            background: glassPanel.background,
            border: glassPanel.border,
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-[-1] rounded-2xl" style={glassPanelBlur} />
          <img
            src={USER.avatar}
            /* the name is the button's own text; a matching alt says it twice */
            alt=""
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-white/80">{USER.name}</span>
          <CaretUpDown size={16} weight="regular" className="text-white/40" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              /* `x: '-50%'` is the panel's POSITION, not its animation, so it
                 stays in every variant; dropping it under the preference would
                 shove the panel half its own width sideways. */
              initial={reduce ? { opacity: 0, x: '-50%' } : { opacity: 0, scale: 0.95, x: '-50%', y: -8, filter: 'blur(4px)' }}
              animate={reduce ? { opacity: 1, x: '-50%' } : { opacity: 1, scale: 1, x: '-50%', y: 0, filter: 'blur(0px)' }}
              exit={reduce ? { opacity: 0, x: '-50%' } : { opacity: 0, scale: 0.95, x: '-50%', y: -8, filter: 'blur(4px)' }}
              transition={reduce ? { duration: 0.12 } : { type: 'spring', stiffness: 350, damping: 28 }}
              id="glass-user-menu-panel"
              className="absolute left-1/2 top-full mt-2 w-[min(256px,calc(100vw-32px))] rounded-2xl p-2"
              style={{ ...glassPanel, ...glassPanelBlur, transformOrigin: 'top center' }}
            >
              <div
                className="absolute bottom-6 left-0 top-6 w-[1px]"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)' }}
              />

              {MENU_GROUPS.map((group) => (
                <div key={group.label} className="mb-1">
                  <p
                    className="mb-0.5 px-3 pt-1 text-[10px] font-semibold uppercase tracking-widest"
                    /* 0.25 measured 2.25; 0.56 is the smallest alpha that holds
                       4.5:1 over the brightest part of the photograph too. */
                    style={{ color: 'rgba(255,255,255,0.56)' }}
                  >
                    {group.label}
                  </p>
                  {group.items.map((item) => (
                    <MenuItem key={item.label} icon={item.icon} label={item.label} color={item.color} index={itemIndex++} />
                  ))}
                </div>
              ))}

              <div className="mx-2 my-1.5 h-[1px]" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <LogOutItem index={itemIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


function LogOutItem({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, delay: reduce ? 0 : 0.06 + index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{ minHeight: 44, background: 'transparent' }}
    >
      <motion.button
        onClick={() => {}}
        animate={{
          x: hovered ? 3 : 0,
          scale: hovered ? 1.08 : 1,
        }}
        whileTap={{ scale: 0.90 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5"
        style={{ background: 'transparent', transformOrigin: 'left center' }}
      >
        <div
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: 32,
            height: 32,
            background: '#FF5A5A18',
            border: '1px solid #FF5A5A22',
          }}
        >
          <SignOut size={16} weight="regular" style={{ color: '#FF5A5A' }} />
        </div>
        <span
          className="text-sm font-medium"
          style={{
            /* As far as #FF5A5A can go: this hue cannot reach 4.5:1 over the
               scrimmed panel at any alpha, so 1.0 is the ceiling, not a pass. */
            color: 'rgba(255,90,90,1)',
            transition: 'color 0.15s',
          }}
        >
          Log Out
        </span>
      </motion.button>
    </motion.div>
  )
}
