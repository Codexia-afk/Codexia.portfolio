# 🌐 Codexia Portfolio — Immersive AI Orbit & Systems Engineering Showcase

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Release](https://img.shields.io/badge/Release-v2.0.0-10B981?style=for-the-badge)](https://github.com/Codexia-afk/Codexia.portfolio/releases/tag/v2.0.0)

> An immersive, high-performance personal portfolio engineered for **Srinjoy Pramanick** (AI Engineer & Full-Stack Developer). Designed at the intersection of AI agents, systems programming (Go, Rust, WASM), and high-contrast monochrome editorial UI aesthetics.

---

## ⚡ Key Highlights & Systems Features

### 1. 🪐 Cybernetic Orbital Hero Ecosystem
- **Monochrome Portrait Cutout**: Central B&W profile image (`w-44` / 176px) embedded inside an interactive 620px orbital circle frame.
- **Cybernetic Satellite Energy Nodes**: 2 counter-rotating data satellite nodes with animated telemetry blips (`animate-ping`) and glowing energy tails orbiting along the perimeter.
- **Drifting Micro-Constellation Dust**: Ambient floating particles providing visual depth across the dark/light hero canvas.

### 2. 📸 Full-Size Editorial Portrait About Section
- **3:4 High-Contrast Portrait Card**: Features an editorial profile display with technical status badges (`AI ENGINEER`, `INDIA`, `@Codexia-afk`).
- **6 Technical Focus Pillars**: Deep-dive domain cards detailing expertise in AI Agent Guardrails, Systems & WASM, Full-Stack Architecture, Low-Latency APIs, Hackathon Prototyping, and Open-Source Collaboration.

### 3. 🛠️ Selected Engineering Builds & Detailed Case Studies
Comprehensive architectural breakdowns, technical metrics, challenges, and live demos for 5 selected builds:
1. **TrustOS** — Explainable AI Trust Layer for Autonomous Agents (*Python, FastAPI, LLMs, Vector Search*).
2. **PulseForge AI** — Strategic Market Signal Intelligence Platform (*React, TypeScript, FastAPI, Gemini API, MongoDB*).
3. **Loksetu.ai** — Privacy-First Browser Copilot & CSC Facilitator Engine (*Chrome Extensions Manifest V3, Web APIs*).
4. **JeeraType** — Go-based Cross-Platform Terminal Typing Speed Test (*Go, Terminal UI, Web Audio API*).
5. **WASM Sandbox Package Manager** — Rust-based WebAssembly Plugin Runtime with Capability Security (*Rust, Wasmtime, WASI*).

### 4. 💫 Interactive Skills Constellation
- **3 Rotating Orbital Rings**: Continuous rotation displaying skill pills with counter-rotation to keep titles upright and legible.
- **Interactive Controls**: Toggle continuous ring rotation or pause/resume on demand.

### 5. 📄 Resume Integration & Standalone Printable Viewer
- **Printable Resume Engine**: Accessible via `/resume.html` with a 1-click **"Print / Save PDF"** export action.
- **Complete Data Sync**: Education (*JIS College of Engineering 2024–2028*), Contact (`+91 7980942750`), Skills, Projects, and Experience synced across the portfolio.

### 6. ✉️ Instant Email Composer Integration
- Connected pre-filled `mailto:` triggers pointing directly to `srinjoypramanick15@gmail.com` across TopBar, Contact Orbit section, and Footer.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework & Core** | React 19, TypeScript, Vite |
| **Styling & Layout** | Tailwind CSS v4, Vanilla CSS Design System |
| **Motion & Animation**| Framer Motion, Lucide React Icons |
| **Routing & State** | React Router DOM v7, Zustand |
| **Resume & Assets** | HTML5 Print API, High-Contrast Monochrome PIL Assets |
| **Deployment** | Vercel / Static Web Hosting |

---

## 📂 Project Directory Structure

```
Portfolio/
├── public/
│   ├── profile-bw.jpg          # High-contrast B&W profile portrait asset
│   ├── resume.html            # Standalone printable resume page
│   ├── favicon.svg            # Custom SVG favicon
│   ├── robots.txt             # SEO crawler rules
│   └── sitemap.xml            # Search engine sitemap
├── src/
│   ├── components/
│   │   ├── OrbitalHero.tsx    # Cybernetic Satellite Hero section
│   │   ├── AboutConstellation.tsx # Full-size editorial portrait & domain cards
│   │   ├── SkillOrbit.tsx     # 3-Ring rotating skill orbit component
│   │   ├── ProjectsEditorial.tsx # Selected builds editorial stack
│   │   ├── ExperienceCarousel.tsx # Experience & leadership cards
│   │   ├── HackathonsSection.tsx  # Hackathon & competition achievements
│   │   ├── ContactOrbit.tsx   # Direct contact & mailto actions
│   │   ├── TopBar.tsx         # Fixed navigation & theme toggle
│   │   └── Footer.tsx         # Portfolio footer & quick links
│   ├── data/
│   │   ├── personal.ts        # Personal info, contact, education & socials
│   │   ├── projects.ts        # Full case study data for all 5 projects
│   │   ├── skills.ts          # Technical skill nodes & category groupings
│   │   └── experience.ts      # Hackathon & community leadership entries
│   ├── pages/
│   │   ├── Home.tsx           # Primary portfolio landing page
│   │   └── ProjectDetail.tsx  # Dedicated project case study view
│   ├── App.tsx                # App routing & theme wrapper
│   ├── index.css              # Core Tailwind v4 tokens & global utilities
│   └── main.tsx               # Entry mount script
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Step-by-Step Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Codexia-afk/Codexia.portfolio.git
   cd Codexia.portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the live application.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized production assets inside the `dist/` directory.

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Socials & Contact Information

- **Email**: [srinjoypramanick15@gmail.com](mailto:srinjoypramanick15@gmail.com)
- **LinkedIn**: [linkedin.com/in/srinjoy-pramanick-2a3019309/](https://www.linkedin.com/in/srinjoy-pramanick-2a3019309/)
- **GitHub**: [github.com/Codexia-afk](https://github.com/Codexia-afk)
- **Bento**: [bento.me/srinjoy19](https://bento.me/srinjoy19)
- **Resume**: [View Printable Resume](/public/resume.html)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
