import {
  createContext,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'
import { cn } from '../../lib/utils'

interface TabsContextValue {
  activeValue: string
  setActiveValue: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within <Tabs>')
  }
  return context
}

const sanitizeValue = (value: string) => value.replace(/[^a-zA-Z0-9\-_]/g, '-')

export interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

const Tabs = ({ defaultValue, value, onValueChange, children, className }: TabsProps) => {
  const baseId = useId()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeValue = value ?? internalValue

  const setActiveValue = (next: string) => {
    if (value === undefined) {
      setInternalValue(next)
    }
    onValueChange?.(next)
  }

  const contextValue = useMemo(() => ({ activeValue, setActiveValue, baseId }), [activeValue, baseId])

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn('space-y-4', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <div
    role="tablist"
    aria-orientation="horizontal"
    className={cn('inline-flex items-center rounded-lg border border-border bg-surface p-1', className)}
    {...props}
  />
)

export interface TabsTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  value: string
}

export const TabsTrigger = ({ value, className, children, ...props }: TabsTriggerProps) => {
  const { activeValue, setActiveValue, baseId } = useTabsContext()
  const isActive = activeValue === value
  const tabValue = sanitizeValue(value)
  const tabId = `${baseId}-tab-${tabValue}`
  const panelId = `${baseId}-panel-${tabValue}`

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tablist = event.currentTarget.parentElement
    if (!tablist) return

    const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const currentIndex = tabs.indexOf(event.currentTarget)

    let targetIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        targetIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        targetIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        event.preventDefault()
        targetIndex = 0
        break
      case 'End':
        event.preventDefault()
        targetIndex = tabs.length - 1
        break
      default:
        return
    }

    const targetTab = tabs[targetIndex]
    targetTab?.focus()
    targetTab?.click()
  }

  return (
    <button
      type="button"
      id={tabId}
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none',
        isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = ({ value, className, children, ...props }: TabsContentProps) => {
  const { activeValue, baseId } = useTabsContext()
  const isActive = activeValue === value
  const tabValue = sanitizeValue(value)
  const tabId = `${baseId}-tab-${tabValue}`
  const panelId = `${baseId}-panel-${tabValue}`

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Tabs
