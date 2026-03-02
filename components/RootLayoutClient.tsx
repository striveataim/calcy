'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  // Sidebar starts open but is closable everywhere
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div id="toast" className="hidden"></div>
      {/* Overlay only on mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-48 transition-opacity md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="layout">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <Topbar
          isOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Main content flows naturally based on sidebar width */}
        <div className="main" id="main">
          {children}
        </div>
      </div>
    </>
  );
}
