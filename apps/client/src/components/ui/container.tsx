import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-2 py-2 overflow-auto h-full", className)}>
      {children}
    </div>
  );
}
