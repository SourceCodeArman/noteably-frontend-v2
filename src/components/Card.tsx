import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

function Card({ className, children, ...rest }: CardProps) {
  const classes = [
    'bg-slate-900/70',
    'border',
    'border-slate-800/80',
    'rounded-3xl',
    'p-8',
    'shadow-lg',
    'backdrop-blur',
  ]

  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ').trim()} {...rest}>
      {children}
    </div>
  )
}

export default Card
