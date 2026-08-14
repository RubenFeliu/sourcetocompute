"use client";

import { motion } from "framer-motion";
import { Building2, ShieldAlert, Network } from "lucide-react";
import { Section, SectionHeader } from "./Shared";

const PRIMARY = [
  "EMS", "SCADA", "Operator HMI", "Historian", "Generation dispatch",
  "Switchyard control", "Alarm system", "Reporting", "Engineering workstation",
];

const BACKUP = [
  "Redundant operator access", "Backup EMS / SCADA capability",
  "Emergency procedures", "Disaster-recovery access", "Alternate communications",
];

export default function ControlArch() {
  return (
    <Section id="control-arch" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Control architecture"
        title="Main + Backup Control"
        sub="Operations continuity is engineered, not assumed. A geographically separated backup control center with redundant OT network paths keeps the campus operable through loss of the primary facility."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* primary */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel border-cyanx-600/40 p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <Building2 size={20} className="text-cyanx-500" />
            <div>
              <p className="font-mono text-[10px] tracking-wider2 text-cyanx-500">PRIMARY</p>
              <h3 className="font-display text-xl text-steel-100">Primary Control Center</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PRIMARY.map((s) => (
              <div key={s} className="rounded border border-ink-700/70 bg-ink-900/70 px-3 py-2 text-xs text-steel-300">
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* redundant network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-2 px-2 py-4"
        >
          <Network size={20} className="text-amberx" />
          <div className="hidden h-24 w-px bg-gradient-to-b from-cyanx-600/60 via-amberx/60 to-amberx/60 lg:block" />
          <div className="h-px w-24 bg-gradient-to-r from-cyanx-600/60 to-amberx/60 lg:hidden" />
          <p className="max-w-[120px] text-center font-mono text-[9px] uppercase leading-relaxed tracking-widest text-steel-400">
            Redundant OT networks · Diverse paths
          </p>
        </motion.div>

        {/* backup */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel border-amberx/40 p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <ShieldAlert size={20} className="text-amberx" />
            <div>
              <p className="font-mono text-[10px] tracking-wider2 text-amberx">BACKUP / DISASTER RECOVERY</p>
              <h3 className="font-display text-xl text-steel-100">Backup Control Center</h3>
            </div>
          </div>
          <div className="grid gap-2">
            {BACKUP.map((s) => (
              <div key={s} className="rounded border border-ink-700/70 bg-ink-900/70 px-3 py-2 text-xs text-steel-300">
                {s}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-steel-400">
            Geographically separated from the primary facility — a deliberate
            siting decision visible in the campus masterplan.
          </p>
        </motion.div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl rounded-md border border-ink-700/60 bg-ink-900/60 p-4 text-center text-xs leading-relaxed text-steel-400">
        Exact redundancy and failover architecture is project-specific and should be
        established through the project&apos;s availability, cybersecurity and
        operational requirements.
      </p>
    </Section>
  );
}
