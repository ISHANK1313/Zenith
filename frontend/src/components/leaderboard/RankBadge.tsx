import React from 'react';

interface RankBadgeProps {
  rank: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => {
  const getBadgeStyle = () => {
    if (rank === 1) {
      return 'bg-brutal-yellow text-black';
    } else if (rank === 2) {
      return 'bg-gray-400 text-black';
    } else if (rank === 3) {
      return 'bg-orange-400 text-black';
    }
    return 'bg-white text-black';
  };

  const getMedal = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center border-4 border-black font-bold ${getBadgeStyle()}`}
    >
      {getMedal() || `#${rank}`}
    </div>
  );
};