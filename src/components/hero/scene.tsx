"use client";

import { Keyboard } from "../keyboard";

function Scene() {
  return (
    <group>
      <Keyboard scale={9} position={[0, 0, 4]} />
      <ambientLight intensity={2} />
      <pointLight position={[0, 1, 5]} />
    </group>
  );
}

export { Scene };
