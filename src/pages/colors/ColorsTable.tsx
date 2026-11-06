import editIcon from '@material-symbols/svg-400/outlined/edit.svg'
import deleteIcon from '@material-symbols/svg-400/outlined/delete.svg'
import { Button } from '../../components/button'
import { ColorSwatch } from '../../components/color-swatch'
import { DataState } from '../../components/feedback'
import {
  MultiFilter,
  Pagination,
  Table,
  type MultiFilterField,
  type MultiFilterValue,
  type TableColumn,
} from '../../components/table'
import { colorGroupsApi, colorsApi, type ColorListItem } from '../../api'
import { useClampPage, useFetch, useListParams } from '../../hooks'

const columns: TableColumn<ColorListItem>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (color) => color.name,
    className: 'font-medium text-text-h',
  },
  {
    key: 'hex',
    header: 'Hex',
    render: (color) => (
      <span className="inline-flex items-center gap-2.5">
        <ColorSwatch color={color.hex} />
        <span className="font-mono text-sm uppercase">{color.hex}</span>
      </span>
    ),
  },
  {
    key: 'group',
    header: 'Group',
    render: (color) => color.groupName || '—',
  },
]

interface ColorsTableProps {
  onEdit: (color: ColorListItem) => void
  onDelete: (color: ColorListItem) => void
  refreshKey?: number
}

function ColorsTable({ onEdit, onDelete, refreshKey = 0 }: ColorsTableProps) {
  const list = useListParams(['name', 'groupId'])
  const { page, filters, setPage, setFilters } = list
  const name = filters.name
  const groupId = Number(filters.groupId) || undefined

  const groups = useFetch(colorGroupsApi.listNames)
  const groupOptions = (groups.data ?? []).map((g) => ({ value: String(g._id), label: g.name }))
  const groupName = groupOptions.find((o) => o.value === filters.groupId)?.label

  const filterFields: MultiFilterField[] = [
    { key: 'name', label: 'Name' },
    {
      key: 'group',
      label: 'Group',
      placeholder: 'Select a group',
      options: groupOptions,
      optionsLoading: groups.loading,
      optionsError: !!groups.error,
    },
  ]

  const activeFilter: MultiFilterValue = groupId
    ? { field: 'group', value: filters.groupId }
    : { field: 'name', value: name }

  const applyFilter = ({ field, value }: MultiFilterValue) =>
    setFilters(field === 'group' ? { groupId: value, name: '' } : { name: value, groupId: '' })

  const { data, error, loading } = useFetch(
    (signal) => colorsApi.list({ page, name: name || undefined, groupId }, signal),
    [page, name, groupId, refreshKey],
  )

  const isPastLastPage = useClampPage(
    list,
    loading || !data ? null : { totalPages: data.totalPages, isEmpty: !data.items.length },
  )

  return (
    <>
      <MultiFilter
        key={`${activeFilter.field}:${activeFilter.value}`}
        fields={filterFields}
        defaultValue={activeFilter}
        onSearch={applyFilter}
        className="mb-10"
      />

      <DataState
        loading={loading || isPastLastPage}
        error={error}
        empty={!data?.items.length}
        errorMessage="Couldn't load colors right now. Please try again later."
        emptyMessage={
          groupId
            ? `No colors in ${groupName ? `“${groupName}”` : 'this group'}.`
            : name
              ? `No colors match “${name}”.`
              : 'No colors yet.'
        }
      >
        <Table
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(color) => color._id}
          actions={(color) => (
            <>
              <Button variant="ghost" size="sm" icon={editIcon} onClick={() => onEdit(color)}>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={deleteIcon}
                onClick={() => onDelete(color)}
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

export default ColorsTable
