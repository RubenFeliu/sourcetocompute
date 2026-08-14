"use client";

import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { SCHEDULE_LANES, MILESTONES, SCHEDULE_MONTHS } from "@/lib/data";
import { Section, SectionHeader } from "./Shared";

const pct = (m: number) => ((m - 1) / SCHEDULE_MONTHS) * 100;
const widthPct = (start: number, end: number) =>
  ((end - start + 1) / SCHEDULE_MONTHS) * 100;

export default function Schedule() {
  return (
    <Section id="schedule" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Commissioning & energization"
        title="A Conceptual Commissioning Schedule"
        sub="Testing and energization are a program of their own — sequenced so the switchyard backfeeds first, generation stabilizes against load banks, controls prove the campus end-to-end, and compute ramps in phases. Representative sequence and durations; every project develops its own integrated schedule."
      />

      <div className="panel overflow-x-auto p-5 md:p-6">
        <div className="min-w-[860px]">
          {/* month header */}
          <div className="mb-1 flex">
            <div className="w-44 shrink-0" />
            <div className="relative flex-1">
              <div className="grid" style={{ gridTemplateColumns: `repeat(${SCHEDULE_MONTHS}, 1fr)` }}>
                {Array.from({ length: SCHEDULE_MONTHS }, (_, i) => (
                  <div key={i} className="border-l border-ink-700/40 pb-1 text-center font-mono text-[9px] text-steel-500">
                    M{i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* milestone track */}
          <div className="mb-3 flex items-center">
            <div className="w-44 shrink-0 pr-3 text-right font-mono text-[9px] uppercase tracking-widest text-amberx">
              Milestones
            </div>
            <div className="relative h-9 flex-1">
              <div className="absolute inset-x-0 top-1/2 h-px bg-ink-700/60" />
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: -6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="group absolute top-0 flex h-full flex-col items-center"
                  style={{ left: `${pct(m.month) + 100 / SCHEDULE_MONTHS / 2}%` }}
                >
                  <span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-wide text-steel-400 opacity-0 transition group-hover:opacity-100">
                    {m.name}
                  </span>
                  <span className="mt-auto mb-auto block h-2.5 w-2.5 rotate-45 border border-amberx bg-amberx/30 transition group-hover:bg-amberx" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* lanes */}
          <div className="space-y-2">
            {SCHEDULE_LANES.map((lane, li) => (
              <div key={lane.name} className="flex items-center">
                <div className="w-44 shrink-0 pr-3 text-right">
                  <p className="text-[11px] font-medium leading-tight text-steel-200">{lane.name}</p>
                </div>
                <div className="relative h-8 flex-1 rounded bg-ink-850/60">
                  {/* month grid lines */}
                  <div
                    className="pointer-events-none absolute inset-0 grid"
                    style={{ gridTemplateColumns: `repeat(${SCHEDULE_MONTHS}, 1fr)` }}
                  >
                    {Array.from({ length: SCHEDULE_MONTHS }, (_, i) => (
                      <div key={i} className="border-l border-ink-700/30" />
                    ))}
                  </div>
                  {lane.bars.map((bar, bi) => (
                    <motion.div
                      key={bar.name}
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: li * 0.06 + bi * 0.1, duration: 0.55, ease: "easeOut" }}
                      title={`${bar.name} · M${bar.start}–M${bar.end}`}
                      className="group absolute top-1.5 h-5 origin-left cursor-default rounded-[3px]"
                      style={{
                        left: `${pct(bar.start)}%`,
                        width: `${widthPct(bar.start, bar.end)}%`,
                        background: `linear-gradient(180deg, ${lane.color}cc, ${lane.color}88)`,
                        boxShadow: `0 0 14px -4px ${lane.color}88`,
                      }}
                    >
                      <span className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap px-2 text-[9px] font-medium text-ink-950/90">
                        {bar.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-ink-700/60 pt-4">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-steel-400">
              <span className="block h-2 w-2 rotate-45 border border-amberx bg-amberx/30" />
              Milestone (hover for name)
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-steel-400">
              <Flag size={10} className="text-amberx" />
              Backfeed M8 · First fire M9 · Island test M14 · Phase 1 COD M15 · Full COD M18
            </span>
            <span className="ml-auto font-mono text-[8px] uppercase tracking-widest text-ink-500">
              Conceptual sequence — not a project schedule
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
