import { useState, type FormEvent } from 'react'
import searchIcon from '@material-symbols/svg-400/outlined/search.svg'
import closeIcon from '@material-symbols/svg-400/outlined/close.svg'
import { Button } from '../buttons'
import { TextInput } from '../inputs'

interface SingleFilterProps {
  placeholder: string
  onSearch: (value: string) => void
  defaultValue?: string
  className?: string
}

function SingleFilter({
  placeholder,
  onSearch,
  defaultValue = '',
  className = '',
}: SingleFilterProps) {
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`flex gap-3 ${className}`}>
      <TextInput
        type="search"
        label={placeholder}
        hideLabel
        icon={searchIcon}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:max-w-xs"
        trailing={
          value && (
            <Button
              variant="ghost"
              size="sm"
              icon={closeIcon}
              onClick={handleClear}
              aria-label="Clear filter"
            />
          )
        }
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

export default SingleFilter
