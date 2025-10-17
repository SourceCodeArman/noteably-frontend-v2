import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export type ToastVariant = 'default' | 'success' | 'info' | 'warning' | 'error'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  id?: string
  title?: string
  description?: ReactNode
  variant?: ToastVariant
  duration?: number
  action?: ToastAction
}

interface ToastInternal extends ToastOptions {
  id: string
}

interface ToastContextValue {
  toasts: ToastInternal[]
  publish: (options: ToastOptions) => string
  dismiss: (id: string) => void
  clear: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const generateId = () => Math.random().toString(36).slice(2, 10)

const iconByVariant: Record<ToastVariant, React.ComponentType<{ className?: string }> | undefined> = {
  default: Info,
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
}

const DEFAULT_DURATION = 5000

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastInternal[]>([])

  const publish = useCallback((options: ToastOptions) => {
    const id = options.id ?? generateId()
    setToasts((current) => [...current, { id, ...options }])
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const clear = useCallback(() => setToasts([]), [])

  const contextValue = useMemo(() => ({ toasts, publish, dismiss, clear }), [clear, dismiss, publish, toasts])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' && createPortal(<ToastViewport />, document.body)}
    </ToastContext.Provider>
  )
}

const ToastViewport = () => {
  const { toasts, dismiss } = useToastContext()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-3 p-4 sm:items-end sm:p-6">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: ToastInternal
  onDismiss: () => void
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const { variant = 'default', title, description, duration = DEFAULT_DURATION, action } = toast
  const Icon = iconByVariant[variant]
  const itemRef = useRef<HTMLDivElement | null>(null)
  const pauseRef = useRef(false)
  const remainingTimeRef = useRef(duration)
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (duration <= 0) return

    const startTimer = () => {
      startTimeRef.current = performance.now()
      timerRef.current = window.setTimeout(() => {
        onDismiss()
      }, remainingTimeRef.current)
    }

    const pauseTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (startTimeRef.current) {
        remainingTimeRef.current -= performance.now() - startTimeRef.current
      }
    }

    const resumeTimer = () => {
      if (remainingTimeRef.current > 0 && !pauseRef.current) {
        startTimer()
      }
    }

    startTimer()

    const node = itemRef.current
    if (!node) return

    const handlePointerEnter = () => {
      pauseRef.current = true
      pauseTimer()
    }

    const handlePointerLeave = () => {
      pauseRef.current = false
      resumeTimer()
    }

    node.addEventListener('pointerenter', handlePointerEnter)
    node.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      node.removeEventListener('pointerenter', handlePointerEnter)
      node.removeEventListener('pointerleave', handlePointerLeave)
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [duration, onDismiss])

  const role = variant === 'error' ? 'alert' : 'status'

  return (
    <div
      ref={itemRef}
      role={role}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(
        'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-lg shadow-background/50 transition motion-reduce:transition-none motion-reduce:animate-none',
        'motion-safe:animate-toast-bottom sm:motion-safe:animate-toast-right',
        toastStyles[variant],
      )}
    >
      {Icon && <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
      <div className="flex-1 space-y-1 text-sm">
        {title && <h3 className="font-semibold text-foreground">{title}</h3>}
        {description && <div className="text-muted-foreground">{description}</div>}
        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick()
              onDismiss()
            }}
            className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-foreground transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-md p-1 text-muted-foreground transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

type ToastStyleRecord = Record<ToastVariant, string>

const toastStyles: ToastStyleRecord = {
  default: 'border-border bg-surface text-foreground',
  success: 'border-success/40 bg-success/15 text-success-foreground',
  info: 'border-info/40 bg-info/15 text-info-foreground',
  warning: 'border-warning/40 bg-warning/15 text-warning-foreground',
  error: 'border-danger/40 bg-danger/15 text-danger-foreground',
}

export const useToast = () => {
  const { publish, dismiss, clear } = useToastContext()

  return {
    publish,
    dismiss,
    clear,
  }
}

export interface ToastRegionProps extends HTMLAttributes<HTMLDivElement> {}

export const ToastRegion = ({ className, ...props }: ToastRegionProps) => (
  <div
    aria-live="polite"
    aria-atomic="true"
    className={cn('fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-3 p-4', className)}
    {...props}
  />
)
