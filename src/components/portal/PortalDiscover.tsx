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
      <section className="relative overflow-hidden rounded-2xl p-5 sm:p-7 bg-[#eeeae0]/90 dark:bg-[#1a1917]/90 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-xs group">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/30 dark:border-[#d5ef9c]/30">
                <Sparkles className="w-3 h-3 text-[#486616] dark:text-[#d5ef9c]" />
                FEATURED ARCHITECTURE
              </span>
              <span className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
                RELEASE // 2026
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
              {featuredProject.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-w-lg text-pretty">
              {featuredProject.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[11px] text-[#58554d] dark:text-[#a8a69f]">
              {featuredProject.tech.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] text-[#1a1917] dark:text-[#f0ede5]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => onOpenProjectPreview(featuredProject.slug)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer shadow-xs"
            >
              <span>INSPECT CASE STUDY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
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
          className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616]/50 dark:hover:border-[#d5ef9c]/50 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
                ON MY DESK // ACTIVE SPRINT
              </span>
              <ChevronRight className="w-4 h-4 text-[#8c877b] dark:text-[#6e6b63] group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="font-display text-lg font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors">
              {personalData.currentlyBuilding.title}
            </div>

            <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1 line-clamp-2 leading-relaxed">
              {personalData.currentlyBuilding.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#6e6b63]">
            <span>STATUS: {personalData.currentlyBuilding.status}</span>
            <span className="text-[#486616] dark:text-[#d5ef9c] font-semibold group-hover:underline">Open Desk Log →</span>
          </div>
        </div>

        {/* Leave Your Mark - The Margins */}
        <div 
          onClick={() => onSelectView('margins-notes')}
          className="p-5 rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616]/50 dark:hover:border-[#d5ef9c]/50 transition-all cursor-pointer group shadow-2xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c]">
                <MessageSquare className="w-3.5 h-3.5" />
                THE MARGINS // THOUGHTS WALL
              </span>
              <ChevronRight className="w-4 h-4 text-[#8c877b] dark:text-[#6e6b63] group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="font-display text-lg font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors">
              Share Thoughts & Review
            </div>

            <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1 leading-relaxed">
              Drop valuable feedback, suggestions, or critique. Authenticate with GitHub or Google for 100% genuine reviews.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#6e6b63]">
            <span>AUTHENTIC FEEDBACK PANEL</span>
            <span className="text-[#486616] dark:text-[#d5ef9c] font-semibold group-hover:underline">Write a Review →</span>
          </div>
        </div>

      </div>

      {/* 3. Quick Routes Grid */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8c877b] dark:text-[#a8a69f] font-semibold">
            PORTFOLIO ATLAS // QUICK DESTINATIONS
          </span>
          <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63]">
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
                className="p-3.5 rounded-xl bg-[#eeeae0]/60 dark:bg-[#1a1917]/60 border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616]/40 dark:hover:border-[#d5ef9c]/40 hover:bg-[#f4efe5] dark:hover:bg-[#201f1c] text-left transition-all duration-150 cursor-pointer group flex items-start space-x-3 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f4efe5] dark:bg-[#201f1c] flex items-center justify-center text-[#58554d] dark:text-[#a8a69f] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] shrink-0 border border-[#dcd6c8]/60 dark:border-[#383731]/60">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-sans text-xs font-semibold text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] truncate">
                    {route.label}
                  </div>
                  <div className="font-sans text-[11px] text-[#8c877b] dark:text-[#a8a69f] truncate">
                    {route.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Telemetry Footer: Recruiter Mode & System Specs */}
      <div className="p-4 rounded-xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#58554d] dark:text-[#a8a69f]">
          <Clock className="w-3.5 h-3.5 text-[#486616] dark:text-[#d5ef9c]" />
          <span>RECENT UPDATE: TRUSTOS V2.4 POLICY ENGINE SHIPPED</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectView('recruiter-mode')}
            className="px-3 py-1 rounded-md bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-bold hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer text-[11px]"
          >
            RECRUITER MODE (30s)
          </button>
          <button
            onClick={() => onSelectView('colophon')}
            className="px-2.5 py-1 rounded-md bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer text-[11px]"
          >
            SPECS
          </button>
        </div>
      </div>

    </div>
  );
};
