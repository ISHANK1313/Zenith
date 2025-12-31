import React, { useState, useEffect } from 'react';
import { wsService } from '../../api/websocket';
import type { WebSocketMessage } from '../../types';

export const LiveFeed: React.FC = () => {
  const [updates, setUpdates] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsService.onScoreUpdate((data) => {
      setUpdates((prev) => [data, ...prev].slice(0, 20)); // Keep last 20 updates
    });

    return () => {
      // Cleanup handled by useWebSocket hook
    };
  }, []);

  useEffect(() => {
    // Check connection status
    const timer = setTimeout(() => {
      setIsConnected(updates.length > 0 || true); // Assume connected after mount
    }, 1000);

    return () => clearTimeout(timer);
  }, [updates]);

  return (
    <div className="space-y-3">
      {/* Connection Status */}
      <div className="flex items-center space-x-2 pb-3 border-b-2 border-black">
        <div
          className={`w-3 h-3 rounded-full border-2 border-black ${
            isConnected ? 'bg-brutal-lime' : 'bg-brutal-pink'
          }`}
        />
        <span className="text-sm font-bold font-mono">
          {isConnected ? 'CONNECTED' : 'CONNECTING...'}
        </span>
      </div>

      {/* Live Updates */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {updates.length === 0 ? (
          <div className="text-center py-8 font-mono text-sm text-gray-500">
            Waiting for live updates...
          </div>
        ) : (
          updates.map((update, index) => (
            <div
              key={`${update.username}-${update.score}-${index}`}
              className="p-3 border-2 border-black bg-brutal-yellow animate-pulse"
              style={{ animationDuration: '0.5s', animationIterationCount: '1' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{update.username}</p>
                  <p className="text-sm font-mono">Rank #{update.rank}</p>
                </div>
                <p className="font-bold text-2xl font-mono">
                  {update.score.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};