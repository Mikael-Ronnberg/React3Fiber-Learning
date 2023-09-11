import * as THREE from "three";
import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";
import { useRef } from "react";

export const TestAnimation = () => {
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

  const uniforms = {
    u_amplitude: { value: 12.0 },
    u_time: { value: 0 },
  };

  return (
    <>
      <mesh ref={meshRef} geometry={geometry}>
        <rawShaderMaterial
          vertexShader={vShader}
          fragmentShader={fShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
