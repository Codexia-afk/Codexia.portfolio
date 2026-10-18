import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { Placement } from '@floating-ui/react';

export interface HumanTooltipContentProps {
  tag?: string;
  message: string;
  context?: 'professional' | 'personal' | 'social' | 'technical' | 'easter-egg';
  resolvedPlacement?: Placement;
  externalIcon?: boolean;
  className?: string;
}

export const HumanTooltipContent: React.FC<HumanTooltipContentProps> = ({
  tag = 'SYSTEM // NOTE',
  message,
  context = 'professional',
  resolvedPlacement = 'top',
  externalIcon = false,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialOffset = () => {
    if (resolvedPlacement.startsWith('top')) return { y: 4, x: 0 };
    if (resolvedPlacement.startsWith('bottom')) return { y: -4, x: 0 };
    if (resolvedPlacement.startsWith('left')) return { x: 4, y: 0 };
    if (resolvedPlacement.startsWith('right')) return { x: -4, y: 0 };
    return { x: 0, y: 0 };
  };

  const animOffset = getInitialOffset();

  const innerMotionVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.97,
          x: animOffset.x,
          y: animOffset.y,
        },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.18,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      variants={innerMotionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative px-3.5 py-2.5 rounded-lg bg-[#1B1B18] text-[#F0EDE5] border border-[#45453D] shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col gap-1.5 w-max max-w-[min(280px,calc(100vw-28px))] text-left ${className}`}
    >
      {/* Header Tag / Context */}
      <div className="flex items-center justify-between gap-2.5 font-mono text-[9px] uppercase tracking-wider text-[#D5EF9C] font-bold text-left">
        <div className="flex items-center gap-1.5">
          {context === 'professional' || context === 'technical' ? (
            <Terminal className="w-2.5 h-2.5" />
          ) : (
            <Sparkles className="w-2.5 h-2.5" />
          )}
          <span>{tag}</span>
        </div>

        {externalIcon && (
          <ArrowUpRight className="w-2.5 h-2.5 opacity-80" />
        )}
      </div>

      {/* Message Copy */}
      <p className="font-sans text-xs font-medium text-[#F0EDE5] leading-snug break-words text-left">
        {message}
      </p>
    </motion.div>
  );
};

export default HumanTooltipContent;
