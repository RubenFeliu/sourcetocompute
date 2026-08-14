"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import HeroOverlay from "@/components/HeroOverlay";
import CampusControls from "@/components/CampusControls";
import InfoDrawer from "@/components/InfoDrawer";
import ScenarioStatus from "@/components/ScenarioStatus";
import OrgChart from "@/components/sections/OrgChart";
import Schedule from "@/components/sections/Schedule";
import Advisory from "@/components/sections/Advisory";
import AiFactory from "@/components/sections/AiFactory";
import Pillars from "@/components/sections/Pillars";
import Architecture from "@/components/sections/Architecture";
import ControlArch from "@/components/sections/ControlArch";
import Workstreams from "@/components/sections/Workstreams";
import Roadmap from "@/components/sections/Roadmap";
import Operations from "@/components/sections/Operations";
import About from "@/components/sections/About";

const CampusCanvas = dynamic(() => import("@/components/campus/CampusCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-mono text-xs uppercase tracking-wider2 text-steel-400 animate-pulse">
        Initializing conceptual digital twin…
      </p>
    </div>
  ),
});

export default function Home() {
  return (
    <main id="top">
      <Nav />

      {/* Hero + 3D campus */}
      <section id="campus" className="relative h-screen w-full overflow-hidden">
        <CampusCanvas />
        <HeroOverlay />
        <CampusControls />
        <ScenarioStatus />
        <InfoDrawer />
      </section>

      <AiFactory />
      <Pillars />
      <Architecture />
      <ControlArch />
      <Workstreams />
      <OrgChart />
      <Roadmap />
      <Schedule />
      <Operations />
      <Advisory />
      <About />
    </main>
  );
}
