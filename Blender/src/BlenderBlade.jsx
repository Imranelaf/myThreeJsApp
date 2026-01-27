/*
- Euler is the human way to think about rotation.
  Euler(x, y, z) means:
  rotate around X axis, then Y axis, then Z axis (in that order).

- Quaternion is a safe, continuous, math-robust representation of rotation.
  Instead of saying:
  "Rotate X then Y then Z"
  it says:
  "This object is oriented like this in 3D space".

- We use Euler → Quaternion because:
  Euler is easy to think in (human-friendly),
  Quaternion is safe to apply (engine / physics-friendly).
*/

import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Euler, Quaternion } from "three";

export default function BlenderBlade() {
  const blade = useRef();

  // Reuse objects to avoid creating garbage every frame
  const euler = new Euler();
  const quaternion = new Quaternion();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    //first ROTATION
    // We think in Euler angles (rotate around Y over time)
    euler.set(0, time, 0);

    // Convert Euler → Quaternion to avoid gimbal lock
    quaternion.setFromEuler(euler);

    // Apply rotation safely to the kinematic rigid body
    blade.current.setNextKinematicRotation(quaternion);

    //second TRANSLATION
    // Circular motion using cos & sin
    const x = Math.cos(time);
    const z = Math.sin(time);

    // Move the blade in a circular path
    blade.current.setNextKinematicTranslation({ x,y: 0.8,z,});
  });

  return (
    // kinematicPosition is used for animated / controlled motion
    <RigidBody
      ref={blade}
      type="kinematicPosition"
      position={[0, 0.8, 0]}
    >
      <mesh>
        <boxGeometry args={[5, 0.5, 0.5]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}
