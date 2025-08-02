import { SidebarFooter } from "@/components/ui/sidebar";
import Link from "next/link";

export function WorkspaceSidebarFooter() {
  return (
    <SidebarFooter>
      <div className="rounded-md border border-input flex flex-col px-4 py-3">
        <small className="text-muted-foreground">What's new</small>
        <Link href="/" className="hover:underline text-xs">
          Agent integration guide
        </Link>
      </div>
    </SidebarFooter>
  );
}
