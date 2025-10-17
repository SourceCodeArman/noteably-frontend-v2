import { forwardRef, SelectHTMLAttributes, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  description?: string
  error?: string
  options: SelectOption[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, description, error, options, className, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const descriptionId = description ? `${selectId}-description` : undefined
    const errorId = error ? `${selectId}-error` : undefined
    const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              'block w-full appearance-none rounded-md border border-border bg-surface px-3 py-2 pr-10 text-sm text-foreground transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none',
              error && 'border-danger focus:border-danger focus:ring-danger/60',
              className,
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
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

Select.displayName = 'Select'

export default Select
