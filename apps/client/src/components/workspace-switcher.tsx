"use client";
import { Workspace } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { ChevronDown, LogOut, Settings, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/providers/workspace-provider";
import { useAuth } from "@/hooks/use-auth";

interface WorkspaceSwitcherProps {
  workspace: Workspace;
}

export function WorkspaceSwitcher({ workspace }: WorkspaceSwitcherProps) {
  const { signoutMutation } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer hover:bg-foreground/4 rounded-md py-1 px-2 max-w-60 truncate">
          <Avatar className="rounded-sm size-5">
            <AvatarImage src={workspace?.logoUrl} alt="Irtiza" />
            <AvatarFallback
              style={{ background: workspace?.color }}
              className={`rounded-sm text-white font-medium text-xs`}
            >
              {workspace.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate font-medium">{workspace.name}</span>
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
          <span>Invide Members</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-xs">
            Switch workspace
          </DropdownMenuSubTrigger>
          <WorkspacesDropdown />
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

function WorkspacesDropdown() {
  const { changeWorkspace } = useWorkspace();
  const router = useRouter();

  const workspaces: Workspace[] = [
    {
      color: "green",
      id: 1,
      logoUrl: "",
      name: "Waredrop",
      ownerId: "1",
      slug: "waredrop",
      description: "some description for waredrop",
    },
    {
      color: "orange",
      id: 2,
      logoUrl: "",
      name: "Shispare",
      ownerId: "1",
      slug: "shispare",
      description: "some description for shispare",
    },
  ];

  return (
    <DropdownMenuPortal>
      <DropdownMenuSubContent className="min-w-55">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Workspaces
        </DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.name}
            onClick={() => changeWorkspace(workspace.slug)}
          >
            <Avatar className="rounded-md size-5">
              <AvatarImage src={workspace.logoUrl} alt="Irtiza" />
              <AvatarFallback
                style={{ background: workspace?.color }}
                className={`rounded-md text-xs font-medium text-white`}
              >
                {workspace.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <small>{workspace.name}</small>
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
