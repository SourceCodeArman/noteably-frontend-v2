import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors motion-reduce:transition-none'

    const variants = {
      default: 'border-border bg-surface-muted text-muted-foreground',
      success: 'border-success/40 bg-success/15 text-success-foreground',
      warning: 'border-warning/40 bg-warning/15 text-warning-foreground',
      error: 'border-danger/40 bg-danger/15 text-danger-foreground',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'

export default Badge
