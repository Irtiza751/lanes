import { WorkspaceSwitcher } from '@/modules/dashboard/components/workspace-switcher'
import { cn } from '@/shared/lib/cn'
import { useAppStore } from '@/stores/use-app-store'
import { sideLinks } from '../constants/side-links'
import { NavItem } from './nav-item'
import { Button } from '@/shared/components/ui/button'
import { Search, SquarePen } from 'lucide-react'

export function Sidebar() {
  const showSidebar = useAppStore((state) => state.showSidebar)

  return (
    <aside
      className={cn('inline-block w-0 overflow-hidden transition-[width]', {
        'w-xs': showSidebar,
      })}
    >
      <div className="flex justify-between items-center mb-2 px-4 pt-3">
        <WorkspaceSwitcher />
        <div className="space-x-2">
          <Button size="sicon" variant="outline">
            <Search />
          </Button>
          <Button size="sicon" variant="secondary">
            <SquarePen />
          </Button>
        </div>
      </div>
      <nav className="px-4">
        <ul>
          {sideLinks.map((menu) => (
            <NavItem item={menu} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
