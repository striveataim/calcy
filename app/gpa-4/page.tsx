'use client';

import { useState, useEffect } from 'react';
import { InputField } from '@/components/InputField';
import { format, valid, clamp } from '@/lib/utils';

export default function GPA4Scale() {
  const [inputType, setInputType] = useState('percentage');
  const [value, setValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ gpa: 0, percentage: 0 });

  useEffect(() => {
    calculateResult();
  }, [inputType, value]);

  function calculateResult() {
    let gpa = 0;

    if (inputType === 'percentage') {
      const val = parseFloat(value);
      if (!valid(val, 0, 100)) {
        setShowResult(false);
        return;
      }
      // Standard US conversion: Percentage/25 for 4.0 scale
      gpa = clamp(val / 25, 0, 4);
    } else {
      const val = parseFloat(value);
      if (!valid(val, 0, 4)) {
        setShowResult(false);
        return;
      }
      gpa = val;
    }

    const percentage = gpa * 25;

    setResult({ gpa, percentage });
    setShowResult(true);
  }

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">International Scale</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">GPA ↔ Percentage (4.0 Scale)</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Convert between US 4.0 GPA scale and percentage using the standard international formula.
      </p>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <div className="mb-6">
          <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-3">
            Input Type
          </label>
          <div className="flex gap-3 flex-wrap">
            {['percentage', 'gpa'].map((type) => (
              <button
                key={type}
                onClick={() => { setInputType(type); setValue(''); }}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  inputType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-surface border-1.5 border-border text-text hover:bg-surface2'
                }`}
              >
                {type === 'percentage' ? 'Percentage (%)' : 'GPA (4.0)'}
              </button>
            ))}
          </div>
        </div>

        <InputField
          label={inputType === 'percentage' ? 'Your Percentage' : 'Your GPA'}
          hint={inputType === 'percentage' ? '(%)' : '(0-4.0)'}
          type="number"
          placeholder={inputType === 'percentage' ? 'e.g. 85.5' : 'e.g. 3.4'}
          min="0"
          max={inputType === 'percentage' ? '100' : '4'}
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {showResult && (
        <div className="space-y-4 mb-7">
          <div className="bg-blue-100 border-1.5 border-blue-300 rounded-xl p-6">
            <div className="font-mono text-xs tracking-wider uppercase text-blue-700 mb-2">GPA (4.0 Scale)</div>
            <div className="font-serif text-4xl font-bold text-blue-700">{format(result.gpa, 3)}</div>
          </div>
          <div className="bg-green-100 border-1.5 border-green-300 rounded-xl p-6">
            <div className="font-mono text-xs tracking-wider uppercase text-green-700 mb-2">Percentage Equivalent</div>
            <div className="font-serif text-4xl font-bold text-green-700">{format(result.percentage, 2)}%</div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Conversion Formulas</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border-1.5 border-blue-200 rounded-lg p-6">
            <p className="font-mono text-center text-lg font-bold mb-2">Percentage to 4.0 GPA</p>
            <p className="font-mono text-center text-base mb-4">GPA = Percentage / 25</p>
          </div>
          <div className="bg-green-50 border-1.5 border-green-200 rounded-lg p-6">
            <p className="font-mono text-center text-lg font-bold mb-2">4.0 GPA to Percentage</p>
            <p className="font-mono text-center text-base mb-4">Percentage = GPA × 25</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">USA GPA Grade Scale</h2>
        <div className="border-1.5 border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink">
              <tr>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">GPA Range</th>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">Letter Grade</th>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['3.7-4.0', 'A+', '92.5-100%'],
                ['3.3-3.6', 'A', '82.5-92.4%'],
                ['3.0-3.2', 'A-', '80-82.4%'],
                ['2.7-2.9', 'B+', '67.5-79.9%'],
                ['2.3-2.6', 'B', '57.5-67.4%'],
                ['2.0-2.2', 'B-', '50-57.4%'],
                ['Below 2.0', 'F', 'Below 50%'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-border hover:bg-surface">
                  <td className="p-3">{row[0]}</td>
                  <td className="p-3 font-bold">{row[1]}</td>
                  <td className="p-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 bg-amber-50 border-1.5 border-amber-200 rounded-lg p-6">
        <h3 className="font-bold text-amber-900 mb-2">About 4.0 GPA Scale</h3>
        <p className="text-sm text-amber-800">
          The 4.0 GPA scale is the most widely used grading system in the United States and many other countries. It's a standard measure used by colleges and universities for academic achievement.
        </p>
      </div>
    </div>
  );
}