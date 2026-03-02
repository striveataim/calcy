'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { format, valid, getDivision, clamp } from '@/lib/utils';

export default function Division() {
  const [inputType, setInputType] = useState('cgpa');
  const [value, setValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ division: { label: '', emoji: '', cls: '' }, cgpa: 0, percentage: 0 });

  useEffect(() => {
    calculateResult();
  }, [inputType, value]);

  function calculateResult() {
    const rawVal = parseFloat(value);
    if (isNaN(rawVal)) {
      setShowResult(false);
      return;
    }

    const cgpa = inputType === 'cgpa' ? rawVal : clamp(rawVal / 9.5, 0, 10);
    if (!valid(cgpa, 0, 10)) {
      setShowResult(false);
      return;
    }

    const division = getDivision(cgpa);
    const percentage = cgpa * 9.5;

    setResult({ division, cgpa, percentage });
    setShowResult(true);
  }

  const divisionData = [
    { range: '9.0 – 10.0', equiv: '85.5% – 95%+', label: 'Distinction', emoji: '🏅', cls: 'bg-yellow-100 text-yellow-800' },
    { range: '7.5 – 8.99', equiv: '71.25% – 85.4%', label: 'First Class', emoji: '✅', cls: 'bg-green-100 text-green-800' },
    { range: '6.0 – 7.49', equiv: '57% – 71.2%', label: 'Second Class', emoji: '📘', cls: 'bg-blue-100 text-blue-800' },
    { range: '5.0 – 5.99', equiv: '47.5% – 56.9%', label: 'Pass Class', emoji: '📋', cls: 'bg-amber-100 text-amber-800' },
    { range: 'Below 5.0', equiv: 'Below 47.5%', label: 'Fail', emoji: '❌', cls: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">Class & Division</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">Class / Division Finder</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Find your academic class — Distinction, First Class, Second Class, Third Class, or Fail.
      </p>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <SelectField
          label="Input Type"
          options={[
            { value: 'cgpa', label: 'CGPA (10-point scale)' },
            { value: 'pct', label: 'Percentage (%)' },
          ]}
          value={inputType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInputType(e.target.value)}
        />

        <InputField
          label={inputType === 'cgpa' ? 'Your CGPA' : 'Your Percentage'}
          hint={inputType === 'cgpa' ? '(out of 10)' : '(%)'}
          type="number"
          placeholder={inputType === 'cgpa' ? 'e.g. 8.2' : 'e.g. 76.5'}
          min="0"
          max={inputType === 'cgpa' ? '10' : '100'}
          step={inputType === 'cgpa' ? '0.01' : '0.1'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />

        <div
          className={`mt-5 border-1.5 rounded-lg p-0 max-h-0 overflow-hidden transition-all ${
            showResult ? 'max-h-96 p-7 bg-blue-100 border-blue-300' : ''
          }`}
        >
          <div className="font-mono text-xs tracking-wider uppercase text-muted mb-2">Academic Class</div>
          <div className="font-serif text-4xl leading-none mb-1.5 text-blue-600" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {result.division.emoji} {result.division.label}
          </div>
          <div className={`inline-block px-4 py-2 rounded-full font-bold text-sm mt-2.5 ${result.division.cls || ''}`}>
            {result.division.emoji} {result.division.label}
          </div>
          <div className="text-sm text-muted mt-3.5">
            {inputType === 'cgpa'
              ? `CGPA ${format(result.cgpa)} ≈ ${format(result.percentage)}%`
              : `${format(parseFloat(value))} % ≈ CGPA ${format(result.cgpa)}`}
          </div>
        </div>
      </div>

      <h2 className="font-serif text-4xl mb-1">Division Reference</h2>
      <div className="border-1.5 border-border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-ink">
            <tr>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">CGPA Range</th>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">Percentage Equiv.</th>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">Class</th>
            </tr>
          </thead>
          <tbody>
            {divisionData.map((row, i) => (
              <tr key={i}>
                <td className="p-2 border-b border-border">{row.range}</td>
                <td className="p-2 border-b border-border">{row.equiv}</td>
                <td className="p-2 border-b border-border">
                  <span className={`inline-block px-3 py-0.75 rounded-full font-bold text-sm ${row.cls}`}>
                    {row.emoji} {row.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
