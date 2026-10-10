import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Briefcase, Award, Trophy, Zap, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/experience';
import { SectionHeading } from './typography/Typography';

export const ExperienceCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = experienceData.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const getIconData = (type: string) => {
    if (type.includes('National')) return { icon: Trophy, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-zinc-800' };
    if (type.includes('Competitive')) return { icon: Award, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-zinc-800' };
    if (type.includes('Compressed')) return { icon: Zap, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-zinc-800' };
    return { icon: Briefcase, color: 'text-sky-600 dark:text-cyan-400', bg: 'bg-sky-100 dark:bg-zinc-800' };
  };

  const formatNumber = (num: number) => num < 10 ? `0${num}` : `${num}`;

  return (
    <section 
      id="experience" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="02"
          label="ENGINEERING EXPERIENCE & ROLES"
          title="TRACK RECORD"
          italicWord="*& technical execution.*"
          subtitle="Real-world engineering, architecture leadership, and competitive benchmarks."
        />

        {/* Desktop 2-Card View / Mobile 1-Card View */}
        <div className="relative min-h-[380px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                experienceData[currentIndex],
                experienceData[(currentIndex + 1) % total]
              ].map((item) => {
                const { icon: IconComponent, color, bg } = getIconData(item.type);

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-sky-300 dark:hover:border-zinc-700 transition-colors duration-200 group"
                  >
                    <div>
                      {/* Top Bar: Icon + Period Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center border border-stone-200/50 dark:border-zinc-700/50`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-stone-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-semibold border border-stone-200 dark:border-zinc-700/40">
                          {item.period}
                        </span>
                      </div>

                      {/* Organization & Role */}
                      <div className="mb-4">
                        <div className="font-mono text-xs tracking-wider text-sky-600 dark:text-cyan-400 uppercase font-semibold mb-1">
                          {item.organization}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.role}
                        </h3>
                      </div>

                      {/* Description & Bullets */}
                      <p className="font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal text-pretty">
                        {item.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start space-x-2 leading-relaxed">
                            <span className="text-sky-500 dark:text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-4 border-t border-stone-200/80 dark:border-zinc-800/80 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-400 border border-stone-200 dark:border-zinc-700/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-1 font-mono text-xs font-semibold text-sky-600 dark:text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                        <span>EXECUTION</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Control Bar */}
        <div className="mt-10 flex items-center justify-between font-mono text-xs text-zinc-600 dark:text-zinc-400 border-t border-stone-200/80 dark:border-zinc-800/80 pt-6">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-500 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer shadow-2xs"
            aria-label="Previous Experience"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREVIOUS</span>
          </button>

          <div className="tracking-widest font-semibold text-zinc-900 dark:text-zinc-100">
            {formatNumber(currentIndex + 1)} / {formatNumber(total)}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-500 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer shadow-2xs"
            aria-label="Next Experience"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExperienceCarousel;
