"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { SOUNDS_MAP, type Switch as SwitchType } from "@/lib/switches-config";

// Type definitions
type GLTFResult = GLTF & {
  nodes: {
    Single_Switch_Mesh_1: THREE.Mesh;
    Single_Switch_Mesh_2: THREE.Mesh;
    Single_Switch_Mesh_3: THREE.Mesh;
    Single_Switch_Mesh_4: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};

type SwitchProps = {
  switchId: SwitchType["id"];
  color: string;
} & React.ComponentProps<"group">;

export function Switch({ switchId, color, ...props }: SwitchProps) {
  const switchRoofRef = useRef<THREE.Mesh>(null);
  const switchStemRef = useRef<THREE.Mesh>(null);
  const isPressedRef = useRef(false);

  const audio = useRef<HTMLAudioElement>(null);
  const audioTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const allAudio = useRef(
    SOUNDS_MAP[switchId].map((url) => {
      const audio = new Audio(url);
      audio.volume = 0.6;
      return audio;
    }),
  );

  const { nodes } = useGLTF("/switch.gltf") as unknown as GLTFResult;

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    if (
      !switchStemRef.current ||
      !switchRoofRef.current ||
      isPressedRef.current
    )
      return;
    isPressedRef.current = true;

    const stem = switchStemRef.current;
    const switchRoot = switchRoofRef.current;

    gsap.killTweensOf(stem.position);
    gsap.killTweensOf(switchRoot.rotation);

    gsap.to(switchRoot.rotation, {
      x: Math.PI / 2 + 0.1,
      duration: 0.05,
      ease: "power2.out",
    });

    gsap.to(stem.position, {
      z: 0.005,
      duration: 0.08,
      ease: "power2.out",
    });

    audio.current = gsap.utils.random(allAudio.current);
    audio.current.currentTime = 0;
    audio.current.play();
    audioTimeout.current = setTimeout(
      () => audio.current?.pause(),
      (audio.current.duration / 2) * 1000,
    );
  };

  const releaseSwitch = () => {
    if (
      !switchRoofRef.current ||
      !switchStemRef.current ||
      !isPressedRef.current
    )
      return;
    isPressedRef.current = false;

    const stem = switchStemRef.current;
    const switchRoot = switchRoofRef.current;

    gsap.to(switchRoot.rotation, {
      x: Math.PI / 2,
      duration: 0.6,
      ease: "elastic.out(1,0.3)",
    });

    gsap.to(stem.position, {
      z: 0,
      duration: 0.15,
      ease: "elastic.out(1, 0.3)",
    });

    if (audioTimeout.current) clearTimeout(audioTimeout.current);
    audio.current?.play();
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    releaseSwitch();
  };

  const handlePointerLeave = () => {
    releaseSwitch();
  };

  return (
    <group {...props}>
      <mesh
        position={[0, 0.05, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <group ref={switchRoofRef} scale={10} rotation={[Math.PI / 2, 0, 0]}>
        {/* Switch housing */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_1.geometry}
        >
          <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>

        {/* Gold contacts */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_2.geometry}
        >
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} />
        </mesh>

        {/* Colored stem */}
        <mesh
          ref={switchStemRef}
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_3.geometry}
        >
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>

        {/* Switch base */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Single_Switch_Mesh_4.geometry}
        >
          <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/switch.gltf");
