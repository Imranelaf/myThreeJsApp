import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Model {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();

    }

    loadModel() {
       const model = this.loader.load(
        '/model/Fox/glTF/Fox.gltf',
        (gltf) => {
          const fox = gltf.scene;
          fox.position.set(0, 0, 0);
          fox.scale.set(0.02, 0.02, 0.02);
          fox.rotation.y = .5
          this.scene.add(fox);
      
          console.log('✅ success', fox);
        },
        undefined, // progress
        (error) => {
          console.log('❌ error', error);
        }
      );
        return model;
    }
}
