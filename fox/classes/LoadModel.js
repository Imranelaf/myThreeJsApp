import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export default class Model {
    constructor(scene) {
      //setting up the variables
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.action = null;
        this.mixer = null;
        this.model = null;
        this.clock = new THREE.Clock();
        this.state = 0;
        this.movement = null;
    }

    loadModel() {
        return new Promise((resolve) => {
            this.loader.load(
                '/model/Fox/glTF/Fox.gltf',
                (gltf) => {
                    // Setting up the model
                    const fox = gltf.scene;
                    fox.position.set(0, 0, 0);
                    fox.scale.set(0.02, 0.02, 0.02);
                    fox.rotation.y = 0.5;
                    
                    // Casting the shadow from the fox
                    fox.traverse((element) => {
                        if (element instanceof THREE.Mesh) {
                            element.castShadow = true;
                            element.receiveShadow = false;
                        }
                    });
                    
                    this.scene.add(fox);
                    this.model = fox;
                    
                    // Set up animation
                    
                    if (gltf.animations && gltf.animations.length > 0) {
                        this.movement = gltf.animations;
                        console.log(this.movement);
                        
                        this.mixer = new THREE.AnimationMixer(fox);
                        this.action = this.mixer.clipAction(this.movement[this.state]);
                        this.action.play();
                    }
                    
                    resolve(fox);
                },
                undefined, // progress
                (error) => {
                    console.error("Error loading model:", error);
                    alert('The loading process of the model has failed. Please try again later.');
                }
            );
        });
    }

    animation(state){
      if(state === this.state) return;

     
      this.action.stop();
      this.state = state;
      this.action = this.mixer.clipAction(this.movement[this.state]);
      this.action.play(); 
    }

    animationUpdate() {
        if (this.mixer) {
            // Get the time delta since the last frame
            
            const delta = this.clock.getDelta();
            this.mixer.update(delta);
        }
    }
}