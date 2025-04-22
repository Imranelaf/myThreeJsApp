
import { PerspectiveCamera } from 'three';
import size from '../utils/sizes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(canvas) {
        this.sizes = size();
        this.canvas = canvas;

        //setting the camera
        this.camera = new PerspectiveCamera(45, this.sizes.width / this.sizes.height, 1, 100 );
        this.camera.position.z = 10;
        this.camera.position.y = 2.5;

        //setting the OrtbitControls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;


    }

    getCamera() {
         
        return this.camera;
    }

    updateControls() {
        this.controls.update();
        
    }

    updateCamera(){
        this.sizes = size();
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.controls.update()
     
    }
}
