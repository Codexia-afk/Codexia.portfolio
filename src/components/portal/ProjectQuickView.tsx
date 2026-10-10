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
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-zinc-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EXPLORER</span>
        </button>

        <span className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400 uppercase tracking-widest">
          PROJECT // {project.number}
        </span>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-bold bg-sky-50 dark:bg-cyan-950/80 text-sky-700 dark:text-cyan-400 border border-sky-200 dark:border-cyan-800">
            {project.category}
          </span>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="text-zinc-500">RELEASE // {project.year}</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          {project.title}
        </h2>

        <p className="font-sans text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl text-pretty">
          {project.tagline}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700/60"
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
            <div key={m.label} className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800">
              <span className="font-mono text-[10px] uppercase text-zinc-400 block mb-1">
                {m.label}
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-sky-600 dark:text-cyan-400">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Executive Thesis Callout */}
      <div className="p-5 rounded-xl bg-sky-50/50 dark:bg-cyan-950/20 border border-sky-200/60 dark:border-cyan-900/40 space-y-1.5">
        <div className="font-mono text-[11px] font-bold text-sky-700 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>EXECUTIVE THESIS</span>
        </div>
        <p className="font-editorial text-lg text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
          "{caseStudy.thesis}"
        </p>
      </div>

      {/* Architecture Highlights */}
      <div className="space-y-3">
        <h3 className="font-display text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
          <span>Architecture Breakdown</span>
        </h3>

        <div className="space-y-2">
          {caseStudy.architecture.slice(0, 3).map((arch, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-stone-50 dark:bg-zinc-900/40 border border-stone-200/70 dark:border-zinc-800/70 flex items-start gap-3">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {arch}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-stone-300 dark:border-zinc-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-stone-300 dark:border-zinc-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}
        </div>

        <button
          onClick={handleOpenFullPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer shadow-xs"
        >
          <span>OPEN FULL CASE STUDY</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
