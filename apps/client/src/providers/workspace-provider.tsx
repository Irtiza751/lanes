import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Workspace {
  workspaceId: string;
  changeWorkspace: (name: string) => void;
}

const WorkspaceContext = React.createContext<Workspace | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaceId, setWorkspace] = React.useState("");
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();

  useEffect(() => {
    const storedWorkspace = localStorage.getItem("workspaceId");
    if (storedWorkspace) {
      setWorkspace(storedWorkspace);
      router.push(`/${storedWorkspace}`);
    }
  }, []);

  useEffect(() => {
    if (params.workspaceId) {
      // console.log("Workspace ID from params:", params.workspaceId);
      setWorkspace(params.workspaceId);
      localStorage.setItem("workspaceId", params.workspaceId);
    }
  }, [params.workspaceId]);

  const changeWorkspace = (name: string) => {
    localStorage.setItem("workspaceId", name);
    setWorkspace(name);
  };

  return (
    <WorkspaceContext.Provider value={{ workspaceId, changeWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
