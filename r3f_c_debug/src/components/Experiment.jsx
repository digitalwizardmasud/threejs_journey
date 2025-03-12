import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei";
import { useFrame, extend, useThree } from "@react-three/fiber";
import React, { useRef } from "react";

const Experiment = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight color={"blue"} intensity={4} position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />
      <group>
      
          {/* Sphere  */}
          <mesh ref={sphereRef} position-x={2}>
            <sphereGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>

        {/* Cube  */}
        <mesh ref={cubeRef} scale={1.5} position-x={-2}>
          <boxGeometry />
          <meshStandardMaterial color="lightblue" />
        </mesh>

      </group>

      {/* Plane  */}
      <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>

      
    </>
  );
};

export default Experiment;

// Note : Same Same but Different
{
  /* <meshBasicMaterial  args={[{color:'blue'}]} />
<meshBasicMaterial  color="blue" /> */
}
