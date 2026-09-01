import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pause,
  Play,
  ArrowCounterClockwise,
  X,
  ArrowsOutSimple,
  ArrowsInSimple,
} from '@phosphor-icons/react'

/* DIVERGENCE 4, and it is the same host difference the previous upload hit, which
   makes it a pattern rather than an incident: `src/tailwind.css` line 2 says
   "utilities only, deliberately without preflight", and line 20 lists
   `preflight.css` as NOT imported. Every Tailwind component is written against
   that reset, so in this host a bare `<button>` renders as an operating-system
   button. Measured on this card's icon buttons before the fix:

     border 2px outset rgb(0, 0, 0)  ·  appearance: auto

   The background was already right, because the upload sets it inline; only the
   chrome the reset would have removed was left. Any Tailwind-first upload landing
   here needs these three declarations, and it is cheaper to say that once than to
   rediscover it per component. */
const PREFLIGHT_BUTTON = 'appearance-none border-0 bg-transparent'

// customize: replace the simulated files and durations below
const FILES = [
  { name: 'Brand reel.mp4', durationMs: 8000 },
  { name: 'Product demo.mp4', durationMs: 12500 },
  { name: 'Hero animation.mp4', durationMs: 16000 },
]

type Status = 'uploading' | 'paused' | 'complete' | 'idle'

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 30 }
const CARD_SHADOW = '0px 16px 56px rgba(0,0,0,0.14)'

function useDarkMode(ref: React.RefObject<HTMLElement | null>) {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const scope = el.closest('[data-card-theme]') as HTMLElement | null
      if (scope) { setIsDark(scope.dataset.cardTheme === 'dark'); return }
      /* DIVERGENCE 3, and it fulfils the upload's requirement rather than changing
         it. This function's whole job is "find out whether we are dark", and it
         asked two sources: a scope attribute, then a `.dark` class. This host
         switches on `data-theme` — `src/tailwind.css` says so at line 47, "not the
         `.dark` class Tailwind assumes" — so the class check could never fire here,
         while the component's Tailwind `dark:` classes could, because the repo wires
         that variant to `[data-theme]`.

         Measured before this line existed: in the night pack the page frame went
         dark (`#1A1A19`, from `dark:bg-[#1A1A19]`) and the CARD stayed light
         (`#f1f1f0`, from the JS path) — one component split down the middle by two
         dark-mode mechanisms, only one of which this host can trigger. Two dark
         packs exist and both are named in themes.ts. */
      const pack = document.documentElement.dataset.theme
      setIsDark(
        pack === 'dark' || pack === 'night' ||
        document.documentElement.classList.contains('dark'),
      )
    }
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    return () => obs.disconnect()
  }, [ref])
  return isDark
}

export default function UploadProgress() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isDark = useDarkMode(rootRef)

  const [status, setStatus] = useState<Status>('uploading')
  const [expanded, setExpanded] = useState(false)
  const [progress, setProgress] = useState([0, 0, 0])
  const progressRef = useRef([0, 0, 0])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (status !== 'uploading') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    intervalRef.current = setInterval(() => {
      const next = progressRef.current.map((p, i) =>
        Math.min(100, p + (100 / FILES[i].durationMs) * 80)
      )
      progressRef.current = next
      setProgress([...next])
      if (next.every(p => p >= 100)) setStatus('complete')
    }, 80)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [status])

  useEffect(() => {
    if (status !== 'complete') return
    const t = setTimeout(() => {
      progressRef.current = [0, 0, 0]
      setProgress([0, 0, 0])
      setStatus('idle')
    }, 2000)
    return () => clearTimeout(t)
  }, [status])

  const overallPct = Math.round(progress.reduce((a, b) => a + b, 0) / FILES.length)
  const secondsLeft = Math.max(
    0,
    Math.round(((100 - progress[2]) / 100) * FILES[2].durationMs / 1000)
  )

  function togglePause() {
    setStatus(s => (s === 'uploading' ? 'paused' : 'uploading'))
  }

  function handleStop() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    progressRef.current = [0, 0, 0]
    setProgress([0, 0, 0])
    setStatus('idle')
  }

  function handleRefresh() {
    progressRef.current = [0, 0, 0]
    setProgress([0, 0, 0])
    setStatus('uploading')
  }

  function startUpload() {
    progressRef.current = [0, 0, 0]
    setProgress([0, 0, 0])
    setStatus('uploading')
  }

  const isDone = status === 'complete'
  const isPaused = status === 'paused'

  const cardBg = isDark ? '#262623' : '#f1f1f0'
  const titleColor = isDark ? '#f1f1ec' : '#1a1a18'
  const mutedColor = isDark ? '#9a9a94' : '#6c6c6c'
  const btnBg = isDark ? '#34342f' : '#ededea'
  const btnColor = isDark ? '#b8b8b0' : '#6c6c6c'
  const dividerColor = isDark ? '#34342f' : '#e4e4dc'
  const trackColor = isDark ? '#34342f' : '#e4e4dc'

  /* DIVERGENCE 1, forced by the compiler: `subtitle` was computed here and never
     read, because the JSX below re-implements the same sentence inline —
     `{overallPct}% · {isPaused ? 'Paused' : `${secondsLeft}s left`}`. Two
     implementations of one string, one of them dead, and `noUnusedLocals` is on
     in this repo so keeping it fails the build outright. Deleted rather than
     wired up: the live one is the one the reader sees. */

  return (
    <div ref={rootRef} className="flex min-h-screen w-full items-center justify-center bg-[#E8E8DF] px-4 dark:bg-[#1A1A19]">
      <div className="w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={SPRING}
              className="flex justify-center"
            >
              <motion.button
                onClick={startUpload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING}
                style={{
                  backgroundColor: isDark ? '#f1f1f0' : '#1a1a18',
                  color: isDark ? '#1a1a18' : '#f1f1f0',
                  borderRadius: 9999,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                }}
                className={`${PREFLIGHT_BUTTON} px-7 py-3.5 font-sans text-[15px] font-bold`}
              >
                Upload Files
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={SPRING}
              style={{
                backgroundColor: cardBg,
                borderRadius: 28,
                boxShadow: CARD_SHADOW,
                overflow: 'hidden',
                position: 'relative',
              }}
            >

              {}
              <div className="flex items-start justify-between px-6 pt-5 pb-4">
                <div className="min-w-0 flex-1 pr-3">
                  <h2
                    style={{ color: titleColor }}
                    className="font-sans text-[18px] font-bold leading-tight"
                  >
                    {isDone ? 'Upload complete' : `Uploading ${FILES.length} files`}
                  </h2>
                  <AnimatePresence mode="wait" initial={false}>
                    {!expanded && (
                      <motion.p
                        key={status}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.15 }}
                        style={{ color: mutedColor }}
                        className="mt-0.5 whitespace-nowrap font-sans text-[14px] font-medium"
                      >
                        {isDone ? 'Upload complete' : (
                          <>
                            <span className="inline-block min-w-[2.5rem] tabular-nums">
                              {overallPct}%
                            </span>
                            {' · '}
                            {isPaused ? 'Paused' : `${secondsLeft}s left`}
                          </>
                        )}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {}
                <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  {}
                  <AnimatePresence initial={false}>
                    {!isDone && (
                      <motion.div
                        key="upload-controls-left"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={SPRING}
                        className="flex items-center gap-1.5"
                      >
                        {}
                        <IconBtn onClick={togglePause} label={isPaused ? "Resume upload" : "Pause upload"} bg={btnBg} color={btnColor}>
                          <AnimatePresence mode="wait" initial={false}>
                            {isPaused ? (
                              <motion.span
                                key="play-icon"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={SPRING}
                                className="flex"
                              >
                                <Play size={15} weight="regular" />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="pause-icon"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={SPRING}
                                className="flex"
                              >
                                <Pause size={15} weight="regular" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </IconBtn>

                        {}
                        <IconBtn onClick={handleRefresh} label="Restart upload" bg={btnBg} color={btnColor}>
                          <ArrowCounterClockwise size={15} weight="regular" />
                        </IconBtn>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {}
                  <IconBtn
                    onClick={() => setExpanded(e => !e)}
                    label={expanded ? "Hide file list" : "Show file list"}
                    bg={btnBg}
                    color={btnColor}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {expanded ? (
                        <motion.span
                          key="collapse-icon"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={SPRING}
                          className="flex"
                        >
                          <ArrowsInSimple size={15} weight="regular" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="expand-icon"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={SPRING}
                          className="flex"
                        >
                          <ArrowsOutSimple size={15} weight="regular" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </IconBtn>

                  {}
                  <AnimatePresence initial={false}>
                    {!isDone && (
                      <motion.div
                        key="close-control"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={SPRING}
                        className="flex items-center"
                      >
                        {}
                        <IconBtn onClick={handleStop} label="Cancel upload" bg={btnBg} color={btnColor}>
                          <X size={15} weight="regular" />
                        </IconBtn>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="file-list"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      height: { type: 'spring', stiffness: 380, damping: 38 },
                      opacity: { duration: 0.16 },
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        backgroundColor: dividerColor,
                        marginLeft: 24,
                        marginRight: 24,
                      }}
                    />
                    {FILES.map((f, i) => {
                      const pct = Math.round(progress[i])
                      const secs = Math.max(
                        0,
                        Math.round(((100 - progress[i]) / 100) * f.durationMs / 1000)
                      )
                      const fsub = isDone
                        ? 'Complete'
                        : isPaused
                        ? `${pct}% · Paused`
                        : `${pct}% · ${secs}s left`

                      return (
                        <div key={f.name} className="px-6 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <span
                              style={{ color: titleColor }}
                              className="min-w-0 truncate font-sans text-[15px] font-bold"
                            >
                              {f.name}
                            </span>
                            <span
                              style={{ color: mutedColor }}
                              className="shrink-0 whitespace-nowrap font-sans text-[13px] font-medium"
                            >
                              {fsub}
                            </span>
                          </div>
                          <div
                            style={{ backgroundColor: trackColor }}
                            className="mt-2 h-[3px] overflow-hidden rounded-full"
                          >
                            <motion.div
                              className="h-full rounded-full"
                              animate={{
                                width: `${progress[i]}%`,
                                backgroundColor: isPaused ? '#f59e0b' : '#6366f1',
                              }}
                              transition={{
                                width: { duration: 0.08, ease: 'linear' },
                                backgroundColor: { duration: 0.35, ease: 'easeOut' },
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                    <div className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>

              {}
              <AnimatePresence initial={false}>
                {!expanded && (
                  <motion.div
                    key="bottom-bar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div style={{ backgroundColor: trackColor, height: 6, overflow: 'hidden' }}>
                      <motion.div
                        className="h-full relative overflow-hidden"
                        animate={{
                          width: `${overallPct}%`,
                          backgroundColor: isPaused ? '#f59e0b' : '#6366f1',
                        }}
                        transition={{
                          width: { duration: 0.08, ease: 'linear' },
                          backgroundColor: { duration: 0.35, ease: 'easeOut' },
                        }}
                      >
                        <motion.div
                          className="absolute inset-y-0 w-1/2"
                          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)' }}
                          animate={{ x: isPaused ? '-100%' : ['-100%', '250%'] }}
                          transition={isPaused
                            ? { duration: 0 }
                            : { duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }
                          }
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* DIVERGENCE 2, forced by a fatal gate and a real one either way. All four icon
   buttons shipped with no accessible name — measured `named: 0 of 4`, and axe
   reports `button-name x4`. A control whose entire label is a 15px glyph is
   announced as "button" and nothing else, so pause, restart, expand and cancel
   are four identical buttons to anyone not looking at them.

   `label` is required rather than optional: an optional name is a name that gets
   forgotten at the next call site. */
function IconBtn({
  onClick,
  label,
  bg,
  color,
  children,
}: {
  onClick: () => void
  label: string
  bg: string
  color: string
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      style={{ backgroundColor: bg, color }}
      className={`${PREFLIGHT_BUTTON} flex size-9 items-center justify-center rounded-full`}
    >
      {children}
    </motion.button>
  )
}
