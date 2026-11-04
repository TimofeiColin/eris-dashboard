import type { Key, ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => Key
  actions?: (row: T) => ReactNode
}

function Table<T>({ columns, rows, rowKey, actions }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-sidebar">
      <table className="w-full text-left">
        <thead className="border-b border-border text-xs font-semibold tracking-widest text-accent uppercase">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-4">
                {column.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-4 text-right">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="transition hover:bg-accent-bg/50">
              {columns.map((column) => (
                <td key={column.key} className={`px-6 py-4 ${column.className ?? ''}`}>
                  {column.render(row)}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-3">
                  <div className="flex justify-end gap-2 whitespace-nowrap">{actions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
