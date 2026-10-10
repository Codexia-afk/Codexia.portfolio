import React from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Folder, 
  User, 
  Zap, 
  MessageSquare, 
  Terminal, 
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { personalData } from '../../data/personal';
import { projectsData } from '../../data/projects';
import { PortalView } from './types';

interface PortalDiscoverProps {
  onSelectView: (view: PortalView) => void;
  onOpenProjectPreview: (slug: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onClose: () => void;
}

export const PortalDiscover: React.FC<PortalDiscoverProps> = ({
  onSelectView,
  onOpenProjectPreview,
  onNavigateSection,
  onClose
}) => {
  const featuredProject = projectsData.find((p) => p.slug === 'trustos') || projectsData[0];

  const quickRoutes = [
    { label: '01 // Architectural Intent', desc: 'Engineering philosophy & background', icon: User, action: () => { onNavigateSection('about'); onClose(); } },
    { label: '02 // Experience & Roles', desc: 'Track record & competitive benchmarks', icon: TrendingUp, action: () => { onNavigateSection('experience'); onClose(); } },
    { label: '03 // Technical Capabilities', desc: 'Interactive skill orbit & tooling', icon: Terminal, action: () => { onNavigateSection('skills'); onClose(); } },
    { label: '04 // Selected Builds', desc: 'Architecture case studies', icon: Folder, action: () => { onNavigateSection('projects'); onClose(); } },
    { label: '05 // Hackathons', desc: '7+ builds, SIH & CrazyBuild awards', icon: Zap, action: () => { onNavigateSection('hackathons'); onClose(); } },
    { label: '06 // Direct Contact', desc: 'Email & technical inquiries', icon: MessageSquare, action: () => { onNavigateSection('contact'); onClose(); } },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. Featured Destination Banner */}
      <section className="relative overflow-hidden rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-stone-100 via-stone-50 to-white dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border border-stone-200/90 dark:border-zinc-800 shadow-2xs group">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-sky-200 dark:border-cyan-800">
                <Sparkles className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                FEATURED ARCHITECTURE
              </span>
              <span className="font-mono text-xs text-zinc-400">
                RELEASE // 2026
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {featuredProject.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg text-pretty">
              {featuredProject.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              {featuredProject.tech.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/60">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => onOpenProjectPreview(featuredProject.slug)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
            >
              <span>INSPECT CASE STUDY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] text-zinc-400">
              Sub-18ms Evaluation
            </span>
          </div>
        </div>
      </section>

      {/* 2. Grid: Currently Building & Leave Your Mark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Currently Building */}
        <div 
          onClick={() => onSelectView('on-my-desk')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-stone-200/90 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-cyan-500/60 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ON MY DESK // ACTIVE SPRINT
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
              {personalData.currentlyBuilding.title}
            </div>

            <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {personalData.currentlyBuilding.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span>STATUS: {personalData.currentlyBuilding.status}</span>
            <span className="text-sky-600 dark:text-cyan-400 font-semibold group-hover:underline">Open Desk Log →</span>
          </div>
        </div>

        {/* Leave Your Mark - The Margins */}
        <div 
          onClick={() => onSelectView('margins-notes')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-stone-200/90 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-cyan-500/60 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400">
                <MessageSquare className="w-3.5 h-3.5" />
                THE MARGINS // THOUGHTS WALL
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
              Share Thoughts & Review
            </div>

            <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Drop valuable feedback, suggestions, or critique. Authenticate with GitHub or Google for 100% genuine reviews.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span>AUTHENTIC FEEDBACK PANEL</span>
            <span className="text-sky-600 dark:text-cyan-400 font-semibold group-hover:underline">Write a Review →</span>
          </div>
        </div>

      </div>

      {/* 3. Quick Routes Grid */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            PORTFOLIO ATLAS // QUICK DESTINATIONS
          </span>
          <span className="font-mono text-[10px] text-zinc-400">
            CLICK TO JUMP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {quickRoutes.map((route, i) => {
            const Icon = route.icon;
            return (
              <button
                key={i}
                onClick={route.action}
                className="p-3.5 rounded-xl bg-white/80 dark:bg-zinc-900/50 border border-stone-200/80 dark:border-zinc-800/80 hover:border-sky-300 dark:hover:border-zinc-700 hover:bg-stone-50/80 dark:hover:bg-zinc-800/50 text-left transition-all duration-150 cursor-pointer group flex items-start space-x-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-sky-600 dark:group-hover:text-cyan-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-sans text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-cyan-400 truncate">
                    {route.label}
                  </div>
                  <div className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {route.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Telemetry Footer: Recruiter Mode & System Specs */}
      <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-zinc-900/40 border border-stone-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
          <span>RECENT UPDATE: TRUSTOS V2.4 POLICY ENGINE SHIPPED</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectView('recruiter-mode')}
            className="px-3 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer text-[11px]"
          >
            RECRUITER MODE (30s)
          </button>
          <button
            onClick={() => onSelectView('colophon')}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-stone-300 dark:border-zinc-700 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-[11px]"
          >
            SPECS
          </button>
        </div>
      </div>

    </div>
  );
};
