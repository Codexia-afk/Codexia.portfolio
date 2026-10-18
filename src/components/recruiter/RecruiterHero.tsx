import React from 'react';
import { 
  FileText, 
  Github, 
  ArrowDown, 
  Mail, 
  Printer 
} from 'lucide-react';
import { MonoLabel } from '../typography/Typography';
import { HumanTooltip } from '../common/HumanTooltip';

export const RecruiterHero: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 border-b border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] transition-colors duration-300">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 40%, transparent 90%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header Telemetry Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#dcd6c8] dark:border-[#2d2c27] mb-8 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c]">
              THE HIRING DOSSIER
            </span>
            <span className="text-[#bfb8a6] dark:text-[#494841]">/</span>
            <span className="text-[#8c877b] dark:text-[#a8a69f]">
              REF: DOSSIER-2026-SP
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#eeeae0] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#383731] font-semibold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
              <span>CANDIDATE ACTIVE // OPEN TO ROLES</span>
            </span>

            <button
              onClick={handlePrint}
              className="no-print hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#1a1917] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors cursor-pointer text-[11px]"
              title="Print clean recruiter briefing document"
            >
              <Printer className="w-3.5 h-3.5 opacity-80" />
              <span>PRINT BRIEF</span>
            </button>
          </div>
        </div>

        {/* Master Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typographic Introduction */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
                01 // ENGINEERING PROFILE
              </MonoLabel>
              <span className="text-[#bfb8a6] dark:text-[#494841] font-mono text-xs">·</span>
              <span className="font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f] tracking-wider uppercase">
                EXECUTIVE CANDIDATE BRIEF
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-[2.75rem] sm:text-[4.25rem] lg:text-[5rem] font-bold uppercase tracking-[-0.04em] text-[#1a1917] dark:text-[#f0ede5] leading-[0.92]">
                SRINJOY PRAMANICK
              </h1>
              <div className="font-editorial text-[2rem] sm:text-[2.75rem] italic lowercase text-[#486616] dark:text-[#d5ef9c] leading-[1.1]">
                *software engineering & systems.*
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-[#58554d] dark:text-[#a8a69f] max-w-2xl leading-relaxed text-pretty">
              Computer Science & Engineering undergraduate at JIS College of Engineering (2024–2028). I engineer zero-dependency developer security CLI tools in Go, deterministic AI runtime guardrails with sub-18ms latency, and privacy-first browser copilot architectures.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27]">
                <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63] uppercase">STATUS</div>
                <div className="font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] mt-0.5">CSE (2024–28)</div>
              </div>
              <div className="p-3 rounded-lg bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27]">
                <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63] uppercase">ACADEMIC CGPA</div>
                <div className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] mt-0.5">8.44 / 10.0</div>
              </div>
              <div className="p-3 rounded-lg bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27]">
                <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63] uppercase">AWARDS</div>
                <div className="font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] mt-0.5">CrazyBuild 1st RU</div>
              </div>
              <div className="p-3 rounded-lg bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 border border-[#dcd6c8] dark:border-[#2d2c27]">
                <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#6e6b63] uppercase">NATIONAL QUALIFIER</div>
                <div className="font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] mt-0.5">SIH 2025 Qualifier</div>
              </div>
            </div>

            {/* Direct Action Hub */}
            <div className="no-print flex flex-wrap items-center gap-3 pt-3">
              <HumanTooltip registryId="resume-action" placement="top" align="start">
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#486616] dark:hover:bg-[#c2e27c] transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>VIEW OFFICIAL RÉSUMÉ</span>
                </a>
              </HumanTooltip>

              <HumanTooltip registryId="github-activity" placement="top">
                <a
                  href="https://github.com/Codexia-afk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:text-[#486616] dark:hover:text-[#d5ef9c] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>INSPECT GITHUB</span>
                </a>
              </HumanTooltip>

              <HumanTooltip registryId="proof-of-work" placement="top">
                <a
                  href="#proof-of-work"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </HumanTooltip>

              <HumanTooltip registryId="recruiter-contact" placement="top">
                <a
                  href="#contact-recruiter"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#eeeae0] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] font-mono text-xs font-semibold uppercase tracking-wider border border-[#dcd6c8] dark:border-[#383731] hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>CONTACT CANDIDATE</span>
                </a>
              </HumanTooltip>
            </div>

          </div>

          {/* Right Column: Verified Candidate Identity Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#dcd6c8] dark:border-[#2d2c27] mb-3.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">
                  VERIFIED IDENTITY // CODEXIA-AFK
                </span>
                <span className="font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] font-bold">
                  KOLKATA, IN
                </span>
              </div>

              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] relative mb-4">
                <img
                  src="/srinjoy.jpg"
                  alt="Srinjoy Pramanick - AI Systems Engineer"
                  className="w-full h-full object-cover object-[center_30%]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-[#f0ede5]">
                  <span>AI & SYSTEMS ENGINEER</span>
                  <span className="text-[#d5ef9c]">ONLINE</span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#58554d] dark:text-[#a8a69f]">
                <div className="flex justify-between">
                  <span className="text-[#8c877b]">Institution:</span>
                  <span className="text-[#1a1917] dark:text-[#f0ede5] font-semibold">JIS College of Engg.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c877b]">Degree:</span>
                  <span className="text-[#1a1917] dark:text-[#f0ede5] font-semibold">B.Tech in CSE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c877b]">Graduation:</span>
                  <span className="text-[#1a1917] dark:text-[#f0ede5] font-semibold">Class of 2028</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c877b]">Availability:</span>
                  <span className="text-[#486616] dark:text-[#d5ef9c] font-bold">Collaborations & Roles</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
