
import { CircleGeometry, Mesh, MeshStandardMaterial } from 'three';
import LoadTexture from '../utils/loadTexture.js';

export default class Object {
    constructor(){
    
        this.image = LoadTexture('/textures/ground.jpg');
    }

    shape(){
        const geometry = new CircleGeometry(5, 32);
        const material = new MeshStandardMaterial({map: this.image})
        const mesh = new Mesh(geometry, material);
        mesh.rotation.x = -1.5;
        mesh.receiveShadow = true;

        return mesh;
    }
}
