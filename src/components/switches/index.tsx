"use client";

import { Bounded } from "../bounded";
import { FadeIn } from "../fade-in";
import { Switch } from "./switch";
import { switches } from "../../lib/switches-config";

function Switches() {
  return (
    <Bounded className="relative" innerClassName="flex flex-col justify-center">
      <FadeIn>
        <h2 className="font-bold-slanted scroll-pt-6 text-6xl uppercase md:text-8xl">
          Craft your click
        </h2>
        <div className="mb-6 max-w-4xl text-xl text-pretty">
          <p>
            The Vapor75 can be customized with one of four premium switch types.
          </p>
        </div>

        <FadeIn
          className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2"
          targetChildren
        >
          {switches.map((config) => (
            <Switch key={config.id} switchConfig={config} />
          ))}
        </FadeIn>
      </FadeIn>
    </Bounded>
  );
}

export { Switches };
