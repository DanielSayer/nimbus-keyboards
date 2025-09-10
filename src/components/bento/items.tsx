import type { ReactNode } from "react";

import Profile from "../../../public/render_11_2.png";
import FullImage from "../../../public/render_2.png";
import Screen from "../../../public/render_3.png";
import Knob from "../../../public/render_5_angled.png";
import BottomView from "../../../public/render_6.png";
import Switches from "../../../public/render_9.png";

export type BentoItem = {
  src: string;
  alt: string;
  description: ReactNode;
  size: "sm" | "md" | "lg";
};

export const bentoItems = [
  {
    src: BottomView.src,
    alt: "Bottom View",
    description: (
      <p>
        <span className="font-bold">Full aluminum case.</span> Premium materials
        for satisfying heft and durability.
      </p>
    ),
    size: "lg",
  },
  {
    src: Knob.src,
    alt: "Knob",
    description: (
      <p>
        <span className="font-bold">Interchangeable knob system.</span>{" "}
        Customize your control dial to click, scroll or press.
      </p>
    ),
    size: "sm",
  },
  {
    src: FullImage.src,
    alt: "Full Image",
    description: (
      <p>
        <span className="font-bold">Cross Platform.</span> Mac, Windows, or
        Linux, Nimbus adapts to your workflow.
      </p>
    ),
    size: "md",
  },
  {
    src: Switches.src,
    alt: "Switches",
    description: (
      <p>
        <span className="font-bold">Hot-swappable switches.</span> Change your
        feel without any soldering.
      </p>
    ),
    size: "md",
  },
  {
    src: Profile.src,
    alt: "Profile",
    description: (
      <p>
        <span className="font-bold">Custom Nimbus keycap profile.</span>{" "}
        Designed for long coding sessions.
      </p>
    ),
    size: "sm",
  },
  {
    src: Screen.src,
    alt: "Screen",
    description: (
      <p>
        <span className="font-bold">E-ink display screen.</span> Show battery,
        status, or a custom design.
      </p>
    ),
    size: "lg",
  },
] satisfies BentoItem[];
