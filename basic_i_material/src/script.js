import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

const gui = new GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture 
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/9.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.set(2, 3, 4)
// scene.add(ambientLight, pointLight)

// Environment map
const rgbeLoader = new RGBELoader()
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

// 👉 Mesh Basic Material 
// const material = new THREE.MeshBasicMaterial({map: doorColorTexture, color:"red"})
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('red') // Not work only color name
// material.wireframe = true
// material.transparent = true // Make transparent = true to work with opacity and alphaMap
// material.opacity = 0.6
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// 👉 Mesh Normal Materia
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true 

// 👉 Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// 👉 Mesh Depth Material
// const material = new THREE.MeshDepthMaterial()

// 👉 Mesh lambert Material
// const material = new THREE.MeshLambertMaterial()


// 👉 Mesh Phong Material
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1
// material.specular = new THREE.Color(0x1188ff)

// 👉 Mesh Toon Material
// const material = new THREE.MeshToonMaterial()
// gradientTexture.generateMipmaps = false
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.minFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// 👉 Mesh Standard Material
// const material = new THREE.MeshStandardMaterial()

// material.metalness = 0.7
// material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// gui.add(material, "metalness", 0, 1, 0.001)
// gui.add(material, "roughness", 0, 1, 0.001)


// 👉 Mesh Physical Material
const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0
// material.roughness = 0
// gui.add(material, "metalness", 0, 1, 0.01)
// gui.add(material, "roughness", 0, 1, 0.01)

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)

// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, "clearcoat", 0, 1, 0.001)
// gui.add(material, "clearcoatRoughness", 0, 1, 0.001)

// material.sheen = 1
// material.sheenRoughness = 1
// material.sheenColor.set(1,1,1)
// gui.addColor(material, "sheenColor")
// gui.add(material, "sheen", 0, 1, 0.01)
// gui.add(material, "sheenRoughness", 0, 1, 0.01)

// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// gui.add(material, "iridescence",0, 1, 0.0001)
// gui.add(material, "iridescenceIOR", 1, 2.33, 0.0001)
// gui.add(material.iridescenceThicknessRange, "0", 1, 1000, 1).name("iri0")
// gui.add(material.iridescenceThicknessRange, "1", 1, 1000, 1).name("iri1")

material.transmission = 0.5
material.ior = 1
material.thikness = 0.5
gui.add(material, "transmission",0, 1, 0.0001)
gui.add(material, "ior",1, 10, 0.0001)
gui.add(material, "thikness",0, 1, 0.0001)




// All Mesh 
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1, 100, 100), material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)

sphere.position.x = -1.5
torus.position.x = 1.5
scene.add(sphere, plane, torus)

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

