import { useState, type FormEvent, type ReactNode } from 'react'
import Modal from './Modal.tsx'
import { Button, type ButtonVariant } from '../buttons'
import { ErrorMessage } from '../feedback'

interface FormModalProps {
  title: string
  onClose: () => void
  onSubmit: () => Promise<string | void>
  children: ReactNode
  submitLabel?: string
  submitVariant?: ButtonVariant
  submitDisabled?: boolean
  errorMessage?: string
}

function FormModal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = 'Save',
  submitVariant = 'primary',
  submitDisabled = false,
  errorMessage = 'Something went wrong. Please try again.',
}: FormModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const validationError = await onSubmit()
      if (validationError) setError(validationError)
    } catch (err) {
      console.error(`${title} failed`, err)
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal title={title} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        onChange={() => setError(null)}
        noValidate
        data-invalid={error ? '' : undefined}
        className="group"
      >
        <div className="space-y-4">{children}</div>

        {error && <ErrorMessage className="mt-2">{error}</ErrorMessage>}

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant={submitVariant}
            loading={submitting}
            disabled={submitDisabled}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FormModal
