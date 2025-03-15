import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import portalVertexShader from "../shaders/portal/vertex.glsl?raw"
import portalFragmentShader from "../shaders/portal/fragment.glsl?raw"
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000")
  },
  portalVertexShader,
  portalFragmentShader
)


const Experiment = () => {
  extend({PortalMaterial})
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;

  const portalRef = useRef()

  useFrame((state, delta)=>{
    portalRef.current.uTime += delta
  },[])
  return (
    <>
      <color args={["#030202"]} attach="background" />
      <OrbitControls />
      {/* <mesh
        receiveShadow
        scale={4}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
      >
        <boxGeometry />
        <meshNormalMaterial  />
      </mesh>  */}

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          rotation={nodes.poleLightA.rotation}
          scale={nodes.poleLightA.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          rotation={nodes.poleLightB.rotation}
          scale={nodes.poleLightB.scale}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
          scale={nodes.portalLight.scale}
        >
          {/* <meshBasicMaterial color="#ffffe5" /> */}
          {/* <shaderMaterial 
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: {value: 0},
              uColorStart: {value: new THREE.Color("#ffffff")},
              uColorEnd: {value: new THREE.Color("#000000")}
            }}
          /> */}
          <portalMaterial ref={portalRef} side={THREE.DoubleSide} />
        </mesh>
        <Sparkles size={6} scale={[4,2,4]} position-y={1} speed={0.2} count={40} />
      </Center>
    </>
  );
};

export default Experiment;
