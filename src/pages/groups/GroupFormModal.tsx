import { useRef, useState } from 'react'
import { FormModal } from '../../components/modal'
import { TextInput } from '../../components/input'
import { colorGroupsApi, type ColorGroupName } from '../../api'

interface GroupFormModalProps {
  /** The group to edit. Leave it out to create a new one. */
  group?: ColorGroupName
  onClose: () => void
  onSaved: () => void
}

function GroupFormModal({ group, onClose, onSaved }: GroupFormModalProps) {
  const isEdit = group !== undefined
  const [name, setName] = useState(group?.name ?? '')
  const selectedOnce = useRef(false)

  const handleSubmit = async () => {
    const trimmed = name.trim()
    if (!trimmed) return 'Please enter a name.'

    if (isEdit && trimmed === group.name) {
      onClose()
      return
    }

    const existing = await colorGroupsApi.find({ name: trimmed })
    if (existing && existing._id !== group?._id) {
      return `A group named “${trimmed}” already exists.`
    }

    if (isEdit) await colorGroupsApi.update(group._id, { name: trimmed })
    else await colorGroupsApi.create({ name: trimmed })
    onSaved()
  }

  return (
    <FormModal
      title={isEdit ? 'Edit group' : 'Create group'}
      submitLabel={isEdit ? 'Save' : 'Create'}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={
        isEdit
          ? "Couldn't update the group. Please try again."
          : "Couldn't create the group. Please try again."
      }
    >
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Pastels"
        maxLength={100}
        autoFocus
        onFocus={(e) => {
          // When editing, select the current name once so typing replaces it.
          if (isEdit && !selectedOnce.current) {
            selectedOnce.current = true
            e.target.select()
          }
        }}
      />
    </FormModal>
  )
}

export default GroupFormModal
