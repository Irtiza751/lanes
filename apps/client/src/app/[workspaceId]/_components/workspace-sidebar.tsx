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

export function WorkspaceSidebar() {
  const params = useParams();
  // slug of the workspace
  const workspaceId = params?.workspaceId as string;
  const projectId = params.projectId as string;

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
            <ProjectMenu
              workspaceSlug={workspaceId}
              projectSlug={projectId}
              name="Waredrop"
              iconClass="text-indigo-400"
              defaultOpen
            />
            {/* <ProjectMenu
              name="Shispare"
              iconClass="text-orange-400"
              defaultOpen={false}
            /> */}
          </SidebarMenu>
        </SidebarGroup>
        {/* group end */}
      </SidebarContent>
      <WorkspaceSidebarFooter />
    </React.Fragment>
  );
}
