import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const WORKSPACES = [
  {
    name: 'My Workspace',
    image: '',
  },
  {
    name: 'Shispare',
    image: '',
  },
  {
    name: 'Sphere WMS',
    image: '',
  },
]

export function WorkspaceSwitcher() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACES[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer hover:bg-foreground/4 rounded-md p-1 flex gap-2 items-center mb-2">
          <Avatar className="rounded-md size-5">
            <AvatarImage src={selectedWorkspace.image} alt="Irtiza" />
            <AvatarFallback className="rounded-md bg-orange-500 text-white">
              {selectedWorkspace.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h5 className="flex-1 trucate font-semibold text-sm">{selectedWorkspace.name}</h5>
          <ChevronDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[255px]">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WORKSPACES.map((workspace) => (
          <DropdownMenuItem key={workspace.name} onClick={() => setSelectedWorkspace(workspace)}>
            <Avatar className="rounded-md">
              <AvatarImage src={workspace.image} alt="Irtiza" />
              <AvatarFallback className="rounded-md">MI</AvatarFallback>
            </Avatar>
            <p>{workspace.name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
