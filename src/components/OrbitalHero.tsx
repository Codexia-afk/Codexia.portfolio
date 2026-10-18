import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, Sparkles } from 'lucide-react';
import { MonoLabel } from './typography/Typography';
import { SocialDock } from './social/SocialDock';
import { HumanTooltip } from './common/HumanTooltip';

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
    <section className="relative min-h-[96vh] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] transition-colors duration-300 overflow-hidden">
      
      {/* Subtle Editorial Background Architectural Rules */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '6rem 6rem',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 90%)'
        }}
      />

      {/* Top Editorial Telemetry Header Band */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dcd6c8] dark:border-[#2d2c27]"
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs">
          <span className="font-bold text-[#1a1917] dark:text-[#f0ede5] tracking-widest uppercase">
            THE PERSONAL INTERNET
          </span>
          <span className="text-[#bfb8a6] dark:text-[#494841]">/</span>
          <span className="text-[#8c877b] dark:text-[#a8a69f] tracking-wider">
            VOL. 2026 · ISSUE 02
          </span>
          <span className="hidden sm:inline text-[#bfb8a6] dark:text-[#494841]">/</span>
          <span className="hidden sm:inline text-[#8c877b] dark:text-[#a8a69f]">
            22.57°N, 88.36°E (KOLKATA)
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#eeeae0] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#383731] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
            <span>ACTIVE // AI RUNTIMES & SYSTEMS</span>
          </span>
          <span className="hidden lg:inline text-[#8c877b] dark:text-[#6e6b63]">
            LATENCY: &lt; 18ms
          </span>
        </div>
      </motion.div>

      {/* Primary Hero Master Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Typographic Sculpture (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Editorial Kicker & Issue Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex items-center gap-3"
            >
              <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
                N° 01 — RUNTIME ARCHITECTURE
              </MonoLabel>
              <span className="text-[#bfb8a6] dark:text-[#494841] font-mono text-xs">·</span>
              <span className="font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f] tracking-wider uppercase">
                SRINJOY PRAMANICK (@CODEXIA-AFK)
              </span>
            </motion.div>

            {/* Sculptural Headlines */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="select-none mb-8"
            >
              {/* Line 1 */}
              <div className="overflow-hidden py-0.5">
                <motion.h1
                  variants={lineVariants}
                  className="font-display text-[2.25rem] min-[380px]:text-[2.75rem] sm:text-[4.25rem] lg:text-[5.5rem] font-bold uppercase tracking-[-0.04em] text-[#1a1917] dark:text-[#f0ede5] leading-[0.92]"
                >
                  ENGINEERING
                </motion.h1>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  variants={lineVariants}
                  className="font-display text-[2.1rem] min-[380px]:text-[2.5rem] sm:text-[4rem] lg:text-[5.15rem] font-bold uppercase tracking-[-0.035em] text-[#1a1917] dark:text-[#f0ede5] leading-[0.92]"
                >
                  DETERMINISTIC
                </motion.div>
              </div>

              {/* Line 3: Instrument Serif Contrast Phrase */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  variants={lineVariants}
                  className="font-editorial text-[2.15rem] min-[380px]:text-[2.5rem] sm:text-[3.85rem] lg:text-[4.75rem] font-normal italic lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c] leading-[1.0]"
                >
                  *systems & runtimes.*
                </motion.div>
              </div>
            </motion.div>

            {/* Grounded Narrative Description */}
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
              className="font-sans text-base sm:text-lg lg:text-[1.125rem] text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-w-2xl mb-8 font-normal text-pretty"
            >
              I engineer runtime guardrails for autonomous AI agents, capability sandboxes in WebAssembly and Rust, and zero-dependency developer tools in Go. Bridging low-level systems precision with creative interface craft.
            </motion.p>

            {/* Direct Action Hub */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <HumanTooltip registryId="project-burnout-humor" placement="top">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#d5ef9c] dark:hover:text-[#131312] transition-colors shadow-xs"
                >
                  <span>EXPLORE SELECTED BUILDS</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </HumanTooltip>

              <HumanTooltip registryId="recruiter-contact" placement="top">
                <Link
                  to="/hire"
                  className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-mono text-xs font-bold uppercase tracking-wider border border-[#486616]/30 dark:border-[#d5ef9c]/30 hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:bg-[#e8edd9] dark:hover:bg-[#272622] transition-colors"
                >
                  <span>RECRUITER BRIEF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </HumanTooltip>

              <HumanTooltip registryId="resume-action" placement="top">
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-current opacity-80" />
                  <span>RÉSUMÉ</span>
                </a>
              </HumanTooltip>
            </motion.div>

            {/* Interactive Social Signals Dock */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <SocialDock />
            </motion.div>

            {/* Editorial Footnote Annotation */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.55 }}
              className="flex items-center gap-4 text-xs font-mono text-[#8c877b] dark:text-[#6e6b63] pt-4 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]/60"
            >
              <span>CURRENT DISPATCH:</span>
              <span className="text-[#1a1917] dark:text-[#f0ede5] font-semibold">
                JIS College of Engineering (2024–2028)
              </span>
              <span>·</span>
              <span>1st Runner-Up @ CrazyBuild</span>
            </motion.div>

          </div>

          {/* Right Column: Interactive Digital Atelier Lab (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full flex flex-col space-y-5"
          >
            
            {/* Atelier Card: Art-Directed Portrait Frame with "Banda Kaam ka" Hover Interaction */}
            <div className="rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] p-4 sm:p-5 shadow-xs relative overflow-hidden transition-all duration-300">
              
              {/* Header: Status HUD */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#dcd6c8] dark:border-[#2d2c27] mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#486616] dark:bg-[#d5ef9c]" />
                  <span className="font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] uppercase tracking-wider">
                    ATELIER LAB // SRINJOY PRAMANICK
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] font-semibold bg-[#f8f6f0] dark:bg-[#201f1c] px-2 py-0.5 rounded-xs border border-[#dcd6c8] dark:border-[#383731]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Interactive Picture Frame */}
              <div className="group relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] select-none cursor-pointer">
                {/* Portrait Photo */}
                <img
                  src="/srinjoy.jpg"
                  alt="Srinjoy Pramanick - Banda Kaam ka"
                  className="w-full h-full object-cover object-[center_32%] filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Ambient Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none transition-all duration-300 group-hover:from-black/85 group-hover:via-black/20" />

                {/* Overlaid Corner Technical Watermarks */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-black/60 text-[#d5ef9c] border border-white/10 backdrop-blur-xs pointer-events-none">
                  <span>KOLKATA // 22.57°N</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-black/60 text-[#f0ede5] border border-white/10 backdrop-blur-xs pointer-events-none">
                  <span>AI & SYSTEMS</span>
                </div>

                {/* "Banda Kaam ka" Hover Reveal Overlay - COMES IN RIGHT SIDE CORNER */}
                <div 
                  className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10 transition-all duration-300 ease-out opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                  aria-label="Banda Kaam ka"
                >
                  <div className="transform translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100 transition-all duration-300 ease-out flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131312]/95 backdrop-blur-md border border-[#d5ef9c]/70 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d5ef9c] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d5ef9c]" />
                    </span>
                    <span className="font-display sm:font-mono font-bold text-xs sm:text-sm text-[#f0ede5] tracking-wide select-none drop-shadow">
                      Banda Kaam ka
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#d5ef9c]" />
                  </div>
                </div>

                {/* Bottom Frame Status Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#f0ede5]/90 pointer-events-none transition-opacity duration-300">
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">BUILDER // ARCHITECT</span>
                  <span className="text-[#d5ef9c] text-[10px] uppercase font-bold tracking-wider group-hover:opacity-0 transition-opacity">
                    HOVER ME
                  </span>
                </div>
              </div>

              {/* Subtext and Quick Link */}
              <div className="mt-3.5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8c877b] dark:text-[#a8a69f]">
                  Engineering Runtimes & Agentic Trust
                </span>
                <a
                  href="#about"
                  className="inline-flex items-center gap-1 text-[#486616] dark:text-[#d5ef9c] hover:underline font-semibold"
                >
                  <span>Know Srinjoy</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Editorial Focus Columns & Notes */}
            <div className="grid grid-cols-2 gap-3.5">
              
              <div className="p-4 rounded-lg bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider mb-1">
                    DISCIPLINE 01
                  </div>
                  <div className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5]">
                    AI Middleware & Runtimes
                  </div>
                </div>
                <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-2 leading-relaxed">
                  FastAPI, FAISS, LLM tool-calling guardrails, vector embeddings.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider mb-1">
                    DISCIPLINE 02
                  </div>
                  <div className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5]">
                    Systems, Go & WASM
                  </div>
                </div>
                <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-2 leading-relaxed">
                  PushGuard pre-push scanner, Wasmtime sandboxing, cross-platform TUIs.
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>

      {/* Bottom Editorial Chapter Directory Line */}
      <nav
        aria-label="Section chapter directory"
        className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-[#8c877b] dark:text-[#a8a69f] tracking-wider uppercase"
      >
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a href="#about" className="editorial-hover-underline hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
            01 // INTENT & BIOGRAPHY
          </a>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <a href="#skills" className="editorial-hover-underline hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
            02 // CAPABILITIES INDEX
          </a>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <a href="#projects" className="editorial-hover-underline hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
            03 // SELECTED BUILDS
          </a>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <a href="#hackathons" className="editorial-hover-underline hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
            04 // HACKATHON LOG
          </a>
          <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
          <a href="#contact" className="editorial-hover-underline hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors">
            05 // CONTACT
          </a>
        </div>

        <div className="text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
          ESC / ⌘K FOR PORTAL HUD
        </div>
      </nav>

    </section>
  );
};

export default OrbitalHero;
