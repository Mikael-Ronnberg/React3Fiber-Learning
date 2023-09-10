import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TestBox } from "./components/TestBox";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <TestBox />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
