'use client';

import { useState, useEffect } from 'react';
import { InputField } from '@/components/InputField';
import { ResultBox } from '@/components/ResultBox';
import { format, valid } from '@/lib/utils';

export default function SemesterSGPA() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', credits: '', gradePoint: '' },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [sgpa, setSgpa] = useState(0);

  useEffect(() => {
    calculateSGPA();
  }, [subjects]);

  function addSubject() {
    setSubjects([...subjects, { id: Date.now(), name: '', credits: '', gradePoint: '' }]);
  }

  function removeSubject(id: number) {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  }

  function updateSubject(id: number, field: string, value: string) {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  function calculateSGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const subject of subjects) {
      const credits = parseFloat(subject.credits);
      const gradePoint = parseFloat(subject.gradePoint);

      if (!isNaN(credits) && !isNaN(gradePoint) && credits > 0 && valid(gradePoint, 0, 10)) {
        totalCredits += credits;
        totalPoints += credits * gradePoint;
      }
    }

    if (totalCredits > 0) {
      setSgpa(totalPoints / totalCredits);
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }

  return (
    <div className="max-w-4xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">Semester Calculator</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">Semester SGPA Calculator</h1>
      <p className="text-muted text-base max-w-2xl mb-7">
        Enter each subject with its credit hours and grade points to calculate your Semester Grade Point Average (SGPA).
      </p>

      <div className="bg-card border-1.5 border-border rounded-xl p-8 shadow-md mb-7">
        <div className="space-y-4">
          {subjects.map((subject, idx) => (
            <div key={subject.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  Subject {idx + 1}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  Credits
                </label>
                <input
                  type="number"
                  placeholder="e.g., 4"
                  value={subject.credits}
                  onChange={(e) => updateSubject(subject.id, 'credits', e.target.value)}
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <label className="block font-mono text-xs tracking-wider uppercase text-muted mb-2">
                  Grade (0-10)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 8.5"
                  value={subject.gradePoint}
                  onChange={(e) => updateSubject(subject.id, 'gradePoint', e.target.value)}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => removeSubject(subject.id)}
                className="px-3 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={addSubject}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Subject
          </button>
        </div>
      </div>

      {showResult && (
        <div className="bg-green-100 border-1.5 border-green-300 rounded-xl p-8 shadow-md">
          <div className="font-mono text-xs tracking-wider uppercase text-green-700 mb-2">Your Semester SGPA</div>
          <div className="font-serif text-5xl font-bold text-green-700 mb-3">{format(sgpa, 2)}</div>
          <p className="text-green-900">Based on {subjects.filter((s) => s.credits && s.gradePoint).length} subjects</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Formula</h2>
        <div className="bg-blue-50 border-1.5 border-blue-200 rounded-lg p-6">
          <p className="font-mono text-center text-lg mb-4">
            <span className="font-bold">SGPA</span> = Σ (Credits × Grade) / Σ Credits
          </p>
          <p className="text-sm text-muted">
            The SGPA is the weighted average of all subject grades, where each course's grade is weighted by its credit hours.
          </p>
        </div>
      </div>
    </div>
  );
}