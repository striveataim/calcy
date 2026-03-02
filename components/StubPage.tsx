'use client';

export default function StubPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-3xl px-13 py-11 pb-20">
      <div className="font-mono text-sm tracking-wider uppercase text-blue-600 mb-2">Calculator</div>
      <h1 className="font-serif text-5xl leading-tight mb-2">{title}</h1>
      <p className="text-muted text-base max-w-2xl mb-7">{description}</p>

      <div className="bg-amber-100 border-1.5 border-amber-300 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">🚀</div>
        <h2 className="font-bold text-lg mb-2">Coming Soon</h2>
        <p className="text-amber-900">This calculator is being built. Check back soon!</p>
      </div>
    </div>
  );
}
