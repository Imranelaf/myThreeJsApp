import { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Model from "./Model"
import "./App.css"

export default function App() {
  useEffect(() => {
    alert(
      `⚠️ Note: This is a 3D model — you can interact with it!\n
Rotate: Click and drag the model with your mouse.\n
Move: Hold Shift and left-click to drag the model’s position.`
    )
  }, [])

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}
