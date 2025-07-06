import { create } from 'zustand';

interface AppStore {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showSidebar: true,
  toggleSidebar: () => set(state => ({ showSidebar: !state.showSidebar }))
}));