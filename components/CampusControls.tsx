"use client";

import { useState } from "react";
import {
  Zap, Network, RotateCcw, Layers as LayersIcon, Activity, Gauge,
  ChevronDown, ChevronUp, SlidersHorizontal, X,
} from "lucide-react";
import { useCampus } from "@/lib/store";
import { LAYERS, SCENARIOS, type LayerId } from "@/lib/data";

function ControlsContent({ onAction }: { onAction?: () => void }) {
  const {
    layer, setLayer, scenario, setScenario, powerFlow, togglePowerFlow,
    otNetwork, toggleOtNetwork, quality, setQuality, resetCamera,
    activeWorkstream, setWorkstream, blackstartStage,
  } = useCampus();
  const [openScenarios, setOpenScenarios] = useState(true);
  const [openLayers, setOpenLayers] = useState(false);

  const activeLayer = LAYERS.find((l) => l.id === layer);
  const activeScenario = SCENARIOS.find((s) => s.id === scenario)!;

  return (
    <div className="space-y-2">
      {/* primary toggles */}
      <div className="panel flex items-center gap-2 p-2">
        <button
          onClick={togglePowerFlow}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
            powerFlow
              ? "bg-cyanx-600/20 text-cyanx-500 ring-1 ring-cyanx-600/50"
              : "text-steel-400 hover:text-steel-200"
          }`}
        >
          <Zap size={12} /> Power Flow
        </button>
        <button
          onClick={toggleOtNetwork}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
            otNetwork
              ? "bg-amberx/15 text-amberx ring-1 ring-amberx/50"
              : "text-steel-400 hover:text-steel-200"
          }`}
        >
          <Network size={12} /> OT Network
        </button>
        <button
          onClick={() => {
            resetCamera();
            onAction?.();
          }}
          title="Reset camera"
          className="rounded p-1.5 text-steel-400 transition hover:text-cyanx-500"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* scenarios */}
      <div className="panel p-3">
        <button
          onClick={() => setOpenScenarios(!openScenarios)}
          className="flex w-full items-center justify-between"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-steel-300">
            <Activity size={12} className="text-cyanx-500" /> Operating Scenarios
          </span>
          {openScenarios ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
        {openScenarios && (
          <div className="mt-2 space-y-1">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScenario(s.id);
                  onAction?.();
                }}
                className={`block w-full rounded px-2 py-1.5 text-left text-xs transition ${
                  scenario === s.id
                    ? "bg-cyanx-600/15 text-cyanx-400 ring-1 ring-cyanx-600/40"
                    : "text-steel-300 hover:bg-ink-800 hover:text-steel-100"
                }`}
              >
                {s.name}
              </button>
            ))}
            <p className="pt-1 text-[10px] leading-relaxed text-steel-400">
              {activeScenario.short}
              {activeScenario.note && (
                <span className="mt-1 block text-amberx/80">{activeScenario.note}</span>
              )}
              {scenario === "blackstart" && (
                <span className="mt-1 block font-mono text-cyanx-500">
                  STAGE {blackstartStage + 1} / 6
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* layers */}
      <div className="panel p-3">
        <button
          onClick={() => setOpenLayers(!openLayers)}
          className="flex w-full items-center justify-between"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider2 text-steel-300">
            <LayersIcon size={12} className="text-cyanx-500" /> Layers
            {layer !== "ALL" && <span className="text-cyanx-500">· {layer}</span>}
          </span>
          {openLayers ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
        {openLayers && (
          <>
            <div className="mt-2 flex flex-wrap gap-1">
              {LAYERS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLayer(l.id as LayerId)}
                  className={`rounded px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition ${
                    layer === l.id
                      ? "bg-cyanx-600/20 text-cyanx-400 ring-1 ring-cyanx-600/40"
                      : "bg-ink-800 text-steel-400 hover:text-steel-100"
                  }`}
                >
                  {l.id}
                </button>
              ))}
            </div>
            {activeLayer && layer !== "ALL" && (
              <div className="mt-2 space-y-1 border-t border-ink-700/60 pt-2 text-[10px] leading-relaxed">
                <p className="text-steel-300">
                  <span className="text-cyanx-500">SMEs · </span>
                  {activeLayer.smes.join(", ")}
                </p>
                <p className="text-steel-400">
                  <span className="text-cyanx-500">Disciplines · </span>
                  {activeLayer.disciplines.join(", ")}
                </p>
                <p className="text-steel-400">
                  <span className="text-cyanx-500">Phases · </span>
                  {activeLayer.phases.join(" · ")}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* workstream link active */}
      {activeWorkstream && (
        <div className="panel flex items-center justify-between p-2 px-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-energy">
            Workstream highlight active
          </span>
          <button
            onClick={() => setWorkstream(null)}
            className="text-[10px] text-steel-400 hover:text-steel-100"
          >
            Clear
          </button>
        </div>
      )}

      {/* quality */}
      <div className="panel flex items-center gap-2 p-2 px-3">
        <Gauge size={12} className="text-steel-400" />
        {(["high", "medium", "performance"] as const).map((q) => (
          <button
            key={q}
            onClick={() => setQuality(q)}
            className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest transition ${
              quality === q ? "text-cyanx-500" : "text-steel-500 hover:text-steel-300"
            }`}
          >
            {q === "performance" ? "perf" : q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CampusControls() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: persistent side panel */}
      <div
        id="campus-controls"
        className="pointer-events-auto absolute left-4 top-20 z-30 hidden w-[280px] md:left-8 md:block"
      >
        <ControlsContent />
      </div>

      {/* Mobile: floating button + slide-up sheet */}
      <button
        onClick={() => setMobileOpen(true)}
        className="absolute bottom-3 left-3 z-30 flex items-center gap-2 rounded-full border border-cyanx-600/50 bg-ink-950/90 px-4 py-2 font-mono text-[10px] uppercase tracking-wider2 text-cyanx-500 shadow-lg shadow-black/40 backdrop-blur-md md:hidden"
      >
        <SlidersHorizontal size={13} /> Controls
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-ink-950/60 backdrop-blur-sm md:hidden">
          <button
            aria-label="Close controls"
            className="flex-1"
            onClick={() => setMobileOpen(false)}
          />
          <div className="max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-ink-600 bg-ink-950 p-4 pb-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-steel-300">
                Campus Controls
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded p-1 text-steel-400"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <ControlsContent onAction={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
