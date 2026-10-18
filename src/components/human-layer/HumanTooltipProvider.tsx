import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface HumanLayerState {
  activeId: string | null;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}
const HumanLayerContext = createContext<HumanLayerState | null>(null);
export const useHumanLayer = () => useContext(HumanLayerContext);

/** A single active description across page, social dock and modal surfaces. */
export const HumanTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const dismiss = () => setActiveId(null);
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeId) return;
      // Dismiss the description first; a second Escape reaches the containing dialog.
      event.preventDefault();
      event.stopImmediatePropagation();
      dismiss();
    };
    document.addEventListener('keydown', escape, true);
    document.addEventListener('pointerdown', dismiss, true);
    window.addEventListener('blur', dismiss);
    return () => {
      document.removeEventListener('keydown', escape, true);
      document.removeEventListener('pointerdown', dismiss, true);
      window.removeEventListener('blur', dismiss);
    };
  }, [activeId]);
  const value = useMemo(() => ({ activeId, setActiveId }), [activeId]);
  return <HumanLayerContext.Provider value={value}>{children}</HumanLayerContext.Provider>;
};
