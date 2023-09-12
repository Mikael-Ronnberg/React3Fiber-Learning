import * as THREE from "three";
import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const TestAnimation = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const clock = new THREE.Clock();

  const handleMouseMove = (e: MouseEvent) => {
    // const { clientX, clientY } = e;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ ...mousePosition, x, y });
  };

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(0.75, 0.75, 64, 64);
  }, []);

  const material = useMemo(() => {
    const uniforms = {
      u_amplitude: { value: 12.0 },
      u_time: { value: 0 },
      u_color: { value: new THREE.Color("purple") },
      u_timecolor: { value: 0 },
      u_cursorcolor: {
        value: new THREE.Vector2(mousePosition.x, mousePosition.y),
      },
    };

    window.addEventListener("mousemove", handleMouseMove);

    return new THREE.RawShaderMaterial({
      vertexShader: vShader,
      fragmentShader: fShader,
      uniforms: uniforms,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.u_time.value = elapsedTime;
      material.uniforms.u_timecolor.value = elapsedTime;
      material.uniforms.u_cursorcolor.value.y = mousePosition.y;
      material.uniforms.u_cursorcolor.value.x = mousePosition.x;
    }
  });

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} material={material} />
    </>
  );
};
