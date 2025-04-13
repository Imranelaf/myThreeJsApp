import * as THREE from 'three'

export default class Object{
   
    shape(){
        const geometry = new THREE.TorusGeometry(1.5, .3, 10, 50);
        const material = new THREE.MeshBasicMaterial({color: '#faef08'});
        const torus = new THREE.Mesh(geometry, material);

        return torus;
        
    }

}