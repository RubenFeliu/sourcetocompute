"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Cpu, GitMerge, Users } from "lucide-react";
import { useCampus } from "@/lib/store";
import { ASSETS } from "@/lib/data";

export default function InfoDrawer() {
  const selected = useCampus((s) => s.selectedAsset);
  const select = useCampus((s) => s.select);
  const asset = selected ? ASSETS[selected] : null;

  return (
    <AnimatePresence>
      {asset && (
        <motion.aside
          key={asset.id}
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 420, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="absolute right-0 top-14 z-40 flex h-[calc(100%-3.5rem)] w-full max-w-md flex-col border-l border-ink-700/70 bg-ink-950/95 backdrop-blur-xl"
        >
          <div className="flex items-start justify-between border-b border-ink-700/60 p-5">
            <div>
              <p className="eyebrow">{asset.subLabel}</p>
              <h3 className="mt-1 font-display text-2xl font-medium text-steel-100">
                {asset.label}
              </h3>
            </div>
            <button
              onClick={() => select(null)}
              className="rounded p-1 text-steel-400 transition hover:text-steel-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5">
            <section>
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                Role
              </h4>
              <p className="text-sm leading-relaxed text-steel-300">{asset.role}</p>
            </section>

            <section>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                <Cpu size={12} /> Key Systems
              </h4>
              <ul className="space-y-1.5">
                {asset.keySystems.map((k) => (
                  <li key={k} className="flex items-start gap-2 text-sm text-steel-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyanx-600" />
                    {k}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                <GitMerge size={12} /> Integration
              </h4>
              <p className="rounded border border-ink-700 bg-ink-900 p-3 font-mono text-xs leading-relaxed text-energy">
                {asset.integration}
              </p>
            </section>

            <section>
              <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
                <Users size={12} /> Typical SME Support
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {asset.smes.map((s) => (
                  <span key={s} className="chip normal-case tracking-normal">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <p className="border-t border-ink-700/60 pt-4 font-mono text-[9px] uppercase tracking-widest text-ink-500">
              Conceptual digital twin — representative systems, not project data
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
