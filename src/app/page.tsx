import { BentoGrid } from "@/components/bento";
import { ColorChanger } from "@/components/color-changer.tsx";
import { Hero } from "../components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <BentoGrid />
      <ColorChanger />
    </div>
  );
}
