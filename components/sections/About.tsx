"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Linkedin, Globe } from "lucide-react";
import { Section, SectionHeader } from "./Shared";

const DOMAINS = [
  "AI data center / AI factory power", "Utility interconnection & transmission",
  "HV substations & switchyards", "On-site generation", "BESS & solar PV",
  "Microgrids & islanded operation", "EMS / SCADA / DCS / PLC",
  "Protection & control", "OT networking & telecom", "OT cybersecurity",
  "UPS / PDU / cooling / DCIM", "Digital twins & data platforms",
  "Testing & commissioning", "Program & vendor management",
  "Requirements management", "Operational readiness & managed operations",
  "Reliability & resiliency", "Power quality & dynamic load behavior",
];

export default function About() {
  return (
    <Section id="about" className="border-t border-ink-800/60">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative shrink-0"
            >
              <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-ink-600/70 shadow-[0_0_40px_-12px_rgba(34,211,238,0.25)] md:h-52 md:w-52">
                <Image
                  src="/ruben.jpg"
                  alt="Ruben V. Feliu"
                  fill
                  sizes="(min-width: 768px) 13rem, 11rem"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-cyanx-600/40 bg-ink-950/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider2 text-cyanx-500">
                Ruben V. Feliu
              </span>
            </motion.div>

            <div>
              <SectionHeader
                eyebrow="About"
                title="Ruben V. Feliu"
                sub="Executive technical leadership across the full power-to-compute ecosystem — connecting energy strategy, grid engineering, controls, cybersecurity, program delivery and operations into one coordinated platform for AI infrastructure."
              />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-steel-400">
            Successful AI infrastructure is not simply a data-center construction
            problem. It is an integrated power, controls, cybersecurity, digital
            infrastructure, commissioning and operations program extending from
            energy source to compute workload. This experience — including the
            conceptual digital twin above — reflects that systems view: every
            asset, workstream and delivery phase connected as one program. I
            bring that same view to client programs through{" "}
            <a href="#advisory" className="text-cyanx-500 hover:text-cyanx-400">
              advisory engagements
            </a>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:rubenvfeliu@gmail.com" className="btn-primary">
              <Mail size={15} /> Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/rubenfeliu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href="https://www.rfeliu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Globe size={15} /> rfeliu.com
            </a>
            <a href="#campus" className="btn-ghost">
              Revisit the campus <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel h-fit p-6"
        >
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500">
            Domain coverage
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {DOMAINS.map((d) => (
              <span key={d} className="chip normal-case tracking-normal">{d}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="mt-20 border-t border-ink-800/60 pt-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/rubenfeliu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-steel-400 transition hover:text-cyanx-500"
            >
              <Linkedin size={13} /> linkedin.com/in/rubenfeliu
            </a>
            <a
              href="https://www.rfeliu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-steel-400 transition hover:text-cyanx-500"
            >
              <Globe size={13} /> www.rfeliu.com
            </a>
            <a
              href="mailto:rubenvfeliu@gmail.com"
              className="flex items-center gap-1.5 text-xs text-steel-400 transition hover:text-cyanx-500"
            >
              <Mail size={13} /> rubenvfeliu@gmail.com
            </a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider2 text-ink-500">
            Ruben V. Feliu · AI Data Center Power Infrastructure · Conceptual digital twin —
            simulated campus, not operating data
          </p>
        </div>
      </footer>
    </Section>
  );
}
