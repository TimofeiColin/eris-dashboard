import type { OkResponse, PaginatedResponse } from '../contracts'
import { ApiError } from '../errors.ts'

export const MOCK_DELAY_MS = 400
export const MOCK_PAGE_SIZE = 10

export function delay(ms: number = MOCK_DELAY_MS, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason)
      return
    }

    const timeout = setTimeout(resolve, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timeout)
        reject(signal.reason)
      },
      { once: true },
    )
  })
}

// Error bodies match the NestJS ones: { message, error, statusCode }
export const notFound = (message: string) =>
  new ApiError(404, 'Not Found', { message, error: 'Not Found', statusCode: 404 })

export const conflict = (message: string) =>
  new ApiError(409, 'Conflict', { message, error: 'Conflict', statusCode: 409 })

export const ok = (): OkResponse => ({ message: 'ok' })

export const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()

export function paginate<T>(items: T[], page: number): PaginatedResponse<T> {
  const totalPages = Math.ceil(items.length / MOCK_PAGE_SIZE)
  const start = (page - 1) * MOCK_PAGE_SIZE
  return {
    items: items.slice(start, start + MOCK_PAGE_SIZE),
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}
