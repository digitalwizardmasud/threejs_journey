import { useFrame, extend, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const Experiment = () => {
    extend({OrbitControls})
    const cubeRef = useRef()
    const groupRef = useRef()
    
    const {camera, gl} = useThree()
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight castShadow color={'#ffffff'} intensity={4} position={[1,2,3]} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh castShadow position-x={2}>
            <sphereGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh castShadow ref={cubeRef} scale={1.5} position-x={-2}>
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
        </mesh>
      </group>
      <mesh receiveShadow scale={10} position-y={-1} rotation-x = {- Math.PI*0.5} >
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
