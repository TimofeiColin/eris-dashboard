import type { DashboardApi, DashboardStats } from '../contracts'
import { http } from './client.ts'

export const httpDashboardApi: DashboardApi = {
  getStats: (signal) => http.get<DashboardStats>('dashboard-stats', { signal }),
}
