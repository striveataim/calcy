// Utility functions for calculations

export const format = (n: number, d: number = 2): string => {
  if (isNaN(n)) return '—';
  return Number(n).toFixed(d);
};

export const clamp = (v: number, a: number, b: number): number => {
  return Math.min(Math.max(v, a), b);
};

export const valid = (v: number, min: number, max: number): boolean => {
  return !isNaN(v) && v >= min && v <= max;
};

export const getColor = (pct: number): string => {
  if (pct >= 70) return 'green';
  if (pct >= 50) return 'blue';
  if (pct >= 33) return 'amber';
  return 'red';
};

export const getColorCgpa = (c: number): string => {
  if (c >= 7.5) return 'green';
  if (c >= 5) return 'blue';
  if (c >= 3) return 'amber';
  return 'red';
};

export interface Division {
  label: string;
  cls: string;
  emoji: string;
}

export const getDivision = (cgpa: number): Division => {
  if (cgpa >= 9.0) return { label: 'Distinction', cls: 'db-distinction', emoji: '🏅' };
  if (cgpa >= 7.5) return { label: 'First Class', cls: 'db-first', emoji: '✅' };
  if (cgpa >= 6.0) return { label: 'Second Class', cls: 'db-second', emoji: '📘' };
  if (cgpa >= 5.0) return { label: 'Pass Class', cls: 'db-pass', emoji: '📋' };
  return { label: 'Fail', cls: 'db-fail', emoji: '❌' };
};

export const showToast = (msg: string) => {
  const t = document.getElementById('toast');
  if (t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
  }
};

export const copyResult = (id: string) => {
  const el = document.getElementById(id);
  if (!el || el.textContent === '—') return;
  
  navigator.clipboard?.writeText(el.textContent || '')
    .then(() => showToast('✅ Copied: ' + el.textContent))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = el.textContent || '';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('✅ Copied: ' + el.textContent);
    });
};
