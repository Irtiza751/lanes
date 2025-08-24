import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { Search, SquarePen } from "lucide-react";

export function WorkspaceSidebarHeader() {
  return (
    <SidebarHeader className="flex-row justify-between">
      <WorkspaceSwitcher
        workspace={{
          color: "green",
          id: 1,
          logoUrl: "",
          name: "Waredrop",
          ownerId: "1",
          slug: "waredrop",
          description: "some description for waredrop",
        }}
      />
      <div className="space-x-2">
        <Button size="sm-icon" variant="ghost">
          <Search />
        </Button>
        <Button size="sm-icon" variant="secondary">
          <SquarePen />
        </Button>
      </div>
    </SidebarHeader>
  );
}
