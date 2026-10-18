import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Command,
  MessageSquare,
  Github,
  Menu,
  X
} from 'lucide-react';
import { personalData } from '../data/personal';

interface TopBarProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenPortal?: (view?: string) => void;
}

interface NavChapter {
  id: string;
  num: string;
  label: string;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  darkMode, 
  setDarkMode,
  onOpenPortal
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Scrollspy to detect active section on home page
  useEffect(() => {
    if (!isHome) {
      setActiveSection('projects');
      return;
    }

    const sections = ['hero', 'about', 'skills', 'projects', 'hackathons', 'writing', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        if (sectionId === 'hero') {
          if (window.scrollY < 300) {
            setActiveSection('hero');
            return;
          }
          continue;
        }

        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navChapters: NavChapter[] = [
    { id: 'about', num: '01', label: 'Intent' },
    { id: 'skills', num: '02', label: 'Capabilities' },
    { id: 'projects', num: '03', label: 'Builds' },
    { id: 'hackathons', num: '04', label: 'Field Notes' },
    { id: 'writing', num: '05', label: 'Dispatches' },
    { id: 'contact', num: '06', label: 'Contact' }
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('hero');
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }
    } else {
      if (sectionId === 'hero') {
        navigate('/');
      } else {
        navigate(`/#${sectionId}`);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#f8f6f0]/90 dark:bg-[#131312]/90 backdrop-blur-md border-b border-[#dcd6c8] dark:border-[#2d2c27] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Left: Brand & Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#486616] dark:bg-[#d5ef9c] animate-pulse" />
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors">
              SRINJOY PRAMANICK
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-widest">
              // ATELIER
            </span>
          </button>
        </div>

        {/* Center: Desktop Editorial Chapter Links */}
        <nav
          aria-label="Main chapter navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2 font-mono text-xs text-[#58554d] dark:text-[#a8a69f]"
        >
          {navChapters.map((ch) => {
            const isActive = activeSection === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => handleNavClick(ch.id)}
                className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1a1917] dark:bg-[#d5ef9c] text-[#f8f6f0] dark:text-[#131312] font-bold'
                    : 'hover:text-[#1a1917] dark:hover:text-[#f0ede5] hover:bg-[#eeeae0] dark:hover:bg-[#1a1917]'
                }`}
              >
                <span className="opacity-60 text-[10px]">{ch.num}.</span>
                <span>{ch.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Command Center, Margins & Theme */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Recruiter Brief Entry Point */}
          <Link
            to="/hire"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] text-[#486616] dark:text-[#d5ef9c] border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616] dark:hover:border-[#d5ef9c] font-mono text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            aria-label="Open The Hiring Dossier / Recruiter Brief"
          >
            <span>RECRUITER BRIEF</span>
            <span className="text-[10px]">↗</span>
          </Link>

          {/* ⌘K Command Center Launcher */}
          <button
            onClick={() => onOpenPortal?.()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616] dark:hover:border-[#d5ef9c] font-mono text-xs transition-colors cursor-pointer shadow-2xs"
            aria-label="Open Command Center (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 opacity-80" />
            <span className="hidden sm:inline font-semibold">PORTAL</span>
            <span className="text-[10px] text-[#8c877b] dark:text-[#a8a69f]">⌘K</span>
          </button>

          {/* The Margins (Guestbook) Trigger */}
          <button
            onClick={() => onOpenPortal?.('margins-notes')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#486616] dark:hover:border-[#d5ef9c] font-mono text-xs transition-colors cursor-pointer shadow-2xs"
            aria-label="Open The Margins Guestbook"
          >
            <MessageSquare className="w-3.5 h-3.5 opacity-80" />
            <span className="font-semibold">MARGINS</span>
          </button>

          {/* Theme Toggle */}
          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] hover:border-[#bfb8a6] transition-colors cursor-pointer"
              aria-label="Toggle dark/light theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#d5ef9c]" />
              ) : (
                <Moon className="w-4 h-4 text-[#486616]" />
              )}
            </button>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] text-[#1a1917] dark:text-[#f0ede5] border border-[#dcd6c8] dark:border-[#2d2c27] transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dcd6c8] dark:border-[#2d2c27] bg-[#f8f6f0] dark:bg-[#131312] px-4 py-6 space-y-4 font-mono text-xs animate-fadeIn">
          <div className="text-[10px] text-[#8c877b] dark:text-[#a8a69f] uppercase tracking-wider">
            CHAPTER DIRECTORY:
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleNavClick(ch.id)}
                className="p-3 text-left rounded-xs bg-[#eeeae0] dark:bg-[#1a1917] border border-[#dcd6c8] dark:border-[#2d2c27] text-[#1a1917] dark:text-[#f0ede5] font-semibold"
              >
                <div className="text-[10px] text-[#8c877b] dark:text-[#a8a69f]">{ch.num}.</div>
                <div>{ch.label}</div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex flex-col gap-2">
            <Link
              to="/hire"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 text-center rounded-xs bg-[#1a1917] text-[#f8f6f0] dark:bg-[#d5ef9c] dark:text-[#131312] font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>THE HIRING DOSSIER // RECRUITER BRIEF</span>
              <span>↗</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[#dcd6c8] dark:border-[#2d2c27] flex items-center justify-between text-[#8c877b] dark:text-[#a8a69f]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal?.('margins-notes');
              }}
              className="text-[#486616] dark:text-[#d5ef9c] font-bold"
            >
              Open The Margins Guestbook →
            </button>
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
