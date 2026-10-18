import { projectMessageId } from '../../data/humanLayerMessages';
import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Box, 
  ArrowUpRight
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { MonoLabel } from '../typography/Typography';
import { HumanTooltip } from '../common/HumanTooltip';

export const ProofOfWork: React.FC = () => {
  // Focus project slugs
  const proofSlugs = ['pushguard', 'trustos', 'loksetu-ai', 'jeeratype', 'wasm-sandbox'];
  const proofProjects = proofSlugs
    .map(slug => projectsData.find(p => p.slug === slug))
    .filter(Boolean) as typeof projectsData;

  const [activeSlug, setActiveSlug] = useState<string>('pushguard');
  const activeProject = proofProjects.find(p => p.slug === activeSlug) || proofProjects[0];

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'pushguard':
        return Terminal;
      case 'trustos':
        return ShieldCheck;
      case 'loksetu-ai':
        return Layers;
      case 'jeeratype':
        return Terminal;
      case 'wasm-sandbox':
        return Box;
      default:
        return Cpu;
    }
  };

  return (
    <section 
      id="proof-of-work" 
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              03 // EMPIRICAL EVIDENCE
            </MonoLabel>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1 cursor-default">
                PROOF OF WORK
              </h2>
            <p className="font-sans text-sm sm:text-base text-[#58554d] dark:text-[#a8a69f] max-w-2xl mt-2 leading-relaxed">
              Real code, architecture decisions, trade-offs, and measurable engineering outcomes. No hypothetical claims—every system here is backed by publicly verifiable source code.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
            SHOWING 5 FLAGSHIP CASE STUDIES
          </div>
        </div>

        {/* Project Selector Rail */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {proofProjects.map((p) => {
            const Icon = getIcon(p.slug);
            const isSelected = activeSlug === p.slug;

            return (
              <HumanTooltip registryId={projectMessageId(p.slug)} key={p.slug}><button
                onClick={() => setActiveSlug(p.slug)}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0 border ${
                  isSelected
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] border-[#1a1917] dark:border-[#d5ef9c] shadow-xs'
                    : 'bg-[#eeeae0] dark:bg-[#201f1c] text-[#58554d] dark:text-[#a8a69f] border-[#dcd6c8] dark:border-[#383731] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.title}</span>
                {p.slug === 'pushguard' && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-xs bg-[#ef4444] text-white font-bold">
                    FLAGSHIP
                  </span>
                )}
              </button></HumanTooltip>
            );
          })}
        </div>

        {/* Selected Case Study Dossier Card */}
        {activeProject && (
          <div className="rounded-2xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27] p-6 sm:p-8 space-y-8 shadow-xs">
            
            {/* Dossier Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-wider">
                    CASE STUDY // {activeProject.number}
                  </span>
                  <span className="font-mono text-xs text-[#8c877b]">·</span>
                  <span className="font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                    {activeProject.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1917] dark:text-[#f0ede5]">
                  {activeProject.title}
                </h3>
                <p className="font-sans text-base text-[#58554d] dark:text-[#a8a69f] max-w-3xl leading-relaxed">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] font-bold uppercase hover:bg-[#486616] dark:hover:bg-[#d5ef9c] dark:hover:text-[#131312] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>VIEW REPO</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>DEMO</span>
                  </a>
                )}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] mr-1">STACK:</span>
              {activeProject.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-[#f8f6f0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Case Study Deep Dive Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Problem & Thesis (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c] mb-2 flex items-center gap-1.5">
                    <span>THE ENGINEERING PROBLEM</span>
                  </h4>
                  <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                    {activeProject.caseStudy.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5] mb-2">
                    ARCHITECTURAL THESIS
                  </h4>
                  <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                    {activeProject.caseStudy.thesis}
                  </p>
                </div>

                {/* Challenges & What I Learned */}
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5] mb-2">
                    KEY COMPLEXITY OVERCOME
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-[#58554d] dark:text-[#a8a69f]">
                    {activeProject.caseStudy.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#ef4444] mt-0.5">·</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Architecture & Implementation (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-5 rounded-xl bg-[#0c0c0b] text-[#f0ede5] border border-[#2d2c27] space-y-3 font-mono text-xs">
                  <div className="pb-2 border-b border-[#2d2c27] flex items-center justify-between">
                    <span className="text-[#d5ef9c] font-bold text-[11px] uppercase tracking-wider cursor-default">
                        SYSTEM ARCHITECTURE BLUEPRINT
                      </span>
                  </div>
                  <ul className="space-y-2 text-[#a8a69f]">
                    {activeProject.caseStudy.architecture.map((arch, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#d5ef9c] font-bold">[{i + 1}]</span>
                        <span className="leading-relaxed">{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Performance Metrics */}
                {activeProject.caseStudy.metrics && (
                  <div className="grid grid-cols-3 gap-3">
                    {activeProject.caseStudy.metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731]">
                        <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63] uppercase truncate">
                          {m.label}
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#486616] dark:text-[#d5ef9c] mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
