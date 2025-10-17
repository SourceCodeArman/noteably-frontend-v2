import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none'

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
      outline:
        'border border-border bg-transparent text-foreground hover:bg-surface-muted/80 active:bg-surface-muted',
      ghost: 'bg-transparent text-foreground hover:bg-surface-muted/70 active:bg-surface-muted',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm md:text-base',
      lg: 'h-12 px-6 text-base md:text-lg',
    }

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        <span className={cn('inline-flex items-center gap-1', loading && 'opacity-90')}>{children}</span>
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
