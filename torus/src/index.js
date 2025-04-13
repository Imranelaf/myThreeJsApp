// index.js
import * as THREE from 'three';
import './style.css'
import Object from '../Classes/Object.js';
import Camera from '../Classes/Camera.js';
import Rendering from '../Classes/Rendering.js';
import Light from '../Classes/Light.js';

const scene = new THREE.Scene();
const shape = new Object();
const camera = new Camera();
const light = new Light();

const canvas = document.querySelector('canvas'); // Get the canvas element
const rendering = new Rendering();
const renderer = rendering.display(canvas); // Initialize the renderer with the canvas

const torus = shape.shape();
const directionalLight = light.light();
const perspectiveCamera = camera.camera();

scene.add(torus, directionalLight, perspectiveCamera);

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, perspectiveCamera);
}

animate();