import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BookOpen } from 'lucide-react';
import { MonoLabel } from './typography/Typography';

export const AboutConstellation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'milestones' | 'principles'>('narrative');

  const principles = [
    {
      id: '01',
      title: 'Deterministic Bounds over Stochastic Hope',
      desc: 'LLMs are extraordinary reasoning engines but chaotic execution proxies. Middleware must enforce immutable runtime guardrails and cryptographically verifiable intent.'
    },
    {
      id: '02',
      title: 'Sub-20ms Latency Budget',
      desc: 'Security checks and vector policy lookups that exceed 20ms degrade developer flow. Systems should compile down to single binaries in Go or run in sandboxed WebAssembly.'
    },
    {
      id: '03',
      title: 'Zero-Telemetry Local Privacy',
      desc: 'Sensitive citizen data, private encryption keys, and credentials must never leave the client. Shift inspection to client-side Manifest V3 extensions and pre-push hooks.'
    }
  ];

  const milestones = [
    {
      year: '2026',
      title: 'TrustOS & PushGuard',
      desc: 'Shipped explainable AI guardrails with sub-18ms FAISS evaluation and high-speed Go pre-push secret scanner.'
    },
    {
      year: '2025',
      title: 'CrazyBuild 1st Runner-Up',
      desc: 'Architected sub-50ms WebSocket real-time collaboration engine in 36-hour competitive hackathon sprint.'
    },
    {
      year: '2025',
      title: 'Smart India Hackathon Qualifier',
      desc: 'Selected among top national engineering teams building full-stack intelligent services for real-world impact.'
    },
    {
      year: '2024',
      title: 'B.Tech CSE Matriculation',
      desc: 'Commenced Computer Science & Engineering degree at JIS College of Engineering, Kalyani (West Bengal).'
    }
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-y border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-12 sm:mb-16 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <div className="mb-2.5">
              <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
                01 // INTENT, BACKGROUND & CRAFT
              </MonoLabel>
            </div>
            <h2 className="section-title text-[#1a1917] dark:text-[#f0ede5]">
              Turning complex abstractions into{' '}
              <span className="editorial-italic font-normal lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c]">
                *deterministic software.*
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8c877b] dark:text-[#a8a69f] mt-3 sm:mt-0 max-w-xs sm:text-right">
            BIOGRAPHY · PHILOSOPHY · TIMELINE
          </p>
        </div>

        {/* Main Editorial Dual-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Portrait & Margin Annotations (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Art-Directed Archival Portrait Frame */}
            <div className="relative rounded-xl border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#eeeae0] dark:bg-[#1a1917] p-3 shadow-xs">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#131312]">
                <img
                  src="/profile-bw.jpg"
                  alt="Srinjoy Pramanick - AI Engineer & Systems Builder"
                  className="w-full h-full object-cover object-[center_18%] filter grayscale contrast-115 brightness-95"
                  loading="lazy"
                />
                
                {/* Editorial Corner Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/20 to-transparent pointer-events-none" />

                {/* Overlaid Editorial Metadata Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#131312]/85 text-[#d5ef9c] border border-[#d5ef9c]/30 backdrop-blur-xs">
                    SRINJOY PRAMANICK
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#131312]/85 text-[#f0ede5] border border-[#2d2c27] backdrop-blur-xs">
                    <MapPin className="w-2.5 h-2.5 text-[#d5ef9c]" />
                    <span>ICHAPORE, WB</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-mono text-[10px] text-[#d5ef9c] uppercase tracking-widest">
                    AFFILIATION
                  </div>
                  <div className="font-display text-lg font-bold">
                    JIS College of Engineering
                  </div>
                  <div className="font-mono text-[11px] text-[#a8a69f]">
                    B.Tech CSE (2024–2028) · Kalyani, WB
                  </div>
                </div>
              </div>

              {/* Archival Caption Below Portrait */}
              <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f]">
                <span>ARCHIVAL ID // CODEXIA-AFK</span>
                <span>STATUS // OPEN TO ROLES</span>
              </div>
            </div>

            {/* Margin Notes Box */}
            <div className="rounded-xl border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#eeeae0] dark:bg-[#1a1917] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#486616] dark:text-[#d5ef9c] font-bold tracking-wider uppercase text-[11px]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>MARGIN ANNOTATION // ON CURIOSITY</span>
              </div>
              <p className="text-[#58554d] dark:text-[#a8a69f] leading-relaxed font-sans text-xs sm:text-sm">
                "Writing clean software is an act of engineering discipline. I gravitate toward systems that must operate under severe constraints—whether it is keeping an AI guardrail under 18ms or scanning a Git commit for secrets in under 5ms."
              </p>
              <div className="pt-2 text-[10px] text-[#8c877b] dark:text-[#6e6b63] border-t border-[#dcd6c8]/60 dark:border-[#2d2c27]/60">
                FIELD LOG ENTRY #07 · MARCH 2026
              </div>
            </div>

          </div>

          {/* Right Column: Narrative Tabs & Interactive Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 pb-3 border-b border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-xs">
              <button
                onClick={() => setActiveTab('narrative')}
                className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'narrative'
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-semibold'
                    : 'text-[#8c877b] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
                }`}
              >
                01. PERSONAL NARRATIVE
              </button>
              <button
                onClick={() => setActiveTab('principles')}
                className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'principles'
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-semibold'
                    : 'text-[#8c877b] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
                }`}
              >
                02. CORE PRINCIPLES
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                  activeTab === 'milestones'
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-semibold'
                    : 'text-[#8c877b] dark:text-[#a8a69f] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
                }`}
              >
                03. MILESTONES
              </button>
            </div>

            {/* Tab 1: Personal Narrative */}
            {activeTab === 'narrative' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 font-sans"
              >
                <div className="rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] p-6 sm:p-8 space-y-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1917] dark:text-[#f0ede5]">
                    Building at the intersection of AI inference & systems engineering.
                  </h3>
                  <p className="text-[#58554d] dark:text-[#a8a69f] text-base leading-relaxed">
                    I am a Computer Science Engineering student currently based in West Bengal, India. Rather than treating artificial intelligence as a magic wrapper around opaque cloud APIs, I focus on the architectural scaffolding that makes AI systems reliable: in-flight tool-call interception, explainable decision vectors, and non-repudiable cryptographic audit trails.
                  </p>
                  <p className="text-[#58554d] dark:text-[#a8a69f] text-base leading-relaxed">
                    My engineering work spans languages and runtimes chosen for the problem: <strong>Python & FastAPI</strong> for high-throughput AI middleware, <strong>Go</strong> for single-binary developer productivity and Git security tooling, and <strong>Rust & WebAssembly</strong> for sandboxed execution of untrusted third-party plugins.
                  </p>
                  <p className="text-[#58554d] dark:text-[#a8a69f] text-base leading-relaxed">
                    Outside individual builds, I am an active competitive hackathon participant (7+ completed, placing 1st Runner-Up at CrazyBuild 2025 and qualifying for Smart India Hackathon 2025), a core member of college technical societies, and an open-source contributor.
                  </p>
                </div>

                {/* Technical Disciplines Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-lg border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f4efe5] dark:bg-[#201f1c]">
                    <div className="font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] uppercase font-bold">
                      FOCUS // 01
                    </div>
                    <div className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5] mt-1">
                      AI Guardrails
                    </div>
                    <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1">
                      TrustOS, agent boundaries, semantic FAISS policy evaluation.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f4efe5] dark:bg-[#201f1c]">
                    <div className="font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] uppercase font-bold">
                      FOCUS // 02
                    </div>
                    <div className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5] mt-1">
                      Low-Latency Systems
                    </div>
                    <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1">
                      PushGuard, JeeraType, Go concurrency, sub-5ms CLI execution.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f4efe5] dark:bg-[#201f1c]">
                    <div className="font-mono text-[10px] text-[#486616] dark:text-[#d5ef9c] uppercase font-bold">
                      FOCUS // 03
                    </div>
                    <div className="font-display font-bold text-sm text-[#1a1917] dark:text-[#f0ede5] mt-1">
                      Browser Runtimes
                    </div>
                    <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1">
                      Manifest V3 copilot (Loksetu.ai), WebAssembly capability sandbox.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

            {/* Tab 2: Core Principles */}
            {activeTab === 'principles' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {principles.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] space-y-2"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-[#486616] dark:text-[#d5ef9c] font-bold">
                      <span>PRINCIPLE {p.id}</span>
                      <span className="text-[#bfb8a6] dark:text-[#494841]">/</span>
                      <span className="text-[#1a1917] dark:text-[#f0ede5] uppercase tracking-wider">{p.title}</span>
                    </div>
                    <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 3: Milestones Timeline */}
            {activeTab === 'milestones' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 font-mono text-xs"
              >
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="font-display text-base font-bold text-[#1a1917] dark:text-[#f0ede5]">
                        {m.title}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f]">
                        {m.desc}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold shrink-0 border border-[#dcd6c8] dark:border-[#383731]">
                      {m.year}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutConstellation;
