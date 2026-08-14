"use client";

import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Waves, SlidersHorizontal, Lock, ClipboardCheck,
  Users, GitMerge,
} from "lucide-react";
import { PILLARS } from "@/lib/data";
import { Section, SectionHeader } from "./Shared";

const ICONS = [Zap, ShieldCheck, Waves, SlidersHorizontal, Lock, ClipboardCheck, Users, GitMerge];

export default function Pillars() {
  return (
    <Section id="pillars" className="border-t border-ink-800/60">
      <SectionHeader
        eyebrow="What does success require?"
        title="What Does It Take to Make an AI Power Campus Successful?"
        sub="Eight pillars — connected by shared requirements, interfaces and testing — determine whether a campus energizes on time and operates as designed."
      />

      <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* connection hint lines */}
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyanx-600/25 to-transparent" />
        </div>
        {PILLARS.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.55 }}
              className="group panel relative p-5 transition-colors hover:border-cyanx-600/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon size={18} className="text-cyanx-500" />
                <span className="font-mono text-[10px] text-ink-500">0{i + 1}</span>
              </div>
              <h3 className="font-display text-lg text-steel-100">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{p.blurb}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-12 max-w-3xl text-center font-display text-xl leading-relaxed text-steel-200 md:text-2xl"
      >
        The critical challenge is not any single piece of equipment.
        <span className="text-cyanx-500">
          {" "}It is making every system operate as one coordinated infrastructure platform.
        </span>
      </motion.p>
    </Section>
  );
}
