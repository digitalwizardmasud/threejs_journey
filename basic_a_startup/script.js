import * as THREE from "three"

const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: 800,
    height: 600
}
// Scene
const scene = new THREE.Scene()

// Object 
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// renderer 
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)