import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-brutal-pink">
      <Card className="max-w-md text-center">
        <div className="text-8xl mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4 uppercase">PAGE NOT FOUND</h1>
        <p className="mb-6 font-mono">
          This page doesn't exist. Maybe it fell off the leaderboard?
        </p>
        <Link to="/">
          <Button variant="yellow" size="lg">
            GO HOME
          </Button>
        </Link>
      </Card>
    </div>
  );
};