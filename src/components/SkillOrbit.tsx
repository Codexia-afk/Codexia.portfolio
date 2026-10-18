import { projectMessageId } from '../data/humanLayerMessages';
import { HumanTooltip } from './common/HumanTooltip';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Server, Globe, Wrench } from 'lucide-react';
import { skillOrbitNodes, SkillNode } from '../data/skills';
import { projectsData } from '../data/projects';
import { SectionHeading } from './typography/Typography';

export const SkillOrbit: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(skillOrbitNodes[0]);

  // Find all projects that use the selected skill
  const relatedProjects = projectsData.filter((p) => {
    const sName = selectedSkill.name.toLowerCase();
    return p.tech.some((t) => {
      const tLower = t.toLowerCase();
      if (sName === 'python' && tLower.includes('python')) return true;
      if (sName === 'go' && tLower.includes('go')) return true;
      if (sName === 'rust' && tLower.includes('rust')) return true;
      if (sName === 'webassembly' && (tLower.includes('wasm') || tLower.includes('webassembly'))) return true;
      if (sName === 'fastapi' && tLower.includes('fastapi')) return true;
      if (sName === 'react' && tLower.includes('react')) return true;
      if (sName === 'typescript' && tLower.includes('typescript')) return true;
      if (sName === 'manifest v3' && tLower.includes('manifest')) return true;
      if (sName === 'gemini api' && tLower.includes('gemini')) return true;
      if (sName === 'mongodb' && tLower.includes('mongodb')) return true;
      return tLower.includes(sName);
    });
  });

  const disciplines = [
    {
      title: 'AI & Automation',
      icon: Cpu,
      skills: ['Python', 'PyTorch', 'Gemini API', 'LLMs', 'Vector Search'],
      desc: 'Runtime guardrails, FAISS embeddings, entity extraction, stochastic bounds.'
    },
    {
      title: 'Systems & Backend',
      icon: Server,
      skills: ['Go', 'Rust', 'FastAPI', 'WebAssembly', 'MongoDB', 'C / C++'],
      desc: 'Sub-5ms CLI scanners, capability sandboxing, async WebSocket servers.'
    },
    {
      title: 'Frontend & Extensions',
      icon: Globe,
      skills: ['React', 'TypeScript', 'Manifest V3', 'Tailwind CSS'],
      desc: 'Zero-telemetry browser copilots, fluid editorial design systems, accessible UI.'
    },
    {
      title: 'Developer Tooling',
      icon: Wrench,
      skills: ['Git & GitHub', 'Docker', 'DigitalOcean', 'Terminal UI'],
      desc: 'Pre-push Git hooks, microservices, containerization, reproducible builds.'
    }
  ];

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="02"
          label="CAPABILITIES & PROJECT CONNECTIONS"
          title="TECHNICAL PROFICIENCY"
          italicWord="*& engineering tooling.*"
          subtitle="Click any technology to discover how it is used and view real projects that implement it."
        />

        {/* Interactive Skill Selector Pill Bar */}
        <div className="mb-10">
          <div className="font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider mb-3">
            SELECT A TECHNOLOGY TO DISCOVER IMPLEMENTATIONS:
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skillOrbitNodes.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;

              return (
                <HumanTooltip registryId="skills" key={skill.name}>
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-2 rounded-xs font-mono text-xs flex items-center space-x-2 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] border-[#1a1917] dark:border-[#d5ef9c] font-bold shadow-xs'
                        : 'bg-[#eeeae0] dark:bg-[#1a1917] text-[#58554d] dark:text-[#a8a69f] border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#bfb8a6] hover:text-[#1a1917] dark:hover:text-[#f0ede5]'
                    }`}
                  >
                    <span>{skill.name}</span>
                  </button>
                </HumanTooltip>
              );
            })}
          </div>
        </div>

        {/* Active Skill Inspection & Real Project Evidence Card */}
        <div className="rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] p-6 sm:p-8 lg:p-10 mb-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Skill Context & Architectural Scope (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#383731]">
                  CATEGORY // {selectedSkill.category}
                </span>
                <span className="font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                  DISCIPLINE INDEX
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
                {selectedSkill.name}
              </h3>

              <p className="font-sans text-base sm:text-lg text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>

            {/* Right Column: Connected Projects (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] uppercase tracking-wider flex items-center justify-between pb-2 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
                <span>EVIDENCE IN PORTFOLIO BUILDS</span>
                <span className="text-[#486616] dark:text-[#d5ef9c]">
                  {relatedProjects.length} {relatedProjects.length === 1 ? 'BUILD' : 'BUILDS'} FOUND
                </span>
              </div>

              {relatedProjects.length > 0 ? (
                <div className="space-y-2.5">
                  {relatedProjects.map((proj) => (
                    <HumanTooltip registryId={projectMessageId(proj.slug)} key={proj.id}><Link
                      to={`/projects/${proj.slug}`}
                      className="group p-4 rounded-xl bg-[#f8f6f0] dark:bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase">
                          CHAPTER {proj.number} · {proj.category}
                        </div>
                        <div className="font-display font-bold text-base text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors">
                          {proj.title}
                        </div>
                        <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] line-clamp-1">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] pl-3 shrink-0">
                        <span className="hidden sm:inline">INSPECT</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </Link></HumanTooltip>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-[#f8f6f0] dark:bg-[#131312] border border-[#dcd6c8] dark:border-[#2d2c27] text-center font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                  Utilized in core systems infrastructure, background services & hackathon prototypes.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Structured Disciplines Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="p-5 sm:p-6 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold text-[#486616] dark:text-[#d5ef9c] uppercase">
                    <Icon className="w-4 h-4" />
                    <span>{d.title}</span>
                  </div>
                  <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] leading-relaxed mb-4">
                    {d.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#dcd6c8] dark:border-[#2d2c27] font-mono text-[11px]">
                  {d.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#383731]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillOrbit;
