'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { FormulaBox, FormulaTitle, FormulaEquation, FormulaNote } from '@/components/FormulaBox';
import { ResultBox, ResultCard } from '@/components/ResultBox';
import { format, valid, getColor, getDivision } from '@/lib/utils';

export default function CgpaToPercentage() {
  const [cgpa, setCgpa] = useState('');
  const [multiplier, setMultiplier] = useState('9.5');
  const [customMultiplier, setCustomMultiplier] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ pct: 0, division: { label: '', emoji: '', cls: '' } });

  useEffect(() => {
    calculateResult();
  }, [cgpa, multiplier, customMultiplier]);

  function calculateResult() {
    const cgpaVal = parseFloat(cgpa);
    if (!valid(cgpaVal, 0, 10)) {
      setShowResult(false);
      return;
    }

    let multi = multiplier === 'custom' ? parseFloat(customMultiplier) : parseFloat(multiplier);
    if (isNaN(multi) || multi <= 0) {
      setShowResult(false);
      return;
    }

    const pct = cgpaVal * multi;
    const division = getDivision(cgpaVal);

    setResult({ pct, division });
    setShowResult(true);
  }

  const refTable = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4].map((c) => ({
    cgpa: c,
    percentage: c * 9.5,
    division: getDivision(c),
  }));

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">General Converter</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">CGPA to Percentage Calculator</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Convert your 10-point CGPA to percentage. Works for CBSE, UGC affiliated universities, and most Indian universities.
      </p>

      <FormulaBox>
        <FormulaTitle>📐 Formula</FormulaTitle>
        <FormulaEquation>Percentage = CGPA × 9.5</FormulaEquation>
        <FormulaNote>
          CBSE & UGC recommended formula. Change multiplier if your university differs (e.g. ×10 for Manipal, or (CGPA−0.75)×10 for
          VTU).
        </FormulaNote>
      </FormulaBox>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <InputField
          label="Your CGPA"
          hint="(out of 10)"
          type="number"
          placeholder="e.g. 8.5"
          min="0"
          max="10"
          step="0.01"
          value={cgpa}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCgpa(e.target.value)}
        />

        <SelectField
          label="Multiplier"
          options={[
            { value: '9.5', label: '× 9.5 — CBSE / UGC General (default)' },
            { value: '10', label: '× 10 — Manipal, some universities' },
            { value: '9', label: '× 9 — Some state universities' },
            { value: 'custom', label: 'Custom multiplier' },
          ]}
          value={multiplier}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMultiplier(e.target.value)}
        />

        {multiplier === 'custom' && (
          <InputField
            label="Custom Multiplier"
            type="number"
            placeholder="Enter multiplier"
            step="0.01"
            min="0"
            value={customMultiplier}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomMultiplier(e.target.value)}
          />
        )}

        <ResultBox
          show={showResult}
          color={getColor(result.pct) as any}
          label="Your Percentage"
          value={format(result.pct) + '%'}
          valueId="cp-val"
          note={
            <>
              CGPA {cgpa} × {multiplier === 'custom' ? customMultiplier : multiplier} = <strong>{format(result.pct)}%</strong>
              &nbsp;|&nbsp; {result.division.emoji} {result.division.label}
            </>
          }
        />
      </div>

      <div className="border-t border-border my-8"></div>

      <h2 className="font-serif text-4xl mb-1">Quick Reference Table</h2>
      <p className="text-muted text-sm mb-7">CGPA × 9.5 conversion for common values</p>

      <div className="border-1.5 border-border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-ink">
            <tr>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">CGPA</th>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">Percentage (×9.5)</th>
              <th className="font-mono text-xs tracking-wider uppercase text-white/50 p-2.75 text-left">Division</th>
            </tr>
          </thead>
          <tbody>
            {refTable.map((row, i) => (
              <tr key={i}>
                <td className="p-2 border-b border-border">
                  <strong>{row.cgpa}</strong>
                </td>
                <td className="p-2 border-b border-border text-blue-600 font-semibold">{format(row.percentage)}%</td>
                <td className="p-2 border-b border-border">
                  <span className={`inline-block px-3 py-0.75 rounded-full font-bold text-sm`} style={{}}
                  >
                    {row.division.emoji} {row.division.label}
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
