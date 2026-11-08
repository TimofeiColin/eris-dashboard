import type {
  ColorGroupName,
  ColorGroupsApi,
  ColorGroupsResponse,
  Entity,
  OkResponse,
} from '../contracts'
import { http, nullIfNotFound } from './client.ts'

const groupPath = (id: Entity['_id']) => `color-groups/${encodeURIComponent(id)}`

// When nothing matches, `color-group` answers either 404 or 200 with `{ message }`.
const isGroup = (value: unknown): value is ColorGroupName =>
  typeof value === 'object' && value !== null && '_id' in value

export const httpColorGroupsApi: ColorGroupsApi = {
  async find(query, signal) {
    const result = await nullIfNotFound(
      http.get<unknown>('color-group', { params: { ...query }, signal }),
    )
    return isGroup(result) ? result : null
  },
  
  list: (params = {}, signal) =>
    http.get<ColorGroupsResponse>('color-groups', { params: { ...params }, signal }),

  listNames: (signal) => http.get<ColorGroupName[]>('color-groups-names', { signal }),

  create: (body) => http.post<OkResponse>('color-groups', body),

  update: (id, body) => http.patch<OkResponse>(groupPath(id), body),

  remove: (id) => http.delete<OkResponse>(groupPath(id)),
}
