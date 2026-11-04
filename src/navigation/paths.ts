export const paths = {
  dashboard: '/',
  groups: '/groups',
  colors: '/colors',
  sayings: '/sayings',
  settings: '/settings',
} as const

export type AppPath = (typeof paths)[keyof typeof paths]
