import { Link } from 'react-router'
import { sidebarLinks } from '../constants/sidbar-links'
import { WorkspaceSwitcher } from './workspace-switcher'

export function Sidebar() {
  return (
    <aside className="border-r h-full text-sm">
      <nav className="px-2 py-4">
        <WorkspaceSwitcher />
        {sidebarLinks.map((link) => {
          return (
            <Link
              key={link.href}
              className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded"
              to={link.href}
            >
              {link.icon}
              {link.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
