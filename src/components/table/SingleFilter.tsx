import { useState, type FormEvent } from 'react'
import searchIcon from '@material-symbols/svg-400/outlined/search.svg'
import { Button } from '../button'
import { TextInput } from '../input'

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
  const isActive = !!defaultValue

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`flex flex-wrap gap-3 ${className}`}>
      <TextInput
        type="search"
        label={placeholder}
        hideLabel
        icon={searchIcon}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 sm:max-w-xs"
      />
      <Button type="submit">Search</Button>
      {isActive && (
        <Button variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      )}
    </form>
  )
}

export default SingleFilter
