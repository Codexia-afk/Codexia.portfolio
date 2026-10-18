import { projectMessageId } from '../../data/humanLayerMessages';
import { HumanTooltip } from '../common/HumanTooltip';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';
import { projectsData } from '../../data/projects';

interface ProjectQuickViewProps {
  slug: string;
  onBack: () => void;
  onClose: () => void;
}

export const ProjectQuickView: React.FC<ProjectQuickViewProps> = ({
  slug,
  onBack,
  onClose
}) => {
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug || p.id === slug) || projectsData[0];
  const { caseStudy } = project;

  const handleOpenFullPage = () => {
    onClose();
    navigate(`/projects/${project.slug}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back to Portal Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8c877b] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-widest">
          PROJECT // {project.number}
        </span>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#e8edd9] text-[#486616] dark:bg-[#201f1c] dark:text-[#d5ef9c] border border-[#486616]/30 dark:border-[#d5ef9c]/30">
            {project.category}
          </span>
          <span className="text-[#bfb8a6] dark:text-[#383731]">·</span>
          <span className="text-[#8c877b] dark:text-[#6e6b63]">RELEASE // {project.year}</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] leading-tight">
          {project.title}
        </h2>

        <p className="font-sans text-base text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-w-2xl text-pretty">
          {project.tagline}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Target Metrics Grid (if available) */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="p-4 rounded-xl bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27]">
              <span className="font-mono text-[10px] uppercase text-[#8c877b] dark:text-[#6e6b63] block mb-1">
                {m.label}
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-[#486616] dark:text-[#d5ef9c]">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Executive Thesis Callout */}
      <div className="p-5 rounded-xl bg-[#e8edd9]/40 dark:bg-[#201f1c] border border-[#486616]/30 dark:border-[#d5ef9c]/30 space-y-1.5">
        <div className="font-mono text-[11px] font-bold text-[#486616] dark:text-[#d5ef9c] uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>EXECUTIVE THESIS</span>
        </div>
        <p className="font-serif text-lg text-[#1a1917] dark:text-[#f0ede5] italic leading-relaxed">
          "{caseStudy.thesis}"
        </p>
      </div>

      {/* Architecture Highlights */}
      <div className="space-y-3">
        <h3 className="font-display text-sm font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
          <span>Architecture Breakdown</span>
        </h3>

        <div className="space-y-2">
          {caseStudy.architecture.slice(0, 3).map((arch, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#eeeae0]/60 dark:bg-[#1a1917]/60 border border-[#dcd6c8] dark:border-[#2d2c27] flex items-start gap-3">
              <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                {arch}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] hover:text-[#486616] dark:hover:border-[#d5ef9c] dark:hover:text-[#d5ef9c] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] hover:text-[#486616] dark:hover:border-[#d5ef9c] dark:hover:text-[#d5ef9c] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}
        </div>

        <HumanTooltip registryId={projectMessageId(slug)}><button
          onClick={handleOpenFullPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors cursor-pointer shadow-xs"
        >
          <span>OPEN FULL CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button></HumanTooltip>
      </div>
    </div>
  );
};
