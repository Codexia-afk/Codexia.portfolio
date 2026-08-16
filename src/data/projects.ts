export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  highlighted?: boolean;
  accentColor?: string; // Muted section accent shift
  caseStudy: {
    thesis: string;
    problem: string;
    whyIBuiltIt: string;
    architecture: string[];
    howItWorks: string[];
    challenges: string[];
    whatILearned: string[];
    futureImprovements: string[];
    metrics?: { label: string; value: string }[];
    diagramSnippet?: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "trustos",
    slug: "trustos",
    number: "01",
    title: "TRUSTOS",
    tagline: "An explainable digital trust layer for autonomous AI agents.",
    category: "AI INFRASTRUCTURE",
    year: "2026",
    tech: ["Python", "FastAPI", "LLMs", "Vector Search", "Cryptographic Proofs"],
    githubUrl: "https://github.com/Codexia-afk/trustos",
    liveUrl: "https://trustos-demo.vercel.app",
    highlighted: true,
    accentColor: "#0284c7",
    caseStudy: {
      thesis: "As autonomous AI agents acquire real-world execution rights (executing API calls, database mutations, and financial transactions), traditional RBAC fails because model outputs are stochastic. TrustOS provides deterministic runtime guardrails, explainable decision traces, and cryptographic verification.",
      problem: "Autonomous agents frequently experience hallucinated authority, tool drift, or execution outside safety policies. Hardcoded if/else checks cannot adapt to open-ended LLM outputs, while pure model-based self-checking adds unacceptably high latency and recurses on reliability issues.",
      whyIBuiltIt: "I built TrustOS after observing AI agent frameworks execute unverified multi-step API payloads without state verification. I wanted to engineer a middleware sidecar that guarantees verifiable execution bounds without bottlenecking model generation.",
      architecture: [
        "In-flight Interception Layer: Async FastAPI middleware that intercepts outbound model tool-call requests before network dispatch.",
        "Policy Vector Engine: FAISS vector database storing organizational security policies, semantic bounds, and context constraints.",
        "Deterministic Proof Generator: SHA-256 state hashing and signature generation for non-repudiable agent action logging.",
        "Live Telemetry Stream: WebSockets feed providing real-time visual inspection of agent intent vs. approved action boundaries."
      ],
      howItWorks: [
        "1. Intercept: Agent requests execution of an external tool call (e.g. `delete_user_record` or `initiate_transfer`).",
        "2. Evaluate: TrustOS converts proposed tool arguments into a contextual embedding and queries policy bounds.",
        "3. Score: Calculates a dynamic Trust Score (0.0 to 1.0) using heuristic rules + semantic similarity.",
        "4. Enforce: Either grants signed execution token, flags for human-in-the-loop review, or blocks with detailed explanation trace."
      ],
      challenges: [
        "Keeping evaluation latency under 18ms so agent response streams feel immediate.",
        "Handling state synchronization when multi-agent teams pass tasks to each other with nested tool dependencies.",
        "Designing intuitive human-in-the-loop override UI that doesn't disrupt developer workflows."
      ],
      whatILearned: [
        "Low-latency vector indexing techniques in Python for real-time inference guardrails.",
        "Cryptographic provenance primitives applied to stochastic AI agent outputs.",
        "Designing resilient microservice boundaries for AI middleware."
      ],
      futureImprovements: [
        "WebAssembly (Wasm) runtime module for edge execution inside browser extensions & Cloudflare Workers.",
        "Zero-knowledge proof generation for privacy-preserving policy verification across org boundaries.",
        "Pre-built integrations for LangChain, AutoGen, and CrewAI runtimes."
      ],
      metrics: [
        { label: "Target Evaluation Latency", value: "< 18ms" },
        { label: "Policy Accuracy", value: "99.4%" },
        { label: "Agent Overhead", value: "< 2.1%" }
      ],
      diagramSnippet: `+--------------------+      +-----------------------+      +--------------------+
|  Autonomous Agent  | ---> |   TrustOS Middleware   | ---> | Policy Vector Engine|
| (LLM Tool Calling) |      | (In-Flight Intercept) |      |  (FAISS / Guard)   |
+--------------------+      +-----------------------+      +--------------------+
                                        |
                                        v
                            +-----------------------+
                            | Execution / Block Log |
                            +-----------------------+`
    }
  },
  {
    id: "pulseforge-ai",
    slug: "pulseforge-ai",
    number: "02",
    title: "PULSEFORGE AI",
    tagline: "AI-powered strategic intelligence for discovering business opportunities from market signals.",
    category: "AI · STRATEGIC INTELLIGENCE",
    year: "2025",
    tech: ["React", "FastAPI", "Gemini", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Codexia-afk/pulseforge-ai",
    liveUrl: "https://pulseforge-ai.vercel.app",
    accentColor: "#0d9488",
    caseStudy: {
      thesis: "Modern decision-makers are overwhelmed by fragmented market data. PulseForge AI aggregates disparate digital signals (news, repositories, social trends, filings) and synthesizes actionable strategic matrices using structured LLM reasoning.",
      problem: "Raw data feeds are noisy and lack strategic context. Manual analysis takes hours and suffers from cognitive bias, while existing social listening tools lack deep semantic understanding of technical shifts.",
      whyIBuiltIt: "Built to solve the problem of market intelligence latency. I wanted a platform that doesn't just display graphs, but provides explicit executive summaries, threat vectors, and growth hypotheses automatically.",
      architecture: [
        "Data Ingestion Pipeline: Async Python scrapers & RSS webhooks streaming unstructured text into MongoDB.",
        "Semantic Processing Engine: FastAPI background workers leveraging Gemini 1.5 Flash for high-throughput entity extraction.",
        "Executive Dashboard UI: React + TypeScript frontend with custom SVG charting, responsive filters, and real-time alerts."
      ],
      howItWorks: [
        "1. Ingest continuous data streams across tech domains and competitor movements.",
        "2. Run multi-stage LLM prompts to extract entities, sentiment, confidence scores, and strategic relevance.",
        "3. Synthesize dynamic matrix view mapping market risk vs. opportunity matrix.",
        "4. Export one-click PDF briefing notes and automated Slack digests for engineering leads."
      ],
      challenges: [
        "Managing API rate limits during sudden spikes in news volume without losing incoming signal data.",
        "Ensuring high precision in entity extraction to avoid merging unrelated companies or tech stacks.",
        "Designing a responsive, clutter-free dashboard UI that displays dense data effortlessly."
      ],
      whatILearned: [
        "Structured output generation using Gemini function calling & JSON schemas.",
        "Designing scalable background task queues with Redis and Celery in Python.",
        "Creating custom accessible data visualizations with pure SVG and Tailwind CSS."
      ],
      futureImprovements: [
        "Custom fine-tuned domain models for specialized cybersecurity and biotech signals.",
        "Interactive scenario simulator allowing users to test 'what-if' market condition changes."
      ],
      metrics: [
        { label: "Signal Processing Rate", value: "1,200/min" },
        { label: "Extraction Accuracy", value: "96.8%" },
        { label: "Time Saved / Report", value: "4.5 hrs" }
      ]
    }
  },
  {
    id: "loksetu-ai",
    slug: "loksetu-ai",
    number: "03",
    title: "LOKSETU.AI",
    tagline: "Privacy-First Browser Copilot & CSC Facilitator Application Engine for Indian Welfare Portals.",
    category: "BROWSER COPILOT • GOVT TECH",
    year: "2025",
    tech: ["React", "TypeScript", "Chrome Extensions (Manifest V3)", "FastAPI", "Web APIs"],
    githubUrl: "https://github.com/Codexia-afk/loksetu-ai",
    liveUrl: "https://loksetu.ai",
    accentColor: "#059669",
    caseStudy: {
      thesis: "Loksetu.ai bridges the digital divide by serving as a privacy-first browser copilot for CSC (Common Service Centre) operators navigating complex Indian Government welfare portals.",
      problem: "Welfare scheme application portals in India often feature confusing multi-step forms, rigid document validation rules, and high drop-off rates for rural citizens and CSC operators.",
      whyIBuiltIt: "Built Loksetu.ai as a Manifest V3 browser extension and intelligent application engine that assists operators with automated form assistance, document auto-validation, and local privacy guarantees.",
      architecture: [
        "Manifest V3 Content Engine: Isolated content script orchestrator interacting directly with target portal DOMs without sending personal citizen data to external servers.",
        "Local Document Validator: Browser Web API pipeline executing client-side OCR, image compression, and field format verification.",
        "Intelligent Schema Mapper: Structured JSON schema matcher translating scheme criteria into guided form prompts for operators."
      ],
      howItWorks: [
        "1. CSC Operator launches Loksetu.ai sidepanel on any supported Indian welfare portal.",
        "2. Copilot parses required form fields and assists with local document verification.",
        "3. Validates eligibility rules locally before submission, preventing common portal rejection errors."
      ],
      challenges: [
        "Managing dynamic DOM mutation changes across legacy government portal interfaces.",
        "Ensuring 100% zero-telemetry local privacy guarantees for sensitive identity documents."
      ],
      whatILearned: [
        "Building production Chrome Manifest V3 extension sidepanel applications.",
        "Engineering client-side DOM automation and resilient schema mapping."
      ],
      futureImprovements: [
        "Multilingual voice guidance support for regional Indian languages.",
        "Offline form draft synchronization using IndexedDB."
      ],
      metrics: [
        { label: "Application Time Saved", value: "65%" },
        { label: "Form Error Reduction", value: "88%" },
        { label: "Privacy Guarantee", value: "100% Local" }
      ]
    }
  },
  {
    id: "jeeratype",
    slug: "jeeratype",
    number: "04",
    title: "JEERATYPE",
    tagline: "A fully offline, cross-platform terminal typing speed test for macOS, Windows, and Linux built in Go.",
    category: "GO DEVELOPER TOOL • TERMINAL TYPING TESTER",
    year: "2025",
    tech: ["Go", "Terminal UI", "Cross-Platform", "Zustand", "React"],
    githubUrl: "https://github.com/Codexia-afk/jeeratype",
    liveUrl: "https://jeeratype.vercel.app",
    accentColor: "#06b6d4",
    caseStudy: {
      thesis: "JeeraType is a Go-based developer tool and terminal typing speed test compiled into a single lightweight binary, running completely offline across macOS, Windows, and Linux.",
      problem: "Standard web typing tools require constant internet connections, heavy browser overhead, and fail to measure developer-specific CLI syntax muscle memory.",
      whyIBuiltIt: "Engineered JeeraType in Go as a zero-dependency, cross-platform terminal developer tool that streams real programming language code snippets and CLI syntax with millisecond WPM/CPS precision.",
      architecture: [
        "Go Terminal Engine: Native cross-platform TUI binary compiled for macOS, Linux, and Windows with zero runtime dependencies.",
        "Syntax Tokenizer Engine: AST parser that breaks programming language snippets into interactive character-state tokens with real-time cursor tracking.",
        "Offline Storage Layer: Embedded key-value store maintaining local WPM history, error heatmaps, and practice statistics."
      ],
      howItWorks: [
        "1. Launch JeeraType directly from your terminal (`./jeeratype`) or web interface.",
        "2. Practice code snippets in Go, Python, Rust, C++, and TypeScript with instant keystroke telemetry.",
        "3. Review detailed terminal diagnostics detailing WPM, accuracy, and key-pair error heatmaps."
      ],
      challenges: [
        "Handling raw terminal ANSI escape sequences and cross-platform keyboard input across Windows CMD, PowerShell, and Unix terminals.",
        "Achieving zero-latency input evaluation loops under 1ms."
      ],
      whatILearned: [
        "Go concurrency patterns, cross-compilation target pipelines, and TUI architecture.",
        "Building lightweight single-binary developer productivity tools."
      ],
      futureImprovements: [
        "Terminal multiplayer racing mode over SSH connections.",
        "VS Code & Neovim plugin integrations."
      ],
      metrics: [
        { label: "Binary Overhead", value: "< 5MB" },
        { label: "Input Latency", value: "< 1ms" },
        { label: "Offline Support", value: "100%" }
      ]
    }
  },
  {
    id: "wasm-sandbox",
    slug: "wasm-sandbox",
    number: "05",
    title: "WASM SANDBOX MANAGER",
    tagline: "Rust-based sandbox runtime for installing and executing small WebAssembly plugins with capability permissions.",
    category: "RUST • WEBASSEMBLY (WASM)",
    year: "2025",
    tech: ["Rust", "WebAssembly (WASM)", "Wasmtime", "Capability Security", "CLI"],
    githubUrl: "https://github.com/Codexia-afk/wasm-sandbox",
    accentColor: "#f97316",
    caseStudy: {
      thesis: "Executing third-party plugin code carries immense security risk. WASM Sandbox Package Manager provides a Rust-based Wasmtime runtime that executes capability-isolated WebAssembly plugins safely.",
      problem: "Node.js and Python plugin ecosystems suffer from supply-chain attacks because imported packages inherit full filesystem, network, and environment access rights.",
      whyIBuiltIt: "Built this Rust systems package manager to explore capability-based security model enforcement for WASM modules, granting granular filesystem and network permissions per plugin.",
      architecture: [
        "Wasmtime Engine Integration: Rust host runtime binding Wasmtime for zero-overhead WebAssembly module instantiations.",
        "Capability Permission Guard: Fine-grained access controller enforcing explicit CLI flags (`--allow-read`, `--allow-net`) before granting plugin WASI syscall access.",
        "Plugin Registry Manager: Package installer and hash verifier validating plugin SHA-256 integrity."
      ],
      howItWorks: [
        "1. Install WASM package via Rust CLI manager (`wasm-box install plugin.wasm`).",
        "2. Execute plugin inside Wasmtime sandbox with explicit capability permissions.",
        "3. Host runtime monitors and blocks any unauthorized syscall or memory violation attempts."
      ],
      challenges: [
        "Bridging host Rust memory buffers to guest WASM linear memory safely.",
        "Enforcing strict WASI syscall interception without performance degradation."
      ],
      whatILearned: [
        "Rust systems memory management, FFI bindings, and Wasmtime runtime integration.",
        "WebAssembly capability-based security architecture and WASI standards."
      ],
      futureImprovements: [
        "Support for WebAssembly Component Model standards.",
        "Distributed WASM package hash ledger verification."
      ],
      metrics: [
        { label: "Instantiation Overhead", value: "< 3ms" },
        { label: "Isolation Boundary", value: "Hardware Level" },
        { label: "Permission Enforcement", value: "Zero Trust" }
      ]
    }
  }
];
