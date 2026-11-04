import workspacesIcon from '@material-symbols/svg-400/outlined/workspaces.svg'
import paletteIcon from '@material-symbols/svg-400/outlined/palette.svg'
import formatQuoteIcon from '@material-symbols/svg-400/outlined/format_quote.svg'
import type { DashboardStats } from '../../api'
import { paths, type AppPath } from '../../navigation'

export interface DashboardCard {
  key: keyof DashboardStats
  path: AppPath
  label: string
  icon: string
  description: string
}

export const cards: DashboardCard[] = [
  {
    key: 'colorGroups',
    path: paths.groups,
    label: 'Color groups',
    icon: workspacesIcon,
    description: 'Color families that members browse through, like reds or pastels.',
  },
  {
    key: 'colors',
    path: paths.colors,
    label: 'Colors',
    icon: paletteIcon,
    description: 'Name colors members can pick, each with its own role and hex code.',
  },
  {
    key: 'sayings',
    path: paths.sayings,
    label: 'Sayings',
    icon: formatQuoteIcon,
    description: 'Little lines Eris can say to give the server some personality.',
  },
]
