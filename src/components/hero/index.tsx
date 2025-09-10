"use client";

import { ChevronRightIcon } from "lucide-react";
import { Bounded } from "../bounded";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene";

function Hero() {
  return (
    <section className="blue-gradient-bg relative h-dvh text-white text-shadow-black/30 text-shadow-lg">
      <div className="pointer-events-none sticky top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <Scene />
        </Canvas>
      </div>
      <div className="absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="absolute inset-x-0 top-18 md:top-24 md:left-[8vw]"
        >
          <h1 className="font-black-slanted text-6xl leading-[0.8] uppercase sm:text-7xl lg:text-8xl">
            Built for <br />
            the bold
          </h1>
        </Bounded>
        <Bounded
          fullWidth
          className="absolute inset-x-0 bottom-0 md:right-[8vw] md:left-auto"
          innerClassName="flex flex-col gap-3"
        >
          <div className="max-w-md">
            <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
              Typing reinvented
            </h2>
            <p className="tracking-tight lg:text-lg">
              Fall in love with the craft thanks to our professional grade
              keycaps and switches
            </p>
          </div>
          <button className="font-bold-slanted group bg-primary flex w-fit cursor-pointer items-center gap-0.5 rounded-2xl px-3 py-1 text-2xl uppercase transition disabled:grayscale">
            Buy Vapor75
            <ChevronRightIcon className="transition group-hover:translate-x-1" />
          </button>
        </Bounded>
      </div>
    </section>
  );
}

export { Hero };
