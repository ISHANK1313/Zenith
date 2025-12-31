import { useQuery } from '@tanstack/react-query';
import { leaderboardApi } from '../api/leaderboard.api';

export const useLeaderboard = (username: string) => {
  const { data: userRank, refetch: refetchRank } = useQuery({
    queryKey: ['userRank', username],
    queryFn: () => leaderboardApi.getRank(username),
    enabled: !!username,
    retry: false,
  });

  const { data: userScore, refetch: refetchScore } = useQuery({
    queryKey: ['userScore', username],
    queryFn: () => leaderboardApi.getScore(username),
    enabled: !!username,
    retry: false,
  });

  const refetch = () => {
    refetchRank();
    refetchScore();
  };

  return {
    userRank,
    userScore,
    refetch,
  };
};