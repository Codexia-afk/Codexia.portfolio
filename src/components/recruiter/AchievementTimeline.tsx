import React from 'react';
import { Calendar } from 'lucide-react';
import { MonoLabel } from '../typography/Typography';

export const AchievementTimeline: React.FC = () => {
  const achievements = [
    {
      year: '2025',
      badge: '1ST RUNNER-UP',
      badgeColor: 'text-[#486616] dark:text-[#d5ef9c] bg-[#e8edd9] dark:bg-[#201f1c]',
      event: 'CrazyBuild Hackathon',
      role: 'Team Lead & Core Architect',
      description: 'Engineered real-time collaborative developer tooling under high pressure in a 36-hour sprint. Evaluated on system reliability, low latency, and functional UI craft.',
      takeaways: ['Fast zero-to-one MVP execution', 'Conflict-free state synchronization', 'High-impact technical presentation']
    },
    {
      year: '2025',
      badge: 'QUALIFIER',
      badgeColor: 'text-[#486616] dark:text-[#d5ef9c] bg-[#e8edd9] dark:bg-[#201f1c]',
      event: 'Smart India Hackathon (SIH) 2025',
      role: 'Technical Contributor',
      description: 'Selected as Internal Round Finalist & Qualifier representing JIS College of Engineering for nationwide civic problem-solving problem statements.',
      takeaways: ['Government and civic architecture constraints', 'Public service accessibility standards', 'Strict compliance & security models']
    },
    {
      year: '2024 – 2026',
      badge: '7+ COMPLETED',
      badgeColor: 'text-[#1a1917] dark:text-[#f0ede5] bg-[#ded8c7] dark:bg-[#2c2b26]',
      event: 'Competitive Hackathon Circuit',
      role: 'Full-Stack Systems Engineer',
      description: 'Participated across 7+ regional and online hackathons focusing on AI middleware, cybersecurity guardrails, developer tooling, and WebAssembly sandboxes.',
      takeaways: ['Iterative architecture under intense constraints', 'Rapid debugging and triage', 'Zero-dependency binary deployments']
    },
    {
      year: '2025 – PRESENT',
      badge: 'COMMUNITY',
      badgeColor: 'text-[#1a1917] dark:text-[#f0ede5] bg-[#ded8c7] dark:bg-[#2c2b26]',
      event: 'College Coding Club & Gaming Community',
      role: 'Core Member & Peer Mentor',
      description: 'Active member organizing technical problem-solving sessions, peer mentoring junior CSE students in Go and React, and coordinating collaborative initiatives.',
      takeaways: ['Peer engineering mentoring', 'Clean documentation writing', 'Collaborative community culture']
    }
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              05 // TRACK RECORD UNDER PRESSURE
            </MonoLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1">
              HACKATHONS & RECOGNITION
            </h2>
            <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl mt-1">
              Evidence of fast problem-solving, rapid prototyping, and engineering execution under strict deadlines.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
            VERIFIED PARTICIPATION LOG
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] space-y-4 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </span>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs border border-current/20 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1917] dark:text-[#f0ede5]">
                  {item.event}
                </h3>
                
                <div className="font-mono text-xs font-semibold text-[#486616] dark:text-[#d5ef9c]">
                  {item.role}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Takeaways */}
              <div className="pt-3 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27] space-y-1.5">
                <div className="font-mono text-[10px] uppercase font-bold text-[#8c877b] dark:text-[#6e6b63]">
                  DEMONSTRATED OUTCOMES:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.takeaways.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-xs bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731]"
                    >
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
