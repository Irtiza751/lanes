import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown'
import { LocalStorage } from '@/shared/lib/classes/LocalStorage'
import { ChevronDown, LogOut, Settings, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const WORKSPACES = [
  {
    name: 'Atlasian',
    image: '',
    color: 'bg-orange-500',
  },
  {
    name: 'Shispare',
    image: '',
    color: 'bg-green-500',
  },
  {
    name: 'Sphere WMS',
    image: '',
    color: 'bg-purple-500',
  },
]

export function WorkspaceSwitcher() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACES[0])
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer hover:bg-foreground/4 rounded-md p-1 flex gap-2 items-center mb-2">
          <Avatar className="rounded-md size-5">
            <AvatarImage src={selectedWorkspace.image} alt="Irtiza" />
            <AvatarFallback className={`rounded-md ${selectedWorkspace.color} text-white`}>
              {selectedWorkspace.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h5 className="flex-1 trucate font-semibold text-sm">{selectedWorkspace.name}</h5>
          <ChevronDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[255px] rounded-lg">
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UsersRound />
          <span>Invide Members</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {WORKSPACES.map((workspace) => (
          <DropdownMenuItem key={workspace.name} onClick={() => setSelectedWorkspace(workspace)}>
            <Avatar className="rounded-md size-5">
              <AvatarImage src={workspace.image} alt="Irtiza" />
              <AvatarFallback className={`rounded-md ${workspace.color} text-white`}>
                {workspace.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p>{workspace.name}</p>
          </DropdownMenuItem>
        ))}
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
