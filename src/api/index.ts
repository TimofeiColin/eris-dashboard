export { http, ApiError } from './client.ts'
export type { RequestOptions } from './client.ts'
export { getDashboardStats } from './dashboard.ts'
export type { DashboardStats } from './dashboard.ts'
export {
  getColorGroups,
  checkColorGroupExists,
  createColorGroup,
  updateColorGroup,
  deleteColorGroup,
} from './colorGroups.ts'
export type {
  ColorGroup,
  ColorGroupsParams,
  ColorGroupsResponse,
  ColorGroupExistsResponse,
  CreateColorGroupBody,
  UpdateColorGroupBody,
} from './colorGroups.ts'
export { getColorsByGroup } from './colors.ts'
export type { Color } from './colors.ts'
