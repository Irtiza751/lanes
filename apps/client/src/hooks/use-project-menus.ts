import { WorkspaceService } from "@/lib/workspace-service";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useQuery } from "@tanstack/react-query";

export function useProjectMenus() {
  const active = useWorkspaceStore((state) => state.active);

  return useQuery({
    queryKey: ["project-menus", active?.workspace.slug],
    queryFn: () => WorkspaceService.fetchProjects(active?.workspace.slug || ""),
    staleTime: 2 * 60 * 60 * 1000,
    enabled: !!active,
    retry: 2,
  });
}
