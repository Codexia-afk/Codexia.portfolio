import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Trophy, 
  Folder, 
  Cpu, 
  Zap, 
  Mail, 
  Github, 
  Sun, 
  Moon, 
  Search,
  Command,
  MessageSquare
} from 'lucide-react';
import { personalData } from '../data/personal';

interface TopBarProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenPortal?: (view?: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Real-time digital clock state
  const [time, setTime] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0')
      });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scrollspy to detect active section
  useEffect(() => {
    if (!isHome) {
      setActiveSection('projects');
      return;
    }

    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'hackathons', 'contact'];

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

  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', icon: Home, href: '#' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'experience', label: 'Experience', icon: Trophy, href: '#experience' },
    { id: 'skills', label: 'Capabilities', icon: Cpu, href: '#skills' },
    { id: 'projects', label: 'Builds', icon: Folder, href: '#projects' },
    { id: 'hackathons', label: 'Hackathons', icon: Zap, href: '#hackathons' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  const handleNavClick = (item: NavItem) => {
    if (isHome) {
      if (item.id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('hero');
      } else {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(item.id);
        }
      }
    } else {
      if (item.id === 'hero') {
        navigate('/');
      } else {
        navigate(`/${item.href}`);
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 pointer-events-none px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Left Floating Brand / Status Pill */}
        <div className="hidden lg:flex items-center pointer-events-auto">
          <button
            onClick={() => {
              if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
              else navigate('/');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-stone-200/90 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.3)] hover:border-stone-400 dark:hover:border-zinc-700 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-display font-bold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
              SRINJOY
            </span>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              // ARCHITECT // V2
            </span>
          </button>
        </div>

        {/* Center Floating Dock Pill (Masum.tech style island) */}
        <div className="mx-auto flex items-center pointer-events-auto">
          <nav
            aria-label="Floating navigation dock"
            className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-stone-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-stone-200/90 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    aria-label={item.label}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-stone-100 dark:text-zinc-950 shadow-sm scale-100'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-stone-200/70 dark:hover:bg-zinc-800/70'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
                  </button>

                  {/* Micro Tooltip */}
                  {isHovered && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-50">
                      <div className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-950 font-mono text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap shadow-md">
                        {item.label}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-stone-300 dark:bg-zinc-700/80 mx-0.5 sm:mx-1" />

            {/* Portal OS Search Trigger */}
            <div className="relative">
              <button
                onClick={() => onOpenPortal?.()}
                onMouseEnter={() => setHoveredItem('portal')}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label="Open PORTAL OS Command Center"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-cyan-400 hover:bg-stone-200/70 dark:hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {hoveredItem === 'portal' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-50">
                  <div className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-950 font-mono text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap shadow-md">
                    PORTAL OS (⌘K)
                  </div>
                </div>
              )}
            </div>

            {/* Share Thoughts / Feedback Trigger */}
            <div className="relative">
              <button
                onClick={() => onOpenPortal?.('margins-notes')}
                onMouseEnter={() => setHoveredItem('thoughts')}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label="Share Thoughts and Reviews"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-cyan-400 hover:bg-stone-200/70 dark:hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {hoveredItem === 'thoughts' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-50">
                  <div className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-950 font-mono text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap shadow-md">
                    Share Thoughts
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Profile Icon */}
            <div className="relative">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredItem('github')}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label="GitHub Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-stone-200/70 dark:hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>

              {hoveredItem === 'github' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-50">
                  <div className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-950 font-mono text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap shadow-md">
                    GitHub
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Icon */}
            {setDarkMode && (
              <div className="relative">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  onMouseEnter={() => setHoveredItem('theme')}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-label="Toggle color theme"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-stone-200/70 dark:hover:bg-zinc-800/70 transition-all duration-200 cursor-pointer"
                >
                  {darkMode ? (
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 hover:rotate-45 transition-transform" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 hover:-rotate-12 transition-transform" />
                  )}
                </button>

                {hoveredItem === 'theme' && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 pointer-events-none z-50">
                    <div className="px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-950 font-mono text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap shadow-md">
                      {darkMode ? 'Light' : 'Dark'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Right Floating Pills: Live Digital Clock & ⌘K Badge */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          {/* Live Digital Clock */}
          <div className="flex items-center px-3.5 py-2 rounded-full bg-stone-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-stone-200/90 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.3)] font-mono text-xs text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{time.hours}</span>
            <span className="mx-1 text-zinc-400 animate-pulse">:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{time.minutes}</span>
            <span className="mx-1 text-zinc-400 animate-pulse">:</span>
            <span className="text-[11px] font-bold text-sky-600 dark:text-cyan-400">{time.seconds}</span>
          </div>

          {/* ⌘K Trigger Button for PORTAL OS */}
          <button
            onClick={() => onOpenPortal?.()}
            aria-label="Open PORTAL OS Command Center"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-stone-200/90 dark:border-zinc-800 shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.3)] font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:border-sky-500 hover:text-sky-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default TopBar;
