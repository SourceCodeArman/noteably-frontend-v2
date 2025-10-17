# Design System Documentation

This document outlines the design tokens and configuration for the Noteably Frontend v2 design system.

## Overview

The design system is built on Tailwind CSS with a comprehensive set of design tokens for colors, typography, spacing, shadows, and animations. It supports both light and dark modes using a class-based dark mode strategy.

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Transitions & Animations](#transitions--animations)
7. [Dark Mode](#dark-mode)
8. [Usage Examples](#usage-examples)

---

## Colors

### Primary Brand Color (Purple)

Our primary brand color is a modern purple, suitable for CTAs, links, and brand highlights.

```css
primary-50   → #f5f3ff (lightest)
primary-100  → #ede9fe
primary-200  → #ddd6fe
primary-300  → #c4b5fd
primary-400  → #a78bfa
primary-500  → #8b5cf6 (base)
primary-600  → #7c3aed (default for links)
primary-700  → #6d28d9
primary-800  → #5b21b6
primary-900  → #4c1d95
primary-950  → #2e1065 (darkest)
```

**Usage:**
```tsx
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Click me
</button>
```

### Neutral Color Scale (Slate)

Used for backgrounds, text, borders, and UI elements.

```css
neutral-50   → #f8fafc (lightest)
neutral-100  → #f1f5f9
neutral-200  → #e2e8f0
neutral-300  → #cbd5e1
neutral-400  → #94a3b8
neutral-500  → #64748b (midpoint)
neutral-600  → #475569
neutral-700  → #334155
neutral-800  → #1e293b
neutral-900  → #0f172a
neutral-950  → #020617 (darkest)
```

### Semantic Colors

Semantic color tokens automatically adapt to light and dark modes:

| Token | Purpose | Light Mode | Dark Mode |
|-------|---------|------------|-----------|
| `background` | Page background | White | neutral-950 |
| `surface` | Card/panel backgrounds | neutral-50 | neutral-900 |
| `surface-elevated` | Elevated surfaces (modals, dropdowns) | White | neutral-800 |
| `foreground` | Primary text | neutral-900 | neutral-50 |
| `muted` | Secondary text | neutral-600 | neutral-300 |
| `subtle` | Tertiary text (labels, captions) | neutral-400 | neutral-400 |
| `inverse` | Inverse text (on dark/light backgrounds) | neutral-50 | neutral-900 |
| `border` | Default borders | neutral-200 | neutral-700 |
| `border-subtle` | Subtle borders | neutral-100 | neutral-800 |
| `border-strong` | Strong borders | neutral-300 | neutral-600 |

**Usage:**
```tsx
<div className="bg-surface border border-border rounded-lg p-6">
  <h3 className="text-foreground">Card Title</h3>
  <p className="text-muted">Card description text</p>
</div>
```

---

## Typography

### Font Families

We use a system font stack for optimal performance and native feel:

- **Sans-serif (Default)**: System UI fonts (Inter, Segoe UI, etc.)
- **Heading**: Same as sans-serif, optimized for headings
- **Monospace**: Code fonts (JetBrains Mono, SF Mono, etc.)

**Usage:**
```tsx
<h1 className="font-heading">Heading</h1>
<p className="font-sans">Body text</p>
<code className="font-mono">const code = true;</code>
```

### Font Sizes

All font sizes include optimized line heights and letter spacing:

| Token | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `text-xs` | 12px | 1.1 | Fine print, labels |
| `text-sm` | 14px | 1.4 | Small UI text |
| `text-base` | 16px | 1.5 | Body text (default) |
| `text-lg` | 18px | 1.6 | Emphasized body text |
| `text-xl` | 20px | 1.6 | Large text, small headings |
| `text-2xl` | 24px | 1.55 | H6, H5 |
| `text-3xl` | 30px | 1.4 | H4, H3 |
| `text-4xl` | 36px | 1.3 | H2 |
| `text-5xl` | 48px | 1.15 | H1 |
| `text-6xl` | 60px | 1.1 | Hero headings |

### Font Weights

| Token | Weight | Use Case |
|-------|--------|----------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasized text |
| `font-semibold` | 600 | Subheadings, buttons |
| `font-bold` | 700 | Headings |
| `font-extrabold` | 800 | Display text |

### Heading Styles

Headings (h1-h6) are automatically styled via base styles in `theme.css`:

```tsx
<h1>Page Title</h1>        {/* 48px, bold, tight tracking */}
<h2>Section Title</h2>     {/* 36px, bold, tight tracking */}
<h3>Subsection</h3>        {/* 30px, semibold, tight tracking */}
<h4>Card Heading</h4>      {/* 24px, semibold, tight tracking */}
<h5>Small Heading</h5>     {/* 20px, semibold */}
<h6>Tiny Heading</h6>      {/* 18px, semibold */}
```

### Line Heights

| Token | Value | Use Case |
|-------|-------|----------|
| `leading-tight` | 1.25 | Headings |
| `leading-snug` | 1.375 | Tight body text |
| `leading-normal` | 1.5 | Default body text |
| `leading-relaxed` | 1.625 | Comfortable reading |
| `leading-loose` | 2 | Spacious text |

---

## Spacing

Our spacing scale is consistent with Tailwind's 4px base unit system. These tokens are available via named spacing utilities and align with Tailwind's numeric scale.

### Spacing Scale

| Token | Value | Pixels | Tailwind Equivalent | Use Case |
|-------|-------|--------|---------------------|----------|
| `3xs` | 0.25rem | 4px | `1` | Fine adjustments |
| `2xs` | 0.5rem | 8px | `2` | Tight spacing |
| `xs` | 0.75rem | 12px | `3` | Compact spacing |
| `sm` | 1rem | 16px | `4` | Small gaps |
| `md` | 1.5rem | 24px | `6` | Default spacing |
| `lg` | 2rem | 32px | `8` | Large gaps |
| `xl` | 3rem | 48px | `12` | Extra large spacing |
| `2xl` | 4rem | 64px | `16` | Section spacing |
| `3xl` | 6rem | 96px | `24` | Page sections |

**Tailwind Default Spacing:**

In addition to named tokens, use Tailwind's default numeric scale:

```css
0    → 0px
px   → 1px
0.5  → 2px
1    → 4px
2    → 8px
3    → 12px
4    → 16px
5    → 20px
6    → 24px
8    → 32px
10   → 40px
12   → 48px
16   → 64px
20   → 80px
24   → 96px
32   → 128px
40   → 160px
48   → 192px
56   → 224px
64   → 256px
```

**Usage Examples:**
```tsx
{/* Using named spacing tokens */}
<div className="p-md gap-sm">
  <div className="mb-xs">Tight margin</div>
  <div className="mt-2xl">Large margin</div>
</div>

{/* Using Tailwind numeric scale */}
<div className="p-6 gap-4">
  <div className="mb-3">Tight margin</div>
  <div className="mt-16">Large margin</div>
</div>
```

**Recommendations:**
- Use **named tokens** (`md`, `lg`, etc.) for component-level spacing consistency
- Use **numeric scale** (`4`, `6`, `8`) for fine-tuned layout adjustments
- Prefer consistent spacing increments (4, 8, 16, 24, 32, 48) for visual rhythm

---

## Border Radius

### Radius Scale

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `rounded-sm` | 0.25rem | 4px | Tight corners, badges |
| `rounded` / `rounded-md` | 0.375rem | 6px | Default, buttons |
| `rounded-lg` | 0.5rem | 8px | Cards, inputs |
| `rounded-xl` | 0.75rem | 12px | Large cards |
| `rounded-2xl` | 1rem | 16px | Modals, panels |
| `rounded-3xl` | 1.5rem | 24px | Hero sections |
| `rounded-full` | 9999px | ∞ | Circles, pills |

**Usage:**
```tsx
<button className="rounded-md">Button</button>
<div className="rounded-lg">Card</div>
<div className="rounded-full">Avatar</div>
```

---

## Shadows

Shadows adapt between light and dark modes (darker shadows in dark mode for better contrast).

### Shadow Scale

| Token | Use Case | Light Mode Example |
|-------|----------|--------------------|
| `shadow-sm` | Subtle elevation | Small UI elements |
| `shadow` / `shadow-md` | Default elevation | Cards, buttons (hover) |
| `shadow-lg` | Medium elevation | Dropdowns, popovers |
| `shadow-xl` | High elevation | Modals, dialogs |
| `shadow-2xl` | Maximum elevation | Hero sections, large modals |

**Usage:**
```tsx
<div className="shadow-md hover:shadow-lg transition-shadow">
  Card with hover effect
</div>
<dialog className="shadow-2xl rounded-2xl">Modal</dialog>
```

---

## Transitions & Animations

### Transition Durations

| Token | Duration | Use Case |
|-------|----------|----------|
| `duration-short` | 100ms | Quick feedback (buttons, hover states) |
| `duration` / `duration-base` | 200ms | Default transitions (most UI) |
| `duration-long` | 300ms | Smooth animations (dropdowns, modals) |
| `duration-extra-long` | 500ms | Emphasized animations |

### Easing Functions

| Token | Curve | Use Case |
|-------|-------|----------|
| `ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Default (most transitions) |
| `ease-emphasized` | cubic-bezier(0.2, 0, 0, 1) | Emphasized entrance |
| `ease-decelerated` | cubic-bezier(0, 0, 0.2, 1) | Elements entering viewport |
| `ease-accelerated` | cubic-bezier(0.4, 0, 1, 1) | Elements leaving viewport |

**Usage:**
```tsx
<button className="transition-all duration-short ease-standard hover:scale-105">
  Hover me
</button>

<div className="transition-transform duration-long ease-emphasized">
  Animated element
</div>
```

### Reduced Motion

The design system respects the `prefers-reduced-motion` media query. All animations and transitions are automatically reduced to near-instant (0.01ms) for users who prefer reduced motion.

**This is handled automatically in `theme.css`** — no additional code needed.

---

## Dark Mode

### Strategy

We use **class-based dark mode**. Add the `.dark` class to the `<html>` or `<body>` element to activate dark mode.

### Activation Example

```tsx
// Toggle dark mode
const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

// Set dark mode based on system preference
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (darkModeMediaQuery.matches) {
  document.documentElement.classList.add('dark');
}
```

### Dark Mode Variants

Use Tailwind's `dark:` variant for dark mode styles:

```tsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
  This adapts to dark mode
</div>

<button className="bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600">
  Dark mode button
</button>
```

### Semantic Color Benefits

Using semantic color tokens (background, foreground, border, etc.) automatically handles light/dark mode:

```tsx
{/* Automatically adapts - recommended approach */}
<div className="bg-surface border border-border text-foreground">
  Auto-adapting card
</div>
```

---

## Usage Examples

### Button Component

```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-short ease-standard">
  <span>Click me</span>
  <svg className="w-4 h-4" />
</button>
```

### Card Component

```tsx
<div className="bg-surface border border-border rounded-lg shadow-md p-6">
  <h3 className="text-2xl font-semibold text-foreground mb-4">Card Title</h3>
  <p className="text-muted leading-relaxed mb-6">
    Card description text that automatically adapts to light and dark modes.
  </p>
  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors duration-short">
    Action
  </button>
</div>
```

### Form Input

```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-surface border border-border rounded-md text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-short"
  placeholder="Enter text..."
/>
```

### Modal/Dialog

```tsx
<dialog className="bg-surface-elevated border border-border rounded-2xl shadow-2xl p-8 max-w-md">
  <h2 className="text-3xl font-bold text-foreground mb-4">Modal Title</h2>
  <p className="text-muted mb-6">Modal content goes here.</p>
  <div className="flex gap-3 justify-end">
    <button className="px-4 py-2 border border-border rounded-md text-muted hover:bg-surface transition-colors duration-short">
      Cancel
    </button>
    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-short">
      Confirm
    </button>
  </div>
</dialog>
```

---

## Configuration Files

- **Tailwind Config**: `tailwind.config.js` - All token definitions
- **Theme CSS**: `src/styles/theme.css` - CSS variables and base styles
- **Main CSS**: `src/index.css` - Imports theme and Tailwind

---

## Extending the Design System

### Adding Custom Colors

1. Add CSS variables to `:root` and `.dark` in `theme.css`
2. Add color tokens to `tailwind.config.js` using `withOpacityValue()`
3. Document the new color in this file

### Adding Custom Animations

1. Define keyframes in `tailwind.config.js` under `theme.extend.keyframes`
2. Create animation utilities under `theme.extend.animation`
3. Document usage patterns

### Google Fonts Integration

To use custom fonts (e.g., Google Fonts):

1. Add font link to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

2. Update CSS variables in `theme.css`:
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-heading: 'Inter', system-ui, sans-serif;
```

---

## Best Practices

1. **Use Semantic Colors**: Prefer `bg-surface`, `text-foreground`, etc. over specific neutral shades for automatic dark mode support
2. **Consistent Spacing**: Use the spacing scale (4px increments) for visual rhythm
3. **Transition Everything**: Add transitions to interactive elements for polish
4. **Respect Reduced Motion**: The system handles this automatically
5. **Test Both Modes**: Always test components in light and dark modes
6. **Maintain Contrast**: Ensure text meets WCAG AA standards (4.5:1 for body, 3:1 for headings)

---

## Accessibility

- All color combinations meet WCAG AA contrast requirements
- Reduced motion is respected system-wide
- Focus states use primary color with 2px ring
- Semantic HTML is encouraged (use `<button>`, `<input>`, etc.)

---

## Support

For questions or suggestions about the design system, please open an issue or contact the frontend team.
