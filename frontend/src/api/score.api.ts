import axiosInstance from './axios';
import type { Score, ScoreSubmitRequest } from '../types';

export const scoreApi = {
  submitScore: async (data: ScoreSubmitRequest): Promise<string> => {
    const response = await axiosInstance.post<string>('/score/addscore', data);
    return response.data;
  },

  getScores: async (): Promise<Score[]> => {
    const response = await axiosInstance.get<Score[]>('/score/getscores');
    return response.data;
  },
};