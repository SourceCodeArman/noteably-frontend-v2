# UI Component Library

A comprehensive set of accessible, polished UI components built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ **TypeScript** - Fully typed with comprehensive prop interfaces
- ♿ **Accessible** - WCAG AA compliant with proper ARIA attributes
- ⌨️ **Keyboard Navigation** - Full keyboard support (Tab, Enter, Escape, Arrow keys)
- 🎨 **Tailwind Styled** - Uses design system tokens for consistent theming
- 🎭 **Semantic HTML** - Proper HTML elements for better accessibility
- ⚡ **Transitions** - Smooth animations that respect `prefers-reduced-motion`
- 📦 **Tree-shakeable** - Import only what you need

## Components

### Button

Button component with multiple variants and sizes, including loading state.

```tsx
import { Button } from './components/ui'

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: `'primary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `loading`: `boolean` - Shows loading spinner
- All standard button HTML attributes

---

### Input

Text input with label, description, error state, and icon support.

```tsx
import { Input } from './components/ui'
import { Mail } from 'lucide-react'

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  description="We'll never share your email"
  error="Invalid email address"
  icon={<Mail className="h-4 w-4" />}
/>
```

**Props:**
- `label`: `string` - Input label
- `description`: `string` - Help text below input
- `error`: `string` - Error message (shows red)
- `icon`: `ReactNode` - Icon to display on the left
- All standard input HTML attributes

---

### Select

Dropdown select with proper keyboard navigation.

```tsx
import { Select } from './components/ui'

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
  error="Please select a country"
/>
```

**Props:**
- `label`: `string` - Select label
- `description`: `string` - Help text
- `error`: `string` - Error message
- `options`: `SelectOption[]` - Array of options
- All standard select HTML attributes

---

### Checkbox

Checkbox with label, description, and indeterminate state support.

```tsx
import { Checkbox } from './components/ui'

<Checkbox
  label="Accept terms"
  description="You agree to our Terms of Service"
  indeterminate={false}
/>
```

**Props:**
- `label`: `string` - Checkbox label
- `description`: `string` - Help text
- `indeterminate`: `boolean` - Indeterminate state
- All standard input HTML attributes (except `type`)

---

### Badge

Small badge for status indicators.

```tsx
import { Badge } from './components/ui'

<Badge variant="success">Active</Badge>
```

**Props:**
- `variant`: `'default' | 'success' | 'warning' | 'error'` (default: `'default'`)
- All standard span HTML attributes

---

### Card

Container component with optional header, body, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Modal

Dialog overlay with focus trap and escape key support. Can also be used as a Sheet (side panel).

```tsx
import { Modal } from './components/ui'

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
  description="Dialog description"
>
  Modal content
</Modal>

// As a Sheet (side panel)
<Modal
  variant="sheet"
  side="right"
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Sheet Title"
>
  Sheet content
</Modal>
```

**Props:**
- `open`: `boolean` - Controls visibility
- `onClose`: `() => void` - Close handler
- `title`: `string` - Dialog title
- `description`: `string` - Dialog description
- `variant`: `'modal' | 'sheet'` - Display variant
- `side`: `'left' | 'right' | 'bottom'` - Sheet position
- `closeOnOverlayClick`: `boolean` - Allow closing by clicking overlay

---

### Sheet

Side panel component (wrapper around Modal with `variant="sheet"`).

```tsx
import { Sheet } from './components/ui'

<Sheet
  open={isOpen}
  onClose={() => setIsOpen(false)}
  side="right"
  title="Settings"
>
  Sheet content
</Sheet>
```

---

### Tooltip

Hover/focus triggered tooltip with positioning.

```tsx
import { Tooltip } from './components/ui'

<Tooltip content="Helpful information" placement="top">
  <button>Hover me</button>
</Tooltip>
```

**Props:**
- `content`: `ReactNode` - Tooltip content
- `placement`: `'top' | 'bottom' | 'left' | 'right'` (default: `'top'`)
- `delay`: `number` - Show delay in ms (default: `100`)
- `children`: `ReactElement` - Single child element

---

### Tabs

Horizontal tabs with keyboard navigation.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>
```

**Props:**
- `defaultValue`: `string` - Initial active tab
- `value`: `string` - Controlled value
- `onValueChange`: `(value: string) => void` - Change handler

---

### Toast

Notification component with auto-dismiss and pause on hover.

```tsx
import { ToastProvider, useToast } from './components/ui'

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// In a component
const { publish } = useToast()

publish({
  title: 'Success',
  description: 'Your changes have been saved',
  variant: 'success',
  duration: 5000,
})
```

**Toast Options:**
- `title`: `string` - Toast title
- `description`: `ReactNode` - Toast message
- `variant`: `'default' | 'success' | 'info' | 'warning' | 'error'`
- `duration`: `number` - Auto-dismiss time in ms (0 for no auto-dismiss)
- `action`: `{ label: string, onClick: () => void }` - Optional action button

---

### Skeleton

Loading placeholder with shimmer effect.

```tsx
import { Skeleton } from './components/ui'

<Skeleton variant="rectangular" className="h-24 w-full" />
<Skeleton variant="circular" className="h-12 w-12" />
<Skeleton variant="text" />
```

**Props:**
- `variant`: `'text' | 'circular' | 'rectangular'` (default: `'rectangular'`)
- All standard div HTML attributes

---

## Keyboard Navigation

All interactive components support keyboard navigation:

- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons, checkboxes, and tabs
- **Escape**: Close modals, sheets, and tooltips
- **Arrow Keys**: Navigate tabs and select options
- **Home/End**: Jump to first/last tab

## Accessibility

All components follow WCAG AA guidelines:

- Proper ARIA attributes (`role`, `aria-label`, `aria-describedby`, etc.)
- Focus indicators with visible outlines
- Semantic HTML elements
- Labels associated with form controls
- Error messages announced to screen readers
- Focus management in dialogs
- Keyboard navigation support

## Icons

Components use [Lucide React](https://lucide.dev) for icons. Install if needed:

```bash
npm install lucide-react
```

## Customization

Components use Tailwind CSS with CSS variables for theming. Customize colors in `src/index.css`:

```css
:root {
  --color-background: #020617;
  --color-foreground: #e2e8f0;
  --color-primary: #38bdf8;
  /* ... */
}
```

All components accept `className` prop for additional styling.
