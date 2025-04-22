import { TextureLoader } from "three";

export default function LoadTexture(path){
    return (new TextureLoader().load(path));
}