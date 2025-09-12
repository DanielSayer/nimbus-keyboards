import { BentoGrid } from "@/components/bento";
import { ColorChanger } from "@/components/color-changer";
import { CallToActionButton } from "@/components/cta";
import { Switches } from "@/components/switches";
import { Hero } from "../components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <BentoGrid />
      <Switches />
      <ColorChanger />
      <CallToActionButton />
    </div>
  );
}
