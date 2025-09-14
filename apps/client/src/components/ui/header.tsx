"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ListFilter, Settings2, Sidebar } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";

export function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const active = useWorkspaceStore((state) => state.active);
  return (
    <header
      className={cn(
        "px-4 h-10 flex items-center gap-2 border-b border-input",
        className
      )}
    >
      <HeaderTitle>{active?.workspace.name}</HeaderTitle>
      {children}
    </header>
  );
}

export function HeaderTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h4 className={cn("text-md font-semibold", className)}>{children}</h4>;
}

export function ToggleSidebarTrigger() {
  const sidebar = useSidebar();
  return (
    <Button variant="ghost" size="sm-icon" onClick={sidebar.toggleSidebar}>
      <Sidebar />
    </Button>
  );
}

export function SubHeader({
  // children,
  className,
}: {
  // children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 h-10 flex items-center justify-between gap-2 border-b border-input",
        className
      )}
    >
      {/* {children} */}
      <Button className="text-little" variant="ghost" size="xs">
        <ListFilter className="text-muted-foreground" />
        Filter
      </Button>
      <Button className="text-little" variant="secondary" size="xs">
        <Settings2 className="text-muted-foreground" />
        Display
      </Button>
    </div>
  );
}
