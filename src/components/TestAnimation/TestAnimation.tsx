import * as THREE from "three";
import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const TestAnimation = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const clock = new THREE.Clock();

  const geometry = new THREE.PlaneGeometry(0.75, 0.75, 64, 64);

  const uniforms = {
    u_amplitude: { value: 12.0 },
    u_time: { value: 0 },
    u_color: { value: new THREE.Color("purple") },
    u_timecolor: { value: 0 },
  };

  const material = new THREE.RawShaderMaterial({
    vertexShader: vShader,
    fragmentShader: fShader,
    uniforms: uniforms,
    side: THREE.DoubleSide,
  });

  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.u_time.value = elapsedTime;
      material.uniforms.u_timecolor.value = elapsedTime;
    }
  });

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </>
  );
};
