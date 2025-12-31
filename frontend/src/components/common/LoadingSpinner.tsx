import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-black border-t-brutal-yellow animate-spin"></div>
    </div>
  );
};