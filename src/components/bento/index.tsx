import { cn } from "@/lib/utils";
import { Bounded } from "../bounded";
import Image from "next/image";
import { type BentoItem, bentoItems } from "./items";
import { FadeIn } from "../fade-in";

function BentoGrid() {
  return (
    <Bounded>
      <FadeIn>
        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl">
          Vapor75 Features
        </h2>
      </FadeIn>

      <FadeIn className="grid grid-cols-1 gap-4 md:grid-cols-6" targetChildren>
        {bentoItems.map((item) => (
          <BentoGridItem key={item.alt} item={item} />
        ))}
      </FadeIn>
    </Bounded>
  );
}

function BentoGridItem(props: { item: BentoItem }) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-3xl", {
        "md:col-span-2": props.item.size === "sm",
        "md:col-span-3": props.item.size === "md",
        "md:col-span-4": props.item.size === "lg",
      })}
    >
      <Image
        className="size-full object-cover"
        quality={96}
        width={700}
        height={400}
        src={props.item.src}
        alt={props.item.alt}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />
      <div className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
        {props.item.description}
      </div>
    </div>
  );
}

export { BentoGrid };
