import React from 'react';
import { 
  Code2, 
  GraduationCap, 
  Terminal, 
  Trophy, 
  CheckCircle2 
} from 'lucide-react';
import { MonoLabel } from '../typography/Typography';

export const RecruiterQuickView: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#eeeae0] dark:bg-[#1a1917] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              02 // EXECUTIVE DOSSIER
            </MonoLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1">
              RECRUITER QUICK VIEW (30-SECOND SCAN)
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
            <span className="w-2 h-2 rounded-full bg-[#486616] dark:bg-[#d5ef9c]" />
            <span>EXECUTIVE SUMMARY FOR HIRING TEAMS</span>
          </div>
        </div>

        {/* 4-Card Executive Briefing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Education & Foundation */}
          <div className="p-5 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
              <span className="font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">EDUCATION</span>
              <GraduationCap className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
            </div>
            <div>
              <div className="font-sans font-bold text-base text-[#1a1917] dark:text-[#f0ede5]">
                B.Tech in Computer Science
              </div>
              <div className="font-mono text-xs text-[#58554d] dark:text-[#a8a69f] mt-0.5">
                JIS College of Engineering, Kalyani
              </div>
            </div>
            <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] space-y-1 pt-2 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]">
              <div>TIMELINE: 2024 – 2028 (Sophomore)</div>
              <div>CUMULATIVE CGPA: <strong className="text-[#486616] dark:text-[#d5ef9c]">8.44 / 10.0</strong></div>
              <div>AFFILIATION: MAKAUT University</div>
            </div>
          </div>

          {/* Card 2: Engineering Focus */}
          <div className="p-5 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
              <span className="font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">PRIMARY FOCUS</span>
              <Terminal className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
            </div>
            <div>
              <div className="font-sans font-bold text-base text-[#1a1917] dark:text-[#f0ede5]">
                Systems & AI Middleware
              </div>
              <div className="font-mono text-xs text-[#58554d] dark:text-[#a8a69f] mt-0.5">
                Deterministic Agent Runtimes & CLIs
              </div>
            </div>
            <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] space-y-1 pt-2 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]">
              <div>LOW-LATENCY: Go, Rust & WebAssembly</div>
              <div>AGENT GUARDRAILS: FastAPI & FAISS</div>
              <div>CLIENT ENGINES: Manifest V3 & React</div>
            </div>
          </div>

          {/* Card 3: Flagship Proof */}
          <div className="p-5 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
              <span className="font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">FLAGSHIP BUILDS</span>
              <Code2 className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
            </div>
            <div>
              <div className="font-sans font-bold text-base text-[#1a1917] dark:text-[#f0ede5]">
                PushGuard & TrustOS
              </div>
              <div className="font-mono text-xs text-[#58554d] dark:text-[#a8a69f] mt-0.5">
                Production-grade developer tooling
              </div>
            </div>
            <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] space-y-1 pt-2 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]">
              <div>PUSHGUARD: Pre-push secret scanner in Go</div>
              <div>TRUSTOS: In-flight AI action interceptor</div>
              <div>LOKSETU.AI: Privacy-first DOM copilot</div>
            </div>
          </div>

          {/* Card 4: Execution & Awards */}
          <div className="p-5 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
              <span className="font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5]">RECOGNITION</span>
              <Trophy className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
            </div>
            <div>
              <div className="font-sans font-bold text-base text-[#1a1917] dark:text-[#f0ede5]">
                CrazyBuild 1st Runner-Up
              </div>
              <div className="font-mono text-xs text-[#58554d] dark:text-[#a8a69f] mt-0.5">
                SIH 2025 Qualifier · 7+ Hackathons
              </div>
            </div>
            <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63] space-y-1 pt-2 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]">
              <div>COLLABORATIVE: Real-time dev tools</div>
              <div>SPEED: Zero-to-one prototype MVP in 36h</div>
              <div>COMMUNITY: College Coding Club Core</div>
            </div>
          </div>

        </div>

        {/* 30-Second Candidate Evaluation Summary Table */}
        <div className="p-6 rounded-xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731]">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#1a1917] dark:text-[#f0ede5] mb-4 flex items-center justify-between">
            <span>WHAT I OFFER TO AN ENGINEERING TEAM</span>
            <span className="text-[#486616] dark:text-[#d5ef9c]">IMPACT CRITERIA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1a1917] dark:text-[#f0ede5]">
                <CheckCircle2 className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c] shrink-0" />
                <span>Zero-Dependency Pragmatism</span>
              </div>
              <p className="text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                Prefers single-binary Go and compiled Rust over heavy runtime dependency trees. Built PushGuard and JeeraType with native stdlib and minimal external packages.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1a1917] dark:text-[#f0ede5]">
                <CheckCircle2 className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c] shrink-0" />
                <span>Deterministic AI Engineering</span>
              </div>
              <p className="text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                Understands that autonomous LLM systems require hard mathematical bounds, vector policy enforcement, and cryptographic receipts instead of naive prompt hope.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-[#1a1917] dark:text-[#f0ede5]">
                <CheckCircle2 className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c] shrink-0" />
                <span>Full-Stack Interface Craft</span>
              </div>
              <p className="text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                Bridges low-level systems engineering with polished, high-aesthetic interfaces using React, TypeScript, Framer Motion, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
