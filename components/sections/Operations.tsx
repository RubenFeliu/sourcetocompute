"use client";

import { motion } from "framer-motion";
import {
  MonitorCheck, Wrench, ShieldCheck, LineChart, GraduationCap, Repeat,
} from "lucide-react";
import { Section, SectionHeader } from "./Shared";

const OPS = [
  {
    icon: MonitorCheck,
    title: "Control-Room Operations",
    body: "24/7 operating model, operator HMIs, alarm governance, shift procedures and situational awareness across power, facility and compute domains.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Monitoring & Response",
    body: "Continuous OT security monitoring, SOC integration, vulnerability management and rehearsed incident-response playbooks.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Reliability",
    body: "Reliability-centered maintenance, asset-performance management, spares strategy and outage planning aligned with compute demand.",
  },
  {
    icon: LineChart,
    title: "Performance & Optimization",
    body: "KPI frameworks, energy optimization, dispatch tuning and digital-twin-assisted scenario analysis for continuous improvement.",
  },
  {
    icon: GraduationCap,
    title: "Training & Readiness",
    body: "Operator qualification, simulator-based scenario training, procedure governance and operational readiness verification before energization.",
  },
  {
    icon: Repeat,
    title: "Managed Services",
    body: "Long-term managed operations models — staffing, governance, reporting and continuous capability uplift across the campus lifecycle.",
  },
];

export default function Operations() {
  return (
    <Section id="operations" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Operations"
        title="Energization Is the Beginning, Not the End"
        sub="An AI power campus creates value only while it operates — reliably, securely and efficiently. Operational readiness is engineered from Phase 0, not retrofitted after commissioning."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPS.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            className="panel p-5 transition-colors hover:border-cyanx-600/40"
          >
            <o.icon size={18} className="mb-3 text-greenx" />
            <h3 className="font-display text-lg text-steel-100">{o.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-400">{o.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
