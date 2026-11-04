import type { ReactNode } from 'react'

interface ErrorMessageProps {
  children: ReactNode
  className?: string
}

function ErrorMessage({ children, className = '' }: ErrorMessageProps) {
  return (
    <p role="alert" className={`text-sm text-danger ${className}`}>
      {children}
    </p>
  )
}

export default ErrorMessage
