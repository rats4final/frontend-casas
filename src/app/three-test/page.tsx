"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls, Sky } from "@react-three/drei";

export default function Page() {
  return (
    <div id="canvas-container" className="h-screen w-screen">
      <Canvas>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <mesh>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial />
        </mesh>
        <TransformControls>
          <mesh position={[30, 20, 6]}>
            <sphereGeometry args={[20, 20, 20]} />
            <meshStandardMaterial />
          </mesh>
        </TransformControls>

        <ambientLight intensity={0.1} />
        <directionalLight color="yellow" position={[0, 0, 5]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
