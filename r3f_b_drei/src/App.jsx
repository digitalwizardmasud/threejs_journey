import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experiment from "./components/Experiment";
import CustomObject from "./components/CustomObject";
import * as THREE from 'three'
function App() {
  return (
    <Canvas gl={{
      toneMapping: THREE.ACESFilmicToneMapping,
      outputColorSpace: THREE.SRGBColorSpace
    }} camera={{ fov: 75, near: 0.1, far: 200, }}>
      <Experiment />
      <CustomObject />
    </Canvas>
  );
}

export default App;
