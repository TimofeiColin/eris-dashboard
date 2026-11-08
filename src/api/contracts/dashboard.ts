export interface DashboardStats {
  colorGroups: number
  colors: number
  responses: number
}

export interface DashboardApi {
  getStats(signal?: AbortSignal): Promise<DashboardStats>
}
