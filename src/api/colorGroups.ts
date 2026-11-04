import { http } from './client.ts'

export interface ColorGroup {
  _id: number
  name: string
  colorsCount: number
}

export interface ColorGroupsResponse {
  items: ColorGroup[]
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ColorGroupsParams {
  name?: string
  page?: number
}

export interface ColorGroupExistsResponse {
  exists: boolean
}

export interface CreateColorGroupBody {
  name: string
}

export type UpdateColorGroupBody = Partial<CreateColorGroupBody>

export const getColorGroups = (params: ColorGroupsParams = {}, signal?: AbortSignal) =>
  http.get<ColorGroupsResponse>('color-groups', { params: { ...params }, signal })

export const checkColorGroupExists = (name: string, signal?: AbortSignal) =>
  http.get<ColorGroupExistsResponse>('color-group', { params: { name }, signal })

export const createColorGroup = (body: CreateColorGroupBody) =>
  http.post<ColorGroup>('color-groups', body)

export const updateColorGroup = (id: ColorGroup['_id'], body: UpdateColorGroupBody) =>
  http.patch<ColorGroup>(`color-groups/${encodeURIComponent(id)}`, body)

export const deleteColorGroup = (id: ColorGroup['_id']) =>
  http.delete<void>(`color-groups/${encodeURIComponent(id)}`)
