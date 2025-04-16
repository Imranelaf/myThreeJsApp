import * as THREE from 'three';
import './style.css'
import Object from '../classes/Object.js';
import Camera from '../classes/Camera.js';
import Rendering from '../classes/Rendering.js';
import Light from '../classes/Light.js';

const scene = new THREE.Scene();
const shape = new Object();
const camera = new Camera();
const light = new Light();
const test = new Model();

const canvas = document.querySelector('canvas'); // Get the canvas element
const rendering = new Rendering();
let renderer = rendering.display(canvas); // Initialize the renderer with the canvas

const torus = shape.shape();
const directionalLight = light.light();
let perspectiveCamera = camera.camera();



//resizing

window.addEventListener('resize', ()=>{
    perspectiveCamera = camera.camera();
    renderer = rendering.display(canvas);
    
})

scene.add(torus, directionalLight, perspectiveCamera);

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, perspectiveCamera);
}

animate();
