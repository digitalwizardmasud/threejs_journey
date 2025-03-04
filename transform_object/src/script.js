import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();


// Group 
const group = new THREE.Group();
scene.add(group)

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xffff00}))
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xff00ff}))
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0x00ffff}))

cube2.position.set(2, 0,0)
cube3.position.set(0, 2, 0)

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.y = 0.2
group.position.z = -5

// Position 
// mesh.position.x = 1;
// mesh.position.y = -1;
// mesh.position.z = -3;
// mesh.position.set(1,-1, -3)

// Scale 
// mesh.scale.set(2, 1, 1)

// Rotation 
// mesh.rotation.reorder("YXZ")
// mesh.rotation.x = 0.3
// mesh.rotation.y = 0.5
// mesh.rotation.z =  0.1
// mesh.rotation.set(0,1,0)
// scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1
camera.position.y = 1
scene.add(camera);
// camera.lookAt(group.position)


// Axes Helper 
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);



// mesh.position.normalize()
// renderer.render(scene, camera);