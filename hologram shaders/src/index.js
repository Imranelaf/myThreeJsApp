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

// GEOMETRIES

const sphere = new THREE.SphereGeometry(1, 32, 16);
const torusKnot  = new THREE.TorusKnotGeometry( 1, 0.2, 32, 8 );

// Vertex and Fragement
const myVertex = `

    varying vec3 vPosition;
    varying vec3 vNormal;
   
   
    void main(){
        vec4 myPosition = modelMatrix * vec4(position, 1.0);
    

        gl_Position = projectionMatrix * viewMatrix * myPosition;

        vec4 myNormal = modelMatrix * vec4(normal, 0.0); 
        vPosition = myPosition.xyz;
        vNormal = myNormal.xyz;
        
        }
`

const myFragement = `
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main(){
    float stripe = mod((vPosition.y - uTime * .05) * 10.0, 1.0);
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 1.0;
   
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    
    stripe = pow(stripe, 3.0);
    
  
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    //falloff
    float falloff = smoothstep(.8, .0, fresnel);


    float holographic = fresnel * stripe;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    gl_FragColor = vec4(1.0,1.0,1.0,holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`


const material = new THREE.ShaderMaterial(
    {
        side: THREE.DoubleSide,
        depthWrite:false,
        transparent:true,
        vertexShader: myVertex,
        fragmentShader:myFragement,
        uniforms:{
            uTime :{value: 0},
           
            
        },
       });

const mesh = new THREE.Mesh(sphere, material);
const mesh2 = new THREE.Mesh(torusKnot, material);
mesh.position.x = -2;
mesh2.position.x = 2;


scene.add(mesh, mesh2); 





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