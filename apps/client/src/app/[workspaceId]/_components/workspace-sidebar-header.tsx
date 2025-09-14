import CreateIssueDialog from "@/components/create-issue-dialog";
import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/ui/sidebar";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { Search, SquarePen } from "lucide-react";

export function WorkspaceSidebarHeader() {
  return (
    <SidebarHeader className="flex-row justify-between">
      <WorkspaceSwitcher />
      <div className="flex items-center gap-2">
        <Button size="sm-icon" variant="ghost">
          <Search />
        </Button>
        <CreateIssueDialog>
          <Button size="sm-icon" variant="secondary">
            <SquarePen />
          </Button>
        </CreateIssueDialog>
      </div>
    </SidebarHeader>
  );
}
