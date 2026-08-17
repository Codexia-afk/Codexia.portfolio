import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

const routes = [
  {
    route: '/',
    title: 'Srinjoy Pramanick — AI Engineer & ML Engineer | Full-Stack Developer',
    description: 'Srinjoy Pramanick is an AI Engineer, ML Engineer, and Full-Stack Developer building intelligent applications, AI agents, and experimental systems. Explore projects including TrustOS, PulseForge AI, Loksetu.ai, and JeeraType.',
    canonical: 'https://codexia-portfolio.vercel.app/',
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/",
        "image": "https://codexia-portfolio.vercel.app/profile-bw.jpg",
        "jobTitle": ["AI Engineer", "ML Engineer", "Full-Stack Developer"],
        "description": "Srinjoy Pramanick is an AI Engineer, ML Engineer, and Full-Stack Developer building intelligent applications, AI agents, and experimental systems.",
        "sameAs": [
          "https://github.com/Codexia-afk",
          "https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/",
          "https://bento.me/srinjoy19"
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "Full-Stack Development",
          "Cybersecurity",
          "AI Agents",
          "FastAPI",
          "Python",
          "React",
          "TypeScript",
          "Rust",
          "Go",
          "WebAssembly"
        ],
        "almamater": {
          "@type": "EducationalOrganization",
          "name": "JIS College of Engineering"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Srinjoy Pramanick Portfolio",
        "url": "https://codexia-portfolio.vercel.app/",
        "author": {
          "@type": "Person",
          "name": "Srinjoy Pramanick"
        }
      }
    ],
    htmlContent: `
      <main className="relative w-full">
        <header>
          <h1>Srinjoy Pramanick — AI Engineer, ML Engineer & Full-Stack Developer</h1>
          <p>AI Engineer · Machine Learning Developer · Full-Stack Developer · AI Application Developer · Python Developer · Backend Developer · AI Agent Builder · Generative AI Developer · Cybersecurity Builder · Software Engineer · Hackathon Builder</p>
        </header>
        <section>
          <h2>About Srinjoy Pramanick</h2>
          <p>I'm Srinjoy Pramanick, an AI Engineer, ML Engineer, and Full-Stack Developer. I view software development as turning complex abstractions into deterministic, resilient, production-ready systems.</p>
        </section>
        <section>
          <h2>Selected Engineering Projects</h2>
          <ul>
            <li><a href="/projects/trustos"><strong>TrustOS</strong> — An explainable digital trust layer for autonomous AI agents.</a></li>
            <li><a href="/projects/pulseforge-ai"><strong>PulseForge AI</strong> — Strategic intelligence platform for market signals.</a></li>
            <li><a href="/projects/loksetu-ai"><strong>Loksetu.ai</strong> — Browser copilot for Indian welfare portals.</a></li>
            <li><a href="/projects/jeeratype"><strong>JeeraType</strong> — Offline terminal typing speed test in Go.</a></li>
            <li><a href="/projects/wasm-sandbox"><strong>WASM Sandbox Manager</strong> — Rust WebAssembly plugin runtime.</a></li>
          </ul>
        </section>
      </main>
    `
  },
  {
    route: '/projects/trustos',
    title: 'TrustOS — Explainable AI Trust Layer by Srinjoy Pramanick',
    description: 'TrustOS is an explainable digital trust layer for autonomous AI agents, built by Srinjoy Pramanick using Python, FastAPI, LLMs, Vector Search, and Cryptographic Proofs.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/trustos',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "TrustOS",
      "description": "An explainable digital trust layer for autonomous AI agents.",
      "url": "https://codexia-portfolio.vercel.app/projects/trustos",
      "codeRepository": "https://github.com/Codexia-afk/trustos",
      "programmingLanguage": ["Python", "FastAPI", "LLMs", "Vector Search", "Cryptographic Proofs"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>TrustOS — AI Trust Layer Project by Srinjoy Pramanick</h1>
        <p>An explainable digital trust layer for autonomous AI agents providing intent verification, policy enforcement, and explainable decision traces.</p>
        <h2>Executive Thesis</h2>
        <p>As autonomous AI agents acquire real-world execution rights, traditional RBAC fails because model outputs are stochastic. TrustOS provides deterministic runtime guardrails, explainable decision traces, and cryptographic verification.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Python, FastAPI, LLMs, Vector Search, and Cryptographic Proofs.</p>
        <p><a href="https://github.com/Codexia-afk/trustos">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/pulseforge-ai',
    title: 'PulseForge AI — Strategic Intelligence Platform by Srinjoy Pramanick',
    description: 'PulseForge AI is an AI-powered strategic intelligence platform for discovering market signals and business opportunities, built by Srinjoy Pramanick using React, FastAPI, Gemini, and MongoDB.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/pulseforge-ai',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "PulseForge AI",
      "description": "AI-powered strategic intelligence for discovering business opportunities from market signals.",
      "url": "https://codexia-portfolio.vercel.app/projects/pulseforge-ai",
      "codeRepository": "https://github.com/Codexia-afk/pulseforge-ai",
      "programmingLanguage": ["React", "FastAPI", "Gemini", "MongoDB", "Tailwind CSS"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>PulseForge AI — Strategic Intelligence Platform by Srinjoy Pramanick</h1>
        <p>AI-powered strategic intelligence for discovering business opportunities from market signals.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using React, FastAPI, Gemini, MongoDB, and Tailwind CSS.</p>
        <p><a href="https://github.com/Codexia-afk/pulseforge-ai">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/loksetu-ai',
    title: 'Loksetu.ai — Govt Welfare Browser Copilot by Srinjoy Pramanick',
    description: 'Loksetu.ai is a privacy-first browser copilot & CSC facilitator application engine for Indian welfare portals, built by Srinjoy Pramanick using React, TypeScript, Chrome Extensions (Manifest V3), and FastAPI.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/loksetu-ai',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "Loksetu.ai",
      "description": "Privacy-First Browser Copilot & CSC Facilitator Application Engine for Indian Welfare Portals.",
      "url": "https://codexia-portfolio.vercel.app/projects/loksetu-ai",
      "codeRepository": "https://github.com/Codexia-afk/loksetu-ai",
      "programmingLanguage": ["React", "TypeScript", "Chrome Extensions (Manifest V3)", "FastAPI"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>Loksetu.ai — Govt Welfare Browser Copilot by Srinjoy Pramanick</h1>
        <p>Privacy-First Browser Copilot & CSC Facilitator Application Engine for Indian Welfare Portals.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using React, TypeScript, Chrome Extensions (Manifest V3), and FastAPI.</p>
        <p><a href="https://github.com/Codexia-afk/loksetu-ai">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/jeeratype',
    title: 'JeeraType — Terminal Typing Speed Tester in Go by Srinjoy Pramanick',
    description: 'JeeraType is a fully offline, cross-platform terminal typing speed test for macOS, Windows, and Linux built in Go by Srinjoy Pramanick.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/jeeratype',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "JeeraType",
      "description": "A fully offline, cross-platform terminal typing speed test for macOS, Windows, and Linux built in Go.",
      "url": "https://codexia-portfolio.vercel.app/projects/jeeratype",
      "codeRepository": "https://github.com/Codexia-afk/jeeratype",
      "programmingLanguage": ["Go", "Terminal UI", "Cross-Platform", "React"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>JeeraType — Terminal Typing Speed Tester in Go by Srinjoy Pramanick</h1>
        <p>A fully offline, cross-platform terminal typing speed test for macOS, Windows, and Linux built in Go.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Go, Terminal UI, and React.</p>
        <p><a href="https://github.com/Codexia-afk/jeeratype">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/wasm-sandbox',
    title: 'WASM Sandbox Manager — Rust WebAssembly Runtime by Srinjoy Pramanick',
    description: 'WASM Sandbox Manager is a Rust-based WebAssembly runtime for executing capability-isolated plugins safely, built by Srinjoy Pramanick using Rust, Wasmtime, and WebAssembly.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/wasm-sandbox',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "WASM Sandbox Manager",
      "description": "Rust-based sandbox runtime for installing and executing small WebAssembly plugins with capability permissions.",
      "url": "https://codexia-portfolio.vercel.app/projects/wasm-sandbox",
      "codeRepository": "https://github.com/Codexia-afk/wasm-sandbox",
      "programmingLanguage": ["Rust", "WebAssembly (WASM)", "Wasmtime", "Capability Security"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>WASM Sandbox Manager — Rust WebAssembly Runtime by Srinjoy Pramanick</h1>
        <p>Rust-based sandbox runtime for installing and executing small WebAssembly plugins with capability permissions.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Rust, WebAssembly, Wasmtime, and Capability Security primitives.</p>
        <p><a href="https://github.com/Codexia-afk/wasm-sandbox">View Repository on GitHub</a></p>
      </article>
    `
  }
];

console.log("Pre-rendering static HTML for SSG routes...");

routes.forEach(({ route, title, description, canonical, jsonLd, htmlContent }) => {
  let html = baseTemplate;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
  
  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  
  // Replace OG Meta
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`);

  // Replace Twitter Meta
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);

  // Inject JSON-LD
  const jsonLdScript = `<script id="json-ld-schema" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  html = html.replace('</head>', `  ${jsonLdScript}\n</head>`);

  // Inject Pre-rendered Body HTML into root div
  html = html.replace('<div id="root"></div>', `<div id="root">${htmlContent}</div>`);

  // Determine output filepath
  let targetFile;
  if (route === '/') {
    targetFile = path.join(distDir, 'index.html');
  } else {
    const routeDir = path.join(distDir, route.substring(1));
    fs.mkdirSync(routeDir, { recursive: true });
    targetFile = path.join(routeDir, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`✓ Pre-rendered: ${route} -> ${targetFile}`);
});

console.log("SSG pre-rendering completed successfully.");
