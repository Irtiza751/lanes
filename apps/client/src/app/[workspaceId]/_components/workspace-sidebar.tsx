"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Inbox, KanbanSquare } from "lucide-react";
import { ProjectMenu } from "./project-menu-item";
import { WorkspaceSidebarFooter } from "./workspace-sidebar-footer";
import { WorkspaceSidebarHeader } from "./workspace-sidebar-header";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { useProjectMenus } from "@/hooks/use-project-menus";

export function WorkspaceSidebar() {
  const params = useParams();
  // slug of the workspace
  const workspaceId = params?.workspaceId as string;
  const projectId = params.projectId as string;
  const { data } = useProjectMenus();
  const projects = data?.data.projects;

  return (
    <React.Fragment>
      <WorkspaceSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm" tooltip="Go to inbox">
                <Link href={`/${workspaceId}/inbox`}>
                  <span className="text-muted-foreground">
                    <Inbox size={14} />
                  </span>
                  <span>Inbox</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm">
                <Link href={`/${workspaceId}/my-tasks`}>
                  <span className="text-muted-foreground">
                    <KanbanSquare size={14} />
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
