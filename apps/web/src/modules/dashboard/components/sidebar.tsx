import { Link } from 'react-router'
import { sidebarLinks } from '../constants/sidbar-links'
import { WorkspaceSwitcher } from './workspace-switcher'
import { Separator } from '@/shared/components/ui/seperator'
import { CirclePlus } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="border-r h-full text-sm">
      <nav className="px-2 py-4">
        <div className="cursor-pointer flex items-center uppercase text-xs font-semibold text-muted-foreground mb-2">
          <span className="flex-1">workspaces</span>
          <CirclePlus size={14} />
        </div>
        <WorkspaceSwitcher />
        <Separator orientation="horizontal" />
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
