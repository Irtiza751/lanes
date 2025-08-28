import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { WorkspaceSidebar } from "./_components/workspace-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background">
      <Sidebar variant="inset" className="bg-background">
        <WorkspaceSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="border bg-sidebar">{children}</SidebarInset>
    </SidebarProvider>
  );
}
