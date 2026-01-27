import { OrbitControls } from "@react-three/drei";
import Plane from "./Plane";


export default function APP() {


  return (


    <>
      <OrbitControls />
      <ambientLight intensity={2} />
      <Plane />
      
    </>
  )
}