'use client';

import { ReactNode } from 'react';

export function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-bold cursor-pointer border-none transition-all ml-2.5 hover:bg-blue-700 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-muted rounded-md text-sm font-bold cursor-pointer border-1.5 border-border transition-all hover:border-border2 hover:text-text"
    >
      {children}
    </button>
  );
}
