'use client';

import { ReactNode } from 'react';
import { copyResult } from '@/lib/utils';

export function ResultBox({
  show,
  color,
  label,
  value,
  note,
  valueId,
  grid,
}: {
  show: boolean;
  color: 'blue' | 'green' | 'amber' | 'red';
  label: string;
  value: string;
  note?: ReactNode;
  valueId?: string;
  grid?: ReactNode;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300',
    green: 'bg-green-100 border-green-400',
    amber: 'bg-amber-100 border-amber-300',
    red: 'bg-red-100 border-red-400',
  };

  const valueColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    red: 'text-red-600',
  };

  return (
    <div
      className={`mt-5 border-1.5 rounded-lg p-0 max-h-0 overflow-hidden transition-all ${
        show ? `max-h-96 p-7 ${colorClasses[color]}` : ''
      }`}
    >
      <div className="font-mono text-xs tracking-wider uppercase text-muted mb-2">{label}</div>
      <div className={`font-serif text-7xl leading-none mb-1.5 ${valueColorClasses[color]}`} id={valueId}>
        {value}
      </div>
      {note && <div className="text-sm text-muted mb-3.5 leading-relaxed">{note}</div>}
      {grid && <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3 mt-4">{grid}</div>}
      {valueId && (
        <div className="flex gap-2 mt-3.5 flex-wrap">
          <button
            onClick={() => copyResult(valueId)}
            className="inline-flex items-center gap-1.25 bg-white/60 border-1.5 border-black/8 text-text2 px-3.5 py-1.75 rounded-md text-xs font-bold cursor-pointer transition-all hover:bg-white/90"
          >
            📋 Copy Result
          </button>
        </div>
      )}
    </div>
  );
}

export function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: { [key: string]: string } = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    amber: 'text-amber-600',
  };

  return (
    <div className="bg-white/70 rounded-md p-3.5 text-center">
      <div className={`font-serif text-3xl mb-0.5 ${colorMap[color] || 'text-blue-600'}`}>{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
