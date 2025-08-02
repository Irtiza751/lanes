import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-background">
      <Sidebar variant="inset" className="bg-background">
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>
          <p>Test</p>
        </SidebarContent>
        <SidebarFooter>
          <p>Footer</p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="border bg-sidebar">
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
