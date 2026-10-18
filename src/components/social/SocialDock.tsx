import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { socialSignalsData, SocialSignal } from '../../data/socialSignals';
import { HumanTooltip, HumanTooltipProvider } from '../human-layer';
import { 
  LinkedInIcon, 
  XIcon, 
  InstagramIcon, 
  FacebookIcon, 
  LinktreeIcon, 
  PeerlistIcon 
} from './SocialSignalIcons';

export const SocialDock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mobileModalOpen, setMobileModalOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

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
      <div className="relative inline-flex items-center p-1.5 rounded-2xl bg-[#eeeae0]/90 dark:bg-[#1a1917]/90 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-xs backdrop-blur-md">
        <HumanTooltipProvider delay={{ open: 80, close: 60 }}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {socialSignalsData.map((signal) => (
              <HumanTooltip
                key={signal.id}
                registryId={`social-${signal.id}`}
                placement="top"
                offsetDistance={12}
              >
                <motion.a
                  href={signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={signal.accessibleName}
                  whileHover={getPlatformMotion(signal.animationVariant)}
                  whileTap={{ scale: 0.94 }}
                  className="relative flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-xl transition-all duration-200 outline-hidden focus-visible:ring-2 focus-visible:ring-[#486616] dark:focus-visible:ring-[#d5ef9c] bg-[#f4efe5] dark:bg-[#201f1c] text-[#58554d] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5] hover:bg-[#1a1917] dark:hover:bg-[#f0ede5] hover:text-[#f8f6f0] dark:hover:text-[#131312] border border-[#dcd6c8]/60 dark:border-[#2d2c27] cursor-pointer"
                >
                  {renderIcon(signal.id)}
                </motion.a>
              </HumanTooltip>
            ))}
          </div>
        </HumanTooltipProvider>
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

              <div className="space-y-3 font-mono text-xs">
                {socialSignalsData.map((sig) => (
                  <a
                    key={sig.id}
                    href={sig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-2.5 rounded-lg bg-[#201f1c] border border-[#2d2c27] hover:border-[#d5ef9c] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#d5ef9c] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: sig.accentColor }} 
                        />
                        <span>{sig.label}</span>
                      </div>
                      <span className="text-[10px] text-[#8c877b]">{sig.tag}</span>
                    </div>
                    <div className="text-[11px] text-[#a8a69f] font-sans italic">
                      "{sig.microcopy[0]}"
                    </div>
                    <div className="text-[10px] text-[#6e6b63] font-mono mt-1">
                      {sig.mobileDescription}
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-2 text-center">
                <a
                  href="#contact"
                  onClick={() => setMobileModalOpen(false)}
                  className="inline-flex items-center gap-1 text-xs text-[#d5ef9c] hover:underline font-mono"
                >
                  <span>Or leave a direct transmission</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialDock;
