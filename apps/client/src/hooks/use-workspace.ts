import { WorkspaceService } from "@/lib/workspace-service";
import { CreateWorkspaceForm } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useWorkspace() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createWorkspaceMutation = useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: (data: CreateWorkspaceForm) => WorkspaceService.create(data),
    onSuccess(res) {
      console.log(res);
      toast.success("Success", {
        description: "Workspace created successfully",
      });
    },
    onError(e) {
      console.log(e);
      toast.success("Something went wrong", {
        description: "Error creating workspace",
      });
    },
  });

  return {
    createWorkspaceMutation,
  };
}
