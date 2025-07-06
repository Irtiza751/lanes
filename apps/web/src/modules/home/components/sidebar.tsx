import { WorkspaceSwitcher } from '@/modules/dashboard/components/workspace-switcher'
// import { Logo } from '@/shared/components/ui/logo'
import { cn } from '@/shared/lib/cn'
import { useAppStore } from '@/stores/use-app-store'
import { sideLinks } from '../constants/side-links'
import { NavItem } from './nav-item'

export function Sidebar() {
  const showSidebar = useAppStore((state) => state.showSidebar)

  return (
    <aside
      className={cn('inline-block w-0 overflow-hidden transition-[width]', {
        'w-2xs': showSidebar,
      })}
    >
      <div className="flex justify-between items-center mb-2 px-4 pt-3">
        {/* <Logo size={26} /> */}
        <WorkspaceSwitcher />
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
