import React, { useState } from 'react';
import { skillOrbitNodes, skillCategories, SkillNode } from '../data/skills';
import { Terminal, Cpu, Layers, Database, Wrench } from 'lucide-react';
import { SectionHeading, MonoLabel } from './typography/Typography';

export const SkillOrbit: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillNode>(skillOrbitNodes[0]);

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return {
          icon: Cpu,
          badgeBg: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
          btnActive: 'bg-sky-600 text-white border-sky-500 shadow-md',
          tagBg: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
        };
      case 'Frontend':
        return {
          icon: Layers,
          badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800',
          btnActive: 'bg-indigo-600 text-white border-indigo-500 shadow-md',
          tagBg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
        };
      case 'Backend':
        return {
          icon: Database,
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
          btnActive: 'bg-emerald-600 text-white border-emerald-500 shadow-md',
          tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
        };
      case 'Infrastructure':
        return {
          icon: Terminal,
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
          btnActive: 'bg-amber-600 text-white border-amber-500 shadow-md',
          tagBg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
        };
      default:
        return {
          icon: Wrench,
          badgeBg: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800',
          btnActive: 'bg-teal-600 text-white border-teal-500 shadow-md',
          tagBg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700'
        };
    }
  };

  const activeTheme = getCategoryTheme(activeSkill.category);

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-100/50 dark:bg-zinc-900/20 border-y border-stone-200/80 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="TECHNICAL PROFICIENCY & STACK"
          title="CAPABILITIES"
          italicWord="*& technical tooling.*"
          subtitle="Click any technology to inspect implementation context & real project evidence."
        />

        {/* Interactive Skills Matrix Selector */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
            {skillOrbitNodes.map((skill) => {
              const isSelected = activeSkill.name === skill.name;
              const theme = getCategoryTheme(skill.category);
              const Icon = theme.icon;

              return (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  className={`px-3 py-2 rounded-lg font-mono text-xs font-semibold flex items-center space-x-2 border transition-all cursor-pointer ${
                    isSelected
                      ? theme.btnActive
                      : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:text-cyan-400 shadow-2xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Skill Context Card */}
          <div className="bg-white/95 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-md font-bold tracking-wider border ${activeTheme.badgeBg}`}>
                {activeSkill.category}
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {activeSkill.name}
              </span>
            </div>
            <p className="font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto text-pretty">
              "{activeSkill.description}"
            </p>
          </div>
        </div>

        {/* Structured Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat) => {
            const categoryTheme = getCategoryTheme(
              cat.title === 'AI / ML & Systems' ? 'AI/ML' :
              cat.title === 'Frameworks & UI' ? 'Frontend' :
              cat.title === 'Languages' ? 'Backend' : 'Infrastructure'
            );

            return (
              <div
                key={cat.title}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900/60 border border-stone-200/90 dark:border-zinc-800/70 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    <MonoLabel className="text-[10px] text-sky-600 dark:text-cyan-400">
                      {cat.title}
                    </MonoLabel>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono border ${categoryTheme.tagBg}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillOrbit;
