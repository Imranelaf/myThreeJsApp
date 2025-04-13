import * as THREE from 'three'

export default class Light{

    light(){
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        return directionalLight;
    }
}