"use client";

import { cn } from "@/lib/utils";
import { Bounded } from "../bounded";
import { KEYCAP_TEXTURES, type KeycapTexture } from "./keycap-textures";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Scene } from "./scene";
import { Canvas } from "@react-three/fiber";

function ColorChanger() {
  const [selectedKeycap, setSelectedKeycap] = useState(KEYCAP_TEXTURES[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelectKeycap = (keycap: KeycapTexture) => {
    if (selectedKeycap.id === keycap.id) return;
    if (isAnimating) return;

    setSelectedKeycap(keycap);
    setIsAnimating(true);
  };

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <section className="relative flex h-[90vh] min-h-[1000px] flex-col overflow-hidden bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white">
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full mix-blend-overlay"
        viewBox="0 0 75 100"
      >
        <text
          fontSize={7}
          textAnchor="middle"
          dominantBaseline="middle"
          x="50%"
          y="50%"
          className="font-black-slanted fill-white/20 uppercase group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <tspan key={i} x={`${i + 1 * 10}%`} dy={i === 0 ? -50 : 6}>
              {Array.from({ length: 10 }, () => selectedKeycap.name).join(" ")}
            </tspan>
          ))}
        </text>
      </svg>
      <Canvas
        camera={{ position: [0, 0.5, 0.5], fov: 45, zoom: 1.5 }}
        className="-mb-[10vh] grow"
      >
        <Scene
          selectedTexture={selectedKeycap}
          onAnimationEnd={handleAnimationEnd}
        />
      </Canvas>
      <Bounded
        className="relative shrink-0"
        innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row"
      >
        <div className="max-w-md shrink-0">
          <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
            Custom Keycaps
          </h2>
          <div className="text-pretty lg:text-lg">
            <p>
              Choose from different keycap materials and see how they transform
              your keyboard&apos;s appearance in real-time.
            </p>
          </div>
        </div>

        <ul className="grid grow grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id}>
              <button
                onClick={() => handleSelectKeycap(texture)}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-4 hover:scale-105 motion-safe:transition-all motion-safe:duration-300",
                  {
                    "border-[#81bfed] bg-[#81bfed]/20":
                      selectedKeycap.id === texture.id,
                    "cursor-pointer border-gray-300":
                      selectedKeycap.id !== texture.id,
                    "cursor-not-allowed opacity-50": isAnimating,
                  },
                )}
              >
                <div className="mb-3 overflow-hidden rounded-md border-2 border-black bg-gray-100">
                  <Image
                    src={texture.path}
                    alt={texture.name}
                    width={400}
                    height={255}
                    className="size-full object-cover"
                  />
                </div>
                <span className="text-center text-sm font-semibold">
                  {texture.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Bounded>
    </section>
  );
}

export { ColorChanger };
