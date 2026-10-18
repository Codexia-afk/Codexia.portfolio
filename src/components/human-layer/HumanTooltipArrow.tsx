import React from 'react';
import { FloatingArrow, FloatingContext } from '@floating-ui/react';

export interface HumanTooltipArrowProps {
  context: FloatingContext;
  arrowRef: React.RefObject<SVGSVGElement | null>;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const HumanTooltipArrow: React.FC<HumanTooltipArrowProps> = ({
  context,
  arrowRef,
  fill = '#1B1B18',
  stroke = '#45453D',
  strokeWidth = 1,
  width = 10,
  height = 5,
}) => {
  return (
    <FloatingArrow
      ref={arrowRef}
      context={context}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
    />
  );
};

export default HumanTooltipArrow;
