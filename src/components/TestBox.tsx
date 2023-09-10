import vShader from "./shaders/vertex.glsl?raw";
import fShader from "./shaders/fragment.glsl?raw";

export const TestBox = () => {
  return (
    <mesh>
      <boxGeometry args={[5, 5, 5]} />
      <rawShaderMaterial vertexShader={vShader} fragmentShader={fShader} />
    </mesh>
  );
};
