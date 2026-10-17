import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata timezone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#eeeae0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-t border-[#dcd6c8] dark:border-[#2d2c27] pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Top Grid: Chapters, Telemetry, Colophon */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Sign-off & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-widest">
              THE PERSONAL INTERNET // COLOPHON
            </div>
            <p className="font-sans text-sm sm:text-base text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-w-md">
              A personal digital laboratory blending independent creative studio craft, engineering field notes, and deterministic systems design.
            </p>
            <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] space-y-1 pt-2">
              <div>STACK: REACT 19 · TYPESCRIPT · TAILWIND V4</div>
              <div>TYPOGRAPHY: CLASH DISPLAY · INSTRUMENT SERIF · SATOSHI · JETBRAINS MONO</div>
            </div>
          </div>

          {/* Middle Column: Chapter Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider font-semibold pb-2 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
              CHAPTER DIRECTORY
            </div>
            <nav className="flex flex-col space-y-2 text-[#58554d] dark:text-[#a8a69f]">
              <a href="#about" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                01 // Intent &amp; Background
              </a>
              <a href="#skills" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                02 // Technical Capabilities
              </a>
              <a href="#projects" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                03 // Selected Builds &amp; Case Studies
              </a>
              <a href="#hackathons" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                04 // Hackathon Field Notes
              </a>
              <a href="#writing" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                05 // Technical Dispatches
              </a>
              <a href="#contact" className="hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
                06 // Direct Inquiries
              </a>
            </nav>
          </div>

          {/* Right Column: Local Time, Legal, Back to top (3 cols) */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs text-right md:text-left flex flex-col justify-between h-full">
            <div className="space-y-1">
              <div className="text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider font-semibold">
                LOCAL TIME (KOLKATA)
              </div>
              <div className="font-mono text-base font-bold text-[#1a1917] dark:text-[#f0ede5]">
                {localTime ? `${localTime} IST` : 'IST (UTC+5:30)'}
              </div>
              <div className="text-[11px] text-[#8c877b] dark:text-[#6e6b63]">
                22.5726° N, 88.3639° E
              </div>
            </div>

            <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center space-x-3 text-[#8c877b] dark:text-[#a8a69f]">
                <Link to="/privacy" className="hover:underline">Privacy</Link>
                <span>·</span>
                <Link to="/terms" className="hover:underline">Terms</Link>
              </div>
            </div>
          </div>

        </div>

        {/* Oversized Kinetic Name Typography Signature Marquee */}
        <div className="pt-10 pb-2 border-t border-[#dcd6c8] dark:border-[#2d2c27] select-none overflow-hidden relative group">
          {/* Subtle side fade masks for silky edge blending */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#eeeae0] dark:from-[#131312] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#eeeae0] dark:from-[#131312] to-transparent z-10 pointer-events-none" />

          <div className="animate-footer-marquee py-2 flex items-center">
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center shrink-0">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center font-display text-[3.5rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] font-bold tracking-[-0.04em] uppercase text-[#dcd6c8]/60 dark:text-[#2d2c27]/80 hover:text-[#486616]/40 dark:hover:text-[#d5ef9c]/40 transition-colors leading-[0.85] pr-8 sm:pr-14"
                  >
                    <span>SRINJOY PRAMANICK</span>
                    <span className="font-mono text-[1.5rem] sm:text-[2.5rem] md:text-[3.5rem] text-[#8c877b]/40 dark:text-[#6e6b63]/50 pl-8 sm:pl-14">
                      //
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Baseline Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8c877b] dark:text-[#6e6b63]">
          <div>
            © {new Date().getFullYear()} Srinjoy Pramanick. All rights reserved.
          </div>
          <div>
            PORTFOLIO V2.0 // INDEPENDENT ENGINEERING ATELIER
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
