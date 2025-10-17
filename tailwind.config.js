/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        border: 'var(--color-border)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          foreground: 'var(--color-danger-foreground)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-info-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'toast-in-bottom': {
          from: { opacity: '0', transform: 'translateY(1.25rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in-right': {
          from: { opacity: '0', transform: 'translateX(1.25rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'tooltip-in': {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'sheet-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'sheet-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'sheet-in-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'tooltip-in': 'tooltip-in 120ms ease-out forwards',
        'toast-bottom': 'fade-in 180ms ease-out forwards, toast-in-bottom 220ms ease-out forwards',
        'toast-right': 'fade-in 180ms ease-out forwards, toast-in-right 220ms ease-out forwards',
        'dialog-in': 'fade-in 180ms ease-out forwards, zoom-in 180ms ease-out forwards',
        'sheet-right': 'sheet-in-right 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sheet-left': 'sheet-in-left 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sheet-bottom': 'sheet-in-bottom 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
