import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import APP from "./App";
import './index.css'
import { Canvas } from "@react-three/fiber";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas className="theCanvas" camera={{position:[10,5,5]}}>
    <APP />
    </Canvas>
  </StrictMode>
)
