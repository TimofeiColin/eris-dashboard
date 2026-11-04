import type { Key, ReactNode } from 'react'
import Modal from './Modal.tsx'
import { DataState } from '../feedback'
import { useFetch } from '../../utils'

interface ListModalProps<T> {
  title: string
  onClose: () => void
  fetcher: (signal: AbortSignal) => Promise<T[]>
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  errorMessage?: string
  emptyMessage?: string
}

function ListModal<T>({
  title,
  onClose,
  fetcher,
  getKey,
  renderItem,
  errorMessage = "Couldn't load this list right now. Please try again later.",
  emptyMessage = 'Nothing here yet.',
}: ListModalProps<T>) {
  const { data: items, error, loading } = useFetch(fetcher)

  return (
    <Modal title={title} onClose={onClose}>
      <DataState
        compact
        loading={loading}
        error={error}
        empty={!items?.length}
        errorMessage={errorMessage}
        emptyMessage={emptyMessage}
      >
        <ul className="max-h-96 divide-y divide-border overflow-y-auto rounded-xl border border-border bg-sidebar">
          {items?.map((item) => (
            <li key={getKey(item)} className="px-4 py-3 font-medium text-text-h">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </DataState>
    </Modal>
  )
}

export default ListModal
