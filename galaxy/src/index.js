import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

// Setting up the scene
const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
const gui = new GUI();

// Setting the screen dimensions
const size = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Setting up the camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 10;
camera.position.y = 5;

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Galaxy parameters
let stars = {
    number: 100,
    radius: 5,
    branches: 3
};

// Creating the material for the points (stars)
const material = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

// Creating the geometry to hold star positions
const geometry = new THREE.BufferGeometry();

// Points (star system) object
let point = null;
let radius = 0;

function generate() {
    let positions = new Float32Array(stars.number * 3);
    
    // Inserting the x, y, z values for each star
    for (let i = 0; i <= positions.length; i += 3) {
        radius = Math.random();
        positions[i] = radius * stars.radius;
        positions[i + 1] = 0;
        positions[i + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    point = new THREE.Points(geometry, material);
    scene.add(point);
}

// Adding axis helper
const axes = new THREE.AxesHelper();
scene.add(axes);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function galaxy() {
    requestAnimationFrame(galaxy);
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Initial generation and animation
generate();
galaxy();

// GUI controls
gui.add(stars, 'number').min(100).max(1000).step(100).onFinishChange(regenerate);
gui.add(stars, 'radius').min(5).max(20).step(1).name('radius').onFinishChange(regenerate);

function regenerate() {
    // Clear the old galaxy and generate a new one
    point.geometry.dispose();
    point.material.dispose();
    scene.remove(point);
    generate();
}
