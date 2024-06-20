"use client"
import { OrbitControls, useTexture } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Controllers, Hands, Interactive, RayGrab, VRButton, XR } from "@react-three/xr"
import { Suspense, useState } from "react"
import * as THREE from "three"

// Array of image sources
const imageSources = [
  "/images/stock.jpg",
  "/images/equi_house.jpg",
  "/images/apartment_ai.jpg",
  "/images/bedroom.jpg"
  // Add more image sources here
]

export default function FirstPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageSources.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="w-screen h-screen">
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands/>
          <Suspense fallback={null}>
            <Generate360Image imgSrc={imageSources[currentImageIndex]} />
            <RayGrab>
              <Model/>
            </RayGrab>
            <Interactive onSelectStart={handlePrevImage}>
              <mesh position={[-2, 0, -1]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshBasicMaterial color="red" />
              </mesh>
            </Interactive>
            <Interactive onSelectStart={handleNextImage}>
              <mesh position={[2, 0, -1]} rotation={[0, -Math.PI / 2, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshBasicMaterial color="green" />
              </mesh>
            </Interactive>
          </Suspense>
          <OrbitControls />
          <directionalLight position={[0, 0, 5]} intensity={5} />
        </XR>
      </Canvas>
      <div className="fixed left-4 bottom-4">
        <button onClick={handlePrevImage}>Previous</button>
        <button onClick={handleNextImage}>Next</button>
      </div>
    </div>
  )
}

function Generate360Image({ imgSrc }: { imgSrc: string }) {
  let myTexture = useTexture(imgSrc)
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[500, 60, 60]} />
        <meshBasicMaterial
          attach="material"
          map={myTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/casa_modelo.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.1} position={[-2,0,1]}/>
    </>
  );
};