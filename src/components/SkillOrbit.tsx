import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillOrbitNodes, skillCategories, SkillNode } from '../data/skills';
import { Terminal, Cpu, Layers, Database, Wrench, Play, Pause } from 'lucide-react';

export const SkillOrbit: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(skillOrbitNodes[0]);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML': return Cpu;
      case 'Frontend': return Layers;
      case 'Backend': return Database;
      case 'Infrastructure': return Terminal;
      default: return Wrench;
    }
  };

  // Group skills by ring (ring 1: 100px, ring 2: 165px, ring 3: 230px)
  const ringConfigs = [
    { ring: 1, radius: 100, duration: 40, direction: 1 },  // Clockwise
    { ring: 2, radius: 165, duration: 55, direction: -1 }, // Counter-clockwise
    { ring: 3, radius: 230, duration: 70, direction: 1 }   // Clockwise
  ];

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/40 dark:bg-zinc-900/20 border-y border-stone-200/60 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="font-mono text-xs tracking-widest-xl text-cyan-600 dark:text-cyan-400 uppercase font-semibold mb-2">
            03 · DYNAMIC ORBITING MAP
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            SKILLS & TOOLING
          </h2>
          <div className="flex items-center justify-center space-x-3 mt-3">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono">
              Hover nodes to pause & inspect focus evidence.
            </p>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center space-x-1.5 font-mono text-[11px] px-3 py-1 rounded-full border border-stone-300 dark:border-zinc-700 bg-stone-200/60 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-xs"
              title={isPaused ? "Resume Orbital Rotation" : "Pause Orbital Rotation"}
            >
              {isPaused ? <Play className="w-3 h-3 text-cyan-500 fill-cyan-500" /> : <Pause className="w-3 h-3 text-amber-500 fill-amber-500" />}
              <span className="font-bold">{isPaused ? "RESUME ORBIT" : "PAUSE ORBIT"}</span>
            </button>
          </div>
        </div>

        {/* Orbiting Technology Visual Map Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-2xl h-[440px] sm:h-[520px] mx-auto flex items-center justify-center mb-10 select-none group"
        >
          {/* Static SVG Concentric Ring Guides */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="100" className="fill-none stroke-stone-300/80 dark:stroke-zinc-800/80 stroke-[1px]" strokeDasharray="4 4" />
            <circle cx="250" cy="250" r="165" className="fill-none stroke-stone-300/80 dark:stroke-zinc-800/80 stroke-[1px]" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="230" className="fill-none stroke-stone-300/60 dark:stroke-zinc-800/60 stroke-[1px]" strokeDasharray="8 8" />
          </svg>

          {/* Central Hub Cutout (B&W Avatar) */}
          <div className="absolute z-20 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 border-2 border-stone-300 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center group/center relative ring-4 ring-cyan-500/20 transition-transform duration-300 hover:scale-105">
            <img
              src="/profile-bw.jpg"
              alt="Srinjoy Pramanick"
              className="w-full h-full rounded-full object-cover object-[center_20%] transition-transform duration-500 group-hover/center:scale-110 filter brightness-95"
            />
            <div className="absolute bottom-1 bg-zinc-950/85 text-cyan-400 text-[10px] font-mono font-black px-3 py-0.5 rounded-full border border-cyan-500/40 backdrop-blur-xs tracking-wider uppercase truncate max-w-[110px] shadow-md z-30">
              {activeSkill ? activeSkill.name : "BUILDING"}
            </div>
          </div>

          {/* Render Revolving Rings */}
          {ringConfigs.map((cfg) => {
            const skillsInRing = skillOrbitNodes.filter((s) => s.ring === cfg.ring);
            const targetRotation = cfg.direction * 360;

            return (
              <motion.div
                key={`ring-${cfg.ring}`}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: isPaused ? 0 : targetRotation }}
                transition={{
                  repeat: Infinity,
                  duration: cfg.duration,
                  ease: "linear"
                }}
              >
                {skillsInRing.map((skill) => {
                  const angleRad = (skill.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * cfg.radius;
                  const y = Math.sin(angleRad) * cfg.radius;
                  const isSelected = activeSkill?.name === skill.name;
                  const Icon = getCategoryIcon(skill.category);

                  return (
                    <div
                      key={skill.name}
                      className="absolute pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                    >
                      {/* Counter-rotating Wrapper to keep text upright */}
                      <motion.div
                        animate={{ rotate: isPaused ? 0 : -targetRotation }}
                        transition={{
                          repeat: Infinity,
                          duration: cfg.duration,
                          ease: "linear"
                        }}
                      >
                        <motion.button
                          onClick={() => setActiveSkill(skill)}
                          onMouseEnter={() => setActiveSkill(skill)}
                          data-cursor="nav"
                          className={`px-3 py-1.5 rounded-full font-mono text-xs font-semibold flex items-center space-x-1.5 border transition-all duration-200 shadow-sm ${
                            isSelected
                              ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/30 scale-110 ring-2 ring-cyan-400/40'
                              : 'bg-stone-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-stone-300 dark:border-zinc-800 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-md'
                          }`}
                          whileHover={{ scale: 1.15 }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{skill.name}</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            );
          })}

        </div>

        {/* Active Skill Description Card */}
        <div className="max-w-xl mx-auto min-h-[90px]">
          {activeSkill && (
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm text-center font-mono"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-300/40">
                  {activeSkill.category}
                </span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {activeSkill.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                "{activeSkill.description}"
              </p>
            </motion.div>
          )}
        </div>

        {/* Structured Category List Below */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl bg-stone-50/80 dark:bg-zinc-900/60 border border-stone-200/70 dark:border-zinc-800/70"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded bg-stone-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

