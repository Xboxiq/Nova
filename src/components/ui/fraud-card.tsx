"use client";
import { cn } from "@/lib/utils";
import { TbCircleDotted } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";

type BlockedEmail = {
  email: string;
  time: string;
};

type FraudCardProps = {
  blockedEmails: BlockedEmail[];
};

/**
 * THE BEAM'S GEOMETRY, WRITTEN ONCE.
 *
 * The upload names three classes — `clbeam-container`, `clbeam`, `clbeam-line-1`
 * — and defines none of them, here or anywhere: `grep -rn clbeam src/` returns
 * nothing but this file. They are not decoration. The red circle they were meant
 * to drive sits at `cx=0 cy=0`, revealed only where it overlaps a mask cut from
 * the line, so with no rule to move it the card's signature effect is a static
 * smudge at the top of the wire. The CSS did not arrive with the component.
 *
 * So the motion below is AUTHORED HERE, and says so. It is the smallest thing
 * that satisfies what the markup plainly intends — a beam travelling down the
 * wire — and it is driven by `offset-path`, which follows the real path rather
 * than approximating it with two translations.
 *
 * And the path itself is now a constant. The upload already wrote these
 * coordinates TWICE, once for the visible line and once for the mask; giving the
 * beam a third copy is how a drawing starts disagreeing with itself. One
 * declaration, three readers.
 */
const BEAM_PATH = "M 3.7 0 v 5.8 l 6.7 5.9 v 60";

const FraudCard = ({ blockedEmails }: FraudCardProps) => {
  const [hovered, setHovered] = useState(false);
  /* The repository's reduced-motion blanket is CSS — `animation-duration: 1ms` —
     and it cannot reach an animation JavaScript drives frame by frame. An
     infinite beam would keep running for a reader who asked for stillness, so
     the hook that motion publishes for exactly this is read here. */
  const stillness = useReducedMotion();

  const parentvariant = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    close: {
      transition: {
        staggerChildren: 0.075,
        delayChildren: 0.15,
      },
    },
  };

  const emailvariant = {
    open: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      filter: "blur(10px)",
      y: 5,
      transition: { duration: 0.3 },
    },
  };

  const iconvariant = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.3 },
    },
  };

  const timevariant = {
    open: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3 },
    },
    close: {
      opacity: 0,
      filter: "blur(5px)",
      y: 10,
      transition: { duration: 0.3 },
    },
  };

  const circlevariant: Variants = {
    open: {
      rotate: stillness ? 0 : 360,
      transition: {
        ease: "linear",
        duration: 2.5,
        repeat: stillness ? 0 : Number.POSITIVE_INFINITY,
      },
    },
    close: {
      rotate: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
        repeat: 0,
      },
    },
  };

  return (
    <motion.div
      /* The upload toggles the whole card on click with no role, no tabIndex and
         no key handler, so every reader on a keyboard sees only the closed state.
         A button is what a thing you press is: the element keeps its layout
         classes and gains the reset this host does not ship (`tailwind.css`:
         "utilities only, deliberately without preflight"), a name, and Enter and
         Space for free. `aria-expanded` reports the state the hover was hiding. */
      role="button"
      tabIndex={0}
      aria-expanded={hovered}
      /* The em dash I first wrote here was caught by this repo's own rule 23 — my
         addition tripping my own gate, and the fourth time this session. */
      aria-label="Email security enhancements: blocked addresses"
      onClick={() => setHovered((prev) => !prev)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setHovered((prev) => !prev);
        }
      }}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      variants={parentvariant}
      animate={hovered ? "open" : "close"}
      initial="close"
      className={cn(
        "appearance-none border-0 bg-transparent p-0 text-start",
        "h-[34rem] min-h-[34rem] w-[350px] max-w-[350px]",
        "group overflow-hidden border shadow-md",
        "clbeam-container relative flex flex-col items-center",
        "rounded-md bg-neutral-50 text-white dark:bg-neutral-900",
      )}
    >
      <div className={cn("flex flex-col gap-2 px-4 pt-4")}>
        {/* `text-primary` is `--color-primary`, which this repo maps to
            `--nova-action` — the FILL of the action family, on a card whose ground
            the upload hardcodes to `bg-neutral-50`. Measured: 5.05 in the default
            pack and **2.25 in mint**, whose action colour is a light teal.

            This is the one pair in the card I am obliged to fix rather than carry:
            the ground is the author's and the INK IS MINE, so "nothing of mine to
            remove" does not hold. `--nova-action-ink` is the ink sibling the token
            system publishes for exactly this, and it is the same fill-for-ink
            correction made in fourteen other places in this repository today. */}
        <h2 className="text-[14px] font-bold text-[var(--nova-action-ink)]">
          Email Security Enhancements
        </h2>
        <p className="text-[11px] text-neutral-500 sm:text-xs">
          Improve account integrity and reduce fake registrations by identifying
          temporary inboxes and filtering suspicious patterns in email addresses
          used.
        </p>
      </div>
      <div className="relative flex h-full w-[300px] flex-col">
        <div className="mt-8 py-3">
          <div className="relative z-[10] flex items-center justify-center gap-2 rounded-[6px] bg-neutral-50 p-0.5 shadow-md dark:bg-black">
            <div className="flex h-full w-full items-center justify-between gap-3 rounded-[4px] bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="flex items-center justify-center gap-4">
                <motion.div variants={circlevariant} className="h-4 w-4">
                  <TbCircleDotted className="h-full w-full text-primary" />
                </motion.div>
                <p className="font-mono text-[10px] text-neutral-600 transition-all duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
                  Malicious email activity flagged
                </p>
              </div>
              <p className="text-[10px] text-neutral-500">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full">
          <svg
            aria-hidden="true"
            className="h-full w-full stroke-current text-neutral-400 dark:text-neutral-700"
            width="100%"
            height="100%"
            viewBox="0 0 52 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0.1">
              <path d={BEAM_PATH} />
            </g>
            <g mask="url(#clbeam-mask-1)">
              <motion.circle
                className="clbeam clbeam-line-1"
                cx="0"
                cy="0"
                r="12"
                fill="url(#clbeam-red-grad)"
                style={{ offsetPath: `path("${BEAM_PATH}")`, offsetRotate: "0deg" }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: stillness ? "0%" : "100%" }}
                transition={
                  stillness
                    ? { duration: 0 }
                    : { duration: 4, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.6 }
                }
              />
            </g>
            <defs>
              <mask id="clbeam-mask-1">
                <path
                  d={BEAM_PATH}
                  stroke="white"
                  strokeWidth="0.15"
                />
              </mask>
              <radialGradient id="clbeam-red-grad" fx="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute inset-x-12 top-[130px] flex w-fit flex-col items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center gap-9">
            {blockedEmails.map(({ email, time }) => (
              <div key={email} className="flex h-full w-full justify-start">
                <div className="relative mr-2 mt-1.5 h-6 w-6">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                    <GoDotFill className="h-2.5 w-2.5 text-neutral-400 dark:text-neutral-500" />
                  </div>
                  <motion.div
                    variants={iconvariant}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-red-500 p-1"
                  >
                    <RxCross2 className="h-4 w-4 text-neutral-100 dark:text-neutral-800" />
                  </motion.div>
                </div>
                <div className="flex flex-col items-start justify-center gap-1 p-1">
                  <motion.h2
                    variants={emailvariant}
                    className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200 sm:text-xs"
                  >
                    {email}
                  </motion.h2>
                  <motion.p
                    variants={timevariant}
                    className="font-mono text-[9px] text-neutral-500"
                  >
                    Blocked {time}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FraudCard;
