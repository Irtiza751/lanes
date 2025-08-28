import React from "react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  return (
    <div className="p-4">
      <p>Workspace: {workspaceId}</p>
      <p>Project: {projectId}</p>
    </div>
  );
}
