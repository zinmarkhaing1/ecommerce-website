import { useAppStore } from '../../../app/store';
import { useShallow } from 'zustand/react/shallow';

export function useAuth() {
  return useAppStore(useShallow((state) => ({
    isAuthenticated: state.isAuthenticated,
    isHydrated: state.isHydrated,
    user: state.user,
    login: state.setSession,
    logout: state.clearSession,
  })));
}
