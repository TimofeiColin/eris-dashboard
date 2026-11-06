import type { Entity, ListQuery, OkResponse, PaginatedResponse } from './common.ts'

/** A group as stored: `{ _id, name }`. Returned by `color-group` and `color-groups-names`. */
export interface ColorGroupName extends Entity {
  name: string
}

/** A group in the paginated list, with how many colors it has. */
export interface ColorGroup extends ColorGroupName {
  colorsCount: number
}

export type ColorGroupsResponse = PaginatedResponse<ColorGroup>

export type ColorGroupsParams = ListQuery

/** Look a group up by id or by exact name (any case). Send one of them. */
export type FindColorGroupQuery = { id: Entity['_id']; name?: never } | { name: string; id?: never }

export interface CreateColorGroupBody {
  name: string
}

export type UpdateColorGroupBody = CreateColorGroupBody

export interface ColorGroupsApi {
    /** GET color-group?id= | ?name=: the group, or null when none matches. */
  find(query: FindColorGroupQuery, signal?: AbortSignal): Promise<ColorGroupName | null>
  /** GET color-groups?page=&name= */
  list(params?: ColorGroupsParams, signal?: AbortSignal): Promise<ColorGroupsResponse>
  /** GET color-groups-names: every group's id and name. */
  listNames(signal?: AbortSignal): Promise<ColorGroupName[]>
  /** POST color-groups */
  create(body: CreateColorGroupBody): Promise<OkResponse>
  /** PATCH color-groups/:id */
  update(id: Entity['_id'], body: UpdateColorGroupBody): Promise<OkResponse>
  /** DELETE color-groups/:id. Fails with 409 while the group has colors. */
  remove(id: Entity['_id']): Promise<OkResponse>
}
