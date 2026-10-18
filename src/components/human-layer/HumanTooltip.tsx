import React, { useState, useRef, useMemo } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  arrow,
  hide,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  Placement,
} from '@floating-ui/react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { getTooltipMessage, TooltipMessage, TooltipPlacement } from '../../data/humanLayerMessages';
import { getHumorItem } from '../../data/humanLayer';

export interface HumanTooltipProps {
  registryId?: string;
  message?: string;
  tag?: string;
  context?: 'professional' | 'personal' | 'social' | 'technical' | 'easter-egg';
  tone?: 'professional-wit' | 'hinglish-casual';
  placement?: TooltipPlacement | Placement;
  align?: 'start' | 'center' | 'end';
  offsetDistance?: number;
  showArrow?: boolean;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  className?: string;
  asChild?: boolean;
  children: React.ReactNode;
}

export const HumanTooltip: React.FC<HumanTooltipProps> = ({
  registryId,
  message,
  tag,
  context: customContext,
  tone,
  placement = 'top',
  align,
  offsetDistance = 10,
  showArrow = true,
  openDelay = 100,
  closeDelay = 80,
  disabled = false,
  className = '',
  asChild = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // 1. Resolve content from humanLayerMessages (or legacy humanLayer registry)
  const messageData: TooltipMessage | undefined = useMemo(() => {
    if (!registryId) return undefined;
    
    // Check primary 2.0 registry first
    const primary = getTooltipMessage(registryId);
    if (primary) return primary;

    // Check legacy registry fallback
    const legacy = getHumorItem(registryId);
    if (legacy) {
      return {
        id: legacy.id,
        tag: legacy.tag || (legacy.tone === 'professional-wit' ? 'SYSTEM // NOTE' : 'ATELIER // WIT'),
        message: legacy.messages[0],
        context: legacy.tone === 'professional-wit' ? 'professional' : 'personal',
        preferredPlacement: legacy.placement,
        alternativeMessages: legacy.messages.slice(1),
      };
    }
    return undefined;
  }, [registryId]);

  const activeMessage = message || messageData?.message || '';
  const activeTag = tag || messageData?.tag || 'SYSTEM // NOTE';
  const resolvedToneContext = tone === 'professional-wit' ? 'professional' : 'personal';
  const activeContext = customContext || (tone ? resolvedToneContext : undefined) || messageData?.context || 'professional';
  const basePlacement = (placement || messageData?.preferredPlacement || 'top') as string;
  const preferredPlacement = (
    align && align !== 'center' && !basePlacement.includes('-')
      ? `${basePlacement}-${align}`
      : basePlacement
  ) as Placement;

  // 2. Floating UI positioning engine with full middleware chain
  const {
    refs,
    floatingStyles,
    context: floatingContext,
    placement: resolvedPlacement,
    middlewareData,
  } = useFloating({
    open: isOpen && !disabled && Boolean(activeMessage),
    onOpenChange: setIsOpen,
    placement: preferredPlacement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetDistance),
      flip({
        fallbackAxisSideDirection: 'start',
        crossAxis: false,
        padding: 14,
      }),
      shift({
        padding: 14,
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.min(300, Math.max(160, availableWidth - 16))}px`,
            maxHeight: `${Math.max(100, availableHeight - 16)}px`,
          });
        },
        padding: 14,
      }),
      arrow({
        element: arrowRef,
        padding: 8,
      }),
      hide(),
    ],
  });

  // 3. User interaction hooks
  const hover = useHover(floatingContext, {
    delay: { open: openDelay, close: closeDelay },
    restMs: 40,
    mouseOnly: true, // Prevents mobile touch events from getting hijacked by hover
  });
  const focus = useFocus(floatingContext);
  const dismiss = useDismiss(floatingContext, { escapeKey: true });
  const role = useRole(floatingContext, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // If disabled or no message, render clean child
  if (disabled || !activeMessage) {
    return <>{children}</>;
  }

  // Animation direction mapping based on resolved placement
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

  const isReferenceHidden = Boolean(middlewareData.hide?.referenceHidden);

  return (
    <>
      {/* Trigger reference wrapper */}
      {asChild && React.isValidElement(children) ? (
        React.cloneElement(children as React.ReactElement<any>, {
          ref: refs.setReference,
          ...getReferenceProps(),
          'data-human-tooltip-trigger': registryId || 'custom',
        })
      ) : (
        <span
          ref={refs.setReference}
          {...getReferenceProps()}
          className={`inline-flex items-center ${className}`}
          data-human-tooltip-trigger={registryId || 'custom'}
        >
          {children}
        </span>
      )}

      {/* Portal-rendered floating tooltip */}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && !isReferenceHidden && (
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                zIndex: 9999,
              }}
              {...getFloatingProps()}
              data-testid="human-tooltip"
              data-human-tooltip-id={registryId || 'custom'}
              data-placement={resolvedPlacement}
              className="pointer-events-none select-none outline-none"
            >
              <motion.div
                variants={innerMotionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative px-3.5 py-2.5 rounded-lg bg-[#1B1B18] text-[#F0EDE5] border border-[#45453D] shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col gap-1.5 w-max max-w-[min(280px,calc(100vw-28px))] text-left"
              >
                {/* Arrow */}
                {showArrow && (
                  <FloatingArrow
                    ref={arrowRef}
                    context={floatingContext}
                    fill="#1B1B18"
                    stroke="#45453D"
                    strokeWidth={1}
                    tipRadius={1}
                    width={12}
                    height={6}
                  />
                )}

                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2.5 font-mono text-[9px] uppercase tracking-wider text-[#D5EF9C] font-bold text-left">
                  <div className="flex items-center gap-1.5">
                    {activeContext === 'professional' || activeContext === 'technical' ? (
                      <Terminal className="w-2.5 h-2.5" />
                    ) : (
                      <Sparkles className="w-2.5 h-2.5" />
                    )}
                    <span>{activeTag}</span>
                  </div>

                  {messageData?.externalIcon && (
                    <ArrowUpRight className="w-2.5 h-2.5 opacity-80" />
                  )}
                </div>

                {/* Message Text */}
                <p className="font-sans text-xs font-medium text-[#F0EDE5] leading-snug break-words text-left">
                  {activeMessage}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default HumanTooltip;
