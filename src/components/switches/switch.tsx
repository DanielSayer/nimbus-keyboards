import { cn } from "@/lib/utils";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Volume2Icon } from "lucide-react";
import {
  SOUNDS_MAP,
  type Switch as SwitchType,
} from "../../lib/switches-config";
import { Switch as SwitchRender } from "../switch";

type SwitchProps = {
  switchConfig: SwitchType;
};

function Switch({ switchConfig }: SwitchProps) {
  const handlePlaySound = () => {
    const selectedSound = gsap.utils.random(SOUNDS_MAP[switchConfig.id]);
    const audio = new Audio(selectedSound);
    audio.volume = 0.6;
    audio.play();
  };

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      <button
        onClick={handlePlaySound}
        className="font-bold-slanted absolute bottom-0 left-0 z-10 flex items-center gap-3 p-6 text-4xl text-white uppercase focus:ring-2 focus:ring-white focus:outline-none"
      >
        {switchConfig.name}
        <Volume2Icon className="size-8" />
      </button>

      <Canvas camera={{ position: [1.5, 2, 0], fov: 7 }}>
        <Stage
          adjustCamera
          intensity={0.5}
          shadows="contact"
          environment="city"
        >
          <SwitchRender
            switchId={switchConfig.id}
            color={switchConfig.color}
            rotation={[0, Math.PI / 4, 0]}
          />
        </Stage>
      </Canvas>
      <div
        className={cn(
          "font-black-slanted absolute inset-0 -z-10 grid place-items-center text-8xl uppercase",
          switchConfig.bgColor,
        )}
      >
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={18}
            className="font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white/50 motion-safe:transition-all motion-safe:duration-700"
          >
            {Array.from({ length: 8 }, (_, i) => (
              <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -40 : 14}>
                {switchConfig.id}
                {switchConfig.id}
                {switchConfig.id}
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  );
}

export { Switch };
