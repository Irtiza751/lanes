import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  SquareTerminal,
  ChevronDown,
  Box,
  KanbanSquare,
  CircleDotDashed,
  Ellipsis,
  Layers,
  Layers2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import Cookies from "js-cookie";

export interface MenuChangeEvent {
  workspace: string; // slug of the workspace
  project: string; // slug or key of the project
}

interface ProjectMenuProps {
  workspaceSlug: string;
  projectSlug: string;
  name: string;
  iconClass?: string;
  defaultOpen?: boolean;
  onMenuItemChange?: (event: MenuChangeEvent) => void;
}

export function ProjectMenu({
  workspaceSlug,
  projectSlug,
  name,
  defaultOpen,
  iconClass,
  onMenuItemChange = () => {},
}: ProjectMenuProps) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size="sm" className="group justify-between">
            <div className="flex items-center gap-2">
              <SquareTerminal className={iconClass} size={12} />
              <span className="capitalize">{name}</span>
              <ChevronDown className="group-data-[state=closed]:-rotate-90 transition-transform text-muted-foreground size-3" />
            </div>
            <div className="size-3">
              <Ellipsis className="text-muted-foreground size-3" size={8} />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="pl-3">
            <ProjectMenuItem
              workspaceSlug={workspaceSlug}
              projectSlug={projectSlug}
              name="Issues"
              icon={<Layers2 size={15} />}
              onChange={onMenuItemChange}
            />
            <ProjectMenuItem
              workspaceSlug={workspaceSlug}
              projectSlug={projectSlug}
              name="Epics"
              icon={<Box size={15} />}
              onChange={onMenuItemChange}
            />
            <ProjectMenuItem
              workspaceSlug={workspaceSlug}
              projectSlug={projectSlug}
              name="Backlog"
              icon={<CircleDotDashed size={15} />}
              onChange={onMenuItemChange}
            />
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default function ProjectMenuItem({
  workspaceSlug,
  projectSlug,
  name,
  icon,
  onChange = () => {},
}: {
  workspaceSlug: string;
  projectSlug: string;
  name: string;
  icon?: React.ReactNode;
  onChange?: (event: MenuChangeEvent) => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === `/${workspaceSlug}/${projectSlug}/${name.toLowerCase()}`;

  const onClickHandler = useCallback(
    ({
      workspaceSlug,
      projectSlug,
    }: {
      workspaceSlug: string;
      projectSlug: string;
    }) => {
      onChange({ workspace: workspaceSlug, project: projectSlug });
      Cookies.set("lap", `${workspaceSlug}/${projectSlug}/issues`, {
        sameSite: "lax",
      });
    },
    []
  );

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        isActive={isActive}
        asChild
        size="sm"
        onClick={() => onClickHandler({ workspaceSlug, projectSlug })}
      >
        <Link href={`/${workspaceSlug}/${projectSlug}/${name.toLowerCase()}`}>
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="dark:text-gray-200">{name}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
