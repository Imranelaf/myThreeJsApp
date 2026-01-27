import { OrbitControls } from "@react-three/drei";
import Plane from "./Plane";
import BlenderBlade from "./BlenderBlade";
import { Physics } from "@react-three/rapier";
import Cubes from "./Cubes";


export default function APP() {


  return (


    <>
      <OrbitControls />
      <ambientLight intensity={2} />
      <Physics>
        <Cubes />
        <BlenderBlade />
        <Plane />
     </Physics>
      
    </>
  )
}