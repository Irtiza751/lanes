import { create } from 'zustand'

export interface Workspace {
  id: number
  slug: string
  ownerId: string
  name: string
  logoUrl: string
  color: string
  description?: string
}

interface WorkspaceState {
  workspace: Workspace | null
  workspaces: Workspace[]
  setWorkspace: (workspace: Workspace) => void
  setWorkspaces: (workspaces: Workspace[]) => void
}

export const useWorkspace = create<WorkspaceState>((set) => ({
  workspace: null,
  workspaces: [],
  setWorkspace: (workspace: Workspace) => set({ workspace }),
  setWorkspaces: (workspaces: Workspace[]) => set({ workspaces }),
}))
