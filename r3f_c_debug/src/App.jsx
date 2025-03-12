import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experiment from "./components/Experiment";
import * as THREE from 'three'
function App() {
  return (
    <Canvas>
      
      <Experiment />
    </Canvas>
  );
}

export default App;
