import type { ButtonHTMLAttributes } from 'react';

/* The reference code imports `Button` from `@/components/ui/button` — shadcn's
   button — and the upload did not ship it. This is that component's real contract
   as the code uses it: a `variant` and a `size`, both of which resolve to a class
   string, and everything else passed through to a native `<button>`.

   Only the variants the reference actually asks for are implemented. A `link` or
   `outline` variant nobody calls is dead flexibility. */

type Variant = 'default' | 'secondary' | 'ghost' | 'destructive';
type Size = 'default' | 'sm' | 'lg' | 'icon';

const VARIANT: Record<Variant, string> = {
  default: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

const SIZE: Record<Size, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-10 px-8',
  /* 36px, not shadcn's 32: WCAG 2.5.8 wants 24 on the short side and this repo's
     hit-area gate measures it. An icon button at h-8 w-8 passes; 36 is the size
     the reference's own `size="icon"` close buttons want next to a 24px glyph. */
  icon: 'h-9 w-9',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'default', size = 'default', className = '', ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT[variant],
        SIZE[size],
        className,
      ].join(' ')}
      {...rest}
    />
  );
}

export default Button;
