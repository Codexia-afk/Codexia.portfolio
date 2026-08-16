import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Server, Shield, Code, Zap, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { personalData } from '../data/personal';

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
      tag: 'FRONTEND ENGINEERING',
      detail: 'Ultra-responsive React & TypeScript interfaces, custom design systems, fluid micro-interactions, and accessibility.' 
    },
    { 
      id: 'security', 
      label: 'Security & Trust', 
      icon: Shield, 
      tag: 'CRYPTOGRAPHIC PROOF',
      detail: 'Zero-trust verification, cryptographic action signatures, MITRE ATT&CK alignment, and explainable security telemetry.' 
    },
    { 
      id: 'opensource', 
      label: 'Open Source Tooling', 
      icon: Code, 
      tag: 'DEVELOPER ECOSYSTEM',
      detail: 'Public developer sidecars, command-line tools, reusable utility packages, and active open-source contribution.' 
    },
    { 
      id: 'hackathons', 
      label: 'Rapid Prototyping', 
      icon: Zap, 
      tag: 'COMPETITIVE BUILD',
      detail: '7+ Hackathons completed, SIH 2025 Qualifier, 1st Runner-Up @ CrazyBuild — shipping end-to-end MVP apps in 24-48hrs.' 
    }
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-stone-100/50 dark:bg-zinc-900/30 border-y border-stone-200/60 dark:border-zinc-800/60 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Label */}
        <div className="text-center mb-4">
          <span className="font-mono text-xs tracking-widest-xl text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
            01 · ABOUT THE ENGINEER
          </span>
        </div>

        {/* Core Statement Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-12 max-w-4xl mx-auto text-center font-sans">
          I LIKE BUILDING THINGS THAT MAKE PEOPLE ASK,{" "}
          <span className="text-cyan-600 dark:text-cyan-400 font-mono">
            "HOW DOES THAT WORK?"
          </span>
        </h2>

        {/* Main Editorial Dual-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Full-Size Black & White Portrait Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-3xl border-2 border-stone-300 dark:border-zinc-800 bg-stone-200 dark:bg-zinc-900 overflow-hidden shadow-2xl group ring-1 ring-cyan-500/20">
              {/* Full-Size Black & White Photo */}
              <img
                src="/profile-bw.jpg"
                alt="Srinjoy Pramanick - Full Size Portrait"
                className="w-full h-full object-cover object-[center_20%] filter grayscale contrast-115 brightness-100 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle Gradient Overlay for Typography Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

              {/* Badges Overlaid on Portrait */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-zinc-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AI ENGINEER</span>
                </span>
                <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-zinc-950/80 text-zinc-300 border border-zinc-700/60 backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>INDIA</span>
                </span>
              </div>

              {/* Bottom Portrait Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-10 font-mono text-zinc-100">
                <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                  Srinjoy Pramanick
                </div>
                <div className="text-xs text-cyan-400 font-bold tracking-widest uppercase mt-0.5">
                  @Codexia-afk
                </div>
                <p className="text-xs text-zinc-300 font-sans mt-2 line-clamp-2 leading-relaxed opacity-90">
                  Engineering deterministic AI sidecars, resilient full-stack web platforms, and low-latency systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Focus Pillars Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            {/* Bio Narrative */}
            <div className="bg-stone-50/80 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal mb-4">
                {personalData.subTagline} I view software development as turning complex abstractions into deterministic, resilient, production-ready systems.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                From designing real-time AI guardrails to engineering low-latency vector search backends and interactive web apps, my goal is always clarity, execution speed, and real-world impact.
              </p>
              
              {/* Quick Achievements Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-stone-200 dark:border-zinc-800 font-mono">
                <div className="flex items-center space-x-2 text-xs">
                  <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">7+ Hackathons</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">CrazyBuild 1st Runner</span>
                </div>
                <div className="flex items-center space-x-2 text-xs col-span-2 sm:col-span-1">
                  <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-zinc-800 dark:text-zinc-200 font-bold">SIH 2025 Qualifier</span>
                </div>
              </div>
            </div>

            {/* Core Focus Area Selector Grid */}
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3 px-1">
                CORE TECHNICAL DOMAINS & FOCUS AREAS
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const isActive = activeFocus === pillar.id;

                  return (
                    <div
                      key={pillar.id}
                      onClick={() => setActiveFocus(pillar.id)}
                      onMouseEnter={() => setActiveFocus(pillar.id)}
                      data-cursor="nav"
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-500 text-zinc-900 dark:text-zinc-100 shadow-md ring-1 ring-cyan-500/30'
                          : 'bg-stone-50/90 dark:bg-zinc-900/50 border-stone-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-stone-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 font-mono text-xs font-bold">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-zinc-500'}`} />
                          <span className="tracking-tight">{pillar.label}</span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase">
                          {pillar.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-snug">
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
