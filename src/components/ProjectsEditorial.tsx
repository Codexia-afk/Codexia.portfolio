import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/projects';

export const ProjectsEditorial: React.FC = () => {
  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-zinc-950 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-stone-200 dark:border-zinc-800 pb-6">
          <div>
            <div className="font-mono text-xs tracking-widest-xl text-cyan-600 dark:text-cyan-400 uppercase font-semibold mb-2">
              04 · FEATURED ENGINEERING BUILDS
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
              SELECTED BUILDS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-3 sm:mt-0">
            Large Editorial Rows · Detailed Case Studies
          </p>
        </div>

        {/* Editorial Rows Stack */}
        <div className="divide-y divide-stone-200 dark:divide-zinc-800">
          {projectsData.map((project) => {
            return (
              <div
                key={project.id}
                data-cursor="project"
                className="group relative py-10 sm:py-14 transition-colors duration-300 hover:bg-stone-100/50 dark:hover:bg-zinc-900/40 px-4 sm:px-6 rounded-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Number + Title + Tagline */}
                  <div className="flex items-start space-x-6 sm:space-x-10 max-w-3xl">
                    <span className="font-mono text-xl sm:text-3xl font-bold text-stone-400 dark:text-zinc-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {project.number}
                    </span>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Link 
                          to={`/projects/${project.slug}`}
                          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:translate-x-2 transition-transform duration-300 font-sans flex items-center space-x-3"
                        >
                          <span>{project.title}</span>
                        </Link>
                      </div>

                      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed text-balance">
                        {project.tagline}
                      </p>

                      {/* Category & Tech Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded bg-stone-200/60 dark:bg-zinc-800/60">
                          {project.category}
                        </span>
                        <span className="text-stone-300 dark:text-zinc-700 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {project.tech.join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Case Study Link & Repo CTAs */}
                  <div className="flex items-center space-x-4 lg:flex-col lg:items-end lg:space-x-0 lg:space-y-3 pt-4 lg:pt-0">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group/btn inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-xs uppercase font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-all shadow-sm"
                    >
                      <span>ENGINEERING CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>

                    <div className="flex items-center space-x-3 font-mono text-xs">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
                          className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
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
