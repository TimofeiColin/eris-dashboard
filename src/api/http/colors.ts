import type { Color, ColorName, ColorsApi, ColorsResponse, Entity, OkResponse } from '../contracts'
import { http, nullIfNotFound } from './client.ts'

const colorPath = (id: Entity['_id']) => `colors/${encodeURIComponent(id)}`

// When nothing matches, `color` answers either 404 or 200 with `{ message }`.
const isColor = (value: unknown): value is Color =>
  typeof value === 'object' && value !== null && '_id' in value

export const httpColorsApi: ColorsApi = {
  async find(query, signal) {
    const result = await nullIfNotFound(
      http.get<unknown>('color', { params: { ...query }, signal }),
    )
    return isColor(result) ? result : null
  },

  list: (params = {}, signal) =>
    http.get<ColorsResponse>('colors', { params: { ...params }, signal }),

  listNames: (groupId, signal) =>
    http.get<ColorName[]>('colors-names', { params: { groupId }, signal }),

  create: (body) => http.post<OkResponse>('colors', body),

  update: (id, body) => http.patch<OkResponse>(colorPath(id), body),

  remove: (id) => http.delete<OkResponse>(colorPath(id)),
}
