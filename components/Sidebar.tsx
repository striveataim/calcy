'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Home', group: 'Menu' },
    { href: '/cgpa-percentage', icon: '📊', label: 'CGPA → %', group: 'General' },
    { href: '/percentage-cgpa', icon: '🔄', label: '% → CGPA', group: 'General' },
    { href: '/sgpa-percentage', icon: '📐', label: 'SGPA → %', group: 'General' },
    { href: '/sgpa-cgpa', icon: '🔁', label: 'SGPA → CGPA', group: 'General' },
    { href: '/gpa-4', icon: '🌍', label: 'GPA 4.0', group: 'General' },
    { href: '/semester', icon: '📝', label: 'Semester SGPA', group: 'Advanced' },
    { href: '/overall', icon: '🎓', label: 'Overall CGPA', group: 'Advanced' },
    { href: '/marks-grade', icon: '🅰️', label: 'Marks → Grade', group: 'Advanced' },
    { href: '/division', icon: '🏆', label: 'Division/Class', group: 'Advanced' },
    { href: '/university', icon: '🎓', label: 'University Calc', group: 'Universities' },
  ];

  const groups = Array.from(new Set(navItems.map(item => item.group)));

  return (
    <>
      <nav
        className={`w-64 flex-shrink-0 bg-gradient-to-b from-ink to-ink/95 h-screen sticky top-0 overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-700
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed left-0 top-0 z-40 md:relative md:block
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="px-5 py-6 border-b border-white/10 sticky top-0 bg-gradient-to-b from-ink to-ink/95 flex items-center justify-between">
          <Link href="/" className="block flex-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Calcy
            </div>
            <div className="text-xs text-white/40 mt-1 tracking-widest font-mono">Calculator Suite</div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white p-2 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          {groups.map((group) => (
            <div className="py-2" key={group}>
              <div className="text-xs font-bold tracking-wider text-white/50 px-4 py-2 uppercase flex items-center justify-between">
                <span>{group}</span>
                {group === 'Universities' && (
                  <span className="bg-blue-600 text-white text-9px px-2 py-0.5 rounded-full font-bold">1</span>
                )}
              </div>
              {navItems
                .filter((item) => item.group === group)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      pathname === item.href
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-white/60 hover:bg-white/10 hover:text-white/90'
                    }`}
                  >
                    <span className="text-base w-5 flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="border-t border-white/10 px-4 py-4 text-xs text-white/40">
          <p className="mb-2">✨ Free • Verified • No Ads</p>
          <p className="text-white/30 text-9px">Made for Indian University Students</p>
        </div>
      </nav>
    </>
  );
}
