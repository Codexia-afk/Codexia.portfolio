import React from 'react';
import { Briefcase, Trophy, Award, Users, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/experience';
import { SectionHeading } from './typography/Typography';

export const ExperienceCarousel: React.FC = () => {
  const getIcon = (type: string) => {
    if (type.includes('National') || type.includes('Qualifier')) return Trophy;
    if (type.includes('Competitive') || type.includes('Runner-Up')) return Award;
    if (type.includes('Leadership') || type.includes('Club')) return Users;
    return Briefcase;
  };

  return (
    <section 
      id="experience" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="05"
          label="CHRONOLOGICAL TRACK RECORD & ROLES"
          title="EXPERIENCE"
          italicWord="*& engineering leadership.*"
          subtitle="Real-world engineering, open-source peer mentorship, and competitive national benchmarks."
        />

        {/* Editorial Timeline Grid */}
        <div className="space-y-6 sm:space-y-8">
          {experienceData.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <article
                key={item.id}
                className="p-6 sm:p-8 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] shadow-xs hover:border-[#bfb8a6] dark:hover:border-[#383731] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Index, Organization, Period & Role (5 cols) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                      <Icon className="w-3.5 h-3.5 text-[#486616] dark:text-[#d5ef9c]" />
                      <span>{item.period}</span>
                      <span className="text-[#bfb8a6] dark:text-[#494841]">/</span>
                      <span className="px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold text-[10px]">
                        {item.type}
                      </span>
                    </div>

                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c] font-semibold">
                        {item.organization}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1917] dark:text-[#f0ede5]">
                        {item.role}
                      </h3>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: Achievements & Tech Badges (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4 pt-2 lg:pt-0">
                    <div className="space-y-2">
                      <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider font-semibold">
                        KEY DELIVERABLES &amp; IMPACT
                      </div>
                      <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#1a1917] dark:text-[#f0ede5]">
                        {item.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c] shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#58554d] dark:text-[#a8a69f] border border-[#dcd6c8] dark:border-[#383731]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceCarousel;
