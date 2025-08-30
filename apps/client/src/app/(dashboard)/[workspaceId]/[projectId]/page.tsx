import React from "react";
// import { getQueryClient } from "@/lib/get-query-client";
// import { AuthService } from "@/lib/auth-service";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getCookie } from "@/lib/get-cookie";
import { ProjectsPage } from "../../_components/projects";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["whoami"],
  //   queryFn: async () =>
  //     AuthService.whoami({ accessToken: await getCookie("access_token") }),
  //   retry: false,
  // });

  // await sleep(8000); // Simulate a delay for loading state demonstration

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <div className="p-4 space-y-4">
      <div>
        <p>Workspace: {workspaceId}</p>
        <p>Project: {projectId}</p>
      </div>
      <ProjectsPage />
    </div>
    // </HydrationBoundary>
  );
}
