"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, ChevronRight } from "lucide-react";
import { WORKSTREAMS, ASSETS, type AssetId } from "@/lib/data";
import { useCampus } from "@/lib/store";
import { Section, SectionHeader } from "./Shared";

export default function Workstreams() {
  const [openId, setOpenId] = useState<string>(WORKSTREAMS[0].id);
  const setWorkstream = useCampus((s) => s.setWorkstream);
  const active = WORKSTREAMS.find((w) => w.id === openId)!;

  const showOnCampus = (id: string) => {
    setWorkstream(id);
    document.getElementById("campus")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="workstreams" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Workstream / team explorer"
        title="An Integrated Program Requires an Integrated Team"
        sub="Power-to-compute programs require specialists working across shared requirements, interfaces, testing and operational outcomes. Select a workstream to see its specialists, capabilities — and the campus assets it touches."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* cluster list */}
        <div className="max-h-[640px] space-y-1.5 overflow-y-auto pr-1">
          {WORKSTREAMS.map((w) => (
            <button
              key={w.id}
              onClick={() => setOpenId(w.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-all ${
                openId === w.id
                  ? "border-cyanx-600/50 bg-ink-800/80"
                  : "border-ink-700/60 bg-ink-900/40 hover:border-ink-600"
              }`}
            >
              <span
                className={`font-mono text-xs ${
                  openId === w.id ? "text-cyanx-500" : "text-ink-500"
                }`}
              >
                {w.num}
              </span>
              <span className="flex-1 text-sm text-steel-200">{w.name}</span>
              <ChevronRight
                size={14}
                className={openId === w.id ? "text-cyanx-500" : "text-ink-500"}
              />
            </button>
          ))}
        </div>

        {/* detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="panel h-fit p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{active.num} — Workstream</p>
                <h3 className="mt-1 font-display text-2xl text-steel-100">{active.name}</h3>
              </div>
              <button onClick={() => showOnCampus(active.id)} className="btn-ghost !px-3 !py-1.5 text-xs">
                <MapPin size={13} /> Show on campus
              </button>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                  Specialists
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {active.smes.map((s) => (
                    <span key={s} className="chip normal-case tracking-normal">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                  Capabilities
                </h4>
                <ul className="space-y-1.5">
                  {active.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-steel-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-energy" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-ink-700/60 pt-4">
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                Campus assets touched
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {active.assets.map((a: AssetId) => (
                  <span key={a} className="chip border-energy/40 text-energy">
                    {ASSETS[a].label}
                  </span>
                ))}
              </div>
              {active.note && (
                <p className="mt-3 text-[11px] leading-relaxed text-amberx/80">{active.note}</p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
