import type { ColorGroupsApi, ColorsApi, DashboardApi } from './contracts'
import { httpColorGroupsApi, httpColorsApi, httpDashboardApi } from './http'
import { mockColorGroupsApi, mockColorsApi, mockDashboardApi } from './mock'

export const usingMockApi = import.meta.env.VITE_USE_MOCK_API === 'true'

export const dashboardApi: DashboardApi = usingMockApi ? mockDashboardApi : httpDashboardApi
export const colorGroupsApi: ColorGroupsApi = usingMockApi ? mockColorGroupsApi : httpColorGroupsApi
export const colorsApi: ColorsApi = usingMockApi ? mockColorsApi : httpColorsApi

export { ApiError } from './errors.ts'
export type * from './contracts'
