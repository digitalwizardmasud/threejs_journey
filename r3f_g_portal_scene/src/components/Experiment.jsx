import {
  OrbitControls,
} from "@react-three/drei";
import * as THREE from 'three'


const Experiment = () => {
  
  return (
    <>
      <OrbitControls />
      <directionalLight
        castShadow
        color={"#ffffff"}
        intensity={4}
        position={[1, 2, 3]}
      />
      <ambientLight intensity={1.5} />
      
      
      <mesh
        receiveShadow
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh> 
    </>
  );
};

export default Experiment;

