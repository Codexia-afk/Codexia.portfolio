import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';
import { SectionHeading } from './typography/Typography';

export const ProjectsEditorial: React.FC = () => {
  const getProjectColorBadge = (slug: string) => {
    switch (slug) {
      case 'trustos':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-zinc-800/60 dark:text-cyan-400 dark:border-transparent';
      case 'pulseforge-ai':
        return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-zinc-800/60 dark:text-teal-400 dark:border-transparent';
      case 'loksetu-ai':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-zinc-800/60 dark:text-emerald-400 dark:border-transparent';
      case 'jeeratype':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-zinc-800/60 dark:text-cyan-400 dark:border-transparent';
      case 'wasm-sandbox':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-zinc-800/60 dark:text-amber-400 dark:border-transparent';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-transparent';
    }
  };

  const totalProjects = projectsData.length;
  const formatTotal = totalProjects < 10 ? `0${totalProjects}` : `${totalProjects}`;

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="04"
          label="SELECTED ENGINEERING BUILDS"
          title="CASE STUDIES"
          italicWord="*& production systems.*"
          subtitle="In-depth architecture, deterministic guardrails, and production implementations."
        />

        {/* Editorial Rows Stack */}
        <div className="divide-y divide-stone-200/80 dark:divide-zinc-800/80">
          {projectsData.map((project) => {
            return (
              <div
                key={project.id}
                className="group relative py-12 sm:py-14 transition-colors duration-200 hover:bg-white dark:hover:bg-zinc-900/40 px-4 sm:px-6 rounded-2xl border border-transparent hover:border-stone-200/80 dark:hover:border-zinc-800/60 hover:shadow-2xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Index + Title + Tagline */}
                  <div className="flex items-start space-x-6 sm:space-x-8 max-w-3xl">
                    <span className="font-mono text-base sm:text-xl font-bold text-stone-400 dark:text-zinc-600 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors shrink-0 pt-1">
                      {project.number} / {formatTotal}
                    </span>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Link 
                          to={`/projects/${project.slug}`}
                          className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors leading-[1.08] flex items-center space-x-3"
                        >
                          <span>{project.title}</span>
                        </Link>
                      </div>

                      <p className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed text-pretty max-w-2xl">
                        {project.tagline}
                      </p>

                      {/* Category & Tech Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getProjectColorBadge(project.slug)}`}>
                          {project.category}
                        </span>
                        <span className="text-stone-300 dark:text-zinc-700 text-xs">·</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {project.tech.join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Case Study Link & Repo CTAs */}
                  <div className="flex items-center space-x-4 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-3 pt-4 lg:pt-0 shrink-0">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors shadow-2xs"
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center space-x-3 font-mono text-xs">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-zinc-500 hover:text-sky-600 dark:hover:text-zinc-100 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-zinc-500 hover:text-sky-600 dark:hover:text-zinc-100 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsEditorial;
