import React from 'react';
import { Target, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { MonoLabel } from '../typography/Typography';

export const EngineeringApproach: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Analyze the Threat Model & Real Failure Mode',
      summary: 'Inspect how systems actually fail in developer hands rather than building for idealized happy paths.',
      example: 'In PushGuard, realized that secret leaks occur at local git commits—post-push CI alerts are already too late because credentials enter remote commit history. Fixed it at the pre-push hook boundary.',
      icon: Target
    },
    {
      num: '02',
      title: 'Design Deterministic Bounds Around Stochastic Systems',
      summary: 'Stochastic generative models cannot be allowed unrestricted authority over network calls and database mutations.',
      example: 'In TrustOS, engineered an in-flight interception middleware using FAISS vector policy bounds and cryptographic state hashing receipts to verify agent tool calls in sub-18ms.',
      icon: Layers
    },
    {
      num: '03',
      title: 'Prioritize Minimal Dependencies & Compiled Binaries',
      summary: 'Prefer lightweight single-binary executables and standard libraries over massive node_modules or bloated Python environments.',
      example: 'Built PushGuard and JeeraType in Go with zero external runtime dependencies, ensuring instant binary distribution and zero install friction across macOS, Linux, and Windows.',
      icon: Zap
    },
    {
      num: '04',
      title: 'Strict Local Verification & Zero-Telemetry Privacy',
      summary: 'Client software must operate transparently with verifiable local execution and no clandestine data extraction.',
      example: 'In Loksetu.ai, architected a Chrome MV3 sidepanel copilot where OCR and welfare eligibility schemas execute 100% on the local client DOM with zero cloud telemetry.',
      icon: CheckCircle2
    }
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#eeeae0] dark:bg-[#1a1917] border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
          <div>
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              06 // PHILOSOPHY IN PRACTICE
            </MonoLabel>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5] mt-1">
              HOW I BUILD
            </h2>
            <p className="font-sans text-sm text-[#58554d] dark:text-[#a8a69f] max-w-xl mt-1">
              Practical engineering principles demonstrated across my builds. No generic motivational slogans.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8c877b] dark:text-[#6e6b63]">
            4-STAGE ENGINEERING METHODOLOGY
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8f6f0] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] space-y-4 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] px-2 py-0.5 rounded-xs bg-[#e8edd9] dark:bg-[#272622]">
                      PHASE {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#8c877b] dark:text-[#a8a69f]" />
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#dcd6c8]/60 dark:border-[#2d2c27] font-mono text-[11px] text-[#486616] dark:text-[#d5ef9c]">
                  <div className="text-[9px] uppercase font-bold text-[#8c877b] dark:text-[#6e6b63] mb-1">
                    APPLIED IN PRACTICE:
                  </div>
                  <div className="text-pretty">
                    {step.example}
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
