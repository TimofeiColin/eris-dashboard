import { useEffect, useId, useRef, type ReactNode } from 'react'
import closeIcon from '@material-symbols/svg-400/outlined/close.svg'
import { Button } from '../button'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

function Modal({ title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-bg p-0 text-text shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold text-text-h">
            {title}
          </h2>
          <Button variant="ghost" size="sm" icon={closeIcon} onClick={onClose} aria-label="Close" />
        </div>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
