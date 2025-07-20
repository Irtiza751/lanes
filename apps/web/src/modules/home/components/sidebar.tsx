import { WorkspaceSwitcher } from '@/shared/components/workspace-switcher'
import { cn } from '@/shared/lib/cn'
import { useAppStore } from '@/stores/use-app-store'
import { sideLinks } from '../constants/side-links'
import { NavItem } from './nav-item'
import { Button } from '@/shared/components/ui/button'
import { Search, SquarePen } from 'lucide-react'
import { CreateTask } from '@/shared/components/create-task'
import { useQuery } from '@tanstack/react-query'
import { useWorkspace, Workspace } from '@/stores/use-workspace'
import { api } from '@/api'
import { useEffect } from 'react'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'

export function Sidebar() {
  const showSidebar = useAppStore((state) => state.showSidebar)
  const setWorkspace = useWorkspace((state) => state.setWorkspace)
  const { data: workspaces, isSuccess } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => api.get<Workspace[]>('/workspace'),
  })

  useEffect(() => {
    if (isSuccess && workspaces?.data?.length > 0) {
      const workspaceId = LocalStorage.getItem('workspaceId')
      setWorkspace(
        workspaces.data.find((workspace) => workspace.id === workspaceId) || workspaces.data[0],
      )
    }
  }, [isSuccess])

  return (
    <aside
      className={cn('inline-block w-0 overflow-hidden transition-[width]', {
        'w-xs': showSidebar,
      })}
    >
      <div className="flex justify-between items-center mb-2 px-4 pt-3">
        <WorkspaceSwitcher workspaces={workspaces?.data || []} />
        <div className="space-x-2">
          <Button size="sicon" variant="outline">
            <Search />
          </Button>
          <CreateTask>
            <Button size="sicon" variant="secondary">
              <SquarePen />
            </Button>
          </CreateTask>
        </div>
      </div>
      <nav className="px-4">
        <ul>
          {sideLinks.map((menu) => (
            <NavItem key={menu.href + menu.name} item={menu} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
