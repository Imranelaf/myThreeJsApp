import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three'

export default class Model {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();


    }

    loadModel() {
       const model = this.loader.load(
        '/model/Fox/glTF/Fox.gltf',
        (gltf) => {
          //setting up the model
          const fox = gltf.scene;
          console.log(gltf);
          
          fox.position.set(0, 0, 0);
          fox.scale.set(0.02, 0.02, 0.02);
          fox.rotation.y = .5
          
          //casting the shadow from the fox
          fox.traverse((element)=>{
            if(element instanceof THREE.Mesh){
              element.castShadow = true;
              element.receiveShadow = false;
            }
          })
          
          console.log(fox.animations);
          
          
          this.scene.add(fox);
        },
        undefined, // progress
        (error) => {
          console.log(" error', error");
          alert('the loading processes of the model has been failed, Please try again later')
        }
      );
        return model;
    }
}
