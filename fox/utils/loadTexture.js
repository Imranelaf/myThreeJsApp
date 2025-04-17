import * as THREE from 'three';


export default function LoadTexture(path){

    
    const loader = new THREE.TextureLoader();
    const image = loader.load(path)
    return image;
}