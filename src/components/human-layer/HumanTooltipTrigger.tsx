import React from 'react';

export interface HumanTooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const HumanTooltipTrigger = React.forwardRef<HTMLElement, HumanTooltipTriggerProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={`inline-flex items-center ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

HumanTooltipTrigger.displayName = 'HumanTooltipTrigger';

export default HumanTooltipTrigger;
