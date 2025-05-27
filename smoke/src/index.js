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
const texture = new THREE.TextureLoader().load('/model/perlin-noise-texture.jpeg');
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
        depthWrite:false,
        transparent:true,
        uniforms:{
            uTime :{value: 0},
            smokeTexture: {value: texture}
            
        },
        vertexShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform sampler2D smokeTexture;

            vec2 rotate2D(vec2 value, float angle){
                float s = sin(angle);
                float c = cos(angle);
                mat2 m = mat2(c,s,-s,c);
                return m * value;
            }
         
            void main(){
                vUv = uv;
                vec3 newPosition = position;
                float twist = texture(smokeTexture, vec2(0.5, uv.y + uTime *0.005)).r;
                float angle = twist * 2.0;
                newPosition.xz = rotate2D(newPosition.xz, angle);

                vec2 wind = vec2(texture(smokeTexture, vec2(0.25, uTime *0.008)).r -0.5,
                texture(smokeTexture, vec2(0.25, uTime *0.005)).r -0.5);
                wind *= pow(vUv.y, 2.0)*10.0;
                newPosition.xz += wind;

               
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }`
        ,
        fragmentShader:
            `uniform sampler2D smokeTexture;
            uniform float uTime;
            varying vec2 vUv;
            
            void main(){
            vec2 uvSmoke = vUv;
            uvSmoke.x *= 0.8;
            uvSmoke.y *=0.5;
           
            uvSmoke.y -=uTime * 0.05;
            float smoke = texture(smokeTexture,uvSmoke).r;
           
            smoke *= smoothstep(0.0,0.2, vUv.x);
            smoke *= 1.0-smoothstep(0.8,1.0,vUv.x);
            smoke *= smoothstep(0.0,0.3, vUv.y);
            smoke *= 1.0-smoothstep(0.8,1.0,vUv.y);

            gl_FragColor = vec4(vec3(smoke),smoke);

            }
        

    `});

const geometry = new THREE.PlaneGeometry(1,3, 64,64);
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