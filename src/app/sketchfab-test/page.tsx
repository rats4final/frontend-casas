// 'use client'

// import { useEffect, useRef, useState } from "react";

// // @ts-ignore
// import Sketchfab from '@sketchfab/my-viewer-api-alias';

// export default function Page() {
//   const [customUid, setCustomUid] = useState('f8c98ffc95424d90a236928811e6b1bf');

//   const iFrameProperties = {
//     allow: "xr-spatial-tracking",
//     allowFullScreen: true,
//     allowvr: "yes"
//  }

//   const viewerFrame = useRef(null);

//   useEffect(() => {
//     const frame = document.getElementById('api-frame')
//     const client = new Sketchfab(frame);
//     const uid = 'b0fd2a0bf4a94c86b91172eac03af80a';

//     client.init(customUid,{
//       success: function onSuccess( api:any ){
//           api.start();
//           api.addEventListener( 'viewerready', function() {

//               // API is ready to use
//               // Insert your code here
//               console.log( 'Viewer is ready' );

//           } );
//       },
//       error: function onError() {
//           console.log( 'Viewer error' );
//       }
//   })

//   return () => {
//   }

//   }, [customUid]);

//   return (
//     <div>
//       <h1>Viewer API test</h1>
//       <select onChange={(event) => {setCustomUid(event.target.value)}}>
//         <option value="b0fd2a0bf4a94c86b91172eac03af80a">Cottage</option>
//         <option value="7w7pAfrCfjovwykkEeRFLGw5SXS">Soldier</option>
//       </select>
//       <iframe className="w-screen h-screen" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" {...iFrameProperties} id="api-frame" allow="autoplay" allowFullScreen ref={viewerFrame}></iframe>
//     </div>
//   )
// }

function Page() {
  return (
    <div>page</div>
  )
}

export default Page