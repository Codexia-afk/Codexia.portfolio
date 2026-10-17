import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { writingData, Article } from '../data/writing';
import { SectionHeading } from './typography/Typography';

export const Writing: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section 
      id="writing" 
      className="relative min-h-[80vh] w-full flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-12 bg-[#f8f6f0] dark:bg-[#131312] text-[#1a1917] dark:text-[#f0ede5] border-b border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <SectionHeading
          number="06"
          label="ENGINEERING JOURNAL & TECHNICAL ESSAYS"
          title="DISPATCHES"
          italicWord="*& technical essays.*"
          subtitle="Architectural notes on latency budgets, stochastic AI bounds, and hackathon engineering heuristics."
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writingData.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group p-6 sm:p-8 rounded-xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col justify-between space-y-5 cursor-pointer shadow-xs hover:border-[#486616] dark:hover:border-[#d5ef9c] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8c877b] dark:text-[#a8a69f]">
                  <span className="px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold text-[10px]">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#58554d] dark:text-[#a8a69f] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                <span>{article.date}</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#486616] dark:text-[#d5ef9c]">
                  <span>READ ESSAY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131312]/90 backdrop-blur-md"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#dcd6c8] dark:border-[#2d2c27]">
              <div className="space-y-1">
                <div className="flex items-center gap-3 font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
                  <span className="px-2 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] text-[#486616] dark:text-[#d5ef9c] font-bold text-[10px]">
                    {selectedArticle.category}
                  </span>
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1a1917] dark:text-[#f0ede5] leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-sm text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] transition-colors cursor-pointer"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#58554d] dark:text-[#a8a69f] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between font-mono text-xs text-[#8c877b] dark:text-[#a8a69f]">
              <span>AUTHORED BY SRINJOY PRAMANICK</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-[#486616] dark:text-[#d5ef9c] font-bold hover:underline cursor-pointer"
              >
                CLOSE ESSAY
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Writing;
