"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, N8AO, Bloom, SMAA } from "@react-three/postprocessing";
import { useCampus, detectQuality } from "@/lib/store";
import { DEFAULT_CAM } from "./flows";
import Scene from "./Scene";

export default function CampusCanvas() {
  const quality = useCampus((s) => s.quality);
  const setQuality = useCampus((s) => s.setQuality);
  const select = useCampus((s) => s.select);

  useEffect(() => {
    setQuality(detectQuality());
  }, [setQuality]);

  const dpr: [number, number] =
    quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : [0.75, 1];

  return (
    <Canvas
      shadows={quality === "high"}
      dpr={dpr}
      camera={{ position: [...DEFAULT_CAM.pos], fov: 40, near: 1, far: 600 }}
      onPointerMissed={() => select(null)}
      gl={{ antialias: quality !== "performance", powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
        {quality !== "performance" && (
          <EffectComposer multisampling={0}>
            <N8AO
              aoRadius={quality === "high" ? 3 : 2}
              intensity={3.5}
              distanceFalloff={1}
              quality={quality === "high" ? "medium" : "performance"}
              halfRes={quality !== "high"}
            />
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.95}
              luminanceSmoothing={0.2}
              mipmapBlur
            />
            <SMAA />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
