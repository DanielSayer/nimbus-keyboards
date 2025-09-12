"use client";

import { useProgress } from "@react-three/drei";
import { Loader } from "./loader";

function LoaderWrapper() {
  const { active } = useProgress();

  return active ? <Loader /> : null;
}

export { LoaderWrapper };
