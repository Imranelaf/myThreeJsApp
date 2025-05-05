import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('canvas');

const scene = new THREE.Scene();

const size = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 10;
camera.position.y = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const geometry = new THREE.PlaneGeometry(4, 4);


const material = new THREE.MeshBasicMaterial({color: '#0000ff'})

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);


function animate() {
    requestAnimationFrame(animate);
    controls.update();

    
    renderer.render(scene, camera);
}

// Resizing
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();