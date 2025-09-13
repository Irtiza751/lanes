import { Workspaces } from "@/lib/workspace-service";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WorkspaceState {
  active: Workspaces[number] | null; // workspace slug
  available: Workspaces; // list of available workspaces
}

interface Actions {
  setActive(active: Workspaces[number] | null): void;
  setAvailable(list: Workspaces): void;
}

export const useWorkspaceStore = create<WorkspaceState & Actions>()(
  immer((set) => ({
    active: null,
    available: [],
    setActive: (active: Workspaces[number] | null) => {
      set((state) => {
        state.active = active;
      });
    },
    setAvailable: (list: Workspaces) => {
      set((state) => {
        state.available = list;
      });
    },
  }))
);
