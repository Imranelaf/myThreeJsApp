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

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const geometry = new THREE.PlaneGeometry(4,4);
;
const vertex = `
varying vec2 uVu;
uniform float time;
varying float Time;
void main(){
    uVu = uv;
    Time = time;
    float wave = sin(position.x * 8.0 +  time * 2.0) * 0.2;
    vec3 newPosition = position + normal * wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
    }`;
const fragment = `
varying vec2 uVu ;
varying float Time;
void main(){ 
 gl_FragColor = vec4(0.0 , 1.0 , 1.0, 1.0);
  }`;

const  clock = new THREE.Clock();
let elapseTime = clock.getElapsedTime();

const shader = new THREE.ShaderMaterial(
    {
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
        time: { value: elapseTime }
    }    
});

const plane = new THREE.Mesh(geometry, shader);
scene.add(plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

function animate() {
    elapseTime = clock.getElapsedTime();
    shader.uniforms.time.value = elapseTime;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
