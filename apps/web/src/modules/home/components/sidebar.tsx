import { WorkspaceSwitcher } from '@/modules/dashboard/components/workspace-switcher'
// import { Logo } from '@/shared/components/ui/logo'
import { Separator } from '@/shared/components/ui/seperator'
import { cn } from '@/shared/lib/cn'
import { useAppStore } from '@/stores/use-app-store'
import { ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { sideLinks } from '../constants/side-links'

export function Sidebar() {
  const location = useLocation()
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
            <li key={menu.name} className="mb-2">
              <div className="flex items-center mb-2 hover:bg-foreground/5 cursor-pointer py-1 px-2 rounded-md">
                <span className="flex-1 uppercase text-xs text-muted-foreground">{menu.name}</span>
                <ChevronDown size={12} className="text-muted-foreground" />
              </div>

              {menu.children &&
                menu.children.map((item) => (
                  <Link
                    key={item.name}
                    className={cn(
                      'flex items-center gap-2 py-1 px-2 hover:bg-foreground/5 rounded-md mb-2',
                      { 'bg-foreground/5': location.pathname === item.href },
                    )}
                    to={item.href}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              <Separator orientation="horizontal" />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
