import type { ColorGroup, ColorGroupName, ColorGroupsApi, Entity } from '../contracts'
import { getStore, nextId } from './store.ts'
import type { MockColorGroup } from './data.ts'
import { conflict, delay, notFound, ok, paginate, sameName } from './utils.ts'

const toName = ({ _id, name }: MockColorGroup): ColorGroupName => ({ _id, name })

const toColorGroup = (group: MockColorGroup): ColorGroup => ({
  ...toName(group),
  colorsCount: getStore().colors.filter((color) => color.group === group._id).length,
})

const findGroup = (id: Entity['_id']) => {
  const group = getStore().colorGroups.find((g) => g._id === id)
  if (!group) throw notFound(`Color group ${id} does not exist`)
  return group
}

const assertNameFree = (name: string, exceptId?: Entity['_id']) => {
  if (getStore().colorGroups.some((g) => g._id !== exceptId && sameName(g.name, name))) {
    throw conflict(`Color group "${name.trim()}" already exists`)
  }
}

export const mockColorGroupsApi: ColorGroupsApi = {
  async find(query, signal) {
    await delay(undefined, signal)
    const group = getStore().colorGroups.find((g) =>
      query.id !== undefined ? g._id === query.id : sameName(g.name, query.name),
    )
    return group ? toName(group) : null
  },
  
  async list({ name, page = 1 } = {}, signal) {
    await delay(undefined, signal)

    const query = name?.trim().toLowerCase()
    const matches = query
      ? getStore().colorGroups.filter((g) => g.name.toLowerCase().includes(query))
      : getStore().colorGroups

    return paginate(matches.map(toColorGroup), page)
  },

  async listNames(signal) {
    await delay(undefined, signal)
    return getStore().colorGroups.map(toName)
  },

  async create({ name }) {
    await delay()
    assertNameFree(name)

    const group: MockColorGroup = { _id: nextId(getStore().colorGroups), name: name.trim() }
    getStore().colorGroups = [...getStore().colorGroups, group]
    return ok()
  },

  async update(id, { name }) {
    await delay()
    findGroup(id)
    assertNameFree(name, id)

    getStore().colorGroups = getStore().colorGroups.map((g) =>
      g._id === id ? { ...g, name: name.trim() } : g,
    )
    return ok()
  },

  async remove(id) {
    await delay()
    findGroup(id)

    const colorsCount = getStore().colors.filter((color) => color.group === id).length
    if (colorsCount) {
      throw conflict(`Color group ${id} still has ${colorsCount} colors, remove them first`)
    }

    getStore().colorGroups = getStore().colorGroups.filter((g) => g._id !== id)
    return ok()
  },
}
