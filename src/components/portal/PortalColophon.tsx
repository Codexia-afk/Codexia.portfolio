import React from 'react';
import { ArrowLeft, Code, Layers, Sparkles, Terminal } from 'lucide-react';

interface PortalColophonProps {
  onBack: () => void;
}

export const PortalColophon: React.FC<PortalColophonProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back to Portal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-widest">
          COLOPHON // SPECS & CRAFT
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs text-[#486616] dark:text-[#d5ef9c] font-semibold uppercase tracking-widest">
          <Code className="w-3.5 h-3.5" />
          <span>PORTFOLIO ANATOMY & ARCHITECTURE</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
          Craft, typography & runtime decisions.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl text-pretty leading-relaxed">
          Designed from first principles to balance creative studio editorial aesthetics with high-performance production engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
        <div className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2">
          <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px] flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>01 // Core Stack & Runtime</span>
          </div>
          <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
            Built on <strong className="text-[#1a1917] dark:text-[#f0ede5]">React 19</strong>, <strong className="text-[#1a1917] dark:text-[#f0ede5]">TypeScript 5.7</strong>, and <strong className="text-[#1a1917] dark:text-[#f0ede5]">Vite 6</strong>. Pre-rendered into standalone static HTML through a custom Node.js SSG script for zero-JS initial paint and search engine crawler indexing.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2">
          <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>02 // Typographic System</span>
          </div>
          <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
            Four disciplined typefaces with distinct responsibilities: <strong className="text-[#1a1917] dark:text-[#f0ede5]">Clash Display</strong> for sculptural headlines, <strong className="text-[#1a1917] dark:text-[#f0ede5]">Instrument Serif</strong> for editorial italic contrast, <strong className="text-[#1a1917] dark:text-[#f0ede5]">Satoshi</strong> for high-legibility body, and <strong className="text-[#1a1917] dark:text-[#f0ede5]">JetBrains Mono</strong> for technical telemetry.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2">
          <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px] flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>03 // Layout & Design Tokens</span>
          </div>
          <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
            <strong className="text-[#1a1917] dark:text-[#f0ede5]">Tailwind CSS v4</strong> utilizing native CSS variables, fluid responsive <code>clamp()</code> scaling tokens, <code>font-size-adjust: from-font</code> for zero layout-shift font swapping, and custom micro-animations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2">
          <div className="font-mono font-bold text-[#486616] dark:text-[#d5ef9c] uppercase text-[11px] flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>04 // Accessibility & Motion</span>
          </div>
          <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
            Full compliance with <code>prefers-reduced-motion</code>, accessible focus rings, semantic HTML5 elements, and keyboard combobox navigation traps for PORTAL OS.
          </p>
        </div>
      </div>
    </div>
  );
};
