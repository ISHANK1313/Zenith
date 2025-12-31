import axiosInstance from './axios';
import type { SignupRequest, LoginRequest, AuthResponse } from '../types';

export const authApi = {
  signup: async (data: SignupRequest): Promise<string> => {
    const response = await axiosInstance.post<string>('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};