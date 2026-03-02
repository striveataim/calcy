'use client';

import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { format, valid, getDivision } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  const [cgpa, setCgpa] = useState('');
  const [multiplier, setMultiplier] = useState('9.5');
  const [customMultiplier, setCustomMultiplier] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ pct: 0, division: { label: '', emoji: '', cls: '' } });

  // live calculate
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

  // other tools are accessible via sidebar now

  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Hero + Calculator Section */}
      <div className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text mb-2">CGPA to Percentage</h1>
          <p className="text-muted">Convert your CGPA to percentage instantly</p>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 bg-card border-1.5 border-border rounded-xl p-8 shadow-md h-fit">
            <h2 className="font-bold text-lg mb-6 text-text">Convert Now</h2>

            <div className="space-y-6">
              <InputField
                label="Your CGPA"
                hint="(out of 10)"
                type="number"
                placeholder="e.g. 8.2"
                min="0"
                max="10"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
              />

              <SelectField
                label="Multiplier"
                options={[
                  { value: '9.5', label: '9.5 (Most Universities)' },
                  { value: '10', label: '10.0 (Direct)' },
                  { value: '9.0', label: '9.0 (Alternative)' },
                  { value: 'custom', label: 'Custom' },
                ]}
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
              />

              {multiplier === 'custom' && (
                <InputField
                  label="Custom Multiplier"
                  type="number"
                  placeholder="e.g. 9.5"
                  min="0"
                  step="0.1"
                  value={customMultiplier}
                  onChange={(e) => setCustomMultiplier(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-4">
            {showResult && (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-1.5 border-blue-300 rounded-xl p-8 shadow-md">
                  <div className="font-mono text-xs tracking-wider uppercase text-blue-700 mb-3">Your Percentage</div>
                  <div className="font-serif text-6xl font-bold text-blue-600 mb-2">{format(result.pct, 2)}%</div>
                  <p className="text-blue-900">CGPA {cgpa} × {multiplier === 'custom' ? customMultiplier : multiplier} = {format(result.pct, 2)}%</p>
                </div>

                <div className={`border-1.5 rounded-xl p-8 shadow-md ${result.division.cls}`}>
                  <div className="font-mono text-xs tracking-wider uppercase mb-3 opacity-75">Academic Division</div>
                  <div className="text-4xl mb-2">{result.division.emoji}</div>
                  <div className="font-serif text-2xl font-bold">{result.division.label}</div>
                </div>

                {/* Reference Table */}
                <div className="bg-surface border-1.5 border-border rounded-xl p-6">
                  <p className="text-sm text-muted mb-4 font-semibold">Quick Reference</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">9.0-10.0 CGPA:</span>
                      <span className="font-bold">85.5%-95%+ (Distinction)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">7.5-8.99 CGPA:</span>
                      <span className="font-bold">71%-85% (First Class)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">6.0-7.49 CGPA:</span>
                      <span className="font-bold">57%-71% (Second Class)</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!showResult && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-dashed border-purple-200 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="font-bold text-lg text-text mb-2">Enter Your CGPA</h3>
                <p className="text-muted">See instant results and division classification</p>
              </div>
            )}
            {/* link to university tool */}
            <div className="mt-4 text-right">
              <Link href="/university" className="text-sm text-blue-600 hover:underline">
                University‑specific conversions →
              </Link>
            </div>
          </div>
        </div>
      </div>

      </div> {/* end hero padding wrapper */}

      {/* no secondary tools here – sidebar lets you explore everything */}
    </main>
  );
}
