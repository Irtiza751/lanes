"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Focus, Inbox, KanbanSquare } from "lucide-react";
import { ProjectMenu } from "./project-menu-item";
import { WorkspaceSidebarFooter } from "./workspace-sidebar-footer";
import { WorkspaceSidebarHeader } from "./workspace-sidebar-header";
import Link from "next/link";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import { useProjectMenus } from "@/hooks/use-project-menus";
import { useProjectMenuStore } from "@/stores/use-project-menus-store";

export function WorkspaceSidebar() {
  const params = useParams();
  const pathname = usePathname();
  // slug of the workspace
  const workspaceId = params?.workspaceId as string;
  const { data } = useProjectMenus();
  const projects = data?.data.projects;
  const setActiveProject = useProjectMenuStore((state) => state.setActive);

  return (
    <React.Fragment>
      <WorkspaceSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === `/${workspaceId}/inbox`}
                asChild
                size="sm"
                tooltip="Go to inbox"
              >
                <Link href={`/${workspaceId}/inbox`}>
                  <span className="text-muted-foreground">
                    <Inbox size={15} />
                  </span>
                  <span>Inbox</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === `/${workspaceId}/my-tasks`}
                asChild
                size="sm"
              >
                <Link href={`/${workspaceId}/my-tasks`}>
                  <span className="text-muted-foreground">
                    <Focus size={15} />
                  </span>
                  <span>My Tasks</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            {projects?.map((project) => (
              <ProjectMenu
                key={project.id}
                workspaceSlug={workspaceId}
                projectSlug={project.key}
                name={project.name}
                iconClass="text-indigo-400"
                defaultOpen
                onMenuItemChange={() => {
                  setActiveProject(project);
                }}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {/* group end */}
      </SidebarContent>
      <WorkspaceSidebarFooter />
    </React.Fragment>
  );
}
