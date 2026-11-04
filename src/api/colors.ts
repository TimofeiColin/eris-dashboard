import { http } from './client.ts'
import type { ColorGroup } from './colorGroups.ts'

export interface Color {
  _id: number
  name: string
}

export const getColorsByGroup = (groupId: ColorGroup['_id'], signal?: AbortSignal) =>
  http.get<Color[]>('colors-by-group', { params: { groupId }, signal })
