'use client';

import { useState, useEffect } from 'react';
import { InputField } from '@/components/InputField';
import { format, valid } from '@/lib/utils';

export default function OverallCGPA() {
  const [semesters, setSemesters] = useState([
    { id: 1, semesterNum: 1, sgpa: '', credits: '' },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    calculateCGPA();
  }, [semesters]);

  function addSemester() {
    const nextNum = Math.max(...semesters.map(s => parseInt(s.semesterNum))) + 1;
    setSemesters([...semesters, { id: Date.now(), semesterNum: nextNum, sgpa: '', credits: '' }]);
  }

  function removeSemester(id: number) {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  }

  function updateSemester(id: number, field: string, value: string) {
    setSemesters(
      semesters.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  function calculateCGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const semester of semesters) {
      const sgpa = parseFloat(semester.sgpa);
      const credits = parseFloat(semester.credits);

      if (!isNaN(sgpa) && !isNaN(credits) && credits > 0 && valid(sgpa, 0, 10)) {
        totalCredits += credits;
        totalPoints += credits * sgpa;
      }
    }

    if (totalCredits > 0) {
      setCgpa(totalPoints / totalCredits);
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }

  return (
    <div className="max-w-4xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">Overall Calculator</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">Overall CGPA Calculator</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Calculate your cumulative GPA across all semesters using the credit-weighted average method.
      </p>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <div className="space-y-4">
          {semesters.map((sem, idx) => (
            <div key={sem.id} className="flex gap-3 items-end">
              <div className="w-32">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  Semester
                </label>
                <input
                  type="number"
                  placeholder="1"
                  value={sem.semesterNum}
                  onChange={(e) => updateSemester(sem.id, 'semesterNum', e.target.value)}
                  min="1"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  SGPA (0-10)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 8.45"
                  value={sem.sgpa}
                  onChange={(e) => updateSemester(sem.id, 'sgpa', e.target.value)}
                  min="0"
                  max="10"
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  Total Credits
                </label>
                <input
                  type="number"
                  placeholder="e.g., 20"
                  value={sem.credits}
                  onChange={(e) => updateSemester(sem.id, 'credits', e.target.value)}
                  min="0"
                  step="1"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => removeSemester(sem.id)}
                className="px-3 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={addSemester}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Semester
          </button>
        </div>
      </div>

      {showResult && (
        <div className="bg-green-100 border-1.5 border-green-300 rounded-xl p-8 shadow-md">
          <div className="font-mono text-xs tracking-wider uppercase text-green-700 mb-2">Your Overall CGPA</div>
          <div className="font-serif text-5xl font-bold text-green-700 mb-3">{format(cgpa, 2)}</div>
          <p className="text-green-900">Across {semesters.filter((s) => s.sgpa && s.credits).length} semesters</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Formula</h2>
        <div className="bg-blue-50 border-1.5 border-blue-200 rounded-lg p-6">
          <p className="font-mono text-center text-lg mb-4">
            <span className="font-bold">CGPA</span> = Σ (SGPA × Credits) / Σ Credits
          </p>
          <p className="text-sm text-muted">
            CGPA is calculated by taking the weighted average of all semesters, where each semester's SGPA is weighted by its total credit hours.
          </p>
        </div>
      </div>
    </div>
  );
}