import chevronLeftIcon from '@material-symbols/svg-400/outlined/chevron_left.svg'
import chevronRightIcon from '@material-symbols/svg-400/outlined/chevron_right.svg'
import { Button } from '../button'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

function Pagination({ page, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const pages = Math.max(totalPages, 1)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      <span className="text-sm">
        Page <span className="font-medium text-text-h tabular-nums">{page}</span> of{' '}
        <span className="font-medium text-text-h tabular-nums">{pages}</span>
      </span>
      <div className="flex gap-2">
        <Button
          size="sm"
          icon={chevronLeftIcon}
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          iconRight={chevronRightIcon}
          disabled={disabled || page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  )
}

export default Pagination
