"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { makeConcrete, makeAsphalt } from "./textures";

export interface Palette {
  pad: THREE.MeshStandardMaterial;
  road: THREE.MeshStandardMaterial;
  bldg: THREE.MeshStandardMaterial;
  bldgLight: THREE.MeshStandardMaterial;
  roof: THREE.MeshStandardMaterial;
  roofDark: THREE.MeshStandardMaterial;
  metal: THREE.MeshStandardMaterial;
  steel: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  cyan: THREE.MeshStandardMaterial;
  blue: THREE.MeshStandardMaterial;
  amber: THREE.MeshStandardMaterial;
  green: THREE.MeshStandardMaterial;
  red: THREE.MeshStandardMaterial;
  transformer: THREE.MeshStandardMaterial;
  fence: THREE.MeshStandardMaterial;
  container: THREE.MeshStandardMaterial;
  turbine: THREE.MeshStandardMaterial;
  panel: THREE.MeshStandardMaterial;
  white: THREE.MeshStandardMaterial;
}

function mat(
  color: string,
  opts: Partial<{
    emissive: string;
    emissiveIntensity: number;
    metalness: number;
    roughness: number;
    transparent: boolean;
    opacity: number;
  }> = {},
  dim = false
): THREE.MeshStandardMaterial {
  const c = new THREE.Color(color);
  if (dim) c.multiplyScalar(0.45);
  const m = new THREE.MeshStandardMaterial({
    color: c,
    metalness: opts.metalness ?? 0.2,
    roughness: opts.roughness ?? 0.75,
  });
  if (opts.emissive) {
    const e = new THREE.Color(opts.emissive);
    if (dim) e.multiplyScalar(0.15);
    m.emissive = e;
    m.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  if (opts.transparent) {
    m.transparent = true;
    m.opacity = opts.opacity ?? 0.85;
  }
  return m;
}

export function buildPalette(
  dim: boolean,
  maps?: { concrete?: THREE.Texture; asphalt?: THREE.Texture }
): Palette {
  const pad = mat("#ffffff", { roughness: 0.95, metalness: 0.02 }, dim);
  if (maps?.concrete) {
    pad.map = maps.concrete;
    if (dim) pad.color.setScalar(0.45);
  } else {
    pad.color.set(dim ? "#5a5850" : "#c9c4ba");
  }
  const road = mat("#ffffff", { roughness: 0.95, metalness: 0.02 }, dim);
  if (maps?.asphalt) {
    road.map = maps.asphalt;
    if (dim) road.color.setScalar(0.45);
  } else {
    road.color.set(dim ? "#1d1f22" : "#41454b");
  }
  return {
    pad,
    road,
    // pre-engineered metal building panels (light gray / off-white)
    bldg: mat("#dde1e4", { roughness: 0.55, metalness: 0.15 }, dim),
    bldgLight: mat("#eef0f2", { roughness: 0.5, metalness: 0.1 }, dim),
    // standing-seam roofs
    roof: mat("#aab1b7", { roughness: 0.6, metalness: 0.3 }, dim),
    roofDark: mat("#7d848b", { roughness: 0.65, metalness: 0.25 }, dim),
    // painted industrial steel / galvanized
    metal: mat("#9aa3ab", { roughness: 0.45, metalness: 0.6 }, dim),
    steel: mat("#c2c9cf", { roughness: 0.35, metalness: 0.75 }, dim),
    // blue-tinted curtain glass
    glass: mat("#7fb2d1", { metalness: 0.4, roughness: 0.15 }, dim),
    cyan: mat("#0e7c94", { emissive: "#22d3ee", emissiveIntensity: 1.6 }, dim),
    blue: mat("#2563eb", { emissive: "#4c8dff", emissiveIntensity: 0.8 }, dim),
    amber: mat("#b97a12", { emissive: "#f5a524", emissiveIntensity: 1.2 }, dim),
    green: mat("#15803d", { emissive: "#34d399", emissiveIntensity: 1.2 }, dim),
    red: mat("#b91c1c", { emissive: "#ef4444", emissiveIntensity: 1.4 }, dim),
    // ANSI 70 light gray equipment (transformers, switchgear)
    transformer: mat("#b7bdb9", { roughness: 0.5, metalness: 0.45 }, dim),
    // galvanized chain-link
    fence: mat("#aeb4ba", { roughness: 0.5, metalness: 0.6 }, dim),
    // white BESS / generator enclosures
    container: mat("#f0f2f3", { roughness: 0.45, metalness: 0.2 }, dim),
    // gas turbine package (light industrial gray)
    turbine: mat("#ced4d8", { roughness: 0.4, metalness: 0.55 }, dim),
    // dark blue PV glass
    panel: mat("#173a63", { emissive: "#1d4ed8", emissiveIntensity: 0.15, metalness: 0.75, roughness: 0.2 }, dim),
    white: mat("#f5f6f7", { roughness: 0.55 }, dim),
  };
}

export function usePalettes(): { n: Palette; d: Palette } {
  return useMemo(() => {
    const maps = { concrete: makeConcrete(), asphalt: makeAsphalt() };
    return { n: buildPalette(false, maps), d: buildPalette(true, maps) };
  }, []);
}
