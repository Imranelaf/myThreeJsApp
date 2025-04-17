import * as THREE from 'three';
import LoadTexture from '../utils/loadTexture.js';

export default class Object {
    constructor(){
    
        this.image = LoadTexture('/textures/ground.jpg');
    }

    shape(){
        const geometry = new THREE.CircleGeometry(5, 32);
        const material = new THREE.MeshStandardMaterial({map: this.image})
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -1.5;

        return mesh;
    }
}
