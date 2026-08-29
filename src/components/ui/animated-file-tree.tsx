"use client";

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

/* DIVERGENCE 1 of 2, forced by the compiler. The upload imports
   `AnimatePresence` beside `LayoutGroup` and `motion` and never renders it;
   `tsconfig.app.json` sets `noUnusedLocals`, so keeping it verbatim fails the
   build outright. Removing an import nothing reads changes no behaviour. */
import { LayoutGroup, motion } from "framer-motion";

import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type TreeVariant = "line" | "pill";

export interface TreeItemData {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}

interface TreeContextValue {
  selectedId: string | null;
  hoveredId: string | null;
  variant: TreeVariant;
  activeColor: string;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

const TreeContext = createContext<TreeContextValue | null>(null);

function useTreeContext() {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("Tree components must be rendered within a TreeView.");
  }

  return context;
}

function isChildActive(child: ReactNode, activeId: string | null): boolean {
  if (!activeId || !isValidElement(child)) {
    return false;
  }

  const props = child.props as { id?: string; children?: ReactNode };

  if (props.id === activeId) {
    return true;
  }

  if (props.children) {
    return Children.toArray(props.children).some((nestedChild) =>
      isChildActive(nestedChild, activeId)
    );
  }

  return false;
}

interface TreeSvgLinesProps {
  offsets: number[];
  selectedOffset: number | null;
  variant: TreeVariant;
  activeColor: string;
  className?: string;
}

export function TreeSvgLines({
  offsets,
  selectedOffset,
  variant,
  activeColor,
  className,
}: TreeSvgLinesProps) {
  if (offsets.length === 0) {
    return null;
  }

  const lastOffset = offsets[offsets.length - 1];
  const totalHeight = lastOffset + 1;
  const lastV = lastOffset - 5;

  return (
    <svg
      aria-hidden="true"
      width="12"
      height={totalHeight}
      viewBox={`0 0 12 ${totalHeight}`}
      fill="none"
      className={cn(
        "pointer-events-none absolute top-0 left-[12.5px] z-10 select-none text-border",
        className
      )}
    >
      <path d={`M0.5 0 V${lastV}`} stroke="currentColor" strokeWidth="1" />

      {offsets.map((y, index) => {
        const v = y - 5;

        return (
          <path
            key={index}
            d={`M0.5 ${v} Q0.5 ${y} 5.5 ${y} H11.5`}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}

      {variant === "line" && selectedOffset !== null && (
        <motion.path
          d={`M0.5 0 V${selectedOffset - 5} Q0.5 ${selectedOffset} 5.5 ${selectedOffset} H11.5`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={cn(activeColor)}
          initial={false}
          animate={{
            d: `M0.5 0 V${selectedOffset - 5} Q0.5 ${selectedOffset} 5.5 ${selectedOffset} H11.5`,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 35,
          }}
        />
      )}
    </svg>
  );
}

export interface TreeListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TreeList({ children, className, ...props }: TreeListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState<number[]>([]);

  const { selectedId, variant, activeColor } = useTreeContext();

  const childrenCount = Children.count(children);

  const activeIndex = useMemo(() => {
    if (!selectedId) {
      return -1;
    }

    const childArray = Children.toArray(children).filter(isValidElement);

    return childArray.findIndex((child) => isChildActive(child, selectedId));
  }, [children, selectedId]);

  const selectedOffset =
    activeIndex >= 0 && activeIndex < offsets.length
      ? offsets[activeIndex]
      : null;

  const updateOffsets = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const directChildren = Array.from(
      containerRef.current.children
    ).filter((el) => el.tagName !== "svg") as HTMLElement[];

    const newOffsets = directChildren.map((child) => child.offsetTop + 16);

    setOffsets(newOffsets);
  }, []);

  useLayoutEffect(() => {
    updateOffsets();

    if (!containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateOffsets();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [childrenCount, updateOffsets]);

  return (
    <div
      ref={containerRef}
      role="group"
      className={cn("relative flex flex-col gap-0.5", className)}
      {...props}
    >
      <TreeSvgLines
        offsets={offsets}
        selectedOffset={selectedOffset}
        variant={variant}
        activeColor={activeColor}
      />

      {children}
    </div>
  );
}

export interface TreeItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  disabled?: boolean;
}

/* DIVERGENCE 4 of 4, and it is a host difference rather than an upload defect.
   `src/tailwind.css` line 2: "Tailwind v4 — utilities only, deliberately without
   preflight", and line 20 lists `preflight.css` as NOT imported. Every Tailwind
   component assumes that reset, so without it a bare `<button>` here renders as
   an OPERATING SYSTEM button — measured on this tree's rows before the fix:

     border 2px outset rgb(0, 0, 0) · background rgb(239, 239, 239)
     border-radius 5px · font -apple-system · appearance auto
     and no stylesheet rule matched at all: those are user-agent defaults

   The upload's rows are flat by design and its classes are written against that
   baseline, so honouring the upload means supplying the baseline. It goes FIRST in
   each `cn()` so every class the upload wrote still wins over it. Measured after:
   `0px solid`, `rgba(0, 0, 0, 0)`, `appearance: none`.

   THREE PARTS OF THAT READING WERE WRONG AND ARE NOT IN THE FIX. `font:
   -apple-system` looked like a user-agent font and is the FIRST FAMILY OF THIS
   REPOSITORY'S OWN STACK — `-apple-system, BlinkMacSystemFont, "SF Pro Text",
   "IBM Plex Sans Arabic"…` — identical on the button, its parent and `body`, so
   the type was never wrong and `font-[inherit]` was dropped again after the
   measurement showed it changes nothing (tailwind-merge removes it anyway, as
   ambiguous against `font-normal`). And `border-radius: 5px` is `--radius-md`,
   which this repo maps to `var(--nova-radius-field)`: its own value, not a
   leftover. Only three declarations were actually missing. */
const PREFLIGHT_BUTTON = "appearance-none border-0 bg-transparent";

export const TreeItem = forwardRef<HTMLButtonElement, TreeItemProps>(
  (
    { id, label, icon: Icon, badge, disabled, className, onClick, ...props },
    ref
  ) => {
    const { selectedId, hoveredId, variant, activeColor, onSelect, onHover } =
      useTreeContext();

    const isSelected = selectedId === id;

    const isHovered = hoveredId === id;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onSelect(id);
      onClick?.(event);
    };

    const handleMouseEnter = () => {
      if (!disabled) {
        onHover(id);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!disabled) {
          onSelect(id);
        }
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="treeitem"
        aria-selected={isSelected}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        className={cn(
          PREFLIGHT_BUTTON,
          "group relative flex h-8 cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 pl-8 text-left text-sm outline-none transition-colors select-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isSelected
            ? variant === "line"
              ? "font-semibold text-foreground"
              : "font-medium text-foreground"
            : "font-normal text-muted-foreground",
          disabled && "cursor-not-allowed pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {variant === "pill" && isSelected && (
          <motion.div
            layoutId="tree-selected-pill"
            className="pointer-events-none absolute inset-0 z-0 rounded-md bg-secondary"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          />
        )}

        {isHovered && (variant === "line" || !isSelected) && (
          <motion.div
            layoutId="tree-hover-pill"
            className="pointer-events-none absolute inset-0 z-0 rounded-md bg-accent/60"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          />
        )}

        <div className="relative z-10 flex min-w-0 items-center gap-2">
          {Icon && (
            <Icon
              className={cn(
                "size-4 shrink-0 transition-colors duration-150",
                isSelected
                  ? variant === "line"
                    ? cn(activeColor)
                    : "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            />
          )}

          <span className="truncate leading-none transition-colors duration-150 group-hover:text-foreground">
            {label}
          </span>
        </div>

        {badge && (
          <span className="relative z-10 ml-auto shrink-0 rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold tracking-tight uppercase text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

TreeItem.displayName = "TreeItem";

export interface TreeFolderProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
  defaultExpanded?: boolean;
  children: ReactNode;
  disabled?: boolean;
}

export function TreeFolder({
  id,
  label,
  icon: CustomIcon,
  badge,
  defaultExpanded = false,
  children,
  disabled,
  className,
  ...props
}: TreeFolderProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const { hoveredId, onHover } = useTreeContext();

  const contentId = useId();

  const isHovered = hoveredId === id;

  const Icon = CustomIcon || (isExpanded ? FolderOpen : Folder);

  const handleToggle = () => {
    if (!disabled) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      onHover(id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    } else if (event.key === "ArrowRight" && !isExpanded) {
      event.preventDefault();
      setIsExpanded(true);
    } else if (event.key === "ArrowLeft" && isExpanded) {
      event.preventDefault();
      setIsExpanded(false);
    }
  };

  return (
    /* `role="none"` on the structural wrappers, and this is axe's verdict rather
       than a preference: `aria-required-children` fired in six of the seven packs,
       because `role="tree"` may own only `treeitem` and `group` and both this
       folder and every section hand it a bare `<div>`. Presentation removes the
       wrapper from the tree without touching the layout, so the folder's own
       button and the `role="group"` inside it become the tree's children — which
       is what the markup already meant. */
    <div role="none" className={cn("flex flex-col gap-0.5", className)} {...props}>
      <button
        type="button"
        role="treeitem"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        disabled={disabled}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        className={cn(
          PREFLIGHT_BUTTON,
          "group relative flex h-8 cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 pl-8 text-left text-sm font-normal text-muted-foreground outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          disabled && "cursor-not-allowed pointer-events-none opacity-40"
        )}
      >
        {isHovered && (
          <motion.div
            layoutId="tree-hover-pill"
            className="pointer-events-none absolute inset-0 z-0 rounded-md bg-accent/60"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
            }}
          />
        )}

        <div className="relative z-10 flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground" />

          <span className="truncate leading-none transition-colors duration-150 group-hover:text-foreground">
            {label}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-1">
          {badge && (
            <span className="shrink-0 rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold tracking-tight uppercase text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
              {badge}
            </span>
          )}

          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-foreground",
              isExpanded && "rotate-90"
            )}
          />
        </div>
      </button>

      {/* DIVERGENCE 2 of 2, forced by a fatal gate. The upload collapses with
          `grid-rows-[0fr]` plus `aria-hidden={!isExpanded}` — and the buttons
          inside a zero-height grid row are still in the TAB ORDER. `aria-hidden`
          over focusable content is axe's `aria-hidden-focus`, a violation this
          repository's harness treats as fatal with no allowance, and it is a real
          defect either way: a keyboard user tabs into a collapsed folder and
          lands on controls a screen reader has been told do not exist.

          `inert` is the one-word remedy and it is strictly stronger: it removes
          the subtree from the tab order AND from the accessibility tree, which
          is what `aria-hidden` was reaching for. Nothing visual changes. */}
      <div
        id={contentId}
        role="none"
        inert={!isExpanded}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out pl-4",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div role="none" className="overflow-hidden">
          <TreeList>{children}</TreeList>
        </div>
      </div>
    </div>
  );
}

export interface TreeSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
}

export function TreeSection({
  title,
  defaultExpanded = true,
  children,
  className,
}: TreeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const contentId = useId();

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div role="none" className={cn("flex flex-col gap-0.5", className)}>
      <button
        type="button"
        role="treeitem"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          PREFLIGHT_BUTTON,
          "group flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-left outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring"
        )}
      >
        <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
          {title}
        </span>

        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200 group-hover:text-foreground",
            !isExpanded && "-rotate-90"
          )}
        />
      </button>

      <div
        id={contentId}
        role="none"
        inert={!isExpanded}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div role="none" className="overflow-hidden">
          <TreeList>{children}</TreeList>
        </div>
      </div>
    </div>
  );
}

/* DIVERGENCE 3 of 3, and this one is the upload's own type error rather than a
   rule of this repository: `HTMLAttributes` already declares `onSelect` as a
   `ReactEventHandler`, and redeclaring it as `(id: string) => void` is not an
   extension but a conflict — TS2430, under any `strict` config. `Omit` is the
   standard remedy and changes nothing at runtime: the prop was always meant to
   replace the DOM one, and now it says so. */
export interface TreeViewProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  selectedId?: string;
  defaultSelectedId?: string;
  variant?: TreeVariant;
  activeColor?: string;
  onSelect?: (id: string) => void;
  children: ReactNode;
}

export function TreeView({
  selectedId: controlledSelectedId,
  defaultSelectedId,
  variant = "line",
  activeColor = "text-blue-600 dark:text-blue-500",
  onSelect: controlledOnSelect,
  children,
  className,
  ...props
}: TreeViewProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    defaultSelectedId || null
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedId =
    controlledSelectedId !== undefined
      ? controlledSelectedId
      : internalSelectedId;

  const handleSelect = useCallback(
    (id: string) => {
      if (controlledSelectedId === undefined) {
        setInternalSelectedId(id);
      }
      controlledOnSelect?.(id);
    },
    [controlledSelectedId, controlledOnSelect]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedId,
      hoveredId,
      variant,
      activeColor,
      onSelect: handleSelect,
      onHover: setHoveredId,
    }),
    [selectedId, hoveredId, variant, activeColor, handleSelect]
  );

  return (
    <TreeContext.Provider value={contextValue}>
      <LayoutGroup id="branching-tree-nav">
        <nav
          role="tree"
          aria-orientation="vertical"
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex w-full flex-col gap-0.5 px-1 select-none",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </LayoutGroup>
    </TreeContext.Provider>
  );
}
