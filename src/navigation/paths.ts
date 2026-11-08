export const paths = {
  dashboard: '/',
  groups: '/groups',
  colors: '/colors',
  responses: '/responses',
  settings: '/settings',
} as const

export type AppPath = (typeof paths)[keyof typeof paths]
