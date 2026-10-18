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
    title: 'Srinjoy Pramanick (@Codexia-afk) — AI Systems Engineer & Developer Portfolio',
    description: 'Official portfolio and biography of Srinjoy Pramanick (Codexia-afk). AI Systems Engineer and CSE student at JIS College of Engineering. Building deterministic AI guardrails, WebAssembly sandboxes, and developer tooling in Go & Rust.',
    canonical: 'https://codexia-portfolio.vercel.app/',
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://codexia-portfolio.vercel.app/#person",
        "name": "Srinjoy Pramanick",
        "alternateName": [
          "Codexia-afk",
          "Codexia-afk Srinjoy",
          "Codexia",
          "Srinjoy",
          "Srinjoy Pramanick (Codexia-afk)"
        ],
        "givenName": "Srinjoy",
        "familyName": "Pramanick",
        "additionalName": "Codexia-afk",
        "url": "https://codexia-portfolio.vercel.app/",
        "image": "https://codexia-portfolio.vercel.app/avatar.jpg",
        "jobTitle": ["AI Engineer", "Systems Builder", "Full-Stack Developer"],
        "description": "Srinjoy Pramanick (known online as Codexia-afk) is an AI Engineer and Systems Builder studying Computer Science & Engineering at JIS College of Engineering (2024–2028). Creator of TrustOS and PushGuard.",
        "gender": "Male",
        "nationality": "Indian",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ichapore, Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "India"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "JIS College of Engineering",
          "url": "https://www.jiscollege.ac.in/"
        },
        "sameAs": [
          "https://github.com/Codexia-afk",
          "https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/",
          "https://bento.me/srinjoy19"
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "AI Agents",
          "Deterministic Guardrails",
          "FastAPI",
          "Python",
          "Go",
          "Rust",
          "WebAssembly",
          "React",
          "TypeScript",
          "Vector Search (FAISS)",
          "Cybersecurity"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": "https://codexia-portfolio.vercel.app/#profilepage",
        "url": "https://codexia-portfolio.vercel.app/",
        "name": "Srinjoy Pramanick (Codexia-afk) — Official Developer Portfolio",
        "description": "The official portfolio, biography, and engineering works of Srinjoy Pramanick (Codexia-afk).",
        "mainEntity": {
          "@id": "https://codexia-portfolio.vercel.app/#person"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://codexia-portfolio.vercel.app/#website",
        "name": "Srinjoy Pramanick (Codexia-afk) Portfolio",
        "alternateName": [
          "Codexia-afk Srinjoy",
          "Codexia Portfolio",
          "Srinjoy Pramanick"
        ],
        "url": "https://codexia-portfolio.vercel.app/",
        "publisher": {
          "@id": "https://codexia-portfolio.vercel.app/#person"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "About Srinjoy Pramanick (Codexia-afk)",
            "description": "Biography, background, education at JIS College of Engineering, and engineering philosophy.",
            "url": "https://codexia-portfolio.vercel.app/#about"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Capabilities & Technical Stack",
            "description": "Core competencies in AI Middleware, Systems in Go & WASM, and Frontend Craft.",
            "url": "https://codexia-portfolio.vercel.app/#skills"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Selected Builds & Projects",
            "description": "Flagship builds including TrustOS, PushGuard, PulseForge AI, Loksetu.ai, and JeeraType.",
            "url": "https://codexia-portfolio.vercel.app/#projects"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Hackathon Log & Awards",
            "description": "Competitive engineering logs including CrazyBuild 1st Runner-Up and Smart India Hackathon.",
            "url": "https://codexia-portfolio.vercel.app/#hackathons"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Contact Srinjoy Pramanick",
            "description": "Get in touch for engineering roles, technical collaborations, and hackathons.",
            "url": "https://codexia-portfolio.vercel.app/#contact"
          }
        ]
      }
    ],
    htmlContent: `
      <main className="relative w-full">
        <header>
          <h1>Srinjoy Pramanick (Codexia-afk) — AI Systems Engineer &amp; Developer Portfolio</h1>
          <p>AI Engineer · Systems Builder · Full-Stack Developer · B.Tech CSE @ JIS College of Engineering (2024–2028)</p>
          <p>Online Handles: @Codexia-afk · Codexia · Srinjoy Pramanick</p>
          <nav aria-label="Quick directory">
            <ul>
              <li><a href="/hire">★ // The Hiring Dossier — Recruiter Brief</a></li>
              <li><a href="#about">01 // About Srinjoy Pramanick (Codexia-afk) — Intent &amp; Biography</a></li>
              <li><a href="#skills">02 // Technical Capabilities &amp; Systems Architecture</a></li>
              <li><a href="#projects">03 // Selected Builds &amp; Projects</a></li>
              <li><a href="#hackathons">04 // Hackathon Log &amp; Achievements</a></li>
              <li><a href="#contact">05 // Contact &amp; Inquiries</a></li>
            </ul>
          </nav>
        </header>

        <section id="about">
          <h2>About Srinjoy Pramanick (@Codexia-afk) — Intent, Biography &amp; Background</h2>
          <p>I am Srinjoy Pramanick, also known by my developer handle <strong>Codexia-afk</strong> (or Codexia). I am an AI Engineer, systems builder, and Computer Science &amp; Engineering undergraduate at <strong>JIS College of Engineering</strong> (2024–2028), based in Kolkata / Ichapore, West Bengal, India.</p>
          <p>I engineer runtime guardrails for autonomous AI agents, capability sandboxes in WebAssembly and Rust, and zero-dependency developer tools in Go. Bridging low-level systems precision with creative interface craft.</p>
          <h3>Education &amp; Academic Affiliation</h3>
          <p>Bachelor of Technology in Computer Science and Engineering (B.Tech CSE), JIS College of Engineering, Kalyani, West Bengal (2024–2028).</p>
          <h3>Accolades &amp; Hackathons</h3>
          <p>1st Runner-Up @ CrazyBuild Hackathon (2025) · Smart India Hackathon Internal Qualifier (2025).</p>
          <h3>Social Signals &amp; Verified Links</h3>
          <ul>
            <li>GitHub: <a href="https://github.com/Codexia-afk">https://github.com/Codexia-afk</a> (Codexia-afk)</li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/">https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/</a></li>
            <li>X (Twitter): <a href="https://x.com/Srinjoy_18">https://x.com/Srinjoy_18</a></li>
            <li>Peerlist: <a href="https://peerlist.io/srinjoyp15">https://peerlist.io/srinjoyp15</a></li>
            <li>Instagram: <a href="https://www.instagram.com/unknown_syntax01/">https://www.instagram.com/unknown_syntax01/</a></li>
            <li>Facebook: <a href="https://www.facebook.com/srinjoy.pramanick.2025">https://www.facebook.com/srinjoy.pramanick.2025</a></li>
            <li>Linktree: <a href="https://linktr.ee/srinjoypramanick15">https://linktr.ee/srinjoypramanick15</a></li>
            <li>Email: srinjoypramanick15@gmail.com</li>
          </ul>
        </section>

        <section id="skills">
          <h2>Technical Capabilities &amp; Architecture</h2>
          <ul>
            <li>AI Middleware &amp; Runtimes: FastAPI, FAISS vector search, LLM tool-calling guardrails, prompt boundary enforcement.</li>
            <li>Systems &amp; Low-Latency: Go concurrency, PushGuard pre-push scanner, Wasmtime sandboxing, cross-platform TUIs (JeeraType), Rust plugins.</li>
            <li>Full-Stack &amp; Web: React 19, TypeScript, Tailwind CSS, Vite, Supabase OAuth, WebSockets.</li>
          </ul>
        </section>

        <section id="projects">
          <h2>Selected Engineering Builds by Srinjoy Pramanick (Codexia-afk)</h2>
          <ul>
            <li><a href="/projects/trustos"><strong>TrustOS</strong></a> — An explainable digital trust layer for autonomous AI agents (Python, FastAPI, FAISS, Cryptographic Proofs).</li>
            <li><a href="/projects/pushguard"><strong>PushGuard</strong></a> — Ultra-fast zero-dependency pre-push secret and credential scanner built in Go.</li>
            <li><a href="/projects/pulseforge-ai"><strong>PulseForge AI</strong></a> — Strategic intelligence platform for market signals (React, FastAPI, Gemini, MongoDB).</li>
            <li><a href="/projects/loksetu-ai"><strong>Loksetu.ai</strong></a> — Browser copilot for Indian welfare portals built as a Manifest V3 Chrome Extension.</li>
            <li><a href="/projects/jeeratype"><strong>JeeraType</strong></a> — Terminal typing speed test built in Go with native cross-platform binaries.</li>
            <li><a href="/projects/wasm-sandbox"><strong>WASM Sandbox Manager</strong></a> — High-performance Rust WebAssembly plugin runtime.</li>
          </ul>
        </section>

        <section id="hackathons">
          <h2>Hackathon Field Log</h2>
          <p>Active competitive builder with 7+ hackathons completed. 1st Runner-Up @ CrazyBuild 2025, Smart India Hackathon 2025 Qualifier.</p>
        </section>

        <section id="contact">
          <h2>Contact Srinjoy Pramanick (Codexia-afk)</h2>
          <p>Open for engineering roles, technical collaborations, and hackathons. Reach out via email or GitHub.</p>
        </section>
      </main>
    `
  },
  {
    route: '/projects/trustos',
    title: 'TrustOS - Explainable AI Trust Layer by Srinjoy Pramanick',
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
        <h1>TrustOS - AI Trust Layer Project by Srinjoy Pramanick</h1>
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
    title: 'PulseForge AI - Strategic Intelligence Platform by Srinjoy Pramanick',
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
        <h1>PulseForge AI - Strategic Intelligence Platform by Srinjoy Pramanick</h1>
        <p>AI-powered strategic intelligence for discovering business opportunities from market signals.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using React, FastAPI, Gemini, MongoDB, and Tailwind CSS.</p>
        <p><a href="https://github.com/Codexia-afk/pulseforge-ai">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/loksetu-ai',
    title: 'Loksetu.ai - Govt Welfare Browser Copilot by Srinjoy Pramanick',
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
        <h1>Loksetu.ai - Govt Welfare Browser Copilot by Srinjoy Pramanick</h1>
        <p>Privacy-First Browser Copilot & CSC Facilitator Application Engine for Indian Welfare Portals.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using React, TypeScript, Chrome Extensions (Manifest V3), and FastAPI.</p>
        <p><a href="https://github.com/Codexia-afk/loksetu-ai">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/jeeratype',
    title: 'JeeraType - Terminal Typing Speed Tester in Go by Srinjoy Pramanick',
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
        <h1>JeeraType - Terminal Typing Speed Tester in Go by Srinjoy Pramanick</h1>
        <p>A fully offline, cross-platform terminal typing speed test for macOS, Windows, and Linux built in Go.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Go, Terminal UI, and React.</p>
        <p><a href="https://github.com/Codexia-afk/jeeratype">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/wasm-sandbox',
    title: 'WASM Sandbox Manager - Rust WebAssembly Runtime by Srinjoy Pramanick',
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
        <h1>WASM Sandbox Manager - Rust WebAssembly Runtime by Srinjoy Pramanick</h1>
        <p>Rust-based sandbox runtime for installing and executing small WebAssembly plugins with capability permissions.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Rust, WebAssembly, Wasmtime, and Capability Security primitives.</p>
        <p><a href="https://github.com/Codexia-afk/wasm-sandbox">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/projects/pushguard',
    title: 'PushGuard - Pre-Commit Secret Scanner in Go by Srinjoy Pramanick',
    description: 'PushGuard is a zero-dependency pre-commit secret scanner and Git push security guard written in Go by Srinjoy Pramanick.',
    canonical: 'https://codexia-portfolio.vercel.app/projects/pushguard',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "PushGuard",
      "description": "Zero-dependency pre-commit secret scanner and Git push security guard written in Go.",
      "url": "https://codexia-portfolio.vercel.app/projects/pushguard",
      "codeRepository": "https://github.com/Codexia-afk/PushGuard",
      "programmingLanguage": ["Go", "Git Hooks", "Entropy Detection", "Regex AST", "CLI"],
      "author": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "url": "https://codexia-portfolio.vercel.app/"
      }
    },
    htmlContent: `
      <article>
        <h1>PushGuard - Pre-Commit Secret Scanner in Go by Srinjoy Pramanick</h1>
        <p>Zero-dependency pre-commit secret scanner and Git push security guard written in Go.</p>
        <h2>Built By</h2>
        <p>Srinjoy Pramanick using Go, Git Hooks, Shannon Entropy, and DevSecOps primitives.</p>
        <p><a href="https://github.com/Codexia-afk/PushGuard">View Repository on GitHub</a></p>
      </article>
    `
  },
  {
    route: '/privacy',
    title: 'Privacy Policy - Srinjoy Pramanick Portfolio',
    description: 'Privacy policy and data transparency statement for the personal portfolio of Srinjoy Pramanick.',
    canonical: 'https://codexia-portfolio.vercel.app/privacy',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "url": "https://codexia-portfolio.vercel.app/privacy"
    },
    htmlContent: `
      <main>
        <h1>Privacy Policy</h1>
        <p>Privacy policy and data transparency statement for the personal portfolio of Srinjoy Pramanick.</p>
      </main>
    `
  },
  {
    route: '/terms',
    title: 'Terms & Conditions - Srinjoy Pramanick Portfolio',
    description: 'Terms and conditions of use for the personal developer portfolio and open-source project showcases of Srinjoy Pramanick.',
    canonical: 'https://codexia-portfolio.vercel.app/terms',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions",
      "url": "https://codexia-portfolio.vercel.app/terms"
    },
    htmlContent: `
      <main>
        <h1>Terms and Conditions</h1>
        <p>Terms and conditions of use for the personal developer portfolio of Srinjoy Pramanick.</p>
      </main>
    `
  },
  {
    route: '/auth/callback',
    title: 'Authenticating — The Margins | Srinjoy Pramanick Portfolio',
    description: 'Verifying session and returning to the portfolio guestbook.',
    canonical: 'https://codexia-portfolio.vercel.app/auth/callback',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Auth Callback - The Margins"
    },
    htmlContent: `
      <main>
        <h1>Verifying Authentication</h1>
        <p>Processing OAuth session and returning to The Margins.</p>
      </main>
    `
  },
  {
    route: '/hire',
    title: 'The Hiring Dossier — Srinjoy Pramanick (@Codexia-afk) — Software Engineering Profile',
    description: 'Official candidate briefing and recruiter dossier for Srinjoy Pramanick (Codexia-afk). Software engineer, CSE student at JIS College of Engineering (2024–2028). Creator of PushGuard and TrustOS. Proven track record in Go, Python, and AI systems.',
    canonical: 'https://codexia-portfolio.vercel.app/hire',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": "The Hiring Dossier — Srinjoy Pramanick (@Codexia-afk)",
      "description": "Recruiter dossier and professional engineering profile of Srinjoy Pramanick (Codexia-afk).",
      "url": "https://codexia-portfolio.vercel.app/hire",
      "mainEntity": {
        "@type": "Person",
        "name": "Srinjoy Pramanick",
        "jobTitle": ["Software Engineer", "Systems Builder", "AI Engineer"],
        "alumniOf": "JIS College of Engineering"
      }
    },
    htmlContent: `
      <main>
        <h1>The Hiring Dossier — Srinjoy Pramanick (Codexia-afk)</h1>
        <p>Software Engineering · Systems & Developer Tools · Full-Stack Systems</p>
        <p>B.Tech Computer Science & Engineering @ JIS College of Engineering (2024–2028). Builder of PushGuard, TrustOS, Loksetu.ai, and JeeraType.</p>
        <h2>Flagship Case Studies</h2>
        <ul>
          <li><strong>PushGuard:</strong> Zero-dependency pre-push Git security guard and Shannon entropy secret scanner written in Go.</li>
          <li><strong>TrustOS:</strong> Deterministic runtime guardrails for autonomous AI agents with sub-18ms FastAPI middleware.</li>
          <li><strong>Loksetu.ai:</strong> Zero-telemetry Chrome MV3 DOM copilot for Indian welfare portals.</li>
        </ul>
        <h2>Accolades</h2>
        <p>1st Runner-Up @ CrazyBuild Hackathon · Smart India Hackathon (SIH) 2025 Qualifier.</p>
        <p>Contact: srinjoypramanick15@gmail.com · <a href="/resume.html">Official Curriculum Vitae</a></p>
      </main>
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
  console.log(`[SSG] Pre-rendered: ${route} -> ${targetFile}`);
});

console.log("SSG pre-rendering completed successfully.");
