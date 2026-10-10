import React from 'react';
import { Link } from 'react-router-dom';
import { personalData } from '../data/personal';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-stone-100 dark:bg-zinc-950 border-t border-stone-200/80 dark:border-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Copyright & Role */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-sans text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">© 2026 {personalData.name}</span>
          <span>·</span>
          <span>{personalData.role}</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            SYSTEM // CRAFTED WITH SATOSHI & CLASH DISPLAY
          </span>
        </div>

        {/* Center Legal / Policies */}
        <div className="flex items-center space-x-4 font-sans text-xs text-zinc-500 dark:text-zinc-400">
          <Link to="/privacy" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <Link to="/terms" className="editorial-hover-underline hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            Terms of Use
          </Link>
        </div>

        {/* Right Social Links */}
        <div className="flex items-center space-x-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <a
            href={personalData.socials.mailto}
            className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="Send Email"
          >
            Email
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
