
import { PCFSoftShadowMap, WebGLRenderer } from 'three';
import size from '../utils/sizes.js';

export default class Rendering {
    constructor(){
        this.sizes = size();
        this.renderer
    }
    display(canvas) {
        
        this.renderer = new WebGLRenderer({ canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setClearColor(0x808080);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        return this.renderer;
    }
    update(){
        this.sizes = size();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }
}
