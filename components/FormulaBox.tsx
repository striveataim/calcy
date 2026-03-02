'use client';

import { ReactNode } from 'react';

export function FormulaBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-100 border-1.5 border-blue-300 rounded-md p-4 mb-7">
      {children}
    </div>
  );
}

export function FormulaTitle({ children }: { children: ReactNode }) {
  return <div className="font-mono text-xs tracking-wider uppercase text-blue-600 mb-2">{children}</div>;
}

export function FormulaEquation({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-sm text-text bg-white/60 px-3.5 py-2 rounded-md mb-1.5 inline-block">
      {children}
    </div>
  );
}

export function FormulaNote({ children }: { children: ReactNode }) {
  return <div className="text-xs text-muted mt-1.5">{children}</div>;
}
