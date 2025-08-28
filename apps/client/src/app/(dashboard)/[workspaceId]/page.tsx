import { redirect } from "next/navigation";

export default async function Workspace({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  if (workspaceId) {
    return redirect(`/${workspaceId}/waredrop`);
  }
  return (
    <div className="p-4">
      <h1>Workspace: {workspaceId}</h1>
    </div>
  );
}
