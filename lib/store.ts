"use client";

import { create } from "zustand";
import type { AssetId, LayerId, ScenarioId } from "./data";
import { WORKSTREAMS } from "./data";

export type Quality = "high" | "medium" | "performance";

/** Where the camera should fly when a scenario is activated */
const SCENARIO_FOCUS: Record<ScenarioId, AssetId | null> = {
  normal: null,
  grid: "poi",
  islanded: "poi",
  contingency: "generation",
  renewable: "solar",
  blackstart: "maincontrol",
  loadevent: "datacenter",
};

interface CampusState {
  selectedAsset: AssetId | null;
  hoveredAsset: AssetId | null;
  layer: LayerId;
  scenario: ScenarioId;
  powerFlow: boolean;
  otNetwork: boolean;
  quality: Quality;
  /** Workstream id whose touched assets should be highlighted on the campus */
  activeWorkstream: string | null;
  /** increments to request a camera reset */
  cameraResetToken: number;
  /** black start stage 0..5, driven by scenario animation */
  blackstartStage: number;
  /** camera focus request driven by scenario selection */
  focusAsset: AssetId | null;
  focusToken: number;

  select: (id: AssetId | null) => void;
  hover: (id: AssetId | null) => void;
  setLayer: (l: LayerId) => void;
  setScenario: (s: ScenarioId) => void;
  togglePowerFlow: () => void;
  toggleOtNetwork: () => void;
  setQuality: (q: Quality) => void;
  setWorkstream: (id: string | null) => void;
  resetCamera: () => void;
  setBlackstartStage: (n: number) => void;
}

export const useCampus = create<CampusState>((set) => ({
  selectedAsset: null,
  hoveredAsset: null,
  layer: "ALL",
  scenario: "normal",
  powerFlow: true,
  otNetwork: false,
  quality: "high",
  activeWorkstream: null,
  cameraResetToken: 0,
  blackstartStage: 5,
  focusAsset: null,
  focusToken: 0,

  select: (id) => set({ selectedAsset: id }),
  hover: (id) => set({ hoveredAsset: id }),
  setLayer: (l) => set({ layer: l, activeWorkstream: null }),
  setScenario: (s) =>
    set((st) => ({
      scenario: s,
      powerFlow: true, // scenarios are told through the flows — always show them
      blackstartStage: s === "blackstart" ? 0 : 5,
      selectedAsset: null,
      focusAsset: SCENARIO_FOCUS[s],
      focusToken: st.focusToken + 1,
    })),
  togglePowerFlow: () => set((s) => ({ powerFlow: !s.powerFlow })),
  toggleOtNetwork: () => set((s) => ({ otNetwork: !s.otNetwork })),
  setQuality: (q) => set({ quality: q }),
  setWorkstream: (id) => set({ activeWorkstream: id, layer: "ALL" }),
  resetCamera: () =>
    set((s) => ({ cameraResetToken: s.cameraResetToken + 1, selectedAsset: null })),
  setBlackstartStage: (n) => set({ blackstartStage: n }),
}));

/** Assets highlighted by the currently active workstream (empty set = none active). */
export function workstreamAssets(id: string | null): Set<string> {
  if (!id) return new Set();
  const ws = WORKSTREAMS.find((w) => w.id === id);
  return new Set(ws ? ws.assets : []);
}

/** Detect a sensible default quality level. */
export function detectQuality(): Quality {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as any).deviceMemory as number | undefined;
  const mobile = /Android|iPhone|iPad|Mobi/i.test(navigator.userAgent);
  if (mobile || cores <= 4 || (mem !== undefined && mem <= 4)) return "performance";
  if (cores <= 8) return "medium";
  return "high";
}
