import type { ReactNode } from 'react'
import { Loader } from '../loader'
import ErrorMessage from './ErrorMessage.tsx'

interface DataStateProps {
  loading: boolean
  error: unknown
  empty: boolean
  errorMessage: string
  emptyMessage: ReactNode
  compact?: boolean
  children: ReactNode
}

function DataState({
  loading,
  error,
  empty,
  errorMessage,
  emptyMessage,
  compact = false,
  children,
}: DataStateProps) {
  const padding = compact ? 'py-10' : 'py-16'

  if (loading) {
    return (
      <div className={`flex justify-center ${padding}`}>
        <Loader className={compact ? 'size-8' : 'size-10'} />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage className={`text-center ${padding}`}>{errorMessage}</ErrorMessage>
  }

  if (empty) {
    return (
      <p
        className={`border border-dashed border-border text-center ${padding} ${
          compact ? 'rounded-xl' : 'rounded-2xl'
        }`}
      >
        {emptyMessage}
      </p>
    )
  }

  return children
}

export default DataState
