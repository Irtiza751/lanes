import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
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
      </Sidebar>
      <SidebarInset className="border bg-sidebar">{children}</SidebarInset>
    </SidebarProvider>
  );
}
