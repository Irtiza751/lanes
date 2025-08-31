import { Card, CardContent } from "@/components/ui/card";
import CreateWorkspaceForm from "./components/create-workspace-form";

export default function CreateWorkspacePage() {
  return (
    <main className="min-h-svh w-full flex flex-col justify-center items-center">
      <div className="max-w-md text-center mb-6">
        <h4 className="text-xl font-medium mb-4">Create or join a workspace</h4>
        <p className="text-muted-foreground text-sm">
          Workspaces are shared environments where teams can work on projects,
          cycles and issues.
        </p>
      </div>
      <CreateWorkspaceForm />
    </main>
  );
}
