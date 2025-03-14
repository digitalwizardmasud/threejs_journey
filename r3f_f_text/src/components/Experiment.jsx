import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from 'three'
import { useFrame, extend, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

const Experiment = () => {
  const [matcapTexture] = useMatcapTexture("254FB0_99AFF0_6587D8_1D3279", 256);
  // const [torusGeometry, setTorusGeometry] = useState()
  // const [material, setMaterial] = useState()

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setMaterial(new THREE.MeshNormalMaterial())
  //   }, 2000)
  // },[])

  useEffect(()=>{
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    material.matcap = matcapTexture
    material.needsUpdate = true
  },[])


  // Accessing Every Mesh 
  const donutsRef = useRef([])
  console.log(donutsRef, 'ref')
  useFrame((state, delta)=>{
    for (const donut of donutsRef.current){
      donut.rotation.y += delta * 0.2
    }
  })
  return (
    <>
    {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
    <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      <OrbitControls />
      <directionalLight
        castShadow
        color={"#ffffff"}
        intensity={4}
        position={[1, 2, 3]}
      />
      <ambientLight intensity={1.5} />
      <Center>
        <Text3D
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          size={1.75}
          font="/public/fonts/helvetiker_regular.typeface.json"
          material={material}
        >
          Hello R3F
          {/* <meshNormalMaterial /> */}
        </Text3D>
      </Center>
      {
        [...Array(100)].map((_, key)=>
          <mesh ref={(element)=>donutsRef.current[key]=element} key={key} position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          scale={0.2 + Math.random() * 0.2}
          geometry={torusGeometry}
          material={material}
          >
            {/* <torusGeometry args={[1, 0.6, 16, 32]} /> */}
            {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
          </mesh>
        )
      }
      {/* <mesh
        receiveShadow
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial color="yellow" />
      </mesh> */}
    </>
  );
};

export default Experiment;

// Note : Same Same but Different
{
  /* <meshBasicMaterial  args={[{color:'blue'}]} />
<meshBasicMaterial  color="blue" /> */
}
