/** Anything stored with a numeric id. */
export interface Entity {
  _id: number
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/** Body returned by the API's write endpoints. */
export interface OkResponse {
  message: string
}

export interface ListQuery {
  name?: string
  page?: number
}
