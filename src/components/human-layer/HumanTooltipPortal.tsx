import React from 'react';
import { FloatingPortal } from '@floating-ui/react';

export interface HumanTooltipPortalProps {
  id?: string;
  root?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
}

export const HumanTooltipPortal: React.FC<HumanTooltipPortalProps> = ({
  id = 'human-tooltip-portal',
  root,
  children,
}) => {
  return (
    <FloatingPortal id={id} root={root}>
      {children}
    </FloatingPortal>
  );
};

export default HumanTooltipPortal;
