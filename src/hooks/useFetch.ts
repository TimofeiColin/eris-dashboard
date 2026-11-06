import { useCallback, useEffect, useState, type DependencyList } from 'react'

export interface FetchState<T> {
  data: T | null
  error: unknown
  loading: boolean
  reload: () => void
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList = [],
): FetchState<T> {
  const [state, setState] = useState<Omit<FetchState<T>, 'reload'>>({
    data: null,
    error: null,
    loading: true,
  })
  const [version, setVersion] = useState(0)
  const reload = useCallback(() => setVersion((v) => v + 1), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const controller = new AbortController()

    setState((prev) => (prev.loading && !prev.error ? prev : { ...prev, loading: true, error: null }))

    fetcher(controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error('Request failed', error)
        setState({ data: null, error, loading: false })
      })

    return () => controller.abort()
  }, [...deps, version]) // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, reload }
}
