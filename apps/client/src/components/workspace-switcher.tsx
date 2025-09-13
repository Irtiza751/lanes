"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, UsersRound } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { WorkspacesDropdown } from "./workspace-dropdown";
import { Workspaces } from "@/lib/workspace-service";
import Cookies from "js-cookie";

export function WorkspaceSwitcher() {
  const { signoutMutation } = useAuth();
  const workspaces = useWorkspaceStore();
  const activeWorkspace = workspaces.active;

  const onSelectHandler = (active: Workspaces[number]) => {
    workspaces.setActive(active);
    // TODO: append the project at the end.
    Cookies.set("lap", `${active.workspace.slug}/`, { sameSite: "lax" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-foreground/4 rounded-md py-1 px-2 max-w-60 truncate">
          <Avatar className="rounded-sm size-5">
            <AvatarImage src={activeWorkspace?.workspace.name} alt="Irtiza" />
            <AvatarFallback
              className={`rounded-sm text-white font-medium text-xs bg-orange-600`}
            >
              {activeWorkspace?.workspace.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate font-medium capitalize">
            {activeWorkspace?.workspace.name}
          </span>
          <ChevronDown size={13} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-60 rounded-lg">
        <DropdownMenuItem className="text-xs">
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs">
          <UsersRound />
          <span>Invited Members</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-xs">
            Switch workspace
          </DropdownMenuSubTrigger>
          <WorkspacesDropdown
            workspaces={workspaces.available}
            onSelect={onSelectHandler}
          />
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-xs"
          onClick={() => signoutMutation.mutate()}
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
