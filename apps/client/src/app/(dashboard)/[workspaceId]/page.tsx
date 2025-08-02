export default async function Workspace({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  return (
    <div className="p-4">
      <h1>Workspace: {workspaceId}</h1>
    </div>
  );
}
