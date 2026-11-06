import type { DashboardApi } from '../contracts'
import { getStore } from './store.ts'
import { delay } from './utils.ts'

export const mockDashboardApi: DashboardApi = {
  async getStats(signal) {
    await delay(undefined, signal)
    return {
      colorGroups: getStore().colorGroups.length,
      colors: getStore().colors.length,
      sayings: getStore().sayings.length,
    }
  },
}
