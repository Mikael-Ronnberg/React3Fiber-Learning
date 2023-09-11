import * as THREE from "three";
import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";
import { useRef } from "react";

export const TestBox = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);

  const geometry = new THREE.PlaneGeometry(0.75, 0.75, 64, 64);
  const amount = geometry.attributes.position.count;

  const newAttributeArray = new Float32Array(amount);

  for (let i = 0; i < amount; i++) {
    newAttributeArray[i] = Math.random();
  }

  geometry.setAttribute(
    "a_modulus",
    new THREE.BufferAttribute(newAttributeArray, 1)
  );

  return (
    <>
      <mesh ref={meshRef} geometry={geometry}>
        <rawShaderMaterial vertexShader={vShader} fragmentShader={fShader} />
      </mesh>
    </>
  );
};
