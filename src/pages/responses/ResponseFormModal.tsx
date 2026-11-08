import { useRef, useState } from 'react'
import addIcon from '@material-symbols/svg-400/outlined/add.svg'
import closeIcon from '@material-symbols/svg-400/outlined/close.svg'
import { Button } from '../../components/button'
import { FormModal } from '../../components/modal'
import { TextArea, TextInput } from '../../components/input'
import { ApiError, botResponsesApi, type BotResponse } from '../../api'
import { countLetters, MIN_COMMAND_LETTERS } from '../../lib/validation.ts'

const MAX_RESPONSES = 50

interface ResponseFormModalProps {
  /** The bot response to edit. Leave it out to create a new one. */
  item?: BotResponse
  onClose: () => void
  onSaved: () => void
}

const toRows = (texts: string[]) => texts.map((text, id) => ({ id, text }))

function ResponseFormModal({ item, onClose, onSaved }: ResponseFormModalProps) {
  const isEdit = item !== undefined

  const [command, setCommand] = useState(item?.command ?? '')
  // Each row has a stable id so removing one in the middle doesn't mix up the others.
  const [responses, setResponses] = useState(() =>
    toRows(item?.responses.length ? item.responses : ['']),
  )
  const nextRowId = useRef(responses.length)

  const addResponse = () =>
    setResponses((current) => [...current, { id: nextRowId.current++, text: '' }])

  const updateResponse = (id: number, text: string) =>
    setResponses((current) => current.map((r) => (r.id === id ? { ...r, text } : r)))

  const removeResponse = (id: number) =>
    setResponses((current) => current.filter((r) => r.id !== id))

  const handleSubmit = async () => {
    const trimmedCommand = command.trim()
    if (countLetters(trimmedCommand) < MIN_COMMAND_LETTERS) {
      return `The command must contain at least ${MIN_COMMAND_LETTERS} letters.`
    }

    const replies = responses.map((r) => r.text.trim()).filter(Boolean)
    if (!replies.length) {
      return 'Add at least one response.'
    }

    const unchanged =
      isEdit &&
      trimmedCommand === item.command &&
      replies.length === item.responses.length &&
      replies.every((reply, i) => reply === item.responses[i])
    if (unchanged) {
      onClose()
      return
    }

    const body = { command: trimmedCommand, responses: replies }
    try {
      if (isEdit) await botResponsesApi.update(item._id, body)
      else await botResponsesApi.create(body)
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return `Responses for “${trimmedCommand}” already exist.`
      }
      throw error
    }
    onSaved()
  }

  return (
    <FormModal
      title={isEdit ? 'Edit response' : 'Create response'}
      submitLabel={isEdit ? 'Save' : 'Create'}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorMessage={
        isEdit
          ? "Couldn't update the response. Please try again."
          : "Couldn't create the response. Please try again."
      }
    >
      <TextInput
        label="Command"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="e.g. good morning"
        maxLength={200}
        autoFocus
      />

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-text-h">Responses</legend>
        <ol className="max-h-72 space-y-2 overflow-y-auto">
          {responses.map((response, index) => (
            <li key={response.id} className="flex items-start gap-2">
              <TextArea
                label={`Response ${index + 1}`}
                hideLabel
                value={response.text}
                onChange={(e) => updateResponse(response.id, e.target.value)}
                placeholder={index === 0 ? 'e.g. Rise and shine! ☀️' : 'Another response'}
                maxLength={2000}
                className="min-w-0 flex-1"
              />
              <Button
                variant="ghost"
                icon={closeIcon}
                onClick={() => removeResponse(response.id)}
                disabled={responses.length === 1}
                aria-label={`Remove response ${index + 1}`}
              />
            </li>
          ))}
        </ol>
        <Button
          variant="ghost"
          size="sm"
          icon={addIcon}
          onClick={addResponse}
          disabled={responses.length >= MAX_RESPONSES}
          className="mt-2"
        >
          Add response
        </Button>
      </fieldset>
    </FormModal>
  )
}

export default ResponseFormModal
