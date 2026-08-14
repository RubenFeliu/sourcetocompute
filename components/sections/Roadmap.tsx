"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import { PHASES } from "@/lib/data";
import { Section, SectionHeader } from "./Shared";

export default function Roadmap() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];

  return (
    <Section id="delivery" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Project delivery roadmap"
        title="From Concept to Continuous Operations"
        sub="Seven phases connect strategy, procurement, engineering, integration, commissioning and operations under one program structure."
      />

      {/* timeline — track spans exactly from first to last node center */}
      <div className="relative mb-10">
        <div
          className="absolute top-5 hidden h-[2px] rounded-full bg-ink-600 md:block"
          style={{ left: `${100 / 14}%`, right: `${100 / 14}%` }}
        />
        <div
          className="absolute top-5 hidden md:block"
          style={{ left: `${100 / 14}%`, right: `${100 / 14}%` }}
        >
          <motion.div
            className="h-[2px] rounded-full bg-gradient-to-r from-cyanx-600 to-cyanx-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            animate={{ width: `${(active / (PHASES.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {PHASES.map((p, i) => (
            <button key={p.num} onClick={() => setActive(i)} className="group relative flex flex-col items-center gap-2 md:items-center">
              <span
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-all ${
                  i === active
                    ? "border-cyanx-500 bg-cyanx-600/20 text-cyanx-400 shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]"
                    : i < active
                      ? "border-cyanx-600/50 bg-ink-800 text-cyanx-600"
                      : "border-ink-600 bg-ink-900 text-steel-400 group-hover:border-ink-500"
                }`}
              >
                {p.num}
              </span>
              <span
                className={`text-center text-[11px] leading-tight ${
                  i === active ? "text-steel-100" : "text-steel-400"
                }`}
              >
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* phase detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.num}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="panel grid gap-8 p-6 md:grid-cols-2 md:p-8"
        >
          <div>
            <p className="eyebrow">Phase {phase.num}</p>
            <h3 className="mt-1 font-display text-2xl text-steel-100">{phase.name}</h3>
            <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {phase.activities.map((a) => (
                <div key={a} className="flex items-start gap-2 text-sm text-steel-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyanx-600" />
                  {a}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
              <FileCheck2 size={13} /> Representative outputs
            </h4>
            <div className="grid gap-2">
              {phase.outputs.map((o) => (
                <div
                  key={o}
                  className="rounded border border-ink-700/70 bg-ink-900/70 px-4 py-3 text-sm text-steel-200"
                >
                  {o}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
