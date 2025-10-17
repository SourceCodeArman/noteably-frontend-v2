import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: ReactNode
  placement?: TooltipPlacement
  delay?: number
  children: ReactElement
}

const GAP = 8

const Tooltip = ({ content, placement = 'top', delay = 100, children }: TooltipProps) => {
  const tooltipId = useId()
  const triggerRef = useRef<HTMLElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const openTimeoutRef = useRef<number>()
  const closeTimeoutRef = useRef<number>()

  const clearTimers = () => {
    if (openTimeoutRef.current) {
      window.clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = undefined
    }
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = undefined
    }
  }

  const showTooltip = useCallback(() => {
    clearTimers()
    openTimeoutRef.current = window.setTimeout(() => setIsOpen(true), delay)
  }, [delay])

  const hideTooltip = useCallback(() => {
    clearTimers()
    closeTimeoutRef.current = window.setTimeout(() => setIsOpen(false), 50)
  }, [])

  useEffect(() => clearTimers, [])

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    let top = 0
    let left = 0

    switch (placement) {
      case 'bottom':
        top = triggerRect.bottom + GAP
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.left - tooltipRect.width - GAP
        break
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        left = triggerRect.right + GAP
        break
      case 'top':
      default:
        top = triggerRect.top - tooltipRect.height - GAP
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        break
    }

    setPosition({
      top: top + scrollY,
      left: left + scrollX,
    })
  }, [isOpen, placement])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!triggerRef.current || triggerRef.current.contains(event.target as Node)) return
      hideTooltip()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [hideTooltip, isOpen])

  const child = Children.only(children) as ReactElement
  const childProps = child.props

  const enhancedChild = cloneElement(child, {
    ...childProps,
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node
      if (typeof child.ref === 'function') {
        child.ref(node)
      } else if (child.ref) {
        ;(child.ref as React.MutableRefObject<HTMLElement | null>).current = node
      }
    },
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(event)
      showTooltip()
    },
    onBlur: (event: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(event)
      hideTooltip()
    },
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(event)
      showTooltip()
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(event)
      hideTooltip()
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape') {
        hideTooltip()
      }
      childProps.onKeyDown?.(event)
    },
    'aria-describedby': isOpen ? tooltipId : undefined,
  })

  return (
    <>
      {enhancedChild}
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={cn(
              'pointer-events-none absolute z-[70] max-w-xs rounded-md border border-border bg-surface-muted px-2.5 py-1.5 text-xs text-foreground shadow-lg shadow-background/50 transition motion-reduce:transition-none motion-reduce:animate-none',
              'motion-safe:animate-tooltip-in',
            )}
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}

export default Tooltip
