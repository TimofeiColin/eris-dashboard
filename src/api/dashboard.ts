import { http } from './client.ts'

export interface DashboardStats {
  colorGroups: number
  colors: number
  sayings: number
}

export const getDashboardStats = (signal?: AbortSignal) =>
  http.get<DashboardStats>('dashboard-stats', { signal })
