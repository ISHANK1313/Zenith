export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'zenith_token',
  USER: 'zenith_user',
} as const;

export const COLORS = {
  YELLOW: '#FFE951',
  CYAN: '#00F0FF',
  PINK: '#FF006B',
  LIME: '#00FF00',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
} as const;