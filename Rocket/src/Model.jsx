// Model.jsx
import { useGLTF } from "@react-three/drei"

export default function Model() {
  const { scene } = useGLTF("./rocket.glb")

  return <primitive object={scene} scale={.4} rotation={[0,10,0]} />
}
