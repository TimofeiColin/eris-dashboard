import type { Entity, ListQuery, OkResponse, PaginatedResponse } from './common.ts'

/** `{ _id, name }`, returned by `colors-names`. */
export interface ColorName extends Entity {
  name: string
}

/** A color as stored. `group` is the id of its color group. */
export interface Color extends ColorName {
  /** `#RRGGBB`, uppercase */
  hex: string
  group: Entity['_id']
}

/** A color in the paginated list, with its group's name included. */
export interface ColorListItem extends Color {
  groupName: string
}

export type ColorsResponse = PaginatedResponse<ColorListItem>

export interface ColorsParams extends ListQuery {
  groupId?: Entity['_id']
}

/** Look a color up by id or by exact name (any case). Send one of them. */
export type FindColorQuery = { id: Entity['_id']; name?: never } | { name: string; id?: never }

export interface CreateColorBody {
  name: string
  /** `#RRGGBB`, any case; the API saves it uppercase */
  hex: string
  groupId: Entity['_id']
}

export type UpdateColorBody = CreateColorBody

export interface ColorsApi {
  /** GET color?id= | ?name=: the color, or null when none matches. */
  find(query: FindColorQuery, signal?: AbortSignal): Promise<Color | null>
  /** GET colors?page=&name=&groupId= */
  list(params?: ColorsParams, signal?: AbortSignal): Promise<ColorsResponse>
  /** GET colors-names?groupId=: names of the colors in one group. 404 if the group doesn't exist. */
  listNames(groupId: Entity['_id'], signal?: AbortSignal): Promise<ColorName[]>
  /** POST colors. 404 for an unknown group, 409 for a taken name. */
  create(body: CreateColorBody): Promise<OkResponse>
  /** PATCH colors/:id. 404 for an unknown color or group, 409 for a taken name. */
  update(id: Entity['_id'], body: UpdateColorBody): Promise<OkResponse>
  /** DELETE colors/:id. 404 for an unknown color. */
  remove(id: Entity['_id']): Promise<OkResponse>
}
