import paletteIcon from '@material-symbols/svg-400/outlined/palette.svg'
import editIcon from '@material-symbols/svg-400/outlined/edit.svg'
import deleteIcon from '@material-symbols/svg-400/outlined/delete.svg'
import { Button } from '../../components/button'
import { DataState } from '../../components/feedback'
import { Pagination, SingleFilter, Table, type TableColumn } from '../../components/table'
import { colorGroupsApi, type ColorGroup } from '../../api'
import { useClampPage, useFetch, useListParams } from '../../hooks'

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
  const list = useListParams()
  const { page, filter, setPage, setFilter } = list

  const { data, error, loading } = useFetch(
    (signal) => colorGroupsApi.list({ page, name: filter || undefined }, signal),
    [page, filter, refreshKey],
  )

  const isPastLastPage = useClampPage(
    list,
    loading || !data ? null : { totalPages: data.totalPages, isEmpty: !data.items.length },
  )

  return (
    <>
      <SingleFilter
        key={filter}
        placeholder="Filter by name"
        defaultValue={filter}
        onSearch={setFilter}
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
