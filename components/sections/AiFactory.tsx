"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FACTORY_LAYERS } from "@/lib/data";
import { Section, SectionHeader } from "./Shared";

export default function AiFactory() {
  const [active, setActive] = useState<string>("power");
  const activeLayer = FACTORY_LAYERS.find((l) => l.id === active)!;

  return (
    <Section id="ai-factory">
      <SectionHeader
        eyebrow="What is an AI Factory?"
        title="More Than a Data Center"
        sub="An AI Factory is infrastructure engineered to continuously transform energy, data and computing resources into AI capability. Unlike conventional enterprise data centers, large AI campuses can concentrate extraordinary compute density and create highly dynamic electrical and thermal demands."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* interactive stack */}
        <div className="space-y-2">
          {FACTORY_LAYERS.map((l, i) => (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setActive(l.id)}
              onClick={() => setActive(l.id)}
              className={`group flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                active === l.id
                  ? "border-cyanx-600/50 bg-ink-800/80 shadow-[0_0_30px_-12px_rgba(34,211,238,0.35)]"
                  : "border-ink-700/60 bg-ink-900/50 hover:border-ink-600"
              }`}
            >
              <span
                className="h-10 w-1 rounded-full transition-all"
                style={{ background: l.color, opacity: active === l.id ? 1 : 0.35 }}
              />
              <div className="flex-1">
                <p className="font-mono text-xs tracking-wider2 text-steel-100">{l.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-steel-400">{l.blurb}</p>
              </div>
              <span className="font-mono text-[10px] text-ink-500">0{FACTORY_LAYERS.indexOf(l) + 1}</span>
            </motion.button>
          ))}
        </div>

        {/* supporting systems */}
        <div className="panel sticky top-24 h-fit p-6">
          <p className="eyebrow mb-1">Supporting systems</p>
          <h3 className="font-display text-2xl text-steel-100" style={{ color: activeLayer.color }}>
            {activeLayer.name}
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {activeLayer.systems.map((s) => (
              <motion.div
                key={`${activeLayer.id}-${s}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded border border-ink-700/70 bg-ink-900/70 px-3 py-2.5 text-sm text-steel-300"
              >
                {s}
              </motion.div>
            ))}
          </div>
          <p className="mt-5 border-t border-ink-700/60 pt-4 text-xs leading-relaxed text-steel-400">
            Each layer only delivers value when engineered, integrated, tested and
            operated as part of one coordinated platform — power to compute.
          </p>
        </div>
      </div>
    </Section>
  );
}
