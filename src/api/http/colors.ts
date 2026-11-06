import type { Color, ColorName, ColorsApi, ColorsResponse, Entity, OkResponse } from '../contracts'
import { http } from './client.ts'

const colorPath = (id: Entity['_id']) => `colors/${encodeURIComponent(id)}`

// `color` answers 200 with `{ message }` instead of a color when nothing matches.
const isColor = (value: unknown): value is Color =>
  typeof value === 'object' && value !== null && '_id' in value

export const httpColorsApi: ColorsApi = {
  async find(query, signal) {
    const result = await http.get<unknown>('color', { params: { ...query }, signal })
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
