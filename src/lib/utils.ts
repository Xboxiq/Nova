import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * shadcn's `cn`, which every shadcn component imports from `@/lib/utils`.
 *
 * Two libraries and not one, because they answer different questions:
 * `clsx` turns conditionals and arrays into a class string, and `tailwind-merge`
 * resolves conflicts *within* that string so a later `px-6` actually beats an
 * earlier `px-4` instead of both landing and the cascade deciding by source
 * order. Without the merge, every `className` prop on a shadcn component is a
 * coin flip.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
