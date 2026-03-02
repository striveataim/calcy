'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { FormulaBox, FormulaTitle, FormulaEquation, FormulaNote } from '@/components/FormulaBox';
import { ResultBox } from '@/components/ResultBox';
import { format, valid, getColorCgpa, getDivision, clamp } from '@/lib/utils';

export default function PercentageToCgpa() {
  const [percentage, setPercentage] = useState('');
  const [divisor, setDivisor] = useState('9.5');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ cgpa: 0, division: { label: '', emoji: '', cls: '' } });

  useEffect(() => {
    calculateResult();
  }, [percentage, divisor]);

  function calculateResult() {
    const pctVal = parseFloat(percentage);
    if (!valid(pctVal, 0, 100)) {
      setShowResult(false);
      return;
    }

    const div = parseFloat(divisor);
    const cgpa = clamp(pctVal / div, 0, 10);
    const division = getDivision(cgpa);

    setResult({ cgpa, division });
    setShowResult(true);
  }

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">General Converter</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">Percentage to CGPA Calculator</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Convert your percentage marks to CGPA on a 10-point scale — reverse of the standard formula.
      </p>

      <FormulaBox>
        <FormulaTitle>📐 Formula</FormulaTitle>
        <FormulaEquation>CGPA = Percentage ÷ 9.5</FormulaEquation>
        <FormulaNote>This is the reverse of CGPA × 9.5. Result is clamped to 0–10.</FormulaNote>
      </FormulaBox>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <InputField
          label="Your Percentage"
          hint="(%)"
          type="number"
          placeholder="e.g. 78.5"
          min="0"
          max="100"
          step="0.01"
          value={percentage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPercentage(e.target.value)}
        />

        <SelectField
          label="Divisor"
          options={[
            { value: '9.5', label: '÷ 9.5 — CBSE / UGC General' },
            { value: '10', label: '÷ 10 — Manipal & some universities' },
            { value: '9', label: '÷ 9 — Some state universities' },
          ]}
          value={divisor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDivisor(e.target.value)}
        />

        <ResultBox
          show={showResult}
          color={getColorCgpa(result.cgpa) as any}
          label="Your CGPA (out of 10)"
          value={format(result.cgpa)}
          valueId="pc-val"
          note={
            <>
              {percentage}% ÷ {divisor} = <strong>CGPA {format(result.cgpa)}</strong> (out of 10) &nbsp;|&nbsp;
              {result.division.emoji} {result.division.label}
            </>
          }
        />
      </div>
    </div>
  );
}
