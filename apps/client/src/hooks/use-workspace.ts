import { WorkspaceService } from "@/lib/workspace-service";
import { CreateWorkspaceForm } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useWorkspace() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createWorkspaceMutation = useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: (data: CreateWorkspaceForm) => WorkspaceService.create(data),
    onSuccess({ data }) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      router.push(`/${data.data.slug}`);
      toast.success("Success", {
        description: "Workspace created successfully",
      });
    },
    onError(e) {
      console.log(e);
      if (e instanceof AxiosError) {
        toast.error("Error creating workspace", {
          description: e.response?.data.message,
        });
        return;
      }
      toast.error("Something went wrong", {
        description: "Error creating workspace",
      });
    },
  });

  return {
    createWorkspaceMutation,
  };
}
