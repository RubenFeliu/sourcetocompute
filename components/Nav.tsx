"use client";

import { useState } from "react";
import { Menu, X, Linkedin } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-700/50 bg-ink-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-display text-base font-semibold tracking-tight text-steel-100">
            Ruben V. Feliu
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wider2 text-steel-400 md:inline">
            AI Data Center Power Infrastructure
          </span>
        </a>

        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-[13px] transition hover:text-cyanx-500 ${
                n.label === "Advisory" ? "font-semibold text-cyanx-500" : "text-steel-300"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/rubenfeliu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-steel-400 transition hover:text-cyanx-500"
          >
            <Linkedin size={16} />
          </a>
          <a href="#campus" className="btn-primary !px-4 !py-1.5 text-xs">
            Explore Campus
          </a>
        </nav>

        <button
          className="lg:hidden text-steel-200"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-700/50 bg-ink-950/95 px-6 py-4 lg:hidden">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-steel-200 hover:text-cyanx-500"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
