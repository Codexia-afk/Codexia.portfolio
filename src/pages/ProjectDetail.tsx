import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  TrendingUp, 
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Project Not Found
        </h1>
        <p className="text-zinc-500 mb-6 font-mono text-sm">
          The requested project "{slug}" does not exist in the editorial index.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 text-white font-mono text-xs uppercase font-bold hover:bg-cyan-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </button>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <article className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button Breadcrumbs */}
      <div className="mb-8">
        <Link
          to="/"
          data-cursor="nav"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Builds</span>
        </Link>
      </div>

      {/* Header Banner */}
      <header className="space-y-6 pb-8 border-b border-stone-200 dark:border-zinc-800">
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded border border-cyan-200 dark:border-cyan-800">
            {project.number}
          </span>
          <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-stone-300 dark:text-zinc-700">•</span>
          <span className="text-xs font-mono text-zinc-400">
            Released {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          {project.title}
        </h1>

        <p className="text-lg sm:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {project.tagline}
        </p>

        {/* Tech Stack Pills & Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-md bg-stone-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-stone-200 dark:border-zinc-800"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="nav"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono font-bold uppercase tracking-wider hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="nav"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider border border-stone-300 dark:border-zinc-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </header>

      {/* Case Study Content */}
      <div className="py-10 space-y-12">
        
        {/* Executive Thesis */}
        <section className="p-6 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200/60 dark:border-cyan-900/40 space-y-2">
          <h2 className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-bold">
            <ShieldCheck className="w-4 h-4" />
            Executive Thesis
          </h2>
          <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
            "{caseStudy.thesis}"
          </p>
        </section>

        {/* Target Metrics if available */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {caseStudy.metrics.map((m) => (
              <div key={m.label} className="p-5 rounded-xl bg-stone-100/80 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 block mb-1">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {m.value}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Problem Statement & Why I Built It */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="space-y-3 p-6 rounded-xl bg-stone-100/60 dark:bg-zinc-900/50 border border-stone-200/80 dark:border-zinc-800/80">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              The Core Problem
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              {caseStudy.problem}
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-xl bg-stone-100/60 dark:bg-zinc-900/50 border border-stone-200/80 dark:border-zinc-800/80">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-500" />
              Why I Built It
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              {caseStudy.whyIBuiltIt}
            </p>
          </section>

        </div>

        {/* Architecture Breakdown */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-sans">
            <Layers className="w-5 h-5 text-cyan-500" />
            System Architecture
          </h2>

          <div className="space-y-3">
            {caseStudy.architecture.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-100/60 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 flex items-start gap-3"
              >
                <span className="text-xs font-mono text-cyan-500 font-bold mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Diagram Snippet if present */}
        {caseStudy.diagramSnippet && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>Data & Verification Control Flow</span>
            </div>
            <pre className="p-5 rounded-xl bg-zinc-950 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
              {caseStudy.diagramSnippet}
            </pre>
          </section>
        )}

        {/* How It Works Steps */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-sans">
            <Cpu className="w-5 h-5 text-cyan-500" />
            Execution Flow
          </h2>

          <div className="space-y-3">
            {caseStudy.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans"
              >
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Challenges & What I Learned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-sans">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Technical Challenges
            </h3>
            <ul className="space-y-2.5">
              {caseStudy.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Key Learnings
            </h3>
            <ul className="space-y-2.5">
              {caseStudy.whatILearned.map((l, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Future Improvements */}
        <section className="p-6 rounded-2xl bg-zinc-900 text-zinc-100 border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-sans">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Future Roadmap & Improvements
          </h3>
          <ul className="space-y-2">
            {caseStudy.futureImprovements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-sans">
                <span className="text-cyan-400 font-mono">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-stone-200 dark:border-zinc-800 flex justify-between items-center font-mono text-xs">
        <Link
          to="/"
          data-cursor="nav"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="nav"
          className="inline-flex items-center gap-1.5 text-cyan-500 hover:underline"
        >
          <span>View Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </article>
  );
};
