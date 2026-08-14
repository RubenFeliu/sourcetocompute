"use client";

import { motion } from "framer-motion";

const STATUS = [
  { label: "GENERATION", color: "bg-energy" },
  { label: "GRID", color: "bg-steel-400" },
  { label: "STORAGE", color: "bg-greenx" },
  { label: "COMPUTE", color: "bg-cyanx-500" },
  { label: "CONTROLS", color: "bg-amberx" },
];

/** Static hero shown below the 3D canvas on phones — desktop uses the overlay. */
export default function MobileHero() {
  return (
    <div className="border-b border-ink-800/60 bg-ink-950 px-4 pb-8 pt-6 md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="eyebrow mb-2">Ruben V. Feliu</p>
        <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-steel-100">
          AI Data Center Power Infrastructure
        </h1>
        <p className="mt-2 font-display text-base text-cyanx-500">
          From Energy Source to Compute.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-steel-300">
          Integrated strategy, engineering, controls, cybersecurity, program
          delivery and operational readiness for next-generation AI
          infrastructure.
        </p>
        <p className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-greenx">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-greenx" />
          Available for advisory engagements
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a href="#campus" className="btn-primary !px-4 !py-2 text-sm">
            Explore the Campus
          </a>
          <a href="#advisory" className="btn-ghost !px-4 !py-2 text-sm">
            Advisory Services
          </a>
          <a href="#delivery" className="btn-ghost !px-4 !py-2 text-sm">
            Delivery Model
          </a>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {STATUS.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${s.color} animate-pulse`} />
              <span className="font-mono text-[9px] tracking-wider2 text-steel-400">
                {s.label}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-ink-500">
          Simulated campus — not operating measurements
        </p>
      </motion.div>
    </div>
  );
}
