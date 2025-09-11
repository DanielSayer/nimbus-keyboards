"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

function FadeIn({
  children,
  className,
  vars = {},
  start = "top 50%",
  targetChildren = false,
}: FadeInProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetChildren
      ? container.current?.children
      : container.current;

    if (!target) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(target, { opacity: 0, y: 60 });

      gsap.to(target, {
        y: 0,
        duration: 0.8,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.2,
        ...vars,
        scrollTrigger: {
          trigger: container.current,
          start,
        },
      });
    });
  }, []);

  return (
    <div className={cn(className)} ref={container}>
      {children}
    </div>
  );
}

export { FadeIn };
