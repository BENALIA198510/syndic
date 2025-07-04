import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      {
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'default',
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': variant === 'success',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': variant === 'warning',
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': variant === 'danger',
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': variant === 'info',
      },
      className
    )}
    >
      {children}
    </span>
  );
}