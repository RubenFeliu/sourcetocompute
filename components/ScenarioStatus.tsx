"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCampus } from "@/lib/store";
import { SCENARIOS } from "@/lib/data";

const TONE_DOT: Record<string, string> = {
  ok: "bg-greenx",
  warn: "bg-amberx",
  info: "bg-cyanx-500",
};

export default function ScenarioStatus() {
  const scenario = useCampus((s) => s.scenario);
  const blackstartStage = useCampus((s) => s.blackstartStage);
  const selected = useCampus((s) => s.selectedAsset);
  const info = SCENARIOS.find((s) => s.id === scenario)!;

  // hide when the info drawer is open (it occupies the right side)
  if (selected) return null;

  return (
    <div className="pointer-events-none absolute right-4 top-32 z-20 hidden w-[300px] md:right-8 md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario + (scenario === "blackstart" ? blackstartStage : "")}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.35 }}
          className="panel p-4"
        >
          <p className="font-mono text-[9px] uppercase tracking-wider2 text-steel-400">
            Active scenario
          </p>
          <p className="mt-0.5 font-display text-base text-steel-100">{info.name}</p>
          {scenario === "blackstart" && (
            <p className="mt-1 font-mono text-[10px] tracking-widest text-cyanx-500">
              RESTORATION STAGE {blackstartStage + 1} / 6
            </p>
          )}
          <div className="mt-3 space-y-2 border-t border-ink-700/60 pt-3">
            {info.responses.map((r, i) => (
              <motion.div
                key={`${scenario}-${r.system}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex items-start gap-2.5"
              >
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${TONE_DOT[r.tone]}`}
                />
                <p className="text-[11px] leading-snug text-steel-300">
                  <span className="font-mono text-[10px] tracking-wide text-steel-100">
                    {r.system}
                  </span>
                  <span className="text-steel-400"> — {r.action}</span>
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-3 border-t border-ink-700/60 pt-2 font-mono text-[8px] uppercase tracking-widest text-ink-500">
            Simulated response — conceptual digital twin
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
