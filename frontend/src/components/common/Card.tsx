import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'yellow' | 'cyan' | 'pink' | 'lime' | 'white';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  color = 'white'
}) => {
  const colorStyles = {
    yellow: 'bg-brutal-yellow',
    cyan: 'bg-brutal-cyan',
    pink: 'bg-brutal-pink',
    lime: 'bg-brutal-lime',
    white: 'bg-white',
  };

  return (
    <div className={`border-4 border-black shadow-brutal p-6 ${colorStyles[color]} ${className}`}>
      {children}
    </div>
  );
};