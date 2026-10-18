import React, { useState, useRef, useEffect, useId } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { getHumorItem, HumorItem, TooltipPlacement } from '../../data/humanLayer';

export type TooltipAlign = 'auto' | 'start' | 'center' | 'end';

export interface HumanTooltipProps {
  registryId?: string;
  message?: string;
  tag?: string;
  tone?: 'professional-wit' | 'hinglish-casual';
  placement?: TooltipPlacement;
  align?: TooltipAlign;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const HumanTooltip: React.FC<HumanTooltipProps> = ({
  registryId,
  message,
  tag,
  tone,
  placement,
  align = 'auto',
  disabled = false,
  className = '',
  children
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [computedAlign, setComputedAlign] = useState<'start' | 'center' | 'end'>('center');
  
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const shouldReduceMotion = useReducedMotion();

  // Retrieve item from registry if ID provided
  const registryItem: HumorItem | undefined = registryId ? getHumorItem(registryId) : undefined;

  const resolvedPlacement = placement || registryItem?.placement || 'top';
  const resolvedTone = tone || registryItem?.tone || 'professional-wit';
  const resolvedTag = tag || registryItem?.tag || (resolvedTone === 'professional-wit' ? 'SYSTEM // NOTE' : 'ATELIER // WIT');

  // Messages array
  const messagesList = registryItem?.messages || (message ? [message] : []);
  const activeMessage = messagesList.length > 0 ? messagesList[messageIndex % messagesList.length] : message || '';

  // Dismiss on Escape
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // If no message or disabled, return plain children
  if (disabled || !activeMessage) {
    return <>{children}</>;
  }

  const handleShow = () => {
    setMessageIndex((prev) => (prev + 1) % Math.max(1, messagesList.length));

    // Viewport-aware boundary computation
    if (align && align !== 'auto') {
      setComputedAlign(align);
    } else if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // If trigger is within 180px of left edge, align to start (left-0)
      if (rect.left < 180) {
        setComputedAlign('start');
      } 
      // If trigger is within 180px of right edge, align to end (right-0)
      else if (viewportWidth - rect.right < 180) {
        setComputedAlign('end');
      } 
      // Otherwise safely center
      else {
        setComputedAlign('center');
      }
    }

    setIsVisible(true);
  };

  const handleHide = () => {
    setIsVisible(false);
  };

  // Placement styling classes
  const getPlacementClasses = () => {
    let vertical = '';
    if (resolvedPlacement === 'bottom') {
      vertical = 'top-full mt-2.5';
    } else if (resolvedPlacement === 'top') {
      vertical = 'bottom-full mb-2.5';
    }

    if (resolvedPlacement === 'left') {
      return 'right-full top-1/2 -translate-y-1/2 mr-2.5';
    }
    if (resolvedPlacement === 'right') {
      return 'left-full top-1/2 -translate-y-1/2 ml-2.5';
    }

    // Top / Bottom horizontal anchoring
    switch (computedAlign) {
      case 'start':
        return `${vertical} left-0`;
      case 'end':
        return `${vertical} right-0`;
      case 'center':
      default:
        return `${vertical} left-1/2`;
    }
  };

  // Resolve horizontal motion offset based on computed alignment
  const getHorizontalOffset = () => {
    if (resolvedPlacement === 'left' || resolvedPlacement === 'right') return 0;
    if (computedAlign === 'center') return '-50%';
    return 0; // 'start' or 'end' stays at 0
  };

  // Framer motion variants
  const motionVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: resolvedPlacement === 'bottom' ? -4 : resolvedPlacement === 'top' ? 4 : 0,
          x: getHorizontalOffset(),
          scale: 0.96
        },
    visible: {
      opacity: 1,
      y: 0,
      x: getHorizontalOffset(),
      scale: 1,
      transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.12 }
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      aria-describedby={isVisible ? uniqueId : undefined}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            id={uniqueId}
            role="tooltip"
            aria-live="polite"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute z-50 pointer-events-none select-none w-max max-w-[min(20rem,calc(100vw-2rem))] ${getPlacementClasses()}`}
          >
            <div className="px-3 py-2 rounded-lg bg-[#1a1917]/95 dark:bg-[#201f1c]/95 text-[#f8f6f0] dark:text-[#f0ede5] border border-[#383731] dark:border-[#494841] shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-1">
              {/* Header Badge */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#d5ef9c] dark:text-[#d5ef9c] font-bold">
                {resolvedTone === 'professional-wit' ? (
                  <Terminal className="w-2.5 h-2.5" />
                ) : (
                  <Sparkles className="w-2.5 h-2.5" />
                )}
                <span>{resolvedTag}</span>
              </div>

              {/* Message Content */}
              <p className="font-sans text-xs font-medium text-white/95 dark:text-[#f0ede5] leading-snug break-words">
                {activeMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HumanTooltip;
