'use client';

export default function Topbar({ isOpen, onMenuClick, onClose }: { isOpen: boolean; onMenuClick: () => void; onClose: () => void }) {
  return (
    <div className="flex fixed top-0 left-0 right-0 bg-gradient-to-r from-ink to-ink/95 text-white px-4 py-3 items-center gap-3 z-50 border-b border-white/10">
      <button
        onClick={isOpen ? onClose : onMenuClick}
        className="text-2xl hover:bg-white/10 p-2 rounded-lg transition-colors"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div className="font-bold text-lg">Calcy</div>
      <div className="ml-auto text-xs text-white/50 font-mono">Calculator</div>
    </div>
  );
}
