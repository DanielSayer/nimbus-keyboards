"use client";

import { Stage, useTexture } from "@react-three/drei";
import { Keyboard } from "../keyboard";
import { KEYCAP_TEXTURES, type KeycapTexture } from "./keycap-textures";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type SceneProps = {
  selectedTexture: KeycapTexture;
  onAnimationEnd: () => void;
};

gsap.registerPlugin(useGSAP);

function Scene({ selectedTexture, onAnimationEnd }: SceneProps) {
  const keyboardRef = useRef<THREE.Group>(null);
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

  const [currentTexture, setCurrentTexture] = useState(selectedTexture);

  useGSAP(() => {
    if (!keyboardRef.current) return;
    if (selectedTexture.id === currentTexture.id) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const keyboard = keyboardRef.current;
      if (!keyboard) return;

      const tl = gsap.timeline({
        onComplete: onAnimationEnd,
      });

      tl.to(keyboard.position, {
        y: 0.3,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setCurrentTexture(selectedTexture),
      });
      tl.to(keyboard.position, {
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      setCurrentTexture(selectedTexture);
      onAnimationEnd();
    });
  }, [selectedTexture.id, currentTexture.id]);

  const materials = useMemo(() => {
    const materialMap: { [key: string]: THREE.MeshStandardMaterial } = {};

    KEYCAP_TEXTURES.forEach((config, index) => {
      const texture = Array.isArray(textures) ? textures[index] : textures;

      if (texture) {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        materialMap[config.id] = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
        });
      }
    });
    return materialMap;
  }, [textures]);

  return (
    <Stage environment="city" intensity={0.05} shadows="contact">
      <group ref={keyboardRef}>
        <Keyboard
          keycapMaterial={materials[currentTexture.id]}
          knobColor={currentTexture.knobColor}
        />
      </group>
    </Stage>
  );
}

export { Scene };
