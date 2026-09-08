import { create } from 'zustand';

type AppStore = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));
