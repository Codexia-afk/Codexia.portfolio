import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { HumanTooltipProvider } from './components/human-layer';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HumanTooltipProvider><App /></HumanTooltipProvider>
  </StrictMode>,
);
