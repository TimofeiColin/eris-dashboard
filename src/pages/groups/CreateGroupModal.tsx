import { useState } from 'react'
import { FormModal } from '../../components/modals'
import { TextInput } from '../../components/inputs'
import { checkColorGroupExists, createColorGroup } from '../../api'

interface CreateGroupModalProps {
  onClose: () => void
  onCreated: () => void
}

function CreateGroupModal({ onClose, onCreated }: CreateGroupModalProps) {
  const [name, setName] = useState('')

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed) return 'Please enter a name.'

    const { exists } = await checkColorGroupExists(trimmed)
    if (exists) return `A group named “${trimmed}” already exists.`

    await createColorGroup({ name: trimmed })
    onCreated()
  }

  return (
    <FormModal
      title="Create group"
      submitLabel="Create"
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage="Couldn't create the group. Please try again."
    >
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Pastels"
        autoFocus
      />
    </FormModal>
  )
}

export default CreateGroupModal
