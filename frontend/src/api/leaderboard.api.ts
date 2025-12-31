import axiosInstance from './axios';
import type { LeaderboardEntry } from '../types';

export const leaderboardApi = {
  getTop10: async (): Promise<LeaderboardEntry[]> => {
    const response = await axiosInstance.get<LeaderboardEntry[]>('/leaderboard/top10');
    return response.data;
  },

  getRank: async (username: string): Promise<number | string> => {
    const response = await axiosInstance.get<number | string>(`/leaderboard/rank?username=${username}`);
    return response.data;
  },

  getScore: async (username: string): Promise<number> => {
    const response = await axiosInstance.get<number>(`/leaderboard/score?username=${username}`);
    return response.data;
  },
};