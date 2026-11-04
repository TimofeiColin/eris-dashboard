import { NavLink } from 'react-router'
import { Icon } from '../icon'
import ErisLogo from './ErisLogo.tsx'

interface SidebarPage {
  path: string
  label: string
  icon: string
}

interface SidebarProps {
  pages: readonly SidebarPage[]
}

function Sidebar({ pages }: SidebarProps) {
  return (
    <aside className="w-full shrink-0 border-b border-border bg-sidebar px-4 py-3 sm:w-64 sm:border-r sm:border-b-0 sm:px-5 sm:py-8">
      <div className="mb-3 flex items-center gap-3 text-2xl font-semibold text-text-h sm:mb-8 sm:px-4">
        <ErisLogo className="size-9" />
        Eris
      </div>
      <nav>
        <ul className="flex gap-2 overflow-x-auto sm:flex-col">
          {pages.map((page) => (
            <li key={page.path}>
              <NavLink
                to={page.path}
                end
                className={({ isActive }) =>
                  `flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-accent-bg font-medium text-accent'
                      : 'text-text hover:bg-accent-bg hover:text-text-h'
                  }`
                }
              >
                <Icon src={page.icon} className="size-6" />
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
