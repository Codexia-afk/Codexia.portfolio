# 🌐 Srinjoy Pramanick — Engineering Portfolio & Systems Showcase

[![Live Site](https://img.shields.io/badge/Live_Site-codexia--portfolio.vercel.app-06B6D4?style=for-the-badge&logo=vercel&logoColor=white)](https://codexia-portfolio.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> High-performance, fully SEO-optimized personal portfolio and systems engineering showcase for **Srinjoy Pramanick** (AI Engineer, ML Engineer & Full-Stack Developer). Built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and a custom SSG pre-rendering pipeline.

---

## 👨‍💻 About Srinjoy Pramanick

I’m an **AI Engineer, Machine Learning Developer, and Full-Stack Systems Builder** pursuing my B.Tech in Computer Science & Engineering at **JIS College of Engineering** (2024–2028) in West Bengal, India.

I view software development as turning complex abstractions into deterministic, resilient, production-ready systems. My core technical focus spans:

- **AI Agents & Trust Infrastructure**: Designing deterministic runtime guardrails, in-flight intent verification middleware, FAISS vector policy search, and cryptographic proof logging (e.g. *TrustOS*).
- **Systems & WebAssembly**: Engineering low-latency cross-platform developer tools in Go and capability-isolated WebAssembly (WASM) plugin runtimes in Rust (*JeeraType*, *WASM Sandbox Manager*).
- **Browser Engineering & GovtTech**: Building privacy-first Manifest V3 Chrome Extension copilots for Indian welfare portals (*Loksetu.ai*).
- **Strategic AI Intelligence**: Constructing high-throughput market signal ingestion pipelines and LLM-powered strategic intelligence engines (*PulseForge AI*).
- **Hackathons & Competitions**: Active builder across 7+ national & global hackathons (1st Runner-Up at CrazyBuild Hackathon, Qualifier for Smart India Hackathon 2025).

---

## ⚡ Comprehensive Features & Architecture

### 1. 🔄 Rotating Professional Identity Sequence
- **Animated Role Rotation**: Continuously rotating title display cycling through 11 core specializations (`AI ENGINEER` → `MACHINE LEARNING DEVELOPER` → `FULL-STACK DEVELOPER` → `AI APPLICATION DEVELOPER` → `PYTHON DEVELOPER` → `BACKEND DEVELOPER` → `AI AGENT BUILDER` → `GENERATIVE AI DEVELOPER` → `CYBERSECURITY BUILDER` → `SOFTWARE ENGINEER` → `HACKATHON BUILDER`).
- **Zero Layout Shift**: Housed inside a fixed-height container (`h-7 sm:h-8`) with Framer Motion slide-and-fade transitions (`y: 8px → 0` enter, `y: 0 → -8px` exit) to prevent vertical page jumping.
- **Accessibility**: Integrated with `useReducedMotion()`, `aria-live="polite"`, and `role="status"` for full screen-reader compliance.

### 2. 🪐 Cybernetic Orbital Hero Ecosystem
- **Circular Photo Frame & Orbital Rings**: B&W profile cutout surrounded by 620px concentric orbital rings and dual counter-rotating satellite energy nodes (`animate-ping`).
- **Synchronized Ring Pulse**: Every role rotation triggers a subtle cyan orbital pulse around the photo frame, visually connecting role state changes to the orbital design.

### 3. 🔍 Full Technical SEO Engine & Schema.org Integration
- **Dynamic Head Metadata**: Dynamic per-page management for `<title>`, `<meta name="description">`, keywords, and canonical URLs (`https://codexia-portfolio.vercel.app/`).
- **JSON-LD Structured Data**: Implements Schema.org `Person`, `WebSite`, and `SoftwareSourceCode` schemas for entity recognition in search engines and rich snippets.
- **Social Cards & Open Graph**: Custom 1200×630 Open Graph preview image (`/og-image.png`) with full `og:*` and Twitter card tags.
- **Google Search Console Verified**: Built-in verification file (`googleb4dab4039d740486.html`), XML sitemap (`/sitemap.xml`), and `robots.txt`.

### 4. ⚡ SSG Static Pre-Rendering Pipeline
- **Automated Post-Build Pre-Renderer**: `scripts/prerender.js` runs automatically during `npm run build` to generate static HTML pages for all routes (`/`, `/projects/trustos`, `/projects/pulseforge-ai`, `/projects/loksetu-ai`, `/projects/jeeratype`, `/projects/wasm-sandbox`).
- **Fast Crawlability**: Crawlers and link scrapers receive pre-populated HTML, metadata, and JSON-LD data without requiring JavaScript execution.

### 5. 📸 Editorial Portrait & About Section
- **High-Contrast Editorial Card**: 3:4 portrait card with live telemetry badges (`AI ENGINEER`, `INDIA`, `@Codexia-afk`).
- **6 Technical Focus Pillars**: Detail cards covering AI Agent Guardrails, Systems Programming, Full-Stack Architecture, Low-Latency APIs, Prototyping, and Open-Source Collaboration.

### 6. 📂 In-Depth Project Case Studies
Comprehensive architectural breakdowns for 5 core projects:
1. **TrustOS** — Explainable AI Trust Layer for Autonomous Agents (*Python, FastAPI, LLMs, Vector Search, Cryptographic Proofs*).
2. **PulseForge AI** — Strategic Market Intelligence Platform (*React, FastAPI, Gemini API, MongoDB, Tailwind CSS*).
3. **Loksetu.ai** — Privacy-First Browser Copilot for Govt Portals (*React, TypeScript, Chrome Extensions Manifest V3, FastAPI*).
4. **JeeraType** — Offline Cross-Platform Terminal Typing Speed Tester (*Go, Terminal UI, Cross-Platform*).
5. **WASM Sandbox Package Manager** — Capability-Isolated Rust WebAssembly Runtime (*Rust, Wasmtime, WASI, Capability Security*).

### 7. 💫 3-Ring Interactive Skill Orbit
- **Concentric Rotating Skill Rings**: 3 skill orbit rings displaying technical proficiencies with counter-rotated text pills to remain upright. Includes interactive pause/play rotation controls.

### 8. 📜 Standalone Printable Resume Engine
- **Printable Resume Page**: Accessible at `/resume.html` with a 1-click **"Print / Save PDF"** action for recruiters and hiring managers.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript 5.7, Vite 6.1 |
| **Styling & UI** | Tailwind CSS v4, Vanilla CSS Custom Tokens |
| **Animations** | Framer Motion 12.4, Lucide React Icons |
| **Routing** | React Router DOM v7 |
| **SEO & SSG** | Custom Pre-Rendering Script (`scripts/prerender.js`), JSON-LD Schema, Open Graph Image Generator |
| **Assets & Verification** | Custom 1200x630 OG Image, SVG Favicons, Web App Manifest, Google Search Console Verification |
| **Hosting & Deployment** | Vercel (`https://codexia-portfolio.vercel.app/`) |

---

## 📁 Repository Directory Structure

```
Portfolio/
├── public/
│   ├── googleb4dab4039d740486.html  # Google Search Console verification file
│   ├── og-image.png                 # 1200x630 Open Graph preview image
│   ├── profile-bw.jpg               # Profile photo asset
│   ├── resume.html                  # Standalone printable resume page
│   ├── site.webmanifest             # Web application manifest
│   ├── favicon.svg                  # Custom SVG favicon
│   ├── robots.txt                   # Search crawler directives
│   └── sitemap.xml                  # XML Sitemap for search engines
├── scripts/
│   ├── generate_og_image.py         # Python PIL script generating OG image
│   └── prerender.js                 # SSG static HTML pre-rendering script
├── src/
│   ├── components/
│   │   ├── AnimatedRole.tsx         # Rotating role identity animation component
│   │   ├── OrbitalHero.tsx          # Cybernetic hero with photo frame & ring pulse
│   │   ├── SEO.tsx                  # Dynamic head metadata & JSON-LD schema component
│   │   ├── AboutConstellation.tsx   # Full portrait card & focus pillars
│   │   ├── SkillOrbit.tsx           # 3-Ring rotating skill orbit component
│   │   ├── ProjectsEditorial.tsx   # Selected builds editorial cards
│   │   ├── ExperienceCarousel.tsx   # Hackathon awards & experience timeline
│   │   ├── HackathonsSection.tsx    # Hackathon achievements display
│   │   ├── GitHubBuildLog.tsx       # Live commit log & repo status
│   │   ├── ContactOrbit.tsx         # Direct contact & mailto triggers
│   │   ├── TopBar.tsx               # Fixed header navigation & theme toggle
│   │   └── Footer.tsx               # Footer with links & quick actions
│   ├── data/
│   │   ├── personal.ts              # Personal bio, education, contacts & socials
│   │   ├── projects.ts              # Detailed case study data for all 5 builds
│   │   ├── skills.ts                # Technical skill groupings & orbit nodes
│   │   └── experience.ts            # Hackathons & community experience entries
│   ├── pages/
│   │   ├── Home.tsx                 # Homepage component with Person & WebSite schema
│   │   └── ProjectDetail.tsx        # Project case study view with SoftwareSourceCode schema
│   ├── App.tsx                      # Main router & theme provider
│   ├── index.css                    # Tailwind v4 imports & custom CSS variables
│   └── main.tsx                     # React application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js**: `>= 18.0.0`
- **npm**: `>= 9.0.0`

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Codexia-afk/Codexia.portfolio.git
   cd Codexia.portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build & Pre-render for Production**:
   ```bash
   npm run build
   ```
   Executes TypeScript typechecking, Vite bundling, and the SSG pre-rendering script generating production static HTML inside `dist/`.

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Contact & Social Links

- **Live Website**: [https://codexia-portfolio.vercel.app/](https://codexia-portfolio.vercel.app/)
- **GitHub**: [github.com/Codexia-afk](https://github.com/Codexia-afk)
- **LinkedIn**: [linkedin.com/in/srinjoy-pramanick-2a3019309/](https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/)
- **Email**: [srinjoypramanick15@gmail.com](mailto:srinjoypramanick15@gmail.com)
- **Bento**: [bento.me/srinjoy19](https://bento.me/srinjoy19)
- **Resume**: [Printable Resume](/public/resume.html)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
