import React from 'react';
import { 
  Home, 
  User, 
  Trophy, 
  Folder, 
  Cpu, 
  Zap, 
  Mail, 
  FileText, 
  Github, 
  Linkedin, 
  Copy, 
  Sun, 
  MessageSquare, 
  Terminal, 
  Code,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SearchResultItem, SearchCategory } from './types';

interface PortalSearchResultsProps {
  query: string;
  results: SearchResultItem[];
  selectedIndex: number;
  onSelect: (item: SearchResultItem) => void;
  onHoverIndex: (index: number) => void;
}

export const PortalSearchResults: React.FC<PortalSearchResultsProps> = ({
  query,
  results,
  selectedIndex,
  onSelect,
  onHoverIndex
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'User': return User;
      case 'Trophy': return Trophy;
      case 'Folder': return Folder;
      case 'Cpu': return Cpu;
      case 'Zap': return Zap;
      case 'Mail': return Mail;
      case 'FileText': return FileText;
      case 'Github': return Github;
      case 'Linkedin': return Linkedin;
      case 'Copy': return Copy;
      case 'Sun': return Sun;
      case 'MessageSquare': return MessageSquare;
      case 'Terminal': return Terminal;
      case 'Code': return Code;
      default: return Sparkles;
    }
  };

  if (results.length === 0) {
    return (
      <div className="py-12 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
          <Terminal className="w-6 h-6 opacity-60" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-zinc-800 dark:text-zinc-200">
            No matching intelligence vectors found for "{query}"
          </h3>
          <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            Try searching for alternate keywords such as <code className="font-mono text-sky-600 dark:text-cyan-400">trustos</code>, <code className="font-mono text-sky-600 dark:text-cyan-400">resume</code>, <code className="font-mono text-sky-600 dark:text-cyan-400">fastapi</code>, or <code className="font-mono text-sky-600 dark:text-cyan-400">crazybuild</code>.
          </p>
        </div>
      </div>
    );
  }

  // Group results by category
  const categories = Array.from(new Set(results.map((r) => r.category))) as SearchCategory[];

  let globalIndexCounter = 0;

  return (
    <div className="space-y-5 animate-fadeIn">
      {categories.map((cat) => {
        const catResults = results.filter((r) => r.category === cat);

        return (
          <div key={cat} className="space-y-1.5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-2 flex items-center justify-between">
              <span>{cat}</span>
              <span className="opacity-60">{catResults.length}</span>
            </div>

            <div className="space-y-1">
              {catResults.map((item) => {
                const currentIndex = globalIndexCounter++;
                const isSelected = currentIndex === selectedIndex;
                const Icon = getIcon(item.iconName);

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => onHoverIndex(currentIndex)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50/90 dark:bg-cyan-950/40 border border-sky-300 dark:border-cyan-600 shadow-2xs'
                        : 'bg-white/60 dark:bg-zinc-900/40 border border-stone-200/60 dark:border-zinc-800/60 hover:bg-stone-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-zinc-950'
                          : 'bg-stone-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-sans text-xs sm:text-sm font-semibold truncate ${
                            isSelected ? 'text-sky-900 dark:text-cyan-200 font-bold' : 'text-zinc-900 dark:text-zinc-100'
                          }`}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-stone-100 dark:bg-zinc-800 text-zinc-500 font-medium shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pl-2">
                      <span className={`font-mono text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? 'opacity-100 text-sky-600 dark:text-cyan-400' : 'text-zinc-400'
                      }`}>
                        Select
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-sky-600 dark:text-cyan-400 translate-x-1' : 'text-zinc-400'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
