import * as THREE from 'three'

export default class Light{

    DirectionalLight(){
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        return directionalLight;
    }

    AmbientLight(){
        const ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
        return ambientLight;
    }
}