import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

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
let elapseTime = clock.getElapsedTime();

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Create a plane geometry in the XY plane with more segments for smoother waves
const geometry = new THREE.PlaneGeometry(4, 4, 64, 64);

const vertex = `
    uniform float Time;
    uniform float waveFrequancy;
    uniform vec2 wavesFrequancy;
    
    void main() {
        vec3 modifiedPosition = position;
        
        float elevation = sin(modifiedPosition.x * wavesFrequancy.x) * 
                          sin(modifiedPosition.y * wavesFrequancy.y) * 
                          waveFrequancy;
        
        // Apply elevation to the Z coordinate to create up/down movement
        modifiedPosition.z = elevation;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(modifiedPosition, 1.0);
    }
`;

const fragment = `
    void main(){ 
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
`;

const shader = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        Time: { value: 0.0 },
        waveFrequancy: { value: 0.2 },
        wavesFrequancy: { value: new THREE.Vector2(4.0, 1.5) }
    }
});

const plane = new THREE.Mesh(geometry, shader);
// Rotate the plane to be more horizontal
plane.rotation.x = -Math.PI * 0.4;
scene.add(plane);

// GUI controls
const gui = new GUI();
gui.add(shader.uniforms.waveFrequancy, 'value').min(0.0).max(2.0).step(0.001).name('waveFrequancy');
gui.add(shader.uniforms.wavesFrequancy.value, 'x').min(0.0).max(10.0).step(0.1).name('wavesFrequancyX');
gui.add(shader.uniforms.wavesFrequancy.value, 'y').min(0.0).max(10.0).step(0.1).name('wavesFrequancyY');

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    // Update the time uniform to animate the waves
    shader.uniforms.Time.value = clock.getElapsedTime();
    
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