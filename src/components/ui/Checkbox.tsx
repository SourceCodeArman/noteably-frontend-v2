import { forwardRef, InputHTMLAttributes, useEffect, useId, useRef } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  indeterminate?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, description, indeterminate, className, checked, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id ?? generatedId
    const descriptionId = description ? `${checkboxId}-description` : undefined
    const internalRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      const element = (ref && 'current' in ref ? ref.current : null) ?? internalRef.current
      if (!element) return
      element.indeterminate = Boolean(indeterminate)
    }, [indeterminate, ref])

    const resolvedRef = (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex h-5 w-5 items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={resolvedRef}
            checked={checked}
            className={cn(
              'peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded border border-border bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none',
              className,
            )}
            aria-describedby={descriptionId}
            {...props}
          />
          <span className="pointer-events-none flex h-5 w-5 items-center justify-center rounded border border-transparent bg-primary text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100 peer-indeterminate:opacity-100 motion-reduce:transition-none">
            {indeterminate ? (
              <Minus className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Check className="h-3 w-3" aria-hidden="true" />
            )}
          </span>
        </div>
        {(label || description) && (
          <label htmlFor={checkboxId} className="cursor-pointer space-y-1 text-sm">
            {label && <span className="block font-medium text-foreground">{label}</span>}
            {description && (
              <span id={descriptionId} className="block text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
