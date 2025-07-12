import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { SideNav } from '../models/side-nav'
import { cn } from '@/shared/lib/cn'
import { EllipsisVertical, ChevronDown, ChevronRight } from 'lucide-react'

interface NavItemProps {
  item: SideNav
  level?: number
}

export function NavItem({ item: menu, level = 0 }: NavItemProps) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const hasChildren = menu.children && menu.children.length > 0

  return (
    <li className="mb-2 capitalize text-muted-foreground">
      {!menu.icon ? (
        <div
          className="flex items-center mb-2 hover:bg-foreground/5 cursor-pointer py-1 px-2 rounded-md"
          onClick={() => hasChildren && setCollapsed(!collapsed)}
        >
          <span className="flex-1 uppercase text-xs text-muted-foreground">{menu.name}</span>
          {hasChildren && (collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />)}
        </div>
      ) : (
        <div
          className="flex gap-2 items-center mb-2 hover:bg-foreground/5 cursor-pointer py-1 px-2 rounded-md"
          onClick={() => hasChildren && setCollapsed(!collapsed)}
        >
          <div className="flex gap-2 items-center flex-1">
            {menu.icon}
            <span className="capitalize text-foreground font-medium">{menu.name}</span>
          </div>
          {menu.options ? (
            <button onClick={(e) => e.stopPropagation()}>
              <EllipsisVertical size={12} />
            </button>
          ) : hasChildren ? (
            collapsed ? (
              <ChevronRight size={12} />
            ) : (
              <ChevronDown size={12} />
            )
          ) : null}
        </div>
      )}

      {hasChildren && !collapsed && (
        <ul>
          {menu.children?.map((item) =>
            item.children ? (
              <NavItem key={item.name} item={item} level={level + 1} />
            ) : (
              <Link
                key={item.name}
                className={cn(
                  'flex items-center gap-2 py-1 px-2 hover:bg-foreground/5 rounded-md mb-2',
                  { 'bg-foreground/5': location.pathname === item.href },
                  level > 0 && 'ml-2',
                )}
                to={item.href}
              >
                {item.icon}
                <span className="text-foreground">{item.name}</span>
              </Link>
            ),
          )}
        </ul>
      )}
    </li>
  )
}
