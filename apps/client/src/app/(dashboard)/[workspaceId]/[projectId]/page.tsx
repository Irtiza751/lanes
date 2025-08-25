import React from "react";
import { getQueryClient } from "@/lib/get-query-client";
import { AuthService } from "@/lib/auth-service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCookie } from "@/lib/get-cookie";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  const queryClient = getQueryClient();
  const authService = new AuthService();

  const whoami = await queryClient.prefetchQuery({
    queryKey: ["whoami"],
    queryFn: async () =>
      AuthService.whoami({ accessToken: await getCookie("accessToken") }),
  });

  console.log("Whoami:", whoami);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4">
        <p>Workspace: {workspaceId}</p>
        <p>Project: {projectId}</p>
      </div>
    </HydrationBoundary>
  );
}
