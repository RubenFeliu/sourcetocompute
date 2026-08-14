"use client";

import { motion } from "framer-motion";
import { Crown, UserCog, User, Briefcase } from "lucide-react";
import { ORG } from "@/lib/data";
import { Section, SectionHeader } from "./Shared";

function NodeCard({
  title, sub, icon: Icon, accent = "#22d3ee", big = false,
}: {
  title: string;
  sub?: string;
  icon?: React.ElementType;
  accent?: string;
  big?: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg border bg-ink-900/80 backdrop-blur-sm ${
        big ? "px-6 py-3.5" : "px-4 py-2.5"
      }`}
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-center gap-2.5">
        {Icon && <Icon size={big ? 16 : 13} style={{ color: accent }} />}
        <div>
          <p className={`${big ? "text-sm" : "text-xs"} font-medium text-steel-100`}>{title}</p>
          {sub && <p className="font-mono text-[9px] uppercase tracking-widest text-steel-400">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

const VLine = ({ h = "h-6" }: { h?: string }) => (
  <div className={`w-px ${h} bg-ink-600`} />
);

export default function OrgChart() {
  return (
    <Section id="org" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="Program organization"
        title="A Typical Program Structure"
        sub="One accountable chain from executive sponsorship to every discipline — with the PMO providing the connective tissue of schedule, requirements, interfaces, risk and vendor management. Representative structure; tailored per project."
      />

      <div className="flex flex-col items-center">
        {/* leadership spine */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <NodeCard title={ORG.sponsor} sub="Business accountability" icon={Crown} accent="#f5a524" big />
          <VLine />
          <NodeCard title={ORG.director} sub="Program accountability" icon={UserCog} accent="#22d3ee" big />
          <VLine />
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-stretch">
            <NodeCard title={ORG.pm} sub="Delivery execution" icon={User} accent="#22d3ee" big />
            {/* PMO staff block */}
            <div className="rounded-lg border border-ink-600/70 bg-ink-900/60 px-4 py-3">
              <p className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider2 text-steel-400">
                <Briefcase size={11} className="text-energy" /> PMO & Program Services
              </p>
              <div className="grid max-w-md grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                {ORG.pmo.map((r) => (
                  <p key={r} className="text-[11px] text-steel-300">{r}</p>
                ))}
              </div>
            </div>
          </div>
          <VLine h="h-8" />
        </motion.div>

        {/* horizontal distribution bar */}
        <div className="hidden h-px w-full max-w-5xl bg-ink-600 lg:block" />

        {/* branches */}
        <div className="mt-0 grid w-full max-w-6xl gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {ORG.branches.map((b, i) => (
            <motion.div
              key={b.lead}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="hidden lg:block"><VLine h="h-4" /></div>
              <div className="w-full">
                <div
                  className="rounded-t-lg border border-b-0 px-3 py-2.5"
                  style={{ borderColor: `${b.color}66`, background: `${b.color}14` }}
                >
                  <p className="text-xs font-semibold text-steel-100">{b.lead}</p>
                </div>
                <div
                  className="space-y-1 rounded-b-lg border border-t-0 border-ink-700/70 bg-ink-900/60 p-2"
                  style={{ borderColor: `${b.color}33` }}
                >
                  {b.reports.map((r) => (
                    <div
                      key={r}
                      className="rounded border border-ink-700/60 bg-ink-850/80 px-2.5 py-1.5 text-[11px] text-steel-300"
                    >
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-center text-xs leading-relaxed text-steel-400">
          Every branch shares the same requirements baseline, interface registers and
          integrated master schedule — the workstreams above show how these teams map
          onto the physical campus.
        </p>
      </div>
    </Section>
  );
}
