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
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import React, { useRef } from "react";

const Experiment = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const sphere = useControls("sphere",{
    position: {
      joystick:'invertY',
      value: {x:2, y:0},
      min: -10,
      max: 10,
      step: 0.1
    },
    color: "mediumpurple",
    visible: true,
    interval : {
      min: 0,
      max: 10,
      value: [4, 5]
    },
    clickme: button(()=> {
      console.log('clicked')
    }),
    choice: {
      options: ['a', 'b', 'c']
    }

  })

  const cube = useControls("Cube", {
    scale: {
      value: 1.5,
      min: 0,
      max: 3,
      step: 0.1
    }
  })
  const otherOptions = useControls("Other", {
    perfVisible: false
  })
  
  return (
    <>
      {
        otherOptions?.perfVisible && <Perf position="top-left" />
      }
      <OrbitControls makeDefault />
      <directionalLight color={"blue"} intensity={4} position={[1, 2, 3]} />
      <ambientLight intensity={1.5} />
      <group>
      
          {/* Sphere  */}
          <mesh ref={sphereRef} visible={sphere.visible} position={[sphere.position.x, sphere.position.y, 0]} >
            <sphereGeometry />
            <meshStandardMaterial color={sphere.color} />
          </mesh>

        {/* Cube  */}
        <mesh ref={cubeRef} scale={cube.scale} position-x={-2}>
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
