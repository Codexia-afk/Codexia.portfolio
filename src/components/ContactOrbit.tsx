import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, FileText } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';

export const ContactOrbit: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="relative min-h-[75vh] w-full flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Section Tag */}
        <div className="mb-4">
          <MonoLabel dot dotColor="bg-sky-600 dark:bg-cyan-400">
            06 // DIRECT INITIATIVE & COLLABORATION
          </MonoLabel>
        </div>

        {/* Master Headline */}
        <h2 className="section-title text-zinc-900 dark:text-zinc-50 leading-[0.98] mb-6">
          HAVE A SYSTEM TO ARCHITECT?{' '}<br className="hidden sm:inline" />
          <span className="editorial-italic font-normal lowercase tracking-normal text-sky-600 dark:text-cyan-400">
            *let's build it right.*
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal text-pretty">
          Open to AI engineering roles, backend systems architecture, competitive hackathons, and innovative open-source collaborations.
        </p>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href={personalData.socials.mailto}
            className="group inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-all shadow-sm hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL DIRECTLY</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all shadow-2xs"
          >
            <FileText className="w-4 h-4" />
            <span>CURRICULUM VITAE</span>
          </a>

          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all shadow-2xs"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>

          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all shadow-2xs"
          >
            <Linkedin className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Telemetry info */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-500">
          <span>RESPONSE LATENCY</span>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">&lt; 24 HOURS</span>
        </div>

      </div>
    </section>
  );
};

export default ContactOrbit;
