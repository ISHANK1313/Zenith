import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ScoreForm } from '../components/score/ScoreForm';
import { ScoreHistory } from '../components/score/ScoreHistory';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { LiveFeed } from '../components/score/LiveFeed';
import { Card } from '../components/common/Card';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useWebSocket } from '../hooks/useWebSocket';

export const Dashboard: React.FC = () => {
  const { isAuthenticated, username } = useAuthStore();
  const navigate = useNavigate();
  const { userRank, userScore, refetch } = useLeaderboard(username || '');

  useWebSocket(); // Initialize WebSocket connection

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleScoreSubmit = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brutal-yellow via-brutal-cyan to-brutal-pink p-4 md:p-8">
      <div className="container mx-auto space-y-6">
        {/* User Stats Header */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card color="yellow">
            <h3 className="text-sm font-bold mb-2 uppercase">YOUR USERNAME</h3>
            <p className="text-3xl font-bold">{username}</p>
          </Card>

          <Card color="cyan">
            <h3 className="text-sm font-bold mb-2 uppercase">YOUR RANK</h3>
            <p className="text-3xl font-bold">
              {typeof userRank === 'number' ? `#${userRank}` : userRank || '—'}
            </p>
          </Card>

          <Card color="pink">
            <h3 className="text-sm font-bold mb-2 uppercase">BEST SCORE</h3>
            <p className="text-3xl font-bold">
              {userScore !== null ? userScore.toLocaleString() : '—'}
            </p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Score Submission & History */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">SUBMIT SCORE</h2>
              <ScoreForm onSuccess={handleScoreSubmit} />
            </Card>

            <Card className="bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">YOUR HISTORY</h2>
              <ScoreHistory />
            </Card>
          </div>

          {/* Middle Column - Leaderboard */}
          <div className="lg:col-span-1">
            <Card className="bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">🏆 TOP 10</h2>
              <LeaderboardTable />
            </Card>
          </div>

          {/* Right Column - Live Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-white">
              <h2 className="text-2xl font-bold uppercase mb-4">⚡ LIVE FEED</h2>
              <LiveFeed />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};