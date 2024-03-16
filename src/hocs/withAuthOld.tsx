// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// //TODO: CHECK AND TRY WITH THE COOKIE INSTEAD OF RELYING ON THE AXIOS ERROR

// const withAuth = (WrappedComponent) => {
//   const AuthWrapper = (props) => {
//     const router = useRouter();
//     const [authenticated, setAuthenticated] = useState<boolean>(false);

//     useEffect(() => {
//       const verifyUser = () => {
//         api()
//           .get("/api/user")
//           .then((response) => {
//             console.log(response.data);
//             setAuthenticated(true);
//           })
//           .catch((error) => {
//             if (error.response.status === 401) {
//               console.log(error);
//               setAuthenticated(false);
//               router.push("/login");
//             }
//           });
//       };
//       verifyUser();
//     }, [router]);

//     if (authenticated) {
//       return <WrappedComponent {...props} />;
//     }
//   };
//   return AuthWrapper;
// };
// export default withAuth;
