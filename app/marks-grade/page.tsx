'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { format } from '@/lib/utils';

interface GradeScale {
  range: string;
  grade: string;
  gradePoint: number;
  emoji: string;
  color: string;
  description: string;
}

export default function MarksToGrade() {
  const [inputType, setInputType] = useState('percentage');
  const [value, setValue] = useState('');
  const [system, setSystem] = useState('4-point');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ grade: '', gradePoint: 0, description: '' });

  const gradeScales: Record<string, GradeScale[]> = {
    'percentage': [
      { range: '90-100%', grade: 'A+', gradePoint: 4.0, emoji: '⭐', color: 'bg-yellow-100 text-yellow-800', description: 'Outstanding' },
      { range: '80-89%', grade: 'A', gradePoint: 3.8, emoji: '✨', color: 'bg-green-100 text-green-800', description: 'Excellent' },
      { range: '70-79%', grade: 'B+', gradePoint: 3.3, emoji: '👍', color: 'bg-blue-100 text-blue-800', description: 'Good' },
      { range: '60-69%', grade: 'B', gradePoint: 3.0, emoji: '📘', color: 'bg-indigo-100 text-indigo-800', description: 'Satisfactory' },
      { range: '50-59%', grade: 'C+', gradePoint: 2.3, emoji: '📗', color: 'bg-amber-100 text-amber-800', description: 'Average' },
      { range: '40-49%', grade: 'C', gradePoint: 2.0, emoji: '📙', color: 'bg-orange-100 text-orange-800', description: 'Below Average' },
      { range: 'Below 40%', grade: 'F', gradePoint: 0, emoji: '❌', color: 'bg-red-100 text-red-800', description: 'Fail' },
    ],
    '10-point': [
      { range: '9.0-10.0', grade: 'A+', gradePoint: 10, emoji: '⭐', color: 'bg-yellow-100 text-yellow-800', description: 'Outstanding' },
      { range: '8.0-8.9', grade: 'A', gradePoint: 9, emoji: '✨', color: 'bg-green-100 text-green-800', description: 'Excellent' },
      { range: '7.0-7.9', grade: 'B+', gradePoint: 8, emoji: '👍', color: 'bg-blue-100 text-blue-800', description: 'Good' },
      { range: '6.0-6.9', grade: 'B', gradePoint: 7, emoji: '📘', color: 'bg-indigo-100 text-indigo-800', description: 'Satisfactory' },
      { range: '5.0-5.9', grade: 'C+', gradePoint: 6, emoji: '📗', color: 'bg-amber-100 text-amber-800', description: 'Average' },
      { range: '4.0-4.9', grade: 'C', gradePoint: 5, emoji: '📙', color: 'bg-orange-100 text-orange-800', description: 'Below Average' },
      { range: 'Below 4.0', grade: 'F', gradePoint: 0, emoji: '❌', color: 'bg-red-100 text-red-800', description: 'Fail' },
    ],
  };

  useEffect(() => {
    calculateGrade();
  }, [value, inputType, system]);

  function calculateGrade() {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setShowResult(false);
      return;
    }

    const scales = inputType === 'percentage' 
      ? gradeScales['percentage']
      : system === '10-point' ? gradeScales['10-point'] : gradeScales['percentage'];

    const min = inputType === 'percentage' ? 0 : system === '10-point' ? 0 : 0;
    const max = inputType === 'percentage' ? 100 : system === '10-point' ? 10 : 100;

    if (val < min || val > max) {
      setShowResult(false);
      return;
    }

    let foundGrade = scales[scales.length - 1];
    for (const scale of scales) {
      const range = scale.range.split('-').map((r) => parseFloat(r.replace(/[^0-9.]/g, '')));
      if (val >= range[0] && val <= range[1]) {
        foundGrade = scale;
        break;
      }
    }

    setResult({
      grade: foundGrade.grade,
      gradePoint: foundGrade.gradePoint,
      description: foundGrade.description,
    });
    setShowResult(true);
  }

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">Grade Converter</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">Marks to Grade Converter</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Convert your percentage or grade point to the Indian letter grade system instantly.
      </p>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <SelectField
            label="Input Type"
            options={[
              { value: 'percentage', label: 'Percentage (%)' },
              { value: 'gpa', label: 'Grade Point' },
            ]}
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          />
          {inputType === 'gpa' && (
            <SelectField
              label="Scale"
              options={[
                { value: '4-point', label: '4.0 Scale' },
                { value: '10-point', label: '10.0 Scale' },
              ]}
              value={system}
              onChange={(e) => setSystem(e.target.value)}
            />
          )}
        </div>

        <InputField
          label={inputType === 'percentage' ? 'Your Percentage' : 'Your Grade Point'}
          hint={inputType === 'percentage' ? '(%)' : `(0-${system === '10-point' ? '10' : '4'})`}
          type="number"
          placeholder={inputType === 'percentage' ? 'e.g., 85.5' : 'e.g., 3.8'}
          min="0"
          max={inputType === 'percentage' ? '100' : system === '10-point' ? '10' : '4'}
          step={inputType === 'percentage' ? '0.1' : '0.1'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {showResult && (
        <div className="bg-green-100 border-1.5 border-green-300 rounded-xl p-8 shadow-md mb-7">
          <div className="font-mono text-xs tracking-wider uppercase text-green-700 mb-3">Your Grade</div>
          <div className="flex items-center gap-4">
            <div className="text-6xl">{result.grade === 'A+' ? '⭐' : result.grade === 'A' ? '✨' : result.grade === 'F' ? '❌' : '📚'}</div>
            <div>
              <div className="font-serif text-5xl font-bold text-green-700">{result.grade}</div>
              <p className="text-green-900 font-semibold">{result.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-6">Grade Scale Reference</h2>
        <div className="border-1.5 border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink">
              <tr>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">Grade</th>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">Percentage Range</th>
                <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {gradeScales['percentage'].map((row, i) => (
                <tr key={i} className="border-b border-border hover:bg-surface">
                  <td className="p-3 font-bold text-lg">{row.grade}</td>
                  <td className="p-3">{row.range}</td>
                  <td className="p-3">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}