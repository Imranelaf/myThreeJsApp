import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <ambientLight intensity={1} />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}