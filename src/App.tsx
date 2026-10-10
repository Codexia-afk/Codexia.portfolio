import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { PortalOS } from './components/portal/PortalOS';
import { MobilePortalLauncher } from './components/portal/MobilePortalLauncher';
import { PortalView } from './components/portal/types';

// Inner component to access router location and navigation
const AppContent: React.FC<{
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}> = ({ darkMode, setDarkMode }) => {
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [portalView, setPortalView] = useState<PortalView>('discover');
  const location = useLocation();
  const navigate = useNavigate();

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPortalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setIsPortalOpen(false);
    const isHome = location.pathname === '/';

    if (sectionId === 'hero') {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative selection:bg-cyan-500/20 selection:text-cyan-400">
      <TopBar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenPortal={(view?: string) => {
          setPortalView((view as PortalView) || 'discover');
          setIsPortalOpen(true);
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      {/* PORTAL OS Command Center Modal */}
      <PortalOS
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onNavigateSection={handleNavigateSection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        initialView={portalView}
      />

      {/* Mobile Floating Quick-Access Launcher */}
      <MobilePortalLauncher onOpen={() => setIsPortalOpen(true)} />
    </div>
  );
};

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AppContent darkMode={darkMode} setDarkMode={setDarkMode} />
    </BrowserRouter>
  );
};

export default App;
