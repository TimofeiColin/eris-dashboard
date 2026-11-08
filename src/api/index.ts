import type { BotResponsesApi, ColorGroupsApi, ColorsApi, DashboardApi } from './contracts'
import { httpBotResponsesApi, httpColorGroupsApi, httpColorsApi, httpDashboardApi } from './http'
import { mockBotResponsesApi, mockColorGroupsApi, mockColorsApi, mockDashboardApi } from './mock'

export const usingMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'

export const dashboardApi: DashboardApi = usingMockApi ? mockDashboardApi : httpDashboardApi
export const colorGroupsApi: ColorGroupsApi = usingMockApi ? mockColorGroupsApi : httpColorGroupsApi
export const colorsApi: ColorsApi = usingMockApi ? mockColorsApi : httpColorsApi
export const botResponsesApi: BotResponsesApi = usingMockApi
  ? mockBotResponsesApi
  : httpBotResponsesApi

export { ApiError } from './errors.ts'
export type * from './contracts'
