import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import GUI from "lil-gui";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";






// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("textures/matcaps/4.png")
const matcapTexture2 = textureLoader.load("textures/matcaps/7.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace
// Font
const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker.json", (font) => {
  const textGeometry = new TextGeometry("EID MUBARAK", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3
  });
  
  textGeometry.center()

  // 👉 Mathmatic Calculation to center the geometry
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.z) - 0.03 * 0.5,
  // )
  // textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox)
  
  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTexture
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(textMesh);

  console.time("donut")
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({map:matcapTexture2})
  for(let i=0; i<100; i++){
    const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)
    donutMesh.position.x = (Math.random() - 0.5) * 10
    donutMesh.position.y = (Math.random() - 0.5) * 10
    donutMesh.position.z = (Math.random() - 0.5) * 10
    donutMesh.rotation.x = Math.random()  * Math.PI
    donutMesh.rotation.y = Math.random()  * Math.PI
    const scale = Math.random()
    donutMesh.scale.set(scale, scale, scale)
    scene.add(donutMesh)
  }
  console.timeEnd("donut")
});


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// const controls = new TransformControls(camera, canvas);

controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
