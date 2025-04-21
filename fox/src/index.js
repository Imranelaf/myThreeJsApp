import * as THREE from 'three';
import './style.css'
import Camera from '../classes/Camera.js';
import Rendering from '../classes/Rendering.js';
import Light from '../classes/Light.js';
import Object from '../classes/Object.js';
import Model from '../classes/LoadModel.js';
import { GUI } from 'dat.gui';
import { color } from 'three/tsl';


//Scence setup
const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();

//Initiliaze classes
const light = new Light();
const camera = new Camera(canvas);
const object = new Object();
const model = new Model(scene);
const rendering = new Rendering()
const render = rendering.display(canvas);

//load the fox model
model.loadModel();

//preparing the scene
scene.add(light.DirectionalLight(), light.AmbientLight(), object.shape());



//GUI CONTROLES

const gui = new GUI();

const foxAnimationFolder = gui.addFolder('Change Animation');

const control = {
    buttonFunction : ()=>{model.animation(0)},
    buttonFunction1 : ()=>{model.animation(1)},
    buttonFunction2 : ()=>{model.animation(2)}

}
foxAnimationFolder.add(control, 'buttonFunction').name('Survey')
foxAnimationFolder.add(control, 'buttonFunction1').name('Walk')
foxAnimationFolder.add(control, 'buttonFunction2').name('Run')





//animation loop
function animate() {
    requestAnimationFrame(animate);
    camera.updateControls();
    model.animationUpdate();
    render.render(scene, camera.getCamera());
}

animate()

//resizing

window.addEventListener('resize', ()=>{
    
     camera.updateCamera();
     rendering.update();
})
