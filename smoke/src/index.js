import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
const gui = new GUI();

//Screen size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
};

//load the texture smoke
const texture = new THREE.TextureLoader().load('/model/perlin_noise.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Optional: Add directional light for better shading
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


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

// BOX GEOMETRY
const material2 = new THREE.MeshBasicMaterial({color:'red'})
const box = new THREE.BoxGeometry();

const mesh2 = new THREE.Mesh(box, material2);
mesh2.position.z = -2;
scene.add(mesh2);

const material = new THREE.ShaderMaterial(
    {
        side: THREE.DoubleSide,
        transparent:true,
        uniforms:{
            uTime :{value: 0},
            smokeTexture: {value: texture}
            
        },
        vertexShader: `
            varying vec2 vUv;
         
            void main(){
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader:`
            uniform sampler2D smokeTexture;
            uniform float uTime;
            varying vec2 vUv;
            
            void main(){
            vec2 uvSmock = vUv;
            uvSmock.x *= 0.8;
            uvSmock.y *=0.5;
            uvSmock.y -=uTime * 0.05;
            
            
            float smoke = texture(smokeTexture,uvSmock).r;
                gl_FragColor = vec4(vec3(smoke),smoke);
            }
        `

    });

const geometry = new THREE.PlaneGeometry(2,6, 64,64);
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh); 





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

function animate(){ 
    
    material.uniforms.uTime.value = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();