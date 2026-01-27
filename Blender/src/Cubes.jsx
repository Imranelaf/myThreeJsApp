/*
- This component spawns MANY cubes using instancing for performance.

- InstancedRigidBodies:
  - Creates multiple physics bodies from a single mesh
  - Much faster than creating 50 separate <RigidBody /> components

- Each instance has:
  - Its own position
  - Its own rotation
  - Its own scale
*/

import { InstancedRigidBodies } from "@react-three/rapier";
import { useMemo } from "react";

export default function Cubes() {
  const count = 50;

  /*
    - useMemo is critical here:
      - Prevents new random values from being generated on every render
      - Keeps physics stable
      - Avoids objects "teleporting" or re-exploding

    - We generate an array of instance descriptors
      Each object maps to ONE rigid body
  */
  const instances = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Random scale between 0.5 and 1.0
        const random = Math.random() * 0.5 + 0.5;

        return {
          /*
            - Random X/Z spread so cubes don’t overlap
            - Y increases with index so cubes spawn stacked vertically
            - This prevents instant collision explosions
          */
          position: [
            (Math.random() - 0.5) * 8,
            5 + i * 0.5,
            (Math.random() - 0.5) * 8,
          ],

          /*
            - Initial rotation (in radians)
            - Small randomness is safe for physics
          */
          rotation: [random, random, random],

          /*
            - Each cube has its own scale
            - Collider automatically matches this scale
          */
          scale: [random, random, random],
        };
      }),
    [count]
  );

  return (
    /*
      - InstancedRigidBodies links physics bodies to the instanced mesh
      - colliders="cuboid" creates one box collider per instance
    */
    <InstancedRigidBodies instances={instances} colliders="cuboid">
      
      {/* 
        Single mesh, rendered N times by the GPU
        This is why instancing is so fast
      */}
      <instancedMesh args={[null, null, count]}>
        <boxGeometry />
        <meshStandardMaterial color="tomato" />
      </instancedMesh>

    </InstancedRigidBodies>
  );
}
