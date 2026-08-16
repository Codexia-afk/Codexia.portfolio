import React from 'react';
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { personalData } from '../data/personal';

interface TopBarProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-stone-50/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-stone-200/50 dark:border-zinc-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Minimal Social Icons */}
        <div className="flex items-center space-x-4">
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-1"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalData.socials.mailto}
            data-cursor="nav"
            className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-1"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Theme Toggle & Get In Touch Button */}
        <div className="flex items-center space-x-4">
          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              data-cursor="nav"
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-stone-200/70 dark:bg-zinc-900 border border-stone-300/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-cyan-500 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-cyan-600" />
              )}
            </button>
          )}

          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-stone-300 dark:border-zinc-800 bg-stone-200/50 dark:bg-zinc-900 text-cyan-600 dark:text-cyan-400 font-bold hover:border-cyan-500 transition-all shadow-xs"
          >
            <span>RESUME</span>
          </a>

          <a
            href={personalData.socials.mailto}
            data-cursor="nav"
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span>GET IN TOUCH</span>
            <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
          </a>
        </div>

      </div>
    </header>
  );
};
