import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'
import { ChevronDown, LogOut, Settings, UsersRound } from 'lucide-react'
import { useNavigate } from 'react-router'
import { cn } from '../lib/cn'
import { useWorkspace, Workspace } from '@/stores/use-workspace'

interface WorkspaceSwitcherProps {
  className?: string;
  workspaces: Workspace[];
}

export function WorkspaceSwitcher({ className, workspaces }: WorkspaceSwitcherProps) {
  const navigate = useNavigate()
  const workspace = useWorkspace((state) => state.workspace)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'cursor-pointer hover:bg-foreground/4 rounded-md p-1 flex gap-2 items-center mb-2',
            className,
          )}
        >
          <Avatar className="rounded-md size-5">
            <AvatarImage src={workspace?.logoUrl} alt="Irtiza" />
            <AvatarFallback className={`rounded-md ${workspace?.color} text-white`}>
              {workspace?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h5 className="flex-1 trucate font-semibold text-sm">{workspace?.name}</h5>
          <ChevronDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-60 rounded-lg">
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UsersRound />
          <span>Invide Members</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Switch workspaces</DropdownMenuSubTrigger>
          <WorkspacesSubMenus workspaces={workspaces} />
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            LocalStorage.delete('token')
            navigate('/auth/login')
          }}
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function WorkspacesSubMenus({ workspaces }: { workspaces: Workspace[] }) {
  const {setWorkspace} = useWorkspace((state) => state)

  const onWorkspaceChange = (workspace: Workspace) => {
    setWorkspace(workspace)
    LocalStorage.setItem('workspaceId', workspace.id);
  }

  return (
    <DropdownMenuPortal>
      <DropdownMenuSubContent className="min-w-55">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem key={workspace.name} onClick={() => onWorkspaceChange(workspace)}>
            <Avatar className="rounded-md size-5">
              <AvatarImage src={workspace.logoUrl} alt="Irtiza" />
              <AvatarFallback className={`rounded-md ${workspace.color} text-white`}>
                {workspace.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p>{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Create or join new workspace</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  )
}
