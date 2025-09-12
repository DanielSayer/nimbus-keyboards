"use client";

import { cn, prefersReducedMotion } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronRightIcon } from "lucide-react";
import { type CSSProperties, useRef } from "react";
import { Bounded } from "./bounded";

gsap.registerPlugin(useGSAP);

function CallToActionButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion) return;
    if (!buttonRef.current || !textRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !textRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;

      const normalizedX = Math.max(0, Math.min(1, mouseX / buttonWidth));

      const newWdth = 120 - normalizedX * 70;
      const newWght = 700 + normalizedX * 300;

      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newWght,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        "--wdth": 85,
        "--wght": 850,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    buttonRef.current.addEventListener("mousemove", handleMouseMove);
    buttonRef.current.addEventListener("mouseleave", handleMouseLeave);
    gsap.set(textRef.current, {
      "--wdth": 85,
      "--wght": 850,
    });

    return () => {
      buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
      buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return (
    <Bounded>
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <p className="font-gray-700 mb-6 text-xl font-medium md:text-2xl">
          Experience peak performance
        </p>
        <h2 className="font-bold-slanted mt-8 mb-6 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          Order yours now
        </h2>
        <button
          ref={buttonRef}
          className={cn(
            "group relative w-full overflow-hidden rounded-full border-8 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 p-6 ease-out focus:ring-[24px] focus:ring-sky-500/50 focus:outline-none motion-safe:transition-all motion-safe:duration-300 md:border-[12px] md:px-20 md:py-16",
            "hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40",
            "active:scale-95",
            "cursor-pointer",
          )}
        >
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />
          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
            <span
              ref={textRef}
              style={{ "--wdth": 85, "--wght": 850 } as CSSProperties}
              className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl"
            >
              Buy Vapor75
            </span>
            <div className="hidden group-hover:translate-x-4 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
              <ChevronRightIcon className="size-12 text-gray-900 md:size-16" />
            </div>
          </div>
        </button>
        <div className="mt-12 flex w-full flex-col gap-2 text-center text-base text-gray-600 md:text-lg">
          <ul className="flex w-full flex-col justify-center gap-2 text-center font-semibold md:flex-row md:gap-4">
            <li>Free worldwide shipping</li>
            <li className="hidden md:list-item">•</li>
            <li>30-day guarantee</li>
            <li className="hidden md:list-item">•</li>
            <li>2 year warranty</li>
          </ul>
          <p>Join 10,000+ satisfied customers worldwide.</p>
        </div>
      </div>
    </Bounded>
  );
}

export { CallToActionButton };
