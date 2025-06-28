import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
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
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer bg-foreground/10 rounded-md p-2 flex gap-2 items-center mb-2">
          <Avatar className="rounded-md">
            <AvatarImage src={selectedWorkspace.image} alt="Irtiza" />
            <AvatarFallback className="rounded-md">MI</AvatarFallback>
          </Avatar>
          <h5 className="flex-1 trucate font-semibold">{selectedWorkspace.name}</h5>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <ul>
          {WORKSPACES.map(workspace => (
            <li key={workspace.name} onClick={() => setSelectedWorkspace(workspace)}>
              <div className="cursor-pointer hover:bg-foreground/10 rounded-md p-2 flex gap-2 items-center">
                <Avatar className="rounded-md">
                  <AvatarImage src={workspace.image} alt="Irtiza" />
                  <AvatarFallback className="rounded-md">MI</AvatarFallback>
                </Avatar>
                <h5 className="flex-1 trucate font-semibold">{workspace.name}</h5>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}