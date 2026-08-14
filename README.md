# Ruben V. Feliu — AI Data Center Power Campus Experience

A premium, interactive, client-facing web experience demonstrating the full power-to-compute ecosystem required to deliver a large-scale AI Data Center / AI Factory Power Campus. Centerpiece: a real-time interactive 3D campus (conceptual digital twin) built with React Three Fiber.

## Run locally

Requires [Node.js](https://nodejs.org) 18.17+ (20+ recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Stack

Next.js 14 · TypeScript · React 18 · Tailwind CSS · React Three Fiber / Three.js · @react-three/drei · Framer Motion · Zustand · Lucide icons.

## Experience map

- **Campus (hero)** — interactive 3D power campus: AI Factory (6 data halls, cooling, electrical yards), on-site generation (simple-cycle + combined-cycle), BESS with animated state of charge, solar PV, detailed HV switchyard, transmission to utility POI, main + geographically separated backup control centers.
  - Orbit / pan / zoom, click any asset → camera fly-to + engineering info drawer
  - **Power Flow** toggle — animated directional flows
  - **OT Network** toggle — fiber / protection-signaling / emergency-path arcs
  - **Operating Scenarios** — Normal, Grid Connected, Islanded, Generation Contingency, Renewable Optimization, Black Start (staged), AI Load Event
  - **Layers** — emphasize a discipline, dim the rest, see SMEs / disciplines / phases
  - Quality levels: High / Medium / Performance (auto-detected)
- **AI Factory** — five-layer interactive stack (Power, Facility, Compute, Control, Operations)
- **Pillars** — the eight things success requires
- **Architecture** — energy-to-compute chain with hoverable digital control layer
- **Control** — main + backup control architecture
- **Workstreams** — 13-cluster team explorer; "Show on campus" highlights the assets each workstream touches
- **Delivery** — 7-phase roadmap (Phase 0 → 6) with activities and outputs
- **Operations / About**

All displayed conditions are simulated and labeled **CONCEPTUAL DIGITAL TWIN** — no real measurements, no completed-project claims, no corporate branding.
