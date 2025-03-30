import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
} from 'zustand/middleware';

type AuthState = {
  token: string | null;
  isLogged: boolean;
  user: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        isLogged: false,
        user: null,

        login: (token, user) => {
          set({ token, isLogged: true, user });
        },

        logout: () => {
          set({ token: null, isLogged: false, user: null });
        },
      }),
      {
        name: 'authToken',
        storage: createJSONStorage(() => sessionStorage),
      } as PersistOptions<AuthState>
    ),
    { enabled: process.env.NODE_ENV !== 'production' }
  )
);
