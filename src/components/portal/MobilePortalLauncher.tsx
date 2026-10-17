import React from 'react';
import { Search } from 'lucide-react';

interface MobilePortalLauncherProps {
  onOpen: () => void;
}

export const MobilePortalLauncher: React.FC<MobilePortalLauncherProps> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-5 right-4 z-40 md:hidden pointer-events-auto animate-fadeIn">
      <button
        onClick={onOpen}
        aria-label="Open PORTAL OS Command Center"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a1917]/95 dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md border border-[#383731] dark:border-[#bfb8a6] active:scale-95 transition-all cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-[#486616] dark:bg-[#131312] animate-pulse" />
        <Search className="w-3.5 h-3.5" />
        <span>PORTAL OS</span>
      </button>
    </div>
  );
};
