import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Zap, Camera, X } from 'lucide-react';
import { hackathonPhotos, HackathonPhoto } from '../data/hackathons';
import { SectionHeading, MonoLabel } from './typography/Typography';

export const HackathonsSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<HackathonPhoto | null>(null);

  // Duplicate items for infinite ribbon loop
  const ribbonItems = [...hackathonPhotos, ...hackathonPhotos];

  return (
    <section 
      id="hackathons" 
      className="relative min-h-[85vh] w-full flex flex-col justify-center py-24 bg-stone-100/60 dark:bg-zinc-900/30 border-y border-stone-200/80 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          number="05"
          label="RAPID PROTOTYPING & PRESSURE BUILDS"
          title="COMPETITIVE BUILDS"
          italicWord="*& hackathons.*"
          subtitle="Pressure-testing architectures, validating real-time sync, and shipping production MVPs in 24–48 hours."
        />

        {/* Core Statement Callout */}
        <div className="max-w-4xl mx-auto mb-14 px-6 sm:px-8 py-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-2xs text-left">
          <p className="font-sans text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal text-pretty">
            Competitive hackathons provide compressed, high-stakes environments to stress-test systems architecture, validate low-latency communication loops, and ship functional, deterministic software against unforgiving deadlines.
          </p>
        </div>

        {/* Stat Presentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          
          {/* Stat 1 */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 text-left flex flex-col justify-between shadow-2xs hover:border-sky-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-cyan-950/60 text-sky-600 dark:text-cyan-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                7+
              </div>
              <div className="font-mono text-xs text-sky-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-2">
                HACKATHONS COMPLETED
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Rapid prototyping of AI agents, security tools, and collaborative web platforms under high pressure.
              </p>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 text-left flex flex-col justify-between shadow-2xs hover:border-amber-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                1st RUNNER-UP
              </div>
              <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
                CRAZYBUILD HACKATHON
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Awarded for sub-50ms WebSocket synchronization & real-time collaborative developer tooling.
              </p>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 text-left flex flex-col justify-between shadow-2xs hover:border-emerald-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                QUALIFIER
              </div>
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">
                SMART INDIA HACKATHON 2025
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                National level hackathon selected among top engineering teams across India.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Ribbon Gallery Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-3 border-b border-stone-200/80 dark:border-zinc-800/80 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <MonoLabel className="text-zinc-800 dark:text-zinc-200">
              EVENT PHOTO ARCHIVE
            </MonoLabel>
          </div>
          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-0">
            Infinite Ribbon Gallery · Hover to Pause · Click to Expand
          </span>
        </div>

      </div>

      {/* Full-Width Ribbon Moving Photo Gallery */}
      <div className="relative w-full overflow-hidden pause-on-hover py-4 select-none">
        
        {/* Subtle Fade Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-stone-100/90 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-stone-100/90 dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

        {/* Animated Infinite Moving Track */}
        <div className="animate-ribbon gap-5 px-4">
          {ribbonItems.map((photo, idx) => (
            <div
              key={`${photo.src}-${idx}`}
              onClick={() => setSelectedPhoto(photo)}
              className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[380px] h-[220px] sm:h-[240px] rounded-2xl overflow-hidden border-2 border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md group cursor-pointer transition-all duration-300 hover:border-sky-500 dark:hover:border-cyan-500 hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover filter-none dark:grayscale dark:contrast-110 dark:brightness-95 dark:group-hover:filter-none group-hover:scale-105 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent pointer-events-none opacity-70 group-hover:opacity-50 transition-opacity" />

              {/* Event Tag in Top Left */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-zinc-950/85 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-xs">
                  {photo.tag}
                </span>
              </div>

              {/* Caption in Bottom Left */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                <p className="font-sans text-xs text-white font-medium line-clamp-1 drop-shadow-xs">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal for Photo View */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-md bg-zinc-900/80 text-zinc-300 hover:text-white border border-zinc-700 hover:border-cyan-500 transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.fullSrc || selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              <div className="p-6">
                <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1.5">
                  {selectedPhoto.tag}
                </div>
                <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HackathonsSection;
