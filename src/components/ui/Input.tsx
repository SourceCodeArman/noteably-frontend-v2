import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
  icon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, description, error, icon, type = 'text', className, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const descriptionId = description ? `${inputId}-description` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'block w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none',
              icon && 'pl-10',
              error && 'border-danger focus:border-danger focus:ring-danger/60',
              className,
            )}
            {...props}
          />
        </div>
        {description && !error && (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-danger">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
