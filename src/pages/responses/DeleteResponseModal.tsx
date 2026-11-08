import { FormModal } from '../../components/modal'
import { botResponsesApi, type BotResponse } from '../../api'

interface DeleteResponseModalProps {
  item: BotResponse
  onClose: () => void
  onDeleted: () => void
}

function DeleteResponseModal({ item, onClose, onDeleted }: DeleteResponseModalProps) {
  const count = item.responses.length

  const handleSubmit = async () => {
    await botResponsesApi.remove(item._id)
    onDeleted()
  }

  return (
    <FormModal
      title="Delete response"
      submitLabel="Delete"
      submitVariant="destructive"
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage="Couldn't delete the response. Please try again."
    >
      <p>
        Are you sure you want to delete{' '}
        <span className="font-medium text-text-h">“{item.command}”</span> and its {count}{' '}
        {count === 1 ? 'response' : 'responses'}? Eris will stop replying to it. This can't be
        undone.
      </p>
    </FormModal>
  )
}

export default DeleteResponseModal
