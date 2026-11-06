import { useState } from 'react'
import { FormModal } from '../../components/modal'
import { SelectInput, TextInput } from '../../components/input'
import { ColorSwatch } from '../../components/color-swatch'
import { colorGroupsApi, colorsApi, type Color, type CreateColorBody } from '../../api'
import { useFetch } from '../../hooks'
import { countLetters, MIN_NAME_LETTERS, normalizeHex } from './validation.ts'

interface ColorFormModalProps {
  /** The color to edit. Leave it out to create a new one. */
  color?: Color
  onClose: () => void
  onSaved: () => void
}

function ColorFormModal({ color, onClose, onSaved }: ColorFormModalProps) {
  const isEdit = color !== undefined

  const [name, setName] = useState(color?.name ?? '')
  const [hex, setHex] = useState(color?.hex ?? '')
  const [groupId, setGroupId] = useState(color ? String(color.group) : '')

  const groups = useFetch(colorGroupsApi.listNames)
  const groupOptions = (groups.data ?? []).map((g) => ({ value: String(g._id), label: g.name }))

  const previewHex = normalizeHex(hex)

  const handleSubmit = async () => {
    const trimmedName = name.trim()
    if (countLetters(trimmedName) < MIN_NAME_LETTERS) {
      return `The name must contain at least ${MIN_NAME_LETTERS} letters.`
    }

    if (!previewHex) {
      return 'Enter a valid hex code, like #FF8800 or #F80.'
    }

    if (!groupId) {
      return 'Choose a group for this color.'
    }

    const body: CreateColorBody = { name: trimmedName, hex: previewHex, groupId: Number(groupId) }

    const unchanged =
      isEdit &&
      body.name === color.name &&
      body.hex === color.hex &&
      body.groupId === color.group
    if (unchanged) {
      onClose()
      return
    }

    const existing = await colorsApi.find({ name: trimmedName })
    if (existing && existing._id !== color?._id) {
      return `A color named “${trimmedName}” already exists.`
    }

    if (isEdit) await colorsApi.update(color._id, body)
    else await colorsApi.create(body)
    onSaved()
  }

  return (
    <FormModal
      title={isEdit ? 'Edit color' : 'Create color'}
      submitLabel={isEdit ? 'Save' : 'Create'}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={
        isEdit
          ? "Couldn't update the color. Please try again."
          : "Couldn't create the color. Please try again."
      }
    >
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Sunset orange"
        maxLength={90}
        autoFocus
      />
      <TextInput
        label="Hex"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="#FF8800"
        maxLength={7}
        spellCheck={false}
        autoComplete="off"
        leading={<ColorSwatch color={previewHex} />}
        className="[&_input]:font-mono [&_input]:uppercase"
      />
      <SelectInput
        label="Group"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        options={groupOptions}
        placeholder={
          groups.loading
            ? 'Loading groups…'
            : groups.error
              ? "Couldn't load groups"
              : 'Select a group'
        }
        disabled={groups.loading || !!groups.error}
      />
    </FormModal>
  )
}

export default ColorFormModal
