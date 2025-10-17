# Design System Quick Start

Get started using the Noteably design system in your components.

## Dark Mode Toggle Example

```tsx
import { useDarkMode } from '@/hooks/useDarkMode'

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md bg-surface border border-border hover:bg-surface-elevated transition-colors duration-short"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  )
}
```

## Common Component Patterns

### Button

```tsx
// Primary Button
<button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-short ease-standard">
  Primary Action
</button>

// Secondary Button
<button className="px-4 py-2 bg-surface border border-border hover:bg-surface-elevated text-foreground font-medium rounded-md transition-all duration-short ease-standard">
  Secondary Action
</button>

// Ghost Button
<button className="px-4 py-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-short">
  Ghost Action
</button>
```

### Card

```tsx
<div className="bg-surface border border-border rounded-lg shadow-md hover:shadow-lg p-6 transition-shadow duration-short">
  <h3 className="text-2xl font-semibold text-foreground mb-2">
    Card Title
  </h3>
  <p className="text-muted mb-4">
    Card description that automatically adapts to theme.
  </p>
  <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
    Learn More →
  </button>
</div>
```

### Form Input

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-foreground">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="w-full px-4 py-2 bg-surface border border-border rounded-md text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-short"
    placeholder="you@example.com"
  />
</div>
```

### Alert/Notification

```tsx
<div className="bg-surface-elevated border border-border rounded-lg shadow-lg p-4">
  <div className="flex gap-3">
    <div className="flex-shrink-0">
      <svg className="w-5 h-5 text-primary-600" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-foreground">
        Notification Title
      </h4>
      <p className="text-sm text-muted mt-1">
        Notification message content
      </p>
    </div>
  </div>
</div>
```

### Modal/Dialog

```tsx
<div className="fixed inset-0 bg-neutral-950/50 dark:bg-neutral-950/80 flex items-center justify-center p-4">
  <div className="bg-surface-elevated border border-border rounded-2xl shadow-2xl max-w-md w-full p-6">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Confirm Action
    </h2>
    <p className="text-muted mb-6">
      Are you sure you want to continue? This action cannot be undone.
    </p>
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 border border-border rounded-md text-muted hover:bg-surface transition-colors duration-short">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-short">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Badge

```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
  New
</span>
```

### Loading Spinner

```tsx
<div className="flex items-center justify-center p-8">
  <div className="w-8 h-8 border-4 border-border border-t-primary-600 rounded-full animate-spin" />
</div>
```

## Spacing Examples

```tsx
// Component spacing
<div className="space-y-md">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Grid with gaps
<div className="grid grid-cols-3 gap-lg">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// Section padding
<section className="py-3xl px-lg">
  Content
</section>
```

## Typography Examples

```tsx
// Headings (automatically styled)
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

// Body text
<p className="text-base text-muted leading-relaxed">
  Regular paragraph text
</p>

// Small text
<p className="text-sm text-subtle">
  Secondary information
</p>

// Emphasized text
<p className="text-lg font-medium text-foreground">
  Emphasized content
</p>

// Code
<code className="px-2 py-1 bg-surface border border-border rounded text-sm font-mono text-primary-600">
  const code = true
</code>
```

## Animation Examples

```tsx
// Hover effects
<button className="transform hover:scale-105 transition-transform duration-short ease-standard">
  Hover to Scale
</button>

// Fade in on mount
<div className="animate-fade-in">
  Faded in content
</div>

// Slide in from top
<div className="animate-slide-in">
  Slid in content
</div>
```

## Responsive Design

```tsx
// Mobile-first responsive spacing
<div className="px-4 md:px-8 lg:px-16">
  Content
</div>

// Responsive typography
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Best Practices

1. **Always use semantic colors** (`bg-surface`, `text-foreground`) for automatic dark mode support
2. **Add transitions to interactive elements** for polish
3. **Use consistent spacing** from the spacing scale
4. **Test in both light and dark modes**
5. **Consider mobile-first responsive design**
6. **Maintain proper heading hierarchy** (h1 → h2 → h3, etc.)

## Resources

- Full documentation: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev

---

Happy building! 🎨
