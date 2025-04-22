import { AmbientLight, DirectionalLight } from "three";

export default class Light{

    DirectionalLight(){
        const directionalLight = new DirectionalLight( 0xffffff, 2.5 );
        directionalLight.position.set(3, 3);
        directionalLight.target.position.x =-1.5;
        directionalLight.castShadow = true;
        return directionalLight;
    }

    AmbientLight(){
        const ambientLight = new AmbientLight( 0xffffff, .8 );
        return ambientLight;
    }
}