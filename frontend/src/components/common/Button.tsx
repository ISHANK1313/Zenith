import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'yellow' | 'cyan' | 'pink' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'yellow',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'border-4 border-black font-bold uppercase transition-all active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0';

  const variantStyles = {
    yellow: 'bg-brutal-yellow hover:bg-brutal-cyan shadow-brutal',
    cyan: 'bg-brutal-cyan hover:bg-brutal-pink shadow-brutal',
    pink: 'bg-brutal-pink hover:bg-brutal-lime shadow-brutal',
    lime: 'bg-brutal-lime hover:bg-brutal-yellow shadow-brutal',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};