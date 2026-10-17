import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { hackathonPhotos, HackathonPhoto } from '../data/hackathons';
import { SectionHeading, MonoLabel } from './typography/Typography';

export const HackathonsSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<HackathonPhoto | null>(null);

  const fieldNotes = [
    {
      id: 'crazybuild',
      event: 'CrazyBuild Hackathon',
      date: '2025 · 36-HOUR SPRINT',
      result: '1st RUNNER-UP',
      challenge: 'Build real-time collaborative developer tooling under high-pressure competitive conditions.',
      whatWeBuilt: 'Architected a sub-50ms WebSocket synchronization engine and live developer pair-programming IDE with low-latency terminal execution and conflict resolution.',
      role: 'Backend Systems & WebSocket Architecture Lead',
      takeaway: 'Designing distributed state synchronization when multiple users type concurrently taught me the value of deterministic conflict-free data structures over naive client broadcasts.'
    },
    {
      id: 'sih-2025',
      event: 'Smart India Hackathon 2025',
      date: '2025 · NATIONAL STAGE',
      result: 'NATIONAL QUALIFIER',
      challenge: 'Engineer production-grade intelligent platforms for national welfare and citizen infrastructure.',
      whatWeBuilt: 'Engineered an asynchronous microservice pipeline using FastAPI, local model inference, and structured document parsing with zero-telemetry privacy guarantees.',
      role: 'Core Systems Architect & Microservices Developer',
      takeaway: 'Presenting technical architecture to senior industry evaluators reinforced that jury questions target failure edge cases—database partition tolerance, error boundaries, and throughput under load.'
    },
    {
      id: 'discoveria',
      event: 'Discoveria Technical Challenge',
      date: '2025 · REGIONAL HACKATHON',
      result: 'WINNER / PODIUM FINISH',
      challenge: 'Rapid prototyping of full-stack software solving localized community and campus coordination bottlenecks.',
      whatWeBuilt: 'An event coordination and resource allocation platform built with React, real-time database webhooks, and accessible mobile interfaces.',
      role: 'Full-Stack Developer & Frontend Lead',
      takeaway: 'Ruthless scope discipline in the first 4 hours is what separates teams that ship a polished demo from teams that crash on unintegrated mock endpoints.'
    },
    {
      id: 'hackspire',
      event: 'HackSpire & Hacktoberfest Hack Day',
      date: '2024–2025 · OPEN SOURCE SPRINT',
      result: 'COMMUNITY HONORS',
      challenge: 'Multi-institutional open-source contribution and collaborative engineering at Aliah University.',
      whatWeBuilt: 'Contributed patches, peer code reviews, and performance improvements to public developer tool repositories.',
      role: 'Open-Source Contributor & Peer Mentor',
      takeaway: 'Code readability, Git commit ergonomics, and clean component interfaces matter just as much in collaborative sprints as complex algorithms.'
    }
  ];

  return (
    <section 
      id="hackathons" 
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="04"
          label="COMPETITIVE FIELD NOTES & HACKATHONS"
          title="FIELD NOTES"
          italicWord="*& 36-hour pressure builds.*"
          subtitle="Honest chronicles of rapid architectural scoping, sleepless nights, failure modes overcome, and podium finishes."
        />

        {/* Narrative Callout Frame */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
              ARCHIVAL NOTE // WHY HACKATHONS MATTER
            </MonoLabel>
          </div>
          <p className="font-sans text-base sm:text-lg text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-w-4xl text-pretty">
            Competitive hackathons are my testing grounds. They strip away theoretical comfort and force you to make decisive architectural trade-offs: how to keep WebSocket latency under 50ms, how to isolate memory in a sandbox, and how to deliver working software to an unforgiving jury with minutes to spare.
          </p>
        </div>

        {/* Field Notes Chronicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {fieldNotes.map((note) => (
            <article
              key={note.id}
              className="p-6 sm:p-8 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col justify-between space-y-5 shadow-xs"
            >
              <div>
                {/* Event Header & Outcome */}
                <div className="flex items-center justify-between pb-3 border-b border-[#dcd6c8] dark:border-[#2d2c27] mb-4 font-mono text-xs">
                  <span className="text-[#8c877b] dark:text-[#a8a69f]">
                    {note.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-xs font-bold bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#383731]">
                    {note.result}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1917] dark:text-[#f0ede5] mb-2">
                  {note.event}
                </h3>

                <div className="space-y-3 font-sans text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider block font-semibold">
                      THE SPRINT CHALLENGE
                    </span>
                    <p className="text-[#58554d] dark:text-[#a8a69f] mt-0.5 leading-relaxed">
                      {note.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider block font-semibold">
                      WHAT WE ARCHITECTED &amp; BUILT
                    </span>
                    <p className="text-[#1a1917] dark:text-[#f0ede5] mt-0.5 leading-relaxed font-normal">
                      {note.whatWeBuilt}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider block font-semibold">
                      ARCHITECTURAL LESSON LEARNED
                    </span>
                    <p className="text-[#58554d] dark:text-[#a8a69f] mt-0.5 italic leading-relaxed">
                      "{note.takeaway}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Stamp */}
              <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f]">
                <span>ROLE: {note.role}</span>
                <span className="text-[#486616] dark:text-[#d5ef9c] font-bold">VERIFIED</span>
              </div>
            </article>
          ))}
        </div>

        {/* Archival Photo Evidence Moving Ribbon */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#dcd6c8] dark:border-[#2d2c27] gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1a1917] dark:text-[#f0ede5] uppercase">
              <Camera className="w-4 h-4 text-[#486616] dark:text-[#d5ef9c]" />
              <span>PHOTOGRAPHIC LOG // STAGE FELICITATIONS &amp; TEAM SPRINTS</span>
            </div>
            <span className="font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f]">
              ALL 7 MOMENTS · HOVER TO PAUSE · CLICK TO EXPAND
            </span>
          </div>

          {/* Full-width moving conveyor ribbon */}
          <div className="relative w-full overflow-hidden pause-on-hover py-3 select-none -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12">
            {/* Edge fade blend masks */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8f6f0] dark:from-[#131312] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8f6f0] dark:from-[#131312] to-transparent z-10 pointer-events-none" />

            <div className="animate-ribbon gap-5 py-2 flex items-center">
              {[...hackathonPhotos, ...hackathonPhotos].map((photo, idx) => (
                <div
                  key={`${photo.src}-${idx}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group/photo relative shrink-0 w-[280px] sm:w-[330px] md:w-[380px] h-[210px] sm:h-[245px] rounded-xl overflow-hidden border border-[#dcd6c8] dark:border-[#2d2c27] bg-[#eeeae0] dark:bg-[#1a1917] cursor-pointer shadow-xs hover:border-[#486616] dark:hover:border-[#d5ef9c] hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover/photo:filter-none group-hover/photo:scale-103 transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131312]/90 via-[#131312]/30 to-transparent pointer-events-none" />
                  
                  {/* Photo tag & caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white font-mono text-[11px] space-y-0.5">
                    <div className="font-bold text-[#d5ef9c] truncate uppercase flex items-center justify-between">
                      <span>{photo.tag}</span>
                      <span className="text-[10px] text-[#a8a69f] opacity-80 group-hover/photo:opacity-100">
                        EXPAND ↗
                      </span>
                    </div>
                    <div className="text-[#f0ede5] text-xs truncate font-sans">
                      {photo.caption}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Full Photo Modal */}
      {selectedPhoto && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131312]/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-3xl w-full rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
              <span className="font-mono text-xs font-bold text-[#486616] dark:text-[#d5ef9c] uppercase">
                {selectedPhoto.tag}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-sm text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-lg bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.fullSrc || selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="font-mono text-xs text-[#58554d] dark:text-[#a8a69f]">
              <div className="font-bold text-[#1a1917] dark:text-[#f0ede5] mb-1">
                {selectedPhoto.alt}
              </div>
              <p>{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HackathonsSection;
