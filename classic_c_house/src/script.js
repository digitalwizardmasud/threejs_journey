import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'


// Debug
// const gui = new GUI()

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
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp")
const floorColorTexture = textureLoader.load("./floor/coast_sand_rocks_02/diff_1k.webp")
const floorARMTexture = textureLoader.load("./floor/coast_sand_rocks_02/arm_1k.webp")
const floorNormalTexture = textureLoader.load("./floor/coast_sand_rocks_02/nor_gl_1k.webp")
const floorDisplacementTexture = textureLoader.load("./floor/coast_sand_rocks_02/disp_1k.webp")

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
const wallColorTexture = textureLoader.load("./wall/castle_brick_broken_06/diff_1k.webp")
const wallARMTexture = textureLoader.load("./wall/castle_brick_broken_06/arm_1k.webp")
const wallNormalTexture = textureLoader.load("./wall/castle_brick_broken_06/nor_gl_1k.webp")
wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof Texture
const roofColorTexture = textureLoader.load("./roof/roof_slates_02/diff_1k.webp")
const roofARMTexture = textureLoader.load("./roof/roof_slates_02/arm_1k.webp")
const roofNormalTexture = textureLoader.load("./roof/roof_slates_02/nor_gl_1k.webp")
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping

// Bushes Texture
const bushColorTexture = textureLoader.load("./bush/leaves_forest_ground/diff_1k.webp")
const bushARMTexture = textureLoader.load("./bush/leaves_forest_ground/arm_1k.webp")
const bushNormalTexture = textureLoader.load("./bush/leaves_forest_ground/nor_gl_1k.webp")
bushColorTexture.colorSpace = THREE.SRGBColorSpace


// Grave Texture
const graveColorTexture = textureLoader.load("./grave/plastered_stone_wall/diff_1k.webp")
const graveARMTexture = textureLoader.load("./grave/plastered_stone_wall/arm_1k.webp")
const graveNormalTexture = textureLoader.load("./grave/plastered_stone_wall/nor_gl_1k.webp")
graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Door Texture 
const doorColorTexture = textureLoader.load("./door/color.webp")
const doorAlphaTexture = textureLoader.load("./door/alpha.webp")
const doorAmbientOcclusionTexture = textureLoader.load("./door/ambientOcclusion.webp")
const doorHeightTexture = textureLoader.load("./door/height.webp")
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp")
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp")
const doorNormalTexture = textureLoader.load("./door/normal.webp")

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
        roughnessMap:doorRoughnessTexture,
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
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorLight = new THREE.PointLight("#ff7d46",5)
doorLight.position.set(0, houseMeasurement.height-0.1, (houseMeasurement.depth / 2)+0.3)
scene.add(doorLight)

const ghostLight1 = new THREE.PointLight("#8800ff", 6)
const ghostLight2 = new THREE.PointLight("#ff0088", 6)
const ghostLight3 = new THREE.PointLight("#ff0000", 6)



scene.add(ghostLight1, ghostLight2, ghostLight3)


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
controls.maxPolarAngle = Math.PI / 2.5;
controls.enableDamping = true

// 👉 Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Shadow 
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghostLight1.castShadow = true
ghostLight2.castShadow = true
ghostLight3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
roof.receiveShadow = true
floor.receiveShadow = true

graves.children.forEach(gv=>{
    gv.castShadow = true
    gv.receiveShadow = true
})

// Mapping 
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near =1 
directionalLight.shadow.camera.far =20 

ghostLight1.shadow.mapSize.width = 256
ghostLight1.shadow.mapSize.height = 256
ghostLight1.shadow.camera.far = 10

ghostLight2.shadow.mapSize.width = 256
ghostLight2.shadow.mapSize.height = 256
ghostLight2.shadow.camera.far = 10

ghostLight3.shadow.mapSize.width = 256
ghostLight3.shadow.mapSize.height = 256
ghostLight3.shadow.camera.far = 10



// Sky 
const sky = new Sky()
sky.scale.set(100,100,100)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
scene.add(sky)

// Fog 
// scene.fog = new THREE.Fog("#ff0000", 10, 13)
scene.fog = new THREE.FogExp2("#02343f", 0.1)



/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost Light Animation 
    const ghost1Angel = elapsedTime * 0.5
    ghostLight1.position.x =  Math.cos(ghost1Angel) * 4
    ghostLight1.position.z =  Math.sin(ghost1Angel) * 4
    ghostLight1.position.y =  Math.sin(ghost1Angel) * Math.sin(ghost1Angel*2.34) * Math.sin(ghost1Angel*3.45)

    const ghost2Angel = - elapsedTime * 0.38
    ghostLight2.position.x =  Math.cos(ghost2Angel) * 5
    ghostLight2.position.z =  Math.sin(ghost2Angel) * 5
    ghostLight2.position.y =  Math.sin(ghost2Angel) * Math.sin(ghost2Angel*2.34) * Math.sin(ghost2Angel*3.45)

    const ghost3Angel = elapsedTime * 0.23
    ghostLight3.position.x =  Math.cos(ghost3Angel) * 6
    ghostLight3.position.z =  Math.sin(ghost3Angel) * 6
    ghostLight3.position.y =  Math.sin(ghost3Angel) * Math.sin(ghost3Angel*2.34) * Math.sin(ghost3Angel*3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()