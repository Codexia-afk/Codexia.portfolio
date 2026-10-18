import { useState, useRef } from 'react';
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
  Placement,
} from '@floating-ui/react';

export interface UseHumanTooltipOptions {
  placement?: Placement;
  offsetDistance?: number;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
}

export function useHumanTooltip({
  placement = 'top',
  offsetDistance = 10,
  openDelay = 100,
  closeDelay = 80,
  disabled = false,
}: UseHumanTooltipOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const floating = useFloating({
    open: isOpen && !disabled,
    onOpenChange: setIsOpen,
    placement,
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

  const hover = useHover(floating.context, {
    delay: { open: openDelay, close: closeDelay },
    restMs: 40,
    mouseOnly: true, // Prevents mobile touch conflicts
  });
  const focus = useFocus(floating.context);
  const dismiss = useDismiss(floating.context, { escapeKey: true });
  const role = useRole(floating.context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return {
    isOpen,
    setIsOpen,
    arrowRef,
    ...floating,
    ...interactions,
  };
}
