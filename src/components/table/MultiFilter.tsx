import { useState, type FormEvent } from 'react'
import searchIcon from '@material-symbols/svg-400/outlined/search.svg'
import { Button } from '../button'
import { SelectInput, TextInput, type SelectOption } from '../input'

export interface MultiFilterField {
  key: string
  label: string
  placeholder?: string
  /** Turns the value field into a dropdown with these options. */
  options?: SelectOption[]
  /** Shown as the dropdown placeholder while options load. */
  optionsLoading?: boolean
  optionsError?: boolean
}

export interface MultiFilterValue {
  field: string
  value: string
}

interface MultiFilterProps {
  fields: MultiFilterField[]
  onSearch: (filter: MultiFilterValue) => void
  defaultValue?: MultiFilterValue
  className?: string
}

function MultiFilter({ fields, onSearch, defaultValue, className = '' }: MultiFilterProps) {
  const [fieldKey, setFieldKey] = useState(defaultValue?.field ?? fields[0].key)
  const [value, setValue] = useState(defaultValue?.value ?? '')

  const field = fields.find((f) => f.key === fieldKey) ?? fields[0]
  const isActive = !!defaultValue?.value

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch({ field: field.key, value: value.trim() })
  }

  const handleClear = () => {
    setValue('')
    onSearch({ field: field.key, value: '' })
  }

  const selectPlaceholder = field.optionsLoading
    ? 'Loading…'
    : field.optionsError
      ? "Couldn't load options"
      : (field.placeholder ?? 'Select…')

  return (
    <form role="search" onSubmit={handleSubmit} className={`flex flex-wrap gap-3 ${className}`}>
      <SelectInput
        label="Filter by"
        hideLabel
        value={field.key}
        onChange={(e) => {
          setFieldKey(e.target.value)
          setValue('')
        }}
        options={fields.map((f) => ({ value: f.key, label: f.label }))}
        className="w-36 shrink-0"
      />

      {field.options ? (
        <SelectInput
          key={field.key}
          label={field.label}
          hideLabel
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={field.options}
          placeholder={selectPlaceholder}
          disabled={field.optionsLoading || field.optionsError}
          className="min-w-0 flex-1 sm:max-w-xs"
        />
      ) : (
        <TextInput
          key={field.key}
          type="search"
          label={field.label}
          hideLabel
          icon={searchIcon}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={field.placeholder ?? `Filter by ${field.label.toLowerCase()}`}
          className="min-w-0 flex-1 sm:max-w-xs"
        />
      )}

      <Button type="submit">Search</Button>
      {isActive && (
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      )}
    </form>
  )
}

export default MultiFilter
