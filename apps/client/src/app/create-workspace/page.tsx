import AnimatedText from "./components/animated-text";
import CreateWorkspaceForm from "./components/create-workspace-form";

export default function CreateWorkspacePage() {
  return (
    <main className="min-h-svh w-full flex flex-col justify-center items-center bg-background">
      <div className="max-w-md text-center mb-6">
        <AnimatedText>
          <h4 className="text-[1.5rem] font-medium mb-4">
            Create or join a workspace
          </h4>
        </AnimatedText>
        <AnimatedText delay={0.12}>
          <p className="text-muted-foreground text-sm">
            Workspaces are shared environments where teams can work on projects,
            cycles and issues.
          </p>
        </AnimatedText>
      </div>
      <CreateWorkspaceForm />
    </main>
  );
}
