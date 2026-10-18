import React, { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { socialSignalsData, SocialSignal } from '../../data/socialSignals';
import { 
  LinkedInIcon, 
  XIcon, 
  InstagramIcon, 
  FacebookIcon, 
  LinktreeIcon, 
  PeerlistIcon 
} from './SocialSignalIcons';

export const SocialDock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeSignal, setActiveSignal] = useState<SocialSignal | null>(null);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [mobileModalOpen, setMobileModalOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const tooltipId = useId();

  const renderIcon = (id: SocialSignal['id']) => {
    switch (id) {
      case 'linkedin':
        return <LinkedInIcon className="w-4 h-4" />;
      case 'x':
        return <XIcon className="w-3.5 h-3.5" />;
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'facebook':
        return <FacebookIcon className="w-4 h-4" />;
      case 'linktree':
        return <LinktreeIcon className="w-4 h-4" />;
      case 'peerlist':
        return <PeerlistIcon className="w-4 h-4" />;
    }
  };

  const getPlatformMotion = (variant: SocialSignal['animationVariant']) => {
    if (shouldReduceMotion) return {};
    switch (variant) {
      case 'snap':
        return { rotate: [0, -3, 0], scale: 1.08 };
      case 'glitch':
        return { x: [0, -2, 2, 0], scale: 1.08 };
      case 'tilt':
        return { rotate: [0, -8, 5, 0], scale: 1.08 };
      case 'retro':
        return { y: [0, -3, 0], scale: 1.08 };
      case 'branch':
        return { scale: 1.1, y: -2 };
      case 'compile':
        return { scale: [1, 1.12, 1] };
      default:
        return { scale: 1.08 };
    }
  };

  const handleMouseEnter = (signal: SocialSignal) => {
    // Deterministically rotate between the two jokes on hover
    setMessageIndex((prev) => (prev + 1) % 2);
    setActiveSignal(signal);
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* Top micro-editorial kicker */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
          <span className="font-mono text-[11px] font-bold tracking-wider text-[#1a1917] dark:text-[#f0ede5] uppercase">
            SOCIAL SIGNALS // 06
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f] italic">
            Find me elsewhere.
          </span>
          {/* Mobile Joke Affordance Button */}
          <button
            type="button"
            onClick={() => setMobileModalOpen(true)}
            className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#eeeae0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] font-semibold cursor-pointer active:scale-95 transition-all"
            aria-label="View social personality jokes"
          >
            <Sparkles className="w-3 h-3" />
            <span>Vibes</span>
          </button>
        </div>
      </div>

      {/* Interactive Icon Dock Container */}
      <div 
        className="relative inline-flex items-center p-1.5 rounded-2xl bg-[#eeeae0]/90 dark:bg-[#1a1917]/90 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-xs backdrop-blur-md"
        onMouseLeave={() => setActiveSignal(null)}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {socialSignalsData.map((signal) => {
            const isHovered = activeSignal?.id === signal.id;

            return (
              <div key={signal.id} className="relative">
                <motion.a
                  href={signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={signal.accessibleName}
                  onMouseEnter={() => handleMouseEnter(signal)}
                  onFocus={() => handleMouseEnter(signal)}
                  onBlur={() => setActiveSignal(null)}
                  whileHover={getPlatformMotion(signal.animationVariant)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-200 outline-hidden focus-visible:ring-2 focus-visible:ring-[#486616] dark:focus-visible:ring-[#d5ef9c] ${
                    isHovered
                      ? 'bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] shadow-sm z-10'
                      : 'bg-[#f4efe5] dark:bg-[#201f1c] text-[#58554d] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5] border border-[#dcd6c8]/60 dark:border-[#2d2c27]'
                  }`}
                >
                  {renderIcon(signal.id)}

                  {/* Active dot marker on hover */}
                  {isHovered && (
                    <motion.span
                      layoutId="socialDockDot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#486616] dark:bg-[#d5ef9c]"
                      transition={{ type: 'spring', stiffness: 380, damping: 25 }}
                    />
                  )}
                </motion.a>
              </div>
            );
          })}
        </div>

        {/* Desktop Editorial Tooltip (Fixed to dock to prevent edge clipping) */}
        <AnimatePresence>
          {activeSignal && (
            <motion.div
              id={tooltipId}
              role="tooltip"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="hidden sm:block absolute left-0 -bottom-19 z-40 w-80 sm:w-88 rounded-xl bg-[#131312] text-[#f0ede5] border border-[#2d2c27] p-3 shadow-xl pointer-events-none select-none"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-[#2d2c27] mb-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: activeSignal.accentColor }} 
                  />
                  <span className="font-bold text-[#f0ede5] uppercase tracking-wider">
                    {activeSignal.label}
                  </span>
                  <span className="text-[#8c877b] dark:text-[#6e6b63]">·</span>
                  <span className="text-[#a8a69f]">
                    {activeSignal.handle}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#d5ef9c] font-semibold">
                  <span>{activeSignal.tag}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Witty Microcopy */}
              <p className="font-sans text-xs text-[#e5e2d9] leading-snug">
                "{activeSignal.microcopy[messageIndex % activeSignal.microcopy.length]}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Personality Modal / Bottom Sheet */}
      <AnimatePresence>
        {mobileModalOpen && (
          <div className="sm:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-sm rounded-2xl bg-[#1a1917] text-[#f0ede5] border border-[#2d2c27] p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#2d2c27]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d5ef9c]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f0ede5]">
                    SOCIAL SIGNALS // VIBES
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileModalOpen(false)}
                  className="p-1 rounded-full text-[#8c877b] hover:text-[#f0ede5] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {socialSignalsData.map((sig) => (
                  <a
                    key={sig.id}
                    href={sig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-[#201f1c] border border-[#2d2c27] active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#f0ede5]">
                        {renderIcon(sig.id)}
                        <span>{sig.label}</span>
                      </div>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-xs bg-black/40 text-[#d5ef9c]">
                        {sig.tag}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#a8a69f] leading-relaxed italic">
                      "{sig.microcopy[0]}"
                    </p>
                  </a>
                ))}
              </div>

              <div className="text-center pt-1 font-mono text-[10px] text-[#8c877b]">
                TAP ANY PLATFORM TO OPEN OFFICIAL PROFILE ↗
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
