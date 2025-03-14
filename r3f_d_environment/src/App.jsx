import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experiment from "./components/Experiment";
import * as THREE from 'three'
import { Leva } from "leva";
function App() {
  const canvasCreated = (state) => {
    // state.gl.setClearColor("red")
    console.log(state)
    // state.scene.background = new THREE.Color("blue")
  }
  return (
     <>
     <Leva collapsed={false} />
     
     <Canvas onCreated={canvasCreated} shadows={true}>
      <Experiment />
      {/* <color args={["ivory"]} attach="background" /> */}
    </Canvas>
    </>
  );
}

export default App;
