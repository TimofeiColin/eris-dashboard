import type { SelectHTMLAttributes } from 'react'
import arrowIcon from '@material-symbols/svg-400/outlined/keyboard_arrow_down.svg'
import { Icon } from '../icon'

export interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  hideLabel?: boolean
}

function SelectInput({
  label,
  options,
  placeholder,
  hideLabel = false,
  className = '',
  ...props
}: SelectInputProps) {
  return (
    <label className={`block ${className}`}>
      <span className={hideLabel ? 'sr-only' : 'mb-2 block text-sm font-medium text-text-h'}>
        {label}
      </span>
      <span className="relative block">
        <select
          {...props}
          className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-sidebar py-2.5 pr-10 pl-4 text-text-h outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:opacity-60 group-data-invalid:border-danger"
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          src={arrowIcon}
          className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2"
        />
      </span>
    </label>
  )
}

export default SelectInput
