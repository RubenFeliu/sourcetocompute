"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow, title, sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-10 md:mb-14"
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub mt-4">{sub}</p>}
    </motion.div>
  );
}

export function Section({
  id, children, className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28 ${className}`}>
      {children}
    </section>
  );
}
