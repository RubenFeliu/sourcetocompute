"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const STATUS = [
  { label: "GENERATION", color: "bg-energy" },
  { label: "GRID", color: "bg-steel-400" },
  { label: "STORAGE", color: "bg-greenx" },
  { label: "COMPUTE", color: "bg-cyanx-500" },
  { label: "CONTROLS", color: "bg-amberx" },
];

export default function HeroOverlay() {
  return (
    <>
      {/* Mode badge */}
      <div className="pointer-events-none absolute right-3 top-16 z-20 md:right-8 md:top-20">
        <span className="chip border-cyanx-600/40 text-cyanx-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyanx-500" />
          Conceptual Digital Twin
        </span>
      </div>

      {/* Hero copy — desktop overlay only; mobile gets a static hero below the canvas */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent pb-8 pt-24 md:block">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-3">Ruben V. Feliu</p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-steel-100 md:text-6xl">
              AI Data Center
              <br />
              Power Infrastructure
            </h1>
            <p className="mt-3 font-display text-lg text-cyanx-500 md:text-xl">
              From Energy Source to Compute.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel-300 md:text-base">
              Integrated strategy, engineering, controls, cybersecurity, program
              delivery and operational readiness for next-generation AI
              infrastructure.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-greenx">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-greenx" />
              Available for advisory engagements
            </p>
            <div className="pointer-events-auto mt-4 flex flex-wrap gap-3">
              <a href="#campus-controls" className="btn-primary">
                Explore the Campus
              </a>
              <a href="#advisory" className="btn-ghost">
                Advisory Services
              </a>
              <a href="#delivery" className="btn-ghost">
                View Delivery Model
              </a>
            </div>
          </motion.div>

          {/* status indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {STATUS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.color} animate-pulse`} />
                <span className="font-mono text-[10px] tracking-wider2 text-steel-400">
                  {s.label}
                </span>
              </div>
            ))}
            <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-ink-500">
              Simulated campus — not operating measurements
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 text-steel-400 md:block"
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </>
  );
}
