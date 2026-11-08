import type { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hideLabel?: boolean
}

function TextArea({ label, hideLabel = false, className = '', rows = 2, ...props }: TextAreaProps) {
  return (
    <label className={`block ${className}`}>
      <span className={hideLabel ? 'sr-only' : 'mb-2 block text-sm font-medium text-text-h'}>
        {label}
      </span>
      <textarea
        rows={rows}
        {...props}
        className="block w-full resize-y rounded-xl border border-border bg-sidebar px-4 py-2.5 text-text-h placeholder:text-text outline-none transition focus:border-accent group-data-invalid:border-danger"
      />
    </label>
  )
}

export default TextArea
