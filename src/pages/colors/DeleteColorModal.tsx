import { FormModal } from '../../components/modal'
import { ColorSwatch } from '../../components/color-swatch'
import { colorsApi, type Color } from '../../api'

interface DeleteColorModalProps {
  color: Color
  onClose: () => void
  onDeleted: () => void
}

function DeleteColorModal({ color, onClose, onDeleted }: DeleteColorModalProps) {
  const handleSubmit = async () => {
    await colorsApi.remove(color._id)
    onDeleted()
  }

  return (
    <FormModal
      title="Delete color"
      submitLabel="Delete"
      submitVariant="destructive"
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage="Couldn't delete the color. Please try again."
    >
      <p>
        Are you sure you want to delete{' '}
        <span className="inline-flex items-center gap-1.5 align-bottom font-medium text-text-h">
          <ColorSwatch color={color.hex} className="size-4" />“{color.name}”
        </span>
        ? This can't be undone.
      </p>
    </FormModal>
  )
}

export default DeleteColorModal
