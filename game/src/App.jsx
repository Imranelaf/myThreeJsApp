import { Canvas } from "@react-three/fiber";
import {Level1, Level2, Start} from "./components/Levels";
import { OrbitControls } from "@react-three/drei";
import './App.css'

export default function App() {
  return (
    <Canvas className="TheCanvas" >
      <ambientLight intensity={1} />
      <OrbitControls />
      <Start />
      <Level1 />
      <Level2 />
    </Canvas>
  );
}