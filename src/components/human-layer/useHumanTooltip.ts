import { useEffect, useId, useRef, useState } from 'react';
import {
  useFloating, autoUpdate, offset, flip, shift, size, hide,
  useHover, useFocus, useDismiss, useRole, useInteractions, safePolygon,
  type Placement, type MiddlewareState,
} from '@floating-ui/react';
import { useHumanLayer } from './HumanTooltipProvider';

export interface UseHumanTooltipOptions {
  placement?: Placement;
  offsetDistance?: number;
  disabled?: boolean;
}

// Keep a real viewport buffer around descriptions. The portal is fixed-positioned,
// so this also works when a trigger lives inside a scrolling modal or section.
function safetyPadding({ elements }: MiddlewareState) {
  const style = getComputedStyle(elements.floating);
  const inset = (side: string) => 14 + (parseFloat(style.getPropertyValue(`--safe-${side}`)) || 0);
  const reference = elements.reference instanceof Element ? elements.reference : null;
  const header = document.querySelector('header.fixed');
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  return {
    top: Math.max(inset('top'), reference && !reference.closest('header, [role="dialog"], dialog') ? headerBottom + 14 : 14),
    right: inset('right'), bottom: inset('bottom'), left: inset('left'),
  };
}

export function useHumanTooltip({ placement = 'top', offsetDistance = 10, disabled = false }: UseHumanTooltipOptions = {}) {
  const id = useId();
  const shared = useHumanLayer();
  const [localOpen, setLocalOpen] = useState(false);
  const touch = useRef(false);
  const isOpen = !disabled && (shared ? shared.activeId === id : localOpen);
  const setIsOpen = (open: boolean) => {
    if (open && (disabled || touch.current)) return;
    if (shared) shared.setActiveId(current => open ? id : current === id ? null : current);
    else setLocalOpen(open);
  };

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    strategy: 'fixed',
    whileElementsMounted: (reference, element, update) => autoUpdate(reference, element, update, { animationFrame: true }),
    middleware: [
      offset(offsetDistance),
      flip(state => ({ padding: safetyPadding(state), fallbackAxisSideDirection: 'start' })),
      shift(state => ({ padding: safetyPadding(state) })),
      size(state => ({
        padding: safetyPadding(state),
        apply({ availableWidth, elements }) {
          // Size the measured outer box to the usable viewport width. Height is
          // intentionally left unconstrained so enlarged text is never clipped.
          elements.floating.style.maxWidth = `${Math.max(0, Math.min(300, availableWidth))}px`;
        },
      })),
      hide({ strategy: 'referenceHidden' }),
    ],
  });
  const hover = useHover(floating.context, {
    mouseOnly: true, delay: { open: 80, close: 80 },
    // WCAG: visitors can move onto the description to read it without dismissal.
    handleClose: safePolygon({ blockPointerEvents: false }),
  });
  // Focus is an intentional, accessible entry point. Touch is filtered by the
  // pointer guard below, so this does not turn mobile taps into sticky tips.
  const focus = useFocus(floating.context, { visibleOnly: false });
  const dismiss = useDismiss(floating.context, { escapeKey: true, referencePress: true });
  const role = useRole(floating.context, { role: 'tooltip' });
  const interactions = useInteractions([hover, focus, dismiss, role]);

  useEffect(() => {
    const keyboard = () => { touch.current = false; };
    const pointer = (event: PointerEvent) => {
      touch.current = event.pointerType === 'touch';
      if (touch.current) setIsOpen(false);
    };
    // Capturing before focus prevents tap-generated focus from opening descriptions.
    const element = floating.refs.domReference.current;
    element?.addEventListener('pointerdown', pointer as EventListener);
    element?.addEventListener('keydown', keyboard);
    return () => {
      element?.removeEventListener('pointerdown', pointer as EventListener);
      element?.removeEventListener('keydown', keyboard);
    };
  });

  return { ...floating, ...interactions, isOpen, setIsOpen, tooltipId: id };
}
