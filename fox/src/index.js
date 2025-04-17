import * as THREE from 'three';
import './style.css'
import Camera from '../classes/Camera.js';
import Rendering from '../classes/Rendering.js';
import Light from '../classes/Light.js';
import Object from '../classes/Object.js';
import Model from '../classes/LoadModel.js';

const scene = new THREE.Scene();
const camera = new Camera();
const light = new Light();
const object = new Object();
const model = new Model(scene);


const canvas = document.querySelector('canvas'); 
const rendering = new Rendering();
let renderer = rendering.display(canvas);


const directionalLight = light.DirectionalLight();
const ambientLight = light.AmbientLight();
const circle = object.shape();
scene.add(circle)
const cameraInstance = new Camera(canvas);
let perspectiveCamera = cameraInstance.getCamera();
model.loadModel();
  
//resizing

window.addEventListener('resize', ()=>{
    perspectiveCamera = camera.getCamera();
    renderer = rendering.display(canvas);
    animate()
    
})


scene.add(directionalLight, ambientLight)



// in your animation loop
function animate() {
    requestAnimationFrame(animate);
    cameraInstance.updateControls(); // update orbit
    renderer.render(scene, perspectiveCamera);
}

animate()
