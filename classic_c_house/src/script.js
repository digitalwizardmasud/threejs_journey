import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'


// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//  Measurement
const houseMeasurement = {
    width: 4,
    height: 2.5,
    depth: 4
}
const doorMeasurement = {
    height: 2.2,
    width: 2.2
}


// 👉 Textures
const textureLoader = new THREE.TextureLoader()

// Floor Texture
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg")
const floorColorTexture = textureLoader.load("./floor/coast_sand_rocks_02/diff_1k.jpg")
const floorARMTexture = textureLoader.load("./floor/coast_sand_rocks_02/arm_1k.jpg")
const floorNormalTexture = textureLoader.load("./floor/coast_sand_rocks_02/nor_gl_1k.jpg")
const floorDisplacementTexture = textureLoader.load("./floor/coast_sand_rocks_02/disp_1k.jpg")

floorColorTexture.colorSpace = THREE.SRGBColorSpace
floorColorTexture.repeat.setScalar(8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.repeat.setScalar(8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.setScalar(8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.setScalar(8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall Texture 
const wallColorTexture = textureLoader.load("./wall/castle_brick_broken_06/diff_1k.jpg")
const wallARMTexture = textureLoader.load("./wall/castle_brick_broken_06/arm_1k.jpg")
const wallNormalTexture = textureLoader.load("./wall/castle_brick_broken_06/nor_gl_1k.jpg")
wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof Texture
const roofColorTexture = textureLoader.load("./roof/roof_slates_02/diff_1k.jpg")
const roofARMTexture = textureLoader.load("./roof/roof_slates_02/arm_1k.jpg")
const roofNormalTexture = textureLoader.load("./roof/roof_slates_02/nor_gl_1k.jpg")
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping

// Bushes Texture
const bushColorTexture = textureLoader.load("./bush/leaves_forest_ground/diff_1k.jpg")
const bushARMTexture = textureLoader.load("./bush/leaves_forest_ground/arm_1k.jpg")
const bushNormalTexture = textureLoader.load("./bush/leaves_forest_ground/nor_gl_1k.jpg")
bushColorTexture.colorSpace = THREE.SRGBColorSpace


// Grave Texture
const graveColorTexture = textureLoader.load("./grave/plastered_stone_wall/diff_1k.jpg")
const graveARMTexture = textureLoader.load("./grave/plastered_stone_wall/arm_1k.jpg")
const graveNormalTexture = textureLoader.load("./grave/plastered_stone_wall/nor_gl_1k.jpg")
graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Door Texture 
const doorColorTexture = textureLoader.load("./door/color.jpg")
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("./door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("./door/height.jpg")
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg")
const doorNormalTexture = textureLoader.load("./door/normal.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace

//👉 Meshes
// wall 
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementScale: -0.2
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


// House Group 
const house = new THREE.Group()
scene.add(house)

// Wall 
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(houseMeasurement.width, houseMeasurement.height, houseMeasurement.depth),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y = houseMeasurement.height/2
house.add(walls)

// Roof 
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = houseMeasurement.height + (roof.geometry.parameters.height/2)
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorMeasurement.width, doorMeasurement.height, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.03,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture
        
    })
)
door.position.y = doorMeasurement.height/2
door.position.z = (houseMeasurement.depth / 2) + 0.001
house.add(door)

// Bush 
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: 0xccffcc,
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture

})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5) //bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.02, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Grave 
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

for (let i=0; i<30; i++){
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 3    
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.z = z
    grave.position.y = Math.random() * (graveGeometry.parameters.height/2)
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}


//👉 Lights
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// const directionalLightAxesHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightAxesHelper)

/**
 * Sizes
 */
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

// 👉 Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.maxPolarAngle = Math.PI / 2.5;
controls.enableDamping = true

// 👉 Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()