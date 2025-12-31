import { z } from 'zod';

export const signupSchema = z.object({
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z
    .string()
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email or username is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export const scoreSchema = z.object({
  score: z
    .number()
    .min(0, 'Score must be positive')
    .max(1000000, 'Score cannot exceed 1,000,000'),
});