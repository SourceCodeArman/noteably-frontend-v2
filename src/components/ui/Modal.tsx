import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

type SheetSide = 'left' | 'right' | 'bottom'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  variant?: 'modal' | 'sheet'
  side?: SheetSide
  closeOnOverlayClick?: boolean
}

const focusableSelectors =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])'

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  className,
  variant = 'modal',
  side = 'right',
  closeOnOverlayClick = true,
  ...props
}: ModalProps) => {
  const baseId = useId()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const labelId = title ? `${baseId}-title` : undefined
  const descriptionId = description ? `${baseId}-description` : undefined

  const wrapperClasses = useMemo(() => {
    if (variant === 'sheet') {
      if (side === 'bottom') {
        return 'items-end justify-center'
      }
      if (side === 'left') {
        return 'items-stretch justify-start'
      }
      return 'items-stretch justify-end'
    }
    return 'items-center justify-center'
  }, [side, variant])

  const contentClasses = useMemo(() => {
    if (variant === 'sheet') {
      const base =
        'relative z-[70] flex w-full flex-col border border-border bg-surface shadow-2xl shadow-background/50 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none'

      if (side === 'bottom') {
        return cn(
          base,
          'max-h-[90vh] rounded-t-lg motion-safe:animate-sheet-bottom sm:max-w-lg',
          className,
        )
      }

      if (side === 'left') {
        return cn(base, 'h-full max-w-md rounded-r-lg motion-safe:animate-sheet-left', className)
      }

      return cn(base, 'h-full max-w-md rounded-l-lg motion-safe:animate-sheet-right', className)
    }

    return cn(
      'relative z-[70] w-full max-w-lg rounded-lg border border-border bg-surface p-6 shadow-2xl shadow-background/50 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:animate-dialog-in motion-reduce:transition-none',
      className,
    )
  }, [className, side, variant])

  const headerClasses = useMemo(() => {
    if (variant === 'sheet') {
      return 'flex items-start justify-between gap-4 border-b border-border px-6 py-4'
    }
    return 'flex items-start justify-between gap-4 pb-4'
  }, [variant])

  const bodyClasses = useMemo(() => {
    if (variant === 'sheet') {
      return 'flex-1 overflow-y-auto px-6 py-4 text-foreground'
    }
    return 'mt-4 text-foreground'
  }, [variant])

  useEffect(() => {
    if (!open) return

    previousActiveElement.current = document.activeElement as HTMLElement

    const dialog = dialogRef.current
    const focusable = dialog?.querySelectorAll<HTMLElement>(focusableSelectors)
    if (focusable && focusable.length > 0) {
      focusable[0].focus()
    } else {
      dialog?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key === 'Tab' && dialog) {
        const focusableEls = dialog.querySelectorAll<HTMLElement>(focusableSelectors)
        if (!focusableEls.length) {
          event.preventDefault()
          dialog.focus()
          return
        }

        const first = focusableEls[0]
        const last = focusableEls[focusableEls.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault()
            last.focus()
          }
        } else if (document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previousActiveElement.current?.focus()
    }
  }, [onClose, open])

  if (!open) return null

  const overlay = (
    <div
      className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
      aria-hidden="true"
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose()
        }
      }}
    />
  )

  const content = (
    <div className={cn('fixed inset-0 z-[65] flex p-4 sm:p-6', wrapperClasses)}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={contentClasses}
        {...props}
      >
        <div className={headerClasses}>
          <div className="flex-1 space-y-1.5">
            {title && (
              <h2 id={labelId} className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p id={descriptionId} className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className={bodyClasses}>{children}</div>
      </div>
    </div>
  )

  return createPortal(
    <>
      {overlay}
      {content}
    </>,
    document.body,
  )
}

Modal.displayName = 'Modal'

export default Modal
