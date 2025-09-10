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
} from "lucide-react";
import Link from "next/link";

interface ProjectMenuProps {
  slug: string;
  name: string;
  iconClass?: string;
  defaultOpen?: boolean;
}

export function ProjectMenu({
  slug,
  name,
  defaultOpen,
  iconClass,
}: ProjectMenuProps) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size="sm" className="group justify-between">
            <div className="flex items-center gap-2">
              <SquareTerminal className={iconClass} size={12} />
              <span>{name}</span>
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
              projectSlug={slug}
              name="Epics"
              icon={<Box size={13} />}
            />
            <ProjectMenuItem
              projectSlug={slug}
              name="Tasks"
              icon={<KanbanSquare size={13} />}
            />
            <ProjectMenuItem
              projectSlug={slug}
              name="Backlog"
              icon={<CircleDotDashed size={13} />}
            />
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default function ProjectMenuItem({
  projectSlug,
  name,
  icon,
}: {
  projectSlug: string;
  name: string;
  icon?: React.ReactNode;
}) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild size="sm">
        <Link href={`/${projectSlug}/${name.toLowerCase()}`}>
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span>{name}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
