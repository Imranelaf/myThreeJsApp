import * as THREE from 'three';
import size from '../utils/sizes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(canvas) {
        const sizes = size();
        
        this.camera = new THREE.PerspectiveCamera(
            45,
            sizes.width / sizes.height,
            1,
            100
        );
        this.camera.position.z = 10;
        this.camera.position.y = 2.5;

        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
    }

    getCamera() {
        return this.camera;
    }

    updateControls() {
        this.controls.update();
    }
}
