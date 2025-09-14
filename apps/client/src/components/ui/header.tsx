"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "lucide-react";
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
