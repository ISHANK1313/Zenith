import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '../api/auth.api';
import { signupSchema } from '../utils/validation';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import type { SignupRequest } from '../types';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupRequest) => {
    setIsLoading(true);
    try {
      const response = await authApi.signup(data);
      toast.success(response || 'Account created! Please login.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-brutal-lime">
      <Card className="max-w-md w-full bg-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold uppercase mb-2">CREATE ACCOUNT</h1>
          <p className="font-mono text-sm">Join the competition. Reach the zenith.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="USERNAME"
            placeholder="coolplayer123"
            {...register('userName')}
            error={errors.userName?.message}
            disabled={isLoading}
          />

          <Input
            label="EMAIL"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
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
            variant="lime"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-mono text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold underline hover:text-brutal-cyan">
              LOGIN HERE
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};