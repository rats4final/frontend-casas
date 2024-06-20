"use client"
import { Box, Html, OrbitControls, Sky, Stage } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Interactive, XR, Controllers, VRButton, Hands, RayGrab } from '@react-three/xr'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Page() {
  return (
    <div className='w-screen h-screen'>
      <VRButton/>
      <Canvas>
        <XR >
          <OrbitControls/>
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <Controllers />
          <ambientLight />
          <Floor/>
          <Suspense fallback={<Html>Cargando...</Html>}> 
            <Casa/>
          </Suspense>
          <RayGrab>
            <Box position={[0,0,0]}/>
          </RayGrab> 
          <pointLight position={[10, 10, 10]} />
        </XR>
      </Canvas>
    </div>
  )
}

function Casa() {
  const gltf = useLoader(GLTFLoader, 'https://s3.us-east-2.amazonaws.com/rats4final.bucket/whatever/casa_modelo.glb')
  return <primitive object={gltf.scene}/>
}


function Floor() {
  return (
    <mesh position={[0,-4,0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}