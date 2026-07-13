'use client';

import React from 'react';

export interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  size = 'md',
  text = 'Loading...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
  };

  // Build the spinner’s className
  const spinnerClasses =
    `animate-spin rounded-full border-solid ` +
    `border-[var(--color-primary)] border-t-transparent ` +
    `${sizeClasses[size]} ` +
    `${className}`;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <span className="sr-only">Loading</span>
      </div>
      {text && <p className="animate-pulse text-sm text-[var(--color-text-muted)]">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm transition-all">
        {spinner}
      </div>
    );
  }

  return spinner;
};