"use client";

import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ChevronRightIcon } from "lucide-react";
import { Bounded } from "../bounded";
import { LoaderWrapper } from "./loader-wrapper";
import { Scene } from "./scene";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function Hero() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(".GSAP_hero-title", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "line++",
      });

      const tl = gsap.timeline({ delay: 4.2 });

      tl.from(split.chars, {
        opacity: 0,
        y: -120,
        ease: "back",
        duration: 0.4,
        stagger: 0.07,
      }).to(".GSAP_hero-body", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.fromTo(
        ".GSAP_hero-scene",
        {
          background:
            "linear-gradient(to bottom, #000000, #0f172a, #062f4a, #7fa0b9)",
        },
        {
          background:
            "linear-gradient(to bottom, #ffffff, #ffffff, #ffffff, #ffffff)",
          scrollTrigger: {
            trigger: ".GSAP_hero",
            start: "top top",
            end: "65% bottom",
            scrub: 1,
          },
        },
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".GSAP_hero-title, .GSAP_hero-body", { opacity: 1 });
      gsap.set(".GSAP_hero-scene", {
        background:
          "linear-gradient(to bottom, #000000, #0f172a, #062f4a, #7fa0b9)",
      });
    });
  }, []);

  return (
    <section className="GSAP_hero relative h-dvh text-white text-shadow-black/30 text-shadow-lg motion-safe:h-[300vh]">
      <LoaderWrapper />
      <div className="GSAP_hero-scene pointer-events-none sticky top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <Scene />
        </Canvas>
      </div>
      <div className="absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="absolute inset-x-0 top-18 md:top-24 md:left-[8vw]"
        >
          <h1 className="GSAP_hero-title font-black-slanted text-6xl leading-[0.8] uppercase sm:text-7xl lg:text-8xl">
            Built for <br />
            the bold
          </h1>
        </Bounded>
        <Bounded
          fullWidth
          className="GSAP_hero-body absolute inset-x-0 bottom-0 opacity-0 md:right-[8vw] md:left-auto"
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
