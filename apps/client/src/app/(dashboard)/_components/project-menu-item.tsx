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
  GalleryHorizontalEnd,
  CircleDotDashed,
} from "lucide-react";

interface ProjectMenuProps {
  name: string;
  iconClass?: string;
  defaultOpen?: boolean;
}

export function ProjectMenu({
  name,
  defaultOpen,
  iconClass,
}: ProjectMenuProps) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size="sm" className="justify-between">
            <div className="flex items-center gap-2">
              <SquareTerminal className={iconClass} size={12} />
              <span>{name}</span>
            </div>
            <ChevronDown />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="pl-4">
            <ProjectMenuItem name="Epics" icon={<Box size={12} />} />
            <ProjectMenuItem name="Tasks" icon={<KanbanSquare size={12} />} />
            <ProjectMenuItem
              name="Backlog"
              icon={<CircleDotDashed size={12} />}
            />
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default function ProjectMenuItem({
  name,
  icon,
}: {
  name: string;
  icon?: React.ReactNode;
}) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton size="sm">
        {icon && <span>{icon}</span>}
        <span>{name}</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
