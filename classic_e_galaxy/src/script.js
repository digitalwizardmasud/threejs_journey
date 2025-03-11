import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Galaxy
const parameters = {
  count: 10000,
  size: 0.01,
  radius: 6,
  branches: 3,
  spin: 1.5,
  randomness: 0.2,
  randomnessPower: 2.5,
  insideColor: "#ff6030",
  outsideColor:"#1b3984"
};
let geometry = null;
let material = null;
let points = null;
const generateGalaxy = () => {
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)
  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    // positions 
    const radius = Math.random() * parameters.radius;
    const branchAngel =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
    const spinAngle = radius * parameters.spin;
    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngel + spinAngle) * radius + randomX;
    positions[i3 + 1] = 0 + randomY;
    positions[i3 + 2] = Math.sin(branchAngel + spinAngle) * radius + randomZ;

    // colors 
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius/parameters.radius)
    colors[i3] = mixedColor.r
    colors[i3+1] = mixedColor.g
    colors[i3+2] = mixedColor.b
  }
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent:true,

  });
  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

const regenerate = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  generateGalaxy();
};
gui
  .add(parameters, "count", 50, 10000, 10)
  .name("particles")
  .onFinishChange(regenerate);
gui.add(parameters, "radius", 1, 10, 0.01).onFinishChange(regenerate);
gui.add(parameters, "branches", 2, 20, 1).onFinishChange(regenerate);
gui.add(parameters, "spin", -5, 5, 0.001).onFinishChange(regenerate);
gui.add(parameters, "randomness", 0, 2, 0.001).onFinishChange(regenerate);
gui.add(parameters, "randomnessPower", 1, 10, 0.001).onFinishChange(regenerate);
gui.addColor(parameters, "insideColor").onFinishChange(regenerate)
gui.addColor(parameters, "outsideColor").onFinishChange(regenerate)

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
