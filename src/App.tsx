import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TestBox } from "./components/TestBox";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <TestBox />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true} //
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

export default App;
