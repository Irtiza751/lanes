import { CreateIssue, IssueService } from "@/lib/issue-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useIssue() {
  const queryClient = useQueryClient();

  const createIssueMutation = useMutation({
    mutationKey: ["create-issue"],
    mutationFn: (data: CreateIssue) => IssueService.create(data),
    onSuccess() {
      toast.success("Success", {
        description: "Issue successfully created",
      });
    },
  });

  return {
    createIssueMutation,
  };
}
