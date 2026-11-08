import type { BotResponse, BotResponsesApi, CreateBotResponseBody, Entity } from '../contracts'
import type { MockBotResponse } from './data.ts'
import { getStore, nextId } from './store.ts'
import { conflict, delay, notFound, ok, paginate, sameName } from './utils.ts'

const toBotResponse = (item: MockBotResponse): BotResponse => ({
  ...item,
  responses: [...item.responses],
})

const findBotResponse = (id: Entity['_id']) => {
  const item = getStore().botResponses.find((r) => r._id === id)
  if (!item) throw notFound(`Bot response ${id} does not exist`)
  return item
}

const assertCommandFree = (command: string, exceptId?: Entity['_id']) => {
  if (getStore().botResponses.some((r) => r._id !== exceptId && sameName(r.command, command))) {
    throw conflict(`Bot response for "${command.trim()}" already exists`)
  }
}

const toFields = ({ command, responses }: CreateBotResponseBody) => ({
  command: command.trim(),
  responses: responses.map((r) => r.trim()),
})

const includes = (text: string, part: string) => text.toLowerCase().includes(part.toLowerCase())

export const mockBotResponsesApi: BotResponsesApi = {
  async list({ page = 1, command, response } = {}, signal) {
    await delay(undefined, signal)

    const matches = getStore().botResponses.filter(
      (r) =>
        (!command?.trim() || includes(r.command, command.trim())) &&
        (!response?.trim() || r.responses.some((reply) => includes(reply, response.trim()))),
    )

    return paginate(matches.map(toBotResponse), page)
  },

  async create(body) {
    await delay()
    assertCommandFree(body.command)

    const store = getStore()
    store.botResponses = [...store.botResponses, { _id: nextId(store.botResponses), ...toFields(body) }]
    return ok()
  },

  async update(id, body) {
    await delay()
    findBotResponse(id)
    assertCommandFree(body.command, id)

    const store = getStore()
    store.botResponses = store.botResponses.map((r) => (r._id === id ? { ...r, ...toFields(body) } : r))
    return ok()
  },

  async remove(id) {
    await delay()
    findBotResponse(id)

    const store = getStore()
    store.botResponses = store.botResponses.filter((r) => r._id !== id)
    return ok()
  },
}
