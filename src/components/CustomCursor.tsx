import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'project' | 'nav'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect touch device or reduced motion
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setIsTouchDevice(touch);
    setReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleReducedMotionChange);

    if (touch || mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const navEl = target.closest('[data-cursor="nav"], a, button');

      if (projectEl) {
        setCursorType('project');
      } else if (navEl) {
        setCursorType('nav');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [isVisible]);

  if (isTouchDevice || reducedMotion || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: cursorType === 'project' ? 0 : cursorType === 'nav' ? 0.5 : 1,
          opacity: cursorType === 'project' ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer reactive ring */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center font-mono text-[10px] tracking-widest font-semibold uppercase transition-colors duration-200 ${
          cursorType === 'project'
            ? 'w-16 h-16 bg-zinc-900/90 text-cyan-400 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
            : cursorType === 'nav'
            ? 'w-10 h-10 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/60'
            : 'w-7 h-7 bg-transparent border-zinc-400 dark:border-zinc-600'
        }`}
        animate={{
          x: position.x,
          y: position.y,
          scale: cursorType === 'project' ? 1 : cursorType === 'nav' ? 1.1 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.2 }}
      >
        {cursorType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            VIEW
          </motion.span>
        )}
        {cursorType === 'nav' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            GO
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
