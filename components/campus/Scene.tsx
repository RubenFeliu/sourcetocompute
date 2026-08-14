"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Html, OrbitControls, Sky, SoftShadows, Environment, Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useCampus, workstreamAssets } from "@/lib/store";
import { ASSETS, LAYERS, type AssetId } from "@/lib/data";
import { usePalettes, type Palette } from "./materials";
import { makeGrass, makeGravel } from "./textures";
import {
  DataCenter, Generation, Bess, Solar, Switchyard, Transmission, ControlCenter, LoadBanks,
} from "./assets";
import { FlowRoute, OtArc, HighlightRing, CameraRig, type OtStyle } from "./flows";

// Asset world positions (group origins)
const POS: Record<AssetId, [number, number, number]> = {
  datacenter: [46, 0, 6],
  generation: [-52, 0, 18],
  bess: [-36, 0, -24],
  solar: [-70, 0, -34],
  switchyard: [0, 0, 0],
  poi: [6, 0, -18],
  maincontrol: [16, 0, 30],
  backupcontrol: [-78, 0, 44],
  otnetwork: [0, 0, 0],
  loadbank: [-32, 0, 42],
};

const RING_R: Record<AssetId, number> = {
  datacenter: 36, generation: 31, bess: 21, solar: 27, switchyard: 24,
  poi: 12, maincontrol: 12, backupcontrol: 12, otnetwork: 0, loadbank: 10,
};

const LABEL_Y: Record<AssetId, number> = {
  datacenter: 10, generation: 13, bess: 8, solar: 7, switchyard: 11,
  poi: 17, maincontrol: 9, backupcontrol: 9, otnetwork: 0, loadbank: 6,
};

// OT network anchor points (top of each asset)
const OT_ANCHOR: Partial<Record<AssetId, [number, number, number]>> = {
  generation: [-52, 6, 18],
  bess: [-36, 4, -24],
  solar: [-70, 3, -34],
  switchyard: [0, 7, 0],
  datacenter: [46, 6, 6],
  maincontrol: [16, 5, 30],
  backupcontrol: [-78, 5, 44],
};

export default function Scene() {
  const { n, d } = usePalettes();
  const {
    selectedAsset, hoveredAsset, layer, scenario, powerFlow, otNetwork,
    quality, activeWorkstream, cameraResetToken, blackstartStage,
    focusAsset, focusToken,
    select, hover, setBlackstartStage,
  } = useCampus();
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const grassMap = useMemo(() => makeGrass(), []);
  const gravelMap = useMemo(() => makeGravel(), []);

  // Black-start staged restoration
  useEffect(() => {
    if (scenario !== "blackstart") return;
    setBlackstartStage(0);
    let stage = 0;
    const id = setInterval(() => {
      stage = Math.min(5, stage + 1);
      setBlackstartStage(stage);
      if (stage >= 5) clearInterval(id);
    }, 2400);
    return () => clearInterval(id);
  }, [scenario, setBlackstartStage]);

  // Emphasis / filter logic
  const wsAssets = useMemo(() => workstreamAssets(activeWorkstream), [activeWorkstream]);
  const layerAssets = useMemo(() => {
    if (layer === "ALL") return null;
    const l = LAYERS.find((x) => x.id === layer);
    return l ? new Set<string>(l.assets) : null;
  }, [layer]);

  const filterSet: Set<string> | null =
    activeWorkstream && wsAssets.size > 0 ? wsAssets : layerAssets;

  // Black-start energization per stage
  const energized = (id: AssetId): boolean => {
    if (scenario !== "blackstart") return true;
    switch (id) {
      case "maincontrol":
      case "backupcontrol":
      case "otnetwork":
        return blackstartStage >= 1;
      case "generation":
        return blackstartStage >= 2;
      case "switchyard":
        return blackstartStage >= 3;
      case "datacenter":
        return blackstartStage >= 4;
      case "bess":
      case "solar":
        return blackstartStage >= 5;
      case "loadbank":
        return blackstartStage >= 2;
      case "poi":
        return false; // restoration shown with POI open (conceptual)
      default:
        return true;
    }
  };

  const emphasized = (id: AssetId) => !filterSet || filterSet.has(id);
  const pal = (id: AssetId): Palette => (emphasized(id) && energized(id) ? n : d);

  // Scenario-driven parameters
  const islanded = scenario === "islanded" || scenario === "blackstart";
  const contingency = scenario === "contingency";
  const bessMode: "charging" | "discharging" | "idle" =
    scenario === "renewable" || scenario === "grid"
      ? "charging"
      : contingency || scenario === "islanded" || scenario === "loadevent"
        ? "discharging"
        : "idle";
  const soc: number = (
    { normal: 0.7, grid: 0.78, islanded: 0.6, contingency: 0.5, renewable: 0.86, blackstart: 0.45, loadevent: 0.62 } as const
  )[scenario];
  const solarT: number =
    scenario === "renewable" ? 1 : scenario === "blackstart" ? (blackstartStage >= 5 ? 0.4 : 0) : 0.45;
  const dcActivity = scenario === "loadevent" ? 1 : 0.65;

  // load banks absorb generation output while blocks are stabilized (black start
  // stages 3–4, before priority load pickup)
  const loadbankActive =
    scenario === "blackstart" && blackstartStage >= 2 && blackstartStage < 4;

  const flowsOn = powerFlow;
  const genFlow = flowsOn && energized("generation") && energized("switchyard");
  const dcFlow = flowsOn && energized("datacenter");
  const bessFlow = flowsOn && energized("bess") && bessMode !== "idle";
  const solarFlow = flowsOn && energized("solar") && solarT > 0.05;
  const poiFlow = flowsOn && !islanded;

  const labelIds: AssetId[] = [
    "datacenter", "generation", "bess", "solar", "switchyard", "poi",
    "maincontrol", "backupcontrol", "loadbank",
  ];

  return (
    <>
      {/* ── Environment: clear daylight ── */}
      {quality === "high" && <SoftShadows size={32} samples={12} focus={0.6} />}
      <Sky
        distance={450000}
        sunPosition={[70, 60, 30]}
        turbidity={4}
        rayleigh={1.1}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
      />
      {/* procedural reflection environment (no external assets) */}
      <Environment resolution={quality === "performance" ? 64 : 256} frames={1}>
        <color attach="background" args={["#a9c6dd"]} />
        <Lightformer
          intensity={4}
          position={[8, 6, 4]}
          scale={[8, 8, 1]}
          color="#fff5e0"
          form="rect"
        />
        <Lightformer
          intensity={0.8}
          position={[-10, 4, -6]}
          scale={[24, 10, 1]}
          color="#cfe4f5"
          form="rect"
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial color="#8a9a78" />
        </mesh>
      </Environment>
      <fog attach="fog" args={["#cfe0ec", 220, 460]} />
      <hemisphereLight args={["#bdd7ee", "#8a9a78", 0.7]} />
      <directionalLight
        position={[70, 90, 35]}
        intensity={2.1}
        color="#fff3e0"
        castShadow={quality !== "performance"}
        shadow-mapSize-width={quality === "high" ? 4096 : 2048}
        shadow-mapSize-height={quality === "high" ? 4096 : 2048}
        shadow-camera-left={-130}
        shadow-camera-right={130}
        shadow-camera-top={130}
        shadow-camera-bottom={-130}
        shadow-bias={-0.0004}
      />
      {/* soft sky bounce fill */}
      <directionalLight position={[-60, 40, -60]} intensity={0.45} color="#cfe4f5" />

      {/* ── Ground & roads ── */}
      {/* graded site terrain (dry grass / prairie) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[420, 320]} />
        <meshStandardMaterial map={grassMap} roughness={1} metalness={0} />
      </mesh>
      {/* graded gravel apron around the developed core */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, -0.02, 2]} receiveShadow>
        <planeGeometry args={[220, 150]} />
        <meshStandardMaterial map={gravelMap} roughness={1} metalness={0} />
      </mesh>
      {/* main campus spine road */}
      <mesh position={[-10, 0.01, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 6]} />
        <meshStandardMaterial color="#4a4e54" roughness={0.95} />
      </mesh>
      {/* center line */}
      <mesh position={[-10, 0.02, 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 0.18]} />
        <meshStandardMaterial color="#e8e4d2" roughness={0.9} />
      </mesh>
      <mesh position={[-40, 0.01, 10]} rotation={[-Math.PI / 2, 0, Math.PI / 2.6]}>
        <planeGeometry args={[60, 5]} />
        <meshStandardMaterial color="#4a4e54" roughness={0.95} />
      </mesh>
      <mesh position={[-56, 0.01, 32]} rotation={[-Math.PI / 2, 0, Math.PI / 3.4]}>
        <planeGeometry args={[56, 5]} />
        <meshStandardMaterial color="#4a4e54" roughness={0.95} />
      </mesh>
      <mesh position={[14, 0.01, 18]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[30, 5]} />
        <meshStandardMaterial color="#4a4e54" roughness={0.95} />
      </mesh>

      {/* ── Assets ── */}
      <Interactive id="datacenter" select={select} hover={hover}>
        <group position={POS.datacenter}>
          <DataCenter p={pal("datacenter")} t={dcActivity} />
        </group>
      </Interactive>

      <Interactive id="generation" select={select} hover={hover}>
        <group position={POS.generation}>
          <Generation
            p={pal("generation")}
            contingency={contingency}
            running={energized("generation")}
          />
        </group>
      </Interactive>

      <Interactive id="bess" select={select} hover={hover}>
        <group position={POS.bess}>
          <Bess p={pal("bess")} soc={soc} mode={energized("bess") ? bessMode : "idle"} />
        </group>
      </Interactive>

      <Interactive id="solar" select={select} hover={hover}>
        <group position={POS.solar}>
          <Solar p={pal("solar")} t={solarT} />
        </group>
      </Interactive>

      <Interactive id="switchyard" select={select} hover={hover}>
        <group position={POS.switchyard}>
          <Switchyard p={pal("switchyard")} />
        </group>
      </Interactive>

      <Interactive id="poi" select={select} hover={hover}>
        <group position={POS.poi}>
          <Transmission p={pal("poi")} open={islanded} />
        </group>
      </Interactive>

      <Interactive id="loadbank" select={select} hover={hover}>
        <group position={POS.loadbank} rotation={[0, -Math.PI / 14, 0]}>
          <LoadBanks p={pal("loadbank")} active={loadbankActive} />
        </group>
      </Interactive>

      <Interactive id="maincontrol" select={select} hover={hover}>
        <group position={POS.maincontrol}>
          <ControlCenter p={pal("maincontrol")} primary />
        </group>
      </Interactive>

      <Interactive id="backupcontrol" select={select} hover={hover}>
        <group position={POS.backupcontrol} rotation={[0, Math.PI / 5, 0]}>
          <ControlCenter p={pal("backupcontrol")} primary={false} />
        </group>
      </Interactive>

      {/* ── Power flows ── */}
      <FlowRoute
        points={[[-38, 1.6, 16], [-22, 1.6, 9], [-11, 1.6, 4]]}
        color="#1d5bd8" active={genFlow} speed={0.14} count={12}
      />
      <FlowRoute
        points={[[11, 1.6, 2], [26, 1.6, 4], [36, 1.6, 5]]}
        color="#0891b2" active={dcFlow} speed={0.16} count={14}
      />
      <FlowRoute
        points={[[-28, 1.6, -18], [-17, 1.6, -9], [-11, 1.6, -3]]}
        color={bessMode === "charging" ? "#059669" : "#d97706"}
        active={bessFlow}
        dir={bessMode === "charging" ? -1 : 1}
        speed={0.18} count={10}
      />
      <FlowRoute
        points={[[-50, 1.6, -30], [-32, 1.6, -20], [-13, 1.6, -6]]}
        color="#059669" active={solarFlow} speed={0.12} count={solarT > 0.8 ? 16 : 8}
      />
      <FlowRoute
        points={[[4, 2, -14], [12, 4, -34], [24, 5, -60]]}
        color="#52606d" active={poiFlow} dir={scenario === "grid" ? -1 : 1}
        speed={0.1} count={10}
      />
      {/* commissioning / black-start: generation stabilized against load banks */}
      <FlowRoute
        points={[[-40, 1.6, 28], [-36, 1.6, 35], [-33, 1.6, 40]]}
        color="#ea580c" active={flowsOn && loadbankActive} speed={0.18} count={8}
      />

      {/* ── OT network overlay ── */}
      {otNetwork && <OtOverlay />}

      {/* ── Selection & hover rings ── */}
      {selectedAsset && selectedAsset !== "otnetwork" && (
        <HighlightRing position={POS[selectedAsset]} radius={RING_R[selectedAsset]} strong />
      )}
      {hoveredAsset && hoveredAsset !== selectedAsset && hoveredAsset !== "otnetwork" && (
        <HighlightRing position={POS[hoveredAsset]} radius={RING_R[hoveredAsset]} />
      )}
      {/* workstream emphasis rings */}
      {activeWorkstream &&
        Array.from(wsAssets)
          .filter((a): a is AssetId => a !== "otnetwork")
          .map((a) => (
            <HighlightRing key={a} position={POS[a]} radius={RING_R[a]} color="#1d5bd8" />
          ))}

      {/* ── Labels ── */}
      {labelIds.map((id) => (
        <Html
          key={id}
          position={[POS[id][0], LABEL_Y[id], POS[id][2]]}
          center
          distanceFactor={90}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "auto" }}
        >
          <button
            onClick={() => select(id)}
            className={`group flex flex-col items-center transition-opacity max-md:scale-[0.65] ${
              emphasized(id) && energized(id) ? "opacity-100" : "opacity-30"
            }`}
          >
            <span className="whitespace-nowrap rounded border border-cyan-400/40 bg-[#0b0e13]/90 px-2 py-0.5 font-mono text-[11px] tracking-[0.18em] text-cyan-300 shadow-lg shadow-black/30 backdrop-blur-sm group-hover:border-cyan-300">
              {ASSETS[id].label}
            </span>
            <span className="mt-0.5 whitespace-nowrap rounded bg-[#0b0e13]/70 px-1.5 py-px text-[8px] uppercase tracking-widest text-slate-200">
              {ASSETS[id].subLabel}
            </span>
          </button>
        </Html>
      ))}

      {/* ── Camera ── */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={18}
        maxDistance={220}
        target={[-6, 0, 0]}
      />
      <CameraRig
        selected={selectedAsset}
        resetToken={cameraResetToken}
        focus={focusAsset}
        focusToken={focusToken}
        controlsRef={controlsRef}
      />
    </>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────

function Interactive({
  id, select, hover, children,
}: {
  id: AssetId;
  select: (id: AssetId) => void;
  hover: (id: AssetId | null) => void;
  children: React.ReactNode;
}) {
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        select(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        hover(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hover(null);
        document.body.style.cursor = "default";
      }}
    >
      {children}
    </group>
  );
}

function OtOverlay() {
  const pairs: { from: AssetId; style: OtStyle }[] = [
    { from: "generation", style: "fiber" },
    { from: "bess", style: "fiber" },
    { from: "solar", style: "fiber" },
    { from: "switchyard", style: "fiber" },
    { from: "datacenter", style: "fiber" },
    { from: "switchyard", style: "protection" },
    { from: "generation", style: "protection" },
    { from: "bess", style: "protection" },
    { from: "switchyard", style: "emergency" },
    { from: "generation", style: "emergency" },
  ];
  return (
    <group>
      {pairs.map((pr, i) => (
        <OtArc
          key={`m-${i}`}
          from={OT_ANCHOR[pr.from]!}
          to={OT_ANCHOR.maincontrol!}
          style={pr.style}
          lift={pr.style === "fiber" ? 12 : pr.style === "protection" ? 17 : 8}
        />
      ))}
      {/* redundant paths to backup control center */}
      {(["generation", "bess", "switchyard", "datacenter", "maincontrol"] as AssetId[]).map((a, i) => (
        <OtArc key={`b-${i}`} from={OT_ANCHOR[a]!} to={OT_ANCHOR.backupcontrol!} style="fiber" lift={22} />
      ))}
      <OtArc from={OT_ANCHOR.maincontrol!} to={OT_ANCHOR.backupcontrol!} style="emergency" lift={26} />
    </group>
  );
}
