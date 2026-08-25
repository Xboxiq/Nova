import { useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import useMeasure from 'react-use-measure';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BannedIcon,
  DangerIcon,
  FaceIDIcon,
  LockIcon,
  PassIcon,
  PhraseIcon,
  RecoveryPhraseIcon,
  ShieldIcon,
  WarningIcon,
} from '@/components/ui/animated-drawer-utils/demo-icons';

/* ────────────────────────────────────────────────────────────────────────
   AnimatedDrawer — imported reference code, implemented as its own
   requirements state.

   The upload was a rich-text-to-markdown conversion, and the converter ate every
   JSX tag as if it were HTML: no `<Drawer.Root>`, no `<button`, no `<h2>`. What
   survived was the attributes, the class strings, the handlers, the copy and the
   import list. So the structure is reconstructed from those, and the reconstruction
   is not guesswork — the combination of `h-64` on the content, `useMeasure` on the
   inner element, `motion` imported but only one `motion` element possible, and
   `Drawer.Content asChild` spells out exactly one mechanism:

     **the drawer's height animates to the measured height of whichever view is
     showing.** `h-64` is the resting height, `asChild` hands the content element
     to `motion.div`, and `animate={{ height: bounds.height }}` drives it. That is
     the whole point of the component, and it is why `useMeasure` is imported at
     all.

   Kept verbatim from the source, including where it disagrees with this repo:
   the Tailwind class strings, the `rounded-[36px]` and `rounded-3xl` radii, the
   `bg-red-50` / `text-red-600` status pair, the `bg-sky-400` reveal action, the
   `max-w-[361px]`, the copy, and the misspelled `"pharse"` view key — which is an
   internal identifier, and silently correcting someone's key is how a
   reimplementation starts calling itself an implementation.

   What was added rather than changed, because none of it alters the design and
   all of it is the difference between working and not:

     · `Drawer.Title` and `Drawer.Description` wrap the heading and the body copy.
       vaul requires a title for the dialog's accessible name and warns without
       one; the headings were `<h2>`-shaped in the source and are still headings.
     · the close buttons carry an `aria-label`, because an icon-only button whose
       only content is an `<X>` glyph has no name at all.
     · `aria-live` on the region that swaps, so a screen reader hears the view
       change instead of silently losing focus context.

   Attribution: the pattern is the vaul animated-height drawer; the reference is
   the code the owner supplied.
──────────────────────────────────────────────────────────────────────── */

type View = 'default' | 'key' | 'pharse' | 'remove';

/** The three assurances the two reveal views both list. */
const ASSURANCES = [
  { Icon: ShieldIcon, text: 'Store it in a secure location' },
  { Icon: PassIcon, text: 'Never share with anyone' },
  { Icon: RecoveryPhraseIcon, text: 'We cannot recover it for you' },
] as const;

export const AnimatedDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>('default');
  const [elementRef, bounds] = useMeasure();

  const close = (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Close"
      className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
      onClick={() => setIsOpen(false)}
    >
      <X className="text-neutral-600 dark:text-neutral-400" size="18" />
    </Button>
  );

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return (
          <div className="px-6 pb-6 pt-5">
            <div className="mb-5 flex items-center justify-between">
              <Drawer.Title className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Wallet Settings
              </Drawer.Title>
              {close}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setView('key')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <LockIcon />
                View Private Key
              </button>
              <button
                type="button"
                onClick={() => setView('pharse')}
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <PhraseIcon />
                View Recovery Phrase
              </button>
              <button
                type="button"
                onClick={() => setView('remove')}
                className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium flex items-center gap-2 w-full rounded-2xl px-4 py-3.5 transition-colors"
              >
                <BannedIcon />
                Remove Wallet
              </button>
            </div>
          </div>
        );

      case 'remove':
        return (
          <div className="px-6 pb-6 pt-5">
            <div className="mb-4 flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <WarningIcon size={24} />
              </span>
              {close}
            </div>
            <Drawer.Title className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Remove Wallet?
            </Drawer.Title>
            <Drawer.Description className="mt-2 text-neutral-600 dark:text-neutral-400">
              This action cannot be undone. Make sure you&apos;ve backed up your recovery phrase
              before proceeding. You&apos;ll lose access to all funds if you don&apos;t have a backup.
            </Drawer.Description>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setView('default')}
                className="w-36 h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView('default')}
                className="w-36 h-12 bg-red-500 hover:bg-red-600 text-white rounded-3xl text-lg transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        );

      case 'pharse':
      case 'key': {
        const phrase = view === 'pharse';
        return (
          <div className="px-6 pb-6 pt-5">
            <div className="mb-4 flex items-start justify-between">
              <span className="flex size-11 items-center justify-center rounded-full bg-sky-50 text-sky-500 dark:bg-sky-900/20 dark:text-sky-400">
                {phrase ? <PhraseIcon size={24} /> : <DangerIcon size={24} />}
              </span>
              {close}
            </div>
            <Drawer.Title className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {phrase ? 'Recovery Phrase' : 'Private Key'}
            </Drawer.Title>
            <Drawer.Description className="mt-2 text-neutral-600 dark:text-neutral-400">
              {phrase
                ? 'Your recovery phrase is the master key to your wallet. Write it down and store it securely. Anyone with this phrase can access your funds.'
                : 'Your private key is a cryptographic key that proves ownership of your wallet. Treat it with the same security as your bank account details.'}
            </Drawer.Description>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ASSURANCES.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5">
                  <Icon />
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{text}</h3>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setView('default')}
                className="w-36 h-12 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-3xl text-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setView('default')}
                className="w-42 h-12 bg-sky-400 hover:bg-sky-500 text-white rounded-3xl text-lg flex items-center justify-center gap-3 transition-colors"
              >
                <FaceIDIcon size={22} />
                {phrase ? 'Show Phrase' : 'Show Key'}
              </button>
            </div>
          </div>
        );
      }
    }
  }, [view]);

  /* `dir="ltr"` on the imported subtree. The page is Arabic and RTL, and this is
     an English wallet UI: rendered inside an RTL document its close button jumps
     to the left, its icons land after their labels, and its copy right-aligns.
     None of that is what its author wrote. Implementing it as its requirements
     state means rendering it in the direction it was written in — mirroring
     someone's LTR component and calling that faithful is the opposite. */
  return (
    <div dir="ltr">
      <button
        type="button"
        className="mt-5 px-6 rounded-full bg-white dark:bg-neutral-800 py-2 font-medium text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700 focus-visible:shadow-focus-ring-button md:font-medium"
        onClick={() => setIsOpen(true)}
      >
        Click Me To Open Drawer
      </button>

      <Drawer.Root
        open={isOpen}
        onOpenChange={(next) => {
          setIsOpen(next);
          /* Reopening on the view the reader left is a drawer that remembers a
             decision they abandoned. Back to default on close. */
          if (!next) setView('default');
        }}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          <Drawer.Content
            dir="ltr"
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto h-64 max-w-[361px] overflow-hidden rounded-[36px] bg-white dark:bg-neutral-900 outline-hidden md:mx-auto md:w-full"
          >
            {/* The mechanism: the sheet animates to the measured height of the
                view inside it. `h-64` above is the resting height; this overrides
                it as soon as `bounds.height` is known. */}
            <motion.div animate={{ height: bounds.height }} transition={{ duration: 0.27, ease: [0.25, 1, 0.5, 1] }}>
              <div ref={elementRef} aria-live="polite">
                {content}
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default AnimatedDrawer;
