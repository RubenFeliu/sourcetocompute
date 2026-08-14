"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { AssetId } from "@/lib/data";

// ── Power flow particles ─────────────────────────────────────────────────────

export function FlowRoute({
  points,
  color = "#22d3ee",
  count = 14,
  speed = 0.12,
  dir = 1,
  active = true,
  size = 0.32,
}: {
  points: [number, number, number][];
  color?: string;
  count?: number;
  speed?: number;
  dir?: 1 | -1;
  active?: boolean;
  size?: number;
}) {
  const inst = useRef<THREE.InstancedMesh>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!inst.current) return;
    const t = clock.elapsedTime * speed;
    for (let i = 0; i < count; i++) {
      let u = (t + i / count) % 1;
      if (dir === -1) u = 1 - u;
      const pos = curve.getPointAt(u);
      dummy.position.copy(pos);
      const s = active ? size * (0.7 + 0.3 * Math.sin((u + i) * Math.PI * 2)) : 0.0001;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      inst.current.setMatrixAt(i, dummy.matrix);
    }
    inst.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* faint guide line */}
      <Line
        points={points}
        color={color}
        transparent
        opacity={active ? 0.35 : 0.06}
        lineWidth={1.5}
      />
      <instancedMesh ref={inst} args={[undefined, undefined, count]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.95 : 0} />
      </instancedMesh>
    </group>
  );
}

// ── OT network arcs ──────────────────────────────────────────────────────────

export type OtStyle = "fiber" | "protection" | "emergency";

const OT_COLORS: Record<OtStyle, string> = {
  fiber: "#0369a1",
  protection: "#d97706",
  emergency: "#047857",
};

export function OtArc({
  from,
  to,
  style = "fiber",
  lift = 14,
}: {
  from: [number, number, number];
  to: [number, number, number];
  style?: OtStyle;
  lift?: number;
}) {
  const ref = useRef<any>(null);
  const pts = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += lift + a.distanceTo(b) * 0.08;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    return curve.getPoints(40);
  }, [from, to, lift]);

  useFrame((_, dt) => {
    const mat = ref.current?.material;
    if (mat && "dashOffset" in mat) mat.dashOffset -= dt * (style === "fiber" ? 4 : 2);
  });

  return (
    <Line
      ref={ref}
      points={pts}
      color={OT_COLORS[style]}
      lineWidth={style === "fiber" ? 1.6 : 1.2}
      dashed={style !== "fiber"}
      dashSize={style === "emergency" ? 1.6 : 0.7}
      gapSize={style === "emergency" ? 0.9 : 0.5}
      transparent
      opacity={0.8}
    />
  );
}

// ── Selection / hover rings ──────────────────────────────────────────────────

export function HighlightRing({
  position,
  radius,
  color = "#0891b2",
  strong = false,
}: {
  position: [number, number, number];
  radius: number;
  color?: string;
  strong?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = strong
      ? 0.55 + 0.25 * Math.sin(clock.elapsedTime * 3)
      : 0.22 + 0.08 * Math.sin(clock.elapsedTime * 3);
    ref.current.rotation.z += 0.002;
  });
  return (
    <mesh ref={ref} position={[position[0], 0.18, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + (strong ? 1.1 : 0.6), 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Camera rig ───────────────────────────────────────────────────────────────

export const DEFAULT_CAM = { pos: [82, 60, 88] as const, target: [-12, 0, 4] as const };

export const ASSET_VIEWS: Record<AssetId, { pos: [number, number, number]; target: [number, number, number] }> = {
  datacenter: { pos: [94, 34, 46], target: [58, 2, 8] },
  generation: { pos: [-26, 28, 56], target: [-58, 2, 20] },
  bess: { pos: [-16, 24, -60], target: [-44, 1, -30] },
  solar: { pos: [-62, 30, -66], target: [-92, 1, -34] },
  switchyard: { pos: [26, 22, 26], target: [0, 2, 0] },
  poi: { pos: [36, 26, -14], target: [12, 3, -40] },
  maincontrol: { pos: [44, 16, 66], target: [20, 2, 42] },
  backupcontrol: { pos: [-76, 18, 68], target: [-98, 2, 42] },
  otnetwork: { pos: [55, 75, 55], target: [-12, 6, 4] },
  loadbank: { pos: [-40, 14, 66], target: [-58, 1, 48] },
};

export function CameraRig({
  selected,
  resetToken,
  focus,
  focusToken,
  controlsRef,
}: {
  selected: AssetId | null;
  resetToken: number;
  focus: AssetId | null;
  focusToken: number;
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  const { camera } = useThree();
  const goalPos = useRef(new THREE.Vector3(...DEFAULT_CAM.pos));
  const goalTarget = useRef(new THREE.Vector3(...DEFAULT_CAM.target));
  const traveling = useRef(false);
  const lastSelected = useRef<AssetId | null>(null);
  const lastReset = useRef(resetToken);
  const lastFocus = useRef(focusToken);

  if (selected !== lastSelected.current) {
    lastSelected.current = selected;
    if (selected) {
      const v = ASSET_VIEWS[selected];
      goalPos.current.set(...v.pos);
      goalTarget.current.set(...v.target);
      traveling.current = true;
    }
  }
  if (resetToken !== lastReset.current) {
    lastReset.current = resetToken;
    goalPos.current.set(...DEFAULT_CAM.pos);
    goalTarget.current.set(...DEFAULT_CAM.target);
    traveling.current = true;
  }
  if (focusToken !== lastFocus.current) {
    lastFocus.current = focusToken;
    if (focus) {
      const v = ASSET_VIEWS[focus];
      goalPos.current.set(...v.pos);
      goalTarget.current.set(...v.target);
    } else {
      goalPos.current.set(...DEFAULT_CAM.pos);
      goalTarget.current.set(...DEFAULT_CAM.target);
    }
    traveling.current = true;
  }

  const attached = useRef(false);
  useFrame((_, dt) => {
    if (!attached.current && controlsRef.current) {
      attached.current = true;
      controlsRef.current.addEventListener("start", () => {
        traveling.current = false;
      });
    }
    if (!traveling.current) return;
    const k = 1 - Math.pow(0.0015, dt); // smooth exponential approach
    camera.position.lerp(goalPos.current, k);
    const c = controlsRef.current;
    if (c) {
      c.target.lerp(goalTarget.current, k);
      c.update();
    }
    if (
      camera.position.distanceTo(goalPos.current) < 0.4 &&
      (!c || c.target.distanceTo(goalTarget.current) < 0.3)
    ) {
      traveling.current = false;
    }
  });

  return null;
}
