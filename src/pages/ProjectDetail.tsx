import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { SEO } from '../components/SEO';
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
        <SEO 
          title="Project Not Found - Srinjoy Pramanick"
          description="The requested project case study could not be found."
        />
        <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Project Not Found
        </h1>
        <p className="font-mono text-sm text-zinc-500 mb-6">
          The requested project "{slug}" does not exist in the project index.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs uppercase font-bold hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Selected Builds</span>
        </button>
      </div>
    );
  }

  const { caseStudy } = project;

  const projectTitle = `${project.title} - AI & Software Case Study by Srinjoy Pramanick`;
  const projectDesc = `${project.title}: ${project.tagline} Built by Srinjoy Pramanick using ${project.tech.join(', ')}.`;
  const projectCanonical = `https://codexia-portfolio.vercel.app/projects/${project.slug}`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.tagline,
    "url": projectCanonical,
    "codeRepository": project.githubUrl,
    "programmingLanguage": project.tech,
    "author": {
      "@type": "Person",
      "name": "Srinjoy Pramanick",
      "url": "https://codexia-portfolio.vercel.app/"
    }
  };

  return (
    <>
      <SEO
        title={projectTitle}
        description={projectDesc}
        canonical={projectCanonical}
        jsonLd={projectJsonLd}
      />
      <article className="pt-28 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button Breadcrumbs */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Builds</span>
        </Link>
      </div>

      {/* Header Banner */}
      <header className="space-y-6 pb-10 border-b border-stone-200/80 dark:border-zinc-800/80">
        
        <div className="flex flex-wrap items-center gap-3 font-mono">
          <span className="text-xs font-bold text-sky-700 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-md border border-sky-200 dark:border-cyan-800">
            {project.number}
          </span>
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-stone-300 dark:text-zinc-700">·</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            RELEASED // {project.year}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-zinc-900 dark:text-zinc-50 leading-[0.98]">
          {project.title}
        </h1>

        <p className="font-sans text-lg sm:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal text-pretty max-w-3xl">
          {project.tagline}
        </p>

        {/* Tech Stack Pills & Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 font-mono">
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-md bg-stone-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-stone-200 dark:border-zinc-800"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs uppercase font-bold tracking-wider hover:bg-sky-600 dark:hover:bg-cyan-400 transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs uppercase font-bold tracking-wider border border-stone-300 dark:border-zinc-800 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors shadow-2xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </header>

      {/* Case Study Content */}
      <div className="py-12 space-y-14">
        
        {/* Executive Thesis with Instrument Serif Italic Callout */}
        <section className="p-7 sm:p-9 rounded-2xl bg-sky-50/50 dark:bg-cyan-950/20 border border-sky-200/60 dark:border-cyan-900/40 space-y-3">
          <div className="font-mono text-xs text-sky-700 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>EXECUTIVE THESIS</span>
          </div>
          <p className="font-editorial text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 italic leading-relaxed">
            "{caseStudy.thesis}"
          </p>
        </section>

        {/* Target Metrics */}
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {caseStudy.metrics.map((m) => (
              <div key={m.label} className="p-6 rounded-xl bg-white dark:bg-zinc-900/80 border border-stone-200/80 dark:border-zinc-800 shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                  {m.label}
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-sky-600 dark:text-cyan-400">
                  {m.value}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Problem Statement & Why I Built It */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="space-y-3 p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800 shadow-2xs">
            <h2 className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>The Core Problem</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {caseStudy.problem}
            </p>
          </section>

          <section className="space-y-3 p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-stone-200/80 dark:border-zinc-800 shadow-2xs">
            <h2 className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-sky-500 dark:text-cyan-400" />
              <span>Why I Built It</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {caseStudy.whyIBuiltIt}
            </p>
          </section>

        </div>

        {/* Architecture Breakdown */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <span>System Architecture</span>
          </h2>

          <div className="space-y-3">
            {caseStudy.architecture.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900/70 border border-stone-200/80 dark:border-zinc-800 flex items-start gap-3 shadow-2xs"
              >
                <span className="text-xs font-mono text-sky-600 dark:text-cyan-400 font-bold mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <p className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Diagram Snippet */}
        {caseStudy.diagramSnippet && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <Terminal className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              <span>Data & Verification Control Flow</span>
            </div>
            <pre className="p-6 rounded-2xl bg-zinc-950 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800 shadow-sm">
              {caseStudy.diagramSnippet}
            </pre>
          </section>
        )}

        {/* How It Works Steps */}
        <section className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <span>Execution Flow</span>
          </h2>

          <div className="space-y-3">
            {caseStudy.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans shadow-2xs"
              >
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Challenges & What I Learned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="space-y-4">
            <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Technical Challenges</span>
            </h3>
            <ul className="space-y-3">
              {caseStudy.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Key Learnings</span>
            </h3>
            <ul className="space-y-3">
              {caseStudy.whatILearned.map((l, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Future Improvements */}
        <section className="p-7 sm:p-8 rounded-2xl bg-zinc-900 text-zinc-100 border border-zinc-800 space-y-4 shadow-sm">
          <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Future Roadmap & Improvements</span>
          </h3>
          <ul className="space-y-2.5 font-sans">
            {caseStudy.futureImprovements.map((imp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <span className="text-cyan-400 font-mono">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-stone-200/80 dark:border-zinc-800 flex justify-between items-center font-mono text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-sky-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Selected Builds</span>
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sky-600 dark:text-cyan-400 hover:underline"
        >
          <span>View Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </article>
    </>
  );
};

export default ProjectDetail;
