import React, { useCallback } from "react";

interface Workspace {
  workspaceId: string;
  changeWorkspace: (name: string) => void;
}

const WorkspaceContext = React.createContext<Workspace | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaceId, setWorkspace] = React.useState("");

  const changeWorkspace = useCallback((name: string) => {
    localStorage.setItem("workspaceId", name);
    setWorkspace(name);
  }, []);

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
