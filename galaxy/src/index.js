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
    number: 1000,
    radius: 2,
    branches: 4,
    spin: 3,
    randomness: .2,
    sazing: 0,
    depthColor: '#de6c1d',
    faceColor: '#1d3fde'
    
};



    
// Creating the material for the points (stars)
const material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms:{
        size: {value: 12.0 * renderer.getPixelRatio()}
    },
    vertexShader: `
        uniform float size;
        attribute float ascales;
        varying vec3 vcolor;
        void main() {
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size + ascales;
        vcolor = color;
    }
    `,
    fragmentShader: ` 
        varying vec3 vcolor;
        void main(){ 

        float strenght = 1.0 - (distance(gl_PointCoord, vec2(0.5)) * 2.0);
        strenght = pow(strenght, 5.0);
        vec3 color = mix(vec3(0.0), vcolor, strenght);
        gl_FragColor = vec4(color, 1.0);
    }`
});

// Creating the geometry to hold star positions
const geometry = new THREE.BufferGeometry();

// Points (star system) object
let point = null;
let radius =  0;

function generate() {
    let positions = new Float32Array(stars.number * 3);
    let scales = new Float32Array(stars.number);
    let colors = new Float32Array(stars.number *3)

    let branchesAngle = 0;
    let insidColor = new THREE.Color(stars.depthColor);
    let outsideColor = new THREE.Color(stars.faceColor);

    console.log('inside color', insidColor);
    
    // Inserting the x, y, z values for each star
    for (let i = 0; i < stars.number; i++) {
        radius =  Math.random() * stars.radius * stars.spin;
        if(i<20){
            console.log(radius / (stars.radius +2));
            
        }
        const i3 = i *3;
        branchesAngle = (i % stars.branches) / stars.branches * Math.PI * 2;
       
        positions[i3] = Math.cos(branchesAngle + radius) * radius + ((Math.random() - .5) * stars.randomness);
        positions[i3 + 1] = (Math.random()- .5) * stars.randomness;
        positions[i3 + 2] =Math.sin(branchesAngle + radius) * radius + ((Math.random() -.5) * stars.randomness);

        //Color
        let mixedColor = insidColor.clone();
        mixedColor.lerp(outsideColor, radius / (stars.radius +3) );
        colors[i3] = mixedColor.r;
        colors[i3 +1] = mixedColor.g;
        colors[i3+2] = mixedColor.b;

        scales[i] = Math.random() * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('ascale', new THREE.BufferAttribute(scales));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    point = new THREE.Points(geometry, material);
    scene.add(point);
}


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
gui.add(stars, 'number').min(500).max(5000).step(100).onFinishChange(regenerate);
gui.add(stars, 'radius').min(1).max(10).step(1).name('radius').onFinishChange(regenerate);
gui.add(stars, 'branches').min(3).max(10).step(1).name('branches').onFinishChange(regenerate);
gui.add(stars, 'spin').min(-10).max(10).step(1).name('spin').onFinishChange(regenerate);
gui.add(stars, 'randomness').min(0).max(0.6).step(0.01).name('randomness').onFinishChange(regenerate);
gui.addColor(stars, 'depthColor').onFinishChange((e)=>{

    stars.depthColor = e;
    regenerate();
})

gui.addColor(stars, 'faceColor').onFinishChange((e)=>{

    stars.faceColor = e;
    regenerate();
})

function regenerate() {
    // Clear the old galaxy and generate a new one
    point.geometry.dispose();
    point.material.dispose();
    scene.remove(point);
    generate();
}
