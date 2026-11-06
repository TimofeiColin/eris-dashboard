import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export interface ListParams {
  page: number
  /** Value of the first filter key. */
  filter: string
  /** Values of every filter key ('' when not set). */
  filters: Record<string, string>
  setPage: (page: number, options?: { replace?: boolean }) => void
  /** Sets the first filter key and goes back to page 1. */
  setFilter: (value: string) => void
  /** Sets several filter keys at once ('' removes one) and goes back to page 1. */
  setFilters: (values: Record<string, string>) => void
}

export function useListParams(filterKeys: string | string[] = 'name'): ListParams {
  const keys = Array.isArray(filterKeys) ? filterKeys : [filterKeys]
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const filters = Object.fromEntries(keys.map((key) => [key, searchParams.get(key) ?? '']))

  const setPage: ListParams['setPage'] = (next, { replace = false } = {}) =>
    setSearchParams(
      (params) => {
        if (next > 1) params.set('page', String(next))
        else params.delete('page')
        return params
      },
      { replace },
    )

  const setFilters: ListParams['setFilters'] = (values) =>
    setSearchParams((params) => {
      for (const [key, value] of Object.entries(values)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }
      params.delete('page')
      return params
    })

  const setFilter: ListParams['setFilter'] = (value) => setFilters({ [keys[0]]: value })

  return { page, filter: filters[keys[0]], filters, setPage, setFilter, setFilters }
}

interface PageResult {
  totalPages: number
  isEmpty: boolean
}

export function useClampPage(
  { page, setPage }: Pick<ListParams, 'page' | 'setPage'>,
  result: PageResult | null,
): boolean {
  const lastPage = Math.max(result?.totalPages ?? 1, 1)
  const isPastLastPage = !!result && result.isEmpty && page > lastPage

  useEffect(() => {
    if (isPastLastPage) setPage(lastPage, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPastLastPage, lastPage])

  return isPastLastPage
}
