"use client";

import { Stage, useTexture } from "@react-three/drei";
import { Keyboard } from "../keyboard";
import { KEYCAP_TEXTURES, type KeycapTexture } from "./keycap-textures";
import { useMemo } from "react";
import * as THREE from "three";

type SceneProps = {
  selectedTexture: KeycapTexture;
  onAnimationEnd: () => void;
};

function Scene({ selectedTexture, onAnimationEnd }: SceneProps) {
  const texturePaths = KEYCAP_TEXTURES.map((texture) => texture.path);
  const textures = useTexture(texturePaths);

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
    <group>
      <Stage environment="city" intensity={0.05} shadows="contact">
        <Keyboard
          keycapMaterial={materials[selectedTexture.id]}
          knobColor={selectedTexture.knobColor}
        />
      </Stage>
    </group>
  );
}

export { Scene };
