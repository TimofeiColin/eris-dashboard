import forumIcon from '@material-symbols/svg-400/outlined/forum.svg'
import editIcon from '@material-symbols/svg-400/outlined/edit.svg'
import deleteIcon from '@material-symbols/svg-400/outlined/delete.svg'
import { Button } from '../../components/button'
import { DataState } from '../../components/feedback'
import {
  MultiFilter,
  Pagination,
  Table,
  type MultiFilterField,
  type MultiFilterValue,
  type TableColumn,
} from '../../components/table'
import { botResponsesApi, type BotResponse } from '../../api'
import { useClampPage, useFetch, useListParams } from '../../hooks'

const columns: TableColumn<BotResponse>[] = [
  {
    key: 'command',
    header: 'Command',
    render: (item) => item.command,
    className: 'font-medium text-text-h',
  },
  {
    key: 'responses',
    header: 'Responses',
    render: (item) => item.responses.length,
    className: 'tabular-nums',
  },
]

const filterFields: MultiFilterField[] = [
  { key: 'command', label: 'Command', placeholder: 'Filter by command' },
  { key: 'response', label: 'Response', placeholder: 'Filter by response text' },
]

interface ResponsesTableProps {
  onShowResponses: (item: BotResponse) => void
  onEdit: (item: BotResponse) => void
  onDelete: (item: BotResponse) => void
  refreshKey?: number
}

function ResponsesTable({
  onShowResponses,
  onEdit,
  onDelete,
  refreshKey = 0,
}: ResponsesTableProps) {
  const list = useListParams(['command', 'response'])
  const { page, filters, setPage, setFilters } = list
  const { command, response } = filters

  const activeFilter: MultiFilterValue = response
    ? { field: 'response', value: response }
    : { field: 'command', value: command }

  // Only one filter at a time: setting one clears the other.
  const applyFilter = ({ field, value }: MultiFilterValue) =>
    setFilters(field === 'response' ? { response: value, command: '' } : { command: value, response: '' })

  const { data, error, loading } = useFetch(
    (signal) =>
      botResponsesApi.list(
        { page, command: command || undefined, response: response || undefined },
        signal,
      ),
    [page, command, response, refreshKey],
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
        errorMessage="Couldn't load responses right now. Please try again later."
        emptyMessage={
          command
            ? `No commands match “${command}”.`
            : response
              ? `No responses contain “${response}”.`
              : 'No responses yet. Create one to get started.'
        }
      >
        <Table
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(item) => item._id}
          actions={(item) => (
            <>
              <Button
                variant="ghost"
                size="sm"
                icon={forumIcon}
                onClick={() => onShowResponses(item)}
              >
                Responses
              </Button>
              <Button variant="ghost" size="sm" icon={editIcon} onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={deleteIcon}
                onClick={() => onDelete(item)}
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

export default ResponsesTable
