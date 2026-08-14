"use client";

import * as THREE from "three";

/** Procedurally generated speckle/noise texture — breaks up flat surfaces
 *  without shipping image assets. */
export function makeNoiseTexture({
  base,
  speckles,
  size = 256,
  count = 5000,
  minR = 0.5,
  maxR = 1.6,
  repeat = 24,
}: {
  base: string;
  speckles: { color: string; alpha: number }[];
  size?: number;
  count?: number;
  minR?: number;
  maxR?: number;
  repeat?: number;
}): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < count; i++) {
    const s = speckles[Math.floor(Math.random() * speckles.length)];
    ctx.globalAlpha = s.alpha * (0.4 + Math.random() * 0.6);
    ctx.fillStyle = s.color;
    const r = minR + Math.random() * (maxR - minR);
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeGrass(): THREE.CanvasTexture {
  return makeNoiseTexture({
    base: "#8fa172",
    speckles: [
      { color: "#7a8f5e", alpha: 0.7 },
      { color: "#9db07e", alpha: 0.6 },
      { color: "#6d7f54", alpha: 0.5 },
      { color: "#a8a06a", alpha: 0.35 },
    ],
    count: 9000,
    repeat: 40,
  });
}

export function makeGravel(): THREE.CanvasTexture {
  return makeNoiseTexture({
    base: "#b3ab98",
    speckles: [
      { color: "#a49b86", alpha: 0.8 },
      { color: "#c2bba9", alpha: 0.7 },
      { color: "#8f8674", alpha: 0.5 },
    ],
    count: 12000,
    minR: 0.4,
    maxR: 1.1,
    repeat: 36,
  });
}

export function makeConcrete(): THREE.CanvasTexture {
  return makeNoiseTexture({
    base: "#c9c4ba",
    speckles: [
      { color: "#bdb7ac", alpha: 0.6 },
      { color: "#d4cfc6", alpha: 0.5 },
      { color: "#a8a297", alpha: 0.3 },
    ],
    count: 7000,
    minR: 0.4,
    maxR: 1.2,
    repeat: 10,
  });
}

export function makeAsphalt(): THREE.CanvasTexture {
  return makeNoiseTexture({
    base: "#41454b",
    speckles: [
      { color: "#4b5056", alpha: 0.7 },
      { color: "#35393e", alpha: 0.6 },
      { color: "#575c63", alpha: 0.3 },
    ],
    count: 9000,
    minR: 0.3,
    maxR: 0.9,
    repeat: 20,
  });
}
