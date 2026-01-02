import type React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { scoreApi } from '../../api/score.api';
import { scoreSchema } from '../../utils/validation';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface ScoreFormData {
  score: number;
}

interface ScoreFormProps {
  onSuccess?: () => void;
}

export const ScoreForm: React.FC<ScoreFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScoreFormData>({
    resolver: zodResolver(scoreSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ScoreFormData) => scoreApi.submitScore(data),
    onSuccess: () => {
      toast.success('Score submitted! 🚀');
      reset();
      queryClient.invalidateQueries({ queryKey: ['scores'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      if (onSuccess) onSuccess();
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: string } };
      const errorMessage = axiosError.response?.data || 'Failed to submit score';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: ScoreFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="number"
        placeholder="Enter your score (0-1,000,000)"
        {...register('score', { valueAsNumber: true })}
        error={errors.score?.message}
        disabled={mutation.isPending}
      />

      <Button
        type="submit"
        variant="yellow"
        size="md"
        className="w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'SUBMITTING...' : 'SUBMIT SCORE'}
      </Button>
    </form>
  );
};