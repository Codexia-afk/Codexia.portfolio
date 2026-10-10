import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Server, Shield, Code, Zap, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { personalData } from '../data/personal';
import { MonoLabel } from './typography/Typography';

export const AboutConstellation: React.FC = () => {
  const [activeFocus, setActiveFocus] = useState<string>('ai');

  const focusPillars = [
    { 
      id: 'ai', 
      label: 'AI & Guardrails', 
      icon: Cpu, 
      tag: 'AI INFRASTRUCTURE',
      detail: 'Explainable AI middleware, agent execution boundaries, LLM function interception, and deterministic policy vector engines.' 
    },
    { 
      id: 'systems', 
      label: 'Low-Latency Systems', 
      icon: Server, 
      tag: 'BACKEND ARCHITECTURE',
      detail: 'Async FastAPI microservices, real-time WebSocket telemetry, FAISS vector search, and scalable backend infrastructure.' 
    },
    { 
      id: 'web', 
      label: 'Full-Stack Web', 
      icon: Globe, 
      tag: 'FRONTEND CRAFT',
      detail: 'Responsive React & TypeScript interfaces, custom typography systems, fluid micro-interactions, and accessibility.' 
    },
    { 
      id: 'security', 
      label: 'Security & Trust', 
      icon: Shield, 
      tag: 'CRYPTOGRAPHIC PROOF',
      detail: 'Zero-trust verification, cryptographic action signatures, and explainable decision telemetry.' 
    },
    { 
      id: 'opensource', 
      label: 'Open Source Tooling', 
      icon: Code, 
      tag: 'DEVELOPER TOOLS',
      detail: 'Public developer sidecars, command-line tools, reusable utility packages, and active open-source contribution.' 
    },
    { 
      id: 'hackathons', 
      label: 'Rapid Prototyping', 
      icon: Zap, 
      tag: 'COMPETITIVE BUILDS',
      detail: '7+ Hackathons completed, SIH 2025 Qualifier, 1st Runner-Up @ CrazyBuild: shipping end-to-end MVP apps in 24-48hrs.' 
    }
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 bg-stone-100/60 dark:bg-zinc-900/30 border-y border-stone-200/80 dark:border-zinc-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Label & Editorial Statement */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="mb-3">
            <MonoLabel dot dotColor="bg-sky-600 dark:bg-cyan-400">
              01 // ARCHITECTURAL INTENT & BACKGROUND
            </MonoLabel>
          </div>
          <h2 className="section-title text-zinc-900 dark:text-zinc-50">
            Turning complex abstractions into{' '}
            <span className="editorial-italic font-normal lowercase tracking-normal text-sky-600 dark:text-cyan-400">
              *deterministic software.*
            </span>
          </h2>
        </div>

        {/* Main Editorial Dual-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Portrait Treatment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl border border-stone-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-lg group ring-1 ring-stone-900/5 dark:ring-white/10">
              <img
                src="/profile-bw.jpg"
                alt="Srinjoy Pramanick - AI Engineer & Full-Stack Developer"
                className="w-full h-full object-cover object-[center_20%] filter-none dark:filter dark:grayscale dark:contrast-110 dark:brightness-100 transition-all duration-500 group-hover:scale-102"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent pointer-events-none" />

              {/* Technical Badges Overlaid on Portrait */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-md bg-zinc-950/85 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>AI ENGINEER</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-md bg-zinc-950/85 text-zinc-300 border border-zinc-700/60 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>KOLKATA, IN</span>
                </span>
              </div>

              {/* Bottom Portrait Info */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-zinc-100">
                <div className="font-display text-2xl font-bold tracking-tight text-white">
                  Srinjoy Pramanick
                </div>
                <div className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-0.5">
                  @Codexia-afk
                </div>
                <p className="font-sans text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed opacity-90">
                  Engineering deterministic AI sidecars, resilient full-stack systems, and low-latency microservices.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Focus Pillars */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            {/* Bio Narrative */}
            <div className="bg-white/95 dark:bg-zinc-900/80 border border-stone-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xs">
              <p className="font-sans text-base sm:text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal mb-4">
                I'm <strong className="font-semibold text-zinc-900 dark:text-zinc-50">Srinjoy Pramanick</strong>, an AI Engineer and Full-Stack Developer. {personalData.subTagline}
              </p>
              <p className="font-sans text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                From designing real-time AI guardrails to engineering low-latency vector search backends and interactive web apps, my priority is code clarity, deterministic reliability, and human utility.
              </p>
              
              {/* Quick Achievements Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-stone-200/80 dark:border-zinc-800/80 font-mono">
                <div className="flex items-center space-x-2 text-xs">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">7+ Hackathons</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">CrazyBuild 1st Runner</span>
                </div>
                <div className="flex items-center space-x-2 text-xs col-span-2 sm:col-span-1">
                  <Shield className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">SIH 2025 Qualifier</span>
                </div>
              </div>
            </div>

            {/* Core Focus Area Selector Grid */}
            <div>
              <div className="mb-3 px-1">
                <MonoLabel>
                  CORE TECHNICAL DOMAINS & CAPABILITIES
                </MonoLabel>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const isActive = activeFocus === pillar.id;

                  return (
                    <div
                      key={pillar.id}
                      onClick={() => setActiveFocus(pillar.id)}
                      onMouseEnter={() => setActiveFocus(pillar.id)}
                      className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-sky-50/80 dark:bg-cyan-950/30 border-sky-400 dark:border-cyan-500 text-zinc-900 dark:text-zinc-100 shadow-2xs ring-1 ring-sky-400/20'
                          : 'bg-white dark:bg-zinc-900/50 border-stone-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-sky-300 dark:hover:border-zinc-700 hover:bg-stone-50/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600 dark:text-cyan-400' : 'text-zinc-500 dark:text-zinc-400'}`} />
                          <span className="font-display font-bold text-sm tracking-tight">{pillar.label}</span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 uppercase font-semibold">
                          {pillar.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                        {pillar.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutConstellation;
