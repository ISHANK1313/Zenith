import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { scoreApi } from '../../api/score.api';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const ScoreHistory: React.FC = () => {
  const { data: scores, isLoading, error } = useQuery({
    queryKey: ['scores'],
    queryFn: scoreApi.getScores,
  });

  if (isLoading) {
    return (
      <div className="py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 font-mono text-sm text-brutal-pink">
        No scores yet. Submit your first one!
      </div>
    );
  }

  if (!scores || scores.length === 0) {
    return (
      <div className="text-center py-4 font-mono text-sm">
        No scores yet. Submit your first one!
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {scores.map((score) => (
        <div
          key={score.id}
          className="flex justify-between items-center p-3 border-2 border-black bg-gray-50"
        >
          <div>
            <p className="font-bold font-mono text-xl">
              {score.score.toLocaleString()}
            </p>
            <p className="text-xs font-mono text-gray-600">
              {new Date(score.submittedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};