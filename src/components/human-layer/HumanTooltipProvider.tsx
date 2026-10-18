import React from 'react';
import { FloatingDelayGroup } from '@floating-ui/react';

export interface HumanTooltipProviderProps {
  delay?: number | { open?: number; close?: number };
  timeoutMs?: number;
  children: React.ReactNode;
}

export const HumanTooltipProvider: React.FC<HumanTooltipProviderProps> = ({
  delay = { open: 120, close: 80 },
  timeoutMs = 250,
  children,
}) => {
  return (
    <FloatingDelayGroup delay={delay} timeoutMs={timeoutMs}>
      {children}
    </FloatingDelayGroup>
  );
};

export default HumanTooltipProvider;
