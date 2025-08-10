import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ProjectMenu } from "./_components/project-menu-item";
import { Inbox, KanbanSquare } from "lucide-react";
import { WorkspaceSidebarFooter } from "./_components/workspace-sidebar-footer";
import { WorkspaceSidebarHeader } from "./_components/workspace-sidebar-header";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background">
      <Sidebar variant="inset" className="bg-background">
        <WorkspaceSidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <Link href="/shispare/inbox">
                    <span>
                      <Inbox size={14} />
                    </span>
                    <span>Inbox</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm">
                  <Link href="/shispare/my-tasks">
                    <span>
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
                name="Waredrop"
                iconClass="text-indigo-400"
                defaultOpen
              />
              <ProjectMenu
                name="Shispare"
                iconClass="text-orange-400"
                defaultOpen
              />
            </SidebarMenu>
          </SidebarGroup>
          {/* group end */}
        </SidebarContent>
        <WorkspaceSidebarFooter />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="border bg-sidebar">
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
