import { useState } from 'react'
import { FormModal } from '../../components/modals'
import { TextInput } from '../../components/inputs'
import { checkColorGroupExists, updateColorGroup, type ColorGroup } from '../../api'

interface EditGroupModalProps {
  group: ColorGroup
  onClose: () => void
  onUpdated: () => void
}

function EditGroupModal({ group, onClose, onUpdated }: EditGroupModalProps) {
  const [name, setName] = useState(group.name)

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed) return 'Please enter a name.'

    if (trimmed === group.name) {
      onClose()
      return
    }

    const isSameNameDifferentCase = trimmed.toLowerCase() === group.name.toLowerCase()
    if (!isSameNameDifferentCase) {
      const { exists } = await checkColorGroupExists(trimmed)
      if (exists) return `A group named “${trimmed}” already exists.`
    }

    await updateColorGroup(group._id, { name: trimmed })
    onUpdated()
  }

  return (
    <FormModal
      title="Edit group"
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage="Couldn't update the group. Please try again."
    >
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Pastels"
        autoFocus
        onFocus={(e) => e.target.select()}
      />
    </FormModal>
  )
}

export default EditGroupModal
