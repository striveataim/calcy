'use client';

import { ReactNode } from 'react';

export function InputField({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
}) {
  return (
    <div className="mb-4.5 last:mb-0">
      {label && (
        <label className="flex items-center gap-1.5 text-sm font-semibold text-text mb-1.5">
          {label}
          {hint && <span className="font-normal text-xs text-soft">{hint}</span>}
        </label>
      )}
      <input
        className="w-full px-4 py-3 bg-surface border-1.5 border-border rounded-md font-sans text-base text-text outline-none transition-all focus:border-blue-500 focus:shadow-none placeholder:text-soft"
        {...props}
      />
    </div>
  );
}

export function SelectField({
  label,
  hint,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="mb-4.5 last:mb-0">
      {label && (
        <label className="flex items-center gap-1.5 text-sm font-semibold text-text mb-1.5">
          {label}
          {hint && <span className="font-normal text-xs text-soft">{hint}</span>}
        </label>
      )}
      <select
        className="w-full px-4 py-3 bg-surface border-1.5 border-border rounded-md font-sans text-base text-text outline-none transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width=%2710%27%20height=%276%27%20viewBox=%270%200%2010%206%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M1%201l4%204%204-4%27%20stroke=%27%23aba69f%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center] pr-10 focus:border-blue-500"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
