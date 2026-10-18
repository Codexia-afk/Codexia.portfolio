# THE PERSONAL INTERNET // DESIGN SYSTEM & TOKENS
**Edition 03 — Human After All**  
**Author:** Srinjoy Pramanick (@Codexia-afk)  
**Repository:** `Codexia-afk/Codexia.portfolio`  
**Design Philosophy:** Independent Creative Studio Craft × Deterministic Systems Engineering  
**Date:** October 2026  

---

## 1. Aesthetic Thesis: Human After All

The design language rejects generic AI-generated landing page tropes (excessive floating glass spheres, garish neon gradients, and cookie-cutter SaaS cards) in favor of:
- **Disciplined Editorial Typography**: Expressive contrast between geometric bold headlines and italic editorial serifs.
- **Structured Technical Grid**: A mathematical 6rem x 6rem Cartesian blueprint reminiscent of systems architecture schematics.
- **Curated Tone Harmony**: Warm ivory on near-black, illuminated by a restrained lime-green runtime accent.
- **Human Interactions**: Contextual microcopy through `HumanLayer`, injecting witty engineering truth and cultural authenticity.

---

## 2. Typographic Hierarchy

Four typefaces work in strict, harmonious specialization:

| Role | Font Family | Class Name | Weight / Style | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | Clash Display | `font-display` | 600, 700 Bold | Oversized editorial headlines, chapter numbers, project titles |
| **Editorial** | Instrument Serif | `font-editorial` | 400 Italic | Expressive lowercase phrases (`*systems & runtimes.*`, `*worth shipping.*`) |
| **Body** | Satoshi | `font-sans` | 400, 500 Regular | Case study narratives, thesis descriptions, recruiter quick view |
| **Technical** | JetBrains Mono | `font-mono` | 500, 600, 700 | Telemetry, CLI blueprints, status badges, timestamps, tags |

### Typographic Scales (CSS Clamps)
```css
--type-hero: clamp(2.75rem, 6vw + 1rem, 6.75rem);
--type-section: clamp(2.125rem, 4vw + 0.5rem, 4.5rem);
--type-project: clamp(1.625rem, 2.75vw + 0.5rem, 3.5rem);
--type-subheading: clamp(1.25rem, 1.5vw + 0.5rem, 2rem);
--type-body: clamp(1rem, 0.25vw + 0.92rem, 1.125rem);
--type-mono-sm: clamp(0.6875rem, 0.1vw + 0.65rem, 0.8125rem);
```

---

## 3. Color Tokens

### 3.1 Dark Mode (Primary Palette)
- **Canvas (`--bg-primary`)**: `#131312` (Deep Obsidian / Near-Black)
- **Container Level 1 (`--bg-secondary`)**: `#1a1917` (Dark Charcoal)
- **Card Level 2 (`--bg-card`)**: `#201f1c` (Warm Graphite)
- **Card Level 3 (`--bg-tertiary`)**: `#272622` (Subtle Elevation)
- **Borders (`--border-subtle`)**: `#2d2c27` (Fine Muted Border)
- **Border Focus (`--border-strong`)**: `#494841` (High-Contrast Separator)
- **Text Primary (`--text-primary`)**: `#f0ede5` (Warm Editorial Ivory)
- **Text Secondary (`--text-secondary`)**: `#a8a69f` (Muted Sandstone)
- **Text Telemetry (`--text-muted`)**: `#6e6b63` (Subtle Metadata)
- **Accent Primary (`--accent`)**: `#d5ef9c` (Vibrant Lime-Green)
- **Accent Light (`--accent-light`)**: `rgba(213, 239, 156, 0.12)` (Soft Highlighter)

### 3.2 Light Mode (Secondary Atelier Palette)
- **Canvas (`--bg-primary`)**: `#f8f6f0` (Alabaster Warm Cream)
- **Container Level 1 (`--bg-secondary`)**: `#eeeae0` (Parchment Tint)
- **Card Level 2 (`--bg-card`)**: `#f4efe5` (Paper Card)
- **Borders (`--border-subtle`)**: `#dcd6c8` (Subtle Ink Line)
- **Border Focus (`--border-strong`)**: `#bfb8a6` (Solid Rule)
- **Text Primary (`--text-primary`)**: `#1a1917` (Deep Ink)
- **Text Secondary (`--text-secondary`)**: `#58554d` (Editorial Charcoal)
- **Text Telemetry (`--text-muted`)**: `#8c877b` (Archival Gray)
- **Accent Primary (`--accent`)**: `#486616` (Deep Forest Olive)

---

## 4. Architectural Grid & Spatial System

- **Background Architectural Rules**:
  ```css
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 6rem 6rem;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 90%);
  ```
- **Max Width**: `max-w-7xl` (80rem / 1280px) centered with safe gutters: `px-4 sm:px-6 lg:px-12`.
- **Card Corner Radii**: `rounded-md` (buttons/pills), `rounded-xl` / `rounded-2xl` (containers).

---

## 5. Motion Tokens & Reduced-Motion

Micro-interactions are engineered with restrained physics:
- **Hover Scale**: `scale: 1.02` to `1.05` maximum.
- **Spring Curves**: `[0.16, 1, 0.3, 1]` for crisp, authoritative deceleration.
- **Accessibility Guarantee**: Every animated component checks `useReducedMotion()`. When `prefers-reduced-motion` is active:
  - Durations are clamped to `<= 0.2s`.
  - Transform displacements (`y: 100%`, rotations) collapse to subtle opacity fades.
  - Kinetic marquees remain static or respect motion preferences.
