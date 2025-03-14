import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experiment from "./components/Experiment";
import * as THREE from "three";
import { Perf } from "r3f-perf";
function App() {
  return (
    <Canvas
    
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{ fov: 75, near: 0.1, far: 200 }}
      shadows
    >
      <Perf position="top-left" />
      <Experiment />
    </Canvas>
  );
}

export default App;
