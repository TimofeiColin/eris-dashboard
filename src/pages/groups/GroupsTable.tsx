import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import paletteIcon from '@material-symbols/svg-400/outlined/palette.svg'
import editIcon from '@material-symbols/svg-400/outlined/edit.svg'
import deleteIcon from '@material-symbols/svg-400/outlined/delete.svg'
import { Button } from '../../components/buttons'
import { DataState } from '../../components/feedback'
import { Pagination, SingleFilter, Table, type TableColumn } from '../../components/table'
import { getColorGroups, type ColorGroup } from '../../api'
import { useFetch } from '../../utils'

interface GroupsTableProps {
  onShowColors: (group: ColorGroup) => void
  onEdit: (group: ColorGroup) => void
  onDelete: (group: ColorGroup) => void
  refreshKey?: number
}

const columns: TableColumn<ColorGroup>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (group) => group.name,
    className: 'font-medium text-text-h',
  },
  {
    key: 'colors',
    header: 'Colors',
    render: (group) => group.colorsCount ?? '—',
    className: 'tabular-nums',
  },
]

function GroupsTable({ onShowColors, onEdit, onDelete, refreshKey = 0 }: GroupsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const filter = searchParams.get('name') ?? ''

  const setPage = (next: number, replace = false) =>
    setSearchParams(
      (params) => {
        if (next > 1) params.set('page', String(next))
        else params.delete('page')
        return params
      },
      { replace },
    )

  const applyFilter = (value: string) =>
    setSearchParams((params) => {
      if (value) params.set('name', value)
      else params.delete('name')
      params.delete('page')
      return params
    })

  const { data, error, loading } = useFetch(
    (signal) => getColorGroups({ page, name: filter || undefined }, signal),
    [page, filter, refreshKey],
  )

  const lastPage = Math.max(data?.totalPages ?? 1, 1)
  const isPastLastPage = !loading && !!data && !data.items.length && page > lastPage

  useEffect(() => {
    if (isPastLastPage) setPage(lastPage, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPastLastPage, lastPage])

  return (
    <>
      <SingleFilter
        key={filter}
        placeholder="Filter by name"
        defaultValue={filter}
        onSearch={applyFilter}
        className="mb-10"
      />

      <DataState
        loading={loading || isPastLastPage}
        error={error}
        empty={!data?.items.length}
        errorMessage="Couldn't load color groups right now. Please try again later."
        emptyMessage={
          filter
            ? `No color groups match “${filter}”.`
            : 'No color groups yet. Create one to get started.'
        }
      >
        <Table
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(group) => group._id}
          actions={(group) => (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={paletteIcon}
                onClick={() => onShowColors(group)}
              >
                Colors
              </Button>
              <Button variant="ghost" size="sm" icon={editIcon} onClick={() => onEdit(group)}>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={deleteIcon}
                onClick={() => onDelete(group)}
              >
                Delete
              </Button>
            </>
          )}
        />
      </DataState>

      {!!data?.items.length && (
        <div className="mt-4">
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
            disabled={loading}
          />
        </div>
      )}
    </>
  )
}

export default GroupsTable
