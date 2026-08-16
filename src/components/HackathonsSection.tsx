import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap } from 'lucide-react';

export const HackathonsSection: React.FC = () => {
  return (
    <section 
      id="hackathons" 
      className="relative min-h-[80vh] w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/40 dark:bg-zinc-900/30 border-y border-stone-200/60 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        
        {/* Section Label */}
        <div className="font-mono text-xs tracking-widest-xl text-cyan-600 dark:text-cyan-400 uppercase font-semibold mb-3">
          05 · BUILD UNDER PRESSURE
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans mb-12">
          HACKATHONS & COMPETITIVE BUILDING
        </h2>

        {/* Quote Callout */}
        <div className="max-w-3xl mx-auto mb-16 px-6 py-8 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xl sm:text-2xl font-serif italic text-zinc-800 dark:text-zinc-200 leading-relaxed">
            "I use hackathons as compressed environments for turning ambitious ideas into working systems."
          </p>
        </div>

        {/* Stat Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* Stat 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-left flex flex-col justify-between shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-zinc-900 dark:text-zinc-100 mb-1">
                7+
              </div>
              <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-2">
                HACKATHONS COMPLETED
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Rapid 24-48 hour prototyping of AI agents, security tools, and collaborative web platforms.
              </p>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-left flex flex-col justify-between shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900 dark:text-zinc-100 mb-1">
                1st RUNNER-UP
              </div>
              <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
                CRAZYBUILD HACKATHON
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Awarded for sub-50ms WebSocket synchronization & developer tooling architectural execution.
              </p>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-left flex flex-col justify-between shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900 dark:text-zinc-100 mb-1">
                QUALIFIER
              </div>
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
                SMART INDIA HACKATHON 2025
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                National level hackathon selected among top engineering teams across India.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
