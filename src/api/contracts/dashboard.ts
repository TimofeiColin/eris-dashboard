export interface DashboardStats {
  colorGroups: number
  colors: number
  sayings: number
}

export interface DashboardApi {
  getStats(signal?: AbortSignal): Promise<DashboardStats>
}
