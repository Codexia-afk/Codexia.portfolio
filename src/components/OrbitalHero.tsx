import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, FileText, ArrowUpRight, Award, Shield, Terminal } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';
import type { Variants } from 'framer-motion';

export const OrbitalHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1
      }
    }
  };

  const lineVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_70%,transparent_100%)] opacity-40 dark:opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Top Technical Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-zinc-500 dark:text-zinc-400"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <MonoLabel className="text-[10px] sm:text-[11px] text-zinc-700 dark:text-zinc-300">
              STATUS // SHIPPING ARCHITECTURE
            </MonoLabel>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/70 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60">
            <MonoLabel className="text-[10px] sm:text-[11px]">
              LOC // 22.57°N, 88.36°E
            </MonoLabel>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/70 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60">
            <MonoLabel className="text-[10px] sm:text-[11px]">
              SPECIALIZATION // AI RUNTIMES & SYSTEMS
            </MonoLabel>
          </div>
        </motion.div>

        {/* Profile Card & Identity Pill */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-stone-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md overflow-hidden ring-2 ring-sky-500/20 dark:ring-cyan-500/20">
              <img
                src="/profile-bw.jpg"
                alt="Srinjoy Pramanick"
                className="w-full h-full rounded-full object-cover object-[center_20%] filter-none dark:filter dark:grayscale dark:contrast-110 dark:brightness-95 transition-all duration-500"
              />
            </div>
          </motion.div>

          <div className="text-left">
            <div className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
              SRINJOY PRAMANICK
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
              AI Engineer & Systems Builder
            </div>
          </div>
        </div>

        {/* Primary SEO Heading */}
        <h1 className="sr-only">Srinjoy Pramanick - AI Engineer, ML Engineer & Full-Stack Developer</h1>

        {/* Master Typographic Composition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full mb-6 select-none"
        >
          {/* Line 1: Clash Display */}
          <div className="overflow-hidden py-1">
            <motion.div
              variants={lineVariants}
              className="font-display text-[2.75rem] sm:text-[4.25rem] lg:text-[5.75rem] font-bold uppercase tracking-[-0.04em] text-zinc-900 dark:text-zinc-50 leading-[0.92]"
            >
              BUILDING
            </motion.div>
          </div>

          {/* Line 2: Clash Display */}
          <div className="overflow-hidden py-1">
            <motion.div
              variants={lineVariants}
              className="font-display text-[2.5rem] sm:text-[4rem] lg:text-[5.25rem] font-bold uppercase tracking-[-0.035em] text-zinc-900 dark:text-zinc-100 leading-[0.92]"
            >
              INTELLIGENT SYSTEMS
            </motion.div>
          </div>

          {/* Line 3: Instrument Serif Expressive Italic Phrase */}
          <div className="overflow-hidden py-1">
            <motion.div
              variants={lineVariants}
              className="font-editorial text-[2.25rem] sm:text-[3.75rem] lg:text-[4.75rem] font-normal italic lowercase tracking-normal text-sky-600 dark:text-cyan-400 leading-[1.0] drop-shadow-xs"
            >
              *with precision & intent.*
            </motion.div>
          </div>
        </motion.div>

        {/* Sophisticated Satoshi Introductory Paragraph */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="font-sans text-base sm:text-lg lg:text-[1.1875rem] text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed mb-8 font-normal text-pretty"
        >
          Computer Science Engineering student crafting deterministic AI guardrails, WebAssembly micro-runtimes, low-latency microservices, and human-first developer tooling.
        </motion.p>

        {/* Technical Highlights / Awards Badges */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 dark:bg-zinc-900/90 text-amber-800 dark:text-amber-400 border border-amber-200/80 dark:border-zinc-800 font-semibold shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>1st Runner-Up @ CrazyBuild</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-zinc-900/90 text-emerald-800 dark:text-emerald-400 border border-emerald-200/80 dark:border-zinc-800 font-semibold shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>SIH 2025 Qualifier</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 dark:bg-zinc-900/90 text-sky-800 dark:text-cyan-400 border border-sky-200/80 dark:border-zinc-800 font-semibold shadow-2xs">
            <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>7+ Hackathons Completed</span>
          </div>
        </motion.div>

        {/* Clear Actions / CTAs with Editorial Balance */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-all shadow-sm hover:shadow-md"
          >
            <span>SELECTED BUILDS</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all shadow-2xs"
          >
            <Github className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-current" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
            <span>RESUME</span>
          </a>
        </motion.div>

        {/* Inline Section Index Navigation with Refined Tracking */}
        <nav
          aria-label="Section navigation"
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[11px] sm:text-xs tracking-[0.16em] uppercase text-zinc-500 dark:text-zinc-400 pt-2 border-t border-stone-200/60 dark:border-zinc-900/60"
        >
          <a href="#about" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            ABOUT
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a href="#experience" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            EXPERIENCE
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a href="#skills" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            SKILLS
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a href="#projects" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            PROJECTS
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a href="#hackathons" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            HACKATHONS
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a href="#contact" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            CONTACT
          </a>
        </nav>

      </div>
    </section>
  );
};

export default OrbitalHero;
