/* Seventh upload of this batch, implemented per its own requirements.

   DIVERGENCE 1. The ground was a hotlinked photograph on a third-party CDN
   (`ik.imagekit.io/...Ethereal Orange Flower...`), and it does not arrive: the
   request is issued and then nothing comes back — no response, no failure event,
   `naturalWidth` still 0 and `complete` still false after twelve seconds. What
   rendered was a flat `#1A1A19` box, which is to say the entire premise of a
   glass panel — something worth blurring behind it — was missing.

   This is the same decision the previous upload raised over a Google font, and it
   is answered the same way: this application reaches no external host, and a
   component is not the place to make it start. A photograph is the heavier case,
   because it is also someone else's file under someone else's licence, so it is
   not vendored into the repository either.

   The blur needs something to blur, so the ground is drawn locally instead —
   three radial blooms in the warm palette the original name promises, costing no
   request and no bytes. Restoring the photograph, for an owner who wants the
   hotlink, is one `<img>`.

   DIVERGENCE 2. The dismiss control measured 20x20 CSS pixels, against the 24x24
   minimum. The visual size is the author's and is kept; the hit area is extended
   past it with a transparent pseudo-element, which is the usual way to satisfy
   the target without redrawing the design.

   DIVERGENCE 3. Ten `{}` left where the registry stripped comment text out.

   DIVERGENCE 4. Four inks fail on the ground the UPLOAD ITSELF declares, before
   any substitution: composited over `#1A1A19` plus the card's own 6% white,

     message  white/40  3.64      time    white/25  2.27
     Reset    white/30  2.71      X icon  white/30  2.54  (needs 3 as a glyph)

   and the title at 11.08 and header at 6.94 pass untouched. These are content —
   the message text of a notification and the control that dismisses it — and no
   gate here can see them: axe returns 17 incomplete nodes for this component
   ("background could not be determined due to a background gradient", "overlapped
   by another element") and zero violations. The allowance mechanism this repo uses
   for an author's own colours needs a number the gate can print, and there is
   none, so the choice was to correct them or to let them ship unmeasured.

   Raised to white/70, white/60, white/60 and white/50, which clears 4.5 (and 3
   for the glyph) both on the flat ground and at the brightest point of the local
   bloom, and keeps the author's tonal order — title above message above time. The
   original values are one revert each, listed above.

   NOT changed, and a claim of mine withdrawn with it: the blur layer sits at
   `z-[-1]` inside a parent marked `isolate`, which commonly means a
   backdrop-filter with nothing to filter. I first recorded that screenshots proved
   it does filter. That evidence does not hold — backdrop-filter rasterises
   unstably in this headless browser, and captures of the same unchanged region
   came back fully white, then banded grey, then correctly dark. So the honest
   statement is narrower: the declaration is applied and non-none in the computed
   style, and whether it visually blurs could not be settled here. The layer is
   left exactly as written. */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChatCircle, Heart, ShieldCheck, X, ArrowUp } from '@phosphor-icons/react'

interface Notification {
  id: number
  icon: typeof Bell
  color: string
  title: string
  message: string
  time: string
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    icon: ChatCircle,
    color: '#3A86FF',
    title: 'New Message',
    message: 'Alex sent you a photo',
    time: '2m ago',
  },
  {
    id: 2,
    icon: Heart,
    color: '#FF7B54',
    title: 'New Like',
    message: 'Sarah liked your post',
    time: '5m ago',
  },
  {
    id: 3,
    icon: ShieldCheck,
    color: '#06D6A0',
    title: 'Security',
    message: 'New login from MacBook Pro',
    time: '12m ago',
  },
  {
    id: 4,
    icon: ArrowUp,
    color: '#B388FF',
    title: 'Update Available',
    message: 'Version 4.2 is ready to install',
    time: '1h ago',
  },
  {
    id: 5,
    icon: Bell,
    color: '#FFBE0B',
    title: 'Reminder',
    message: 'Team standup in 15 minutes',
    time: '1h ago',
  },
]

function NotificationCard({
  notification,
  onDismiss,
  index,
}: {
  notification: Notification
  onDismiss: (id: number) => void
  index: number
}) {
  const Icon = notification.icon

  return (
    <motion.div
      layout
      initial={{ x: 60, scale: 0.9 }}
      animate={{ x: 0, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 24, delay: index * 0.05 } }}
      exit={{ opacity: 0, x: -60, scale: 0.9, filter: 'blur(4px)', transition: { duration: 0.2, ease: 'easeIn' } }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80) {
          onDismiss(notification.id)
        }
      }}
      className="group relative isolate w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing transition-colors duration-200"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] rounded-2xl"
        style={{ backdropFilter: 'blur(20px) saturate(1.6)', WebkitBackdropFilter: 'blur(20px) saturate(1.6)' }}
      />
      <div className="flex items-start gap-3.5 px-4 py-3.5 pr-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 + index * 0.05 }}
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `${notification.color}18`,
            border: `1px solid ${notification.color}22`,
          }}
        >
          <Icon size={18} weight="regular" style={{ color: notification.color }} />
        </motion.div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-white/85">{notification.title}</h4>
          <p className="mt-0.5 text-[13px] text-white/70">{notification.message}</p>
        </div>
      </div>
      <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.85 }}
          onClick={() => onDismiss(notification.id)}
          aria-label={`Dismiss ${notification.title}`}
          className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full after:absolute after:-inset-1 after:content-['']"
          style={{
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <X size={11} weight="regular" className="text-white/50" />
        </motion.button>
        <span className="text-[10px] text-white/60">{notification.time}</span>
      </div>
      <div
        className="absolute bottom-0 left-4 right-4 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${notification.color}22, transparent)`,
        }}
      />
    </motion.div>
  )
}

export default function GlassNotification() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const reset = () => setNotifications(INITIAL_NOTIFICATIONS)

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A19]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 92% at 22% 16%, rgba(255, 138, 76, 0.22), transparent 60%),' +
            'radial-gradient(104% 82% at 80% 74%, rgba(255, 92, 120, 0.16), transparent 62%),' +
            'radial-gradient(82% 70% at 58% 34%, rgba(255, 196, 120, 0.12), transparent 56%)',
        }}
      />
      <div
        className="relative flex w-[360px] flex-col gap-2.5"
      >
        <div className="mb-1 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Bell size={20} weight="regular" className="text-white/40" />
            <span className="text-sm font-semibold text-white/60">
              Notifications
            </span>
            {notifications.length > 0 && (
              <motion.span
                layout
                className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold text-white"
                style={{
                  background: 'rgba(255, 107, 245, 0.4)',
                  border: '1px solid rgba(255, 107, 245, 0.3)',
                }}
              >
                {notifications.length}
              </motion.span>
            )}
          </div>
          {notifications.length < INITIAL_NOTIFICATIONS.length && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="cursor-pointer text-xs font-medium text-white/60 transition-colors hover:text-white/85"
            >
              Reset
            </motion.button>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          {notifications.map((n, i) => (
            <NotificationCard key={n.id} notification={n} onDismiss={dismiss} index={i} />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-12"
            >
              <span className="text-sm text-white/60">All caught up</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
