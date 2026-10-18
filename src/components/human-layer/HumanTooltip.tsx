import React, { useEffect } from 'react';
import { FloatingPortal, useMergeRefs, type Placement } from '@floating-ui/react';
import { useLocation } from 'react-router-dom';
import { getTooltipMessage, type HumanMessageId } from '../../data/humanLayerMessages';
import { useHumanTooltip } from './useHumanTooltip';

export interface HumanTooltipProps {
  registryId?: HumanMessageId;
  placement?: Placement;
  align?: 'start' | 'center' | 'end';
  offsetDistance?: number;
  disabled?: boolean;
  profile?: 'professional';
  children: React.ReactElement<React.HTMLProps<HTMLElement>>;
}

/** Attaches behavior to the actual control: no wrapper tab stop or lost link semantics. */
export const HumanTooltip: React.FC<HumanTooltipProps> = ({
  registryId, placement, align, offsetDistance, disabled = false, profile, children,
}) => {
  const location = useLocation();
  const data = registryId ? getTooltipMessage(registryId, profile === 'professional' || location.pathname === '/hire') : undefined;
  const basePlacement = placement ?? data?.preferredPlacement ?? 'top';
  const resolvedPlacement = (align && align !== 'center' && !basePlacement.includes('-')
    ? `${basePlacement}-${align}` : basePlacement) as Placement;
  const tooltip = useHumanTooltip({ placement: resolvedPlacement, offsetDistance, disabled: disabled || !data?.enabled });
  const ref = useMergeRefs([tooltip.refs.setReference, children.props.ref]);

  useEffect(() => { tooltip.setIsOpen(false); }, [location.key]); // close on route/hash navigation

  if (!data || !data.enabled || disabled) return children;
  const hidden = tooltip.middlewareData.hide?.referenceHidden;
  const describedBy = tooltip.isOpen
    ? [children.props['aria-describedby'], tooltip.tooltipId].filter(Boolean).join(' ')
    : children.props['aria-describedby'];
  const referenceProps = tooltip.getReferenceProps(children.props);
  const referenceMouseEnter = (referenceProps as React.HTMLProps<HTMLElement>).onMouseEnter;
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    referenceMouseEnter?.(event);
    // A direct handoff keeps adjacent controls responsive even while the
    // previous tooltip's safe polygon is closing.
    tooltip.setIsOpen(true);
  };
  return <>
    {React.cloneElement(children, {
      ...referenceProps,
      ref,
      onMouseEnter: handleMouseEnter,
      'aria-describedby': describedBy,
      'data-human-tooltip-trigger': registryId,
    } as React.HTMLProps<HTMLElement>)}
    {tooltip.isOpen && <FloatingPortal>
      <div
        {...tooltip.getFloatingProps({ id: tooltip.tooltipId })}
        ref={tooltip.refs.setFloating}
        style={{ ...tooltip.floatingStyles, visibility: hidden || !tooltip.isPositioned ? 'hidden' : undefined }}
        className="human-tooltip"
        id={tooltip.tooltipId}
        data-testid="human-tooltip"
        data-human-tooltip-id={registryId}
        data-profile={data.tone}
        data-placement={tooltip.placement}
      >
        <div className="human-tooltip-content">
          <p>{data.defaultMessage}</p>
        </div>
      </div>
    </FloatingPortal>}
  </>;
};
export default HumanTooltip;
