import React from 'react';
import { personalData } from '../data/personal';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-100 dark:bg-zinc-950 border-t border-stone-200 dark:border-zinc-900 py-10 px-4 sm:px-6 lg:px-8 font-mono text-xs text-zinc-500 dark:text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Copyright & Role */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span>© 2026 {personalData.name}</span>
          <span>•</span>
          <span className="text-zinc-700 dark:text-zinc-400 font-semibold">{personalData.role}</span>
        </div>

        {/* Center Tagline */}
        <div className="italic text-[11px] text-zinc-400 dark:text-zinc-600">
          "Built with curiosity."
        </div>

        {/* Right Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={personalData.socials.mailto}
            data-cursor="nav"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="Send Email"
          >
            Email
          </a>
        </div>

      </div>
    </footer>
  );
};
