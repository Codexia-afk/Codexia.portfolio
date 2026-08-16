import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Briefcase, Award, Trophy, Zap, ArrowRight } from 'lucide-react';
import { experienceData } from '../data/experience';

export const ExperienceCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = experienceData.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const getIcon = (type: string) => {
    if (type.includes('National')) return Trophy;
    if (type.includes('Competitive')) return Award;
    if (type.includes('Compressed')) return Zap;
    return Briefcase;
  };

  return (
    <section 
      id="experience" 
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden"
    >
      {/* Horizontal Orbital Guide Line in background */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-stone-300 dark:via-zinc-800 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-stone-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="font-mono text-xs tracking-widest-xl text-teal-600 dark:text-teal-400 uppercase font-semibold mb-2">
              02 · EXPERIENCE & ACHIEVEMENTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
              EXPERIENCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-2 sm:mt-0">
            Horizontal Orbit Carousel · Real track records only
          </p>
        </div>

        {/* Desktop 2-Card View / Mobile 1-Card View */}
        <div className="relative min-h-[380px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                experienceData[currentIndex],
                experienceData[(currentIndex + 1) % total]
              ].map((item) => {
                const IconComponent = getIcon(item.type);

                return (
                  <motion.div
                    key={item.id}
                    data-cursor="project"
                    whileHover={{ y: -6 }}
                    className="bg-stone-100/90 dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-stone-400 dark:hover:border-zinc-700 transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Bar: Icon + Period Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-zinc-800 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-stone-300/50 dark:border-zinc-700/50 group-hover:scale-105 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-stone-200/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-semibold border border-stone-300/40 dark:border-zinc-700/40">
                          {item.period}
                        </span>
                      </div>

                      {/* Organization & Role */}
                      <div className="mb-3">
                        <div className="font-mono text-xs tracking-wider text-teal-600 dark:text-teal-400 uppercase font-semibold mb-1">
                          {item.organization}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {item.role}
                        </h3>
                      </div>

                      {/* Description & Concise Bullets */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start space-x-2">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges & Hover CTA */}
                    <div className="pt-4 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-stone-300/40 dark:border-zinc-700/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-1 font-mono text-xs font-semibold text-teal-600 dark:text-teal-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <span>VIEW</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Control Bar */}
        <div className="mt-10 flex items-center justify-between font-mono text-xs text-zinc-600 dark:text-zinc-400 border-t border-stone-200 dark:border-zinc-800 pt-6">
          <button
            onClick={handlePrev}
            data-cursor="nav"
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-stone-300 dark:border-zinc-800 hover:border-stone-500 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="Previous Experience"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREVIOUS</span>
          </button>

          <div className="tracking-widest font-semibold text-zinc-900 dark:text-zinc-100">
            {currentIndex + 1} / {total}
          </div>

          <button
            onClick={handleNext}
            data-cursor="nav"
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-stone-300 dark:border-zinc-800 hover:border-stone-500 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
