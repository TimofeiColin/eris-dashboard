import type { BotResponsesApi, BotResponsesResponse, Entity, OkResponse } from '../contracts'
import { http } from './client.ts'

const botResponsePath = (id: Entity['_id']) => `bot-responses/${encodeURIComponent(id)}`

export const httpBotResponsesApi: BotResponsesApi = {
  list: (params = {}, signal) =>
    http.get<BotResponsesResponse>('bot-responses', { params: { ...params }, signal }),

  create: (body) => http.post<OkResponse>('bot-responses', body),

  update: (id, body) => http.patch<OkResponse>(botResponsePath(id), body),

  remove: (id) => http.delete<OkResponse>(botResponsePath(id)),
}
