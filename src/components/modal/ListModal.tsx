import type { Key, ReactNode } from 'react'
import Modal from './Modal.tsx'
import { DataState } from '../feedback'
import { useFetch } from '../../hooks'

interface BaseProps<T> {
  title: string
  onClose: () => void
  getKey: (item: T, index: number) => Key
  renderItem: (item: T) => ReactNode
  errorMessage?: string
  emptyMessage?: string
}

/** Pass the items you already have, or a fetcher to load them when the modal opens. */
type ListModalProps<T> = BaseProps<T> &
  (
    | { items: T[]; fetcher?: never }
    | { fetcher: (signal: AbortSignal) => Promise<T[]>; items?: never }
  )

interface ListViewProps<T> extends BaseProps<T> {
  items: T[] | null
  loading: boolean
  error: unknown
}

function ListView<T>({
  title,
  onClose,
  items,
  loading,
  error,
  getKey,
  renderItem,
  errorMessage = "Couldn't load this list right now. Please try again later.",
  emptyMessage = 'Nothing here yet.',
}: ListViewProps<T>) {
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
          {items?.map((item, index) => (
            <li
              key={getKey(item, index)}
              className="px-4 py-3 font-medium break-words whitespace-pre-wrap text-text-h"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </DataState>
    </Modal>
  )
}

function FetchedListView<T>({
  fetcher,
  ...props
}: BaseProps<T> & { fetcher: (signal: AbortSignal) => Promise<T[]> }) {
  const { data, error, loading } = useFetch(fetcher)
  return <ListView {...props} items={data} loading={loading} error={error} />
}

function ListModal<T>({ items, fetcher, ...props }: ListModalProps<T>) {
  if (fetcher) return <FetchedListView {...props} fetcher={fetcher} />
  return <ListView {...props} items={items ?? []} loading={false} error={null} />
}

export default ListModal
