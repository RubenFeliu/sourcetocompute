"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { Section, SectionHeader } from "./Shared";

const CHAIN = [
  "Fuel / Renewable Resource",
  "Generation",
  "GSU / Collector System",
  "HV Switchyard",
  "Campus Substation / PCC",
  "AI Data Center Electrical Distribution",
  "UPS / Power Conversion",
  "GPU Compute",
];

const DIGITAL = [
  "EMS / Microgrid",
  "DCS / PLC",
  "SCADA",
  "Protection & Control",
  "Historian",
  "DCIM",
  "Compute Orchestration",
  "Cyber / SOC",
  "Digital Twin",
];

// which digital systems supervise which physical stages (by index)
const LINKS: Record<string, number[]> = {
  "EMS / Microgrid": [1, 2, 3, 4],
  "DCS / PLC": [0, 1, 2],
  "SCADA": [1, 3, 4, 5],
  "Protection & Control": [1, 2, 3, 4, 5],
  "Historian": [1, 3, 5, 7],
  "DCIM": [5, 6, 7],
  "Compute Orchestration": [7],
  "Cyber / SOC": [1, 3, 4, 5, 6, 7],
  "Digital Twin": [0, 1, 2, 3, 4, 5, 6, 7],
};

export default function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null);
  const linked = hovered ? LINKS[hovered] ?? [] : [];

  return (
    <Section id="architecture" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="System architecture"
        title="Energy-to-Compute Architecture"
        sub="One continuous engineered chain — physical power delivery below, the digital control layer above. Hover a control system to see what it supervises."
      />

      {/* digital layer */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {DIGITAL.map((d) => (
          <button
            key={d}
            onMouseEnter={() => setHovered(d)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[11px] tracking-wide transition-all ${
              hovered === d
                ? "border-amberx/70 bg-amberx/10 text-amberx"
                : "border-ink-700 bg-ink-900/70 text-steel-300 hover:border-ink-600"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* connective glow */}
      <div className="mx-auto mb-6 h-8 w-px bg-gradient-to-b from-amberx/50 to-cyanx-600/50" />

      {/* physical chain */}
      <div className="flex flex-wrap items-stretch justify-center gap-2">
        {CHAIN.map((c, i) => {
          const hot = linked.includes(i);
          return (
            <div key={c} className="flex items-center gap-2">
              <motion.div
                animate={{
                  borderColor: hot ? "rgba(245,165,36,0.8)" : "rgba(40,49,63,0.7)",
                  boxShadow: hot ? "0 0 24px -6px rgba(245,165,36,0.4)" : "0 0 0 rgba(0,0,0,0)",
                }}
                className="flex h-full min-w-[120px] max-w-[150px] items-center justify-center rounded-lg border bg-ink-900/80 px-3 py-3 text-center text-xs leading-snug text-steel-200"
              >
                {c}
              </motion.div>
              {i < CHAIN.length - 1 && (
                <ArrowRight size={14} className="shrink-0 text-cyanx-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* side couplings */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="panel flex items-center gap-3 px-4 py-2.5 text-xs text-steel-300">
          <span className="font-mono text-greenx">BESS</span>
          <ArrowLeftRight size={13} className="text-greenx" />
          <span>Campus Power System</span>
        </div>
        <div className="panel flex items-center gap-3 px-4 py-2.5 text-xs text-steel-300">
          <span className="font-mono text-steel-400">Utility Grid</span>
          <ArrowLeftRight size={13} className="text-steel-400" />
          <span className="font-mono text-steel-400">POI</span>
          <ArrowLeftRight size={13} className="text-steel-400" />
          <span>Campus Switchyard</span>
        </div>
      </div>
    </Section>
  );
}
