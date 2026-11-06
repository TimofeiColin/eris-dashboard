import type { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../icon'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hideLabel?: boolean
  icon?: string
  /** Custom element inside the left edge, e.g. a color swatch. */
  leading?: ReactNode
  trailing?: ReactNode
}

function TextInput({
  label,
  hideLabel = false,
  icon,
  leading,
  trailing,
  type = 'text',
  className = '',
  ...props
}: TextInputProps) {
  return (
    <label className={`block ${className}`}>
      <span className={hideLabel ? 'sr-only' : 'mb-2 block text-sm font-medium text-text-h'}>
        {label}
      </span>
      <span className="relative block">
        {icon && (
          <Icon
            src={icon}
            className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2"
          />
        )}
        {leading && !icon && (
          <span className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2">
            {leading}
          </span>
        )}
        <input
          type={type}
          {...props}
          className={`w-full rounded-xl border border-border bg-sidebar py-2.5 text-text-h placeholder:text-text outline-none transition focus:border-accent group-data-invalid:border-danger [&::-webkit-search-cancel-button]:hidden ${
            icon || leading ? 'pl-10' : 'pl-4'
          } ${trailing ? 'pr-11' : 'pr-4'}`}
        />
        {trailing && (
          <span className="absolute top-1/2 right-1.5 flex -translate-y-1/2">{trailing}</span>
        )}
      </span>
    </label>
  )
}

export default TextInput
