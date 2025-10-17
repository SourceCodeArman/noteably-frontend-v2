type ClassValue = string | number | false | null | undefined | ClassValue[]

function toString(value: string | number): string {
  return typeof value === 'number' ? String(value) : value
}

export function cn(...inputs: ClassValue[]): string {
  const classNames: string[] = []

  const append = (value: ClassValue) => {
    if (!value) return

    if (Array.isArray(value)) {
      value.forEach(append)
      return
    }

    classNames.push(toString(value))
  }

  inputs.forEach(append)

  return classNames.join(' ')
}
