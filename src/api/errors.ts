export class ApiError extends Error {
  readonly status: number
  readonly data: unknown

  constructor(status: number, statusText: string, data: unknown) {
    super(`${status} ${statusText}`)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}
