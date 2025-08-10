"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "px-2 h-9 flex items-center gap-2 border-b border-input",
        className
      )}
    >
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
  return <h4 className={cn("text-sm font-bold", className)}>{children}</h4>;
}

export function ToggleSidebarTrigger() {
  const sidebar = useSidebar();
  return (
    <Button variant="ghost" size="sicon" onClick={sidebar.toggleSidebar}>
      <Sidebar />
    </Button>
  );
}
