'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { FormulaBox, FormulaTitle, FormulaEquation, FormulaNote } from '@/components/FormulaBox';
import { ResultBox } from '@/components/ResultBox';
import { format, valid, getColor } from '@/lib/utils';

export default function SgpaToPercentage() {
  const [sgpa, setSgpa] = useState('');
  const [formula, setFormula] = useState('cbse');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ pct: 0, formulaUsed: '' });

  useEffect(() => {
    calculateResult();
  }, [sgpa, formula]);

  function calculateResult() {
    const sgpaVal = parseFloat(sgpa);
    if (!valid(sgpaVal, 0, 10)) {
      setShowResult(false);
      return;
    }

    let pct: number, formulaUsed: string;

    if (formula === 'cbse') {
      pct = sgpaVal * 9.5;
      formulaUsed = `${sgpaVal} × 9.5`;
    } else if (formula === 'ugc') {
      pct = (sgpaVal - 0.75) * 10;
      formulaUsed = `(${sgpaVal} − 0.75) × 10`;
    } else {
      pct = sgpaVal * 10;
      formulaUsed = `${sgpaVal} × 10`;
    }

    setResult({ pct, formulaUsed });
    setShowResult(true);
  }

  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">General Converter</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">SGPA to Percentage Calculator</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Convert your Semester Grade Point Average (SGPA) to percentage. Choose the correct formula for your university.
      </p>

      <FormulaBox>
        <FormulaTitle>📐 Formulas Available</FormulaTitle>
        <FormulaEquation>SGPA × 9.5</FormulaEquation>
        <span className="text-muted text-xs ml-2">— CBSE/general</span>
        <br />
        <FormulaEquation>(SGPA − 0.75) × 10</FormulaEquation>
        <span className="text-muted text-xs ml-2">— VTU/UGC</span>
        <br />
        <FormulaEquation>SGPA × 10</FormulaEquation>
        <span className="text-muted text-xs ml-2">— Direct (Manipal)</span>
      </FormulaBox>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <InputField
          label="Your SGPA"
          hint="(out of 10)"
          type="number"
          placeholder="e.g. 7.8"
          min="0"
          max="10"
          step="0.01"
          value={sgpa}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSgpa(e.target.value)}
        />

        <SelectField
          label="Formula"
          options={[
            { value: 'cbse', label: 'SGPA × 9.5 — CBSE / General' },
            { value: 'ugc', label: '(SGPA − 0.75) × 10 — VTU / UGC' },
            { value: 'x10', label: 'SGPA × 10 — Manipal / Direct' },
          ]}
          value={formula}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormula(e.target.value)}
        />

        <ResultBox
          show={showResult}
          color={getColor(result.pct) as any}
          label="Percentage"
          value={format(result.pct) + '%'}
          valueId="sp-val"
          note={
            <>
              {result.formulaUsed} = <strong>{format(result.pct)}%</strong>
            </>
          }
        />
      </div>
    </div>
  );
}
