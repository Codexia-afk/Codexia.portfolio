import { HumanTooltip } from './common/HumanTooltip';
import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';

export const GitHubBuildLog: React.FC = () => {
  return (
    <section 
      id="github" 
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 sm:p-10 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] gap-6 shadow-xs">
        
        {/* Left Info */}
        <div className="flex items-center space-x-5">
          <div className="w-14 h-14 rounded-xl bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] flex items-center justify-center shrink-0 shadow-xs">
            <Github className="w-7 h-7" />
          </div>
          <div>
            <div className="mb-1">
              <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
                OPEN-SOURCE REPOSITORIES &amp; TELEMETRY
              </MonoLabel>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
              GitHub: @{personalData.username}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] mt-1 leading-relaxed">
              Open-source autonomous agents, runtime guardrails, WebAssembly sandboxes, and systems tooling.
            </p>
          </div>
        </div>

        {/* Commit Matrix Representation */}
        <div className="hidden lg:flex items-center space-x-1.5 opacity-80" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded-xs transition-colors ${
                i % 5 === 0 
                  ? 'bg-[#486616] dark:bg-[#d5ef9c]' 
                  : i % 3 === 0 
                  ? 'bg-[#486616]/60 dark:bg-[#d5ef9c]/60' 
                  : 'bg-[#dcd6c8] dark:border-[#2d2c27] dark:bg-[#272622]'
              }`}
            />
          ))}
        </div>

        {/* Right CTA */}
        <HumanTooltip registryId="social-github"><a
          href={personalData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-2 px-6 py-3.5 rounded-md bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#d5ef9c] dark:hover:text-[#131312] transition-colors shadow-xs shrink-0"
        >
          <span>VIEW GITHUB REPOS</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a></HumanTooltip>

      </div>
    </section>
  );
};

export default GitHubBuildLog;
