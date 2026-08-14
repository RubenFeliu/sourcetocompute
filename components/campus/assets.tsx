"use client";

// Procedural campus assets. All geometry is conceptual — CONCEPTUAL DIGITAL TWIN.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Palette } from "./materials";

interface AP {
  p: Palette; // active palette (normal or dimmed)
  t?: number; // optional animation intensity 0..1
}

// ── Shared helpers ───────────────────────────────────────────────────────────

export function Fence({ w, d, p }: { w: number; d: number; p: Palette }) {
  const posts = useMemo(() => {
    const pts: [number, number, number][] = [];
    const step = 4;
    for (let x = -w / 2; x <= w / 2; x += step) {
      pts.push([x, 0.9, -d / 2], [x, 0.9, d / 2]);
    }
    for (let z = -d / 2 + step; z <= d / 2 - step; z += step) {
      pts.push([-w / 2, 0.9, z], [w / 2, 0.9, z]);
    }
    return pts;
  }, [w, d]);
  return (
    <group>
      {posts.map((pos, i) => (
        <mesh key={i} position={pos} material={p.fence}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
        </mesh>
      ))}
      {/* rails */}
      <mesh position={[0, 1.6, -d / 2]} material={p.fence}>
        <boxGeometry args={[w, 0.06, 0.06]} />
      </mesh>
      <mesh position={[0, 1.6, d / 2]} material={p.fence}>
        <boxGeometry args={[w, 0.06, 0.06]} />
      </mesh>
      <mesh position={[-w / 2, 1.6, 0]} material={p.fence}>
        <boxGeometry args={[0.06, 0.06, d]} />
      </mesh>
      <mesh position={[w / 2, 1.6, 0]} material={p.fence}>
        <boxGeometry args={[0.06, 0.06, d]} />
      </mesh>
    </group>
  );
}

export function Pad({ w, d, p, y = 0.05 }: { w: number; d: number; p: Palette; y?: number }) {
  return (
    <mesh position={[0, y, 0]} material={p.pad} receiveShadow>
      <boxGeometry args={[w, 0.1, d]} />
    </mesh>
  );
}

function Transformer({ p, scale = 1 }: { p: Palette; scale?: number }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.9, 0]} material={p.transformer} castShadow>
        <boxGeometry args={[2.2, 1.8, 1.6]} />
      </mesh>
      {/* radiator fins */}
      <mesh position={[1.3, 0.9, 0]} material={p.metal}>
        <boxGeometry args={[0.3, 1.4, 1.4]} />
      </mesh>
      <mesh position={[-1.3, 0.9, 0]} material={p.metal}>
        <boxGeometry args={[0.3, 1.4, 1.4]} />
      </mesh>
      {/* bushings */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 0]} material={p.white}>
          <cylinderGeometry args={[0.08, 0.12, 0.9, 8]} />
        </mesh>
      ))}
    </group>
  );
}

function StatusLight({ color, p, pos = [0, 0, 0] as [number, number, number] }: {
  color: "cyan" | "amber" | "green" | "red" | "blue";
  p: Palette;
  pos?: [number, number, number];
}) {
  return (
    <group position={pos}>
      <mesh position={[0, 2.6, 0]} material={p.metal}>
        <cylinderGeometry args={[0.06, 0.06, 5.2, 6]} />
      </mesh>
      <mesh position={[0, 5.4, 0]} material={p[color]}>
        <sphereGeometry args={[0.45, 12, 12]} />
      </mesh>
    </group>
  );
}

// ── AI Factory ───────────────────────────────────────────────────────────────

function DataHall({ p, active }: { p: Palette; active: number }) {
  const roofRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!roofRef.current) return;
    const m = roofRef.current.material as THREE.MeshStandardMaterial;
    // subtle compute-activity shimmer
    m.emissiveIntensity = 0.35 + active * (0.45 + 0.35 * Math.sin(clock.elapsedTime * 2.2 + roofRef.current.position.x));
  });
  return (
    <group>
      <mesh position={[0, 2.2, 0]} material={p.bldg} castShadow>
        <boxGeometry args={[16, 4.4, 8]} />
      </mesh>
      {/* roof compute strip */}
      <mesh ref={roofRef} position={[0, 4.5, 0]}>
        <boxGeometry args={[15.2, 0.15, 7.2]} />
        <meshStandardMaterial color="#2a3642" emissive="#0891b2" emissiveIntensity={0.5} />
      </mesh>
      {/* rooftop units */}
      {[-5, 0, 5].map((x, i) => (
        <mesh key={i} position={[x, 4.9, 2]} material={p.metal}>
          <boxGeometry args={[1.6, 0.7, 1.6]} />
        </mesh>
      ))}
      {/* louvered wall detail */}
      <mesh position={[0, 2.2, 4.05]} material={p.roofDark}>
        <boxGeometry args={[15.4, 3.2, 0.1]} />
      </mesh>
    </group>
  );
}

function Chiller({ p }: { p: Palette }) {
  const fan = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (fan.current) fan.current.rotation.y += dt * 4;
  });
  return (
    <group>
      <mesh position={[0, 0.8, 0]} material={p.metal} castShadow>
        <boxGeometry args={[3.2, 1.6, 2.2]} />
      </mesh>
      <mesh position={[0, 1.7, 0]} material={p.roofDark}>
        <cylinderGeometry args={[0.85, 0.85, 0.2, 16]} />
      </mesh>
      <mesh ref={fan} position={[0, 1.85, 0]} material={p.steel}>
        <boxGeometry args={[1.4, 0.05, 0.18]} />
      </mesh>
    </group>
  );
}

export function DataCenter({ p, t = 1 }: AP) {
  return (
    <group>
      <Pad w={62} d={44} p={p} />
      <Fence w={62} d={44} p={p} />
      {/* 6 data halls, 2 rows */}
      {[0, 1].map((row) =>
        [0, 1, 2].map((col) => (
          <group key={`${row}-${col}`} position={[-18 + col * 19, 0, row === 0 ? -12 : 4]}>
            <DataHall p={p} active={t} />
          </group>
        ))
      )}
      {/* cooling yard */}
      <group position={[0, 0, 16]}>
        {[-22, -17, -12, -7, -2, 3, 8, 13, 18].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <Chiller p={p} />
          </group>
        ))}
      </group>
      {/* electrical yard: unit subs + UPS building */}
      <group position={[-24, 0, -19]}>
        {[0, 3.5, 7, 10.5].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <Transformer p={p} scale={0.8} />
          </group>
        ))}
      </group>
      <mesh position={[18, 1.5, -19]} material={p.bldgLight} castShadow>
        <boxGeometry args={[10, 3, 5]} />
      </mesh>
      {/* generator backup area */}
      <group position={[27, 0, 8]}>
        {[0, 2.6, 5.2].map((z, i) => (
          <mesh key={i} position={[0, 0.8, z - 2.6]} material={p.container}>
            <boxGeometry args={[4.5, 1.6, 1.8]} />
          </mesh>
        ))}
      </group>
      {/* admin / operations building */}
      <group position={[24, 0, -8]}>
        <mesh position={[0, 1.8, 0]} material={p.bldgLight} castShadow>
          <boxGeometry args={[8, 3.6, 6]} />
        </mesh>
        <mesh position={[0, 1.8, 3.05]} material={p.glass}>
          <boxGeometry args={[7.4, 2.6, 0.1]} />
        </mesh>
      </group>
      {/* internal road */}
      <mesh position={[0, 0.11, -3.5]} material={p.road}>
        <boxGeometry args={[58, 0.02, 3]} />
      </mesh>
      <StatusLight color="cyan" p={p} pos={[-28, 0, -19]} />
    </group>
  );
}

// ── On-Site Generation ───────────────────────────────────────────────────────

function GasTurbineBlock({ p, running }: { p: Palette; running: boolean }) {
  const glow = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!glow.current) return;
    const m = glow.current.material as THREE.MeshStandardMaterial;
    m.emissiveIntensity = running ? 0.9 + 0.4 * Math.sin(clock.elapsedTime * 3) : 0.05;
  });
  return (
    <group>
      {/* turbine hall */}
      <mesh position={[0, 2, 0]} material={p.bldg} castShadow>
        <boxGeometry args={[10, 4, 6]} />
      </mesh>
      {/* intake filter house */}
      <mesh position={[-6.2, 2.8, 0]} material={p.steel} castShadow>
        <boxGeometry args={[2.4, 3.2, 4]} />
      </mesh>
      {/* turbine casing */}
      <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 2]} material={p.turbine}>
        <cylinderGeometry args={[1.1, 1.3, 7, 14]} />
      </mesh>
      {/* exhaust stack */}
      <mesh position={[5.2, 4.2, 0]} material={p.metal} castShadow>
        <cylinderGeometry args={[0.8, 1, 8.4, 12]} />
      </mesh>
      <mesh ref={glow} position={[5.2, 8.5, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 12]} />
        <meshStandardMaterial color="#2a1a08" emissive="#f5a524" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

export function Generation({ p, t = 1, contingency = false, running = true }: AP & {
  contingency?: boolean;
  running?: boolean;
}) {
  return (
    <group>
      <Pad w={54} d={34} p={p} />
      <Fence w={54} d={34} p={p} />
      {/* three simple-cycle blocks */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-14, 0, -10 + i * 10]}>
          <GasTurbineBlock p={p} running={running && !(contingency && i === 1)} />
          {contingency && i === 1 && <StatusLight color="red" p={p} pos={[0, 0, 3.6]} />}
        </group>
      ))}
      {/* combined-cycle block: HRSG + steam turbine hall */}
      <group position={[10, 0, -6]}>
        <mesh position={[0, 3.4, 0]} material={p.steel} castShadow>
          <boxGeometry args={[5, 6.8, 7]} />
        </mesh>
        <mesh position={[0, 8.6, 2]} material={p.metal}>
          <cylinderGeometry args={[0.7, 0.9, 4.2, 12]} />
        </mesh>
        <mesh position={[6, 2, 0]} material={p.bldg} castShadow>
          <boxGeometry args={[6, 4, 6]} />
        </mesh>
      </group>
      {/* GSU transformers */}
      <group position={[12, 0, 9]}>
        {[0, 4.5, 9].map((x, i) => (
          <group key={i} position={[x - 4.5, 0, 0]}>
            <Transformer p={p} />
          </group>
        ))}
      </group>
      {/* fuel gas yard */}
      <group position={[-20, 0, 13]}>
        {[0, 2.2].map((x, i) => (
          <mesh key={i} position={[x, 1, 0]} rotation={[0, 0, Math.PI / 2]} material={p.white}>
            <capsuleGeometry args={[0.8, 3, 6, 12]} />
          </mesh>
        ))}
        <mesh position={[5, 0.9, 0]} material={p.metal}>
          <boxGeometry args={[2.4, 1.8, 2]} />
        </mesh>
      </group>
      {/* BOP / auxiliary building */}
      <mesh position={[22, 1.4, -10]} material={p.bldgLight} castShadow>
        <boxGeometry args={[6, 2.8, 5]} />
      </mesh>
      <StatusLight color={contingency ? "amber" : "green"} p={p} pos={[-24, 0, -14]} />
    </group>
  );
}

// ── BESS ─────────────────────────────────────────────────────────────────────

export function Bess({ p, soc = 0.7, mode = "idle" }: AP & {
  soc?: number;
  mode?: "charging" | "discharging" | "idle";
}) {
  const socRef = useRef<THREE.Mesh>(null);
  const socH = 5;
  useFrame(({ clock }) => {
    if (!socRef.current) return;
    const wobble =
      mode === "charging" ? 0.03 * Math.sin(clock.elapsedTime * 2) :
      mode === "discharging" ? -0.03 * Math.sin(clock.elapsedTime * 2) : 0;
    const h = Math.max(0.05, Math.min(1, soc + wobble));
    socRef.current.scale.y = h;
    socRef.current.position.y = 0.6 + (socH * h) / 2;
  });
  const socColor = mode === "discharging" ? "#f5a524" : mode === "charging" ? "#34d399" : "#22d3ee";
  return (
    <group>
      <Pad w={34} d={26} p={p} />
      <Fence w={34} d={26} p={p} />
      {/* battery enclosure rows */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-12 + col * 6, 0.9, -8 + row * 4.4]}
            material={p.container}
            castShadow
          >
            <boxGeometry args={[4.6, 1.8, 1.7]} />
          </mesh>
        ))
      )}
      {/* PCS blocks + MV transformers */}
      <group position={[0, 0, 10]}>
        {[-10, -3.5, 3, 9.5].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 0.8, 0]} material={p.metal} castShadow>
              <boxGeometry args={[2.6, 1.6, 1.8]} />
            </mesh>
            <group position={[0, 0, -2.4]} scale={0.65}>
              <Transformer p={p} />
            </group>
          </group>
        ))}
      </group>
      {/* SOC indicator column */}
      <group position={[15, 0, -10]}>
        <mesh position={[0, 0.6 + socH / 2, 0]} material={p.fence}>
          <boxGeometry args={[0.9, socH, 0.9]} />
        </mesh>
        <mesh ref={socRef} position={[0, 0.6 + socH * 0.35, 0]}>
          <boxGeometry args={[0.7, socH, 0.7]} />
          <meshStandardMaterial color="#08131a" emissive={socColor} emissiveIntensity={1.4} transparent opacity={0.95} />
        </mesh>
      </group>
      <StatusLight
        color={mode === "discharging" ? "amber" : mode === "charging" ? "green" : "cyan"}
        p={p}
        pos={[-15, 0, -11]}
      />
    </group>
  );
}

// ── Solar PV ─────────────────────────────────────────────────────────────────

export function Solar({ p, t = 0.5 }: AP) {
  const inst = useRef<THREE.InstancedMesh>(null);
  const rows = 9;
  const cols = 14;
  const count = rows * cols;
  useMemo(() => null, []);
  useFrame(() => {
    if (!inst.current) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 5.2, 0, 0));
    const s = new THREE.Vector3(1, 1, 1);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        m.compose(new THREE.Vector3(-19.5 + c * 3, 1.1, -12 + r * 3), q, s);
        inst.current.setMatrixAt(i++, m);
      }
    }
    inst.current.instanceMatrix.needsUpdate = true;
    const mm = inst.current.material as THREE.MeshStandardMaterial;
    mm.emissiveIntensity = 0.25 + t * 1.1;
  });
  return (
    <group>
      <Pad w={46} d={32} p={p} y={0.02} />
      <instancedMesh ref={inst} args={[undefined, undefined, count]} material={p.panel}>
        <boxGeometry args={[2.6, 0.08, 1.9]} />
      </instancedMesh>
      {/* inverter / collection blocks */}
      {[-14, 0, 14].map((x, i) => (
        <group key={i} position={[x, 0, 13]}>
          <mesh position={[0, 0.7, 0]} material={p.metal} castShadow>
            <boxGeometry args={[2.4, 1.4, 1.6]} />
          </mesh>
          <group position={[2, 0, 0]} scale={0.55}>
            <Transformer p={p} />
          </group>
        </group>
      ))}
      <StatusLight color="green" p={p} pos={[-21, 0, -14]} />
    </group>
  );
}

// ── HV Switchyard ────────────────────────────────────────────────────────────

function Breaker({ p }: { p: Palette }) {
  return (
    <group>
      {[-0.7, 0, 0.7].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 0.9, 0]} material={p.metal}>
            <cylinderGeometry args={[0.1, 0.1, 1.8, 8]} />
          </mesh>
          <mesh position={[0, 2, 0]} material={p.white}>
            <cylinderGeometry args={[0.14, 0.18, 1.1, 8]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.35, 0]} material={p.transformer}>
        <boxGeometry args={[2.2, 0.7, 0.8]} />
      </mesh>
    </group>
  );
}

function Gantry({ p, w = 10 }: { p: Palette; w?: number }) {
  return (
    <group>
      <mesh position={[-w / 2, 3, 0]} material={p.steel}>
        <boxGeometry args={[0.35, 6, 0.35]} />
      </mesh>
      <mesh position={[w / 2, 3, 0]} material={p.steel}>
        <boxGeometry args={[0.35, 6, 0.35]} />
      </mesh>
      <mesh position={[0, 5.9, 0]} material={p.steel}>
        <boxGeometry args={[w, 0.3, 0.3]} />
      </mesh>
    </group>
  );
}

export function Switchyard({ p }: AP) {
  return (
    <group>
      <Pad w={40} d={30} p={p} />
      <Fence w={40} d={30} p={p} />
      {/* gantries + bus */}
      {[-9, 0, 9].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <Gantry p={p} w={30} />
        </group>
      ))}
      {/* bus conductors */}
      {[-9, 0, 9].map((z, i) =>
        [-6, 0, 6].map((x, j) => (
          <mesh key={`${i}-${j}`} position={[x, 5.6, z]} rotation={[Math.PI / 2, 0, 0]} material={p.metal}>
            <cylinderGeometry args={[0.05, 0.05, 16, 6]} />
          </mesh>
        ))
      )}
      {/* breaker bays */}
      {[-12, -4, 4, 12].map((x, i) => (
        <group key={i} position={[x, 0, -4]}>
          <Breaker p={p} />
        </group>
      ))}
      {/* disconnects + CT/VT stands */}
      {[-12, -4, 4, 12].map((x, i) => (
        <group key={i} position={[x, 0, 1]}>
          {[-0.6, 0.6].map((dx, j) => (
            <mesh key={j} position={[dx, 1.2, 0]} material={p.white}>
              <cylinderGeometry args={[0.09, 0.12, 2.4, 8]} />
            </mesh>
          ))}
        </group>
      ))}
      {/* surge arresters */}
      {[-14, 14].map((x, i) => (
        <mesh key={i} position={[x, 1.4, 6]} material={p.white}>
          <cylinderGeometry args={[0.12, 0.2, 2.8, 8]} />
        </mesh>
      ))}
      {/* main power transformers */}
      <group position={[-8, 0, 10]}>
        <Transformer p={p} scale={1.4} />
      </group>
      <group position={[2, 0, 10]}>
        <Transformer p={p} scale={1.4} />
      </group>
      {/* relay / control house */}
      <group position={[13, 0, 10]}>
        <mesh position={[0, 1.3, 0]} material={p.bldgLight} castShadow>
          <boxGeometry args={[7, 2.6, 4.5]} />
        </mesh>
        <mesh position={[0, 2.75, 0]} material={p.roof}>
          <boxGeometry args={[7.4, 0.25, 4.9]} />
        </mesh>
      </group>
      <StatusLight color="cyan" p={p} pos={[-17, 0, -12]} />
    </group>
  );
}

// ── Transmission / POI ───────────────────────────────────────────────────────

function LatticeTower({ p, h = 14 }: { p: Palette; h?: number }) {
  return (
    <group>
      {/* four legs */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
        <mesh key={i} position={[x * 0.9, h / 2, z * 0.9]} rotation={[0, 0, x * 0.06]} material={p.steel}>
          <boxGeometry args={[0.18, h, 0.18]} />
        </mesh>
      ))}
      {/* body sections */}
      {[0.3, 0.55, 0.8].map((f, i) => (
        <mesh key={i} position={[0, h * f, 0]} material={p.steel}>
          <boxGeometry args={[2.2 - f, 0.15, 2.2 - f]} />
        </mesh>
      ))}
      {/* cross arms */}
      <mesh position={[0, h * 0.92, 0]} material={p.steel}>
        <boxGeometry args={[6, 0.2, 0.2]} />
      </mesh>
      <mesh position={[0, h * 0.78, 0]} material={p.steel}>
        <boxGeometry args={[4.6, 0.2, 0.2]} />
      </mesh>
      {/* insulators */}
      {[-2.6, 2.6].map((x, i) => (
        <mesh key={i} position={[x, h * 0.86, 0]} material={p.white}>
          <cylinderGeometry args={[0.07, 0.07, 1, 6]} />
        </mesh>
      ))}
    </group>
  );
}

export function Transmission({ p, open = false }: AP & { open?: boolean }) {
  // towers marching away from the switchyard toward the utility grid
  const towerPts: [number, number, number][] = [
    [0, 0, 0],
    [6, 0, -14],
    [12, 0, -28],
    [18, 0, -42],
  ];
  const cond = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (const dx of [-2.6, 2.6]) {
      const pts = towerPts.map(
        ([x, , z], i) => new THREE.Vector3(x + dx, 12.1 - (i % 2) * 0.6, z)
      );
      lines.push(pts);
    }
    return lines;
  }, []);
  return (
    <group>
      {/* POI breaker + interchange metering pad */}
      <group position={[-3, 0, 3]}>
        <Pad w={10} d={8} p={p} />
        <Breaker p={p} />
        {open && (
          <mesh position={[0, 3.4, 0]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#3a0d0d" emissive="#ef4444" emissiveIntensity={2} />
          </mesh>
        )}
      </group>
      {towerPts.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <LatticeTower p={p} />
        </group>
      ))}
      {/* conductors as tube segments between towers */}
      {cond.map((pts, i) => {
        const curve = new THREE.CatmullRomCurve3(pts);
        return (
          <mesh key={i} material={p.metal}>
            <tubeGeometry args={[curve, 32, 0.05, 5, false]} />
          </mesh>
        );
      })}
      {/* distant utility substation */}
      <group position={[24, 0, -52]}>
        <Pad w={16} d={10} p={p} />
        <Fence w={16} d={10} p={p} />
        <Gantry p={p} w={10} />
        <group position={[-4, 0, 2]} scale={0.9}>
          <Transformer p={p} />
        </group>
        <mesh position={[4, 1, 2]} material={p.bldgLight}>
          <boxGeometry args={[4, 2, 2.6]} />
        </mesh>
      </group>
    </group>
  );
}

// ── Load Bank Yard ───────────────────────────────────────────────────────────

function LoadBankUnit({ p, active }: { p: Palette; active: boolean }) {
  const fans = useRef<THREE.Group>(null);
  const grid = useRef<THREE.Mesh>(null);
  useFrame(({ clock }, dt) => {
    if (fans.current) fans.current.rotation.y += dt * (active ? 14 : 0);
    if (grid.current) {
      const m = grid.current.material as THREE.MeshStandardMaterial;
      // resistive elements glow when absorbing load
      m.emissiveIntensity = active ? 1.2 + 0.5 * Math.sin(clock.elapsedTime * 5) : 0.02;
    }
  });
  return (
    <group>
      {/* trailer-style skid */}
      <mesh position={[0, 0.25, 0]} material={p.metal}>
        <boxGeometry args={[3.6, 0.25, 1.9]} />
      </mesh>
      {/* enclosure */}
      <mesh position={[0, 1.35, 0]} material={p.container} castShadow>
        <boxGeometry args={[3.4, 2, 1.8]} />
      </mesh>
      {/* louvered intake side */}
      <mesh position={[0, 1.3, 0.92]} material={p.roofDark}>
        <boxGeometry args={[3.1, 1.5, 0.06]} />
      </mesh>
      {/* element glow strip (visible through discharge hood) */}
      <mesh ref={grid} position={[0, 2.42, 0]}>
        <boxGeometry args={[3, 0.08, 1.3]} />
        <meshStandardMaterial color="#4a3524" emissive="#f97316" emissiveIntensity={0.05} />
      </mesh>
      {/* discharge hood + fans */}
      <mesh position={[0, 2.55, 0]} material={p.metal}>
        <boxGeometry args={[3.2, 0.18, 1.5]} />
      </mesh>
      <group ref={fans} position={[0, 2.7, 0]}>
        {[-1, 0, 1].map((x) => (
          <mesh key={x} position={[x, 0, 0]} material={p.steel}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
          </mesh>
        ))}
      </group>
      {/* cable connection box */}
      <mesh position={[-1.9, 0.7, 0]} material={p.transformer}>
        <boxGeometry args={[0.4, 0.9, 0.8]} />
      </mesh>
    </group>
  );
}

export function LoadBanks({ p, active = false }: AP & { active?: boolean }) {
  return (
    <group>
      <Pad w={16} d={11} p={p} />
      <Fence w={16} d={11} p={p} />
      {[0, 1].map((row) =>
        [0, 1].map((col) => (
          <group key={`${row}-${col}`} position={[-3.4 + col * 6.8, 0, -2.4 + row * 4.6]}>
            <LoadBankUnit p={p} active={active} />
          </group>
        ))
      )}
      {/* temporary MV cable run marker */}
      <mesh position={[-7, 0.35, 0]} material={p.transformer}>
        <boxGeometry args={[1.2, 0.7, 2.2]} />
      </mesh>
      <StatusLight color={active ? "amber" : "cyan"} p={p} pos={[6.5, 0, -4]} />
    </group>
  );
}

// ── Control Centers ──────────────────────────────────────────────────────────

export function ControlCenter({ p, primary = true }: AP & { primary?: boolean }) {
  return (
    <group>
      <Pad w={18} d={14} p={p} />
      <Fence w={18} d={14} p={p} />
      <mesh position={[0, 1.9, 0]} material={p.bldgLight} castShadow>
        <boxGeometry args={[11, 3.8, 8]} />
      </mesh>
      {/* glass control-room band */}
      <mesh position={[0, 2.6, 4.05]} material={p.glass}>
        <boxGeometry args={[10, 1.6, 0.12]} />
      </mesh>
      <mesh position={[0, 3.95, 0]} material={p.roof}>
        <boxGeometry args={[11.6, 0.3, 8.6]} />
      </mesh>
      {/* comms mast */}
      <mesh position={[4, 6.4, -2.5]} material={p.steel}>
        <cylinderGeometry args={[0.08, 0.14, 5.2, 8]} />
      </mesh>
      <mesh position={[4, 8.6, -2.5]} material={primary ? p.cyan : p.amber}>
        <sphereGeometry args={[0.35, 10, 10]} />
      </mesh>
      {/* microwave dish for backup comms */}
      {!primary && (
        <mesh position={[3.4, 7.2, -2.5]} rotation={[0, Math.PI / 4, Math.PI / 8]} material={p.white}>
          <cylinderGeometry args={[0.7, 0.7, 0.15, 14]} />
        </mesh>
      )}
      {/* emergency generator for the building */}
      <mesh position={[-6.5, 0.7, -4]} material={p.container}>
        <boxGeometry args={[3, 1.4, 1.6]} />
      </mesh>
      <StatusLight color={primary ? "cyan" : "amber"} p={p} pos={[-8, 0, 5]} />
    </group>
  );
}
