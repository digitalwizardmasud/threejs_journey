import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// cursor 
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", (event)=>{
    cursor.x = (event.clientX / sizes.width) - 0.5
    cursor.y = - ((event.clientY / sizes.height) - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// OrthographicCamera 
// const ar = sizes.width/sizes.height
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100) // Looks not like cube
// const camera = new THREE.OrthographicCamera(-1 * ar, 1 * ar, 1, -1, 0.1, 100) // Looks  like cube
// const camera = new THREE.OrthographicCamera(-0.1, 0.1, 0.1, -0.1, 0.1, 100)  // look larger
// const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100) // look smaller

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
console.log(camera.position.length(), 'camera position')
camera.lookAt(mesh.position)
scene.add(camera)

// Orbit control 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    // update camera by mouse 
    // camera.position.x = cursor.x*10
    // camera.position.y = cursor.y*10
    // camera.lookAt(mesh.position)

    // Super cool personal control
    // const val1 = Math.sin(cursor.x * Math.PI * 2) * 3
    // const val2 = Math.cos(cursor.x * Math.PI * 2) * 3
    // console.log(val1, 'val1')
    // console.log(cursor.x, 'cursor.x')
    // camera.position.x = val1
    // camera.position.z = val2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    // default threejs control 
    
    controls.update()
    

    // const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime;
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()