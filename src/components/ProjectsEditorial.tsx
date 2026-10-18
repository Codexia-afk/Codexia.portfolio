import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Terminal, Shield, Cpu, Layers, Box } from 'lucide-react';
import { projectsData, Project } from '../data/projects';
import { SectionHeading } from './typography/Typography';
import { HumanTooltip } from './common/HumanTooltip';

export const ProjectsEditorial: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI Infrastructure', 'Systems & Go', 'Browser Copilots'];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AI Infrastructure') {
      return p.category.includes('AI');
    }
    if (activeFilter === 'Systems & Go') {
      return p.category.includes('GO') || p.category.includes('RUST') || p.category.includes('WASM');
    }
    if (activeFilter === 'Browser Copilots') {
      return p.category.includes('BROWSER') || p.category.includes('COPILOT');
    }
    return true;
  });

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case 'trustos':
        return Shield;
      case 'pushguard':
        return Terminal;
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

  const getArchitectureBlueprint = (project: Project) => {
    switch (project.slug) {
      case 'trustos':
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              TRUSTOS // IN-FLIGHT INTERCEPTION PIPELINE:
            </div>
            <div className="text-[#8c877b]">
              [Agent Request] ──&gt; (FastAPI Middleware) ──&gt; [FAISS Vector Engine]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &lt; 18ms latency
            </div>
            <div className="text-[#d5ef9c]">
              [Approved Tool Call] &lt;── (SHA-256 State Hash Receipt)
            </div>
          </div>
        );
      case 'pushguard':
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              PUSHGUARD // SHANNON ENTROPY PRE-PUSH PIPELINE:
            </div>
            <div className="text-[#8c877b]">
              [git push] ──&gt; (Native Go Hook Intercept) ──&gt; [AST Diff Parser]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ 120+ secret patterns &lt; 5ms
            </div>
            <div className="text-[#d5ef9c]">
              [Push Permitted / Halt on High Entropy Token]
            </div>
          </div>
        );
      case 'loksetu-ai':
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              LOKSETU.AI // PRIVACY-FIRST MV3 ARCHITECTURE:
            </div>
            <div className="text-[#8c877b]">
              [Welfare Portal DOM] ──&gt; (Isolated Content Script) ──&gt; [Local Schema Matcher]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ 100% Zero-Telemetry Local Execution
            </div>
            <div className="text-[#d5ef9c]">
              [Client-Side OCR &amp; Assisted Validation in Sidepanel]
            </div>
          </div>
        );
      case 'jeeratype':
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              JEERATYPE // CROSS-PLATFORM GO TERMINAL ENGINE:
            </div>
            <div className="text-[#8c877b]">
              [Keystroke Event] ──&gt; (Raw ANSI Escape Loop) ──&gt; [AST Syntax Tokenizer]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &lt; 1ms precision input telemetry
            </div>
            <div className="text-[#d5ef9c]">
              [Zero-Dependency Binary for macOS / Linux / Windows]
            </div>
          </div>
        );
      case 'wasm-sandbox':
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              WASM SANDBOX // CAPABILITY PERMISSION MODEL:
            </div>
            <div className="text-[#8c877b]">
              [Untrusted Plugin] ──&gt; (Wasmtime Host Binding) ──&gt; [Syscall Interceptor]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ Enforcing --allow-net, --allow-read
            </div>
            <div className="text-[#d5ef9c]">
              [Hardware-Isolated Linear Memory Sandbox in Rust]
            </div>
          </div>
        );
      default:
        return (
          <div className="font-mono text-[11px] text-[#a8a69f] space-y-1.5 p-3.5 bg-[#0c0c0b] rounded-lg border border-[#2d2c27]">
            <div className="text-[#d5ef9c] font-bold text-[10px]">
              PULSEFORGE // MARKET SIGNAL EXTRACTION PIPELINE:
            </div>
            <div className="text-[#8c877b]">
              [Unstructured Signal Feed] ──&gt; (FastAPI Async Scraper) ──&gt; [Gemini 1.5 Flash]
            </div>
            <div className="text-[#8c877b]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ Structured JSON Output Extraction
            </div>
            <div className="text-[#d5ef9c]">
              [Dynamic Market Risk vs Opportunity Strategic Matrix]
            </div>
          </div>
        );
    }
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="EDITORIAL CHAPTER ARCHIVE"
          title="SELECTED BUILDS"
          italicWord="*& production systems.*"
          subtitle="Autonomous AI middleware, Go security tooling, WebAssembly sandboxes, and browser copilots."
        />

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#8c877b] dark:text-[#6e6b63] mr-2">DISCIPLINE:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-bold'
                    : 'text-[#58554d] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5] border border-transparent hover:border-[#dcd6c8] dark:hover:border-[#383731]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-[#8c877b] dark:text-[#a8a69f] font-mono text-[11px]">
            SHOWING {filteredProjects.length} OF {projectsData.length} CHAPTERS
          </div>
        </div>

        {/* Editorial Project Chapters Stack */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project) => {
            const Icon = getProjectIcon(project.slug);
            const { caseStudy } = project;

            return (
              <article
                key={project.id}
                className="group relative rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] p-6 sm:p-8 lg:p-10 shadow-xs hover:border-[#bfb8a6] dark:hover:border-[#383731] transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: Chapter Meta, Title, Problem, & Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                    
                    {/* Chapter Header Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
                      <div className="flex items-center gap-2 text-[#486616] dark:text-[#d5ef9c] font-bold">
                        <Icon className="w-3.5 h-3.5" />
                        <span>CHAPTER {project.number} // {project.category}</span>
                      </div>
                      <span className="text-[#8c877b] dark:text-[#a8a69f]">
                        RELEASE YEAR // {project.year}
                      </span>
                    </div>

                    {/* Project Title */}
                    <div>
                      <Link 
                        to={`/projects/${project.slug}`}
                        className="group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors"
                      >
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] leading-tight mb-2">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="font-editorial text-lg sm:text-xl text-[#58554d] dark:text-[#a8a69f] italic">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Problem Statement & Core Thesis */}
                    <div className="space-y-2 font-sans">
                      <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider font-semibold">
                        PROBLEM &amp; ARCHITECTURAL THESIS
                      </div>
                      <p className="text-sm sm:text-base text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                        {caseStudy.thesis}
                      </p>
                    </div>

                    {/* Secondary Technology Stack Metadata */}
                    <div className="pt-2">
                      <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider mb-2 font-semibold">
                        CORE STACK &amp; RUNTIME PRIMITIVES
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1a1917] dark:bg-[#f0ede5] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#486616] dark:hover:bg-[#d5ef9c] dark:hover:text-[#131312] transition-colors shadow-xs"
                      >
                        <span>READ FULL CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.githubUrl && (
                        <HumanTooltip registryId="github" placement="top">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>SOURCE</span>
                          </a>
                        </HumanTooltip>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>RUNTIME DEMO</span>
                        </a>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Architectural Blueprint & Verification Metrics (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col space-y-4">
                    
                    {/* Architectural Blueprint Box */}
                    <div className="rounded-xl border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f8f6f0] dark:bg-[#131312] p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#1a1917] dark:text-[#f0ede5] uppercase tracking-wider">
                          SYSTEM TOPOLOGY
                        </span>
                        <span className="text-[#486616] dark:text-[#d5ef9c] font-semibold text-[10px]">
                          VERIFIED ARCHITECTURE
                        </span>
                      </div>
                      
                      {getArchitectureBlueprint(project)}

                      <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed pt-1">
                        {caseStudy.howItWorks[0]}
                      </p>
                    </div>

                    {/* Metrics Strip */}
                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 font-mono text-center">
                        {caseStudy.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#2d2c27]"
                          >
                            <div className="text-sm sm:text-base font-bold text-[#486616] dark:text-[#d5ef9c]">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-tighter mt-0.5 line-clamp-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsEditorial;
