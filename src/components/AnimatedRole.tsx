import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const HERO_ROLES = [
  "AI ENGINEER",
  "MACHINE LEARNING DEVELOPER",
  "FULL-STACK DEVELOPER",
  "AI APPLICATION DEVELOPER",
  "PYTHON DEVELOPER",
  "BACKEND DEVELOPER",
  "AI AGENT BUILDER",
  "GENERATIVE AI DEVELOPER",
  "CYBERSECURITY BUILDER",
  "SOFTWARE ENGINEER",
  "HACKATHON BUILDER"
] as const;

export interface AnimatedRoleProps {
  roles?: readonly string[];
  intervalMs?: number;
  onRoleChange?: (index: number) => void;
  className?: string;
}

export const AnimatedRole: React.FC<AnimatedRoleProps> = ({
  roles = HERO_ROLES,
  intervalMs = 2600,
  onRoleChange,
  className = ""
}) => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (roles.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % roles.length;
        if (onRoleChange) {
          onRoleChange(nextIndex);
        }
        return nextIndex;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [roles, intervalMs, onRoleChange]);

  const currentRole = roles[index] || roles[0];

  return (
    <div
      className={`relative w-full h-7 sm:h-8 flex items-center justify-center overflow-hidden ${className}`}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -8 }
          }
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
          className="absolute font-mono text-[11px] xs:text-xs sm:text-xs tracking-wider sm:tracking-widest-xl uppercase text-zinc-500 dark:text-zinc-400 font-bold text-center whitespace-nowrap select-none px-2"
        >
          {currentRole}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
