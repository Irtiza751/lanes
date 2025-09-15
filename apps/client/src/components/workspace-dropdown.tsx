"use client";

import { useRouter } from "next/navigation";
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
} from "./ui/dropdown-menu";
import { Workspaces } from "@/lib/workspace-service";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function WorkspacesDropdown({
  workspaces,
  onSelect,
}: {
  workspaces: Workspaces;
  onSelect: (workspace: Workspaces[number]) => void;
}) {
  // const { changeWorkspace } = useWorkspace();
  const router = useRouter();

  return (
    <DropdownMenuPortal>
      <DropdownMenuSubContent className="min-w-55">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Workspaces
        </DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.workspace.name}
            onClick={() => onSelect(workspace)}
          >
            <Avatar className="rounded-md size-5">
              <AvatarImage src={workspace.workspace.name} alt="Irtiza" />
              <AvatarFallback
                className={`rounded-md text-xs font-medium text-white bg-green-600`}
              >
                {workspace.workspace.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <small>{workspace.workspace.name}</small>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="text-xs"
          onClick={() => router.push("/create-workspace")}
        >
          Create or join new workspace
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs"
          onClick={() => router.push("/add-account")}
        >
          Add an other account
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  );
}
