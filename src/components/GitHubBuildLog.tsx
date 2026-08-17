import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/personal';

export const GitHubBuildLog: React.FC = () => {
  return (
    <section 
      id="github" 
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 border-b border-stone-200 dark:border-zinc-800"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 rounded-2xl bg-stone-100/80 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800 gap-6">
        
        {/* Left Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-mono">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                BUILD LOG
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              GitHub — @{personalData.username}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Open source repositories, AI agent sidecars & active development commits.
            </p>
          </div>
        </div>

        {/* Minimal Activity Bar (Simulated Commit Pulse Matrix) */}
        <div className="hidden sm:flex items-center space-x-1.5 opacity-80">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded-sm transition-colors ${
                i % 5 === 0 
                  ? 'bg-cyan-500' 
                  : i % 3 === 0 
                  ? 'bg-cyan-600/60 dark:bg-cyan-400/60' 
                  : 'bg-stone-300 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Right CTA */}
        <a
          href={personalData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="nav"
          className="group inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-all shadow-sm shrink-0"
        >
          <span>VIEW GITHUB</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>
    </section>
  );
};
