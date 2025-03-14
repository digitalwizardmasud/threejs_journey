import { Clone, OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, extend, useThree, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import Placeholder from "./Placeholder";

const Model = () => {
  //   const model = useLoader(
  //     GLTFLoader,
  //     "./hamburger.glb",
  //     (loader) => {
  //       console.log(loader, "load");
  //       const dracoLoader = new DRACOLoader();
  //       dracoLoader.setDecoderPath("./draco/");
  //       loader.setDRACOLoader(dracoLoader);
  //     }
  //   );
  // const model = useGLTF("./hamburger.glb")
  const { nodes, materials } = useGLTF("./hamburger.glb");
  const burger = nodes?.Scene?.children?.map((mess, i) => {
    return (
      <mesh
        key={i}
        castShadow
        receiveShadow
        geometry={mess.geometry}
        material={mess.material}
        position={[mess.position.x, mess.position.y, mess.position.z]}
      />
    );
  });
  return (
    <>
      {/* <primitive object={model.scene} scale={0.35} /> */}
      {/* <Clone object={model.scene} scale={0.35} position-x={-2} /> */}
      <group>
        {/* <mesh 
          castShadow
          receiveShadow
          geometry={nodes.bottomBun.geometry}
          material={materials.BunMaterial}
        />
        <mesh 
          castShadow
          receiveShadow
          geometry={nodes.meat.geometry}
          material={materials.SteakMaterial}
          position={[0, 2.817, 0]}
        /> */}
        {burger}
      </group>
    </>
  );
};

export default Model;

useGLTF.preload("./hamburger.glb");
