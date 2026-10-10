import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';

export const GitHubBuildLog: React.FC = () => {
  return (
    <section 
      id="github" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 border-b border-stone-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900/90 border border-stone-200/80 dark:border-zinc-800 gap-6 shadow-2xs">
        
        {/* Left Info */}
        <div className="flex items-center space-x-5">
          <div className="w-14 h-14 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center shrink-0 shadow-xs">
            <Github className="w-7 h-7" />
          </div>
          <div>
            <div className="mb-1">
              <MonoLabel dot dotColor="bg-emerald-500" className="text-sky-600 dark:text-cyan-400">
                SYSTEMS REPOSITORIES & TELEMETRY
              </MonoLabel>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              GitHub: @{personalData.username}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Open-source autonomous agents, runtime guardrails, WebAssembly sandboxes, and systems tooling.
            </p>
          </div>
        </div>

        {/* Commit Matrix Representation */}
        <div className="hidden lg:flex items-center space-x-1.5 opacity-80">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded-xs transition-colors ${
                i % 5 === 0 
                  ? 'bg-sky-500 dark:bg-cyan-400' 
                  : i % 3 === 0 
                  ? 'bg-sky-600/60 dark:bg-cyan-400/60' 
                  : 'bg-stone-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Right CTA */}
        <a
          href={personalData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors shadow-2xs shrink-0"
        >
          <span>VIEW GITHUB</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>
    </section>
  );
};

export default GitHubBuildLog;
