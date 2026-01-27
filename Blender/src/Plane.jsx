/*
- This component represents a static ground plane with boundary colliders.

- We use a FIXED rigid body because:
  - It should not move
  - It should not be affected by gravity
  - Other objects can collide with it

- The visual mesh and the physics colliders are separated:
  - Mesh → what we see
  - Colliders → what the physics engine uses
*/

import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Plane() {
  return (
    <RigidBody type="fixed" position={[0, 0, 0]}>
      
      <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color='lightblue'/>
      </mesh>

     
    {/* PHYSICS COLLIDERS */}

      {/* Front wall */}
      <CuboidCollider args={[5, 2, 0.3]} position={[0, 2, 5]} />

      {/* Back wall */}
      <CuboidCollider args={[5, 2, 0.3]} position={[0, 2, -5]} />

      {/* Right wall */}
      <CuboidCollider args={[0.3, 2, 5]} position={[5, 2, 0]} />

      {/* Left wall */}
      <CuboidCollider args={[0.3, 2, 5]} position={[-5, 2, 0]} />
    </RigidBody>
  );
}
