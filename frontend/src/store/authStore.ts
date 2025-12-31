import { create } from 'zustand';
import { STORAGE_KEYS } from '../utils/constants';

interface AuthState {
  token: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string, username: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  username: null,
  email: null,
  isAuthenticated: false,

  login: (token, email, username) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ email, username }));
    set({ token, email, username, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    set({ token: null, email: null, username: null, isAuthenticated: false });
  },

  initialize: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          token,
          email: user.email,
          username: user.username,
          isAuthenticated: true
        });
      } catch (error) {
        // Invalid stored data
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
  },
}));