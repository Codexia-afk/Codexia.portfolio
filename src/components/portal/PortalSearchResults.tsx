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
        <div className="w-12 h-12 rounded-2xl bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-center mx-auto text-[#486616] dark:text-[#d5ef9c]">
          <Terminal className="w-6 h-6 opacity-80" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#486616] dark:text-[#d5ef9c] font-bold mb-1">
            ATELIER // 404
          </div>
          <h3 className="font-display text-base font-bold text-[#1a1917] dark:text-[#f0ede5]">
            404: That thought hasn't shipped yet.
          </h3>
          <p className="font-sans text-xs text-[#58554d] dark:text-[#a8a69f] mt-1 max-w-sm mx-auto">
            Zero matching vectors for "{query}". Try <code className="font-mono text-[#486616] dark:text-[#d5ef9c]">trustos</code>, <code className="font-mono text-[#486616] dark:text-[#d5ef9c]">resume</code>, <code className="font-mono text-[#486616] dark:text-[#d5ef9c]">fastapi</code>, or <code className="font-mono text-[#486616] dark:text-[#d5ef9c]">hire</code>.
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
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8c877b] dark:text-[#6e6b63] px-2 flex items-center justify-between">
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
                        ? 'bg-[#f4efe5] dark:bg-[#201f1c] border border-[#486616] dark:border-[#d5ef9c] shadow-2xs'
                        : 'bg-[#eeeae0]/50 dark:bg-[#1a1917]/50 border border-[#dcd6c8]/60 dark:border-[#2d2c27]/60 hover:bg-[#f4efe5] dark:hover:bg-[#201f1c]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#486616] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312]'
                          : 'bg-[#f4efe5] dark:bg-[#201f1c] text-[#58554d] dark:text-[#a8a69f] border border-[#dcd6c8]/50 dark:border-[#383731]/50'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-sans text-xs sm:text-sm font-semibold truncate ${
                            isSelected ? 'text-[#486616] dark:text-[#d5ef9c] font-bold' : 'text-[#1a1917] dark:text-[#f0ede5]'
                          }`}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f4efe5] dark:bg-[#201f1c] text-[#8c877b] dark:text-[#a8a69f] border border-[#dcd6c8] dark:border-[#383731] font-medium shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs text-[#58554d] dark:text-[#a8a69f] truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pl-2">
                      <span className={`font-mono text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? 'opacity-100 text-[#486616] dark:text-[#d5ef9c]' : 'text-[#8c877b] dark:text-[#6e6b63]'
                      }`}>
                        Select
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-[#486616] dark:text-[#d5ef9c] translate-x-1' : 'text-[#8c877b] dark:text-[#6e6b63]'
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
