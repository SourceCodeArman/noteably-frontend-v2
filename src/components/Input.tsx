import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

type BaseProps = {
  label?: string
  description?: string
  error?: string
  multiline?: boolean
  className?: string
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  multiline?: false
}

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  multiline: true
}

type InputProps = BaseProps & (TextInputProps | TextAreaProps)

function Input({
  label,
  description,
  error,
  multiline = false,
  className,
  ...controlProps
}: InputProps) {
  const classes = [
    'w-full',
    'px-4',
    'py-3',
    'bg-slate-900/60',
    'border',
    'border-slate-800/80',
    'rounded-xl',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'placeholder:text-slate-500',
    'transition',
  ]

  if (className) {
    classes.push(className)
  }

  const controlId = (controlProps as { id?: string }).id

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-slate-200" htmlFor={controlId}>
          {label}
        </label>
      ) : null}

      {multiline ? (
        <textarea
          {...(controlProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={[...classes, 'min-h-[120px]', 'resize-none']
            .join(' ')
            .trim()}
        />
      ) : (
        <input
          {...(controlProps as InputHTMLAttributes<HTMLInputElement>)}
          className={classes.join(' ').trim()}
        />
      )}

      {description ? (
        <p className="text-sm text-slate-400">{description}</p>
      ) : null}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  )
}

export default Input
