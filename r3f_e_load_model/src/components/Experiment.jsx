import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./Model";
import Placeholder from "./Placeholder";
import { Hamburger } from "./Hamburger";
import Fox from "./Fox";

const Experiment = () => {
  return (
    <>
      <OrbitControls />
      <directionalLight
        castShadow
        color={"#ffffff"}
        intensity={4}
        position={[1, 2, 3]}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />
      <PerformanceMonitor />
      <mesh
        receiveShadow
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        {/* <Model /> */}
        {/* <Hamburger /> */}
        <Fox />
      </Suspense>
    </>
  );
};

export default Experiment;

// Note : Same Same but Different
{
  /* <meshBasicMaterial  args={[{color:'blue'}]} />
<meshBasicMaterial  color="blue" /> */
}
