import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    authStore.initialize();
  }, []);

  return authStore;
};