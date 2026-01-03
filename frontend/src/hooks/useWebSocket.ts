import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { wsService } from '../api/websocket';
import { useQueryClient } from '@tanstack/react-query';

export const useWebSocket = () => {
  const queryClient = useQueryClient();
  const hasConnected = useRef(false);

  useEffect(() => {
    if (hasConnected.current) return;
    hasConnected.current = true;

    wsService.connect(
      () => {
        console.log('WebSocket connected successfully');
      },
      (error) => {
        console.error('WebSocket connection error:', error);
        toast.error('Live updates disconnected');
      }
    );
     // Invalidate queries on any score update
         wsService.onScoreUpdate(() => {
           queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
           queryClient.invalidateQueries({ queryKey: ['userRank'] });
           queryClient.invalidateQueries({ queryKey: ['userScore'] });
         });
         // Also invalidate on top 10 updates
    wsService.onTop10Update(() => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['userRank'] });
      queryClient.invalidateQueries({ queryKey: ['userScore'] });
    });

    return () => {
      wsService.disconnect();
      hasConnected.current = false;
    };
  }, [queryClient]);
};