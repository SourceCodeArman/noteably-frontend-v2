import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-border bg-surface shadow-lg shadow-background/40 backdrop-blur',
      className,
    )}
    {...props}
  />
))

Card.displayName = 'Card'

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = ({ className, ...props }: CardSectionProps) => (
  <div className={cn('space-y-1.5 border-b border-border px-6 py-4', className)} {...props} />
)

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold text-foreground', className)} {...props} />
)

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
)

export const CardContent = ({ className, ...props }: CardSectionProps) => (
  <div className={cn('px-6 py-4 text-sm text-foreground', className)} {...props} />
)

export const CardFooter = ({ className, ...props }: CardSectionProps) => (
  <div
    className={cn('flex items-center justify-end gap-2 border-t border-border px-6 py-4', className)}
    {...props}
  />
)

export default Card
