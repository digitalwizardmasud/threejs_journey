import {
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Float,
  Helper,
  Html,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  PivotControls,
  RandomizedLight,
  Sky,
  SoftShadows,
  Stage,
  Text,
  TransformControls,
  useHelper,
} from "@react-three/drei";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Experiment = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const directionalLightRef = useRef();
  const sphere = useControls("sphere", {
    position: {
      joystick: "invertY",
      value: { x: 2, y: 0 },
      min: -10,
      max: 10,
      step: 0.1,
    },
    color: "mediumpurple",
    visible: true,
    interval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickme: button(() => {
      console.log("clicked");
    }),
    choice: {
      options: ["a", "b", "c"],
    },
  });

  const cube = useControls("Cube", {
    scale: {
      value: 1.5,
      min: 0,
      max: 3,
      step: 0.1,
    },
  });
  const otherOptions = useControls("Other", {
    perfVisible: true,
  });

  const skyOptions = useControls("Sun", {
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  const envMapOptions = useControls("Environment", {
    envMapIntensity: {
      value: 1,
      min: 0,
      max: 12,
    },
  });
  // const scene = useThree((state) => state.scene);
  // useEffect(() => {
  //   scene.environmentIntensity = envMapOptions.envMapIntensity;
  // }, [envMapOptions.envMapIntensity]);

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    // const time = state.clock.elapsedTime
    // cubeRef.current.position.x = Math.sin(time)  -4
  }, []);

  // Light Helper
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "green");

  return (
    <>
      {/* <Environment
        // background
        resolution={32}
        preset="sunset"
        ground={{
          height: 7,
          radius: 28,
          scale: 100
        }}
      >
        
      </Environment> */}

      {/* These will be inside Environment  */}
      {/* <color args={['black']} attach="background" /> */}
      {/* <Lightformer form="ring" position-z={-5} scale={10} color="cyan" intensity={10} /> */}
      {/* <mesh position-z={-1} position-x={6} rotation-y={-1} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows /> */}
      {/* <color args={["ivory"]} attach="background" /> */}
      {otherOptions?.perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      {/* <ContactShadows blur={5} far={5} scale={10} position={[0, -0.99, 0]} resolutions={512 } /> */}
      {/* <directionalLight
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        castShadow
        ref={directionalLightRef}
        color={"#ffffff"}
        intensity={4}
        position={[-2, 2, 2]}
      ></directionalLight> */}
      {/* <AccumulativeShadows temporal frames={Infinity} blend={100} color="#316d39" opacity={0.8}  position={[0, -0.99, 0]}>
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <ambientLight intensity={1} /> */}
      {/* <Sky 
        sunPosition={skyOptions.sunPosition}
      /> */}

      {/* Sphere  */}
      <Stage
         shadows={ { type: 'contact', opacity: 0.2, blur: 3 } }
         environment="sunset"
         preset="portrait"
      >
        <mesh
          castShadow
          ref={sphereRef}
          visible={sphere.visible}
          position={[sphere.position.x, sphere.position.y, 0]}
        >
          <sphereGeometry />
          <meshStandardMaterial color={sphere.color} />
        </mesh>

        {/* Cube  */}
        <mesh castShadow ref={cubeRef} scale={cube.scale} position-x={-2}>
          <boxGeometry />
          <meshStandardMaterial color="lightblue" />
        </mesh>
      </Stage>
      {/* Plane  */}
      <mesh
        receiveShadow
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial color="#11ff11" />
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

// directionalLight.shadow.mapSize.set(1024, 1024) // Raw ThreeJS
{
  /* <directionalLight shadow-mapSize={[1024, 1024]} /> // React Three Fiber */
}
// Access with highfen ( - ) instead of dot ( . )
