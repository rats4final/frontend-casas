// "use client";
// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { VRButton, XR } from "@react-three/xr";
// import { useState } from "react";
// import { BackSide } from "three";

// const videoUrl = "/videos/test.mkv";
// const videoUrl2 = "/videos/test2.mp4"

// export default function page() {
//   return <VideoSphere src={videoUrl2} />;
// }

// interface Props {
//   src: string;
//   size?: number;
// }

// const VideoSphere = ({ src, size = 500 }: Props) => {
//   const [video] = useState(() => {
//     const el = document.createElement("video");
//     el.src = src;
//     el.muted = true;
//     el.crossOrigin = "Anonymous";
//     el.play();
//     return el;
//   });
//   return (
//     <div className="h-screen">
//       <VRButton />
//       <Canvas>
//         <OrbitControls/>
//         <XR>
//           <mesh scale={[-size, size, size]}>
//             <sphereGeometry />
//             <meshBasicMaterial side={BackSide}>
//               <videoTexture attach="map" args={[video]} />
//             </meshBasicMaterial>
//           </mesh>
//         </XR>
//       </Canvas>
//     </div>
//   );
// };

function Page() {
  return (
    <div>Page</div>
  )
}

export default Page