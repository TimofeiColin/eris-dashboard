import { ApiError } from '../errors.ts'

const BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

type QueryParams = Record<string, string | number | boolean | null | undefined>

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: QueryParams
  body?: unknown
}

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(path.replace(/^\//, ''), BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204) return undefined
  const contentType = res.headers.get('Content-Type') ?? ''
  return contentType.includes('application/json') ? res.json() : res.text()
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, headers, ...init } = options
  const isFormData = body instanceof FormData

  const res = await fetch(buildUrl(path, params), {
    ...init,
    method,
    headers: {
      Accept: 'application/json',
      ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
      ...(body !== undefined && !isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  })

  const data = await parseBody(res)

  if (!res.ok) throw new ApiError(res.status, res.statusText, data)

  return data as T
}

export const http = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
}

/** Resolves to null instead of throwing when the API answers 404 Not Found. */
export async function nullIfNotFound<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}
