import { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
}

const variants = {
  text: 'h-4 w-full rounded-sm',
  circular: 'aspect-square rounded-full',
  rectangular: 'rounded-md',
}

const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className={cn('relative overflow-hidden bg-surface-muted/80 text-transparent', variants[variant], className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent motion-safe:animate-shimmer motion-reduce:hidden"
      />
    </div>
  )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
