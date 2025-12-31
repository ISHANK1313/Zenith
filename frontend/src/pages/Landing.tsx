import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const Landing: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold uppercase leading-tight">
            REACH THE
            <br />
            <span className="text-brutal-yellow [-webkit-text-stroke:2px_black]">
              ZENITH
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto">
            COMPETE • CLIMB • CONQUER
            <br />
            Real-time leaderboard. Top 10,000 players. Only the best survive.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button variant="yellow" size="lg" className="w-full">
              START CLIMBING
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="cyan" size="lg" className="w-full">
              I HAVE ACCOUNT
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-16">
          <Card color="yellow">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-xl mb-2">REAL-TIME</h3>
            <p className="font-mono text-sm">
              Live updates via WebSocket. See scores change instantly.
            </p>
          </Card>

          <Card color="cyan">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold text-xl mb-2">TOP 10K</h3>
            <p className="font-mono text-sm">
              Only the best 10,000 players make it to the leaderboard.
            </p>
          </Card>

          <Card color="pink">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-xl mb-2">TRACK HISTORY</h3>
            <p className="font-mono text-sm">
              View all your submissions and climb the ranks.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};