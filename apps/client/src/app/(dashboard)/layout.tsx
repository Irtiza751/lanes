import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { WorkspaceSidebar } from "./_components/workspace-sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  // if open then true else false
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const sidebarWidth = cookieStore.get("sidebar_width")?.value;
  // console.log(sidebarState);
  let defaultOpen = false;

  if (sidebarState) {
    defaultOpen = sidebarState === "true";
  }

  return (
    <SidebarProvider
      className="bg-background"
      defaultOpen={defaultOpen}
      defaultWidth={sidebarWidth}
    >
      <Sidebar variant="inset" className="bg-background">
        <WorkspaceSidebar />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="border bg-sidebar">{children}</SidebarInset>
    </SidebarProvider>
  );
}
