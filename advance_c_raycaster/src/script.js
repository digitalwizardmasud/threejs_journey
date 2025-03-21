import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()





// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
scene.add(ambientLight, directionalLight)

// Load Model 
let model = null
const gltfLoader = new GLTFLoader()
// const dracoLoader = new DRACOLoader()
// dracoLoader.setPath("./draco/")
// gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load("./models/Duck/glTF-Binary/Duck.glb", (gltf)=>{
    model = gltf.scene
    model.position.y = -1.2
    scene.add(model)
},
()=>{
    console.log("progress")
},
(err)=>{
    console.log("error")
}
)


/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

object1.updateMatrixWorld()
object2.updateMatrixWorld()
object3.updateMatrixWorld()

scene.add(object1, object2, object3)

// Raycaster 

const raycaster = new THREE.Raycaster()
// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(1, 0, 0)
// rayDirection.normalize()
// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)

// Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Mouse Move 
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>{
    mouse.x = (event.clientX/sizes.width * 2) - 1
    mouse.y = -((event.clientY/sizes.height * 2) - 1)
})

// Click 
let currentIntersect = null
window.addEventListener('click', () =>{
    if(currentIntersect){
        switch (currentIntersect.object){
            case object1:
                console.log('click on object1')
                object1.material.dispose()
                object1.geometry.dispose()
                scene.remove(object1)
                break
            case object2:
                console.log('click on object2')
                object2.material.dispose()
                object2.geometry.dispose()
                console.log(object2)
                scene.remove(object2)
                break
            case object3:
                console.log('click on object3')
                object3.material.dispose()
                object3.geometry.dispose()
                scene.remove(object3)
                break
        }
    }
})



// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Object 
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast 

    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)
    // rayDirection.normalize()
    // raycaster.set(rayOrigin, rayDirection)


     // Cast by Mouse move 
     raycaster.setFromCamera(mouse, camera)

    const objectToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectToTest)
    // objectToTest.forEach(object =>
    // {
    //     object.material.color.set('#ff0000')
    // }
    // )
    // intersects.forEach(intersect =>
    // {
    //     intersect.object.material.color.set('#0000ff')
    // }) 

    if(intersects.length){
        if (currentIntersect == null){
        }
        currentIntersect = intersects[0]
        currentIntersect.object.material.color.set('#0000ff')
    }else{
        if(currentIntersect){
            currentIntersect.object.material.color.set('#ff0000')
        }
        currentIntersect = null
    }
    
   if(model){
    const modelIntersects = raycaster.intersectObject(model)
    if(modelIntersects.length > 0){
        model.scale.set(1.5, 1.5, 1.5)
    }else{
        model.scale.set(1, 1, 1)
    }
   }


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()