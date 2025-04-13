import * as THREE from 'three';
import size from '../Utils/sizes.js';

export default class Camera{

    camera(){

        let sizes = size()
        
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100 )
        camera.position.z = 10;       
        return camera;
    }
}