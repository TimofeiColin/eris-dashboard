import type { Color, ColorListItem, ColorsApi, CreateColorBody, Entity } from '../contracts'
import type { MockColor } from './data.ts'
import { getStore, nextId } from './store.ts'
import { conflict, delay, notFound, ok, paginate, sameName } from './utils.ts'

const toColor = (color: MockColor): Color => ({ ...color })

const toListItem = (color: MockColor): ColorListItem => ({
  ...toColor(color),
  groupName: getStore().colorGroups.find((g) => g._id === color.group)?.name ?? '',
})

const findColor = (id: Entity['_id']) => {
  const color = getStore().colors.find((c) => c._id === id)
  if (!color) throw notFound(`Color ${id} does not exist`)
  return color
}

const assertGroupExists = (groupId: Entity['_id']) => {
  if (!getStore().colorGroups.some((g) => g._id === groupId)) {
    throw notFound(`Color group ${groupId} does not exist`)
  }
}

const assertNameFree = (name: string, exceptId?: Entity['_id']) => {
  if (getStore().colors.some((c) => c._id !== exceptId && sameName(c.name, name))) {
    throw conflict(`Color "${name.trim()}" already exists`)
  }
}

const toFields = ({ name, hex, groupId }: CreateColorBody) => ({
  name: name.trim(),
  hex: hex.trim().toUpperCase(),
  group: groupId,
})

export const mockColorsApi: ColorsApi = {
  async find(query, signal) {
    await delay(undefined, signal)
    const color = getStore().colors.find((c) =>
      query.id !== undefined ? c._id === query.id : sameName(c.name, query.name),
    )
    return color ? toColor(color) : null
  },

  async list({ name, groupId, page = 1 } = {}, signal) {
    await delay(undefined, signal)

    const query = name?.trim().toLowerCase()
    const matches = getStore().colors.filter(
      (c) =>
        (!query || c.name.toLowerCase().includes(query)) &&
        (groupId === undefined || c.group === groupId),
    )

    return paginate(matches.map(toListItem), page)
  },

  async listNames(groupId, signal) {
    await delay(undefined, signal)
    assertGroupExists(groupId)
    return getStore()
      .colors.filter((c) => c.group === groupId)
      .map(({ _id, name }) => ({ _id, name }))
  },

  async create(body) {
    await delay()
    assertGroupExists(body.groupId)
    assertNameFree(body.name)

    const store = getStore()
    store.colors = [...store.colors, { _id: nextId(store.colors), ...toFields(body) }]
    return ok()
  },

  async update(id, body) {
    await delay()
    findColor(id)
    assertGroupExists(body.groupId)
    assertNameFree(body.name, id)

    const store = getStore()
    store.colors = store.colors.map((c) => (c._id === id ? { ...c, ...toFields(body) } : c))
    return ok()
  },

  async remove(id) {
    await delay()
    findColor(id)

    const store = getStore()
    store.colors = store.colors.filter((c) => c._id !== id)
    return ok()
  },
}
