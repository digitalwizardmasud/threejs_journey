import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// let time = Date.now()
// const tick = () => {
//     // Time 
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//     // Update objects
//     mesh.rotation.y += 0.001 * deltaTime
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()

gsap.to(mesh.position, {
    x:2,
    delay:1,
    duration: 1
})
gsap.to(mesh.position, {
    x:0,
    delay:2,
    duration: 1
})

let clock = new THREE.Clock()
const tick = () => {
    // Time 
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    // mesh.rotation.y =  elapsedTime

    // Mesh position change
    // mesh.position.y =  Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // Camera position change
    // camera.position.y =  Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)

    // Mesh and camera position change both effect look same
    // But when use camera lookAt mesh position then camera moves but always follows the mesh position so it shows all part of box
    // camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()