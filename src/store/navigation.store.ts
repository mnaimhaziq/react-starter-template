import { create } from "zustand";

interface NavigationState {
  path: string;
  isCollapsed: boolean;
  openMenus: Record<string, boolean>;
  showProfileMenu: boolean;
  setPath: (path: string) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  toggleSubmenu: (name: string) => void;
  setShowProfileMenu: (show: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  path: "",
  isCollapsed: false,
  openMenus: {},
  showProfileMenu: false,
  setPath: (path) => set({ path }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  toggleSubmenu: (name) =>
    set((state) => ({
      openMenus: { ...state.openMenus, [name]: !state.openMenus[name] },
    })),
  setShowProfileMenu: (show) => set({ showProfileMenu: show }),
}));