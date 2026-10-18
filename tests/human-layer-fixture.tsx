import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HumanTooltip, HumanTooltipProvider } from '../src/components/human-layer';
import { humanLayerMessages, type HumanMessageId } from '../src/data/humanLayerMessages';
import '../src/index.css';
function Fixture() {
  const [id, setId] = useState<HumanMessageId>('auth-google');
  const [clicks, setClicks] = useState(0);
  return <BrowserRouter><HumanTooltipProvider>
    <select aria-label="Message" value={id} onChange={e => setId(e.target.value as HumanMessageId)} style={{ margin: 100 }}>
      {Object.keys(humanLayerMessages).map(key => <option key={key}>{key}</option>)}
    </select>
    <output aria-label="Clicks">{clicks}</output>
    <HumanTooltip registryId={id} placement="top"><button id="edge" onClick={() => setClicks(v => v + 1)} style={{ position: 'fixed', top: 18, left: 18, padding: 12 }}>Inspect</button></HumanTooltip>
    <div id="scroll-box" style={{ height: 160, width: 200, overflow: 'auto', margin: 20 }}>
      <div style={{ height: 650, paddingTop: 70 }}><HumanTooltip registryId="project-pushguard"><button id="nested">Nested scroll</button></HumanTooltip></div>
    </div>
  </HumanTooltipProvider></BrowserRouter>;
}
createRoot(document.getElementById('root')!).render(<Fixture />);
