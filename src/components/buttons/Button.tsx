import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../icon'
import { Loader } from '../loader'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'destructive'
export type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconRight?: string
  loading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-lg shadow-accent-bg enabled:hover:brightness-110',
  secondary:
    'border border-border text-text-h enabled:hover:border-accent/40 enabled:hover:bg-accent-bg enabled:hover:text-accent',
  ghost: 'text-text enabled:hover:bg-accent-bg enabled:hover:text-accent',
  danger: 'text-text enabled:hover:bg-danger-bg enabled:hover:text-danger',
  destructive: 'bg-danger text-white shadow-lg shadow-danger-bg enabled:hover:brightness-110',
}

const sizes: Record<ButtonSize, { text: string; iconOnly: string }> = {
  sm: { text: 'gap-1.5 rounded-lg px-3 py-1.5 text-sm', iconOnly: 'rounded-lg p-1.5' },
  md: { text: 'gap-2 rounded-xl px-4 py-2.5', iconOnly: 'rounded-xl p-2.5' },
}

function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  type = 'button',
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const iconOnly = !children
  const sizeClass = iconOnly ? sizes[size].iconOnly : sizes[size].text

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${sizeClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader className={`size-5 ${variant === 'primary' || variant === 'destructive' ? 'text-white' : ''}`} />
      ) : (
        icon && <Icon src={icon} className="size-5" />
      )}
      {children}
      {iconRight && <Icon src={iconRight} className="size-5" />}
    </button>
  )
}

export default Button
