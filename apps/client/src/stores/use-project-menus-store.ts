import { Project } from "@/lib/workspace-service";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ProjectMenuState {
  active: Project | null;
}

interface Actions {
  setActive(active: Project): void;
}

export const useProjectMenuStore = create<ProjectMenuState & Actions>()(
  immer((set) => ({
    active: null,
    setActive: (active: Project | null) => {
      set((state) => {
        state.active = active;
      });
    },
  }))
);
