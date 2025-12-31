// User types
export interface User {
  email: string;
  username: string;
}

export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Score types
export interface Score {
  id: number;
  score: number;
  submittedAt: string;
}

export interface ScoreSubmitRequest {
  score: number;
}

// Leaderboard types
export interface LeaderboardEntry {
  username: string;
  score: number;
  rank: number;
}

// WebSocket types
export interface WebSocketMessage {
  username: string;
  score: number;
  rank: number;
}

// API Error
export interface ApiError {
  message: string;
  status?: number;
}