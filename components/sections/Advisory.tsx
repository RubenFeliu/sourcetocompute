"use client";

import { motion } from "framer-motion";
import {
  Building, Zap, HardHat, Cpu, Landmark, Compass, ClipboardList,
  SearchCheck, FileSearch, ShieldCheck, Rocket, Mail, Linkedin, ArrowRight,
} from "lucide-react";
import { Section, SectionHeader } from "./Shared";

const AUDIENCES = [
  {
    icon: Cpu,
    who: "Hyperscalers & AI Developers",
    need: "Speed to power, site strategy, energy architecture and delivery certainty for multi-hundred-MW campuses.",
  },
  {
    icon: Zap,
    who: "Utilities & Power Producers",
    need: "Serving hyperscale load — interconnection strategy, grid impacts, co-located generation and new commercial models.",
  },
  {
    icon: HardHat,
    who: "EPCs & OEMs",
    need: "Winning and delivering integrated power-to-compute scope — controls, interfaces and commissioning done right.",
  },
  {
    icon: Building,
    who: "Technology Providers",
    need: "Positioning EMS, BESS, controls, cyber and digital-twin products into AI infrastructure programs.",
  },
  {
    icon: Landmark,
    who: "Investors & Lenders",
    need: "Independent technical judgment on feasibility, risk, vendor claims and delivery credibility before capital commits.",
  },
];

const SERVICES = [
  {
    icon: Compass,
    name: "Strategic & Executive Advisory",
    blurb: "Fractional senior leadership for energy-to-compute strategy — architecture direction, delivery models, make-vs-buy and roadmap decisions at executive level.",
  },
  {
    icon: ClipboardList,
    name: "Owner's Engineer / Program Advisor",
    blurb: "Representing the owner's interest across engineering, vendors, interfaces and schedule — from Basis of Design through energization.",
  },
  {
    icon: FileSearch,
    name: "RFP & Vendor Selection",
    blurb: "Requirements, RFP packages, technical evaluation frameworks and negotiation support for EMS, BESS, generation, controls and integration scopes.",
  },
  {
    icon: SearchCheck,
    name: "Independent Design & Program Review",
    blurb: "Structured review of architectures, one-lines, controls, cyber posture and integration plans — surfacing risk while it is still cheap to fix.",
  },
  {
    icon: Landmark,
    name: "Technical Due Diligence",
    blurb: "For investors and acquirers: grounded assessment of power strategy, technology selections, delivery risk and operational readiness.",
  },
  {
    icon: ShieldCheck,
    name: "Commissioning & Readiness Advisory",
    blurb: "Test strategy, FAT/SAT/SIT/UAT governance, load-bank and islanding test planning, control-room readiness and cutover confidence.",
  },
];

export default function Advisory() {
  return (
    <Section id="advisory" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Advisory services"
        title="Bring This Systems View Into Your Program"
        sub="Everything on this page — the campus, the workstreams, the delivery model — reflects how I work: one integrated view from energy source to compute workload. I advise organizations across the AI infrastructure ecosystem at exactly the seams where programs succeed or fail."
      />

      {/* who I work with */}
      <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={a.who}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="panel p-4 transition-colors hover:border-cyanx-600/40"
          >
            <a.icon size={16} className="mb-2.5 text-energy" />
            <p className="text-sm font-semibold text-steel-100">{a.who}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-steel-400">{a.need}</p>
          </motion.div>
        ))}
      </div>

      {/* engagement models */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            className="group panel relative overflow-hidden p-5 transition-colors hover:border-cyanx-600/50"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanx-600/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="mb-3 flex items-center justify-between">
              <s.icon size={18} className="text-cyanx-500" />
              <span className="font-mono text-[10px] text-ink-500">0{i + 1}</span>
            </div>
            <h3 className="font-display text-lg text-steel-100">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-400">{s.blurb}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA band */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-12 overflow-hidden rounded-xl border border-cyanx-600/30 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-8 md:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyanx-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-energy/10 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-greenx">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-greenx" />
              Available for advisory engagements
            </p>
            <h3 className="font-display text-2xl font-medium tracking-tight text-steel-100 md:text-3xl">
              Building, serving or investing in AI power infrastructure?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel-400 md:text-base">
              A first conversation costs nothing — and usually surfaces the two or
              three integration risks that matter most to your program.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <a
              href="mailto:rubenvfeliu@gmail.com?subject=Advisory%20inquiry%20—%20AI%20power%20infrastructure"
              className="btn-primary"
            >
              <Mail size={15} /> Start a conversation
            </a>
            <a
              href="https://www.linkedin.com/in/rubenfeliu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Linkedin size={15} /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </motion.div>

      <p className="mt-6 flex items-center gap-2 text-xs text-steel-400">
        <Rocket size={13} className="text-cyanx-500" />
        Typical engagements range from a focused two-week review to ongoing fractional advisory.
        <a href="#about" className="ml-1 inline-flex items-center gap-1 text-cyanx-500 hover:text-cyanx-400">
          More about me <ArrowRight size={12} />
        </a>
      </p>
    </Section>
  );
}
