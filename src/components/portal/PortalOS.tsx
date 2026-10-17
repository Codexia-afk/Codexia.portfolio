import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Sparkles } from 'lucide-react';
import { PortalView } from './types';
import { buildSearchIndex, searchPortalItems, ActionHandlers } from './portalRegistry';
import { PortalDiscover } from './PortalDiscover';
import { PortalSearchResults } from './PortalSearchResults';
import { ProjectQuickView } from './ProjectQuickView';
import { TheMarginsNotes } from './TheMarginsNotes';
import { OnMyDesk } from './OnMyDesk';
import { RecruiterMode } from './RecruiterMode';
import { PortalColophon } from './PortalColophon';

interface PortalOSProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  initialView?: PortalView;
}

export const PortalOS: React.FC<PortalOSProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  darkMode,
  setDarkMode,
  initialView
}) => {
  const [activeView, setActiveView] = useState<PortalView>(initialView || 'discover');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('trustos');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => setToastMessage(null), 3000);
  };

  const actionHandlers: ActionHandlers = {
    onNavigateSection,
    onOpenProjectPreview: (slug: string) => {
      setSelectedProjectSlug(slug);
      setActiveView('project-preview');
    },
    onOpenView: (view) => {
      setActiveView(view);
      setSearchQuery('');
    },
    onToggleTheme: () => {
      if (setDarkMode) setDarkMode(!darkMode);
    },
    onToggleReducedMotion: () => {
      const current = document.documentElement.classList.contains('reduce-motion');
      if (current) {
        document.documentElement.classList.remove('reduce-motion');
        showToast('Motion restored.');
      } else {
        document.documentElement.classList.add('reduce-motion');
        showToast('Reduced motion enabled.');
      }
    },
    onShowToast: showToast,
    onClose
  };

  const allSearchItems = buildSearchIndex(actionHandlers);
  const searchResults = searchPortalItems(searchQuery, allSearchItems);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialView) {
        setActiveView(initialView);
      }
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setActiveView(initialView || 'discover');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (activeView !== 'discover') {
          setActiveView('discover');
        } else if (searchQuery) {
          setSearchQuery('');
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowDown') {
        if (searchResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % searchResults.length);
        }
      } else if (e.key === 'ArrowUp') {
        if (searchResults.length > 0) {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
        }
      } else if (e.key === 'Enter') {
        if (searchResults.length > 0 && selectedIndex < searchResults.length) {
          e.preventDefault();
          searchResults[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeView, searchQuery, searchResults, selectedIndex, onClose]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="PORTAL OS Interactive Command Center"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#131312]/70 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Toast Notification Popover */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="fixed top-6 z-60 px-4 py-2 rounded-lg bg-[#1a1917] text-[#f8f6f0] dark:bg-[#f0ede5] dark:text-[#131312] font-mono text-xs font-semibold shadow-xl border border-[#383731] dark:border-[#dcd6c8] flex items-center gap-2 pointer-events-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#486616] dark:text-[#d5ef9c]" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Command Center Container */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[820px] rounded-2xl bg-[#f8f6f0]/95 dark:bg-[#131312]/95 border border-[#dcd6c8] dark:border-[#2d2c27] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Top Bar: Brand, Search & Navigation Tabs */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-[#dcd6c8] dark:border-[#2d2c27] bg-[#eeeae0]/80 dark:bg-[#1a1917]/80 space-y-3">
              
              {/* Row 1: System Badge, Quick Experience Pills & Close */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
                  <span className="font-display font-bold text-sm tracking-tight text-[#1a1917] dark:text-[#f0ede5]">
                    PORTAL OS
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] font-bold text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#383731]">
                    v2.0
                  </span>
                </div>

                {/* Sub-view switcher pills */}
                <div className="hidden sm:flex items-center gap-1 font-mono text-[11px]">
                  <button
                    onClick={() => { setActiveView('discover'); setSearchQuery(''); }}
                    className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                      activeView === 'discover' && !searchQuery
                        ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] font-bold'
                        : 'text-[#58554d] hover:text-[#1a1917] dark:text-[#a8a69f] dark:hover:text-[#f0ede5]'
                    }`}
                  >
                    Atlas
                  </button>
                  <button
                    onClick={() => { setActiveView('margins-notes'); setSearchQuery(''); }}
                    className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                      activeView === 'margins-notes'
                        ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] font-bold'
                        : 'text-[#58554d] hover:text-[#1a1917] dark:text-[#a8a69f] dark:hover:text-[#f0ede5]'
                    }`}
                  >
                    The Margins
                  </button>
                  <button
                    onClick={() => { setActiveView('on-my-desk'); setSearchQuery(''); }}
                    className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                      activeView === 'on-my-desk'
                        ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] font-bold'
                        : 'text-[#58554d] hover:text-[#1a1917] dark:text-[#a8a69f] dark:hover:text-[#f0ede5]'
                    }`}
                  >
                    Desk
                  </button>
                  <button
                    onClick={() => { setActiveView('recruiter-mode'); setSearchQuery(''); }}
                    className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                      activeView === 'recruiter-mode'
                        ? 'bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] font-bold'
                        : 'text-[#58554d] hover:text-[#1a1917] dark:text-[#a8a69f] dark:hover:text-[#f0ede5]'
                    }`}
                  >
                    Recruiter
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-sm text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] hover:bg-[#dcd6c8]/50 dark:hover:bg-[#201f1c] transition-colors cursor-pointer"
                  aria-label="Close Portal OS"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Row 2: Universal Search Input */}
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#8c877b] dark:text-[#a8a69f] absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Universal search: projects, guardrails, skills, hackathons, actions..."
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#f4efe5] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] text-sm font-sans text-[#1a1917] dark:text-[#f0ede5] placeholder-[#8c877b] dark:placeholder-[#6e6b63] focus:outline-none focus:ring-2 focus:ring-[#486616]/20 dark:focus:ring-[#d5ef9c]/20 focus:border-[#486616] dark:focus:border-[#d5ef9c] shadow-2xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 p-1 rounded-sm text-[#8c877b] hover:text-[#1a1917] dark:hover:text-[#f0ede5] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

            {/* Scrollable Center Body Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 overscroll-contain">
              {searchQuery ? (
                <PortalSearchResults
                  query={searchQuery}
                  results={searchResults}
                  selectedIndex={selectedIndex}
                  onSelect={(item) => item.action()}
                  onHoverIndex={(idx) => setSelectedIndex(idx)}
                />
              ) : activeView === 'discover' ? (
                <PortalDiscover
                  onSelectView={(view) => setActiveView(view)}
                  onOpenProjectPreview={(slug) => {
                    setSelectedProjectSlug(slug);
                    setActiveView('project-preview');
                  }}
                  onNavigateSection={onNavigateSection}
                  onClose={onClose}
                />
              ) : activeView === 'project-preview' ? (
                <ProjectQuickView
                  slug={selectedProjectSlug}
                  onBack={() => setActiveView('discover')}
                  onClose={onClose}
                />
              ) : activeView === 'margins-notes' ? (
                <TheMarginsNotes
                  onBack={() => setActiveView('discover')}
                  onShowToast={showToast}
                />
              ) : activeView === 'on-my-desk' ? (
                <OnMyDesk
                  onBack={() => setActiveView('discover')}
                  onOpenProjectPreview={(slug) => {
                    setSelectedProjectSlug(slug);
                    setActiveView('project-preview');
                  }}
                />
              ) : activeView === 'recruiter-mode' ? (
                <RecruiterMode
                  onBack={() => setActiveView('discover')}
                  onOpenProjectPreview={(slug) => {
                    setSelectedProjectSlug(slug);
                    setActiveView('project-preview');
                  }}
                  onShowToast={showToast}
                />
              ) : (
                <PortalColophon onBack={() => setActiveView('discover')} />
              )}
            </div>

            {/* Bottom Telemetry Status Bar */}
            <div className="shrink-0 px-4 sm:px-6 py-3 border-t border-[#dcd6c8] dark:border-[#2d2c27] bg-[#eeeae0]/90 dark:bg-[#1a1917]/90 flex items-center justify-between font-mono text-[11px] text-[#8c877b] dark:text-[#a8a69f]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#486616] dark:bg-[#d5ef9c]" />
                <span className="hidden sm:inline">STATE: DETERMINISTIC // V2.0</span>
                <span className="sm:hidden">PORTAL OS V2</span>
                <span className="text-[#bfb8a6] dark:text-[#494841]">·</span>
                <span className="text-[#8c877b] dark:text-[#6e6b63]">22.57°N, 88.36°E</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 text-[10px] text-[#8c877b] dark:text-[#a8a69f]">
                <span className="hidden md:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] font-bold text-[#1a1917] dark:text-[#f0ede5]">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="hidden md:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] font-bold text-[#1a1917] dark:text-[#f0ede5]">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-xs bg-[#f4efe5] dark:bg-[#201f1c] border border-[#dcd6c8] dark:border-[#383731] font-bold text-[#1a1917] dark:text-[#f0ede5]">ESC</kbd>
                  <span>Back / Close</span>
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
