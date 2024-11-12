"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Html } from "@react-three/drei";

function Model() {
  const gltf = useLoader(GLTFLoader, "/models/casa_modelo.glb");
  gltf.scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  // plane buffer geometry deprecated
  return (
    <group>
      <primitive castShadow scale="0.2" object={gltf.scene} position="0" />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry attach="geometry" />
        <shadowMaterial attach="material" opacity={0.2} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <group>
      <ambientLight intensity={0.6} color="white" />
      <directionalLight
        castShadow
        position={[0, 30, 0]}
        intensity={0.8}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
}

export default function Zapworks() {
  const [placementMode, setPlacementMode] = useState(true);

  return (
    <main className="h-screen w-screen">
      <BrowserCompatibility />
      <ZapparCanvas shadows className="h-screen w-screen">
        <ZapparCamera environmentMap poseMode="anchor-origin" />
        <InstantTracker
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -2]}
        >
          <Suspense
            fallback={
              <Html>
                <div style={{ color: "white", fontWeight: "bold" }}>
                  Model Loading...
                </div>
              </Html>
            }
          >
            <Model />
          </Suspense>
          <Lights />
        </InstantTracker>
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        tabIndex={0}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </div>
    </main>
  );
}