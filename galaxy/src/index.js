import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
const gui = new GUI();

//Screen size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
};

//Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 200);
camera.position.set(0, 5, 10);
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Galaxy parameters
let stars = {
    number: 3000,
    radius: 5,
    branches: 5,
    spin: 2,
    randomness: 0.4,
    sazing: 0,
    depthColor: '#ff6400',
    faceColor: '#0c2bb3'
};

// Shader material
const material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
        size: { value: 12.0 * renderer.getPixelRatio() },
        time: { value: 0 }
    },
    vertexShader: `
        uniform float size;
        uniform float time;
        attribute float ascale;
        varying vec3 vcolor;

        void main() {
            vec3 newPosition = position;
            float distanceToCenter = length(newPosition.xz);
            float angle = atan(newPosition.x, newPosition.z) + time * 0.8 * (1.0 / (distanceToCenter + 0.1));
            newPosition.x = cos(angle) * distanceToCenter;
            newPosition.z = sin(angle) * distanceToCenter;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            gl_PointSize = size + ascale;
            vcolor = color;
        }
    `,
    fragmentShader: `
        varying vec3 vcolor;
        void main() {
            float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;
            strength = pow(strength, 5.0);
            vec3 color = mix(vec3(0.0), vcolor, strength);
            gl_FragColor = vec4(color, 1.0);
        }
    `
});

// Geometry and Points
let geometry, point;

function generateGalaxy() {
    if (point !== undefined) {
        geometry.dispose();
        scene.remove(point);
    }

    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(stars.number * 3);
    const scales = new Float32Array(stars.number);
    const colors = new Float32Array(stars.number * 3);

    const insideColor = new THREE.Color(stars.depthColor);
    const outsideColor = new THREE.Color(stars.faceColor);

    for (let i = 0; i < stars.number; i++) {
        const i3 = i * 3;
        const radius = Math.random() * stars.radius;
        const branchAngle = (i % stars.branches) / stars.branches * Math.PI * 2;
        const spinAngle = radius * stars.spin;

        const randomX = (Math.random() - 0.5) * stars.randomness;
        const randomY = (Math.random() - 0.5) * stars.randomness;
        const randomZ = (Math.random() - 0.5) * stars.randomness;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / stars.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        scales[i] = Math.random() * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('ascale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    point = new THREE.Points(geometry, material);
    scene.add(point);
}

generateGalaxy();

// GUI control
gui.add(stars, 'number', 100, 10000, 100).onFinishChange(generateGalaxy);
gui.add(stars, 'radius', 1, 10, 0.1).onFinishChange(generateGalaxy);
gui.add(stars, 'branches', 2, 10, 1).onFinishChange(generateGalaxy);
gui.add(stars, 'spin', 0, 5, 0.1).onFinishChange(generateGalaxy);
gui.add(stars, 'randomness', 0, 2, 0.01).onFinishChange(generateGalaxy);
gui.addColor(stars, 'depthColor').onFinishChange(generateGalaxy);
gui.addColor(stars, 'faceColor').onFinishChange(generateGalaxy);

// Handle resize
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    material.uniforms.time.value = clock.getElapsedTime();

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
