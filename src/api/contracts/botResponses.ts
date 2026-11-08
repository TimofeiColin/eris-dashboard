import type { Entity, OkResponse, PaginatedResponse } from './common.ts'

/** A message the bot replies to, with the replies it picks from. */
export interface BotResponse extends Entity {
  /** Message the bot replies to, matched in any case */
  command: string
  responses: string[]
}

export type BotResponsesResponse = PaginatedResponse<BotResponse>

export interface BotResponsesParams {
  page?: number
  /** Case-insensitive part of the command */
  command?: string
  /** Case-insensitive part of any of the responses */
  response?: string
}

export interface CreateBotResponseBody {
  /** Up to 200 characters */
  command: string
  /** 1 to 50 replies, each up to 2000 characters */
  responses: string[]
}

export type UpdateBotResponseBody = CreateBotResponseBody

export interface BotResponsesApi {
  /** GET bot-responses?page=&command=&response= */
  list(params?: BotResponsesParams, signal?: AbortSignal): Promise<BotResponsesResponse>
  /** POST bot-responses. 409 if the command already has responses. */
  create(body: CreateBotResponseBody): Promise<OkResponse>
  /** PATCH bot-responses/:id. 404 for an unknown id, 409 for a taken command. */
  update(id: Entity['_id'], body: UpdateBotResponseBody): Promise<OkResponse>
  /** DELETE bot-responses/:id. 404 for an unknown id. */
  remove(id: Entity['_id']): Promise<OkResponse>
}
