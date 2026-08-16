import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, FileText } from 'lucide-react';
import { personalData } from '../data/personal';

export const ContactOrbit: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="relative min-h-[90vh] w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden select-none"
    >
      {/* Expanding Orbit Rings Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 dark:opacity-30">
        <svg className="w-[750px] h-[750px] max-w-[95vw] max-h-[95vw]" viewBox="0 0 800 800" aria-hidden="true">
          <circle cx="400" cy="400" r="160" className="fill-none stroke-stone-300 dark:stroke-zinc-800 stroke-[1px] animate-pulse-ring" />
          <circle cx="400" cy="400" r="260" className="fill-none stroke-stone-300 dark:stroke-zinc-800 stroke-[1px]" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="360" className="fill-none stroke-stone-300 dark:stroke-zinc-800 stroke-[1px] animate-pulse-ring" style={{ animationDelay: '2s' }} />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Section Tag */}
        <div className="mb-4 inline-block font-mono text-xs tracking-widest-xl text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
          06 · CONTACT & COLLABORATION
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-6 font-sans">
          HAVE AN IDEA?<br />
          <span className="text-cyan-600 dark:text-cyan-400 font-mono">LET'S BUILD IT.</span>
        </h2>

        {/* Supporting Quote */}
        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12 font-normal">
          "Open to interesting projects, collaborations, hackathons and ambitious technical experiments."
        </p>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          <a
            href={personalData.socials.mailto}
            data-cursor="nav"
            className="group inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL ME</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest border border-cyan-500/40 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>VIEW RESUME</span>
          </a>

          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-stone-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-widest border border-stone-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>

          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="nav"
            className="inline-flex items-center space-x-2 px-6 py-4 rounded-full bg-stone-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-widest border border-stone-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
          >
            <Linkedin className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>

        </div>

      </div>
    </section>
  );
};
