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
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, .1, 100);
camera.position.z = 10;
camera.position.y = 5;

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Galaxy parameters
let stars = {
    number: 200,
    radius: 2,
    branches: 4,
    spin: 3,
    randomness: .2
};

// Creating the material for the points (stars)
const material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: `
        void main() {
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 2.0;
    }
    `,
    fragmentShader: ` void main(){ 

        gl_FragColor = vec4(1.0,1.0,1.0, 1.0);
    }`
});

// Creating the geometry to hold star positions
const geometry = new THREE.BufferGeometry();

// Points (star system) object
let point = null;
let radius =  0;

function generate() {
    let positions = new Float32Array(stars.number * 3);

    let branchesAngle = 0;

    // Inserting the x, y, z values for each star
    for (let i = 0; i < stars.number; i++) {
        radius =  Math.random() * stars.radius * stars.spin;
        const i3 = i *3;
        branchesAngle = (i % stars.branches) / stars.branches * Math.PI * 2;
       
        positions[i3] = Math.cos(branchesAngle + radius) * radius + ((Math.random() - .5) * stars.randomness);
        positions[i3 + 1] = (Math.random()- .5) * stars.randomness;
        positions[i3 + 2] =Math.sin(branchesAngle + radius) * radius + ((Math.random() -.5) * stars.randomness);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    point = new THREE.Points(geometry, material);
    scene.add(point);
}

// Adding axis helper
/* const axes = new THREE.AxesHelper();
scene.add(axes); */

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = .05;

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
gui.add(stars, 'radius').min(1).max(10).step(1).name('radius').onFinishChange(regenerate);
gui.add(stars, 'branches').min(3).max(10).step(1).name('branches').onFinishChange(regenerate);
gui.add(stars, 'spin').min(-10).max(10).step(1).name('spin').onFinishChange(regenerate);
gui.add(stars, 'randomness').min(0).max(0.6).step(0.01).name('randomness').onFinishChange(regenerate);


function regenerate() {
    // Clear the old galaxy and generate a new one
    point.geometry.dispose();
    point.material.dispose();
    scene.remove(point);
    generate();
}
