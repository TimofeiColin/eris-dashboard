import { FormModal } from '../../components/modal'
import { ErrorMessage } from '../../components/feedback'
import { colorGroupsApi, type ColorGroup } from '../../api'

interface DeleteGroupModalProps {
  group: ColorGroup
  onClose: () => void
  onDeleted: () => void
}

function DeleteGroupModal({ group, onClose, onDeleted }: DeleteGroupModalProps) {
  const hasColors = group.colorsCount > 0

  const handleSubmit = async () => {
    await colorGroupsApi.remove(group._id)
    onDeleted()
  }

  return (
    <FormModal
      title="Delete group"
      submitLabel="Delete"
      submitVariant="destructive"
      submitDisabled={hasColors}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage="Couldn't delete the group. Please try again."
    >
      {hasColors ? (
        <ErrorMessage>
          “{group.name}” still has {group.colorsCount}{' '}
          {group.colorsCount === 1 ? 'color' : 'colors'}. Move or delete them before deleting
          the group.
        </ErrorMessage>
      ) : (
        <p>
          Are you sure you want to delete{' '}
          <span className="font-medium text-text-h">“{group.name}”</span>? This can't be undone.
        </p>
      )}
    </FormModal>
  )
}

export default DeleteGroupModal
