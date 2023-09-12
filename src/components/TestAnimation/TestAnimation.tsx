import * as THREE from "three";
import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export const TestAnimation = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const clock = new THREE.Clock();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  // const handleMouseLeave = () => {
  //   setMousePosition({ x: 0, y: 0 });
  // };

  window.addEventListener("mousemove", handleMouseMove);
  // window.addEventListener("mouseleave", handleMouseLeave);

  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  const geometry = new THREE.PlaneGeometry(0.75, 0.75, 64, 64);

  const uniforms = {
    u_amplitude: { value: 12.0 },
    u_time: { value: 0 },
    u_color: { value: new THREE.Color("purple") },
    u_timecolor: { value: 0 },
    u_cursorcolor: {
      value: new THREE.Vector2(mousePosition.x, mousePosition.y),
    },
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
      // meshRef.current.position.x = mousePosition.x;
      // meshRef.current.position.y = mousePosition.y;
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
