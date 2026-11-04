import type { ComponentType } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import dashboardIcon from '@material-symbols/svg-400/outlined/dashboard.svg'
import workspacesIcon from '@material-symbols/svg-400/outlined/workspaces.svg'
import paletteIcon from '@material-symbols/svg-400/outlined/palette.svg'
import formatQuoteIcon from '@material-symbols/svg-400/outlined/format_quote.svg'
import settingsIcon from '@material-symbols/svg-400/outlined/settings.svg'
import { Sidebar } from './components/sidebar'
import { Dashboard } from './pages/dashboard'
import { Groups } from './pages/groups'
import Colors from './pages/Colors.tsx'
import Sayings from './pages/Sayings.tsx'
import Settings from './pages/Settings.tsx'
import { paths, type AppPath } from './navigation'

const pages: { path: AppPath; label: string; icon: string; component: ComponentType }[] = [
  { path: paths.dashboard, label: 'Dashboard', icon: dashboardIcon, component: Dashboard },
  { path: paths.groups, label: 'Groups', icon: workspacesIcon, component: Groups },
  { path: paths.colors, label: 'Colors', icon: paletteIcon, component: Colors },
  { path: paths.sayings, label: 'Sayings', icon: formatQuoteIcon, component: Sayings },
  { path: paths.settings, label: 'Settings', icon: settingsIcon, component: Settings },
]

function App() {
  return (
    <div className="flex min-h-svh flex-col sm:flex-row">
      <Sidebar pages={pages} />
      <main className="flex-1 px-4 py-6 sm:p-8">
        <Routes>
          {pages.map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<Navigate to={paths.dashboard} replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
