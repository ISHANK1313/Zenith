import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { loginSchema } from '../utils/validation';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import type { LoginRequest } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);

      // Extract username from identifier (could be email or username)
      const username = data.identifier.includes('@')
        ? data.identifier.split('@')[0]
        : data.identifier;

      login(response.token, data.identifier, username);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-brutal-cyan">
      <Card className="max-w-md w-full bg-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase mb-2">WELCOME BACK</h1>
          <p className="font-mono text-sm">Login to continue your climb.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="EMAIL OR USERNAME"
            placeholder="you@example.com or username"
            {...register('identifier')}
            error={errors.identifier?.message}
            disabled={isLoading}
          />

          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="cyan"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-mono text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold underline hover:text-brutal-lime">
              SIGNUP HERE
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};