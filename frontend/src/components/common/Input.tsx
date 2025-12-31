import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-bold uppercase text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-0 focus:border-brutal-cyan bg-white font-mono ${
            error ? 'border-brutal-pink' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-brutal-pink font-bold">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';