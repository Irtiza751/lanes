import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const WORKSPACES = [
  {
    name: 'My Workspace',
    image: 'https://www.gradvatar.com/MyWorkspace1',
  },
  {
    name: 'Shispare',
    image: 'https://www.gradvatar.com/MyWorkspace2',
  },
  {
    name: 'Sphere WMS',
    image: 'https://www.gradvatar.com/MyWorkspace3',
  },
]

export function WorkspaceSwitcher() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACES[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer bg-foreground/10 rounded-md p-2 flex gap-2 items-center mb-2">
          <Avatar className="rounded-md">
            <AvatarImage src={selectedWorkspace.image} alt="Irtiza" />
            <AvatarFallback className="rounded-md">MI</AvatarFallback>
          </Avatar>
          <h5 className="flex-1 trucate font-semibold">{selectedWorkspace.name}</h5>
          <ChevronsUpDown size={14} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className="w-[240px]">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WORKSPACES.map(workspace => (
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