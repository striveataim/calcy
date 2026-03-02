'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { InputField, SelectField } from '@/components/InputField';
import { format, valid, clamp } from '@/lib/utils';

const universities = [
  { id: 'vtu', name: 'VTU (Visvesvaraya)', icon: '🔬', formula: 'Percentage = (CGPA - 0.75) × 10', desc: 'Visvesvaraya Technological University' },
  { id: 'anna', name: 'Anna University', icon: '🌟', formula: 'Percentage = CGPA × 10', desc: 'Anna University, Chennai' },
  { id: 'sppu', name: 'SPPU (Pune)', icon: '✨', formula: 'Percentage = CGPA × 9.5', desc: 'Savitribai Phule Pune University' },
  { id: 'mumbai', name: 'Mumbai University', icon: '🌊', formula: 'Multi-scale (10, 7-point, %)', desc: 'University of Mumbai' },
  { id: 'delhi', name: 'Delhi University', icon: '🏛️', formula: 'Percentage = CGPA × 9.5', desc: 'University of Delhi' },
  { id: 'chandigarh', name: 'Chandigarh Univ.', icon: '⛰️', formula: 'Percentage = CGPA × 10', desc: 'Chandigarh University' },
  { id: 'manipal', name: 'Manipal', icon: '🎯', formula: 'Percentage = CGPA × 10', desc: 'Manipal Academy of Higher Education' },
  { id: 'hec', name: 'HEC Pakistan', icon: '🇵🇰', formula: 'GPA Scale: 4.0 & Percentage', desc: 'Higher Education Commission Pakistan' },
  { id: 'cbse', name: 'CBSE', icon: '📘', formula: 'CGPA = Percentage / 9.5', desc: 'Central Board of Secondary Education' },
];

export default function UniversityCalculator() {
  const searchParams = useSearchParams();
  const initialUniv =
    searchParams.get('university') ||
    searchParams.get('uni') ||
    universities[0].id;
  const [selectedUniversity, setSelectedUniversity] = useState(initialUniv);
  const [filter, setFilter] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [percentage, setPercentage] = useState('');
  const [multiplier, setMultiplier] = useState('default');
  const [customMultiplier, setCustomMultiplier] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ pct: 0, cgpa: 0, gpa7: 0 });

  const currentUniv = universities.find(u => u.id === selectedUniversity) || universities[0];

  useEffect(() => {
    calculateResult();
  }, [cgpa, percentage, selectedUniversity, multiplier, customMultiplier]);

  function calculateResult() {
    if (selectedUniversity === 'vtu') {
      const val = parseFloat(cgpa);
      if (!valid(val, 0, 10)) {
        setShowResult(false);
        return;
      }
      const pct = (val - 0.75) * 10;
      setResult({ pct, cgpa: val, gpa7: 0 });
      setShowResult(true);
    } else if (selectedUniversity === 'anna') {
      const val = parseFloat(cgpa);
      if (!valid(val, 0, 10)) {
        setShowResult(false);
        return;
      }
      const pct = val * 10;
      setResult({ pct, cgpa: val, gpa7: 0 });
      setShowResult(true);
    } else if (selectedUniversity === 'sppu' || selectedUniversity === 'delhi') {
      const val = parseFloat(cgpa);
      if (!valid(val, 0, 10)) {
        setShowResult(false);
        return;
      }
      const pct = val * 9.5;
      setResult({ pct, cgpa: val, gpa7: 0 });
      setShowResult(true);
    } else if (selectedUniversity === 'chandigarh' || selectedUniversity === 'manipal') {
      const val = parseFloat(cgpa);
      if (!valid(val, 0, 10)) {
        setShowResult(false);
        return;
      }
      const pct = val * 10;
      setResult({ pct, cgpa: val, gpa7: 0 });
      setShowResult(true);
    } else if (selectedUniversity === 'mumbai') {
      if (multiplier === '10') {
        const val = parseFloat(cgpa);
        if (!valid(val, 0, 10)) {
          setShowResult(false);
          return;
        }
        const pct = val * 10;
        const gpa7 = (val / 10) * 7;
        setResult({ pct, cgpa: val, gpa7 });
        setShowResult(true);
      } else if (multiplier === '7') {
        const val = parseFloat(cgpa);
        if (!valid(val, 0, 7)) {
          setShowResult(false);
          return;
        }
        // Convert 7-point GPA to percentage (Mumbai)
        const pct = (val / 7) * 100;
        setResult({ pct, cgpa: 0, gpa7: val });
        setShowResult(true);
      }
    } else if (selectedUniversity === 'hec') {
      if (multiplier === 'gpa') {
        const val = parseFloat(cgpa);
        if (!valid(val, 0, 4)) {
          setShowResult(false);
          return;
        }
        const pct = val * 25;
        setResult({ pct, cgpa: val, gpa7: 0 });
        setShowResult(true);
      } else if (multiplier === 'pct') {
        const val = parseFloat(percentage);
        if (!valid(val, 0, 100)) {
          setShowResult(false);
          return;
        }
        const gpa = val / 25;
        setResult({ pct: val, cgpa: gpa, gpa7: 0 });
        setShowResult(true);
      }
    } else if (selectedUniversity === 'cbse') {
      const val = parseFloat(percentage);
      if (!valid(val, 0, 100)) {
        setShowResult(false);
        return;
      }
      const cgpaVal = val / 9.5;
      setResult({ pct: val, cgpa: cgpaVal, gpa7: 0 });
      setShowResult(true);
    }
  }

  return (
    <main className="bg-white">
      <div className="px-6 md:px-13 py-8 md:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text mb-2">University Calculator</h1>
          <p className="text-muted">Select your university to convert CGPA/GPA</p>
        </div>

        {/* Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* University Selector */}
          <div className="lg:col-span-1 bg-card border-1.5 border-border rounded-xl p-6 shadow-md h-fit sticky top-24">
            <h2 className="font-bold text-lg mb-6 text-text">Select University</h2>

            <div className="space-y-3 mb-8">
              <InputField
                label="Search"
                hint="Filter universities"
                type="text"
                placeholder="e.g. VTU"
                value={filter}
                onChange={(e) => setFilter(e.target.value.toLowerCase())}
              />
              {universities
                .filter((u) =>
                  u.name.toLowerCase().includes(filter) || u.id.toLowerCase().includes(filter)
                )
                .map((univ) => (
                <button
                  key={univ.id}
                  onClick={() => setSelectedUniversity(univ.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                    selectedUniversity === univ.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-surface border-1.5 border-border text-text hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{univ.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{univ.name}</div>
                      <div className={`text-xs ${selectedUniversity === univ.id ? 'text-white/80' : 'text-muted'}`}>
                        {univ.formula}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* University Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-1.5 border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-sm text-blue-900 mb-2">{currentUniv.name}</p>
              <p className="text-xs text-blue-800">{currentUniv.desc}</p>
              <p className="text-xs text-blue-700 mt-3 font-mono">{currentUniv.formula}</p>
            </div>
          </div>

          {/* Input & Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Input Section */}
            <div className="bg-card border-1.5 border-border rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 text-text">Enter Value</h3>

              <div className="space-y-4">
                {selectedUniversity === 'vtu' && (
                  <InputField
                    label="Your CGPA"
                    hint="(out of 10)"
                    type="number"
                    placeholder="e.g. 6.5"
                    min="0"
                    max="10"
                    step="0.01"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                  />
                )}

                {(selectedUniversity === 'anna' || selectedUniversity === 'sppu' || selectedUniversity === 'delhi' || selectedUniversity === 'chandigarh' || selectedUniversity === 'manipal') && (
                  <InputField
                    label="Your CGPA"
                    hint="(out of 10)"
                    type="number"
                    placeholder="e.g. 8.5"
                    min="0"
                    max="10"
                    step="0.01"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                  />
                )}

                {selectedUniversity === 'mumbai' && (
                  <>
                    <SelectField
                      label="Scale Type"
                      options={[
                        { value: '10', label: '10-Point Scale' },
                        { value: '7', label: '7-Point Scale' },
                      ]}
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
                    />
                    <InputField
                      label={multiplier === '10' ? 'Your CGPA (10-point)' : 'Your GPA (7-point)'}
                      type="number"
                      placeholder={multiplier === '10' ? 'e.g. 8.5' : 'e.g. 6.0'}
                      min="0"
                      max={multiplier === '10' ? '10' : '7'}
                      step="0.01"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                    />
                  </>
                )}

                {selectedUniversity === 'hec' && (
                  <>
                    <SelectField
                      label="Input Type"
                      options={[
                        { value: 'gpa', label: '4.0 GPA Scale' },
                        { value: 'pct', label: 'Percentage' },
                      ]}
                      value={multiplier}
                      onChange={(e) => setMultiplier(e.target.value)}
                    />
                    <InputField
                      label={multiplier === 'gpa' ? 'Your GPA' : 'Your Percentage'}
                      type="number"
                      placeholder={multiplier === 'gpa' ? 'e.g. 3.5' : 'e.g. 85'}
                      min="0"
                      max={multiplier === 'gpa' ? '4' : '100'}
                      step="0.01"
                      value={multiplier === 'gpa' ? cgpa : percentage}
                      onChange={(e) => (multiplier === 'gpa' ? setCgpa(e.target.value) : setPercentage(e.target.value))}
                    />
                  </>
                )}

                {selectedUniversity === 'cbse' && (
                  <InputField
                    label="Your Percentage"
                    hint="(%)"
                    type="number"
                    placeholder="e.g. 85.5"
                    min="0"
                    max="100"
                    step="0.1"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Result */}
            {showResult && (
              <div className="space-y-4">
                {selectedUniversity === 'vtu' && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-1.5 border-blue-300 rounded-xl p-8 shadow-md">
                    <div className="font-mono text-xs tracking-wider uppercase text-blue-700 mb-3">Percentage</div>
                    <div className="font-serif text-6xl font-bold text-blue-600 mb-2">{format(result.pct, 2)}%</div>
                    <p className="text-blue-900 text-sm">VTU Formula: (CGPA - 0.75) × 10</p>
                  </div>
                )}

                {(selectedUniversity === 'anna' || selectedUniversity === 'chandigarh' || selectedUniversity === 'manipal') && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border-1.5 border-green-300 rounded-xl p-8 shadow-md">
                    <div className="font-mono text-xs tracking-wider uppercase text-green-700 mb-3">Percentage</div>
                    <div className="font-serif text-6xl font-bold text-green-600 mb-2">{format(result.pct, 2)}%</div>
                    <p className="text-green-900 text-sm">Formula: CGPA × 10</p>
                  </div>
                )}

                {(selectedUniversity === 'sppu' || selectedUniversity === 'delhi') && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-1.5 border-purple-300 rounded-xl p-8 shadow-md">
                    <div className="font-mono text-xs tracking-wider uppercase text-purple-700 mb-3">Percentage</div>
                    <div className="font-serif text-6xl font-bold text-purple-600 mb-2">{format(result.pct, 2)}%</div>
                    <p className="text-purple-900 text-sm">Formula: CGPA × 9.5</p>
                  </div>
                )}

                {selectedUniversity === 'mumbai' && selectedUniversity === 'mumbai' && (
                  <div className="space-y-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-1.5 border-blue-300 rounded-xl p-6 shadow-md">
                      <div className="font-mono text-xs tracking-wider uppercase text-blue-700 mb-2">Percentage</div>
                      <div className="font-serif text-4xl font-bold text-blue-600">{format(result.pct, 2)}%</div>
                    </div>
                    {result.gpa7 > 0 && (
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-1.5 border-indigo-300 rounded-xl p-6 shadow-md">
                        <div className="font-mono text-xs tracking-wider uppercase text-indigo-700 mb-2">7-Point GPA</div>
                        <div className="font-serif text-4xl font-bold text-indigo-600">{format(result.gpa7, 2)}</div>
                      </div>
                    )}
                  </div>
                )}

                {selectedUniversity === 'hec' && multiplier === 'gpa' && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-1.5 border-orange-300 rounded-xl p-8 shadow-md">
                    <div className="font-mono text-xs tracking-wider uppercase text-orange-700 mb-3">Percentage</div>
                    <div className="font-serif text-6xl font-bold text-orange-600 mb-2">{format(result.pct, 2)}%</div>
                    <p className="text-orange-900 text-sm">HEC Formula: GPA × 25</p>
                  </div>
                )}

                {selectedUniversity === 'cbse' && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-1.5 border-yellow-300 rounded-xl p-8 shadow-md">
                    <div className="font-mono text-xs tracking-wider uppercase text-yellow-700 mb-3">CGPA (10-Point)</div>
                    <div className="font-serif text-6xl font-bold text-yellow-600 mb-2">{format(result.cgpa, 2)}</div>
                    <p className="text-yellow-900 text-sm">CBSE Formula: Percentage ÷ 9.5</p>
                  </div>
                )}
              </div>
            )}

            {!showResult && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="font-bold text-lg text-text mb-2">Enter Your Value</h3>
                <p className="text-muted">See instant conversion for {currentUniv.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}