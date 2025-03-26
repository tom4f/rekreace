import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  isLogged: boolean;
  user: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token: sessionStorage.getItem('authToken') || null,
    isLogged: !!sessionStorage.getItem('authToken'),
    user: null,

    login: (token, user) => {
      sessionStorage.setItem('authToken', token);
      set({ token, isLogged: true, user });
    },

    logout: () => {
      sessionStorage.removeItem('authToken');
      set({ token: null, isLogged: false, user: null });
    },
  }))
);
