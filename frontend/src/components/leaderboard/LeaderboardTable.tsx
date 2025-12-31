import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '../../api/leaderboard.api';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { RankBadge } from './RankBadge';
import { useAuthStore } from '../../store/authStore';

export const LeaderboardTable: React.FC = () => {
  const { username: currentUser } = useAuthStore();

  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: leaderboardApi.getTop10,
    refetchInterval: 30000, // Refetch every 30 seconds
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
      <div className="text-center py-8">
        <p className="text-brutal-pink font-bold">Failed to load leaderboard</p>
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="text-center py-8 font-mono">
        <p>No players yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {leaderboard.map((entry) => (
        <div
          key={entry.username}
          className={`flex items-center justify-between p-4 border-4 border-black ${
            entry.username === currentUser
              ? 'bg-brutal-yellow'
              : entry.rank <= 3
              ? 'bg-brutal-cyan'
              : 'bg-white'
          }`}
        >
          <div className="flex items-center space-x-4">
            <RankBadge rank={entry.rank} />
            <div>
              <p className="font-bold text-lg">
                {entry.username}
                {entry.username === currentUser && (
                  <span className="ml-2 text-sm">(YOU)</span>
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono">
              {entry.score.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};