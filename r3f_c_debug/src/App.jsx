import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experiment from "./components/Experiment";
import * as THREE from 'three'
import { Leva } from "leva";
function App() {
  return (
     <>
     <Leva collapsed />
     
     <Canvas>
      <Experiment />
    </Canvas>
    </>
  );
}

export default App;
