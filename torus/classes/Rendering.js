import * as THREE from 'three';
import size from '../utils/sizes.js';

export default class Rendering {
    display(canvas) {
        const sizes = size();
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor(0x808080)
        return renderer;
    }
}
