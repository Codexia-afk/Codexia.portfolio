# THE PERSONAL INTERNET // MOBILE-FIRST QUALITY ASSURANCE MATRIX
**Edition 03 — Human After All**  
**Author:** Srinjoy Pramanick (@Codexia-afk)  
**Repository:** `Codexia-afk/Codexia.portfolio`  
**Test Suite:** Responsive Layout, Viewport Scaling, Touch Targets & Virtual Keyboard QA  
**Date:** October 2026  

---

## 1. Viewport Testing Matrix

All public routes (`/`, `/hire`, `/projects/:slug`, `/privacy`, `/terms`) have been audited across 10 distinct standard viewport widths and landscape orientation:

| Viewport Width | Representative Devices | Headline Wrapping | Horizontal Scroll | Touch Targets ≥ 44px | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **320px** | iPhone SE (1st Gen), Jelly 2 | Fluid Clamp (`2.25rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **360px** | Galaxy S8, Moto G, Xperia | Fluid Clamp (`2.25rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **375px** | iPhone SE (2/3), iPhone 8/X | Fluid Clamp (`2.25rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **390px** | iPhone 12 / 13 / 14 / 15 / 16 | Scaled (`2.75rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **414px** | iPhone 11 / XR / Plus Series | Scaled (`2.75rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **430px** | iPhone 15 / 16 Pro Max | Scaled (`2.75rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **768px** | iPad Mini, Android Tablets | Mid-scale (`4.25rem`) | None (`0px` overflow) | Satisfied | **PASS** |
| **1024px**| iPad Pro, MacBook Air 11 | Full Desktop (`5.5rem`)| None (`0px` overflow) | Satisfied | **PASS** |
| **1440px**| MacBook Pro 14/16, Laptops | Editorial Grid (`5.5rem`)| None (`0px` overflow) | Satisfied | **PASS** |
| **1920px**| 1080p Desktop Displays | Max-width Clamped (`7xl`)| None (`0px` overflow) | Satisfied | **PASS** |
| **Landscape**| Phones in Landscape (667x375)| Auto-reflow / scrollable | None (`0px` overflow) | Satisfied | **PASS** |

---

## 2. Hero Component Responsiveness (`OrbitalHero.tsx`)

### 2.1 Editorial Headline Fluidity
The oversized editorial headline utilizes a multi-breakpoint scaling rule:
```html
<h1 class="font-display text-[2.25rem] min-[380px]:text-[2.75rem] sm:text-[4.25rem] lg:text-[5.5rem] ...">
  ENGINEERING
</h1>
<div class="font-display text-[2.1rem] min-[380px]:text-[2.5rem] sm:text-[4rem] lg:text-[5.15rem] ...">
  DETERMINISTIC
</div>
<div class="font-editorial text-[2.15rem] min-[380px]:text-[2.5rem] sm:text-[3.85rem] lg:text-[4.75rem] ...">
  *systems & runtimes.*
</div>
```
- **At 320px screen width**: `2.25rem` (36px) fits comfortably within the 288px safe content area (16px left + 16px right padding), with zero word clipping.
- **At 380px+ screen width**: Effortlessly scales up to `2.75rem` for impact on mainstream smartphones.
- **At 1024px+**: Reaches full architectural grandeur (`5.5rem`).
- **No `transform: scale()` hacks**: Uses native CSS layout reflow.

---

## 3. Mobile Navigation & Drawer (`TopBar.tsx`)

- **Fixed Top Bar**: Compact 64px height (`h-16`) maintains brand mark, active pulsing green status dot, PORTAL launcher button, and hamburger toggle.
- **Mobile Menu Sheet**:
  - Accessible button grid navigating chapters (01 Intent, 02 Capabilities, 03 Builds, 04 Field Notes, 05 Dispatches, 06 Contact).
  - Prominent full-width button to `/hire` (`THE HIRING DOSSIER // RECRUITER BRIEF ↗`).
  - Direct link to open "The Margins" Guestbook modal.
  - Focus and scroll-lock managed cleanly upon open/close.

---

## 4. Mobile Social Dock (`SocialDock.tsx`)

### 4.1 Touch Targets & Direct Tap Behavior
- Every social icon is rendered with a dedicated minimum touch target of **44x44px** on mobile devices (`min-w-[44px] min-h-[44px]`), meeting WCAG 2.5.5 Level AAA and WCAG 2.5.8 Level AA touch criteria.
- **Zero Double-Tap Traps**: Tapping any icon directly opens the destination profile in a new tab without delay.
- **Mobile "Vibes" Peek Sheet**: On screens `< 640px`, a dedicated pill button labeled `Vibes` allows visitors to view the dual Hindi-English microcopy jokes without obstructing normal navigation.

---

## 5. Mobile The Hiring Dossier (`/hire`)

- **30-Second Scan Priority**:
  - Hero snapshot displays verified degree (B.Tech CSE @ JIS College of Engineering, 2024–2028), CGPA (8.44/10.0), and core disciplines immediately above the fold.
  - Direct actions (View Résumé, Inspect GitHub, Contact Candidate) are stacked with touch-friendly 44px+ tap areas.
- **Proof of Work on Mobile**:
  - Flagship projects (PushGuard, TrustOS, Loksetu.ai, JeeraType, WASM Sandbox) feature tab navigation scrollable horizontally.
  - Architecture blueprints are styled in compact monospace cards with pre-formatted diagrams wrapped cleanly to avoid overflow.

---

## 6. Mobile The Margins Guestbook (`TheMarginsNotes.tsx`)

- **Virtual Keyboard Defense**: Form fields and note submission modals employ `overscroll-contain` and bottom viewport padding.
- **Safe Area Insets**: Form submit buttons maintain safe margins from the bottom edge (`pb-safe`).
- **OAuth Re-entry**: Visitor drafts are preserved in `sessionStorage` before the OAuth redirect and automatically restored upon returning to `/guestbook`.
