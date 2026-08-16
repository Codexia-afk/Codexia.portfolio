import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import { personalData } from '../data/personal';

export const OrbitalHero: React.FC = () => {
  const [statementIndex, setStatementIndex] = useState(0);
  const [isSettled, setIsSettled] = useState(false);

  const statements = [
    "Hi, I'm Srinjoy Pramanick",
    "I build intelligent systems.",
    "Exploring what AI can become.",
    "I build intelligent systems."
  ];

  useEffect(() => {
    if (statementIndex < statements.length - 1) {
      const timer = setTimeout(() => {
        setStatementIndex((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsSettled(true);
    }
  }, [statementIndex, statements.length]);

  const navItems = [
    { label: 'ABOUT', target: '#about' },
    { label: 'EXPERIENCE', target: '#experience' },
    { label: 'SKILLS', target: '#skills' },
    { label: 'PROJECTS', target: '#projects' },
    { label: 'HACKATHONS', target: '#hackathons' }
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden bg-stone-50 dark:bg-zinc-950 select-none transition-colors duration-300">
      
      {/* Cybernetic Orbital Satellite & Constellation Telemetry System */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        
        {/* Outer Constellation Orbit Ring (Large Ambient) */}
        <div className="absolute w-[760px] h-[760px] sm:w-[940px] sm:h-[940px] md:w-[1100px] md:h-[1100px] rounded-full border border-stone-200/50 dark:border-zinc-900/60 pointer-events-none" />

        {/* Orbiting Satellite Node 1 (Clockwise Cyan Data Pulse on Main Circle) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] rounded-full pointer-events-none"
        >
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_12px_#06b6d4]" />
          </div>
        </motion.div>

        {/* Orbiting Satellite Node 2 (Counter-Clockwise Emerald Pulse on Outer Orbit) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] md:w-[740px] md:h-[740px] lg:w-[840px] lg:h-[840px] rounded-full border border-dashed border-stone-300/40 dark:border-zinc-800/40 pointer-events-none"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_14px_#10b981]" />
          </div>
        </motion.div>

        {/* Ambient Drifting Constellation Particles */}
        {[
          { top: '18%', left: '22%', delay: 0 },
          { top: '25%', left: '78%', delay: 1.2 },
          { top: '72%', left: '15%', delay: 2.4 },
          { top: '80%', left: '82%', delay: 3.6 },
          { top: '12%', left: '55%', delay: 0.8 },
          { top: '88%', left: '42%', delay: 1.8 }
        ].map((particle, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.3, y: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              y: [-10, 10, -10] 
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{ top: particle.top, left: particle.left }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-500/50 dark:bg-cyan-400/50 shadow-[0_0_8px_#06b6d4]"
          />
        ))}

      </div>

      {/* Centered Large Orbital Circle Frame */}
      <div className="relative z-10 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] rounded-full border border-stone-300/80 dark:border-zinc-800/80 flex flex-col items-center justify-center p-6 sm:p-10 transition-all duration-300 shadow-xl">
        
        {/* Subtle SVG Ambient Rotator Ring */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full animate-spin-slow opacity-60 dark:opacity-40" viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="298" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" className="text-stone-300 dark:text-zinc-800" />
            <circle cx="300" cy="2" r="4" className="fill-cyan-600 dark:fill-cyan-400" />
          </svg>
        </div>

        {/* Tightly Spaced Center Content Stack */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-2">
          
          {/* 1. Large Circular Black & White Profile Photo Cutout */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full p-1.5 border-2 border-stone-300 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center group relative ring-4 ring-cyan-500/20 transition-transform duration-500 hover:scale-105">
              <img
                src="/profile-bw.jpg"
                alt={personalData.name}
                className="w-full h-full rounded-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-110 filter brightness-95"
              />
            </div>
          </motion.div>

          {/* 2. Small Uppercase Role Label */}
          <div className="font-mono text-xs tracking-widest-xl uppercase text-zinc-500 dark:text-zinc-400 font-bold mb-3">
            AI ENGINEER
          </div>

          {/* 3. Large Bold Statement */}
          <div className="min-h-[72px] sm:min-h-[90px] flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              {!isSettled ? (
                <motion.h1
                  key={statementIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans leading-tight"
                >
                  {statements[statementIndex]}
                </motion.h1>
              ) : (
                <motion.h1
                  key="permanent"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans leading-tight"
                >
                  I build intelligent systems.
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Centered Inline Horizontal Nav Row Directly Beneath */}
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs tracking-widest text-zinc-600 dark:text-zinc-400 font-semibold">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.target}
                data-cursor="nav"
                className="hover:text-zinc-950 dark:hover:text-zinc-100 hover:underline decoration-cyan-500 underline-offset-4 transition-all py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

        </div>

      </div>

      {/* Small Centered Home Glyph Button sitting just outside the ring */}
      <motion.a
        href="#about"
        data-cursor="nav"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 sm:mt-8 w-9 h-9 rounded-full border border-stone-300 dark:border-zinc-800 bg-stone-100/80 dark:bg-zinc-900/80 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-xs z-20"
        aria-label="Scroll to explore section"
      >
        <Home className="w-4 h-4" />
      </motion.a>

    </section>
  );
};
