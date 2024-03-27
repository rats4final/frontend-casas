"use client"
//import { useRouter } from "next/navigation";

// export default function Page({
//   params,
//   searchParams,
// }: {
//   params: { token: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   const {token} = params;

//   //const router = useRouter();

//   console.log(params)
//   console.log(searchParams)
//   return <div>Page</div>;
// }
//TODO: CHECK FOR SERVERSIDE FORMS AND ALSO CHECK ZUSTAND FOR GLOBAL USER 
import { useRouter, useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { token: string } }) {
  const {token} = params;
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  console.log(token, email);

  return <>Page</>;
}
